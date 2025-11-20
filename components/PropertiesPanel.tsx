import React, { useEffect, useState } from 'react';
import { Settings, ImageIcon, Type, Edit3, CheckSquare, XSquare } from 'lucide-react';
import { GeneratedContentState } from '../types';

interface PropertiesPanelProps {
  contentState: GeneratedContentState;
  onUpdateState: (updates: Partial<GeneratedContentState>) => void;
}

interface ExtractedImage {
  src: string;
  index: number; // position in array
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ contentState, onUpdateState }) => {
  
  const [images, setImages] = useState<ExtractedImage[]>([]);

  // Simple extraction of image srcs from HTML string
  useEffect(() => {
    if (contentState.html) {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const found: ExtractedImage[] = [];
      let match;
      let i = 0;
      while ((match = imgRegex.exec(contentState.html)) !== null) {
        found.push({ src: match[1], index: i });
        i++;
      }
      // De-duplicate strictly for UI cleanliness if needed, but keeping indices is important for replacement
      setImages(found);
    }
  }, [contentState.html]);

  const handleImageChange = (index: number, oldSrc: string, newSrc: string) => {
    // Replace all occurrences of the old source with the new source
    const updatedHtml = contentState.html.split(oldSrc).join(newSrc);
    onUpdateState({ html: updatedHtml });
  };

  return (
    <div className="w-72 bg-dark-800 border-l border-dark-700 flex flex-col h-full">
       <div className="p-4 border-b border-dark-700">
         <h3 className="font-semibold text-white flex items-center gap-2">
           <Settings size={16} />
           Content Tools
         </h3>
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-8">
          
          {/* Text Editing Toggle */}
          <section>
             <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Type size={14} />
                  <span>Text Content</span>
                </div>
             </div>
             
             <button 
               onClick={() => onUpdateState({ isEditable: !contentState.isEditable })}
               className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${contentState.isEditable ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-dark-700 text-gray-300 border border-dark-600 hover:bg-dark-600'}`}
             >
               {contentState.isEditable ? <CheckSquare size={16} /> : <Edit3 size={16} />}
               <span className="font-medium">{contentState.isEditable ? 'Finish Editing' : 'Edit Text Directly'}</span>
             </button>
             <p className="mt-2 text-xs text-gray-500">
               {contentState.isEditable ? 'Click anywhere on the preview to type.' : 'Enable to click and type directly on the design.'}
             </p>
          </section>

          {/* Image Manager */}
          <section>
             <div className="flex items-center gap-2 text-gray-400 mb-3 text-sm font-medium">
               <ImageIcon size={14} />
               <span>Images Detected ({images.length})</span>
             </div>
             
             <div className="space-y-3">
                {images.length === 0 ? (
                  <div className="text-xs text-dark-500 italic p-2 border border-dashed border-dark-700 rounded">
                    No images found in artifact.
                  </div>
                ) : (
                  images.map((img, idx) => (
                    <div key={idx} className="bg-dark-900 p-2 rounded border border-dark-700 space-y-2">
                       <div className="flex items-center gap-2">
                         <img src={img.src} alt="" className="w-8 h-8 rounded object-cover bg-dark-800" />
                         <span className="text-xs text-gray-500 truncate flex-1">{img.src.substring(0, 25)}...</span>
                       </div>
                       <input 
                         type="text" 
                         placeholder="Paste new image URL"
                         className="w-full bg-dark-950 border border-dark-700 rounded px-2 py-1 text-xs text-white focus:border-brand-500 focus:outline-none"
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             handleImageChange(idx, img.src, e.currentTarget.value);
                             e.currentTarget.value = '';
                           }
                         }}
                       />
                    </div>
                  ))
                )}
             </div>
          </section>

       </div>

       <div className="p-4 border-t border-dark-700 bg-dark-900/30">
         <p className="text-[10px] text-gray-600 text-center">
            Changes are applied immediately to the preview.
         </p>
       </div>
    </div>
  );
};

export default PropertiesPanel;