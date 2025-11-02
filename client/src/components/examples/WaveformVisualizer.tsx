import { useState } from "react";
import WaveformVisualizer from "../WaveformVisualizer";
import { Button } from "@/components/ui/button";

export default function WaveformVisualizerExample() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background p-8">
      <WaveformVisualizer isActive={isActive} />
      <Button onClick={() => setIsActive(!isActive)} data-testid="button-toggle-waveform">
        {isActive ? "Stop" : "Start"} Waveform
      </Button>
    </div>
  );
}
