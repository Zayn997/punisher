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
        <div
          className={`face grandma ${expression} ${modeClass}`}
          style={style}
        >
          <div className="wind-streaks" aria-hidden="true">
            <span className="streak s1" />
            <span className="streak s2" />
            <span className="streak s3" />
          </div>

          <div className="hair" aria-hidden="true">
            <div className="hair-bun top" />
            <div className="hair-curl left-1" />
            <div className="hair-curl left-2" />
            <div className="hair-curl right-1" />
            <div className="hair-curl right-2" />
          </div>

          <div className="jowls" aria-hidden="true">
            <span className="jowl left" />
            <span className="jowl right" />
          </div>

          <div className="chin" aria-hidden="true">
            <span className="crease top" />
            <span className="crease bottom" />
          </div>

          <div className="scar" aria-hidden="true">
            <span className="scar-line" />
            <span className="scar-stitch" />
            <span className="scar-stitch" />
            <span className="scar-stitch" />
          </div>

          <div className="brows" aria-hidden="true">
            <span className="brow left" />
            <span className="brow right" />
          </div>

          <div className="scary-eyes" aria-hidden="true">
            <span className="scary-eye left">
              <span className="scary-pupil" />
            </span>
            <span className="scary-eye right">
              <span className="scary-pupil" />
            </span>
          </div>

          <div className="sunglasses glasses-cat-eye" aria-hidden="true">
            <span className="lens left">
              <span className="crystal" />
              <span className="glare" />
              <span className="crack" />
            </span>
            <span className="lens right">
              <span className="crystal" />
              <span className="glare" />
              <span className="crack" />
            </span>
            <span className="bridge" />
            <span className="chain left" />
            <span className="chain right" />
          </div>

          <div className="mouth-area" aria-hidden="true">
            <div className="mouth has-lipstick" />
            <div className="pearl-necklace">
              <span className="pearl" />
              <span className="pearl" />
              <span className="pearl" />
              <span className="pearl" />
              <span className="pearl" />
              <span className="pearl" />
              <span className="pearl" />
            </div>
            <div className="beauty-mark" />
          </div>
        </div>

        <p className="reaction-text">
          {getReactionText(expression, lastMode, isListening)}
        </p>
      </div>
    </section>
  );
}
