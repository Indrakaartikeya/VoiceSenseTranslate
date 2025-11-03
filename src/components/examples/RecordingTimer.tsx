import { useState } from "react";
import RecordingTimer from "../RecordingTimer";
import { Button } from "@/components/ui/button";

export default function RecordingTimerExample() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background">
      <RecordingTimer isRecording={isRecording} />
      <Button onClick={() => setIsRecording(!isRecording)} data-testid="button-toggle-recording">
        {isRecording ? "Stop" : "Start"} Recording
      </Button>
    </div>
  );
}
