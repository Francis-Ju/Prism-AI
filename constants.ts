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
  }
];