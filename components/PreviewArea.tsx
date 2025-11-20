import React, { useEffect, useRef } from 'react';
import { Smartphone, Tablet, Monitor, X, Download, Loader2, Edit2 } from 'lucide-react';
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
                filter: brightness(0.9);
            }
            [data-prism-container] img::after {
                content: "EDIT";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: black;
                color: white;
                padding: 4px;
                font-size: 10px;
                pointer-events: none;
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
                img.src = newSrc;
                onUpdateState({ html: container.innerHTML });
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

        <div className="flex items-center space-x-3">
           {contentState.isEditable && (
               <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded animate-pulse">
                 Click text to type, click images to replace
               </span>
           )}

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
    </div>
  );
};

export default PreviewArea;