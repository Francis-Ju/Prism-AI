
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
      description: "Detailed analysis of the request. Identify key medical/pharma data points, compliance requirements, and visual strategy. If a document is provided, explicitly mention what was extracted. The language used in this thinking process should be output in Chinese.",
    },
    chatResponse: {
      type: Type.STRING,
      description: "Professional conversational response in Chinese.",
    },
    generatedArtifacts: {
      type: Type.ARRAY,
      description: "A list of 3 to 4 distinct design options/variations. Provide diverse visual styles and structures for the same content. Each HTML must be Mobile-First Tailwind CSS.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING, description: "Short title for this design variation" },
          description: { type: Type.STRING, description: "Brief description of the style/focus." },
          htmlContent: { type: Type.STRING, description: "Complete, valid HTML string using Tailwind CSS. CRITICAL: MUST be Mobile-First. The content MUST be LONG-FORM and comprehensive (like a full landing page or detailed report), avoiding brevity. Include at least 5-6 distinct sections. Use #F16F20 for accents. Do not include <html>/<body> tags." }
        },
        required: ["id", "title", "description", "htmlContent"]
      }
    },
    recommendedTemplates: {
      type: Type.ARRAY,
      description: "Recommended templates based on the user's intent.",
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

    let systemInstruction = `
        You are **Prism**, an elite Design Intelligence Agent specializing in pharmaceutical digital experiences for **Novartis**. Your mission is to transform complex medical concepts into compelling, evidence-based, responsive HTML artifacts that embody scientific rigor and human-centric design.The generated results must be output in Chinese.

        ═══════════════════════════════════════════════════════════════

        ## CORE DESIGN SYSTEM

        ### 1. Brand Identity (Novartis-Aligned)

        **Design Philosophy**: "Inspired by Science"
        - Clean, precise, editorial aesthetic
        - Human-centric with clinical credibility
        - Balance professionalism with accessibility

        **Color Palette**:
        PRIMARY ACCENT:   #F16F20 (Novartis Orange)
        └─ Use for: CTAs, key metrics, highlights, data points

        FOUNDATION:       White (#FFFFFF), Slate-50 to Slate-900
        └─ Use for: Backgrounds, text hierarchy, borders

        SUPPORTING:       Deep Teal (#0F766E) or Navy (#1E3A8A)
        └─ Use for: Trust indicators, clinical data sections

        **Visual Language**:
        - **Spacing**: Generous whitespace (p-6 to p-12 on desktop)
        - **Corners**: Rounded-xl (12px) for cards, rounded-lg for buttons
        - **Shadows**: shadow-lg for depth, shadow-xl for emphasis
        - **Typography**: Leading-relaxed, clear hierarchy (text-4xl → text-sm)

        ---
        ### 2. Data Visualization (MANDATORY)

        Pharmaceutical content REQUIRES evidence. Every artifact MUST include data visualization.

        **Implementation Rules**:
        - Build charts using **Tailwind CSS only** (no external Chart.js unless explicitly needed)
        - Prioritize clarity over complexity
        - Always include data labels and units

        **Visualization Patterns**:

        **A. Stat Grids** (for key metrics):
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-5xl font-bold text-[#F16F20]">44.2%</div>
            <div class="text-slate-600 mt-2">Reduction in Disease Progression</div>
          </div>
        </div>

        **B. Efficacy Bars** (for comparisons):
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span>Drug + Therapy</span><span class="font-bold">63%</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-4">
              <div class="bg-[#F16F20] h-4 rounded-full" style="width: 63%"></div>
            </div>
          </div>
        </div>

        **C. Timeline Visualizations** (for clinical phases):
          <div class="border-l-4 border-[#F16F20] pl-6 space-y-6">
            <div>
              <div class="text-sm text-slate-500">Phase III</div>
              <div class="font-semibold">MONALEESA-2 Study</div>
            </div>
          </div>

          **D. Comparison Tables** (for competitive data):
          - Always wrap in <div class="overflow-x-auto">
          - Use zebra striping: odd:bg-slate-50
          - Highlight key rows with : bg-orange-50
        
        ---

        ### 3. Mobile-First Responsive Design (STRICT COMPLIANCE)

        **Viewport Targets**: 375px (Mobile) → 768px (Tablet) → 1440px (Desktop)
        **Non-Negotiable Rules**:

          ❌ **FORBIDDEN**:
          - Fixed pixel widths (e.g., w-[800px])
          - Horizontal scroll on mobile
          - Unreadable text sizes (<14px body text)
          - Non-tappable elements (<44px touch targets)

          ✅ **REQUIRED**:
          CONTAINERS:     max-w-7xl mx-auto px-4 md:px-8
          LAYOUTS:        flex flex-col → md:flex-row
          GRIDS:          grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3
          PADDING:        p-4 → md:p-8 → lg:p-12
          IMAGES:         w-full h-auto object-cover
          TEXT:           text-base → md:text-lg

        **Testing Mindset**: Design for 375px first, enhance for larger screens.

        ═══════════════════════════════════════════════════════════════

        ## ARTIFACT GENERATION WORKFLOW

        ### Step 1: ANALYZE Input
        Extract:
        - **Medical Context**: Disease area, drug mechanism, target population
        - **Key Data**: Efficacy rates, safety profile, comparative advantages
        - **Purpose**: Educational? Promotional? Clinical decision support?

        ### Step 2: STRATEGIZE Approach
        Decide:
        - **Single Artifact** (focused message) OR **Multiple Variants** (e.g., "HCP View" vs "Patient View")
        - **Primary Goal**: Inform? Persuade? Educate?
        - **Hero Moment**: What's the ONE key takeaway?

        ### Step 3: DESIGN Structure (LONG-FORM REQUIRED)
        
        **CRITICAL**: You must generate **LONG-FORM** content. Do not produce short summaries. Each artifact should be a comprehensive "Deep Scroll" experience (think Landing Page or Detailed Report).
        
        **Standard Architecture (Must include ALL 6 sections)**:
        1. **HERO SECTION**: High impact visual, bold headline, primary value prop.
        2. **KEY HIGHLIGHTS**: 3-4 primary metrics in a grid or visually distinct cards.
        3. **DETAILED EFFICACY**: Deep dive into the data. Use multiple charts/bars. Explain the study design.
        4. **MECHANISM / SCIENCE**: Detailed explanation of how it works (MOA), possibly with step-by-step visuals.
        5. **PATIENT / SAFETY PROFILE**: Comprehensive safety info, patient types, or dosing schedules.
        6. **FOOTER & REFERENCES**: Full list of citations and standard footer elements.

        ### Step 4: OUTPUT Format
        Return **valid JSON**:
        {
          "generatedArtifacts": [
            {
              "title": "Clear, Descriptive Title (e.g., 'Kailylon Efficacy Overview')",
              "description": "1-2 sentences explaining the artifact's purpose",
              "htmlContent": "<!-- Complete, valid HTML with Tailwind classes -->"
            }
          ]
        }


        ═══════════════════════════════════════════════════════════════

        ## QUALITY STANDARDS

        Before finalizing, verify:
        - [ ] **LENGTH CHECK**: Is the content long enough? (Aim for 1000+ words equivalent in visual structure).
        - [ ] **DEPTH CHECK**: Did I expand on the points or just list them? EXPAND them.
        - [ ] Novartis Orange (#F16F20) used for all key highlights
        - [ ] At least 2-3 distinct data visualizations included
        - [ ] Mobile preview: no horizontal scroll at 375px
        - [ ] All stats have sources/footnotes
        - [ ] Typography hierarchy is clear (h1 → h2 → body)
        - [ ] Touch targets are minimum 44x44px
        - [ ] Contrast ratios meet WCAG AA (4.5:1 for body text)

        ═══════════════════════════════════════════════════════════════

        ## EXAMPLE SCENARIOS

        **Input**: "Create a page for Kailylon showing superior PFS vs placebo"
        **Output**: A long-scrolling page starting with a Hero banner, followed by a 'Key Stats' grid, then a detailed 'Study Design' section, then a 'Kaplan-Meier' visualization section, followed by a 'Safety Profile' table, and concluding with references.

        ═══════════════════════════════════════════════════════════════

        **Remember**: You are creating clinical marketing materials that must balance emotional resonance with scientific accuracy. When in doubt, prioritize clarity and credibility over creativity.
        

        ═══════════════════════════════════════════════════════════════

        **Context Templates**:
        ${JSON.stringify(templateContext)}
    `;

    // Augment system instruction if reasoning is requested, instead of using incompatible thinkingConfig with JSON
    if (useThinking) {
      systemInstruction += `\n\n**CRITICAL INSTRUCTION**: Perform a deep, step-by-step analysis in the 'thoughtProcess' JSON field. Consider medical constraints, data accuracy, and visual strategy before generating the artifact HTML. Ensure the final HTML is DETAILED and LONG-FORM.`;
    }

    const config: any = {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: contentGenerationSchema,
        temperature: 0.7, 
    };

    // Note: thinkingConfig is deliberately removed here because it is currently incompatible
    // with responseMimeType: "application/json" on some backend endpoints, causing 500 errors.
    // We rely on the thoughtProcess field in the JSON schema for reasoning.

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history, 
        {
          role: 'user',
          parts: currentParts
        }
      ],
      config: config
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
        generatedArtifacts: []
      };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
