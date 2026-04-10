import type { ComboMode, Expression } from "../types/pet";

type FaceStageProps = {
  expression: Expression;
  lastMode: ComboMode | null;
};

function getReactionText(expression: Expression, mode: ComboMode | null) {
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

export function FaceStage({ expression, lastMode }: FaceStageProps) {
  return (
    <section className="stage">
      <div className={`face ${expression}`}>
        <div className="eyes" aria-hidden="true">
          <span className="eye" />
          <span className="eye" />
        </div>
        <div className="mouth" aria-hidden="true" />
        <div className="cheek left" aria-hidden="true" />
        <div className="cheek right" aria-hidden="true" />
      </div>

      <p className="reaction-text">{getReactionText(expression, lastMode)}</p>
    </section>
  );
}
