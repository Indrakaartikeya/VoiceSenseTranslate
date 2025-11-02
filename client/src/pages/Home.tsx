import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import RecordButton from "@/components/RecordButton";
import WaveformVisualizer from "@/components/WaveformVisualizer";
import RecordingTimer from "@/components/RecordingTimer";
import TranscriptionCard from "@/components/TranscriptionCard";
import SummaryCard from "@/components/SummaryCard";
import TranslationCard from "@/components/TranslationCard";
import HistoryListItem from "@/components/HistoryListItem";
import { Button } from "@/components/ui/button";
import { Upload, History, FileAudio } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mockTranscription =
    "Welcome to NoteSense AI, the intelligent voice processing application. This demo showcases our speech-to-text capabilities powered by OpenAI's Whisper API. You can record your voice, upload audio files, and get instant transcriptions with AI-powered summaries and translations in multiple languages.";

  const mockSummary =
    "NoteSense AI demonstration highlighting voice recording, transcription, AI summarization, and multi-language translation features using OpenAI technology.";

  const mockTranslation =
    "Bienvenido a NoteSense AI, la aplicación inteligente de procesamiento de voz. Esta demostración muestra nuestras capacidades de conversión de voz a texto impulsadas por la API Whisper de OpenAI.";

  const mockHistory = [
    {
      id: "1",
      date: "Today, 2:30 PM",
      duration: "3:45",
      preview: "Discussion about AI integration and voice processing features...",
    },
    {
      id: "2",
      date: "Yesterday, 10:15 AM",
      duration: "2:12",
      preview: "Meeting notes covering project requirements and timeline...",
    },
    {
      id: "3",
      date: "Nov 1, 2025",
      duration: "5:30",
      preview: "Interview transcript discussing technology trends and innovations...",
    },
  ];

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 2000);
    } else {
      setIsRecording(true);
      setShowResults(false);
    }
  };

  const displayUser = user
    ? {
        name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "User",
        email: user.email || "",
        avatar: user.profileImageUrl || undefined,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={displayUser}
        onLogout={() => (window.location.href = "/api/logout")}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="flex flex-col items-center justify-center min-h-[50vh] gap-8 mb-12">
          <RecordingTimer isRecording={isRecording} />
          <RecordButton
            isRecording={isRecording}
            isProcessing={isProcessing}
            onToggleRecording={handleToggleRecording}
          />
          {isRecording && (
            <div className="w-full max-w-2xl">
              <WaveformVisualizer isActive={isRecording} />
            </div>
          )}
        </section>

        {!showResults && !isRecording && (
          <section className="grid md:grid-cols-3 gap-6 mb-12">
            <Button
              variant="outline"
              className="h-32 flex-col gap-2 hover-elevate"
              data-testid="button-upload"
            >
              <Upload className="h-8 w-8" />
              <span className="font-medium">Upload Audio</span>
              <span className="text-xs text-muted-foreground">MP3, WAV, M4A</span>
            </Button>
            <Button
              variant="outline"
              className="h-32 flex-col gap-2 hover-elevate"
              onClick={() => setShowResults(true)}
              data-testid="button-view-recent"
            >
              <FileAudio className="h-8 w-8" />
              <span className="font-medium">Recent Recording</span>
              <span className="text-xs text-muted-foreground">3:45 duration</span>
            </Button>
            <Button
              variant="outline"
              className="h-32 flex-col gap-2 hover-elevate"
              data-testid="button-view-history"
            >
              <History className="h-8 w-8" />
              <span className="font-medium">View History</span>
              <span className="text-xs text-muted-foreground">{mockHistory.length} recordings</span>
            </Button>
          </section>
        )}

        {showResults && (
          <section className="space-y-6 mb-12">
            <TranscriptionCard text={mockTranscription} />
            <SummaryCard
              summary={mockSummary}
              onRegenerate={() => console.log("Regenerate summary")}
            />
            <TranslationCard
              originalText={mockTranscription}
              translatedText={mockTranslation}
              onLanguageChange={(lang) => console.log("Language:", lang)}
            />
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Recordings</h2>
          {mockHistory.map((item) => (
            <HistoryListItem
              key={item.id}
              {...item}
              onClick={(id) => {
                console.log("View recording:", id);
                setShowResults(true);
              }}
              onDelete={(id) => console.log("Delete:", id)}
              onShare={(id) => console.log("Share:", id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
