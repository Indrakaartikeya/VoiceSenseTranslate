import SummaryCard from "../SummaryCard";

export default function SummaryCardExample() {
  const sampleSummary =
    "This recording discusses the implementation of a voice processing application using OpenAI's API. Key points include speech-to-text conversion, AI-powered summarization, and multi-language translation capabilities.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl">
        <SummaryCard
          summary={sampleSummary}
          onRegenerate={() => console.log("Regenerate summary")}
        />
      </div>
    </div>
  );
}
