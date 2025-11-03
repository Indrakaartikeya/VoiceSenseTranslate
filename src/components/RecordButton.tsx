import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecordButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onToggleRecording: () => void;
}

export default function RecordButton({
  isRecording,
  isProcessing,
  onToggleRecording,
}: RecordButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        size="icon"
        data-testid="button-record"
        onClick={onToggleRecording}
        disabled={isProcessing}
        className={cn(
          "h-28 w-28 md:h-32 md:w-32 rounded-full shadow-xl transition-all duration-300",
          isRecording
            ? "bg-destructive hover:bg-destructive animate-pulse scale-105"
            : "bg-white border-4 border-primary text-primary hover:bg-white hover:scale-105"
        )}
      >
        {isProcessing ? (
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        ) : isRecording ? (
          <Square className="h-10 w-10" fill="currentColor" />
        ) : (
          <Mic className="h-10 w-10" />
        )}
      </Button>
      <p className="text-sm text-muted-foreground font-medium">
        {isProcessing
          ? "Processing..."
          : isRecording
          ? "Recording... Click to stop"
          : "Click to start recording"}
      </p>
    </div>
  );
}
