import type { Sensitivity } from "../types/pet";

type ControlsPanelProps = {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  sensitivity: Sensitivity;
  onSensitivityChange: (value: Sensitivity) => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  score: number;
  threshold: number;
};

export function ControlsPanel({
  isListening,
  onStart,
  onStop,
  sensitivity,
  onSensitivityChange,
  volume,
  onVolumeChange,
  score,
  threshold,
}: ControlsPanelProps) {
  return (
    <section className="controls">
      <div className="buttons">
        <button type="button" className="primary" onClick={onStart}>
          {isListening ? "Listening..." : "Start listening"}
        </button>
        <button type="button" className="secondary" onClick={onStop}>
          Stop
        </button>
      </div>

      <div className="row">
        <label htmlFor="sensitivity">Sensitivity</label>
        <select
          id="sensitivity"
          value={sensitivity}
          onChange={(event) =>
            onSensitivityChange(event.target.value as Sensitivity)
          }
        >
          <option value="low">Low</option>
          <option value="balanced">Balanced</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="row">
        <label htmlFor="volume">Yell Volume</label>
        <input
          id="volume"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
      </div>

      <div className="meter-wrap">
        <div className="meter" aria-hidden="true">
          <div
            className="fill"
            style={{ width: `${Math.min((score / 0.35) * 100, 100)}%` }}
          />
        </div>
        <p>
          Signal {score.toFixed(3)} | Trigger {threshold.toFixed(3)}
        </p>
      </div>
    </section>
  );
}
