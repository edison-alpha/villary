
import { GoogleGenAI, Type } from "@google/genai";

// Initialize with direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConciergeResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: userMessage }] }
    ],
    config: {
      systemInstruction: `You are the Villays Luxury Villa Concierge. You provide sophisticated, helpful, and inspiring advice to high-net-worth travelers seeking premium villa stays. Suggest destinations like the Maldives, Amalfi Coast, or Mykonos. Keep responses elegant, concise, and professional. Mention that Villays handles everything from start to finish.`,
      temperature: 0.7,
    },
  });

  return response.text;
};

/**
 * Fetch local area insights using Google Maps grounding.
 */
export const getNearbyInsights = async (locationName: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `As an elite concierge, provide a curated guide for ${locationName}. 
    Structure your response into three clear sections: 
    1. Signature Dining (Top 3 Michelin or fine dining), 
    2. Secret Landmarks (3 Hidden gems), 
    3. Bespoke Experiences (3 Private/Luxury activities).
    Keep each description evocative and short.`,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    places: groundingChunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri,
      }))
  };
};

export const getVillaRecommendations = async (preferences: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on these preferences: "${preferences}", suggest 3 luxury villa categories.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            categoryName: { type: Type.STRING },
            reason: { type: Type.STRING },
            highlight: { type: Type.STRING },
          },
          required: ["categoryName", "reason", "highlight"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};
