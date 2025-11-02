import TranscriptionCard from "../TranscriptionCard";

export default function TranscriptionCardExample() {
  const sampleText =
    "Hello, this is a sample transcription of a voice recording. The system has successfully converted speech to text using OpenAI's Whisper API. This transcription demonstrates the accuracy and clarity of the voice-to-text conversion process.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl">
        <TranscriptionCard text={sampleText} />
      </div>
    </div>
  );
}
