
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

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
    document.body.removeChild(element);
    setShowExportMenu(false);
  };

  const downloadImage = async () => {
    // We need to capture the body of the iframe
    if (iframeRef.current && iframeRef.current.contentDocument) {
        try {
            const iframeBody = iframeRef.current.contentDocument.body;
            
            const canvas = await html2canvas(iframeBody, {
                useCORS: true, 
                scale: 2, 
                backgroundColor: contentState.backgroundColor || '#ffffff',
                // Adjust width to match current view to avoid capturing white space if in mobile mode
                windowWidth: iframeBody.scrollWidth,
                windowHeight: iframeBody.scrollHeight
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

  // Construct the source document for the iframe
  // We inject the content and the logic for edit mode interaction directly into the iframe
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
           /* Hide scrollbar for clean preview */
           ::-webkit-scrollbar { width: 0px; background: transparent; }
           body { 
               background-color: ${backgroundColor}; 
               min-height: 100vh;
               margin: 0;
               overflow-x: hidden;
               font-family: system-ui, -apple-system, sans-serif;
           }
           ${contentState.isEditable ? `
           [data-prism-container] img {
               transition: all 0.2s ease;
               cursor: pointer !important;
               position: relative;
           }
           [data-prism-container] img:hover {
               outline: 3px solid #a78bfa;
               filter: brightness(0.95);
           }
           [data-prism-container] *:focus {
               outline: 2px dashed #a78bfa;
               outline-offset: 2px;
           }
           ` : ''}
        </style>
    </head>
    <body ${contentState.isEditable ? 'contenteditable="true"' : ''} data-prism-container="true">
      ${htmlContent}
    </body>
    </html>
  `;

  const handleIframeLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    // Logic: Sync content back to parent on blur (text edits)
    if (contentState.isEditable) {
        doc.body.addEventListener('blur', () => {
            // Only update if content actually changed to avoid unnecessary re-renders
            if (doc.body.innerHTML !== contentState.html) {
                onUpdateState({ html: doc.body.innerHTML });
            }
        }, true);

        // Logic: Handle image clicks for replacement
        doc.body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'IMG') {
                e.preventDefault();
                e.stopPropagation();
                
                const img = target as HTMLImageElement;
                const currentSrc = img.src;
                const newSrc = window.prompt("Enter new image URL:", currentSrc);
                
                if (newSrc && newSrc !== currentSrc) {
                    img.src = newSrc;
                    onUpdateState({ html: doc.body.innerHTML });
                }
            }
        });
    }
  };

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

           <div className="relative" ref={exportMenuRef}>
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

      {/* Canvas Area - Now uses Iframe for true responsive preview */}
      <div className="flex-1 overflow-hidden relative p-4 md:p-8 flex justify-center bg-dots-pattern">
        <div 
          className={`transition-all duration-500 ease-in-out bg-white shadow-2xl ${getContainerWidth()} w-full h-full rounded-lg overflow-hidden ring-1 ring-dark-800 ${contentState.isEditable ? 'ring-2 ring-yellow-500/50' : ''}`}
        >
          {htmlContent ? (
             <iframe
                ref={iframeRef}
                srcDoc={srcDoc}
                onLoad={handleIframeLoad}
                className="w-full h-full border-none bg-white"
                title="Prism Preview"
                sandbox="allow-scripts allow-same-origin allow-modals"
             />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <Loader2 className="animate-spin text-brand-500" size={32} />
              <p>Rendering artifact...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
