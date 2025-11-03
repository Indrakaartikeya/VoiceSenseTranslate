import TranslationCard from "../TranslationCard";

export default function TranslationCardExample() {
  const originalText = "Hello, this is a sample transcription of a voice recording.";
  const translatedText = "Hola, esta es una transcripción de muestra de una grabación de voz.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl">
        <TranslationCard
          originalText={originalText}
          translatedText={translatedText}
          onLanguageChange={(lang) => console.log("Language changed to:", lang)}
        />
      </div>
    </div>
  );
}
