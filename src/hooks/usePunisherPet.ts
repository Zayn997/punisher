import { useEffect, useMemo, useRef, useState } from "react";
import {
  comboHitGapMs,
  comboResetAfterMs,
  fallbackWords,
  impactCooldownMs,
  modeClips,
  sensitivityThresholds,
} from "../constants/petAudio";
import type { ComboMode, Expression, Sensitivity } from "../types/pet";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getComboTarget(hitCount: number): {
  level: number;
  mode: ComboMode | null;
} {
  if (hitCount >= 4) {
    return { level: 3, mode: "sing" };
  }
  if (hitCount >= 3) {
    return { level: 2, mode: "sexy" };
  }
  if (hitCount >= 2) {
    return { level: 1, mode: "painful" };
  }
  return { level: 0, mode: null };
}

export function usePunisherPet() {
  const [isListening, setIsListening] = useState(false);
  const [expression, setExpression] = useState<Expression>("idle");
  const [status, setStatus] = useState(
    "Press start, then hit 2/3/4 times quickly.",
  );
  const [sensitivity, setSensitivity] = useState<Sensitivity>("balanced");
  const [volume, setVolume] = useState(0.85);
  const [score, setScore] = useState(0);
  const [lastMode, setLastMode] = useState<ComboMode | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const signalRef = useRef<Float32Array<ArrayBuffer> | null>(null);
  const animationRef = useRef<number | null>(null);
  const reactionTimerRef = useRef<number | null>(null);
  const lastTriggerRef = useRef(0);
  const lastImpactTimeRef = useRef(0);
  const burstCountRef = useRef(0);
  const lastTriggeredLevelRef = useRef(0);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const noiseFloorRef = useRef(0.03);
  const lastImpactScoreRef = useRef(0);

  const threshold = useMemo(
    () => sensitivityThresholds[sensitivity],
    [sensitivity],
  );

  const detectionProfile = useMemo(() => {
    if (sensitivity === "low") {
      return {
        noiseMultiplier: 2.2,
        noiseOffset: 0.024,
        minRise: 0.03,
        minPeak: 0.14,
      };
    }

    if (sensitivity === "high") {
      return {
        noiseMultiplier: 1.75,
        noiseOffset: 0.014,
        minRise: 0.016,
        minPeak: 0.09,
      };
    }

    return {
      noiseMultiplier: 2.0,
      noiseOffset: 0.018,
      minRise: 0.022,
      minPeak: 0.11,
    };
  }, [sensitivity]);

  const stopListening = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (reactionTimerRef.current !== null) {
      clearTimeout(reactionTimerRef.current);
      reactionTimerRef.current = null;
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => undefined);
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    signalRef.current = null;
    lastImpactTimeRef.current = 0;
    burstCountRef.current = 0;
    lastTriggeredLevelRef.current = 0;
    noiseFloorRef.current = 0.03;
    lastImpactScoreRef.current = 0;

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }

    window.speechSynthesis.cancel();

    setExpression("idle");
    setIsListening(false);
    setLastMode(null);
  };

  const speakFallback = (mode: ComboMode, impactScore: number) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    const words = fallbackWords[mode];
    const utterance = new SpeechSynthesisUtterance(
      words[Math.floor(Math.random() * words.length)],
    );

    utterance.volume = clamp(volume + impactScore * 0.5, 0.15, 1);
    utterance.rate = clamp(1 + impactScore * 0.8, 0.9, 1.9);
    utterance.pitch = clamp(1 + impactScore * 0.9, 1, 2);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const playModeAudio = (mode: ComboMode, impactScore: number) => {
    const clips = modeClips[mode];
    if (clips.length === 0) {
      speakFallback(mode, impactScore);
      return;
    }

    const clip = clips[Math.floor(Math.random() * clips.length)];
    const audio = new Audio(clip);
    audio.volume = clamp(volume + impactScore * 0.35, 0.2, 1);
    audio.playbackRate = clamp(1 + impactScore * 0.2, 0.9, 1.2);

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }

    activeAudioRef.current = audio;
    audio.onended = () => {
      if (activeAudioRef.current === audio) {
        activeAudioRef.current = null;
      }
    };

    audio.play().catch(() => {
      if (activeAudioRef.current === audio) {
        activeAudioRef.current = null;
      }
      speakFallback(mode, impactScore);
    });
  };

  const playNormalSpeech = (impactScore: number) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      fallbackWords.normal[
        Math.floor(Math.random() * fallbackWords.normal.length)
      ],
    );
    utterance.volume = clamp(volume + impactScore * 0.5, 0.15, 1);
    utterance.rate = clamp(1 + impactScore * 0.8, 0.9, 1.9);
    utterance.pitch = clamp(1 + impactScore * 0.9, 1, 2);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const registerImpact = (
    now: number,
  ): { mode: ComboMode | null; hitCount: number } => {
    const sinceLastImpact = now - lastImpactTimeRef.current;

    if (
      lastImpactTimeRef.current === 0 ||
      sinceLastImpact > comboResetAfterMs
    ) {
      burstCountRef.current = 1;
      lastTriggeredLevelRef.current = 0;
    } else if (sinceLastImpact <= comboHitGapMs) {
      burstCountRef.current += 1;
    } else {
      burstCountRef.current = 1;
      lastTriggeredLevelRef.current = 0;
    }

    lastImpactTimeRef.current = now;

    const target = getComboTarget(burstCountRef.current);
    if (target.mode && target.level > lastTriggeredLevelRef.current) {
      lastTriggeredLevelRef.current = target.level;
      return { mode: target.mode, hitCount: burstCountRef.current };
    }

    return { mode: null, hitCount: burstCountRef.current };
  };

  const reactToImpact = (impactScore: number, mode: ComboMode) => {
    setExpression("reacting");
    setLastMode(mode);

    if (reactionTimerRef.current !== null) {
      clearTimeout(reactionTimerRef.current);
    }

    reactionTimerRef.current = window.setTimeout(() => {
      setExpression("idle");
    }, 420);

    playModeAudio(mode, impactScore);
  };

  const monitorSignal = () => {
    const analyser = analyserRef.current;
    const signal = signalRef.current;

    if (!analyser || !signal) {
      return;
    }

    analyser.getFloatTimeDomainData(signal);

    let sum = 0;
    let peak = 0;
    for (let i = 0; i < signal.length; i += 1) {
      const sample = signal[i];
      const abs = Math.abs(sample);
      sum += sample * sample;
      if (abs > peak) {
        peak = abs;
      }
    }

    const rms = Math.sqrt(sum / signal.length);
    const impactScore = rms * 1.35 + peak * 0.85;
    setScore(impactScore);

    const prevScore = lastImpactScoreRef.current;
    const rise = impactScore - prevScore;
    lastImpactScoreRef.current = impactScore;

    const floor = noiseFloorRef.current;
    const floorAlpha = impactScore > floor ? 0.02 : 0.12;
    noiseFloorRef.current = floor + (impactScore - floor) * floorAlpha;

    const dynamicThreshold = Math.max(
      threshold,
      noiseFloorRef.current * detectionProfile.noiseMultiplier +
        detectionProfile.noiseOffset,
    );
    const isLikelyImpact =
      impactScore > dynamicThreshold &&
      rise >= detectionProfile.minRise &&
      peak >= detectionProfile.minPeak;

    const now = performance.now();
    if (isLikelyImpact && now - lastTriggerRef.current > impactCooldownMs) {
      lastTriggerRef.current = now;
      const { mode, hitCount } = registerImpact(now);

      if (hitCount === 1) {
        setExpression("reacting");
        setLastMode(null);

        if (reactionTimerRef.current !== null) {
          clearTimeout(reactionTimerRef.current);
        }
        reactionTimerRef.current = window.setTimeout(() => {
          setExpression("idle");
        }, 420);

        playNormalSpeech(impactScore);
      }

      if (mode) {
        reactToImpact(impactScore, mode);
      }
    }

    animationRef.current = requestAnimationFrame(monitorSignal);
  };

  const startListening = async () => {
    if (isListening) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          autoGainControl: false,
          noiseSuppression: true,
        },
      });

      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.18;
      source.connect(analyser);

      streamRef.current = stream;
      audioContextRef.current = context;
      analyserRef.current = analyser;
      signalRef.current = new Float32Array(
        analyser.fftSize,
      ) as Float32Array<ArrayBuffer>;

      setStatus("Listening. Hit quickly: 2x painful, 3x sexy, 4x sing.");
      setIsListening(true);
      lastTriggerRef.current = performance.now();
      animationRef.current = requestAnimationFrame(monitorSignal);
    } catch {
      setStatus("Microphone permission is required for hit detection.");
      stopListening();
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return {
    expression,
    isListening,
    lastMode,
    score,
    sensitivity,
    setSensitivity,
    setVolume,
    startListening,
    status,
    stopListening,
    threshold,
    volume,
  };
}
