
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DEFAULT_TEMPLATES } from "../constants";

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
    recommendedTemplates: {
      type: Type.ARRAY,
      description: "A list of template IDs from the provided library that would be suitable starting points for the user's request.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          description: { type: Type.STRING, description: "A brief reason why this template is recommended." }
        },
        required: ["id", "name", "description"]
      }
    }
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

    // Prepare template info for context
    const templateContext = DEFAULT_TEMPLATES.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.category
    }));

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
        
        AVAILABLE TEMPLATES:
        ${JSON.stringify(templateContext)}

        1. **Analysis**: When a user provides a document (PDF/Image/Text), you MUST first analyze it in your 'thoughtProcess'. 
           - Identify the main topic (e.g., Pharmaceutical product, Financial report, Event flyer).
           - Extract key statistics, dates, or features.
           - Determine the sentiment and appropriate visual tone.
        
        2. **Recommendation**: If the user's request aligns with one of our available templates, recommend it in the 'recommendedTemplates' array. This helps the user get started quickly.
        
        3. **Generation**: When asked to generate the visual content *directly* (or if no template fits), output highly polished HTML using Tailwind CSS utility classes in 'generatedHtml'. 
           - The HTML should be responsive and beautiful.
           - Use placeholder images from https://picsum.photos/600/400 (or other dimensions) where appropriate.
           - Use modern design principles (whitespace, typography, contrast).
           - Focus on "Long Graphic" or "Landing Page" styles.
        
        OUTPUT FORMAT:
        You must respond in JSON format adhering to the schema provided.
        - 'thoughtProcess': Your internal reasoning and DOCUMENT ANALYSIS.
        - 'chatResponse': What you say to the user.
        - 'generatedHtml': The HTML content for the preview pane (optional).
        - 'recommendedTemplates': List of suitable templates (optional).
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
