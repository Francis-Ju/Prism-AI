
import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Tablet, Monitor, X, Download, Loader2, Edit2, Image as ImageIcon, FileCode } from 'lucide-react';
import { DeviceMode, GeneratedContentState } from '../types';
// @ts-ignore
import * as snapdom from 'snapdom';

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
  const [isExporting, setIsExporting] = useState(false);
  const [fontCss, setFontCss] = useState<string>('');

  // Determine if we are currently in "Dark Mode" based on the background color
  const isDarkMode = backgroundColor === '#09090b';

  // CSS Logic to force Dark Mode styles on standard Tailwind classes
  const darkModeStyles = `
    body { background-color: #09090b !important; color: #e4e4e7 !important; }
    
    /* Background Overrides */
    .bg-white { background-color: #18181b !important; }
    .bg-slate-50, .bg-gray-50, .bg-zinc-50 { background-color: #09090b !important; }
    .bg-slate-100, .bg-gray-100 { background-color: #27272a !important; }
    .bg-orange-50 { background-color: #2a1b12 !important; border-color: #431407 !important; }
    .bg-blue-50 { background-color: #172554 !important; border-color: #1e3a8a !important; }
    .bg-green-50 { background-color: #052e16 !important; border-color: #14532d !important; }
    .bg-red-50 { background-color: #450a0a !important; border-color: #7f1d1d !important; }
    
    /* Text Overrides */
    .text-slate-900, .text-gray-900, .text-zinc-900, .text-black { color: #f4f4f5 !important; }
    .text-slate-800, .text-gray-800 { color: #e4e4e7 !important; }
    .text-slate-700, .text-gray-700 { color: #d4d4d8 !important; }
    .text-slate-600, .text-gray-600 { color: #a1a1aa !important; }
    .text-slate-500, .text-gray-500 { color: #71717a !important; }
    
    /* Border Overrides */
    .border-slate-100, .border-slate-200, .border-gray-100, .border-gray-200 { border-color: #27272a !important; }
    .border-white { border-color: #27272a !important; }
    
    /* Specific Element Fixes */
    input { background-color: #27272a !important; color: white !important; border-color: #3f3f46 !important; }
    .shadow-xl, .shadow-lg, .shadow-md { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5) !important; }
  `;

  useEffect(() => {
    // Attempt to fetch Google Fonts CSS to inline it.
    // This prevents "SecurityError: Failed to read the 'cssRules' property" 
    // when html-to-image tries to access cross-origin stylesheets.
    const fetchFonts = async () => {
        try {
            const res = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
            if (res.ok) {
                const text = await res.text();
                setFontCss(text);
            }
        } catch (e) {
            console.warn("Failed to fetch font CSS for inline embedding:", e);
        }
    };
    fetchFonts();
  }, []);

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
    if (iframeRef.current && iframeRef.current.contentDocument && iframeRef.current.contentWindow) {
        setIsExporting(true);
        try {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument;
            const body = doc.body;
            const html = doc.documentElement;

            // Wait for fonts to be ready before capturing, safely catching any errors
            // to avoid bubbling up non-cloneable Event objects.
            await doc.fonts.ready.catch((e: any) => {
                console.warn("Fonts not fully ready:", e);
            });

            // Accurately calculate the full scrollable height
            const height = Math.max(
                body.scrollHeight, 
                body.offsetHeight, 
                html.clientHeight, 
                html.scrollHeight, 
                html.offsetHeight
            );
            
            const width = iframe.offsetWidth;

            // Use snapdom's toPng method
            const dataUrl = await snapdom.toPng(body, {
                quality: 1.0,
                pixelRatio: 2, // High resolution
                backgroundColor: contentState.backgroundColor,
                width: width,
                height: height,
                style: {
                   // Critical: Ensure the body renders at full height during capture
                   height: `${height}px`,
                   overflow: 'visible',
                   maxHeight: 'none',
                   transform: 'none',
                },
                // Robustness: Filter out any external link tags or scripts that might persist and cause CORS errors
                filter: (node: any) => {
                    const tagName = (node.tagName || '').toUpperCase();
                    if (tagName === 'LINK') {
                        return false;
                    }
                    if (tagName === 'SCRIPT' || tagName === 'IFRAME') {
                        return false;
                    }
                    return true;
                },
                cacheBust: true,
            });

            const link = document.createElement('a');
            link.download = `prism_artifact_${Date.now()}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setShowExportMenu(false);

        } catch (error: any) {
            console.error("Export internal error:", error);
            
            let userMsg = "An unexpected error occurred during export.";
            
            if (error instanceof Error) {
                userMsg = error.message;
            } else if (error && typeof error === 'object') {
                // Handle DOM Event objects (commonly "error" events from failed resource loads)
                if ('type' in error && error.type === 'error') {
                   userMsg = "A resource (likely an image or font) failed to load due to network or CORS security restrictions.";
                } else {
                   // Try to gracefully handle specific object types
                   try {
                        if (error.toString && error.toString() !== '[object Object]') {
                            userMsg = error.toString();
                        } else {
                            userMsg = "Resource load failed. Check console for details.";
                        }
                        
                        if (userMsg === '[object Event]') {
                            userMsg = "A cross-origin resource blocked the export. Check console for details.";
                        }
                   } catch (e) {
                       userMsg = "Unknown export error.";
                   }
                }
            } else {
                userMsg = String(error);
            }
            
            alert(`Failed to export image: ${userMsg}`);
        } finally {
            setIsExporting(false);
        }
    }
  };

  // Construct the source document for the iframe
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${fontCss 
            ? `<style>${fontCss}</style>` 
            : `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">`
        }
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                    display: ['Space Grotesk', 'Noto Sans SC', 'system-ui', 'sans-serif'],
                  },
                  colors: {
                      brand: {
                        400: '#a78bfa',
                        500: '#8b5cf6',
                        600: '#7c3aed',
                      },
                      accent: {
                        500: '#ec4899',
                      }
                  }
                }
              }
            }
        </script>
        <style>
           /* Hide scrollbar for clean preview */
           ::-webkit-scrollbar { width: 0px; background: transparent; }
           body { 
               background-color: ${backgroundColor}; 
               min-height: 100vh;
               margin: 0;
               overflow-x: hidden;
               font-family: 'Inter', 'Noto Sans SC', sans-serif;
               transition: background-color 0.3s ease, color 0.3s ease;
           }
           
           ${isDarkMode ? darkModeStyles : ''}

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
                 disabled={isExporting}
                 className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium rounded-md transition-colors shadow-lg shadow-brand-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                 {isExporting ? 'Processing...' : 'Export'}
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

      {/* Main Content Area: Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden relative p-4 md:p-8 flex justify-center bg-dots-pattern">
            <div 
            className={`transition-all duration-500 ease-in-out bg-white shadow-2xl ${getContainerWidth()} w-full h-full rounded-lg overflow-hidden ring-1 ring-dark-800 ${contentState.isEditable ? 'ring-2 ring-yellow-500/50' : ''}`}
            >
            {htmlContent ? (
                <iframe
                    ref={iframeRef}
                    srcDoc={srcDoc}
                    onLoad={handleIframeLoad}
                    className="w-full h-full border-none bg-white transition-colors duration-300"
                    style={{ backgroundColor: backgroundColor }}
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
    </div>
  );
};

export default PreviewArea;
