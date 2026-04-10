import type { ComboMode, Sensitivity } from "../types/pet";

type SpeechMode = ComboMode | "normal";

export const sensitivityThresholds: Record<Sensitivity, number> = {
  low: 0.22,
  balanced: 0.15,
  high: 0.1,
};

export const impactCooldownMs = 240;
export const comboHitGapMs = 500;
export const comboResetAfterMs = 1300;

export const modeClips: Record<ComboMode, string[]> = {
  painful: [
    new URL("../assets/sounds/painful/painful_02.mp3", import.meta.url).href,
  ],
  sexy: [new URL("../assets/sounds/sexy/sexy_03.mp3", import.meta.url).href],
  sing: [new URL("../assets/sounds/sing/sing_01.mp3", import.meta.url).href],
};

export const fallbackWords: Record<SpeechMode, string[]> = {
  normal: ["Ahhhh!", "Owwwww!", "Hey Hey!", "Aaaahhhh!", "Please no!"],
  painful: ["Ah!", "Ow!"],
  sexy: ["Hey there~", "Aaaah~", "Oh wow~"],
  sing: ["La la la~"],
};
