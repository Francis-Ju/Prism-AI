
import { Template } from './types';

export const DEFAULT_TEMPLATES: Template[] = [
  // =================================================================
  // CATEGORY: CLINICAL EFFICACY
  // =================================================================
  {
    id: 'clin-monograph',
    name: 'Clinical Efficacy Monograph',
    category: 'Clinical Efficacy',
    description: 'High-level efficacy data summary with survival curves and hazard ratios.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800 pb-16">
  <!-- HEADER: Study Title & Primary Outcome -->
  <header class="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-6 lg:px-16">
    <div class="max-w-5xl mx-auto">
      <div class="text-[#F16F20] font-bold text-xs uppercase tracking-[0.2em] mb-4">Pivotal Phase III Data</div>
      <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Superior Overall Survival in <br/>
        <span class="text-[#F16F20]">HR+/HER2- Advanced Breast Cancer</span>
      </h1>
      <p class="text-lg text-slate-300 max-w-2xl leading-relaxed">
        Results from the MONALEESA-2 trial demonstrate a statistically significant survival benefit with Ribociclib + Letrozole vs. Placebo + Letrozole.
      </p>
    </div>
  </header>

  <!-- KEY METRICS GRID -->
  <section class="px-6 lg:px-16 -mt-8 relative z-10">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Metric 1 -->
      <div class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#F16F20]">
        <div class="text-xs text-slate-500 font-bold uppercase mb-2">Median Overall Survival</div>
        <div class="flex items-baseline gap-1">
          <span class="text-5xl font-black text-slate-900">63.9</span>
          <span class="text-lg font-medium text-slate-500">months</span>
        </div>
        <div class="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
          vs 51.4 months placebo (HR=0.76)
        </div>
      </div>
      
      <!-- Metric 2 -->
      <div class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-slate-700">
        <div class="text-xs text-slate-500 font-bold uppercase mb-2">Risk Reduction</div>
        <div class="flex items-baseline gap-1">
          <span class="text-5xl font-black text-slate-900">24</span>
          <span class="text-lg font-medium text-slate-500">%</span>
        </div>
        <div class="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
          Relative reduction in risk of death
        </div>
      </div>

      <!-- Metric 3 -->
      <div class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-slate-200">
        <div class="text-xs text-slate-500 font-bold uppercase mb-2">Follow-Up Duration</div>
        <div class="flex items-baseline gap-1">
          <span class="text-5xl font-black text-slate-900">80+</span>
          <span class="text-lg font-medium text-slate-500">months</span>
        </div>
        <div class="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
          Longest reported follow-up in class
        </div>
      </div>
    </div>
  </section>

  <!-- KAPLAN-MEIER CURVE PLACEHOLDER -->
  <section class="px-6 lg:px-16 py-16 bg-slate-50 mt-12">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-[#F16F20] pl-4">Kaplan-Meier Analysis (ITT Population)</h2>
      
      <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 relative">
        <!-- Axes -->
        <div class="absolute left-12 bottom-12 top-12 w-px bg-slate-200"></div>
        <div class="absolute left-12 bottom-12 right-12 h-px bg-slate-200"></div>
        
        <!-- Simplified Curves (CSS Shapes) -->
        <div class="relative h-64 ml-12 mb-8 overflow-hidden">
           <!-- Treatment Curve (Orange) -->
           <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
             <path d="M0,10 Q200,20 400,80 T800,150" fill="none" stroke="#F16F20" stroke-width="3" />
           </svg>
           <!-- Placebo Curve (Gray) -->
           <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
             <path d="M0,10 Q200,30 400,120 T800,220" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,4" />
           </svg>
        </div>

        <!-- Legend -->
        <div class="flex justify-center gap-8 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-1 bg-[#F16F20]"></div>
            <span class="text-xs font-bold text-slate-700">Ribociclib + Letrozole</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-1 bg-slate-400 dashed border-b-2 border-slate-400"></div>
            <span class="text-xs font-bold text-slate-500">Placebo + Letrozole</span>
          </div>
        </div>
      </div>
      
      <p class="text-xs text-slate-500 mt-4 italic">
        Figure 1. Kaplan-Meier estimates of Overall Survival in the Intention-to-Treat population.
      </p>
    </div>
  </section>

  <!-- FOOTER: Safety & References -->
  <footer class="px-6 lg:px-16 py-12 max-w-5xl mx-auto border-t border-slate-200 mt-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 class="font-bold text-slate-800 text-sm mb-2">Study Design</h4>
        <p class="text-xs text-slate-500 leading-relaxed">
          MONALEESA-2 was a randomized, double-blind, placebo-controlled Phase III trial evaluating Ribociclib in combination with Letrozole compared to placebo plus Letrozole in postmenopausal women with HR+/HER2- advanced breast cancer who received no prior systemic therapy for their advanced disease.
        </p>
      </div>
      <div>
        <h4 class="font-bold text-slate-800 text-sm mb-2">Important Safety Information</h4>
        <p class="text-xs text-slate-500 leading-relaxed">
          Most common adverse reactions (incidence >= 20%) were neutropenia, nausea, fatigue, diarrhea, leukopenia, alopecia, vomiting, constipation, headache and back pain. Please refer to full Prescribing Information.
        </p>
      </div>
    </div>
  </footer>
</div>`
  },

  {
    id: 'clin-comparison',
    name: 'Head-to-Head Comparison',
    category: 'Clinical Efficacy',
    description: 'Direct comparison table against standard of care or competitors.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800 p-6 lg:p-12">
  
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-slate-900 mb-2">Comparative Efficacy Profile</h1>
    <p class="text-slate-500 mb-8">Indirect comparison based on published Phase III data.</p>

    <!-- COMPARISON TABLE CARD -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      
      <!-- Table Header -->
      <div class="grid grid-cols-3 bg-slate-900 text-white text-sm font-bold uppercase tracking-wider">
        <div class="p-6 flex items-center">Clinical Metric</div>
        <div class="p-6 bg-[#F16F20] text-center border-l border-white/10 relative">
          Ribociclib
          <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#F16F20] text-[10px] px-2 py-0.5 rounded shadow">Our Product</div>
        </div>
        <div class="p-6 bg-slate-800 text-center border-l border-white/10 text-slate-400">Competitor X</div>
      </div>

      <!-- Row 1: mOS -->
      <div class="grid grid-cols-3 border-b border-slate-100 group hover:bg-orange-50/30 transition-colors">
        <div class="p-6 font-bold text-slate-700 flex items-center">Median Overall Survival</div>
        <div class="p-6 text-center font-black text-2xl text-slate-900 border-l border-slate-100 group-hover:border-transparent">63.9 mo</div>
        <div class="p-6 text-center font-medium text-slate-400 border-l border-slate-100 group-hover:border-transparent">54.1 mo</div>
      </div>

      <!-- Row 2: Hazard Ratio -->
      <div class="grid grid-cols-3 border-b border-slate-100 group hover:bg-orange-50/30 transition-colors">
        <div class="p-6 font-bold text-slate-700 flex items-center">Hazard Ratio (OS)</div>
        <div class="p-6 text-center font-black text-xl text-slate-900 border-l border-slate-100 group-hover:border-transparent">0.76</div>
        <div class="p-6 text-center font-medium text-slate-400 border-l border-slate-100 group-hover:border-transparent">0.81</div>
      </div>

      <!-- Row 3: Safety Signal -->
      <div class="grid grid-cols-3 border-b border-slate-100 group hover:bg-orange-50/30 transition-colors">
        <div class="p-6 font-bold text-slate-700 flex items-center">QTc Prolongation Signal</div>
        <div class="p-6 text-center font-medium text-slate-900 border-l border-slate-100 group-hover:border-transparent">Yes (Monitoring req.)</div>
        <div class="p-6 text-center font-medium text-slate-400 border-l border-slate-100 group-hover:border-transparent">No</div>
      </div>

      <!-- Row 4: Dosing -->
      <div class="grid grid-cols-3 group hover:bg-orange-50/30 transition-colors">
        <div class="p-6 font-bold text-slate-700 flex items-center">Dosing Schedule</div>
        <div class="p-6 text-center text-sm text-slate-900 border-l border-slate-100 group-hover:border-transparent">3 weeks ON / 1 week OFF</div>
        <div class="p-6 text-center text-sm text-slate-400 border-l border-slate-100 group-hover:border-transparent">Continuous</div>
      </div>
    </div>

    <!-- DISCLAIMER -->
    <div class="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200 text-[10px] text-slate-500 leading-relaxed text-justify">
      <strong>Note:</strong> Head-to-head trials have not been conducted. Differences in study design, patient populations, and statistical analysis methods limit direct comparability of results. Cross-trial comparisons should be interpreted with caution.
    </div>

  </div>
</div>`
  },

  // =================================================================
  // CATEGORY: EDUCATION
  // =================================================================
  {
    id: 'edu-moa',
    name: 'Mechanism of Action',
    category: 'Education',
    description: 'Visual explanation of the CDK4/6 pathway blockade.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  
  <!-- HERO: Visual Concept -->
  <div class="bg-slate-900 h-96 relative overflow-hidden flex items-center justify-center">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black opacity-80"></div>
    <!-- Abstract Cell Graphic (CSS) -->
    <div class="relative z-10 w-48 h-48 rounded-full border-4 border-[#F16F20] flex items-center justify-center shadow-[0_0_50px_rgba(241,111,32,0.3)]">
      <div class="w-32 h-32 rounded-full border border-slate-500 flex items-center justify-center">
        <span class="text-white font-bold tracking-widest">CELL CYCLE</span>
      </div>
      <div class="absolute top-0 right-0 bg-[#F16F20] text-white text-[10px] font-bold px-2 py-1 rounded transform translate-x-2 -translate-y-2">ARREST</div>
    </div>
    
    <div class="absolute bottom-8 text-center w-full">
      <h1 class="text-3xl font-bold text-white mb-2">Targeting the Cell Cycle</h1>
      <p class="text-slate-400">Selective Inhibition of CDK4/6</p>
    </div>
  </div>

  <!-- STEPS -->
  <section class="max-w-3xl mx-auto py-16 px-6">
    <div class="space-y-12 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-slate-200">
      
      <!-- Step 1 -->
      <div class="relative pl-24">
        <div class="absolute left-4 top-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold z-10 border-4 border-white">1</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Overactive Signaling</h3>
        <p class="text-slate-600 leading-relaxed">
          In HR+ breast cancer, the Cyclin D-CDK4/6 pathway is often overactive, driving uncontrolled cell proliferation and tumor growth.
        </p>
      </div>

      <!-- Step 2 -->
      <div class="relative pl-24">
        <div class="absolute left-4 top-0 w-8 h-8 bg-[#F16F20] text-white rounded-full flex items-center justify-center font-bold z-10 border-4 border-white">2</div>
        <h3 class="text-xl font-bold text-[#F16F20] mb-2">Selective Blockade</h3>
        <p class="text-slate-600 leading-relaxed">
          Ribociclib selectively binds to CDK4 and CDK6, preventing the formation of the Cyclin D-CDK4/6 complex.
        </p>
      </div>

      <!-- Step 3 -->
      <div class="relative pl-24">
        <div class="absolute left-4 top-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold z-10 border-4 border-white">3</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">G1 Arrest</h3>
        <p class="text-slate-600 leading-relaxed">
          This inhibition prevents the phosphorylation of the Rb protein, halting the cell cycle at the G1 phase and preventing DNA replication (S Phase).
        </p>
      </div>

    </div>
  </section>

  <!-- SUMMARY BOX -->
  <section class="bg-orange-50 py-12 px-6">
    <div class="max-w-3xl mx-auto text-center">
      <h4 class="font-bold text-slate-900 uppercase tracking-widest text-sm mb-4">Synergistic Effect</h4>
      <p class="text-lg text-slate-800 font-medium">
        "Combined with endocrine therapy, Ribociclib provides a dual blockade of the ER+ signaling pathway, significantly delaying the development of resistance."
      </p>
    </div>
  </section>
</div>`
  },

  {
    id: 'edu-dosing',
    name: 'Dosing Guide',
    category: 'Education',
    description: 'Visual administration guide and schedule.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800 p-6 lg:p-12">
  <div class="max-w-4xl mx-auto">
    <header class="mb-12 border-b border-slate-100 pb-8">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Dosing & Administration</h1>
      <p class="text-slate-500">Recommended schedule for optimal adherence.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      <!-- Left: Dosage -->
      <div>
        <h2 class="text-sm font-bold text-[#F16F20] uppercase mb-6 tracking-wide">Standard Dose</h2>
        <div class="flex items-center gap-4 mb-8">
          <div class="text-6xl font-black text-slate-900">600</div>
          <div class="flex flex-col">
            <span class="text-xl font-bold text-slate-700">mg</span>
            <span class="text-sm text-slate-400">Once Daily</span>
          </div>
        </div>
        
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div class="flex gap-3 mb-4">
            <!-- Pill Graphic -->
            <div class="w-8 h-12 rounded-full border-2 border-[#F16F20] bg-white"></div>
            <div class="w-8 h-12 rounded-full border-2 border-[#F16F20] bg-white"></div>
            <div class="w-8 h-12 rounded-full border-2 border-[#F16F20] bg-white"></div>
          </div>
          <p class="text-sm text-slate-600 font-medium">Three 200mg tablets taken together.</p>
          <p class="text-xs text-slate-400 mt-2">With or without food. Preferably at the same time each day (e.g. morning).</p>
        </div>
      </div>

      <!-- Right: Schedule -->
      <div>
        <h2 class="text-sm font-bold text-[#F16F20] uppercase mb-6 tracking-wide">28-Day Cycle</h2>
        
        <div class="space-y-4">
          <!-- ON Phase -->
          <div class="flex items-stretch">
            <div class="w-16 bg-[#F16F20] text-white text-xs font-bold flex items-center justify-center rounded-l-lg py-4">ON</div>
            <div class="flex-1 bg-orange-50 border border-orange-100 p-4 rounded-r-lg flex justify-between items-center">
              <div>
                <span class="block font-bold text-slate-900">Days 1 - 21</span>
                <span class="text-xs text-slate-500">Daily administration</span>
              </div>
              <span class="text-2xl">💊</span>
            </div>
          </div>

          <!-- OFF Phase -->
          <div class="flex items-stretch opacity-60">
            <div class="w-16 bg-slate-300 text-white text-xs font-bold flex items-center justify-center rounded-l-lg py-4">OFF</div>
            <div class="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-r-lg flex justify-between items-center">
              <div>
                <span class="block font-bold text-slate-900">Days 22 - 28</span>
                <span class="text-xs text-slate-500">Treatment break</span>
              </div>
              <span class="text-2xl text-slate-300">⏸</span>
            </div>
          </div>
        </div>

        <div class="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h4 class="text-blue-900 font-bold text-xs mb-1 flex items-center gap-2">
            <span>ℹ️</span> Co-administration
          </h4>
          <p class="text-blue-800 text-xs leading-relaxed">
            Usually combined with an Aromatase Inhibitor (e.g. Letrozole 2.5mg), which is taken <strong>continuously</strong> (Days 1-28).
          </p>
        </div>
      </div>

    </div>
  </div>
</div>`
  },

  // =================================================================
  // CATEGORY: PATIENT CENTRIC
  // =================================================================
  {
    id: 'pat-journey',
    name: 'Treatment Roadmap',
    category: 'Patient Centric',
    description: 'A clear timeline guide for patients starting therapy.',
    htmlContent: `
<div class="bg-indigo-50 min-h-screen font-sans text-slate-800">
  <!-- HERO -->
  <div class="bg-white p-8 lg:p-12 text-center shadow-sm">
    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Your Treatment Roadmap</h1>
    <p class="text-slate-500">What to expect during your first months of therapy.</p>
  </div>

  <!-- TIMELINE -->
  <div class="max-w-3xl mx-auto p-8">
    
    <!-- Step 1 -->
    <div class="relative pl-8 pb-12 border-l-2 border-indigo-200">
      <div class="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-4 border-indigo-100"></div>
      <div class="bg-white p-6 rounded-xl shadow-sm">
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1 block">Day 1</span>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Starting Treatment</h3>
        <p class="text-sm text-slate-600">
          Take your first dose of Ribociclib (3 tablets) and your hormone therapy pill. 
          You can take them with or without food.
        </p>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="relative pl-8 pb-12 border-l-2 border-indigo-200">
      <div class="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-400 rounded-full border-4 border-indigo-100"></div>
      <div class="bg-white p-6 rounded-xl shadow-sm">
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1 block">Day 14</span>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Safety Check-In</h3>
        <p class="text-sm text-slate-600">
          Visit your clinic for a blood test (CBC) and an ECG to check your heart rhythm. 
          This is a standard safety measure.
        </p>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="relative pl-8 pb-12 border-l-2 border-indigo-200">
      <div class="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-400 rounded-full border-4 border-indigo-100"></div>
      <div class="bg-white p-6 rounded-xl shadow-sm">
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1 block">Day 21</span>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Cycle Break</h3>
        <p class="text-sm text-slate-600">
          Finish your Ribociclib tablets today. You will now have a 7-day break from Ribociclib.
          <br/><strong class="text-indigo-900">Keep taking your hormone therapy pill every day.</strong>
        </p>
      </div>
    </div>

    <!-- Step 4 -->
    <div class="relative pl-8">
      <div class="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-4 border-indigo-100"></div>
      <div class="bg-white p-6 rounded-xl shadow-sm">
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1 block">Day 29 (Cycle 2)</span>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Start New Cycle</h3>
        <p class="text-sm text-slate-600">
          Begin your new box of Ribociclib. You'll likely have another blood test today before starting.
        </p>
      </div>
    </div>

  </div>
</div>`
  },

  {
    id: 'pat-support',
    name: 'Patient Support Card',
    category: 'Patient Centric',
    description: 'Financial assistance and nurse hotline information.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800 flex items-center justify-center p-6 bg-dots-pattern">
  
  <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
    <!-- Header -->
    <div class="bg-[#0F766E] p-8 text-center">
      <h1 class="text-2xl font-bold text-white mb-1">Novartis Patient Support</h1>
      <p class="text-teal-200 text-sm">We are here to help you access your medicine.</p>
    </div>

    <!-- Body -->
    <div class="p-8 space-y-8">
      
      <!-- Co-Pay Card -->
      <div class="text-center">
        <h3 class="font-bold text-slate-900 mb-4">Universal Co-Pay Card</h3>
        <div class="bg-slate-900 rounded-xl p-6 text-left text-white shadow-lg relative overflow-hidden group cursor-pointer transition-transform hover:scale-105">
          <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div class="text-xs text-slate-400 uppercase tracking-widest mb-6">Savings Program</div>
          <div class="text-3xl font-mono mb-6">0000 1234 5678 9010</div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>BIN: 610020</span>
            <span>GRP: 99990001</span>
          </div>
        </div>
        <p class="text-xs text-slate-500 mt-4">
          Eligible commercially insured patients may pay as little as $0 per month.
        </p>
      </div>

      <div class="h-px bg-slate-100"></div>

      <!-- Contact -->
      <div>
        <h3 class="font-bold text-slate-900 mb-4 text-center">Need Assistance?</h3>
        <div class="space-y-3">
          <button class="w-full py-3 bg-teal-50 text-teal-800 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors">
            <span>📞</span> 1-800-282-7630
          </button>
          <button class="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            <span>🌐</span> www.patient.novartisoncology.com
          </button>
        </div>
      </div>

    </div>
  </div>

</div>`
  },

  // =================================================================
  // CATEGORY: SALES TOOLS
  // =================================================================
  {
    id: 'sales-aid',
    name: 'iPad Detailer Slide',
    category: 'Sales Tools',
    description: 'High-impact digital sales aid for field reps.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800 flex flex-col">
  <!-- Navbar Simulation -->
  <div class="bg-slate-900 text-white p-4 flex justify-between items-center text-xs">
    <div class="font-bold tracking-widest text-[#F16F20]">NOVARTIS ONCOLOGY</div>
    <div class="flex gap-4 text-slate-400">
      <span>Efficacy</span>
      <span>Safety</span>
      <span>Dosing</span>
      <span>Access</span>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 flex">
    <!-- Left: Hook -->
    <div class="w-1/3 bg-slate-50 p-12 flex flex-col justify-center border-r border-slate-200">
      <div class="w-16 h-2 bg-[#F16F20] mb-8"></div>
      <h1 class="text-5xl font-black text-slate-900 leading-tight mb-6">
        The Only One.
      </h1>
      <p class="text-xl text-slate-600 font-light leading-relaxed">
        The only CDK4/6 inhibitor with proven Overall Survival benefit across three Phase III trials in HR+/HER2- metastatic breast cancer.
      </p>
      
      <button class="mt-12 bg-[#F16F20] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-orange-700 transition w-fit">
        See the Data &rarr;
      </button>
    </div>

    <!-- Right: Visual -->
    <div class="w-2/3 p-12 flex items-center justify-center relative overflow-hidden">
      <!-- Background Graphic -->
      <div class="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2" fill="none" />
        </svg>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-2 gap-8 w-full max-w-2xl">
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
          <div class="text-6xl font-black text-[#F16F20] mb-2">#1</div>
          <div class="font-bold text-slate-900 text-lg">NCCN Category 1</div>
          <p class="text-sm text-slate-500 mt-2">Preferred regimen for first-line therapy.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
          <div class="text-6xl font-black text-[#F16F20] mb-2">63.9</div>
          <div class="font-bold text-slate-900 text-lg">Median OS (Months)</div>
          <p class="text-sm text-slate-500 mt-2">Longest reported mOS in this setting.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Disclaimers -->
  <div class="p-4 border-t border-slate-200 text-[10px] text-slate-400">
    For Healthcare Professionals Only. See full Prescribing Information for Important Safety Information.
  </div>
</div>`
  },

  {
    id: 'sales-objections',
    name: 'Objection Handler',
    category: 'Sales Tools',
    description: 'Interactive cards for handling common HCP pushback.',
    htmlContent: `
<div class="bg-slate-100 min-h-screen font-sans text-slate-800 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-slate-900 mb-8">Objection Handling Guide</h1>

    <div class="space-y-6">
      
      <!-- Objection 1 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border-l-8 border-red-400">
        <div class="p-6 cursor-pointer hover:bg-slate-50 transition">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold text-red-400 uppercase tracking-wider">Topic: Monitoring</span>
            <span class="text-slate-300">▼</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">"I don't have time for the extra ECG monitoring."</h3>
        </div>
        
        <div class="bg-slate-50 p-6 border-t border-slate-100">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 class="font-bold text-slate-900 text-sm mb-2">Empathize</h4>
              <p class="text-sm text-slate-600">"I understand clinic workflow is critical and every extra step takes time."</p>
            </div>
            <div>
              <h4 class="font-bold text-[#F16F20] text-sm mb-2">Pivot</h4>
              <p class="text-sm text-slate-600">"However, the monitoring is front-loaded. After Cycle 1, it aligns with standard monthly visits."</p>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-sm mb-2">Proof</h4>
              <ul class="text-sm text-slate-600 list-disc pl-4 space-y-1">
                <li>ECG only at Baseline & Day 14.</li>
                <li><1% discontinuation due to QTc.</li>
                <li>Manageable within routine care.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Objection 2 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border-l-8 border-blue-400">
        <div class="p-6 cursor-pointer hover:bg-slate-50 transition">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold text-blue-400 uppercase tracking-wider">Topic: Efficacy</span>
            <span class="text-slate-300">▼</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">"My patients are doing fine on [Competitor]."</h3>
        </div>
        
        <div class="bg-slate-50 p-6 border-t border-slate-100">
          <p class="text-sm text-slate-800 font-medium italic mb-4">"Stable is good, but is it the best possible outcome?"</p>
          <div class="text-sm text-slate-600">
            Only Ribociclib has demonstrated a statistically significant Overall Survival benefit in this specific patient population. Why settle for PFS when you can offer OS?
          </div>
        </div>
      </div>

    </div>
  </div>
</div>`
  },

  // =================================================================
  // CATEGORY: CORPORATE
  // =================================================================
  {
    id: 'corp-dashboard',
    name: 'Executive Dashboard',
    category: 'Corporate',
    description: 'High-level business metrics and performance overview.',
    htmlContent: `
<div class="bg-slate-100 min-h-screen font-sans text-slate-800">
  <!-- Top Bar -->
  <header class="bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-lg font-bold text-slate-900">Oncology Business Unit</h1>
        <p class="text-xs text-slate-500">Q3 2025 Performance Report</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200">Export PDF</button>
        <button class="px-4 py-2 bg-[#F16F20] text-white text-xs font-bold rounded-lg hover:bg-orange-700">Share</button>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto p-6">
    
    <!-- KPI Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-xs text-slate-400 font-bold uppercase mb-2">Total Revenue</div>
        <div class="text-3xl font-black text-slate-900">$482M</div>
        <div class="text-xs text-green-600 font-bold mt-2">↑ 12% vs Target</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-xs text-slate-400 font-bold uppercase mb-2">NBRx Share</div>
        <div class="text-3xl font-black text-slate-900">34.5%</div>
        <div class="text-xs text-green-600 font-bold mt-2">↑ 1.2% QoQ</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-xs text-slate-400 font-bold uppercase mb-2">Field Reach</div>
        <div class="text-3xl font-black text-slate-900">92%</div>
        <div class="text-xs text-slate-500 font-bold mt-2">Target: 95%</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-xs text-slate-400 font-bold uppercase mb-2">Adherence</div>
        <div class="text-3xl font-black text-slate-900">9.2mo</div>
        <div class="text-xs text-slate-500 font-bold mt-2">DOT (Avg)</div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Regional Performance (Wide) -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 class="font-bold text-slate-900 mb-6">Regional Performance</h3>
        <div class="space-y-6">
          
          <!-- Region 1 -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="font-medium text-slate-700">North America</span>
              <span class="font-bold text-slate-900">$280M</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div class="bg-indigo-600 h-full rounded-full" style="width: 85%"></div>
            </div>
          </div>

          <!-- Region 2 -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="font-medium text-slate-700">Europe</span>
              <span class="font-bold text-slate-900">$140M</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div class="bg-indigo-400 h-full rounded-full" style="width: 65%"></div>
            </div>
          </div>

          <!-- Region 3 -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="font-medium text-slate-700">Growth Markets</span>
              <span class="font-bold text-slate-900">$62M</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div class="bg-indigo-300 h-full rounded-full" style="width: 45%"></div>
            </div>
          </div>

        </div>
      </div>

      <!-- Alerts / Feed -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 class="font-bold text-slate-900 mb-6">Live Updates</h3>
        <div class="space-y-6">
          
          <div class="flex gap-4">
            <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
            <div>
              <h4 class="text-sm font-bold text-slate-800">Supply Chain Alert</h4>
              <p class="text-xs text-slate-500 mt-1">Delay in raw material shipment from Site B. Impact assessment underway.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
            <div>
              <h4 class="text-sm font-bold text-slate-800">Launch Milestone</h4>
              <p class="text-xs text-slate-500 mt-1">Sales training for new indication completed 2 days ahead of schedule.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
            <div>
              <h4 class="text-sm font-bold text-slate-800">Market Access</h4>
              <p class="text-xs text-slate-500 mt-1">New formulary win with UnitedHealthcare (Tier 2).</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</div>`
  },
  
  {
    id: 'corp-press-release',
    name: 'Press Release',
    category: 'Corporate',
    description: 'Standard format for external media announcements.',
    htmlContent: `
<div class="bg-white min-h-screen font-serif text-slate-900 p-8 lg:p-16">
  <div class="max-w-3xl mx-auto">
    
    <!-- Header -->
    <div class="border-b-4 border-[#F16F20] pb-8 mb-8">
      <div class="text-xs font-sans font-bold text-slate-500 uppercase tracking-widest mb-4">Media Release</div>
      <h1 class="text-4xl font-bold leading-tight mb-4">Novartis receives FDA approval for new indication in early breast cancer</h1>
      <p class="text-lg text-slate-600 font-sans">
        Basel, October 24, 2025 — Approval offers a new standard of care for patients with high-risk recurrence.
      </p>
    </div>

    <!-- Body -->
    <div class="prose prose-slate max-w-none text-lg leading-relaxed">
      <p class="font-bold">
        BASEL, Switzerland — Novartis today announced that the US Food and Drug Administration (FDA) has approved Ribociclib for the adjuvant treatment of adult patients with hormone receptor-positive, human epidermal growth factor receptor 2-negative (HR+/HER2-) early breast cancer (EBC) at high risk of recurrence.
      </p>
      
      <p>
        The approval is based on results from the pivotal Phase III NATALEE trial, which demonstrated a significant improvement in invasive disease-free survival (iDFS) for Ribociclib plus endocrine therapy compared to endocrine therapy alone.
      </p>

      <blockquote class="border-l-4 border-[#F16F20] pl-6 italic text-slate-600 my-8">
        "This approval represents a paradigm shift in how we treat early breast cancer. We can now offer a tool to significantly reduce the risk of recurrence in thousands of women who previously had limited options."
        <footer class="text-sm font-sans font-bold text-slate-900 mt-2 not-italic">– Dr. Jane Doe, Chief Medical Officer</footer>
      </blockquote>

      <h3 class="text-xl font-bold mt-8 mb-4">About the NATALEE Trial</h3>
      <p>
        NATALEE is a global Phase III multi-center, randomized, open-label trial evaluating the efficacy and safety of Ribociclib with endocrine therapy (ET) versus ET alone in patients with HR+/HER2- early breast cancer.
      </p>
    </div>

    <!-- Footer -->
    <div class="mt-16 pt-8 border-t border-slate-200 font-sans text-sm">
      <h4 class="font-bold mb-4">Media Relations</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600">
        <div>
          <p class="font-bold text-slate-900">Central Media Line</p>
          <p>+41 61 324 2200</p>
          <p>media.relations@novartis.com</p>
        </div>
        <div>
          <p class="font-bold text-slate-900">Investor Relations</p>
          <p>+41 61 324 1500</p>
          <p>investor.relations@novartis.com</p>
        </div>
      </div>
    </div>

  </div>
</div>`
  }
];
