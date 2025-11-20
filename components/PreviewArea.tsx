import React, { useEffect, useRef } from 'react';
import { Smartphone, Tablet, Monitor, X, Download, Loader2 } from 'lucide-react';
import { DeviceMode, GeneratedContentState } from '../types';

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
  };

  // Handle content changes from contentEditable
  const handleInput = () => {
    if (containerRef.current && contentState.isEditable) {
       const updatedHtml = containerRef.current.innerHTML;
       // We debounce or just update state on blur usually, but here let's update periodically or on blur to avoid re-rendering loop if we bind value directly.
       // Actually, with dangerouslySetInnerHTML, React won't reconcile diffs inside easily. 
       // We use a ref to read, but updating state triggers re-render which resets cursor.
       // So we only sync back on specific actions or blur.
    }
  };

  const handleBlur = () => {
    if (containerRef.current && contentState.isEditable) {
      onUpdateState({ html: containerRef.current.innerHTML });
    }
  }

  // Effect to toggle contentEditable on the children
  useEffect(() => {
    if (containerRef.current) {
       // We apply contentEditable to the container, which allows editing children.
       // Tailwind CDN needs to be present in the iframe context if we used iframe, but we are using a div here.
       // The styles are applied globally from index.html
    }
  }, [contentState.isEditable]);

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
          
          {/* Device Toggles */}
          <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700/50">
            <button 
              onClick={() => onDeviceModeChange(DeviceMode.DESKTOP)}
              className={`p-1.5 rounded-md transition-all ${deviceMode === DeviceMode.DESKTOP ? 'bg-dark-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Monitor size={14} />
            </button>
            <button 
              onClick={() => onDeviceModeChange(DeviceMode.TABLET)}
              className={`p-1.5 rounded-md transition-all ${deviceMode === DeviceMode.TABLET ? 'bg-dark-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Tablet size={14} />
            </button>
            <button 
              onClick={() => onDeviceModeChange(DeviceMode.MOBILE)}
              className={`p-1.5 rounded-md transition-all ${deviceMode === DeviceMode.MOBILE ? 'bg-dark-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Smartphone size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
           <button 
             onClick={downloadHtml}
             className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium rounded-md transition-colors shadow-lg shadow-brand-900/20"
           >
             <Download size={14} />
             Export
           </button>

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
          className={`transition-all duration-500 ease-in-out bg-white shadow-2xl ${getContainerWidth()} w-full min-h-[800px] h-fit overflow-hidden ring-1 ring-dark-800 ${contentState.isEditable ? 'ring-2 ring-yellow-500/50 cursor-text' : ''}`}
          style={{ backgroundColor }}
        >
          {htmlContent ? (
             <div 
                ref={containerRef}
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
    </div>
  );
};

export default PreviewArea;
