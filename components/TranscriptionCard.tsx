import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface TranscriptionCardProps {
  text: string;
}

export default function TranscriptionCard({ text }: TranscriptionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!text) return null;

  return (
    <Card className="w-full border-l-4 border-l-primary" data-testid="card-transcription">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Transcription</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          data-testid="button-copy-transcription"
        >
          {copied ? (
            <Check className="h-5 w-5 text-success" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div
          className="text-base leading-relaxed min-h-[150px] max-h-[400px] overflow-y-auto"
          data-testid="text-transcription-content"
        >
          {text}
        </div>
      </CardContent>
    </Card>
  );
}
