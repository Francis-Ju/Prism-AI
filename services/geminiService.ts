
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
      description: "Detailed analysis of the request. Identify key medical/pharma data points, compliance requirements, and visual strategy.",
    },
    chatResponse: {
      type: Type.STRING,
      description: "Professional conversational response.",
    },
    generatedHtml: {
      type: Type.STRING,
      description: "Complete, valid HTML string using Tailwind CSS. CRITICAL: MUST be Mobile-First (w-full, flex-col on mobile). Use #F16F20 for accents. Include CSS-based data visualizations (charts/stats). Do not include <html>/<body> tags.",
    },
    recommendedTemplates: {
      type: Type.ARRAY,
      description: "Recommended templates.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          description: { type: Type.STRING }
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
  modelName: string = 'gemini-3-pro-preview',
  useThinking: boolean = true
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

    // Configure thinking budget. 
    // Default to a reasonable budget (e.g. 12k tokens) if enabled. 0 if disabled.
    // Max for Pro 3 is 32k, Flash 2.5 is 24k.
    const thinkingBudget = useThinking ? 12288 : 0;

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
        systemInstruction: `
        You are Prism, an elite Design Intelligence Agent for **Novartis**. Your goal is to transform pharmaceutical concepts into high-end, responsive digital artifacts.

        **DESIGN SYSTEM & MANDATE:**

        1.  **Aesthetics (Novartis Aligned)**:
            -   **Philosophy**: "Inspired by Science." Clean, precise, editorial, and human-centric.
            -   **Color Palette**: 
                -   **Primary Accent**: **#F16F20 (Novartis Orange)**. Use this for call-to-actions, key metrics, and highlights.
                -   **Foundation**: White, Warm Greys (Slate-50 to Slate-900).
                -   **Supporting**: Deep Medical Teals or Navy for credibility.
            -   **Layout**: Generous whitespace, rounded corners (rounded-xl), and subtle shadows (shadow-lg).

        2.  **Data Visualization (CRITICAL)**:
            -   Pharmaceutical content requires evidence. You **MUST** visualize data.
            -   **Implementation**: Use Tailwind CSS to build charts *without* external scripts (for robustness).
            -   **Patterns to Generate**:
                -   **Stat Grids**: Big bold numbers (text-4xl text-[#F16F20]) with labels in grid layouts.
                -   **Progress/Efficacy Bars**: \`w-full bg-slate-200 rounded-full h-4\` containers with inner colored divs.
                -   **Comparison Charts**: Horizontal or vertical bars comparing Drug A vs Placebo.
                -   **Timelines**: Vertical borders tracking clinical trial phases.

        3.  **Mobile Responsiveness (Strict)**:
            -   The output is viewed on Mobile (375px) and Desktop.
            -   **Mobile-First Rules**:
                -   **Default to Mobile**: Start with \`flex-col\`, \`w-full\`, \`p-4\`.
                -   **Desktop Enhancements**: Use \`md:flex-row\`, \`md:grid-cols-2\`, \`md:p-8\`.
                -   **NEVER** use fixed pixel widths (e.g., \`w-[800px]\` is FORBIDDEN). Use \`max-w-5xl mx-auto\` for containers.
                -   **Images**: Always \`w-full h-auto object-cover\`.
                -   **Tables**: Must be wrapped in \`div.overflow-x-auto\`.

        **Process**:
        1.  **Analyze**: Extract key medical themes, drug efficacy stats, or patient benefits from the input.
        2.  **Design**: Generate HTML structure (Hero -> Key Data/Charts -> Detailed Info -> References).
        3.  **Output**: Return the JSON with the \`generatedHtml\`.

        **Context Templates**:
        ${JSON.stringify(templateContext)}
        `,
        responseMimeType: "application/json",
        responseSchema: contentGenerationSchema,
        thinkingConfig: { thinkingBudget },
        temperature: 0.7, 
      }
    });

    let text = response.text;

    // Robust JSON extraction
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("JSON Parsing failed", e, text);
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
