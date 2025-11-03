import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TranslationCardProps {
  originalText: string;
  translatedText: string;
  onLanguageChange?: (language: string) => void;
}

const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
];

export default function TranslationCard({
  originalText,
  translatedText,
  onLanguageChange,
}: TranslationCardProps) {
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    onLanguageChange?.(value);
  };

  if (!translatedText) return null;

  return (
    <Card className="w-full border-l-4 border-l-success" data-testid="card-translation">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Translation</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]" data-testid="select-language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            data-testid="button-copy-translation"
          >
            {copied ? (
              <Check className="h-5 w-5 text-success" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Original</h4>
            <div className="text-base leading-relaxed" data-testid="text-original">
              {originalText}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              {languages.find((l) => l.code === selectedLanguage)?.name}
            </h4>
            <div className="text-base leading-relaxed" data-testid="text-translated">
              {translatedText}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
