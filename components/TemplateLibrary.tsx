
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Code, Trash2, Layout, Edit2, Check, Upload, Save, ArrowLeft, AlertCircle, ChevronLeft, ChevronRight, Search, Sidebar, Filter, FileText } from 'lucide-react';
import { Template } from '../types';
import { DEFAULT_TEMPLATES } from '../constants';
import { storage } from '../services/storage';

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editing State
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  
  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Code Editor State
  const [editorTemplate, setEditorTemplate] = useState<Template | null>(null);
  const [editorCode, setEditorCode] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadTemplates = async () => {
        try {
            const stored = await storage.get<Template[]>('prism_templates');
            // Merge defaults if needed or just use parsed. 
            setTemplates(stored && stored.length > 0 ? stored : DEFAULT_TEMPLATES);
        } catch (e) {
            setTemplates(DEFAULT_TEMPLATES);
        }
    };
    loadTemplates();
  }, []);

  const handleSaveTemplates = async (updatedTemplates: Template[]) => {
    setTemplates(updatedTemplates);
    await storage.set('prism_templates', updatedTemplates);
  };

  // Get Categories
  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

  // Filter Logic
  const filteredTemplates = templates.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- Delete Logic ---
  
  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEditingNameId(null); 
    setDeletingId(id);      
  };

  const handleConfirmDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = templates.filter(t => t.id !== id);
    handleSaveTemplates(updated);
    setDeletingId(null);
    
    if (editorTemplate?.id === id) {
      setEditorTemplate(null);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(null);
  };

  // --------------------

  const handleAddNew = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: 'New Custom Template',
      category: 'Custom',
      description: 'Start from scratch with this blank canvas.',
      htmlContent: '<div class="flex items-center justify-center h-screen bg-white text-slate-800">\n  <div class="text-center">\n    <h1 class="text-4xl font-bold mb-4">Hello World</h1>\n    <p class="text-gray-600">Start editing this template...</p>\n  </div>\n</div>'
    };
    handleSaveTemplates([...templates, newTemplate]);
    handleEnterEditMode(newTemplate);
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
      
      let cleanContent = content;
      const bodyRegex = /<body[^>]*>([\s\S]*)<\/body>/i;
      const match = bodyRegex.exec(content);
      if (match && match[1]) {
        cleanContent = match[1].trim();
      }

      const newTemplate: Template = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, "").split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: 'Imported',
        description: `Imported from ${file.name}`,
        htmlContent: cleanContent
      };
      handleSaveTemplates([...templates, newTemplate]);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startRename = (e: React.MouseEvent, t: Template) => {
    e.stopPropagation();
    setDeletingId(null); 
    setEditingNameId(t.id);
    setEditName(t.name);
  };

  const saveRename = (e: React.MouseEvent) => {
     e.stopPropagation();
     if (editingNameId) {
       const updated = templates.map(t => t.id === editingNameId ? { ...t, name: editName } : t);
       handleSaveTemplates(updated);
       setEditingNameId(null);
     }
  };

  const handleSelect = (e: React.MouseEvent, template: Template) => {
    e.stopPropagation();
    onSelectTemplate(template);
    onClose();
  };

  const handleEnterEditMode = (template: Template) => {
    setEditorTemplate(template);
    setEditorCode(template.htmlContent);
  };

  const handleSaveEditor = () => {
    if (editorTemplate) {
      const updated = templates.map(t => t.id === editorTemplate.id ? { ...t, htmlContent: editorCode } : t);
      handleSaveTemplates(updated);
      setEditorTemplate({ ...editorTemplate, htmlContent: editorCode });
    }
  };

  const handleCloseEditor = () => {
    if (editorCode !== editorTemplate?.htmlContent) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        return;
      }
    }
    setEditorTemplate(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!editorTemplate) return;

    if (editorCode !== editorTemplate.htmlContent) {
      if (!window.confirm('You have unsaved changes. Switching templates will discard them. Continue?')) {
        return;
      }
    }

    const currentIndex = templates.findIndex(t => t.id === editorTemplate.id);
    if (currentIndex === -1) return;

    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = templates.length - 1;
    if (newIndex >= templates.length) newIndex = 0;

    const nextTemplate = templates[newIndex];
    handleEnterEditMode(nextTemplate);
  };

  const getPreviewSrcDoc = (html: string) => {
    const safeHtml = html.replace(/`/g, '\\`');
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                     brand: { 500: '#8b5cf6', 600: '#7c3aed' }
                  }
                }
              }
            }
          </script>
          <style>
            body { 
              background-color: white; 
              min-height: 100vh;
              margin: 0;
              overflow-y: hidden; /* Hide scrollbars in thumbnail */
            }
            /* Scale down content for thumbnail view if needed, but iframe scale usually handles it */
          </style>
        </head>
        <body>${safeHtml}</body>
      </html>
    `;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4 lg:p-8">
      
      {/* Container */}
      <div className="bg-dark-950 border border-dark-700 w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Editor Mode */}
        {editorTemplate ? (
           <div className="flex flex-col h-full animate-fade-in bg-dark-950">
              {/* Editor Header */}
              <div className="h-16 border-b border-dark-800 flex items-center justify-between px-6 bg-dark-900/80 backdrop-blur-md">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={handleCloseEditor}
                      className="p-2 hover:bg-dark-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Back to Library"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    
                    <div className="flex items-center gap-1 bg-dark-800/50 p-1 rounded-lg border border-dark-700">
                        <button onClick={() => handleNavigate('prev')} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded-md transition-colors"><ChevronLeft size={16} /></button>
                        <div className="w-px h-4 bg-dark-700"></div>
                        <button onClick={() => handleNavigate('next')} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded-md transition-colors"><ChevronRight size={16} /></button>
                    </div>

                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-gray-500">Editing</span>
                      <span className="text-brand-400">{editorTemplate.name}</span>
                    </h2>
                 </div>
                 
                 <div className="flex items-center gap-3">
                    <button 
                      onClick={handleSaveEditor}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-brand-900/20"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                 </div>
              </div>

              {/* Editor Split View */}
              <div className="flex-1 flex overflow-hidden">
                <div className="w-1/2 h-full bg-[#1e1e1e] flex flex-col border-r border-dark-800">
                   <div className="bg-dark-900 px-4 py-2 text-xs font-mono text-gray-400 border-b border-dark-800 flex justify-between items-center">
                      <span>HTML Source</span>
                      <span className="text-brand-400 text-[10px] uppercase tracking-wider bg-brand-500/10 px-2 py-0.5 rounded">Tailwind CSS Ready</span>
                   </div>
                   <textarea 
                      value={editorCode}
                      onChange={(e) => setEditorCode(e.target.value)}
                      className="flex-1 w-full h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none leading-relaxed"
                      spellCheck={false}
                   />
                </div>

                <div className="w-1/2 h-full bg-dots-pattern relative">
                   <div className="absolute inset-0 p-8">
                      <div className="w-full h-full bg-white shadow-2xl rounded-lg overflow-hidden ring-1 ring-dark-800 flex flex-col">
                        <iframe 
                          srcDoc={getPreviewSrcDoc(editorCode)}
                          className="flex-1 w-full border-none"
                          title="Live Preview"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                   </div>
                </div>
              </div>
           </div>
        ) : (
          /* Browser Mode */
          <div className="flex h-full">
            
            {/* Sidebar Navigation */}
            <div className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col hidden md:flex">
              <div className="p-6 border-b border-dark-800">
                <div className="flex items-center gap-2 text-white font-bold text-xl">
                   <Layout className="text-brand-400" />
                   <span>Templates</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Select a starting point</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                       selectedCategory === cat 
                         ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                         : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                     }`}
                   >
                     <span>{cat}</span>
                     {selectedCategory === cat && <Check size={14} />}
                   </button>
                 ))}
              </div>

              <div className="p-4 border-t border-dark-800">
                  <button 
                    onClick={handleAddNew}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl text-sm font-medium transition-colors border border-dark-700"
                  >
                    <Plus size={16} />
                    <span>Create Blank</span>
                  </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-dark-950">
               {/* Toolbar */}
               <div className="h-16 border-b border-dark-800 flex items-center justify-between px-6 bg-dark-900/50 backdrop-blur">
                  
                  {/* Search */}
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search templates..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-dark-950 border border-dark-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                     <input 
                       type="file" 
                       ref={fileInputRef}
                       className="hidden" 
                       accept=".html,.htm"
                       onChange={handleFileChange}
                     />
                     <button 
                        onClick={handleImportClick}
                        className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors text-sm"
                     >
                        <Upload size={16} />
                        <span className="hidden sm:inline">Import HTML</span>
                     </button>
                     <div className="h-6 w-px bg-dark-800 mx-1"></div>
                     <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-full text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                     </button>
                  </div>
               </div>

               {/* Grid */}
               <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-20">
                     {filteredTemplates.map(template => (
                       <div 
                         key={template.id}
                         className="group flex flex-col bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-900/10 transition-all duration-300 relative"
                       >
                          {/* Preview Area - Aspect Ratio changed to 16:9 (Landscape) to reduce height */}
                          <div 
                            className="relative aspect-video bg-white cursor-pointer overflow-hidden border-b border-dark-800"
                            onClick={(e) => handleSelect(e, template)}
                          >
                             {/* Optimized iframe scaling for landscape thumbnails - Shows 'Above the Fold' */}
                             <iframe 
                               srcDoc={getPreviewSrcDoc(template.htmlContent)}
                               className="w-[400%] h-[400%] transform scale-[0.25] origin-top-left pointer-events-none select-none border-none bg-white"
                               tabIndex={-1}
                               title={`Preview of ${template.name}`}
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4">
                               <button 
                                 onClick={(e) => handleSelect(e, template)}
                                 className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 w-auto"
                               >
                                 Use Template
                               </button>
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleEnterEditMode(template);
                                 }}
                                 className="px-6 py-2 bg-white hover:bg-gray-100 text-black rounded-lg font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 w-auto flex items-center justify-center gap-2"
                               >
                                 <Code size={14} /> View Code
                               </button>
                            </div>
                          </div>

                          {/* Footer Info */}
                          <div className="p-3 border-t border-dark-800 bg-dark-900 z-10 flex-1 flex flex-col">
                             <div className="flex items-center justify-between mb-1">
                                <div className="flex-1 min-w-0 mr-2">
                                   {editingNameId === template.id ? (
                                      <div className="flex items-center gap-1">
                                         <input 
                                           type="text" 
                                           value={editName}
                                           onChange={(e) => setEditName(e.target.value)}
                                           className="w-full bg-dark-950 border border-brand-500 rounded px-2 py-1 text-xs text-white focus:outline-none"
                                           autoFocus
                                           onKeyDown={(e) => e.key === 'Enter' && saveRename(e as any)}
                                           onClick={e => e.stopPropagation()}
                                         />
                                         <button onClick={saveRename} className="text-brand-400 hover:text-white p-1"><Check size={14} /></button>
                                      </div>
                                   ) : (
                                      <h3 className="font-bold text-gray-200 text-sm truncate" title={template.name}>{template.name}</h3>
                                   )}
                                </div>
                                
                                {/* Card Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                   {deletingId === template.id ? (
                                      <>
                                        <button onClick={(e) => handleConfirmDelete(e, template.id)} className="p-1 bg-red-500/20 text-red-400 rounded"><Check size={12} /></button>
                                        <button onClick={handleCancelDelete} className="p-1 text-gray-400 hover:bg-dark-800 rounded"><X size={12} /></button>
                                      </>
                                   ) : (
                                      <>
                                        <button onClick={(e) => startRename(e, template)} className="p-1 text-gray-500 hover:text-white hover:bg-dark-800 rounded"><Edit2 size={12} /></button>
                                        <button onClick={(e) => handleDeleteClick(e, template.id)} className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                                      </>
                                   )}
                                </div>
                             </div>
                             <p className="text-xs text-gray-500 line-clamp-1 mb-2">{template.description}</p>
                             
                             <div className="mt-auto flex items-center gap-2">
                                <span className="text-[10px] font-medium text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20 uppercase tracking-wider">
                                   {template.category}
                                </span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateLibrary;
