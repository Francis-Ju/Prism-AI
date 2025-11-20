import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize the client
// Note: The API key must be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the schema for structured output
const contentGenerationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    thoughtProcess: {
      type: Type.STRING,
      description: "Detailed analysis of the user's request and any attached documents. Analyze the file content deeply, extract key data points, identify the core message, and outline the design strategy for the HTML artifact.",
    },
    chatResponse: {
      type: Type.STRING,
      description: "The conversational response to display in the chat window.",
    },
    generatedHtml: {
      type: Type.STRING,
      description: "The full, valid HTML string for the long graphic/landing page. Use Tailwind CSS classes for styling. Do not include <html> or <body> tags, just the inner content structure. Ensure it looks modern and premium.",
    },
  },
  required: ["thoughtProcess", "chatResponse"],
};

export const generateAgentResponse = async (
  prompt: string,
  history: { role: string; parts: any[] }[],
  inlineData?: string,
  mimeType?: string,
  modelName: string = 'gemini-2.5-flash'
) => {
  try {
    // Construct contents
    const currentParts: any[] = [];
    
    if (inlineData && mimeType) {
      currentParts.push({
        inlineData: {
          data: inlineData,
          mimeType: mimeType,
        },
      });
    }
    
    currentParts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history, 
        {
          role: 'user',
          parts: currentParts
        }
      ],
      config: {
        systemInstruction: `You are Prism, an advanced Design Intelligence Agent.
        
        Your personality is sophisticated, creative, and precise. You turn abstract ideas into visual reality.
        
        1. **Analysis**: When a user provides a document (PDF/Image/Text), you MUST first analyze it in your 'thoughtProcess'. 
           - Identify the main topic (e.g., Pharmaceutical product, Financial report, Event flyer).
           - Extract key statistics, dates, or features.
           - Determine the sentiment and appropriate visual tone.
        
        2. **Guidance**: Guide the user to select a visual style (e.g., "Midnight Premium", "Swiss Minimalist", "Neon Cyberpunk").
        
        3. **Generation**: When asked to generate the visual content, output highly polished HTML using Tailwind CSS utility classes. 
           - The HTML should be responsive and beautiful.
           - Use placeholder images from https://picsum.photos/600/400 (or other dimensions) where appropriate.
           - Use modern design principles (whitespace, typography, contrast).
           - Focus on "Long Graphic" or "Landing Page" styles.
        
        OUTPUT FORMAT:
        You must respond in JSON format adhering to the schema provided.
        - 'thoughtProcess': Your internal reasoning and DOCUMENT ANALYSIS.
        - 'chatResponse': What you say to the user.
        - 'generatedHtml': The HTML content for the preview pane (only if requested).
        `,
        responseMimeType: "application/json",
        responseSchema: contentGenerationSchema,
        // Use a slightly higher temperature for creative tasks
        temperature: 0.7, 
      }
    });

    let text = response.text;

    // Robust JSON extraction: find the first '{' and last '}' to ignore potential markdown or preamble
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("JSON Parsing failed", e, text);
      // Fallback to prevent app crash, returning the raw text as the chat response
      return {
        thoughtProcess: "Error parsing structured response.",
        chatResponse: text || "I encountered an issue processing the design. Please try again.",
        generatedHtml: ""
      };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
