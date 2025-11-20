
import { Template } from './types';

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'landing-1',
    name: 'Modern SaaS Landing',
    category: 'Marketing',
    description: 'A clean, dark-themed landing page for software products with hero section, features, and CTA.',
    htmlContent: '<div class="min-h-screen bg-slate-900 text-white font-sans"><header class="container mx-auto px-6 py-8 flex justify-between items-center"><div class="text-2xl font-bold text-indigo-500">SaaSify</div><nav class="hidden md:flex space-x-8"><a href="#" class="hover:text-indigo-400">Features</a><a href="#" class="hover:text-indigo-400">Pricing</a></nav></header><main class="container mx-auto px-6 py-20 text-center"><h1 class="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">Build faster with <span class="text-indigo-500">Intelligence</span></h1><p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">The ultimate platform for modern developers.</p><button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">Get Started</button></main></div>'
  },
  {
    id: 'report-1',
    name: 'Executive Summary',
    category: 'Business',
    description: 'Formal layout for presenting data, key insights, and recommendations with clear typography.',
    htmlContent: '<div class="max-w-4xl mx-auto bg-white min-h-screen p-12 text-slate-800"><header class="border-b border-slate-200 pb-6 mb-8"><h1 class="text-3xl font-serif font-bold text-slate-900">Q4 Executive Summary</h1><p class="text-slate-500 mt-2">Fiscal Year 2024 • Confidential</p></header><div class="grid grid-cols-2 gap-8 mb-12"><div class="bg-slate-50 p-6 rounded-lg"><h3 class="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Total Revenue</h3><p class="text-4xl font-bold text-emerald-600">$4.2M</p></div><div class="bg-slate-50 p-6 rounded-lg"><h3 class="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Growth (YoY)</h3><p class="text-4xl font-bold text-blue-600">+12.5%</p></div></div><article class="prose prose-slate max-w-none"><h3>Key Insights</h3><p>Performance exceeded expectations in the enterprise segment...</p></article></div>'
  },
  {
    id: 'event-1',
    name: 'Event Invitation',
    category: 'Social',
    description: 'Vibrant and energetic design for event details, schedule, and registration.',
    htmlContent: '<div class="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 opacity-50"></div><div class="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl text-center"><span class="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full mb-6">UPCOMING</span><h1 class="text-4xl font-black mb-2 tracking-tighter">NEON NIGHTS</h1><p class="text-pink-200 mb-8">Music • Art • Technology</p><div class="bg-black/30 rounded-xl p-4 mb-8"><p class="font-mono text-sm">NOV 24 • 8:00 PM</p><p class="font-mono text-sm opacity-75">Cyber Loft, Downtown</p></div><button class="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-pink-100 transition-colors">RSVP NOW</button></div></div>'
  }
];
