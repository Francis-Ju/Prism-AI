
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DEFAULT_TEMPLATES } from "../constants";

// Define the schema for structured output
const contentGenerationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    thoughtProcess: {
      type: Type.STRING,
      description: `
          Conduct in-depth analysis of medical/pharma content, output in Markdown format:

            ## 📋 Analysis Dimensions

            ### 1 Medical/Pharmaceutical Data
            - Drug Information: Name, composition, specifications, dosage form
            - Clinical Data: Efficacy, safety, trial results  
            - Indications: Treatment scope, target population
            - Medication Guidance: Dosage, usage, duration

            ### 2 Compliance Requirements
            - Regulatory Standards: NMPA/FDA requirements
            - Approval Status: Approval numbers, registration information
            - Risk Management: Contraindications, adverse reactions, warnings
            - Labeling Standards: Mandatory package insert elements

            ### 3️ Visual Strategy
            - Chart Selection: Tables/flowcharts/comparison charts/data visualization
            - Information Hierarchy: Priority design for key content
            - Design Style: Professional pharmaceutical style recommendations
            - Compliance Display: Methods for highlighting risk information

            ## Document Processing
            If document provided, specify:
            - **Document**: [Name and type]
            - **Extracted**: [Core content list]
            - **Key Points**: [Critical data points]

            ---
            ✓ Chinese Output | ✓ Markdown Format | ✓ Clear Structure | ✓ Professional Accuracy
          `,
    },
    chatResponse: {
      type: Type.STRING,
      description:`
          Respond in professional yet accessible Chinese:
          - Medical/pharmaceutical terminology must be accurate
          - Expression style close to real work scenarios
          - Balance professionalism with approachability
          - Communicate like a senior product manager or pharmaceutical consultant
          - Avoid textbook-style rigid language
          - The output format should adopt the Markdown format
          `,
    },
    generatedArtifacts: {
      type: Type.ARRAY,
      description: `
          Generate 4+ design variations tailored for pharmaceutical/medical content:
          
          [Design Options Required]
          Minimum 4 distinct designs, each optimized for different contexts:

          Option 1: CLINICAL/PROFESSIONAL
          - Audience: Healthcare professionals, regulatory bodies
          - Style: Clean, authoritative, data-focused
          - Layout: Structured sections, clear information hierarchy
          - Colors: Medical blues, whites, trust-building palette

          Option 2: PATIENT-FRIENDLY
          - Audience: Patients, caregivers, general public
          - Style: Warm, accessible, supportive
          - Layout: Simple navigation, digestible content blocks
          - Colors: Soft, approachable, calming tones

          Option 3: CORPORATE/INVESTOR
          - Audience: Stakeholders, partners, investors
          - Style: Professional, polished, business-oriented
          - Layout: Dashboard-inspired, metrics-forward
          - Colors: Corporate blues/grays, confident aesthetics

          Option 4: MODERN DIGITAL HEALTH
          - Audience: Tech-savvy consumers, digital health users
          - Style: Contemporary, app-like, innovative
          - Layout: Card-based, mobile-app inspired
          - Colors: Fresh, modern, gradient accents

          [Content Adaptation]
          Same medical/pharma information presented with:
          - Different emphasis (clinical data vs. patient benefits)
          - Varied terminology depth (technical vs. simplified)
          - Adjusted visual hierarchy (compliance-first vs. engagement-first)

          [Technical Standards]
          - Mobile-First responsive (critical for patient access)
          - Tailwind CSS implementation
          - Accessibility compliance considerations
          - Clear information architecture for each audience
      `
      ,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING, description: "Short title for this design variation" },
          description: { type: Type.STRING, description: "Brief description of the style/focus." },
          htmlContent: { type: Type.STRING, description: `
              Generate a complete, production-ready HTML page using Tailwind CSS:

              [Core Requirements]
              ✓ Mobile-First Design: Base styles for mobile, progressive enhancement for tablet/desktop
              ✓ Framework: Tailwind CSS utility classes only
              ✓ Brand Color: #F16F20 for primary actions, accents, and key highlights
              ✓ Output: Pure HTML fragment (no <html>/<head>/<body> wrapper tags)

              [Content Specifications]
              ✓ Format: LONG-FORM, comprehensive content (not brief summaries)
              ✓ Structure: Minimum 5-6 substantial sections, each with:
                - Descriptive heading
                - Rich, detailed content (paragraphs, lists, data points)
                - Visual elements where appropriate
              ✓ Length: Full landing page depth - think product launch, annual report, or detailed guide
              ✓ Quality: Professional copy with real value, avoid generic placeholders

              [Responsive Strategy]
              - Base: Mobile layout (320px-640px)
              - sm: Small tablets (640px+)
              - md: Tablets/small laptops (768px+)
              - lg: Desktops (1024px+)
              - xl: Large screens (1280px+)

              [Design Standards]
              - Typography: Clear hierarchy (text-4xl/3xl/2xl/xl/lg)
              - Spacing: Generous padding/margins (p-6, p-8, py-12, etc.)
              - Layout: Flexible containers (max-w-7xl, mx-auto)
              - Interactivity: Hover states, smooth transitions
          `
          }
        },
        required: ["id", "title", "description", "htmlContent"]
      }
    },
    recommendedTemplates: {
      type: Type.ARRAY,
      description: `
        [Autonomous Template & Generation Strategy]

        You have full flexibility to determine the best approach:

        Option 1: Template-Based Generation
        ────────────────────────────────────
        When to use: Relevant, high-quality templates exist
        - Search template library
        - Recommend best matches with clear reasoning
        - Generate based on selected template

        Option 2: Custom Generation
        ────────────────────────────────────
        When to use: No suitable templates OR custom approach is better
        - Skip template recommendation without explanation
        - Choose optimal generation method:
          * Structured documents
          * Visual designs (HTML/CSS)
          * Data visualizations
          * Hybrid custom solutions
        - Generate directly based on user requirements

        Decision Authority:
        ✓ You decide whether to use templates or generate custom
        ✓ No need to justify skipping templates
        ✓ Prioritize output quality over process
        ✓ Adapt approach based on:
          - Content complexity
          - User expertise level
          - Industry requirements
          - Time/detail constraints

        Execution Principle:
        "Use templates when they add value. Generate custom solutions when they serve better. Never force-fit inadequate templates."
      `,
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
    // Construct contents once
    const currentParts: any[] = [];
    
    if (inlineData && mimeType) {
      currentParts.push({
        inlineData: {
          data: inlineData,
          mimeType: mimeType,
        },
      });
    }
    
    // Ensure prompt is never empty string, or it will cause 400 error if it's the only part
    const validPrompt = prompt && prompt.trim() ? prompt : (inlineData ? "Analyze this content." : "Hello.");
    currentParts.push({ text: validPrompt });

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

    // Retry Loop for robustness against transient 500/XHR errors
    const makeRequest = async (retries = 3, delay = 1000): Promise<any> => {
      try {
        // Initialize the client inside the function to ensure process.env.API_KEY is available
        // This fixes the "Request had invalid authentication credentials" (401) error 
        // by ensuring we don't read the env var before it's ready.
        if (!process.env.API_KEY) {
           console.warn("API_KEY is missing from environment variables.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        return await ai.models.generateContent({
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
      } catch (error: any) {
        // Check for retryable errors (500, 503, XHR failed, fetch failed)
        const status = error.status || error.response?.status || 0;
        const msg = (error.message || '').toLowerCase();
        
        const isRetryable = 
          status === 503 || 
          status === 500 || 
          msg.includes("xhr") || 
          msg.includes("fetch failed") ||
          msg.includes("overloaded") || 
          msg.includes("network");

        if (isRetryable && retries > 0) {
          console.warn(`Gemini API Error (Status ${status}). Retrying in ${delay}ms...`, error);
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeRequest(retries - 1, delay * 2); // Exponential backoff
        }
        
        throw error;
      }
    };

    const response = await makeRequest();
    let text = response.text || "";

    // If text is empty, return a safe default error instead of crashing on JSON parse
    if (!text.trim()) {
       console.warn("Received empty response from Gemini.");
       return {
         thoughtProcess: "Model returned an empty response.",
         chatResponse: "I apologize, but I couldn't generate a response. This might be due to a safety filter or an issue processing the file.",
         generatedArtifacts: []
       };
    }

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
