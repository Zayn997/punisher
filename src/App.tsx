import { ControlsPanel } from "./components/ControlsPanel";
import { FaceStage } from "./components/FaceStage";
import { usePunisherPet } from "./hooks/usePunisherPet";
import "./App.css";

function App() {
  const {
    expression,
    isListening,
    lastMode,
    score,
    sensitivity,
    setSensitivity,
    setVolume,
    startListening,
    stopListening,
    threshold,
    volume,
  } = usePunisherPet();

  return (
    <main className="app">
      <FaceStage
        expression={expression}
        lastMode={lastMode}
        score={score}
        isListening={isListening}
      />

      <ControlsPanel
        isListening={isListening}
        onStart={startListening}
        onStop={stopListening}
        sensitivity={sensitivity}
        onSensitivityChange={setSensitivity}
        volume={volume}
        onVolumeChange={setVolume}
        score={score}
        threshold={threshold}
      />
    </main>
  );
}

export default App;
