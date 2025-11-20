import React, { useEffect, useState } from 'react';
import { Settings, ImageIcon } from 'lucide-react';
import { GeneratedContentState } from '../types';

interface PropertiesPanelProps {
  contentState: GeneratedContentState;
  onUpdateState: (updates: Partial<GeneratedContentState>) => void;
}

interface ExtractedImage {
  src: string;
  index: number; 
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
      setImages(found);
    }
  }, [contentState.html]);

  const handleImageChange = (oldSrc: string, newSrc: string) => {
    if (!oldSrc) return;
    // Replace all occurrences of the old source with the new source
    // split().join() is a simple and effective way to replace all instances
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
                             handleImageChange(img.src, e.currentTarget.value);
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