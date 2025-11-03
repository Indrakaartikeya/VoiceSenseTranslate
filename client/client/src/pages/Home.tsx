import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Recording } from "@shared/schema";
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
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isRecording, audioBlob, duration, startRecording, stopRecording, resetRecording } = useAudioRecorder();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  // Fetch user recordings
  const { data: recordings = [] } = useQuery<Recording[]>({
    queryKey: ["/api/recordings"],
  });

  // Transcribe audio mutation
  const transcribeMutation = useMutation({
    mutationFn: async (audio: Blob) => {
      const formData = new FormData();
      formData.append("audio", audio, "recording.webm");
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Transcription failed");
      return response.json();
    },
    onSuccess: async (data) => {
      setTranscription(data.transcription);
      
      // Auto-generate summary
      try {
        const summaryResult = await summarizeMutation.mutateAsync({
          text: data.transcription,
          level: "standard",
        });
        setSummary(summaryResult.summary);
      } catch (error) {
        console.error("Error generating summary:", error);
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Transcription Failed",
        description: "Failed to transcribe audio. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Summarize text mutation
  const summarizeMutation = useMutation({
    mutationFn: async ({ text, level }: { text: string; level: string }) => {
      const result = await apiRequest("/api/summarize", "POST", { text, level });
      return result as unknown as { summary: string };
    },
    onError: (error) => {
      toast({
        title: "Summarization Failed",
        description: error instanceof Error ? error.message : "Unable to generate summary. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Translate text mutation
  const translateMutation = useMutation({
    mutationFn: async ({ text, targetLanguage }: { text: string; targetLanguage: string }) => {
      const result = await apiRequest("/api/translate", "POST", { text, targetLanguage });
      return result as unknown as { translation: string };
    },
    onSuccess: (data) => {
      setTranslation(data.translation);
    },
    onError: (error) => {
      toast({
        title: "Translation Failed",
        description: error instanceof Error ? error.message : "Unable to translate text. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Save recording mutation
  const saveRecordingMutation = useMutation({
    mutationFn: async (data: {
      duration: number;
      transcription: string;
      summary?: string;
      translation?: string;
      translationLanguage?: string;
    }) => {
      return await apiRequest("/api/recordings", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/recordings"] });
      toast({
        title: "Success",
        description: "Recording saved successfully",
      });
    },
  });

  // Delete recording mutation
  const deleteRecordingMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/recordings/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/recordings"] });
      toast({
        title: "Success",
        description: "Recording deleted successfully",
      });
    },
  });

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        await startRecording();
      } catch (error) {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to record audio.",
          variant: "destructive",
        });
      }
    }
  };

  // Process audio when recording stops
  const handleProcessAudio = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      await transcribeMutation.mutateAsync(audioBlob);
      
      // Save recording
      await saveRecordingMutation.mutateAsync({
        duration,
        transcription: transcription || "",
        summary: summary || "",
      });
    } catch (error) {
      console.error("Error processing audio:", error);
    } finally {
      setIsProcessing(false);
      resetRecording();
    }
  };

  // Handle language change for translation
  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    if (transcription) {
      await translateMutation.mutateAsync({
        text: transcription,
        targetLanguage: language,
      });
    }
  };

  // Handle summary regeneration
  const handleRegenerateSummary = async () => {
    if (transcription) {
      try {
        const result = await summarizeMutation.mutateAsync({
          text: transcription,
          level: "detailed",
        });
        setSummary(result.summary);
      } catch (error) {
        toast({
          title: "Failed to regenerate summary",
          variant: "destructive",
        });
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
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
          {audioBlob && !isProcessing && (
            <Button
              onClick={handleProcessAudio}
              size="lg"
              data-testid="button-process-audio"
            >
              Process Recording
            </Button>
          )}
        </section>

        {transcription && (
          <section className="space-y-6 mb-12">
            <TranscriptionCard text={transcription} />
            {summary && (
              <SummaryCard summary={summary} onRegenerate={handleRegenerateSummary} />
            )}
            {translation && (
              <TranslationCard
                originalText={transcription}
                translatedText={translation}
                onLanguageChange={handleLanguageChange}
              />
            )}
            {!translation && transcription && (
              <Button
                variant="outline"
                onClick={() => handleLanguageChange(selectedLanguage)}
                data-testid="button-translate"
              >
                Translate to {selectedLanguage}
              </Button>
            )}
          </section>
        )}

        {recordings.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Recordings</h2>
            {recordings.map((recording) => (
              <HistoryListItem
                key={recording.id}
                id={recording.id}
                date={formatDate(recording.createdAt?.toString() || "")}
                duration={formatDuration(recording.duration)}
                preview={recording.transcription || "No transcription available"}
                onClick={(id) => {
                  const rec = recordings.find((r) => r.id === id);
                  if (rec) {
                    setCurrentRecording(rec);
                    setTranscription(rec.transcription || "");
                    setSummary(rec.summary || "");
                    setTranslation(rec.translation || "");
                  }
                }}
                onDelete={(id) => deleteRecordingMutation.mutate(id)}
                onShare={(id) => {
                  toast({
                    title: "Share feature coming soon!",
                  });
                }}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
