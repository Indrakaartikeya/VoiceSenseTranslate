import { useEffect, useState } from "react";

interface RecordingTimerProps {
  isRecording: boolean;
  onReset?: () => void;
}

export default function RecordingTimer({ isRecording, onReset }: RecordingTimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRecording) {
      setSeconds(0);
      onReset?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, onReset]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isRecording && seconds === 0) return null;

  return (
    <div
      className="text-3xl md:text-4xl font-semibold tabular-nums"
      style={{
        color: isRecording ? "hsl(4, 84%, 68%)" : "hsl(210, 6%, 12%)",
      }}
      data-testid="text-recording-timer"
    >
      {formatTime(seconds)}
    </div>
  );
}
