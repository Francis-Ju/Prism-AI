import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Code, Trash2, Layout, Edit2, Check, Upload } from 'lucide-react';
import { Template } from '../types';

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const DEFAULT_TEMPLATES: Template[] = [
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

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('prism_templates');
    if (stored) {
      setTemplates(JSON.parse(stored));
    } else {
      setTemplates(DEFAULT_TEMPLATES);
      localStorage.setItem('prism_templates', JSON.stringify(DEFAULT_TEMPLATES));
    }
  }, []);

  const handleSave = (updatedTemplates: Template[]) => {
    setTemplates(updatedTemplates);
    localStorage.setItem('prism_templates', JSON.stringify(updatedTemplates));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this template?')) {
      const updated = templates.filter(t => t.id !== id);
      handleSave(updated);
    }
  };

  const handleAddNew = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: 'New Template',
      category: 'Custom',
      description: 'Empty template ready for your code.',
      htmlContent: '<div class="flex items-center justify-center h-screen bg-gray-100 text-gray-400">Start designing...</div>'
    };
    handleSave([...templates, newTemplate]);
    setEditingId(newTemplate.id);
    setEditName(newTemplate.name);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const newTemplate: Template = {
        id: Date.now().toString(),
        name: file.name.replace('.html', ''),
        category: 'Imported',
        description: 'Imported from HTML file',
        htmlContent: content
      };
      handleSave([...templates, newTemplate]);
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (e: React.MouseEvent, t: Template) => {
    e.stopPropagation();
    setEditingId(t.id);
    setEditName(t.name);
  };

  const saveEdit = (e: React.MouseEvent) => {
     e.stopPropagation();
     const updated = templates.map(t => t.id === editingId ? { ...t, name: editName } : t);
     handleSave(updated);
     setEditingId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-dark-700 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="p-6 border-b border-dark-800 flex items-center justify-between bg-dark-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/20 rounded-lg">
              <Layout className="text-brand-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Template Library</h2>
              <p className="text-sm text-gray-400">Manage and select starting points for your artifacts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".html" 
              className="hidden" 
            />
            <button 
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg border border-dark-700 transition-colors text-sm font-medium"
            >
              <Upload size={16} />
              Import HTML
            </button>
            <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-full text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-dots-pattern">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Add New Card */}
              <button 
                onClick={handleAddNew}
                className="min-h-[280px] border-2 border-dashed border-dark-700 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-brand-400 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all group"
              >
                <Plus size={40} className="mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-lg">Create New Template</span>
              </button>

              {templates.map(template => (
                <div 
                  key={template.id} 
                  onClick={() => { onSelectTemplate(template); onClose(); }}
                  className="group relative flex flex-col bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:ring-2 hover:ring-brand-500/50 transition-all cursor-pointer shadow-lg hover:shadow-xl shadow-black/20 h-[300px]"
                >
                  {/* Preview Window */}
                  <div className="h-40 bg-white relative w-full overflow-hidden border-b border-dark-700">
                    <div className="absolute inset-0 w-[400%] h-[400%] origin-top-left transform scale-[0.25] pointer-events-none">
                       {/* Safe render of layout preview */}
                       <iframe 
                         srcDoc={`<html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="overflow-hidden">${template.htmlContent}</body></html>`}
                         className="w-full h-full border-none"
                         tabIndex={-1}
                         title="preview"
                       />
                    </div>
                    {/* Overlay to prevent interaction with iframe and indicate selection */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-brand-500/10 transition-colors" />
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 p-4 flex flex-col">
                     <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-2 py-1 bg-dark-700 rounded text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          {template.category}
                        </span>
                        
                        {/* Actions overlay on hover */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                              onClick={(e) => startEdit(e, template)}
                              className="p-1.5 hover:bg-dark-600 rounded text-gray-400 hover:text-white"
                              title="Rename"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              onClick={(e) => handleDelete(e, template.id)}
                              className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                        </div>
                     </div>

                     {editingId === template.id ? (
                        <div className="flex items-center gap-2 mb-2" onClick={e => e.stopPropagation()}>
                          <input 
                            value={editName} 
                            onChange={e => setEditName(e.target.value)}
                            className="bg-dark-950 border border-brand-500 rounded px-2 py-1 text-sm text-white w-full focus:outline-none"
                            autoFocus
                          />
                          <button onClick={saveEdit} className="p-1 bg-brand-600 rounded text-white"><Check size={14}/></button>
                        </div>
                      ) : (
                        <h3 className="font-bold text-lg text-white truncate mb-1">{template.name}</h3>
                      )}
                     
                     <p className="text-xs text-gray-400 line-clamp-2">{template.description}</p>
                     
                     <div className="mt-auto pt-3 flex items-center text-[10px] text-gray-600 font-mono">
                        <Code size={10} className="mr-1.5" />
                        {template.htmlContent.length} chars
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;