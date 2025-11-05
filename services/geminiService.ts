
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: This is a placeholder for a secure API key management solution.
// In a real application, this should be handled via environment variables and backend requests.
const API_KEY = "AIzaSyCwElXMtBwHmJIK6HwPa0XkhU3hHyc4jiM";

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePostIdea = async (topic: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI features are disabled. Please configure your API key.");
  }
  
  try {
    const prompt = `Generate a short, engaging social media post idea about the following topic. The post should be under 280 characters. Topic: "${topic}"`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const text = response.text.trim();

    // Basic cleanup
    return text.replace(/^"|"$/g, '');

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    throw new Error("Failed to generate AI content. Please check your API key and network connection.");
  }
};
