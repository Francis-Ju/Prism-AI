
import { Template } from './types';

export const DEFAULT_TEMPLATES: Template[] = [
  // =================================================================
  // CATEGORY: CLINICAL EFFICACY (5 Templates)
  // =================================================================
  {
    id: 'clin-core-efficacy',
    name: 'Core Efficacy Monograph',
    category: 'Clinical Efficacy',
    description: 'Comprehensive OS/PFS data visualization with study design and safety footer.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800 pb-20">
  <!-- 1. HERO SECTION -->
  <header class="bg-slate-900 text-white pt-12 pb-16 px-6 rounded-b-[40px] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-[#F16F20] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
    <div class="max-w-3xl mx-auto relative z-10">
      <span class="inline-block py-1 px-3 rounded-full bg-[#F16F20]/20 text-[#F16F20] border border-[#F16F20]/30 text-[10px] font-bold tracking-widest uppercase mb-4">Pivotal Phase III Data</span>
      <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">Redefining Survival in <br/><span class="text-[#F16F20]">HR+/HER2- Advanced Breast Cancer</span></h1>
      <p class="text-slate-400 text-lg leading-relaxed max-w-xl">
        The only CDK4/6 inhibitor to demonstrate a statistically significant Overall Survival (OS) benefit in first-line postmenopausal patients.
      </p>
    </div>
  </header>

  <!-- 2. KEY DATA SECTION -->
  <section class="px-6 -mt-10 max-w-3xl mx-auto mb-12 relative z-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Stat Card 1 -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-[#F16F20]">
        <div class="flex items-baseline gap-1">
          <span class="text-5xl font-black text-slate-900">63.9</span>
          <span class="text-xl font-bold text-slate-500">mo</span>
        </div>
        <div class="text-sm font-bold text-[#F16F20] uppercase mt-1">Median Overall Survival</div>
        <p class="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">vs. 51.4 mo for placebo (HR=0.76)</p>
      </div>
      <!-- Stat Card 2 -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-slate-600">
        <div class="flex items-baseline gap-1">
          <span class="text-5xl font-black text-slate-900">24</span>
          <span class="text-xl font-bold text-slate-500">%</span>
        </div>
        <div class="text-sm font-bold text-slate-600 uppercase mt-1">Reduction in Risk of Death</div>
        <p class="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">Relative reduction (p=0.008)</p>
      </div>
    </div>
  </section>

  <!-- 3. EVIDENCE SECTION -->
  <section class="px-6 max-w-3xl mx-auto mb-12">
    <h2 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
      <span class="w-1 h-6 bg-[#F16F20] rounded-full"></span>
      Kaplan-Meier Analysis
    </h2>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div class="relative h-64 w-full border-l border-b border-slate-300 flex items-end mb-4">
        <!-- Grid Lines -->
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div class="w-full h-px bg-slate-100"></div>
          <div class="w-full h-px bg-slate-100"></div>
          <div class="w-full h-px bg-slate-100"></div>
          <div class="w-full h-px bg-slate-100"></div>
        </div>
        <!-- Curve 1 (Treatment) -->
        <svg class="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <path d="M0,20 C100,25 200,40 300,80 C400,120 500,140 600,160" fill="none" stroke="#F16F20" stroke-width="3" />
        </svg>
        <!-- Curve 2 (Control) -->
        <svg class="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <path d="M0,20 C100,40 200,80 300,140 C400,180 500,200 600,220" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="5,5" />
        </svg>
      </div>
      <!-- Legend -->
      <div class="flex justify-center gap-6 text-xs font-medium">
        <div class="flex items-center gap-2"><div class="w-3 h-1 bg-[#F16F20]"></div> Ribociclib + Letrozole</div>
        <div class="flex items-center gap-2"><div class="w-3 h-1 bg-slate-400"></div> Placebo + Letrozole</div>
      </div>
    </div>
  </section>

  <!-- 4. DETAILED INFORMATION -->
  <section class="px-6 max-w-3xl mx-auto mb-12 space-y-4">
    <h2 class="text-xl font-bold text-slate-900 mb-4">Study Design & Parameters</h2>
    <!-- Accordion Item 1 -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="p-4 flex justify-between items-center bg-slate-50 cursor-pointer">
        <span class="font-bold text-sm text-slate-700">Inclusion Criteria</span>
        <span class="text-[#F16F20] font-bold">+</span>
      </div>
      <div class="p-4 text-sm text-slate-600 border-t border-slate-200">
        Postmenopausal women with HR+/HER2- advanced breast cancer who had received no prior systemic therapy for advanced disease.
      </div>
    </div>
    <!-- Accordion Item 2 -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="p-4 flex justify-between items-center bg-slate-50 cursor-pointer">
        <span class="font-bold text-sm text-slate-700">Primary Endpoint</span>
        <span class="text-[#F16F20] font-bold">+</span>
      </div>
      <div class="p-4 text-sm text-slate-600 border-t border-slate-200">
        Progression-Free Survival (PFS) as assessed by investigator per RECIST v1.1.
      </div>
    </div>
  </section>

  <!-- 5. SAFETY & REFERENCES -->
  <footer class="bg-slate-100 border-t border-slate-200 py-12 px-6">
    <div class="max-w-3xl mx-auto">
      <h4 class="text-xs font-bold text-slate-500 uppercase mb-4">Important Safety Information</h4>
      <p class="text-[10px] text-slate-500 leading-relaxed mb-6 text-justify">
        <strong>Contraindications:</strong> Hypersensitivity to the active substance or peanut/soya. 
        <strong>Warnings:</strong> QT interval prolongation, Hepatobiliary toxicity, Neutropenia. Monitor ECG and electrolytes prior to initiation. 
        Complete blood counts should be monitored every 2 weeks for the first 2 cycles.
      </p>
      <div class="h-px bg-slate-200 my-4"></div>
      <div class="space-y-1">
        <p class="text-[10px] text-slate-400">1. Hortobagyi GN, et al. N Engl J Med. 2022.</p>
        <p class="text-[10px] text-slate-400">2. Yardley DA, et al. Lancet Oncol. 2023.</p>
      </div>
    </div>
  </footer>
</div>`
  },

  {
    id: 'clin-head-to-head',
    name: 'Head-to-Head Comparison',
    category: 'Clinical Efficacy',
    description: 'Direct comparative layout contrasting efficacy metrics against competitors.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 pb-24">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-3xl font-bold mb-2">The Clear Choice</h1>
      <p class="text-slate-300">Comparative efficacy in first-line setting</p>
    </div>
  </header>

  <!-- 2. KEY DATA (Comparison Table Style) -->
  <section class="max-w-3xl mx-auto px-6 -mt-16 mb-10">
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div class="grid grid-cols-3 text-center bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 py-3 uppercase tracking-wider">
        <div class="py-2">Metric</div>
        <div class="py-2 text-[#F16F20]">Ribociclib</div>
        <div class="py-2 text-slate-400">Competitor A</div>
      </div>
      <!-- Row 1 -->
      <div class="grid grid-cols-3 text-center border-b border-slate-100 items-center hover:bg-orange-50 transition-colors">
        <div class="py-6 px-2 text-xs font-bold text-slate-600 text-left pl-6">Median OS</div>
        <div class="py-6 px-2 font-black text-2xl text-[#F16F20]">63.9 mo</div>
        <div class="py-6 px-2 font-medium text-slate-400">54.1 mo</div>
      </div>
      <!-- Row 2 -->
      <div class="grid grid-cols-3 text-center border-b border-slate-100 items-center hover:bg-orange-50 transition-colors">
        <div class="py-6 px-2 text-xs font-bold text-slate-600 text-left pl-6">Hazard Ratio</div>
        <div class="py-6 px-2 font-bold text-lg text-[#F16F20]">0.76</div>
        <div class="py-6 px-2 font-medium text-slate-400">0.81</div>
      </div>
      <!-- Row 3 -->
      <div class="grid grid-cols-3 text-center items-center hover:bg-orange-50 transition-colors">
        <div class="py-6 px-2 text-xs font-bold text-slate-600 text-left pl-6">QoL Score</div>
        <div class="py-6 px-2 font-bold text-lg text-[#F16F20]">Maintained</div>
        <div class="py-6 px-2 font-medium text-slate-400">Declined</div>
      </div>
    </div>
  </section>

  <!-- 3. EVIDENCE (Charts) -->
  <section class="px-6 max-w-3xl mx-auto mb-12">
     <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
       <h3 class="font-bold text-slate-900 mb-4 text-sm">Relative Risk Reduction</h3>
       <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="font-bold text-[#F16F20]">Ribociclib</span>
              <span class="font-bold">24% Reduction</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-4">
              <div class="bg-[#F16F20] h-4 rounded-full" style="width: 76%"></div>
            </div>
          </div>
          <div>
             <div class="flex justify-between text-xs mb-1">
              <span class="text-slate-500">Competitor A</span>
              <span class="text-slate-500">19% Reduction</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-4">
              <div class="bg-slate-400 h-4 rounded-full" style="width: 81%"></div>
            </div>
          </div>
       </div>
     </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="px-6 max-w-3xl mx-auto mb-12">
    <h3 class="text-lg font-bold mb-4">ESMO-MCBS Scorecard</h3>
    <div class="flex gap-4">
       <div class="flex-1 bg-[#F16F20] text-white p-4 rounded-xl text-center">
          <div class="text-3xl font-black">5/5</div>
          <div class="text-[10px] uppercase opacity-80">Ribociclib</div>
       </div>
       <div class="flex-1 bg-slate-100 text-slate-400 p-4 rounded-xl text-center">
          <div class="text-3xl font-black">3/5</div>
          <div class="text-[10px] uppercase">Competitor</div>
       </div>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-900 text-slate-400 py-8 px-6 text-[10px] text-center">
    <p>Comparison based on cross-trial comparison. Head-to-head trials have not been conducted. Differences in study design and patient populations limit direct comparability.</p>
  </footer>
</div>`
  },

  {
    id: 'clin-subgroup-forest',
    name: 'Subgroup Forest Plot',
    category: 'Clinical Efficacy',
    description: 'Visual forest plot showing consistency across demographic subgroups.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-white p-8 border-b border-slate-200">
    <div class="max-w-3xl mx-auto">
       <h1 class="text-2xl font-bold text-slate-900">Consistent Benefit</h1>
       <p class="text-slate-500 text-sm">Efficacy across key pre-specified subgroups.</p>
    </div>
  </header>

  <!-- 2. KEY DATA -->
  <section class="max-w-3xl mx-auto px-6 py-8">
    <div class="grid grid-cols-3 gap-4 text-center mb-8">
       <div>
         <div class="text-2xl font-bold text-[#F16F20]">All</div>
         <div class="text-[10px] text-slate-500 uppercase">Subgroups</div>
       </div>
       <div>
         <div class="text-2xl font-bold text-[#F16F20]"><1.0</div>
         <div class="text-[10px] text-slate-500 uppercase">Hazard Ratio</div>
       </div>
       <div>
         <div class="text-2xl font-bold text-[#F16F20]">Yes</div>
         <div class="text-[10px] text-slate-500 uppercase">Visceral Crisis</div>
       </div>
    </div>

    <!-- 3. EVIDENCE (Forest Plot) -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
       <div class="flex justify-between text-[10px] text-slate-400 uppercase font-bold mb-4 border-b border-slate-100 pb-2">
          <span>Subgroup</span>
          <div class="flex gap-8">
            <span>Favors Treatment</span>
            <span>Favors Control</span>
          </div>
       </div>
       
       <!-- Plot Rows -->
       <div class="space-y-6 relative">
          <!-- Vertical Center Line -->
          <div class="absolute top-0 bottom-0 left-[60%] w-px bg-slate-300 border-l border-dashed border-slate-400 z-0"></div>

          <!-- Row 1 -->
          <div class="relative z-10 flex items-center">
            <div class="w-[30%] text-xs font-bold text-slate-700">Age < 65y</div>
            <div class="flex-1 h-6 relative">
               <div class="absolute top-1/2 left-[45%] h-2 w-16 bg-[#F16F20]/20 -translate-y-1/2 rounded"></div>
               <div class="absolute top-1/2 left-[52%] w-2 h-2 bg-[#F16F20] -translate-y-1/2 rotate-45"></div>
               <div class="absolute top-1/2 left-[45%] w-px h-3 bg-[#F16F20] -translate-y-1/2"></div>
               <div class="absolute top-1/2 left-[62%] w-px h-3 bg-[#F16F20] -translate-y-1/2"></div>
            </div>
            <div class="w-[15%] text-xs font-mono text-right">0.76</div>
          </div>

          <!-- Row 2 -->
          <div class="relative z-10 flex items-center">
            <div class="w-[30%] text-xs font-bold text-slate-700">Age ≥ 65y</div>
            <div class="flex-1 h-6 relative">
               <div class="absolute top-1/2 left-[40%] h-2 w-20 bg-[#F16F20]/20 -translate-y-1/2 rounded"></div>
               <div class="absolute top-1/2 left-[48%] w-2 h-2 bg-[#F16F20] -translate-y-1/2 rotate-45"></div>
               <div class="absolute top-1/2 left-[40%] w-px h-3 bg-[#F16F20] -translate-y-1/2"></div>
               <div class="absolute top-1/2 left-[65%] w-px h-3 bg-[#F16F20] -translate-y-1/2"></div>
            </div>
            <div class="w-[15%] text-xs font-mono text-right">0.72</div>
          </div>

          <!-- Row 3 -->
          <div class="relative z-10 flex items-center">
            <div class="w-[30%] text-xs font-bold text-slate-700">Visceral Disease</div>
            <div class="flex-1 h-6 relative">
               <div class="absolute top-1/2 left-[48%] h-2 w-12 bg-[#F16F20]/20 -translate-y-1/2 rounded"></div>
               <div class="absolute top-1/2 left-[54%] w-2 h-2 bg-[#F16F20] -translate-y-1/2 rotate-45"></div>
               <div class="absolute top-1/2 left-[48%] w-px h-3 bg-[#F16F20] -translate-y-1/2"></div>
               <div class="absolute top-1/2 left-[60%] w-px h-3 bg-[#F16F20] -translate-y-1/2"></div>
            </div>
            <div class="w-[15%] text-xs font-mono text-right">0.82</div>
          </div>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <div class="bg-orange-50 border border-orange-100 p-4 rounded-lg text-sm text-slate-700">
      <strong>Interpretation:</strong> The benefit of Ribociclib was consistent regardless of age, site of metastasis, or prior therapy.
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-white border-t border-slate-200 p-6 text-[10px] text-slate-400 text-center">
    Data extracted from MONALEESA-2 Subgroup analysis. Confidence intervals overlapping 1.0 do not imply lack of statistical significance in powered subgroups.
  </footer>
</div>`
  },

  {
    id: 'clin-rwe-evidence',
    name: 'Real World Evidence',
    category: 'Clinical Efficacy',
    description: 'Data from clinical practice reinforcing trial results.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-[#0F766E] text-white p-8 pb-16 relative overflow-hidden">
    <div class="absolute -right-10 -top-10 w-64 h-64 bg-teal-500 rounded-full opacity-20"></div>
    <div class="max-w-3xl mx-auto relative z-10">
      <h1 class="text-3xl font-bold mb-2">From Trials to Reality</h1>
      <p class="text-teal-100">Real-world evidence confirms pivotal trial efficacy.</p>
    </div>
  </header>

  <!-- 2. KEY DATA -->
  <section class="max-w-3xl mx-auto px-6 -mt-8 mb-10">
    <div class="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 gap-8">
      <div class="text-center border-r border-slate-100">
        <div class="text-4xl font-black text-[#0F766E]">2,400+</div>
        <div class="text-xs text-slate-500 uppercase mt-1">Patients Analyzed</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-black text-[#0F766E]">91%</div>
        <div class="text-xs text-slate-500 uppercase mt-1">12-mo Survival</div>
      </div>
    </div>
  </section>

  <!-- 3. EVIDENCE (Map/List) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h2 class="text-lg font-bold text-slate-900 mb-4">Global Database Sources</h2>
    <div class="space-y-3">
       <div class="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
         <div class="flex items-center gap-3">
           <div class="w-2 h-2 bg-teal-500 rounded-full"></div>
           <span class="font-bold text-sm text-slate-700">Flatiron Health (USA)</span>
         </div>
         <span class="text-xs bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">N=1,205</span>
       </div>
       <div class="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
         <div class="flex items-center gap-3">
           <div class="w-2 h-2 bg-teal-500 rounded-full"></div>
           <span class="font-bold text-sm text-slate-700">Corrona Registry (USA)</span>
         </div>
         <span class="text-xs bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">N=540</span>
       </div>
       <div class="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100">
         <div class="flex items-center gap-3">
           <div class="w-2 h-2 bg-teal-500 rounded-full"></div>
           <span class="font-bold text-sm text-slate-700">Ribociclib Compass (EU)</span>
         </div>
         <span class="text-xs bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">N=890</span>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <div class="bg-teal-50 p-6 rounded-xl">
      <h3 class="font-bold text-teal-900 mb-2 text-sm">Key Takeaway</h3>
      <p class="text-sm text-teal-800 leading-relaxed">
        Real-world progression-free survival (rwPFS) and overall survival (rwOS) align closely with results from MONALEESA-2, demonstrating the drug's effectiveness in routine clinical practice outside controlled trial settings.
      </p>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-100 py-8 px-6 text-[10px] text-slate-500">
     RWE studies are observational and have limitations including potential for selection bias and incomplete data.
  </footer>
</div>`
  },

  {
    id: 'clin-safety-monograph',
    name: 'Safety Profile Deep Dive',
    category: 'Clinical Efficacy',
    description: 'Detailed safety breakdown with grading and management charts.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-white p-8 pb-12 border-b border-slate-200">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Predictable Safety Profile</h1>
      <p class="text-slate-500">Established tolerability with over 8 years of follow-up.</p>
    </div>
  </header>

  <!-- 2. KEY DATA -->
  <section class="max-w-3xl mx-auto px-6 -mt-6 mb-10">
    <div class="flex gap-4 overflow-x-auto pb-4">
       <div class="flex-none w-40 bg-white p-4 rounded-xl shadow-md border border-slate-100">
         <div class="text-2xl font-black text-[#F16F20]">7.5%</div>
         <div class="text-[10px] text-slate-500 uppercase font-bold">Discontinuation Rate</div>
       </div>
       <div class="flex-none w-40 bg-white p-4 rounded-xl shadow-md border border-slate-100">
         <div class="text-2xl font-black text-slate-700">Low</div>
         <div class="text-[10px] text-slate-500 uppercase font-bold">GI Toxicity</div>
       </div>
       <div class="flex-none w-40 bg-white p-4 rounded-xl shadow-md border border-slate-100">
         <div class="text-2xl font-black text-slate-700">No</div>
         <div class="text-[10px] text-slate-500 uppercase font-bold">QTc >500ms Issues</div>
       </div>
    </div>
  </section>

  <!-- 3. EVIDENCE (Stacked Bars) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h2 class="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Adverse Events of Special Interest</h2>
    
    <!-- Chart Item -->
    <div class="mb-6">
      <div class="flex justify-between text-sm font-bold mb-2">
        <span>Neutropenia</span>
        <span class="text-slate-500">74% Any Grade</span>
      </div>
      <div class="w-full h-6 flex rounded-full overflow-hidden">
        <div class="bg-[#F16F20] w-[60%]" title="Grade 3/4"></div>
        <div class="bg-orange-200 w-[14%]" title="Grade 1/2"></div>
        <div class="bg-slate-200 w-[26%]"></div>
      </div>
      <div class="flex justify-between text-[10px] text-slate-400 mt-1">
        <div class="flex items-center gap-1"><div class="w-2 h-2 bg-[#F16F20]"></div> Grade 3/4 (60%)</div>
        <div class="flex items-center gap-1"><div class="w-2 h-2 bg-orange-200"></div> Grade 1/2 (14%)</div>
      </div>
    </div>

    <!-- Chart Item -->
    <div class="mb-6">
      <div class="flex justify-between text-sm font-bold mb-2">
        <span>Nausea</span>
        <span class="text-slate-500">52% Any Grade</span>
      </div>
      <div class="w-full h-6 flex rounded-full overflow-hidden">
        <div class="bg-[#F16F20] w-[2%]" title="Grade 3/4"></div>
        <div class="bg-orange-200 w-[50%]" title="Grade 1/2"></div>
        <div class="bg-slate-200 w-[48%]"></div>
      </div>
      <div class="flex justify-between text-[10px] text-slate-400 mt-1">
        <div class="flex items-center gap-1"><div class="w-2 h-2 bg-[#F16F20]"></div> Grade 3/4 (2%)</div>
        <div class="flex items-center gap-1"><div class="w-2 h-2 bg-orange-200"></div> Grade 1/2 (50%)</div>
      </div>
    </div>
  </section>

  <!-- 4. DETAILS (Management) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h2 class="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Management Guidelines</h2>
    <div class="bg-white border border-slate-200 rounded-xl p-5">
       <h3 class="font-bold text-[#F16F20] mb-2">Dose Modification</h3>
       <p class="text-sm text-slate-600 mb-4">
         Dosing interruption allows for recovery of neutrophils. Most patients can resume at the same dose or a reduced dose (400mg/200mg) without compromising efficacy.
       </p>
       <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="bg-slate-50 p-2 rounded">
            <div class="font-bold">Starting</div>
            <div>600 mg</div>
          </div>
          <div class="bg-slate-50 p-2 rounded">
            <div class="font-bold">1st Reduction</div>
            <div>400 mg</div>
          </div>
          <div class="bg-slate-50 p-2 rounded">
            <div class="font-bold">2nd Reduction</div>
            <div>200 mg</div>
          </div>
       </div>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-900 text-slate-400 py-8 px-6 text-[10px]">
    <p class="mb-2">Please consult full Prescribing Information for complete safety monitoring requirements.</p>
  </footer>
</div>`
  },

  // =================================================================
  // CATEGORY: MECHANISM & EDUCATION (5 Templates)
  // =================================================================
  {
    id: 'edu-moa-visual',
    name: 'Mechanism of Action',
    category: 'Education',
    description: 'Rich visual explanation of the CDK4/6 pathway.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-slate-900 text-white p-8 pb-12 rounded-b-3xl">
    <h1 class="text-3xl font-bold mb-2">Mechanism of Action</h1>
    <p class="text-slate-400">Targeting the Cell Cycle at the G1/S Checkpoint</p>
  </header>

  <!-- 2. KEY DATA (Diagram Placeholder) -->
  <section class="max-w-3xl mx-auto px-6 -mt-6 mb-10">
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center relative overflow-hidden">
       <div class="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent"></div>
       <!-- Simulated Cell Cycle -->
       <div class="w-40 h-40 rounded-full border-8 border-slate-100 mx-auto relative mb-4">
          <div class="absolute inset-0 border-8 border-[#F16F20] rounded-full border-r-transparent rotate-45"></div>
          <div class="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-300">G1</div>
          <!-- Blockade -->
          <div class="absolute top-2 right-2 w-8 h-8 bg-[#F16F20] rounded text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">| |</div>
       </div>
       <h3 class="font-bold text-slate-900">Selective Inhibition</h3>
       <p class="text-xs text-slate-500">Ribociclib + Cyclin D1 Blockade</p>
    </div>
  </section>

  <!-- 3. EVIDENCE (Pathway Steps) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <div class="space-y-6 border-l-2 border-[#F16F20] ml-3 pl-6 py-2">
       <div class="relative">
         <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#F16F20] border-2 border-white shadow"></div>
         <h4 class="font-bold text-slate-900">1. Pathway Activation</h4>
         <p class="text-sm text-slate-600">In HR+ breast cancer, the CDK4/6 pathway is overactive, driving unchecked cell division.</p>
       </div>
       <div class="relative">
         <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow"></div>
         <h4 class="font-bold text-slate-900">2. Complex Formation</h4>
         <p class="text-sm text-slate-600">Ribociclib binds to CDK4/6, preventing the formation of the Cyclin D-CDK4/6 complex.</p>
       </div>
       <div class="relative">
         <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow"></div>
         <h4 class="font-bold text-slate-900">3. Cell Cycle Arrest</h4>
         <p class="text-sm text-slate-600">This prevents phosphorylation of Rb, halting the cell cycle in the G1 phase and inducing senescence.</p>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
       <h3 class="font-bold text-slate-900 mb-2 text-sm uppercase">Synergistic Effect</h3>
       <p class="text-sm text-slate-600">
         Combining Ribociclib with an aromatase inhibitor (which lowers estrogen) provides dual blockade of the ER+ signaling pathway, significantly delaying resistance.
       </p>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-white border-t border-slate-100 py-8 px-6 text-[10px] text-slate-400">
    Ribociclib is a kinase inhibitor indicated for...
  </footer>
</div>`
  },

  {
    id: 'edu-dosing-guide',
    name: 'Dosing & Administration',
    category: 'Education',
    description: 'Visual guide for HCPs and nurses on administration.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-[#F16F20] text-white p-8 pb-12">
    <h1 class="text-3xl font-bold mb-2">Dosing Guide</h1>
    <p class="text-orange-100">Simplified administration for optimal adherence.</p>
  </header>

  <!-- 2. KEY DATA (Visual Pill Count) -->
  <section class="max-w-3xl mx-auto px-6 -mt-8 mb-10">
    <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
       <div>
         <div class="text-sm font-bold text-slate-500 uppercase">Starting Dose</div>
         <div class="text-3xl font-black text-slate-900">600 mg</div>
       </div>
       <div class="flex gap-2">
          <div class="w-8 h-12 bg-orange-100 border-2 border-[#F16F20] rounded-full"></div>
          <div class="w-8 h-12 bg-orange-100 border-2 border-[#F16F20] rounded-full"></div>
          <div class="w-8 h-12 bg-orange-100 border-2 border-[#F16F20] rounded-full"></div>
       </div>
    </div>
  </section>

  <!-- 3. EVIDENCE (Schedule) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h2 class="text-lg font-bold text-slate-900 mb-4">28-Day Cycle</h2>
    <div class="flex w-full h-16 rounded-lg overflow-hidden border border-slate-200">
       <div class="flex-1 bg-[#F16F20] flex items-center justify-center text-white font-bold text-xs flex-col">
          <span>Days 1-21</span>
          <span class="opacity-75 text-[10px]">On Treatment</span>
       </div>
       <div class="w-[25%] bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs flex-col">
          <span>Days 22-28</span>
          <span class="opacity-75 text-[10px]">Off</span>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS (Instructions) -->
  <section class="max-w-3xl mx-auto px-6 mb-12 space-y-4">
    <div class="flex gap-4 items-start">
       <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">⏰</div>
       <div>
         <h3 class="font-bold text-slate-900">Same Time Daily</h3>
         <p class="text-sm text-slate-600">Preferably in the morning.</p>
       </div>
    </div>
    <div class="flex gap-4 items-start">
       <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">🍽️</div>
       <div>
         <h3 class="font-bold text-slate-900">With or Without Food</h3>
         <p class="text-sm text-slate-600">No dietary restrictions regarding administration.</p>
       </div>
    </div>
    <div class="flex gap-4 items-start">
       <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">💊</div>
       <div>
         <h3 class="font-bold text-slate-900">Missed Dose</h3>
         <p class="text-sm text-slate-600">If a patient vomits or misses a dose, do not take an additional dose that day. Resume next day.</p>
       </div>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-50 p-6 text-[10px] text-slate-500 text-center border-t border-slate-200">
    Avoid strong CYP3A inhibitors. Monitor ECG.
  </footer>
</div>`
  },

  {
    id: 'edu-nurse-guide',
    name: 'Nurse Education',
    category: 'Education',
    description: 'Monitoring and patient counseling checklist.',
    htmlContent: `
<div class="bg-teal-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-[#0F766E] text-white p-8 rounded-b-3xl">
    <h1 class="text-2xl font-bold mb-2">Nurse's Guide</h1>
    <p class="text-teal-100">Monitoring & Patient Support</p>
  </header>

  <!-- 2. KEY DATA (Checklist) -->
  <section class="max-w-3xl mx-auto px-6 -mt-4 mb-8">
     <div class="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-2">Baseline Assessments</h3>
        <div class="flex items-center gap-3">
          <input type="checkbox" checked readonly class="accent-teal-600">
          <span class="text-sm">Complete Blood Count (CBC)</span>
        </div>
        <div class="flex items-center gap-3">
          <input type="checkbox" checked readonly class="accent-teal-600">
          <span class="text-sm">Liver Function Tests (LFTs)</span>
        </div>
        <div class="flex items-center gap-3">
          <input type="checkbox" checked readonly class="accent-teal-600">
          <span class="text-sm">Electrocardiogram (ECG)</span>
        </div>
     </div>
  </section>

  <!-- 3. EVIDENCE (Monitoring Schedule) -->
  <section class="max-w-3xl mx-auto px-6 mb-10">
    <h3 class="font-bold text-slate-900 mb-4">Monitoring Frequency</h3>
    <div class="grid grid-cols-2 gap-4">
       <div class="bg-white p-4 rounded-lg border border-teal-100">
         <div class="text-xs font-bold text-teal-600 uppercase mb-1">Cycle 1 & 2</div>
         <div class="text-sm">Every 2 weeks (CBC, LFTs)</div>
       </div>
       <div class="bg-white p-4 rounded-lg border border-teal-100">
         <div class="text-xs font-bold text-teal-600 uppercase mb-1">Subsequent</div>
         <div class="text-sm">Start of each cycle (Monthly)</div>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS (Talking Points) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h3 class="font-bold text-slate-900 mb-4">Patient Counseling</h3>
    <div class="bg-white rounded-xl p-4 shadow-sm">
       <p class="text-sm text-slate-600 italic mb-2">"Call the office immediately if you experience..."</p>
       <ul class="list-disc pl-5 text-sm text-slate-700 space-y-1">
         <li>Fever > 100.4°F (Signs of infection)</li>
         <li>Shortness of breath</li>
         <li>Yellowing of skin or eyes</li>
       </ul>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-[#0F766E] text-white p-6 text-[10px] text-center mt-8">
    Nurses play a critical role in early detection of AEs.
  </footer>
</div>`
  },

  {
    id: 'edu-guidelines',
    name: 'NCCN/ASCO Guidelines',
    category: 'Education',
    description: 'Summary of clinical practice guideline recommendations.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-blue-900 text-white p-8">
    <h1 class="text-2xl font-bold">Clinical Guidelines</h1>
    <p class="text-blue-200">Standard of Care Updates 2025</p>
  </header>

  <!-- 2. KEY DATA -->
  <section class="max-w-3xl mx-auto px-6 py-8">
     <div class="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
       <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px] font-bold uppercase">Category 1</span>
       <h2 class="text-lg font-bold mt-2 mb-2">First-Line Therapy</h2>
       <p class="text-sm text-slate-600">
         CDK4/6 Inhibitor + Aromatase Inhibitor is the preferred first-line regimen for HR+/HER2- metastatic breast cancer.
       </p>
     </div>
  </section>

  <!-- 3. EVIDENCE (Quotes) -->
  <section class="max-w-3xl mx-auto px-6 mb-8 space-y-4">
     <div class="bg-white p-4 rounded-lg border border-slate-200">
       <div class="text-xs font-bold text-slate-400 mb-2">NCCN v1.2025</div>
       <p class="text-sm font-medium text-slate-800">"Ribociclib is the only CDK4/6i with Category 1 recommendation supported by statistically significant OS data in first-line postmenopausal patients."</p>
     </div>
     <div class="bg-white p-4 rounded-lg border border-slate-200">
       <div class="text-xs font-bold text-slate-400 mb-2">ASCO 2024</div>
       <p class="text-sm font-medium text-slate-800">"Overall survival benefits should be a key consideration in selection of CDK4/6 inhibitor therapy."</p>
     </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <div class="bg-blue-50 p-4 rounded-lg text-sm text-blue-900">
      <strong>Practice Point:</strong> Guidelines emphasize maintaining dose intensity to maximize survival benefit, managing AEs with dose modifications rather than discontinuation.
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-100 p-6 text-[10px] text-slate-500">
    Refer to NCCN.org for full guidelines.
  </footer>
</div>`
  },

  {
    id: 'edu-conference-poster',
    name: 'Digital Congress Poster',
    category: 'Education',
    description: 'Mobile-optimized layout for scientific poster presentations.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO (Poster Header) -->
  <header class="bg-white p-6 border-b-4 border-[#F16F20]">
    <div class="text-[10px] text-slate-500 uppercase font-bold mb-2">SABCS 2024 • Abstract #1234</div>
    <h1 class="text-xl font-bold text-slate-900 leading-tight">Updated Overall Survival Analysis of Ribociclib in MONALEESA-2</h1>
    <div class="mt-4 flex gap-2 text-[10px] text-slate-500">
      <span class="bg-slate-100 px-2 py-1 rounded">Hortobagyi et al.</span>
      <span class="bg-slate-100 px-2 py-1 rounded">MD Anderson</span>
    </div>
  </header>

  <!-- 2. KEY DATA (Results Box) -->
  <section class="p-6 bg-orange-50">
    <h2 class="text-sm font-bold text-[#F16F20] uppercase mb-3">Key Results</h2>
    <ul class="space-y-2 text-sm text-slate-800">
      <li class="flex gap-2">
        <span class="font-bold text-[#F16F20]">➤</span>
        Median OS: 63.9 months (Ribociclib) vs 51.4 months (Placebo).
      </li>
      <li class="flex gap-2">
        <span class="font-bold text-[#F16F20]">➤</span>
        Benefit maintained after >6 years of follow-up.
      </li>
    </ul>
  </section>

  <!-- 3. EVIDENCE (Charts) -->
  <section class="p-6">
     <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4">
        <div class="h-40 bg-slate-50 flex items-center justify-center text-slate-400 text-xs border border-dashed border-slate-300">
          [Figure 1: OS Kaplan-Meier Curve]
        </div>
        <p class="text-[10px] text-slate-500 mt-2 italic">Fig 1. Sustained separation of curves observed from month 20 onwards.</p>
     </div>
  </section>

  <!-- 4. DETAILS (Conclusions) -->
  <section class="p-6 pt-0">
    <h2 class="text-sm font-bold text-slate-900 uppercase mb-2">Conclusions</h2>
    <p class="text-sm text-slate-600 leading-relaxed">
      These results represent the longest reported median OS for any CDK4/6 inhibitor in the first-line setting, supporting Ribociclib + Letrozole as a standard of care.
    </p>
  </section>

  <!-- 5. REFERENCES -->
  <footer class="bg-slate-900 text-slate-400 p-6 text-[10px]">
    Correspondence: gabriel.hortobagyi@mdanderson.org
  </footer>
</div>`
  },

  // =================================================================
  // CATEGORY: PATIENT CENTRIC (5 Templates)
  // =================================================================
  {
    id: 'pat-journey',
    name: 'Patient Treatment Journey',
    category: 'Patient Centric',
    description: 'Friendly timeline helping patients understand what to expect.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-indigo-50 p-8 pb-12 rounded-b-[40px]">
    <h1 class="text-2xl font-bold text-indigo-900 mb-2">Your Treatment Journey</h1>
    <p class="text-indigo-600 text-sm">What to expect step-by-step.</p>
  </header>

  <!-- 2. KEY DATA (Status) -->
  <section class="max-w-3xl mx-auto px-6 -mt-6 mb-10">
    <div class="bg-white rounded-2xl shadow-lg p-6 text-center">
       <p class="text-xs text-slate-400 uppercase font-bold mb-1">Current Phase</p>
       <h2 class="text-xl font-bold text-[#F16F20]">Getting Started</h2>
    </div>
  </section>

  <!-- 3. EVIDENCE (Timeline) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
     <div class="relative border-l-2 border-indigo-100 ml-3 space-y-8 pb-4">
        <!-- Item 1 -->
        <div class="pl-8 relative">
          <div class="absolute -left-[9px] top-0 w-4 h-4 bg-[#F16F20] rounded-full ring-4 ring-white"></div>
          <h3 class="font-bold text-slate-900">Day 1: First Dose</h3>
          <p class="text-sm text-slate-600 mt-1">Take 3 tablets in the morning. You can eat breakfast before or after.</p>
        </div>
        <!-- Item 2 -->
        <div class="pl-8 relative">
          <div class="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-200 rounded-full ring-4 ring-white"></div>
          <h3 class="font-bold text-slate-900">Day 14: Blood Check</h3>
          <p class="text-sm text-slate-600 mt-1">A quick blood draw to check your white blood cell counts and heart rhythm (ECG).</p>
        </div>
        <!-- Item 3 -->
        <div class="pl-8 relative">
          <div class="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-200 rounded-full ring-4 ring-white"></div>
          <h3 class="font-bold text-slate-900">Day 21: Rest Period</h3>
          <p class="text-sm text-slate-600 mt-1">Stop taking the pills for 7 days to let your body recover.</p>
        </div>
     </div>
  </section>

  <!-- 4. DETAILS (Resources) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <div class="bg-slate-50 rounded-xl p-6 flex items-center gap-4">
       <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl">📞</div>
       <div>
         <h3 class="font-bold text-slate-900">Nurse Support Line</h3>
         <p class="text-xs text-slate-500">Available 24/7 for questions.</p>
         <button class="text-[#F16F20] text-xs font-bold mt-1">Tap to Call</button>
       </div>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-100 p-6 text-[10px] text-slate-500 text-center">
    Always follow your doctor's instructions. Call 911 for emergencies.
  </footer>
</div>`
  },

  {
    id: 'pat-symptom-log',
    name: 'Symptom Tracker',
    category: 'Patient Centric',
    description: 'Interactive tool for patients to log daily status.',
    htmlContent: `
<div class="bg-slate-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-white p-6 shadow-sm sticky top-0 z-50">
    <div class="flex justify-between items-center">
      <h1 class="text-lg font-bold text-slate-900">Daily Check-in</h1>
      <span class="text-xs text-slate-500">Oct 24</span>
    </div>
  </header>

  <!-- 2. KEY DATA (Score) -->
  <section class="max-w-3xl mx-auto px-6 py-8 text-center">
    <p class="text-slate-500 text-sm mb-2">How are you feeling today?</p>
    <div class="flex justify-center gap-4">
      <button class="w-12 h-12 text-2xl bg-white rounded-full shadow hover:bg-red-50 transition">😔</button>
      <button class="w-12 h-12 text-2xl bg-white rounded-full shadow hover:bg-yellow-50 transition">😐</button>
      <button class="w-12 h-12 text-2xl bg-[#F16F20] rounded-full shadow text-white transform scale-110">🙂</button>
    </div>
  </section>

  <!-- 3. EVIDENCE (Log Form) -->
  <section class="max-w-3xl mx-auto px-6 mb-8 space-y-4">
    <div class="bg-white p-4 rounded-xl shadow-sm">
       <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Did you take your meds?</label>
       <div class="flex gap-2">
         <button class="flex-1 py-2 bg-[#F16F20] text-white rounded-lg font-bold text-sm">Yes</button>
         <button class="flex-1 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold text-sm">No</button>
       </div>
    </div>
    <div class="bg-white p-4 rounded-xl shadow-sm">
       <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Symptoms</label>
       <div class="grid grid-cols-2 gap-2">
         <button class="py-2 border border-slate-200 rounded text-sm text-slate-600">Nausea</button>
         <button class="py-2 border border-slate-200 rounded text-sm text-slate-600">Fatigue</button>
         <button class="py-2 border border-slate-200 rounded text-sm text-slate-600">Headache</button>
         <button class="py-2 border border-slate-200 rounded text-sm text-slate-600">Other</button>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-8">
    <button class="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg">Save Log</button>
  </section>

  <!-- 5. SAFETY -->
  <footer class="p-6 text-center text-[10px] text-slate-400">
    This log is for your personal records and does not replace medical advice.
  </footer>
</div>`
  },

  {
    id: 'pat-financial',
    name: 'Co-Pay & Support',
    category: 'Patient Centric',
    description: 'Access to financial assistance and savings cards.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-green-600 text-white p-8 pb-12">
    <h1 class="text-2xl font-bold">Patient Support</h1>
    <p class="text-green-100">We're here to help you pay for treatment.</p>
  </header>

  <!-- 2. KEY DATA (Card) -->
  <section class="max-w-3xl mx-auto px-6 -mt-8 mb-10">
    <div class="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-[#F16F20]">
      <div class="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <span class="font-bold text-slate-900">Universal Co-Pay Card</span>
        <span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span>
      </div>
      <div class="p-6 text-center">
         <div class="text-sm text-slate-500 mb-2">Eligible patients may pay as little as</div>
         <div class="text-5xl font-black text-[#F16F20] mb-2">$0</div>
         <div class="text-xs text-slate-400">per prescription*</div>
      </div>
    </div>
  </section>

  <!-- 3. EVIDENCE (Steps) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h2 class="text-lg font-bold mb-4">How to Access</h2>
    <div class="space-y-4">
       <div class="flex gap-4">
         <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">1</div>
         <p class="text-sm text-slate-600 pt-1">Download your card immediately.</p>
       </div>
       <div class="flex gap-4">
         <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">2</div>
         <p class="text-sm text-slate-600 pt-1">Show it to your specialty pharmacy.</p>
       </div>
       <div class="flex gap-4">
         <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">3</div>
         <p class="text-sm text-slate-600 pt-1">Instant savings applied at checkout.</p>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS (Button) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
     <button class="w-full bg-[#F16F20] text-white py-4 rounded-xl font-bold shadow-lg">Download Card Now</button>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-50 p-6 text-[10px] text-slate-500 text-center">
    *Limitations apply. Not valid for government-insured patients (Medicare/Medicaid).
  </footer>
</div>`
  },

  {
    id: 'pat-caregiver',
    name: 'Caregiver Guide',
    category: 'Patient Centric',
    description: 'Support resources for friends and family.',
    htmlContent: `
<div class="bg-orange-50 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-white p-8 rounded-b-3xl shadow-sm">
    <h1 class="text-2xl font-bold text-slate-900 mb-2">Caregiver Corner</h1>
    <p class="text-slate-500">You are not alone in this journey.</p>
  </header>

  <!-- 2. KEY DATA (Quote) -->
  <section class="max-w-3xl mx-auto px-6 py-8">
    <div class="relative p-6">
       <span class="absolute top-0 left-0 text-6xl text-orange-200 font-serif leading-none">“</span>
       <p class="relative z-10 text-lg font-medium text-slate-700 text-center italic">
         Caring for yourself is one of the most important things you can do for your loved one.
       </p>
    </div>
  </section>

  <!-- 3. EVIDENCE (Tips Grid) -->
  <section class="max-w-3xl mx-auto px-6 mb-8 grid grid-cols-1 gap-4">
     <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#F16F20]">
       <h3 class="font-bold text-slate-900 mb-1">Organization</h3>
       <p class="text-sm text-slate-600">Keep a binder with all medication lists, doctor contacts, and appointment dates.</p>
     </div>
     <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
       <h3 class="font-bold text-slate-900 mb-1">Communication</h3>
       <p class="text-sm text-slate-600">Be the second set of ears at appointments. Take notes.</p>
     </div>
     <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
       <h3 class="font-bold text-slate-900 mb-1">Respite</h3>
       <p class="text-sm text-slate-600">Accept help from others when offered. Take breaks.</p>
     </div>
  </section>

  <!-- 4. DETAILS (Resources) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
    <h3 class="font-bold text-slate-900 mb-4">Helpful Links</h3>
    <div class="space-y-2">
       <a href="#" class="block p-3 bg-white rounded-lg text-sm text-[#F16F20] font-bold">Download Caregiver Checklist &rarr;</a>
       <a href="#" class="block p-3 bg-white rounded-lg text-sm text-[#F16F20] font-bold">Find Local Support Groups &rarr;</a>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="p-6 text-[10px] text-slate-400 text-center">
    Provided as an educational service.
  </footer>
</div>`
  },

  {
    id: 'pat-life-quality',
    name: 'Quality of Life',
    category: 'Patient Centric',
    description: 'Focus on living well during treatment.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-slate-900 text-white p-8 pb-16 relative overflow-hidden">
     <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1000&q=80')] bg-cover opacity-20"></div>
     <div class="relative z-10">
       <h1 class="text-3xl font-bold mb-2">More Than Just Survival</h1>
       <p class="text-slate-300">Maintaining your quality of life.</p>
     </div>
  </header>

  <!-- 2. KEY DATA -->
  <section class="max-w-3xl mx-auto px-6 -mt-10 mb-10 relative z-20">
     <div class="bg-white p-6 rounded-2xl shadow-xl text-center">
       <h2 class="text-xl font-bold text-slate-900">Maintained QoL</h2>
       <p class="text-sm text-slate-600 mt-2">Patients reported <span class="text-[#F16F20] font-bold">no deterioration</span> in global health status compared to baseline.</p>
     </div>
  </section>

  <!-- 3. EVIDENCE (Visual) -->
  <section class="max-w-3xl mx-auto px-6 mb-12">
     <div class="bg-slate-50 rounded-xl p-6">
       <div class="flex items-end gap-4 h-32 mb-2 px-4">
          <div class="flex-1 bg-slate-300 rounded-t-lg h-[80%] relative group">
             <div class="absolute bottom-2 w-full text-center text-[10px]">Start</div>
          </div>
          <div class="flex-1 bg-[#F16F20] rounded-t-lg h-[82%] relative group">
             <div class="absolute bottom-2 w-full text-center text-[10px] text-white">1 Year</div>
          </div>
          <div class="flex-1 bg-[#F16F20] rounded-t-lg h-[81%] relative group">
             <div class="absolute bottom-2 w-full text-center text-[10px] text-white">2 Years</div>
          </div>
       </div>
       <p class="text-center text-xs text-slate-500">EORTC QLQ-C30 Scores over time</p>
     </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-12 space-y-4">
    <div class="flex items-start gap-3">
       <span class="text-2xl">🧘‍♀️</span>
       <div>
         <h4 class="font-bold text-slate-900">Physical Function</h4>
         <p class="text-sm text-slate-600">Ability to perform daily activities was preserved.</p>
       </div>
    </div>
    <div class="flex items-start gap-3">
       <span class="text-2xl">😌</span>
       <div>
         <h4 class="font-bold text-slate-900">Emotional Well-being</h4>
         <p class="text-sm text-slate-600">Significant reduction in anxiety compared to chemotherapy.</p>
       </div>
    </div>
  </section>

  <!-- 5. SAFETY -->
  <footer class="bg-slate-100 p-6 text-[10px] text-slate-500 text-center">
    Based on PRO (Patient Reported Outcomes) data from MONALEESA-7.
  </footer>
</div>`
  },

  // =================================================================
  // CATEGORY: SALES & ACCESS (5 Templates)
  // =================================================================
  {
    id: 'sales-detail-aid',
    name: 'Digital Detailer',
    category: 'Sales Tools',
    description: 'High-impact slide for sales reps on iPad.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800 flex flex-col">
  <!-- 1. HERO -->
  <div class="flex-1 flex flex-col justify-center px-8 bg-slate-50">
     <div class="w-20 h-1 bg-[#F16F20] mb-6"></div>
     <h1 class="text-5xl font-black text-slate-900 mb-4">The Only One.</h1>
     <p class="text-2xl text-slate-600 font-light">
       The only CDK4/6i with proven <strong class="text-[#F16F20]">Overall Survival</strong> benefit across three Phase III trials.
     </p>
  </div>

  <!-- 2. KEY DATA -->
  <div class="bg-white p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10">
    <div class="grid grid-cols-3 gap-8">
       <div class="text-center border-r border-slate-100">
          <div class="text-4xl font-bold text-[#F16F20]">63.9 mo</div>
          <div class="text-xs uppercase tracking-widest text-slate-500 mt-1">Median OS</div>
       </div>
       <div class="text-center border-r border-slate-100">
          <div class="text-4xl font-bold text-[#F16F20]">0.76</div>
          <div class="text-xs uppercase tracking-widest text-slate-500 mt-1">Hazard Ratio</div>
       </div>
       <div class="text-center">
          <div class="text-4xl font-bold text-[#F16F20]">5/5</div>
          <div class="text-xs uppercase tracking-widest text-slate-500 mt-1">ESMO Score</div>
       </div>
    </div>
  </div>
  
  <!-- 3. EVIDENCE (Buttons) -->
  <div class="bg-slate-900 p-6 flex justify-between items-center">
     <button class="text-white text-sm font-bold flex items-center gap-2">
       <span>View Safety Info</span>
       <span class="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px]">i</span>
     </button>
     <div class="flex gap-2">
       <button class="bg-[#F16F20] text-white px-6 py-3 rounded-lg font-bold">Efficacy Data</button>
       <button class="bg-slate-700 text-white px-6 py-3 rounded-lg font-bold">Dosing Info</button>
     </div>
  </div>
</div>`
  },

  {
    id: 'sales-objection-handler',
    name: 'Objection Handler',
    category: 'Sales Tools',
    description: 'Interactive cards for handling common pushback.',
    htmlContent: `
<div class="bg-slate-100 min-h-screen font-sans text-slate-800 p-6">
  <!-- 1. HERO -->
  <header class="mb-6">
    <h1 class="text-xl font-bold text-slate-900">Objection Handler</h1>
    <p class="text-sm text-slate-500">Quick responses for common barriers.</p>
  </header>

  <!-- 2. EVIDENCE (Interactive Cards) -->
  <div class="space-y-4">
    <!-- Card 1 -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden group">
       <div class="p-4 bg-white border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center cursor-pointer">
         "I'm worried about monitoring burden."
         <span class="text-slate-400 group-hover:text-[#F16F20] transition">▼</span>
       </div>
       <div class="p-5 bg-slate-50 text-sm text-slate-600">
         <p class="mb-3"><strong>Acknowledge & Pivot:</strong> "That's a valid concern. However, monitoring frequency decreases significantly after the first 2 cycles."</p>
         <ul class="list-disc pl-5 space-y-1 text-xs">
           <li>ECG only needed at baseline and Day 14 of Cycle 1.</li>
           <li>Standard CBC monitoring aligns with routine care visits.</li>
         </ul>
       </div>
    </div>

    <!-- Card 2 -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden group">
       <div class="p-4 bg-white border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center cursor-pointer">
         "My patients are stable on current therapy."
         <span class="text-slate-400 group-hover:text-[#F16F20] transition">▼</span>
       </div>
       <div class="p-5 bg-slate-50 text-sm text-slate-600">
         <p class="mb-3"><strong>Challenge:</strong> "Stability is good, but survival is better. Ribociclib is the only agent with proven OS benefit in this setting."</p>
       </div>
    </div>
  </div>

  <!-- 5. SAFETY -->
  <footer class="mt-8 text-[10px] text-slate-400 text-center">
    For internal training use only. Not for distribution.
  </footer>
</div>`
  },

  {
    id: 'acc-formulary-map',
    name: 'Formulary Coverage',
    category: 'Sales Tools',
    description: 'Geographic or list-based view of insurance coverage.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-slate-900 text-white p-6">
    <h1 class="text-xl font-bold">Market Access</h1>
    <p class="text-slate-400 text-sm">National Coverage Status: <span class="text-green-400 font-bold">Excellent</span></p>
  </header>

  <!-- 2. KEY DATA -->
  <section class="p-6 grid grid-cols-2 gap-4 bg-slate-50 border-b border-slate-200">
     <div class="text-center">
       <div class="text-2xl font-black text-[#F16F20]">96%</div>
       <div class="text-[10px] uppercase text-slate-500">Commercial Lives</div>
     </div>
     <div class="text-center">
       <div class="text-2xl font-black text-[#F16F20]">99%</div>
       <div class="text-[10px] uppercase text-slate-500">Medicare Part D</div>
     </div>
  </section>

  <!-- 3. EVIDENCE (List) -->
  <section class="p-6">
    <h3 class="font-bold text-slate-900 mb-4 text-sm">Major Plans</h3>
    <div class="space-y-3">
       <div class="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
         <span class="font-bold text-sm">UnitedHealthcare</span>
         <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Preferred</span>
       </div>
       <div class="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
         <span class="font-bold text-sm">CVS Caremark</span>
         <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Preferred</span>
       </div>
       <div class="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
         <span class="font-bold text-sm">Express Scripts</span>
         <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Preferred</span>
       </div>
    </div>
  </section>

  <!-- 4. DETAILS (PA Tips) -->
  <section class="p-6 bg-blue-50 mx-6 rounded-xl mb-6">
    <h3 class="font-bold text-blue-900 text-sm mb-2">Prior Auth Tips</h3>
    <p class="text-xs text-blue-800">
      Most plans require diagnosis of HR+/HER2- MBC. Approval turnaround avg: 48 hours.
    </p>
  </section>

  <!-- 5. SAFETY -->
  <footer class="p-6 text-[10px] text-slate-400 text-center">
    Coverage data valid as of Q4 2024. Subject to change.
  </footer>
</div>`
  },

  {
    id: 'corp-launch-announce',
    name: 'Product Launch PR',
    category: 'Corporate',
    description: 'Internal or external announcement for a new indication.',
    htmlContent: `
<div class="bg-white min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="relative h-64 bg-slate-900 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-[#F16F20] to-slate-900 opacity-50"></div>
    <div class="absolute bottom-0 left-0 p-8">
      <span class="bg-[#F16F20] text-white px-2 py-1 rounded text-[10px] font-bold uppercase mb-2 inline-block">Press Release</span>
      <h1 class="text-3xl font-bold text-white leading-tight">FDA Approves New Indication for Adjuvant Setting</h1>
    </div>
  </header>

  <!-- 2. KEY DATA -->
  <section class="max-w-3xl mx-auto px-6 py-8">
    <p class="text-lg font-medium text-slate-900 leading-relaxed mb-6">
      Novartis announces a major milestone in the treatment of early breast cancer, offering a new standard of care for high-risk patients.
    </p>
  </section>

  <!-- 3. EVIDENCE (Quote) -->
  <section class="max-w-3xl mx-auto px-6 mb-10">
    <div class="border-l-4 border-[#F16F20] pl-6 italic text-slate-600">
      "This approval represents a paradigm shift. We can now offer a tool to significantly reduce the risk of recurrence in thousands of women."
      <div class="mt-2 font-bold text-slate-900 not-italic text-sm">– Chief Medical Officer</div>
    </div>
  </section>

  <!-- 4. DETAILS -->
  <section class="max-w-3xl mx-auto px-6 mb-12 bg-slate-50 p-6 rounded-xl">
    <h3 class="font-bold text-slate-900 mb-2">Launch Timeline</h3>
    <ul class="text-sm text-slate-600 space-y-2">
      <li><strong>Today:</strong> Global Town Hall Announcement</li>
      <li><strong>Next Week:</strong> Field Force Training Begins</li>
      <li><strong>Next Month:</strong> Product Availability in Pharmacies</li>
    </ul>
  </section>

  <!-- 5. FOOTER -->
  <footer class="bg-slate-900 text-slate-400 p-8 text-[10px] text-center">
    Novartis Pharmaceuticals Corporation. For Media Inquiries, contact press@novartis.com.
  </footer>
</div>`
  },

  {
    id: 'corp-exec-dashboard',
    name: 'Executive Dashboard',
    category: 'Corporate',
    description: 'High-level business metrics view.',
    htmlContent: `
<div class="bg-slate-100 min-h-screen font-sans text-slate-800">
  <!-- 1. HERO -->
  <header class="bg-white p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 z-50">
    <div>
      <h1 class="text-xl font-bold text-slate-900">Oncology Performance</h1>
      <p class="text-xs text-slate-500">Q3 2025 Report</p>
    </div>
    <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
  </header>

  <!-- 2. KEY DATA -->
  <section class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="text-xs text-slate-400 uppercase font-bold mb-1">Total Revenue</div>
      <div class="flex items-end justify-between">
         <div class="text-3xl font-black text-slate-900">$482M</div>
         <div class="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12% YoY</div>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="text-xs text-slate-400 uppercase font-bold mb-1">Market Share</div>
      <div class="flex items-end justify-between">
         <div class="text-3xl font-black text-slate-900">34.5%</div>
         <div class="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+1.2% QoQ</div>
      </div>
    </div>
  </section>

  <!-- 3. EVIDENCE (Regional Split) -->
  <section class="p-6 pt-0">
    <h3 class="font-bold text-slate-900 mb-4 text-sm uppercase">Regional Breakdown</h3>
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
       <div class="p-4 border-b border-slate-100 flex items-center justify-between">
         <span class="text-sm font-medium">US Market</span>
         <span class="font-bold">$280M</span>
       </div>
       <div class="p-4 border-b border-slate-100 flex items-center justify-between">
         <span class="text-sm font-medium">EU Region</span>
         <span class="font-bold">$140M</span>
       </div>
       <div class="p-4 flex items-center justify-between">
         <span class="text-sm font-medium">Growth Markets</span>
         <span class="font-bold">$62M</span>
       </div>
    </div>
  </section>

  <!-- 5. FOOTER -->
  <footer class="p-6 text-center text-[10px] text-slate-400">
    Confidential. For internal management use only.
  </footer>
</div>`
  }
];
