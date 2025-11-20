
import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Tablet, Monitor, X, Download, Loader2, Edit2, Image as ImageIcon, FileCode } from 'lucide-react';
import { DeviceMode, GeneratedContentState } from '../types';
import html2canvas from 'html2canvas';

interface PreviewAreaProps {
  htmlContent: string;
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
  backgroundColor: string;
  contentState: GeneratedContentState;
  onUpdateState: (updates: Partial<GeneratedContentState>) => void;
  onClose: () => void;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  htmlContent, 
  deviceMode, 
  onDeviceModeChange,
  backgroundColor,
  contentState,
  onUpdateState,
  onClose
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const getContainerWidth = () => {
    switch (deviceMode) {
      case DeviceMode.MOBILE: return 'max-w-[375px]';
      case DeviceMode.TABLET: return 'max-w-[768px]';
      case DeviceMode.DESKTOP: return 'max-w-full';
      default: return 'max-w-full';
    }
  };

  const downloadHtml = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `<html><head><title>Prism Artifact</title><script src="https://cdn.tailwindcss.com"></script></head><body style="background-color:${contentState.backgroundColor}">${contentState.html}</body></html>`
    ], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "prism_artifact.html";
    document.body.appendChild(element);
    element.click();
    setShowExportMenu(false);
  };

  const downloadImage = async () => {
    if (containerRef.current) {
        try {
            // Temporarily disable edit mode to clear guidelines
            const wasEditable = contentState.isEditable;
            if (wasEditable) {
               // We need to handle this state carefully. 
               // For now, just using the rendered DOM is fine, styles handle the outlines.
               // But ideally we'd turn off edit borders.
            }

            const canvas = await html2canvas(containerRef.current, {
                useCORS: true, // Important for external images
                scale: 2, // Higher quality
                backgroundColor: contentState.backgroundColor || '#ffffff'
            });
            
            const link = document.createElement('a');
            link.download = 'prism_artifact.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setShowExportMenu(false);
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export image. Some external assets might be blocked.");
        }
    }
  };

  const handleBlur = () => {
    if (containerRef.current && contentState.isEditable) {
      onUpdateState({ html: containerRef.current.innerHTML });
    }
  }

  // Effect to toggle contentEditable and Image Interactions
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Add custom styles for edit mode if active
    const styleId = 'prism-edit-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }

    if (contentState.isEditable) {
        styleEl.innerHTML = `
            [data-prism-container] img {
                transition: all 0.2s ease;
                cursor: pointer !important;
                position: relative;
            }
            [data-prism-container] img:hover {
                outline: 3px solid #a78bfa;
                filter: brightness(0.95);
            }
        `;
    } else {
        styleEl.innerHTML = '';
    }

    // Image click handler for replacement
    const handleImageClick = (e: MouseEvent) => {
        if (!contentState.isEditable) return;
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            
            const img = target as HTMLImageElement;
            const currentSrc = img.src;
            const newSrc = window.prompt("Enter new image URL:", currentSrc);
            
            if (newSrc && newSrc !== currentSrc) {
                // Critical: Capture current innerHTML to preserve text edits that happened before this click
                // before we modify the DOM or state.
                // However, since we are inside the event handler, the DOM is current.
                // We update the img src directly in DOM first to see result immediately?
                // No, we must update state to persist it.
                
                // 1. Get current HTML snapshot from container (includes user text edits)
                const currentHtmlSnapshot = container.innerHTML;
                
                // 2. Perform replacement on the snapshot string
                // This is safer than relying on React state which might be slightly stale regarding text edits
                // if handleBlur hasn't fired yet.
                // However, simple string replace is risky if multiple same images exist.
                
                // Better approach: Update the DOM element directly, then snapshot.
                img.src = newSrc;
                const updatedHtml = container.innerHTML;
                
                onUpdateState({ html: updatedHtml });
            }
        }
    };

    container.addEventListener('click', handleImageClick);
    return () => {
        container.removeEventListener('click', handleImageClick);
    };

  }, [contentState.isEditable, onUpdateState]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0c0c0e] border-l border-dark-800 shadow-2xl relative animate-fade-in min-w-0">
      
      {/* Artifact Toolbar */}
      <div className="h-16 border-b border-dark-800 flex items-center justify-between px-6 bg-dark-900/80 backdrop-blur-md z-20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${contentState.isEditable ? 'bg-yellow-500' : 'bg-brand-500'} animate-pulse`}></span>
            <span className="text-sm font-semibold text-white tracking-wide">
               {contentState.isEditable ? 'Editing Mode' : 'Artifact Preview'}
            </span>
          </div>
          
          <div className="h-4 w-px bg-dark-700 mx-2"></div>
          
          {/* Device Toggles & Edit */}
          <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700/50 items-center">
            <button 
              onClick={() => onDeviceModeChange(DeviceMode.DESKTOP)}
              className={`p-1.5 rounded-md transition-all ${deviceMode === DeviceMode.DESKTOP ? 'bg-dark-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              title="Desktop View"
            >
              <Monitor size={14} />
            </button>
            <button 
              onClick={() => onDeviceModeChange(DeviceMode.TABLET)}
              className={`p-1.5 rounded-md transition-all ${deviceMode === DeviceMode.TABLET ? 'bg-dark-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              title="Tablet View"
            >
              <Tablet size={14} />
            </button>
            <button 
              onClick={() => onDeviceModeChange(DeviceMode.MOBILE)}
              className={`p-1.5 rounded-md transition-all ${deviceMode === DeviceMode.MOBILE ? 'bg-dark-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              title="Mobile View"
            >
              <Smartphone size={14} />
            </button>
            
            <div className="w-px h-4 bg-dark-700 mx-1"></div>
            
            <button 
               onClick={() => onUpdateState({ isEditable: !contentState.isEditable })}
               className={`p-1.5 rounded-md transition-all ${
                 contentState.isEditable 
                   ? 'bg-yellow-500 text-black shadow-sm' 
                   : 'text-gray-500 hover:text-white hover:bg-dark-700'
               }`}
               title={contentState.isEditable ? "Exit Edit Mode" : "Edit Text & Images"}
             >
               <Edit2 size={14} />
             </button>
          </div>
        </div>

        <div className="flex items-center space-x-3 relative">
           {contentState.isEditable && (
               <span className="hidden md:inline text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded animate-pulse">
                 Click text to type, click images to replace
               </span>
           )}

           <div className="relative">
               <button 
                 onClick={() => setShowExportMenu(!showExportMenu)}
                 className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium rounded-md transition-colors shadow-lg shadow-brand-900/20"
               >
                 <Download size={14} />
                 Export
               </button>

               {showExportMenu && (
                 <div className="absolute top-full right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden z-50">
                    <button 
                      onClick={downloadHtml}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-700 transition-colors text-gray-300 hover:text-white"
                    >
                      <FileCode size={14} />
                      <span className="text-xs font-medium">Save HTML</span>
                    </button>
                    <button 
                      onClick={downloadImage}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-700 transition-colors text-gray-300 hover:text-white border-t border-dark-700"
                    >
                      <ImageIcon size={14} />
                      <span className="text-xs font-medium">Save as Image</span>
                    </button>
                 </div>
               )}
           </div>

           <div className="h-4 w-px bg-dark-700"></div>

           <button 
             onClick={onClose}
             className="p-2 hover:bg-dark-800 rounded-full text-gray-400 hover:text-white transition-colors"
             title="Close Artifact"
           >
             <X size={20} />
           </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto relative p-4 md:p-8 flex justify-center bg-dots-pattern">
        <div 
          className={`transition-all duration-500 ease-in-out bg-white shadow-2xl ${getContainerWidth()} w-full min-h-[800px] h-fit overflow-hidden ring-1 ring-dark-800 ${contentState.isEditable ? 'ring-2 ring-yellow-500/50' : ''}`}
          style={{ backgroundColor }}
        >
          {htmlContent ? (
             <div 
                ref={containerRef}
                data-prism-container="true"
                contentEditable={contentState.isEditable}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
                className="w-full h-full outline-none" 
                onBlur={handleBlur}
             />
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-gray-400 space-y-4">
              <Loader2 className="animate-spin text-brand-500" size={32} />
              <p>Rendering artifact...</p>
            </div>
          )}
        </div>
      </div>
      
      {showExportMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
      )}
    </div>
  );
};

export default PreviewArea;
