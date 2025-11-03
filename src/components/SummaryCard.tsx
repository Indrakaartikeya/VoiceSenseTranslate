import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SummaryCardProps {
  summary: string;
  onRegenerate?: () => void;
}

export default function SummaryCard({ summary, onRegenerate }: SummaryCardProps) {
  const [copied, setCopied] = useState(false);
  const [summaryLevel, setSummaryLevel] = useState<"brief" | "standard" | "detailed">("standard");

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!summary) return null;

  return (
    <Card className="w-full border-l-4 border-l-info" data-testid="card-summary">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">AI Summary</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onRegenerate}
            data-testid="button-regenerate-summary"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            data-testid="button-copy-summary"
          >
            {copied ? (
              <Check className="h-5 w-5 text-success" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Badge
            variant={summaryLevel === "brief" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSummaryLevel("brief")}
            data-testid="badge-summary-brief"
          >
            Brief
          </Badge>
          <Badge
            variant={summaryLevel === "standard" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSummaryLevel("standard")}
            data-testid="badge-summary-standard"
          >
            Standard
          </Badge>
          <Badge
            variant={summaryLevel === "detailed" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSummaryLevel("detailed")}
            data-testid="badge-summary-detailed"
          >
            Detailed
          </Badge>
        </div>
        <div
          className="text-base leading-relaxed min-h-[100px] max-h-[300px] overflow-y-auto"
          data-testid="text-summary-content"
        >
          {summary}
        </div>
      </CardContent>
    </Card>
  );
}
