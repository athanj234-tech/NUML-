import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// FIX: Using recommended model for basic text tasks instead of a preview version.
const model = 'gemini-2.5-flash';

export const generateTutorResponse = async (prompt: string, systemInstruction: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is not configured. Please contact the administrator.";
  }
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return "Sorry, I encountered an error trying to respond. Please try again.";
  }
};
