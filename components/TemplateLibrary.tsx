import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Code, Trash2, Layout, Edit2, Check, Upload, MousePointerClick, Save, ArrowLeft, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Template } from '../types';
import { DEFAULT_TEMPLATES } from '../constants';

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  
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
    const stored = localStorage.getItem('prism_templates');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTemplates(parsed.length > 0 ? parsed : DEFAULT_TEMPLATES);
      } catch (e) {
        setTemplates(DEFAULT_TEMPLATES);
      }
    } else {
      setTemplates(DEFAULT_TEMPLATES);
      localStorage.setItem('prism_templates', JSON.stringify(DEFAULT_TEMPLATES));
    }
  }, []);

  const handleSaveTemplates = (updatedTemplates: Template[]) => {
    setTemplates(updatedTemplates);
    localStorage.setItem('prism_templates', JSON.stringify(updatedTemplates));
  };

  // --- Delete Logic ---
  
  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEditingNameId(null); // Stop renaming if active
    setDeletingId(id);      // Show inline confirmation
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
    setDeletingId(null); // Stop deleting if active
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

    // Check for unsaved changes
    if (editorCode !== editorTemplate.htmlContent) {
      if (!window.confirm('You have unsaved changes. Switching templates will discard them. Continue?')) {
        return;
      }
    }

    const currentIndex = templates.findIndex(t => t.id === editorTemplate.id);
    if (currentIndex === -1) return;

    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    // Wrap around logic
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
            }
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>${safeHtml}</body>
      </html>
    `;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-dark-950 border border-dark-700 w-full max-w-[1400px] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {editorTemplate ? (
           <div className="flex flex-col h-full animate-fade-in bg-dark-950">
              <div className="h-16 border-b border-dark-800 flex items-center justify-between px-6 bg-dark-900/80 backdrop-blur-md">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={handleCloseEditor}
                      className="p-2 hover:bg-dark-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Back to Library"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-1 bg-dark-800/50 p-1 rounded-lg border border-dark-700">
                        <button 
                          onClick={() => handleNavigate('prev')}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded-md transition-colors"
                          title="Previous Template"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <div className="w-px h-4 bg-dark-700"></div>
                        <button 
                          onClick={() => handleNavigate('next')}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded-md transition-colors"
                          title="Next Template"
                        >
                          <ChevronRight size={16} />
                        </button>
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        Editing <span className="text-brand-400">{editorTemplate.name}</span>
                      </h2>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                         if (window.confirm("Are you sure you want to delete this template?")) {
                             handleConfirmDelete(e, editorTemplate.id);
                         }
                      }}
                      className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                      title="Delete Template"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="h-6 w-px bg-dark-700 mx-2"></div>
                    <button 
                      onClick={handleSaveEditor}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-brand-900/20"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                 </div>
              </div>

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
                   <div className="absolute top-2 right-2 bg-dark-900/80 text-xs text-white px-2 py-1 rounded backdrop-blur-sm pointer-events-none border border-dark-700">
                     Preview
                   </div>
                </div>
              </div>
           </div>
        ) : (
          <>
            <div className="p-6 border-b border-dark-800 flex items-center justify-between bg-dark-950">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-500/10 rounded-xl border border-brand-500/20">
                  <Layout className="text-brand-500" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Template Library</h2>
                  <p className="text-gray-400 text-sm">Choose a starting point or create your own.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 {/* Hidden File Input */}
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   className="hidden" 
                   accept=".html,.htm"
                   onChange={handleFileChange}
                 />
                 
                 {/* Action Buttons Group */}
                 <div className="flex items-center bg-dark-900 p-1 rounded-lg border border-dark-800">
                    <button 
                      onClick={handleImportClick}
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-dark-800 text-gray-300 rounded-md text-sm font-medium transition-colors"
                    >
                      <Upload size={14} />
                      <span>Import HTML</span>
                    </button>
                    <div className="w-px h-4 bg-dark-700 mx-1"></div>
                    <button 
                      onClick={handleAddNew}
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-dark-800 text-brand-400 rounded-md text-sm font-medium transition-colors"
                    >
                      <Plus size={14} />
                      <span>Create Blank</span>
                    </button>
                 </div>

                 <div className="h-8 w-px bg-dark-800 mx-2"></div>

                 <button 
                   onClick={onClose}
                   className="p-2 hover:bg-dark-800 rounded-full text-gray-400 hover:text-white transition-colors"
                 >
                   <X size={24} />
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-dark-950/50">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {/* Template Cards */}
                 {templates.map(template => (
                   <div 
                     key={template.id}
                     className="group relative aspect-[4/3] bg-dark-900 rounded-xl border border-dark-800 overflow-hidden hover:border-dark-600 hover:shadow-xl transition-all flex flex-col"
                   >
                      {/* Preview Area (mini iframe) */}
                      <div className="flex-1 bg-white relative overflow-hidden cursor-pointer" onClick={(e) => handleSelect(e, template)}>
                        <iframe 
                           srcDoc={getPreviewSrcDoc(template.htmlContent)}
                           className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none select-none"
                           tabIndex={-1}
                           title={`Preview of ${template.name}`}
                        />
                        <div className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-dark-950/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-dark-800">
                          {template.category}
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm p-2">
                           <button 
                             onClick={(e) => handleSelect(e, template)}
                             className="flex items-center justify-center gap-1 px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-medium hover:bg-brand-500 transition-colors shadow-lg w-auto"
                           >
                             Use
                           </button>
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               handleEnterEditMode(template);
                             }}
                             className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors shadow-lg"
                             title="Edit Code"
                           >
                             <Code size={16} />
                           </button>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="p-3 bg-dark-900 border-t border-dark-800 relative z-20">
                         <div className="flex items-center justify-between mb-1">
                            {editingNameId === template.id ? (
                              <div className="flex items-center gap-2 flex-1 mr-2">
                                <input 
                                  type="text" 
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full bg-dark-950 border border-brand-500 rounded px-1 py-0.5 text-xs text-white focus:outline-none"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveRename(e as any);
                                  }}
                                />
                                <button onClick={saveRename} className="text-brand-400 hover:text-white"><Check size={12} /></button>
                              </div>
                            ) : (
                              <h3 className="font-bold text-white text-xs truncate flex-1 mr-2 cursor-help" title={template.name}>
                                {template.name}
                              </h3>
                            )}
                            
                            <div className="flex items-center gap-1">
                              {deletingId === template.id ? (
                                <>
                                  <button 
                                    onClick={(e) => handleConfirmDelete(e, template.id)}
                                    className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors"
                                    title="Confirm Delete"
                                  >
                                    <Check size={12} />
                                  </button>
                                  <button 
                                    onClick={handleCancelDelete}
                                    className="p-1.5 text-gray-500 hover:text-white hover:bg-dark-800 rounded transition-colors"
                                    title="Cancel"
                                  >
                                    <X size={12} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button 
                                    onClick={(e) => startRename(e, template)}
                                    className="p-1.5 text-gray-500 hover:text-white hover:bg-dark-800 rounded transition-colors"
                                    title="Rename"
                                  >
                                    <Edit2 size={12} />
                                  </button>
                                  <button 
                                    onClick={(e) => handleDeleteClick(e, template.id)}
                                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                         </div>
                         <p className="text-[10px] text-gray-500 truncate">{template.description}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
            
            {/* Footer Hint */}
            <div className="p-3 bg-dark-950 border-t border-dark-800 flex items-center gap-2 text-gray-600 text-[10px] justify-center">
              <AlertCircle size={10} />
              <span>Templates are saved locally to your browser.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateLibrary;