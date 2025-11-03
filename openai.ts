import OpenAI from "openai";
import fs from "fs";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "sk-..._P8A";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function transcribeAudio(audioPath: string): Promise<string> {
  try {
    const audioFile = fs.createReadStream(audioPath);
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });
    return transcription.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Failed to transcribe audio");
  }
}

export async function summarizeText(
  text: string,
  level: "brief" | "standard" | "detailed" = "standard"
): Promise<string> {
  try {
    const prompts = {
      brief: "Provide a very brief 1-2 sentence summary of the following text:",
      standard: "Provide a concise summary of the key points in the following text:",
      detailed: "Provide a detailed summary covering all main points and important details in the following text:",
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates clear, concise summaries.",
        },
        {
          role: "user",
          content: `${prompts[level]}\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw new Error("Failed to summarize text");
  }
}

export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  try {
    const languageNames: Record<string, string> = {
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
      ar: "Arabic",
    };

    const langName = languageNames[targetLanguage] || targetLanguage;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text to ${langName}. Maintain the original meaning and tone.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Failed to translate text");
  }
}
