import { Button } from "@/components/ui/button";
import { Mic, Languages, FileText, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">NS</span>
            </div>
            <h1 className="text-xl font-bold">NoteSense AI</h1>
          </div>
          <Button
            onClick={() => (window.location.href = "/api/login")}
            data-testid="button-landing-signin"
          >
            Sign In
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Speech into{" "}
            <span className="text-primary">Intelligent Text</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Convert voice to text with AI-powered summarization and multi-language
            translation using OpenAI's advanced technology.
          </p>
          <Button
            size="lg"
            className="text-lg h-12 px-8"
            onClick={() => (window.location.href = "/api/login")}
            data-testid="button-landing-get-started"
          >
            Get Started Free
          </Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Voice Recording</h3>
            <p className="text-sm text-muted-foreground">
              Record your voice directly or upload audio files in multiple formats
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-info/10 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-info" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate Transcription</h3>
            <p className="text-sm text-muted-foreground">
              Powered by OpenAI Whisper for high-accuracy speech-to-text conversion
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-success/10 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Summarization</h3>
            <p className="text-sm text-muted-foreground">
              Get instant summaries with customizable detail levels using GPT-4
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
              <Languages className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Translation</h3>
            <p className="text-sm text-muted-foreground">
              Translate your transcriptions into 10+ major languages instantly
            </p>
          </div>
        </section>

        <section className="text-center bg-card rounded-xl p-12 border">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to start converting your voice recordings into actionable text
          </p>
          <Button
            size="lg"
            onClick={() => (window.location.href = "/api/login")}
            data-testid="button-landing-cta"
          >
            Sign In with Replit
          </Button>
        </section>
      </main>
    </div>
  );
}
