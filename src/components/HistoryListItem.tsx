import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Share2, Clock } from "lucide-react";

interface HistoryListItemProps {
  id: string;
  date: string;
  duration: string;
  preview: string;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function HistoryListItem({
  id,
  date,
  duration,
  preview,
  onDelete,
  onShare,
  onClick,
}: HistoryListItemProps) {
  return (
    <Card
      className="p-4 hover-elevate cursor-pointer transition-all"
      onClick={() => onClick?.(id)}
      data-testid={`card-history-${id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span>{date}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <p className="text-base line-clamp-2" data-testid={`text-preview-${id}`}>
            {preview}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.(id);
            }}
            data-testid={`button-share-${id}`}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
            data-testid={`button-delete-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
