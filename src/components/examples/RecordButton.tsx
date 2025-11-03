import { useState } from "react";
import RecordButton from "../RecordButton";

export default function RecordButtonExample() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 2000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <RecordButton
        isRecording={isRecording}
        isProcessing={isProcessing}
        onToggleRecording={handleToggle}
      />
    </div>
  );
}
