import { Template } from './types';

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'pharma-efficacy-report',
    name: 'Clinical Efficacy Report',
    category: 'Clinical Data',
    description: 'High-impact clinical trial results with comparative bar charts and p-value highlights. Modeled after major oncology study reports.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-orange-50 min-h-screen font-sans text-slate-800 pb-12">
  <!-- Header -->
  <div class="relative bg-gradient-to-b from-[#F16F20] to-[#ff944d] pt-12 pb-24 px-6 rounded-b-[3rem] shadow-xl overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
    <div class="flex justify-between items-center mb-6">
       <div class="flex items-center gap-2">
         <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
         <span class="text-white font-bold tracking-widest uppercase text-sm">Novartis</span>
       </div>
       <span class="bg-white/20 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">Phase III Results</span>
    </div>
    <h1 class="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
      BREAKTHROUGH<br/>SURVIVAL DATA
    </h1>
    <p class="text-orange-100 text-lg font-medium">Redefining Standards of Care in HR+/HER2-</p>
  </div>

  <!-- Key Statistic Card -->
  <div class="relative -mt-16 px-4 mb-8">
    <div class="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-[#F16F20]">
      <div class="flex flex-col items-center text-center">
         <span class="text-slate-500 font-bold uppercase tracking-wider text-xs mb-2">Relative Risk Reduction</span>
         <div class="text-6xl font-black text-[#F16F20] mb-1">25%</div>
         <p class="text-slate-600 text-sm leading-relaxed">Demonstrated statistically significant improvement in Overall Survival (OS) vs. Placebo.</p>
         <div class="mt-4 px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">HR=0.75 (95% CI: 0.60-0.93)</div>
      </div>
    </div>
  </div>

  <!-- Chart Section -->
  <div class="px-4 mb-8">
    <h3 class="text-[#F16F20] font-bold text-xl mb-6 flex items-center gap-2">
       <span class="w-2 h-6 bg-[#F16F20] rounded-full"></span>
       Median Progression-Free Survival
    </h3>
    
    <div class="bg-white p-6 rounded-2xl shadow-lg space-y-8">
      <!-- Bar 1 -->
      <div>
        <div class="flex justify-between text-sm font-bold text-slate-700 mb-2">
          <span>Study Drug + ET</span>
          <span class="text-[#F16F20]">25.3 Months</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-6 overflow-hidden relative">
           <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F16F20] to-[#ff944d]" style="width: 85%"></div>
        </div>
      </div>
      
      <!-- Bar 2 -->
      <div>
        <div class="flex justify-between text-sm font-bold text-slate-700 mb-2">
          <span>Placebo + ET</span>
          <span class="text-slate-500">16.0 Months</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-6 overflow-hidden relative">
           <div class="absolute top-0 left-0 h-full bg-slate-400" style="width: 55%"></div>
        </div>
      </div>

      <p class="text-xs text-slate-400 italic border-t border-slate-100 pt-4">
         *Median PFS estimated by Kaplan-Meier method. ET: Endocrine Therapy.
      </p>
    </div>
  </div>

  <!-- Conclusion -->
  <div class="px-4 pb-8">
     <div class="bg-[#F16F20]/10 rounded-xl p-6 border border-[#F16F20]/20 flex gap-4 items-start">
        <div class="bg-[#F16F20] text-white p-2 rounded-full shrink-0">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
           <h4 class="font-bold text-[#db590b] mb-1">Clinical Takeaway</h4>
           <p class="text-sm text-slate-700">Consistent benefit observed across all pre-specified subgroups, establishing this regimen as a preferred first-line option.</p>
        </div>
     </div>
  </div>
  
  <!-- Footer -->
  <div class="px-6 text-[10px] text-slate-400 leading-tight text-center">
     <p>For Healthcare Professionals Only. Please refer to full Prescribing Information.</p>
     <p class="mt-2">© 2024 Novartis. All rights reserved.</p>
  </div>
</div>
    `
  },
  {
    id: 'pharma-consensus-guidelines',
    name: 'Expert Consensus Guidelines',
    category: 'Education',
    description: 'Formal layout for presenting medical guidelines, consensus statements, and standard of care updates. Features "Badge" styling and list structures.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-[#fff8f2] min-h-screen font-sans text-slate-800 relative">
   <!-- Top Decoration -->
   <div class="h-2 w-full bg-gradient-to-r from-[#F16F20] to-yellow-400"></div>
   
   <!-- Header -->
   <div class="p-8 pb-0">
      <div class="flex justify-between items-start mb-6">
         <div class="font-bold text-2xl text-[#F16F20] leading-none">
            GLOBAL<br/>CONSENSUS
         </div>
         <div class="bg-white border border-[#F16F20] text-[#F16F20] px-3 py-1 text-xs font-bold rounded uppercase">
            2025 Update
         </div>
      </div>
      
      <h1 class="text-3xl font-black text-slate-900 mb-4">
         Optimizing Management of <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#F16F20] to-yellow-500">Early Breast Cancer</span>
      </h1>
      
      <div class="w-24 h-1 bg-[#F16F20] mb-8"></div>
   </div>

   <!-- Document Card -->
   <div class="px-4 mb-8 relative z-10">
      <div class="bg-white p-8 rounded-tr-[3rem] rounded-bl-[3rem] shadow-2xl border-l-8 border-[#F16F20] relative overflow-hidden">
         <!-- Paperclip visual -->
         <div class="absolute -top-3 right-12 w-4 h-12 bg-slate-200 rounded-full border-2 border-white shadow-md rotate-12"></div>
         
         <h3 class="font-bold text-lg text-slate-800 mb-2 border-b border-slate-100 pb-2">Key Guideline Updates</h3>
         <div class="space-y-4 mt-4">
            <div class="flex gap-3">
               <div class="w-6 h-6 rounded-full bg-[#F16F20] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
               <p class="text-sm text-slate-600 font-medium">High-risk patients (N+ or N0 with risk factors) require intensified adjuvant therapy.</p>
            </div>
            <div class="flex gap-3">
               <div class="w-6 h-6 rounded-full bg-[#F16F20] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
               <p class="text-sm text-slate-600 font-medium">Ki-67 score should be considered alongside TNM staging for risk stratification.</p>
            </div>
            <div class="flex gap-3">
               <div class="w-6 h-6 rounded-full bg-[#F16F20] text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
               <p class="text-sm text-slate-600 font-medium">CDK4/6 inhibitors demonstrate consistent efficacy in preventing recurrence.</p>
            </div>
         </div>
      </div>
   </div>

   <!-- Impact Section -->
   <div class="bg-[#F16F20] text-white py-12 px-8 rounded-3xl mx-4 mb-8 relative overflow-hidden shadow-lg">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10"></div>
      
      <h3 class="font-bold text-xl mb-4 relative z-10">Broadened Eligibility</h3>
      <p class="text-orange-100 text-sm mb-6 relative z-10 leading-relaxed">The NATALEE study evidence supports expanding CDK4/6i usage to a wider population of Stage II/III patients, regardless of nodal status.</p>
      
      <div class="flex gap-4 relative z-10">
         <div class="flex-1 bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <div class="text-2xl font-bold">N+</div>
            <div class="text-[10px] uppercase opacity-75">All Patients</div>
         </div>
         <div class="flex-1 bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <div class="text-2xl font-bold">N0</div>
            <div class="text-[10px] uppercase opacity-75">High Risk</div>
         </div>
      </div>
   </div>

   <!-- Footer -->
   <div class="px-8 pb-12">
      <div class="border-t border-orange-200 pt-4">
         <p class="text-[10px] text-slate-500">Reference: 1. Hortobagyi GN, et al. N Engl J Med. 2024. 2. Global Consensus Guidelines 2025 Edition.</p>
      </div>
   </div>
</div>
    `
  },
  {
    id: 'pharma-dosing-guide',
    name: 'Dosing & Administration',
    category: 'Clinical Practice',
    description: 'Practical reference guide for HCPs showing starting doses, modification protocols for AEs, and administration steps. Essential for safety compliance.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-white min-h-screen font-sans text-slate-800 pb-12">
  <!-- Dark Header -->
  <div class="bg-slate-900 text-white p-10 rounded-b-[40px] mb-8 shadow-2xl relative overflow-hidden">
     <div class="absolute top-0 right-0 w-64 h-64 bg-[#F16F20] rounded-full blur-[80px] opacity-10"></div>
     <div class="text-[#F16F20] font-bold tracking-[0.2em] text-xs uppercase mb-3 relative z-10">Clinical Practice</div>
     <h1 class="text-4xl font-black mb-3 relative z-10">Dosing &<br/>Administration</h1>
     <p class="text-slate-400 relative z-10 text-sm max-w-xs">Recommended starting dose and modification guidelines for optimal management.</p>
  </div>

  <!-- Primary Dosing Card -->
  <div class="px-6 mb-8">
     <div class="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div class="bg-white p-5 rounded-xl shadow-lg border border-orange-100 text-center min-w-[120px]">
           <span class="block text-5xl font-black text-[#F16F20] tracking-tighter">600</span>
           <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">mg / daily</span>
        </div>
        <div class="text-center md:text-left">
           <h3 class="font-bold text-xl text-slate-900 mb-1">Recommended Starting Dose</h3>
           <p class="text-sm text-slate-600 leading-relaxed">Two 300mg tablets taken once daily, preferably at the same time each day, with or without food.</p>
        </div>
     </div>
  </div>

  <!-- Modification Protocols -->
  <div class="px-6 mb-8">
    <h3 class="font-bold text-slate-900 mb-5 flex items-center gap-2 text-lg">
      <div class="p-1.5 bg-[#F16F20] rounded text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
      </div>
      Dose Modifications
    </h3>
    
    <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
       <div class="bg-slate-50 p-4 text-xs font-bold text-slate-500 uppercase flex justify-between tracking-wider border-b border-slate-200">
          <span>Adverse Event Level</span>
          <span>Recommended Action</span>
       </div>
       <div class="divide-y divide-slate-100">
          <!-- Row 1 -->
          <div class="p-5 flex flex-col md:flex-row justify-between md:items-center gap-2 bg-white">
             <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-green-400"></span>
                <span class="font-bold text-sm text-slate-700">Grade 1 or 2</span>
             </div>
             <span class="text-sm text-slate-600 md:text-right">No dose adjustment required. Continue monitoring.</span>
          </div>
          
          <!-- Row 2 -->
          <div class="p-5 flex flex-col md:flex-row justify-between md:items-center gap-2 bg-orange-50/30">
             <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#F16F20]"></span>
                <span class="font-bold text-sm text-[#F16F20]">Grade 3</span>
             </div>
             <span class="text-sm text-slate-600 md:text-right">Interrupt until recovery to ≤ Grade 1, then resume at same dose.</span>
          </div>
          
          <!-- Row 3 -->
          <div class="p-5 flex flex-col md:flex-row justify-between md:items-center gap-2 bg-red-50/30">
             <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-red-500"></span>
                <span class="font-bold text-sm text-red-600">Grade 4</span>
             </div>
             <span class="text-sm text-slate-600 md:text-right">Interrupt until recovery, resume at reduced dose (400mg).</span>
          </div>
       </div>
    </div>
  </div>

  <!-- Administration Checklist -->
  <div class="px-6 pb-6">
     <div class="bg-slate-100 rounded-xl p-5">
        <h4 class="text-xs font-bold text-slate-500 uppercase mb-3">Key Administration Points</h4>
        <ul class="space-y-3">
           <li class="flex items-start gap-3 text-sm text-slate-700">
              <svg class="w-5 h-5 text-[#F16F20] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Tablets should be swallowed whole. Do not chew, crush, or split.</span>
           </li>
           <li class="flex items-start gap-3 text-sm text-slate-700">
              <svg class="w-5 h-5 text-[#F16F20] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>If a dose is missed, skip the missed dose and take the next dose at the usual time.</span>
           </li>
        </ul>
     </div>
  </div>
</div>
    `
  },
  {
    id: 'pharma-digital-poster',
    name: 'Scientific Congress Poster',
    category: 'Scientific',
    description: 'Digital-first poster layout for congresses (ASCO/ESMO/SABCS). Features clear abstract headers, methods, and results sections optimized for tablet/mobile viewing.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-800 pb-10">
   <!-- Accent Top Bar -->
   <div class="bg-[#F16F20] h-2 w-full"></div>
   
   <!-- Poster Header -->
   <div class="bg-white p-8 shadow-sm mb-6 border-b border-slate-200">
      <div class="flex flex-wrap gap-2 mb-4">
         <span class="bg-slate-100 text-slate-600 px-3 py-1 text-[10px] font-bold uppercase rounded tracking-wider">ASCO 2025</span>
         <span class="bg-[#F16F20]/10 text-[#F16F20] px-3 py-1 text-[10px] font-bold uppercase rounded tracking-wider">Abstract #LBA1</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-black leading-tight mb-6 text-slate-900">
         Efficacy and Safety of Ribociclib plus Endocrine Therapy in Advanced Breast Cancer
      </h1>
      
      <!-- Authors -->
      <div class="flex items-center gap-4">
         <div class="w-10 h-10 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold shadow-md">JD</div>
         <div class="text-xs text-slate-500 leading-relaxed">
            <span class="font-bold text-slate-900 text-sm">John Doe, MD, PhD</span><br/>
            Oncology Department, University Hospital, Zurich
         </div>
      </div>
   </div>

   <div class="px-4 grid gap-6">
      <!-- Methods Section -->
      <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-[#F16F20]">
         <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-1 bg-[#F16F20]"></div>
            <h3 class="font-bold text-sm uppercase tracking-widest text-slate-400">Study Design & Methods</h3>
         </div>
         <p class="text-sm leading-relaxed text-slate-700 mb-4">
            This was a randomized, double-blind, placebo-controlled Phase III trial involving 672 patients. The primary endpoint was Progression-Free Survival (PFS) per investigator assessment.
         </p>
         
         <div class="grid grid-cols-2 gap-2 text-center mt-4">
             <div class="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div class="text-xl font-black text-slate-800">N=336</div>
                <div class="text-[10px] uppercase text-slate-500 font-bold">Arm A (Treatment)</div>
             </div>
             <div class="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div class="text-xl font-black text-slate-800">N=336</div>
                <div class="text-[10px] uppercase text-slate-500 font-bold">Arm B (Placebo)</div>
             </div>
         </div>
      </div>

      <!-- Results Chart Section -->
      <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-slate-800">
         <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-1 bg-slate-800"></div>
            <h3 class="font-bold text-sm uppercase tracking-widest text-slate-400">Primary Endpoint Results</h3>
         </div>
         
         <!-- Chart visual -->
         <div class="h-56 bg-slate-50 rounded-lg relative flex items-end justify-center px-4 pb-0 gap-8 border-b border-slate-200">
            <!-- Grid Lines -->
            <div class="absolute inset-0 w-full h-full p-4 flex flex-col justify-between pointer-events-none opacity-30">
               <div class="w-full h-px bg-slate-300"></div>
               <div class="w-full h-px bg-slate-300"></div>
               <div class="w-full h-px bg-slate-300"></div>
               <div class="w-full h-px bg-slate-300"></div>
               <div class="w-full h-px bg-slate-300"></div>
            </div>

            <!-- Bar 1 -->
            <div class="w-24 bg-[#F16F20] h-[80%] rounded-t-sm relative group shadow-lg">
               <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-2xl text-[#F16F20]">25.3</span>
               <span class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/80 font-bold uppercase">Ribociclib</span>
            </div>
            
            <!-- Bar 2 -->
            <div class="w-24 bg-slate-400 h-[50%] rounded-t-sm relative group shadow">
               <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-2xl text-slate-500">16.0</span>
               <span class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/80 font-bold uppercase">Placebo</span>
            </div>
         </div>
         <div class="text-center mt-3">
            <p class="text-xs font-bold text-slate-500 uppercase">Median PFS (Months)</p>
            <p class="text-[10px] text-slate-400 mt-1">Hazard Ratio = 0.56 (95% CI: 0.43-0.72)</p>
         </div>
      </div>

      <!-- Conclusion -->
      <div class="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
         <h3 class="font-bold text-lg mb-2 text-[#F16F20]">Conclusion</h3>
         <p class="text-sm leading-relaxed text-slate-300">
            The addition of Ribociclib significantly improved PFS compared to placebo. The safety profile was consistent with previous studies, supporting its use as a standard of care.
         </p>
      </div>
   </div>
</div>
    `
  },
  {
    id: 'pharma-patient-case',
    name: 'Patient Case Study',
    category: 'Patient Centric',
    description: 'Story-driven layout for patient case studies. Features a timeline of treatment, patient demographics, and clear outcome markers.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-white min-h-screen font-sans text-slate-800 pb-12">
   <!-- Header Image Area -->
   <div class="bg-slate-900 h-56 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-[#F16F20] to-purple-900 opacity-90"></div>
      <!-- Abstract Pattern -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div class="absolute bottom-0 left-0 p-8 w-full">
         <div class="inline-block bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded mb-3 uppercase tracking-wider">
            Real World Evidence
         </div>
         <h1 class="text-4xl font-black text-white mb-1">Case Study<span class="text-[#F16F20]">.</span></h1>
         <p class="text-white/60 text-sm">Targeting HR+/HER2- Metastatic Breast Cancer</p>
      </div>
   </div>

   <!-- Patient Profile Card -->
   <div class="px-6 -mt-10 relative z-10 flex gap-4">
       <div class="bg-white p-6 rounded-2xl shadow-xl w-full border border-slate-100">
          <div class="flex items-center gap-5 mb-6 border-b border-slate-50 pb-6">
             <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
             </div>
             <div>
                <h2 class="font-bold text-2xl text-slate-800">Sarah M.</h2>
                <p class="text-sm font-medium text-[#F16F20]">54 Years Old • Postmenopausal</p>
             </div>
          </div>
          
          <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
             <div>
                <span class="block text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Diagnosis</span>
                <span class="font-bold text-slate-700">HR+/HER2- mBC</span>
             </div>
             <div>
                <span class="block text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Site of Metastasis</span>
                <span class="font-bold text-slate-700">Visceral (Liver)</span>
             </div>
             <div>
                <span class="block text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Prior Therapy</span>
                <span class="font-bold text-slate-700">None (De Novo)</span>
             </div>
             <div>
                <span class="block text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">ECOG Status</span>
                <span class="font-bold text-slate-700">1</span>
             </div>
          </div>
       </div>
   </div>

   <!-- Treatment Journey Timeline -->
   <div class="p-8">
      <h3 class="font-bold text-lg mb-8 flex items-center gap-2">
         <span class="w-2 h-2 rounded-full bg-[#F16F20]"></span>
         Treatment Journey
      </h3>
      
      <div class="border-l-2 border-slate-100 ml-3 space-y-10 pl-8 relative pb-4">
          <!-- Timeline Item 1 -->
          <div class="relative">
             <div class="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center"></div>
             <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Month 0</h4>
             <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p class="text-sm font-bold text-slate-800">Initiated First-Line Therapy</p>
                <p class="text-xs text-slate-500 mt-1">Ribociclib (600mg) + Letrozole (2.5mg)</p>
             </div>
          </div>

          <!-- Timeline Item 2 -->
          <div class="relative">
             <div class="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-[#F16F20] border-4 border-white shadow-md flex items-center justify-center">
             </div>
             <h4 class="font-bold text-xs uppercase tracking-wider text-[#F16F20] mb-1">Month 3</h4>
             <div class="bg-orange-50 p-5 rounded-xl border border-orange-100 shadow-sm">
                <div class="flex justify-between items-start mb-2">
                   <span class="font-bold text-sm text-[#c05615]">Partial Response</span>
                   <span class="bg-white text-[#c05615] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Milestone</span>
                </div>
                <p class="text-xs text-slate-700 leading-relaxed">CT scan revealed a 30% reduction in liver target lesions. Patient reports improved energy levels.</p>
             </div>
          </div>
          
          <!-- Timeline Item 3 -->
          <div class="relative">
             <div class="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-slate-800 border-4 border-white shadow-sm flex items-center justify-center"></div>
             <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Month 12</h4>
             <div class="bg-white p-4 rounded-xl border border-slate-200">
                <p class="text-sm font-bold text-slate-800">Ongoing Disease Control</p>
                <p class="text-xs text-slate-500 mt-1">Continued stable disease. No new safety signals observed.</p>
             </div>
          </div>
      </div>
   </div>
   
   <div class="text-center px-8">
      <p class="text-[10px] text-slate-400 italic">Hypothetical case for educational purposes only.</p>
   </div>
</div>
    `
  },
  {
    id: 'pharma-safety-profile',
    name: 'Safety Profile Summary',
    category: 'Safety Data',
    description: 'Detailed adverse event (AE) reporting layout with comparative charts and color-coded safety indicators. Professional and transparent.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-white min-h-screen font-sans text-slate-800">
   <!-- Hero -->
   <div class="bg-slate-900 text-white p-8 rounded-b-3xl shadow-2xl mb-10 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-[#F16F20] rounded-full filter blur-[80px] opacity-20"></div>
      <h1 class="text-3xl font-bold relative z-10 mb-2">Safety & Tolerability</h1>
      <p class="text-slate-400 text-sm relative z-10">Comprehensive analysis of Adverse Events (AEs) in the Phase III trial.</p>
   </div>

   <!-- Highlight Stats -->
   <div class="px-6 grid grid-cols-2 gap-4 mb-10">
      <div class="bg-orange-50 p-4 rounded-xl border border-orange-100">
         <div class="text-3xl font-black text-[#F16F20] mb-1">4-7%</div>
         <div class="text-xs font-bold text-slate-600 uppercase">Discontinuation Rate</div>
         <div class="text-[10px] text-slate-500 mt-2">Due to AEs, showing manageable profile.</div>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
         <div class="text-3xl font-black text-slate-700 mb-1">A+</div>
         <div class="text-xs font-bold text-slate-600 uppercase">ESMO-MCBS Score</div>
         <div class="text-[10px] text-slate-500 mt-2">Highest rating for clinical benefit.</div>
      </div>
   </div>

   <!-- Chart: AE Incidence -->
   <div class="px-6 mb-12">
      <h3 class="font-bold text-lg text-slate-900 mb-6 border-l-4 border-[#F16F20] pl-3">Incidence of Select AEs (>10%)</h3>
      
      <!-- Chart Item 1 -->
      <div class="mb-6">
         <div class="flex justify-between text-sm mb-2 font-medium">
            <span>Neutropenia</span>
         </div>
         <div class="flex items-center h-8 gap-1">
             <div class="h-full bg-[#F16F20] flex items-center justify-end px-2 text-[10px] text-white font-bold rounded-l-md" style="width: 60%">60%</div>
             <div class="h-full bg-slate-300 flex items-center justify-end px-2 text-[10px] text-slate-600 font-bold rounded-r-md" style="width: 4%">4%</div>
         </div>
         <div class="flex justify-between mt-1">
            <div class="flex items-center gap-1">
               <div class="w-2 h-2 bg-[#F16F20] rounded-full"></div>
               <span class="text-[10px] text-slate-400">Treatment</span>
            </div>
            <div class="flex items-center gap-1">
               <div class="w-2 h-2 bg-slate-300 rounded-full"></div>
               <span class="text-[10px] text-slate-400">Placebo</span>
            </div>
         </div>
      </div>

      <!-- Chart Item 2 -->
      <div class="mb-6">
         <div class="flex justify-between text-sm mb-2 font-medium">
            <span>Nausea</span>
         </div>
         <div class="flex items-center h-8 gap-1">
             <div class="h-full bg-[#F16F20] flex items-center justify-end px-2 text-[10px] text-white font-bold rounded-l-md" style="width: 32%">32%</div>
             <div class="h-full bg-slate-300 flex items-center justify-end px-2 text-[10px] text-slate-600 font-bold rounded-r-md" style="width: 38%">38%</div>
         </div>
      </div>

      <!-- Chart Item 3 -->
      <div class="mb-6">
         <div class="flex justify-between text-sm mb-2 font-medium">
            <span>Fatigue</span>
         </div>
         <div class="flex items-center h-8 gap-1">
             <div class="h-full bg-[#F16F20] flex items-center justify-end px-2 text-[10px] text-white font-bold rounded-l-md" style="width: 23%">23%</div>
             <div class="h-full bg-slate-300 flex items-center justify-end px-2 text-[10px] text-slate-600 font-bold rounded-r-md" style="width: 40%">40%</div>
         </div>
      </div>
   </div>

   <!-- Safety Note -->
   <div class="mx-6 bg-yellow-50 border border-yellow-100 p-4 rounded-lg flex gap-3">
      <svg class="w-5 h-5 text-yellow-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <p class="text-xs text-yellow-800 leading-relaxed">Most AEs were Grade 1 or 2. Grade 3/4 neutropenia was managed with dose interruptions and/or reductions.</p>
   </div>
   
   <div class="h-12"></div>
</div>
    `
  },
  {
    id: 'pharma-patient-qol',
    name: 'Patient Quality of Life',
    category: 'Patient Centric',
    description: 'A warmer, softer design focused on patient well-being, maintenance of daily activities, and PRO (Patient Reported Outcomes) data.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-gradient-to-b from-orange-50 to-white min-h-screen font-sans text-slate-800">
   <!-- Warm Header -->
   <div class="pt-12 pb-10 px-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F16F20] to-yellow-400 rounded-full shadow-lg mb-6">
         <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
      </div>
      <h1 class="text-3xl font-black text-[#F16F20] mb-3">Living Well, Longer.</h1>
      <p class="text-slate-600 text-lg">Preserving Quality of Life (QoL) while maximizing efficacy.</p>
   </div>

   <!-- Wave Divider CSS -->
   <div class="w-full overflow-hidden leading-none rotate-180">
       <svg class="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
       </svg>
   </div>

   <!-- Content Body -->
   <div class="bg-white px-6 pb-12">
      
      <!-- QoL Metrics Grid -->
      <div class="grid grid-cols-1 gap-6 mb-12">
         
         <!-- Card 1 -->
         <div class="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 shadow-sm">
            <div class="bg-white p-3 rounded-xl text-[#F16F20] shadow-sm">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
               <h4 class="font-bold text-slate-800">Emotional Well-being</h4>
               <p class="text-xs text-slate-500 mt-1">No significant deterioration in emotional functioning scores vs. baseline.</p>
            </div>
         </div>

         <!-- Card 2 -->
         <div class="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 shadow-sm">
            <div class="bg-white p-3 rounded-xl text-[#F16F20] shadow-sm">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
               <h4 class="font-bold text-slate-800">Physical Function</h4>
               <p class="text-xs text-slate-500 mt-1">Maintained ability to perform daily activities and work.</p>
            </div>
         </div>

      </div>

      <!-- Quote Section -->
      <div class="relative bg-slate-900 text-white p-8 rounded-3xl text-center mb-8">
         <div class="text-6xl text-[#F16F20] opacity-30 absolute top-4 left-4 font-serif">"</div>
         <p class="relative z-10 text-lg font-medium leading-relaxed italic">
            "The ability to maintain my daily routine while on treatment made all the difference in my journey."
         </p>
         <div class="mt-6 flex items-center justify-center gap-3">
            <div class="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold">PT</div>
            <div class="text-left">
               <div class="text-xs font-bold text-[#F16F20]">Trial Participant</div>
               <div class="text-[10px] text-slate-400">MONALEESA-2 Study</div>
            </div>
         </div>
      </div>

      <!-- Pain Score Graph Placeholder (CSS Only) -->
      <div class="border border-slate-200 rounded-2xl p-6">
         <h4 class="text-sm font-bold text-center mb-6 uppercase tracking-widest text-slate-500">Pain Score Trajectory</h4>
         <div class="h-40 flex items-end justify-between gap-2 px-4 relative">
            <!-- Grid lines -->
            <div class="absolute inset-0 flex flex-col justify-between px-4 pointer-events-none">
               <div class="w-full h-px bg-slate-100"></div>
               <div class="w-full h-px bg-slate-100"></div>
               <div class="w-full h-px bg-slate-100"></div>
            </div>
            
            <!-- Points -->
            <div class="w-8 h-[80%] bg-[#F16F20] rounded-t-md opacity-20"></div>
            <div class="w-8 h-[75%] bg-[#F16F20] rounded-t-md opacity-40"></div>
            <div class="w-8 h-[60%] bg-[#F16F20] rounded-t-md opacity-60"></div>
            <div class="w-8 h-[45%] bg-[#F16F20] rounded-t-md opacity-80"></div>
            <div class="w-8 h-[30%] bg-[#F16F20] rounded-t-md shadow-lg relative group">
               <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Week 24</div>
            </div>
         </div>
         <div class="text-center mt-4 text-xs text-slate-500">Pain reduction sustained over 24 weeks</div>
      </div>

   </div>
</div>
    `
  },
  {
    id: 'pharma-moa-explainer',
    name: 'Mechanism of Action',
    category: 'Scientific',
    description: 'Educational layout explaining how the drug works. Uses step-by-step flows and diagrammatic CSS shapes.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-800 pb-12">
  <!-- Header -->
  <div class="bg-[#F16F20] p-8 rounded-b-[40px] shadow-xl mb-8">
     <h1 class="text-3xl font-black text-white text-center">MECHANISM<br/>OF ACTION</h1>
     <div class="w-16 h-2 bg-white/30 mx-auto mt-4 rounded-full"></div>
  </div>

  <!-- Intro Text -->
  <div class="px-8 text-center mb-10">
     <p class="text-lg font-medium text-slate-700">Targeting the cell cycle to arrest tumor growth.</p>
  </div>

  <!-- Step 1 -->
  <div class="px-4 mb-4">
     <div class="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#F16F20] relative overflow-hidden">
        <div class="absolute top-0 right-0 opacity-5 text-9xl font-black text-slate-900 -mr-4 -mt-4">1</div>
        <h3 class="text-[#F16F20] font-bold text-lg mb-2">CDK4/6 Overactivation</h3>
        <p class="text-sm text-slate-600">In HR+ breast cancer, cyclin D1 binds to CDK4/6, promoting excessive cell division and tumor growth.</p>
     </div>
  </div>

  <!-- Arrow Down -->
  <div class="flex justify-center mb-4">
     <svg class="w-6 h-6 text-slate-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
  </div>

  <!-- Step 2 -->
  <div class="px-4 mb-4">
     <div class="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#F16F20] relative overflow-hidden">
        <div class="absolute top-0 right-0 opacity-5 text-9xl font-black text-slate-900 -mr-4 -mt-4">2</div>
        <h3 class="text-[#F16F20] font-bold text-lg mb-2">Selective Inhibition</h3>
        <p class="text-sm text-slate-600">The drug selectively binds to CDK4/6, preventing the phosphorylation of Rb protein.</p>
        
        <!-- Diagram representation CSS -->
        <div class="mt-4 h-16 bg-slate-100 rounded-lg flex items-center justify-center gap-2">
           <div class="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white text-[10px]">CDK4</div>
           <div class="text-[#F16F20] font-bold text-xl">×</div>
           <div class="w-10 h-10 rounded-lg bg-[#F16F20] text-white flex items-center justify-center text-[8px] font-bold shadow-lg">DRUG</div>
        </div>
     </div>
  </div>

  <!-- Arrow Down -->
  <div class="flex justify-center mb-4">
     <svg class="w-6 h-6 text-slate-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
  </div>

  <!-- Step 3 -->
  <div class="px-4 mb-8">
     <div class="bg-gradient-to-br from-[#F16F20] to-orange-600 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 opacity-10 text-9xl font-black text-white -mr-4 -mt-4">3</div>
        <h3 class="font-bold text-lg mb-2">G1 Phase Arrest</h3>
        <p class="text-sm opacity-90">Cell cycle is arrested in the G1 phase, leading to senescence or apoptosis of the tumor cells.</p>
     </div>
  </div>

  <!-- Did you know -->
  <div class="mx-4 bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 items-center">
     <div class="bg-blue-100 p-2 rounded-full text-blue-600">
       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
     </div>
     <div class="text-xs text-blue-800">
        <span class="font-bold">Synergistic Effect:</span> When combined with endocrine therapy, the dual blockade is more effective than either alone.
     </div>
  </div>

</div>
    `
  },
  {
    id: 'pharma-patient-support',
    name: 'Patient Support Enrollment',
    category: 'Patient Services',
    description: 'A compassionate, easy-to-navigate enrollment form for patient assistance programs. Features a multi-step process indicator.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-white min-h-screen font-sans text-slate-800">
  <!-- Reassuring Header -->
  <div class="bg-[#F16F20] text-white p-8 pb-16 rounded-b-[3rem] relative shadow-lg">
    <div class="flex justify-between items-start">
       <h1 class="text-2xl font-bold">Patient Assistance<br/>Enrollment</h1>
       <div class="bg-white/20 p-2 rounded-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
       </div>
    </div>
    <p class="text-orange-100 mt-2 text-sm max-w-md">We are dedicated to helping eligible patients access their medication. Please complete the steps below.</p>
  </div>

  <!-- Stepper Card -->
  <div class="px-4 -mt-10 relative z-10">
     <div class="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
        <div class="flex justify-between items-center relative">
           <!-- Line -->
           <div class="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
           
           <!-- Step 1 -->
           <div class="flex flex-col items-center gap-1 bg-white px-2">
              <div class="w-8 h-8 rounded-full bg-[#F16F20] text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
              <span class="text-[10px] font-bold text-[#F16F20]">Eligibility</span>
           </div>
           
           <!-- Step 2 -->
           <div class="flex flex-col items-center gap-1 bg-white px-2">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">2</div>
              <span class="text-[10px] font-medium text-slate-400">Patient</span>
           </div>
           
           <!-- Step 3 -->
           <div class="flex flex-col items-center gap-1 bg-white px-2">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">3</div>
              <span class="text-[10px] font-medium text-slate-400">Review</span>
           </div>
        </div>
     </div>
  </div>

  <!-- Form Section -->
  <div class="p-6">
     <h2 class="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-[#F16F20] rounded-full"></span>
        Check Eligibility
     </h2>
     
     <div class="space-y-6">
        <!-- Question 1 -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
           <label class="block text-sm font-medium text-slate-700 mb-3">Is the patient a resident of the United States or its territories?</label>
           <div class="flex gap-4">
              <button class="flex-1 py-2 px-4 rounded-lg bg-white border border-[#F16F20] text-[#F16F20] font-bold shadow-sm hover:bg-orange-50">Yes</button>
              <button class="flex-1 py-2 px-4 rounded-lg bg-white border border-slate-200 text-slate-500 font-medium hover:bg-slate-50">No</button>
           </div>
        </div>

        <!-- Question 2 -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
           <label class="block text-sm font-medium text-slate-700 mb-3">Does the patient have private or commercial prescription insurance?</label>
           <div class="flex gap-4">
              <button class="flex-1 py-2 px-4 rounded-lg bg-white border border-slate-200 text-slate-500 font-medium hover:bg-slate-50">Yes</button>
              <button class="flex-1 py-2 px-4 rounded-lg bg-white border border-slate-200 text-slate-500 font-medium hover:bg-slate-50">No</button>
           </div>
        </div>
     </div>

     <!-- Footer Action -->
     <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs text-slate-400">Step 1 of 3</span>
        <button class="bg-[#F16F20] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 flex items-center gap-2 hover:bg-[#d95e16] transition-colors">
           Next Step
           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
     </div>
  </div>

  <!-- Help Callout -->
  <div class="mx-6 mb-8 bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
     <div class="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
     </div>
     <div>
        <h4 class="text-sm font-bold text-blue-800">Need assistance?</h4>
        <p class="text-xs text-blue-600 mt-1">Call 1-800-NOVARTIS (1-800-668-2784) M-F, 8AM - 8PM ET.</p>
     </div>
  </div>
</div>
    `
  },
  {
    id: 'pharma-kol-profile',
    name: 'KOL Speaker Profile',
    category: 'Medical Affairs',
    description: 'Professional bio layout for Key Opinion Leaders, highlighting expertise, publications, and speaking engagements.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-800">
  <!-- Profile Header -->
  <div class="bg-white p-8 pb-12 shadow-sm">
     <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-200 border-4 border-white shadow-xl overflow-hidden shrink-0 relative">
           <div class="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
           </div>
        </div>
        <div class="text-center md:text-left">
           <h1 class="text-2xl font-black text-slate-900 mb-1">Dr. Elena Rodriguez, PhD</h1>
           <p class="text-[#F16F20] font-bold text-sm uppercase tracking-wide mb-3">Oncology Specialist</p>
           <p class="text-slate-500 text-sm leading-relaxed max-w-md">Director of Breast Cancer Research at Metropolitan Hospital. Leading authority on CDK4/6 inhibitors and resistance mechanisms.</p>
        </div>
     </div>
  </div>

  <!-- Stats Strip -->
  <div class="bg-slate-900 text-white py-4 px-6 flex justify-around items-center text-center shadow-inner relative z-10">
     <div>
        <div class="text-xl font-bold text-[#F16F20]">45+</div>
        <div class="text-[10px] uppercase text-slate-400">Publications</div>
     </div>
     <div class="w-px h-8 bg-slate-700"></div>
     <div>
        <div class="text-xl font-bold text-[#F16F20]">12</div>
        <div class="text-[10px] uppercase text-slate-400">Clinical Trials</div>
     </div>
     <div class="w-px h-8 bg-slate-700"></div>
     <div>
        <div class="text-xl font-bold text-[#F16F20]">Global</div>
        <div class="text-[10px] uppercase text-slate-400">Speaker</div>
     </div>
  </div>

  <!-- Main Content -->
  <div class="p-6 space-y-8">
     
     <!-- Areas of Expertise -->
     <section>
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Focus Areas</h3>
        <div class="flex flex-wrap gap-2">
           <span class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">HR+ Breast Cancer</span>
           <span class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">Immunotherapy</span>
           <span class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">Translational Medicine</span>
           <span class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">Patient Advocacy</span>
        </div>
     </section>

     <!-- Selected Publications -->
     <section>
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Key Publications</h3>
        <div class="space-y-4">
           <!-- Pub 1 -->
           <div class="bg-white p-4 rounded-xl border-l-4 border-[#F16F20] shadow-sm">
              <h4 class="font-bold text-slate-800 text-sm mb-1 line-clamp-2">"Efficacy of Ribociclib in Advanced Breast Cancer: A 5-Year Follow-up"</h4>
              <p class="text-xs text-slate-500 italic">New England Journal of Medicine, 2024</p>
           </div>
           <!-- Pub 2 -->
           <div class="bg-white p-4 rounded-xl border-l-4 border-slate-300 shadow-sm">
              <h4 class="font-bold text-slate-800 text-sm mb-1 line-clamp-2">"Resistance Mechanisms in CDK4/6 Inhibitor Therapy"</h4>
              <p class="text-xs text-slate-500 italic">Lancet Oncology, 2023</p>
           </div>
        </div>
     </section>

     <!-- Upcoming Engagements -->
     <section>
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Upcoming Speaking</h3>
        <div class="bg-orange-50 rounded-xl p-4 border border-orange-100 flex gap-4 items-center">
           <div class="bg-white p-2 rounded-lg text-center min-w-[60px] shadow-sm border border-orange-100">
              <span class="block text-xs font-bold text-slate-400 uppercase">JUN</span>
              <span class="block text-xl font-black text-[#F16F20]">04</span>
           </div>
           <div>
              <h4 class="font-bold text-slate-800 text-sm">ASCO Annual Meeting</h4>
              <p class="text-xs text-slate-600">Chicago, IL • Oral Presentation</p>
           </div>
        </div>
     </section>

  </div>
</div>
    `
  },
  {
    id: 'pharma-interaction-checker',
    name: 'Drug Interaction Matrix',
    category: 'Clinical Practice',
    description: 'Visual reference tool for checking potential drug-drug interactions with color-coded severity levels.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-slate-900 min-h-screen font-sans text-white pb-12">
   <!-- Header -->
   <div class="p-8 border-b border-slate-800">
      <div class="flex items-center gap-2 text-[#F16F20] mb-2">
         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
         <span class="text-xs font-bold uppercase tracking-widest">Safety Tool</span>
      </div>
      <h1 class="text-3xl font-bold">Interaction Checker</h1>
      <p class="text-slate-400 text-sm mt-2">Ribociclib co-administration safety profile.</p>
   </div>

   <!-- Search Simulation -->
   <div class="px-8 py-6 bg-slate-800 border-b border-slate-700">
      <div class="relative">
         <input type="text" value="Clarithromycin" readonly class="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-10 text-white focus:outline-none focus:border-[#F16F20] transition-colors" />
         <svg class="w-5 h-5 text-slate-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
   </div>

   <!-- Results Area -->
   <div class="p-8 space-y-6">
      
      <!-- Interaction Card: High Risk -->
      <div class="bg-red-500/10 border border-red-500/50 rounded-xl overflow-hidden">
         <div class="bg-red-500/20 px-4 py-2 flex justify-between items-center border-b border-red-500/30">
            <span class="text-red-400 font-bold text-xs uppercase tracking-wider">Strong CYP3A4 Inhibitor</span>
            <div class="flex items-center gap-1 text-red-400">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
               <span class="text-xs font-bold">Avoid Concomitant Use</span>
            </div>
         </div>
         <div class="p-5">
            <div class="flex justify-between items-center mb-4">
               <div>
                  <h3 class="text-xl font-bold text-white">Clarithromycin</h3>
                  <p class="text-sm text-slate-400">Macrolide Antibiotic</p>
               </div>
               <div class="text-2xl font-black text-red-500">X</div>
            </div>
            <p class="text-sm text-slate-300 leading-relaxed">
               Concomitant use may significantly increase ribociclib plasma concentrations, increasing the risk of toxicity (e.g., QTc prolongation).
            </p>
            <div class="mt-4 pt-4 border-t border-red-500/20">
               <span class="text-xs text-red-300 font-bold">Recommendation:</span>
               <span class="text-xs text-slate-400 ml-1">Consider alternative antibiotic with less CYP3A4 inhibition potential (e.g., Azithromycin).</span>
            </div>
         </div>
      </div>

      <!-- Interaction Card: Moderate -->
      <div class="bg-yellow-500/10 border border-yellow-500/50 rounded-xl overflow-hidden">
         <div class="bg-yellow-500/20 px-4 py-2 flex justify-between items-center border-b border-yellow-500/30">
            <span class="text-yellow-400 font-bold text-xs uppercase tracking-wider">Moderate CYP3A4 Inhibitor</span>
            <div class="flex items-center gap-1 text-yellow-400">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <span class="text-xs font-bold">Monitor Closely</span>
            </div>
         </div>
         <div class="p-5">
            <h3 class="text-xl font-bold text-white mb-2">Erythromycin</h3>
            <p class="text-sm text-slate-300 leading-relaxed">
               May increase ribociclib exposure. If co-administration cannot be avoided, reduce ribociclib dose to 200 mg.
            </p>
         </div>
      </div>

   </div>
</div>
    `
  },
  {
    id: 'pharma-market-access',
    name: 'Formulary Coverage Dashboard',
    category: 'Market Access',
    description: 'Dashboard view showing insurance coverage status across plan types with visual percentage indicators.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-800">
   <!-- Header -->
   <div class="bg-white p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 z-20">
      <div>
         <h1 class="text-lg font-bold text-slate-900">National Coverage</h1>
         <p class="text-xs text-slate-500">Commercial & Medicare Part D</p>
      </div>
      <div class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
         <span class="w-2 h-2 bg-green-500 rounded-full"></span>
         95% Access
      </div>
   </div>

   <!-- Donut Chart Section -->
   <div class="p-6 grid grid-cols-2 gap-4">
      <!-- Chart 1 -->
      <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
         <h3 class="text-xs font-bold text-slate-500 uppercase mb-3">Commercial Lives</h3>
         <div class="w-32 h-32 mx-auto rounded-full border-8 border-slate-100 relative flex items-center justify-center">
            <!-- CSS Conic Gradient for Donut -->
            <div class="absolute inset-0 rounded-full" style="background: conic-gradient(#F16F20 0% 92%, #e2e8f0 92% 100%); mask-image: radial-gradient(transparent 60%, black 61%); -webkit-mask-image: radial-gradient(transparent 60%, black 61%);"></div>
            <div class="text-2xl font-black text-slate-800">92%</div>
         </div>
         <div class="mt-3 flex justify-center gap-3 text-[10px]">
            <div class="flex items-center gap-1"><div class="w-2 h-2 bg-[#F16F20] rounded-full"></div>Covered</div>
         </div>
      </div>

      <!-- Chart 2 -->
      <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
         <h3 class="text-xs font-bold text-slate-500 uppercase mb-3">Medicare Part D</h3>
         <div class="w-32 h-32 mx-auto rounded-full border-8 border-slate-100 relative flex items-center justify-center">
            <!-- CSS Conic Gradient for Donut -->
            <div class="absolute inset-0 rounded-full" style="background: conic-gradient(#F16F20 0% 98%, #e2e8f0 98% 100%); mask-image: radial-gradient(transparent 60%, black 61%); -webkit-mask-image: radial-gradient(transparent 60%, black 61%);"></div>
            <div class="text-2xl font-black text-slate-800">98%</div>
         </div>
         <div class="mt-3 flex justify-center gap-3 text-[10px]">
            <div class="flex items-center gap-1"><div class="w-2 h-2 bg-[#F16F20] rounded-full"></div>Covered</div>
         </div>
      </div>
   </div>

   <!-- Payer List -->
   <div class="px-6 pb-8">
      <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Top Payer Status</h3>
      <div class="space-y-3">
         
         <!-- Payer 1 -->
         <div class="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center text-white font-bold text-xs">UHG</div>
               <div>
                  <div class="font-bold text-sm text-slate-800">UnitedHealthcare</div>
                  <div class="text-[10px] text-slate-500">Commercial</div>
               </div>
            </div>
            <span class="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100">Tier 2 - Preferred</span>
         </div>

         <!-- Payer 2 -->
         <div class="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">CVS</div>
               <div>
                  <div class="font-bold text-sm text-slate-800">CVS Caremark</div>
                  <div class="text-[10px] text-slate-500">Commercial</div>
               </div>
            </div>
            <span class="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100">Tier 2 - Preferred</span>
         </div>

         <!-- Payer 3 -->
         <div class="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 bg-sky-500 rounded-md flex items-center justify-center text-white font-bold text-xs">ESI</div>
               <div>
                  <div class="font-bold text-sm text-slate-800">Express Scripts</div>
                  <div class="text-[10px] text-slate-500">National Formulary</div>
               </div>
            </div>
            <span class="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-bold border border-yellow-100">Tier 3 - PA Reqd</span>
         </div>

      </div>
   </div>
   
   <div class="px-6 text-center pb-8">
      <p class="text-[10px] text-slate-400">Data as of Oct 2025. Coverage varies by individual plan.</p>
   </div>
</div>
    `
  },
  {
    id: 'pharma-trial-recruitment',
    name: 'Trial Recruitment Landing',
    category: 'Clinical Operations',
    description: 'Patient-facing landing page for clinical trial recruitment with eligibility criteria and simple CTA.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-white min-h-screen font-sans text-slate-800">
   <!-- Hero -->
   <div class="relative h-64 overflow-hidden rounded-b-[40px]">
      <div class="absolute inset-0 bg-slate-900"></div>
      <div class="absolute inset-0 bg-gradient-to-tr from-[#F16F20] to-transparent opacity-80"></div>
      <div class="absolute bottom-0 left-0 p-8 w-full z-10">
         <span class="bg-white/20 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Investigational Study</span>
         <h1 class="text-3xl font-black text-white leading-tight">Help Advance<br/>Breast Cancer Research</h1>
      </div>
   </div>

   <!-- Intro -->
   <div class="p-8 text-center">
      <p class="text-lg font-medium text-slate-700">We are looking for volunteers to participate in the <span class="text-[#F16F20] font-bold">LUMINA-1</span> clinical trial.</p>
   </div>

   <!-- Eligibility Cards -->
   <div class="px-6 space-y-4">
      <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Who can participate?</h3>
      
      <!-- Inclusion -->
      <div class="bg-green-50 border border-green-100 p-6 rounded-xl">
         <h4 class="text-green-800 font-bold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            You may be eligible if:
         </h4>
         <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm text-slate-700">
               <div class="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
               <span>You are at least 18 years of age.</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-slate-700">
               <div class="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
               <span>You have a confirmed diagnosis of HR+/HER2- breast cancer.</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-slate-700">
               <div class="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
               <span>You have not yet received treatment for metastatic disease.</span>
            </li>
         </ul>
      </div>

      <!-- Exclusion -->
      <div class="bg-red-50 border border-red-100 p-6 rounded-xl">
         <h4 class="text-red-800 font-bold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            You are NOT eligible if:
         </h4>
         <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm text-slate-700">
               <div class="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
               <span>You are currently pregnant or breastfeeding.</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-slate-700">
               <div class="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
               <span>You have a history of serious cardiac disease.</span>
            </li>
         </ul>
      </div>
   </div>

   <!-- CTA -->
   <div class="p-8 pb-12">
      <button class="w-full bg-[#F16F20] hover:bg-[#d95e16] text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
         <span>See if You Qualify</span>
         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </button>
      <p class="text-xs text-slate-400 text-center mt-4">Participation is voluntary. You can withdraw at any time.</p>
   </div>
</div>
    `
  },
  {
    id: 'pharma-education-module',
    name: 'CME Educational Module',
    category: 'Education',
    description: 'Interactive learning layout for HCPs with progress tracking and key learning points.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-800">
   <!-- Progress Header -->
   <div class="bg-white p-4 shadow-sm border-b border-slate-200 sticky top-0 z-20">
      <div class="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
         <span>Course Progress</span>
         <span>25% Complete</span>
      </div>
      <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
         <div class="h-full bg-[#F16F20] w-1/4 rounded-full"></div>
      </div>
   </div>

   <!-- Content Area -->
   <div class="p-6 md:p-8">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
         <!-- Video Placeholder -->
         <div class="aspect-video bg-slate-900 flex items-center justify-center relative group cursor-pointer">
            <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
               <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-sm">Module 1: Mechanism of Action</div>
         </div>
         <div class="p-6">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Understanding CDK4/6 Inhibition</h2>
            <p class="text-slate-600 leading-relaxed mb-4">
               Cyclin-dependent kinases 4 and 6 (CDK4/6) are key regulators of the cell cycle. In hormone receptor-positive breast cancer, these kinases are often overactive, driving uncontrolled cell proliferation.
            </p>
            <div class="bg-orange-50 border-l-4 border-[#F16F20] p-4 my-6">
               <h4 class="font-bold text-[#F16F20] text-sm mb-1">Key Takeaway</h4>
               <p class="text-sm text-slate-700">Dual inhibition of CDK4/6 and ER signaling provides a synergistic effect, inducing G1 cell cycle arrest.</p>
            </div>
         </div>
      </div>

      <!-- Quiz Section -->
      <div class="bg-slate-900 rounded-2xl p-6 text-white">
         <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#F16F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Knowledge Check
         </h3>
         <p class="text-sm text-slate-300 mb-6">Which phase of the cell cycle is arrested by CDK4/6 inhibitors?</p>
         
         <div class="space-y-3">
            <button class="w-full text-left p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors flex justify-between items-center group">
               <span class="text-sm font-medium">S Phase</span>
               <div class="w-4 h-4 rounded-full border border-slate-500 group-hover:border-[#F16F20]"></div>
            </button>
            <button class="w-full text-left p-4 rounded-xl border border-[#F16F20] bg-[#F16F20]/10 flex justify-between items-center">
               <span class="text-sm font-bold text-[#F16F20]">G1 Phase</span>
               <div class="w-4 h-4 rounded-full border-4 border-[#F16F20]"></div>
            </button>
            <button class="w-full text-left p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors flex justify-between items-center group">
               <span class="text-sm font-medium">M Phase</span>
               <div class="w-4 h-4 rounded-full border border-slate-500 group-hover:border-[#F16F20]"></div>
            </button>
         </div>
         
         <div class="mt-6 text-right">
             <button class="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-200">Continue</button>
         </div>
      </div>
   </div>
</div>
    `
  },
  {
    id: 'pharma-event-calendar',
    name: 'Medical Congress Calendar',
    category: 'Medical Affairs',
    description: 'Schedule view for upcoming medical congresses, symposia, and webinars.',
    htmlContent: `
<div class="w-full max-w-3xl mx-auto bg-white min-h-screen font-sans text-slate-800">
   <!-- Header -->
   <div class="bg-[#F16F20] text-white p-8 pb-12 rounded-b-3xl mb-8">
      <h1 class="text-2xl font-bold">Medical Congress<br/>Calendar 2025</h1>
      <div class="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
         <button class="px-4 py-1 bg-white/20 rounded-full text-xs font-bold whitespace-nowrap">All Events</button>
         <button class="px-4 py-1 bg-white text-[#F16F20] rounded-full text-xs font-bold whitespace-nowrap">Oncology</button>
         <button class="px-4 py-1 bg-white/20 rounded-full text-xs font-bold whitespace-nowrap">Cardiology</button>
      </div>
   </div>

   <!-- Event List -->
   <div class="px-6 space-y-6 pb-12">
      
      <!-- Event 1 -->
      <div class="flex gap-4 items-start">
         <div class="flex flex-col items-center min-w-[50px]">
            <span class="text-xs font-bold text-slate-400 uppercase">JUN</span>
            <span class="text-2xl font-black text-slate-800">02</span>
         </div>
         <div class="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-lg shadow-slate-100 relative overflow-hidden group hover:border-[#F16F20] transition-colors cursor-pointer">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#F16F20]"></div>
            <div class="flex justify-between items-start mb-2">
               <span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Congress</span>
               <svg class="w-4 h-4 text-slate-300 group-hover:text-[#F16F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            <h3 class="font-bold text-slate-900 mb-1">ASCO Annual Meeting</h3>
            <p class="text-xs text-slate-500 mb-3">McCormick Place, Chicago, IL</p>
            <div class="flex -space-x-2">
               <div class="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
               <div class="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
               <div class="w-6 h-6 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">+3</div>
            </div>
         </div>
      </div>

      <!-- Event 2 -->
      <div class="flex gap-4 items-start">
         <div class="flex flex-col items-center min-w-[50px]">
            <span class="text-xs font-bold text-slate-400 uppercase">SEP</span>
            <span class="text-2xl font-black text-slate-800">12</span>
         </div>
         <div class="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-lg shadow-slate-100 relative overflow-hidden group hover:border-[#F16F20] transition-colors cursor-pointer">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-300"></div>
            <div class="flex justify-between items-start mb-2">
               <span class="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Symposium</span>
            </div>
            <h3 class="font-bold text-slate-900 mb-1">ESMO Congress 2025</h3>
            <p class="text-xs text-slate-500 mb-3">Madrid, Spain</p>
         </div>
      </div>

      <!-- Event 3 -->
      <div class="flex gap-4 items-start">
         <div class="flex flex-col items-center min-w-[50px]">
            <span class="text-xs font-bold text-slate-400 uppercase">OCT</span>
            <span class="text-2xl font-black text-slate-800">24</span>
         </div>
         <div class="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-lg shadow-slate-100 relative overflow-hidden group hover:border-[#F16F20] transition-colors cursor-pointer">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
            <div class="flex justify-between items-start mb-2">
               <span class="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Webinar</span>
            </div>
            <h3 class="font-bold text-slate-900 mb-1">Updates in HR+ BC Management</h3>
            <p class="text-xs text-slate-500 mb-3">Virtual • 12:00 PM EST</p>
            <button class="text-xs font-bold text-[#F16F20]">Add to Calendar</button>
         </div>
      </div>

   </div>
</div>
    `
  }
];
