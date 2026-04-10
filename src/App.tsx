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
    status,
    stopListening,
    threshold,
    volume,
  } = usePunisherPet();

  return (
    <main className="app">
      <header>
        <h1>Punisher Pet</h1>
        <p>{status}</p>
      </header>

      <FaceStage expression={expression} lastMode={lastMode} />

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
