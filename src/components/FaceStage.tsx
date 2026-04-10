import type { CSSProperties } from "react";
import type { ComboMode, Expression } from "../types/pet";

type FaceStageProps = {
  expression: Expression;
  lastMode: ComboMode | null;
  score: number;
  isListening: boolean;
};

function getReactionText(
  expression: Expression,
  mode: ComboMode | null,
  isListening: boolean,
) {
  if (!isListening) {
    return "Press start to wake me up";
  }

  if (expression === "idle") {
    return "1x normal voice, 2x painful, 3x sexy, 4x sing";
  }

  if (mode === "painful") {
    return "PAINFUL MODE";
  }
  if (mode === "sexy") {
    return "SEXY MODE";
  }
  if (mode === "sing") {
    return "SING MODE";
  }

  return "NORMAL MODE";
}

export function FaceStage({
  expression,
  lastMode,
  score,
  isListening,
}: FaceStageProps) {
  const modeClass = lastMode ? `mode-${lastMode}` : "mode-normal";
  const energy = Math.min(score / 0.35, 1);
  const style = {
    "--energy": energy.toFixed(3),
  } as CSSProperties;

  return (
    <section className="pet-stage">
      <div className="pet-shell">
        <div className={`face ${expression} ${modeClass}`} style={style}>
          <div className="brows" aria-hidden="true">
            <span className="brow left" />
            <span className="brow right" />
          </div>

          <div className="eyes" aria-hidden="true">
            <span className="eye">
              <span className="pupil" />
            </span>
            <span className="eye">
              <span className="pupil" />
            </span>
          </div>
          <div className="mouth" aria-hidden="true" />
          <div className="cheek left" aria-hidden="true" />
          <div className="cheek right" aria-hidden="true" />
        </div>

        <p className="reaction-text">
          {getReactionText(expression, lastMode, isListening)}
        </p>
      </div>
    </section>
  );
}
