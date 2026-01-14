
import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Tablet, Monitor, X, Download, Loader2, Edit2, Image as ImageIcon, FileCode, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Type, Palette, Plus, MousePointer2, ImagePlus, ChevronDown, Highlighter, Upload, RefreshCcw, Check, Undo, Redo, Eraser } from 'lucide-react';
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

interface ActiveElementStyle {
  tagName: string;
  fontFamily: string;
  textAlign: string;
  fontWeight: string;
  fontSize: string;
  color: string;
  src?: string;
}

interface ThemeOption {
  id: string;
  name: string;
  bg: string;
  textColor: string;
  css: string;
}

const THEMES: ThemeOption[] = [
  { 
    id: 'novartis-light', 
    name: 'Novartis Light', 
    bg: '#ffffff', 
    textColor: '#334155',
    css: `
      body { background-color: #ffffff !important; color: #334155 !important; }
      .bg-slate-50 { background-color: #f8fafc !important; }
      .bg-white { background-color: #ffffff !important; }
    `
  },
  { 
    id: 'prism-dark', 
    name: 'Prism Dark', 
    bg: '#09090b', 
    textColor: '#e4e4e7',
    css: `
      body { background-color: #09090b !important; color: #e4e4e7 !important; }
      .bg-white { background-color: #18181b !important; }
      .bg-slate-50, .bg-gray-50, .bg-zinc-50 { background-color: #09090b !important; }
      .bg-slate-100, .bg-gray-100 { background-color: #27272a !important; }
      .text-slate-900, .text-gray-900, .text-zinc-900, .text-black { color: #f4f4f5 !important; }
      input { background-color: #27272a !important; color: white !important; border-color: #3f3f46 !important; }
    `
  },
  { 
    id: 'medical-blue', 
    name: 'Medical Blue', 
    bg: '#f0f9ff', 
    textColor: '#0c4a6e',
    css: `
      body { background-color: #f0f9ff !important; color: #0c4a6e !important; }
      .bg-white { background-color: #e0f2fe !important; }
      .text-slate-900, .text-gray-900 { color: #0c4a6e !important; }
      .bg-slate-50 { background-color: #f0f9ff !important; }
      .bg-slate-900 { background-color: #0369a1 !important; }
    `
  },
  { 
    id: 'warm-paper', 
    name: 'Clinical Paper', 
    bg: '#fafaf9', 
    textColor: '#44403c',
    css: `
      body { background-color: #fafaf9 !important; color: #44403c !important; }
      .bg-white { background-color: #ffffff !important; border: 1px solid #e7e5e4 !important; }
      .text-slate-900 { color: #292524 !important; }
      .bg-slate-50 { background-color: #f5f5f4 !important; }
      .bg-slate-900 { background-color: #57534e !important; }
    `
  }
];

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
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const fontMenuRef = useRef<HTMLDivElement>(null);
  const colorMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontInputRef = useRef<HTMLInputElement>(null);
  const replaceImageRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  
  const [isExporting, setIsExporting] = useState(false);
  const [fontCss, setFontCss] = useState<string>('');
  const [activeThemeId, setActiveThemeId] = useState<string>('novartis-light');
  
  // Track the currently selected element's style in the iframe
  const [activeElement, setActiveElement] = useState<ActiveElementStyle | null>(null);

  useEffect(() => {
    // Detect initial theme based on background color or default to light
    const matchedTheme = THEMES.find(t => t.bg === backgroundColor);
    if (matchedTheme) {
        setActiveThemeId(matchedTheme.id);
    } else if (backgroundColor === '#09090b') {
        setActiveThemeId('prism-dark');
    }
  }, []);

  useEffect(() => {
    const fetchFonts = async () => {
        try {
            const res = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&family=Merriweather:wght@300;400;700&display=swap');
            if (res.ok) {
                const text = await res.text();
                setFontCss(text);
            }
        } catch (e) {
            console.warn("Failed to fetch font CSS:", e);
        }
    };
    fetchFonts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
      if (fontMenuRef.current && !fontMenuRef.current.contains(event.target as Node)) {
        setShowFontMenu(false);
      }
      if (colorMenuRef.current && !colorMenuRef.current.contains(event.target as Node)) {
        setShowColorMenu(false);
      }
    };

    // Message handler for iframe communication
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ELEMENT_SELECTED') {
        setActiveElement({
          tagName: event.data.tagName,
          fontFamily: event.data.fontFamily,
          textAlign: event.data.textAlign,
          fontWeight: event.data.fontWeight,
          fontSize: event.data.fontSize,
          color: event.data.color,
          src: event.data.src
        });
      } else if (event.data.type === 'CONTENT_UPDATED') {
          onUpdateState({ html: event.data.html });
      } else if (event.data.type === 'SELECTION_CLEARED') {
          setActiveElement(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('message', handleMessage);
    };
  }, [showExportMenu, showThemeMenu, showFontMenu, showColorMenu, onUpdateState]);

  const getContainerWidth = () => {
    switch (deviceMode) {
      case DeviceMode.MOBILE: return 'max-w-[375px]';
      case DeviceMode.TABLET: return 'max-w-[768px]';
      case DeviceMode.DESKTOP: return 'max-w-full';
      default: return 'max-w-full';
    }
  };

  // --- Theme Logic ---
  const applyTheme = (themeId: string) => {
      const theme = THEMES.find(t => t.id === themeId);
      if (!theme) return;
      
      setActiveThemeId(themeId);
      onUpdateState({ backgroundColor: theme.bg }); // Persist BG
      
      // Inject CSS into iframe without reload
      sendCommand('INJECT_THEME_CSS', { css: theme.css });
      setShowThemeMenu(false);
  };

  // --- Editing Functions ---

  const sendCommand = (type: string, payload: any) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.postMessage({ type, ...payload }, '*');
  };

  const updateSelectedStyle = (styleProp: string, value: string) => {
      sendCommand('APPLY_STYLE', { prop: styleProp, value });
      // Optimistic update
      if (activeElement) {
          setActiveElement({ ...activeElement, [styleProp]: value } as any);
      }
      // Close dropdowns
      if (styleProp === 'fontFamily') setShowFontMenu(false);
      if (styleProp === 'color') setShowColorMenu(false);
  };

  const execCommand = (command: string, value: string | null = null) => {
     sendCommand('EXEC_COMMAND', { command, value });
  };

  const handleImageInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            sendCommand('INSERT_IMAGE', { src: base64 });
        };
        reader.readAsDataURL(file);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            sendCommand('UPDATE_ATTRIBUTE', { attr: 'src', value: base64 });
            // Optimistic update
            if (activeElement) {
               setActiveElement({ ...activeElement, src: base64 });
            }
        };
        reader.readAsDataURL(file);
    }
    if (replaceImageRef.current) replaceImageRef.current.value = '';
  };

  const handleCustomFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            // Create a safe font name from filename or timestamp
            const fontName = `CustomFont-${Date.now()}`;
            
            sendCommand('INJECT_FONT_FACE', { fontName, fontData: base64 });
            updateSelectedStyle('fontFamily', fontName);
        };
        reader.readAsDataURL(file);
    }
    if (fontInputRef.current) fontInputRef.current.value = '';
  };

  // --- Export Functions ---

  const downloadHtml = () => {
    const element = document.createElement("a");
    // Inject active theme CSS into export
    const currentThemeCss = THEMES.find(t => t.id === activeThemeId)?.css || '';
    
    const file = new Blob([
      `<html><head><title>Prism Artifact</title><script src="https://cdn.tailwindcss.com"></script><style>${currentThemeCss}</style></head><body style="background-color:${contentState.backgroundColor}">${contentState.html}</body></html>`
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

            // Clean up selection before capture
            sendCommand('CLEAR_SELECTION', {});
            // Wait a tick for cleanup
            await new Promise(r => setTimeout(r, 100));

            const height = body.scrollHeight;
            const width = iframe.offsetWidth;

            const dataUrl = await snapdom.toPng(body, {
                quality: 1.0,
                pixelRatio: 2, 
                backgroundColor: contentState.backgroundColor,
                width: width,
                height: height,
                style: { height: `${height}px`, overflow: 'visible' }
            });

            const link = document.createElement('a');
            link.download = `prism_design_${Date.now()}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setShowExportMenu(false);

        } catch (error: any) {
            console.error("Export error:", error);
            alert("Export failed. Please try again.");
        } finally {
            setIsExporting(false);
        }
    }
  };

  // Initial CSS injection (on iframe load)
  const initialThemeCss = THEMES.find(t => t.id === activeThemeId)?.css || '';

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${fontCss 
            ? `<style>${fontCss}</style>` 
            : `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">`
        }
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
                    display: ['Space Grotesk', 'system-ui', 'sans-serif'],
                    serif: ['Merriweather', 'serif'],
                    mono: ['monospace']
                  },
                  colors: {
                      brand: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
                  }
                }
              }
            }
        </script>
        <style id="prism-theme-style">
           /* Theme CSS Injected Here */
           ${initialThemeCss}
        </style>
        <style>
           ::-webkit-scrollbar { width: 0px; background: transparent; }
           body { 
               background-color: ${backgroundColor}; 
               min-height: 100vh;
               margin: 0;
               padding-bottom: 50px;
               font-family: 'Inter', sans-serif;
               transition: background-color 0.3s ease, color 0.3s ease;
               cursor: ${contentState.isEditable ? 'text' : 'default'};
           }

           /* FOCUS MODE HIGHLIGHTING */
           .prism-selected {
              outline: 2px solid #F16F20 !important;
              outline-offset: 4px;
              box-shadow: 0 0 0 6px rgba(241, 111, 32, 0.2);
              border-radius: 4px;
              position: relative;
              z-index: 50;
           }
           
           [contenteditable]:focus {
              outline: none;
           }
        </style>
        <script>
            // --- History Management ---
            let historyStack = [];
            let historyIndex = -1;
            const MAX_HISTORY = 30;

            function initHistory() {
               historyStack = [document.body.innerHTML];
               historyIndex = 0;
            }

            function saveHistory() {
               // If we are not at the end of the stack (e.g. after undo), truncate future
               if (historyIndex < historyStack.length - 1) {
                   historyStack = historyStack.slice(0, historyIndex + 1);
               }
               
               historyStack.push(document.body.innerHTML);
               
               if (historyStack.length > MAX_HISTORY) {
                   historyStack.shift();
               } else {
                   historyIndex++;
               }
            }

            // Init on load
            window.addEventListener('load', initHistory);

            // --- Message Listener ---
            window.addEventListener('message', (event) => {
               const data = event.data;
               
               if (data.type === 'UNDO') {
                   if (historyIndex > 0) {
                       historyIndex--;
                       document.body.innerHTML = historyStack[historyIndex];
                       reportUpdate();
                   }
                   return;
               }

               if (data.type === 'REDO') {
                   if (historyIndex < historyStack.length - 1) {
                       historyIndex++;
                       document.body.innerHTML = historyStack[historyIndex];
                       reportUpdate();
                   }
                   return;
               }

               // For all modification commands, save history first
               if (['APPLY_STYLE', 'UPDATE_ATTRIBUTE', 'EXEC_COMMAND', 'INSERT_IMAGE'].includes(data.type)) {
                   saveHistory();
               }
               
               if (data.type === 'APPLY_STYLE') {
                  const el = document.querySelector('.prism-selected');
                  if (el) {
                     el.style[data.prop] = data.value;
                     reportUpdate();
                  }
               }

               if (data.type === 'UPDATE_ATTRIBUTE') {
                  const el = document.querySelector('.prism-selected');
                  if (el) {
                     el.setAttribute(data.attr, data.value);
                     reportUpdate();
                  }
               }

               if (data.type === 'INJECT_THEME_CSS') {
                   const styleTag = document.getElementById('prism-theme-style');
                   if (styleTag) {
                       styleTag.textContent = data.css;
                   }
               }
               
               if (data.type === 'INJECT_FONT_FACE') {
                   const style = document.createElement('style');
                   style.textContent = \`
                       @font-face {
                           font-family: '\${data.fontName}';
                           src: url('\${data.fontData}');
                       }
                   \`;
                   document.head.appendChild(style);
               }
               
               if (data.type === 'EXEC_COMMAND') {
                  document.execCommand(data.command, false, data.value);
                  reportUpdate();
               }

               if (data.type === 'INSERT_IMAGE') {
                  const el = document.querySelector('.prism-selected');
                  const img = document.createElement('img');
                  img.src = data.src;
                  img.className = 'w-full h-auto rounded-xl my-4 shadow-sm object-cover';
                  img.alt = 'Inserted image';
                  
                  if (el) {
                      // Insert after the selected block
                      el.insertAdjacentElement('afterend', img);
                  } else {
                      // Default append to body if nothing selected
                      document.body.appendChild(img);
                  }
                  reportUpdate();
               }
               
               if (data.type === 'CLEAR_SELECTION') {
                  document.querySelectorAll('.prism-selected').forEach(el => el.classList.remove('prism-selected'));
                  document.body.classList.remove('has-selection');
               }
            });

            function reportUpdate() {
                window.parent.postMessage({
                    type: 'CONTENT_UPDATED',
                    html: document.body.innerHTML
                }, '*');
            }

            // --- Selection Logic ---
            document.addEventListener('click', function(e) {
                if (!document.body.isContentEditable) return;
                
                // Prevent link navigation in edit mode
                if (e.target.tagName === 'A') e.preventDefault();

                // 1. Cleanup old selection
                document.querySelectorAll('.prism-selected').forEach(el => el.classList.remove('prism-selected'));
                
                // 2. Identify new target
                let target = e.target;
                
                // Traverse up if text node or simple formatting tag to find the 'Block'
                while (target && target.tagName !== 'BODY' && 
                       (target.nodeType === 3 || ['B','I','U','SPAN','STRONG','EM'].includes(target.tagName))) {
                    target = target.parentNode;
                }
                
                if (!target || target.tagName === 'BODY' || target.tagName === 'HTML') {
                   document.body.classList.remove('has-selection');
                   window.parent.postMessage({ type: 'SELECTION_CLEARED' }, '*');
                   return;
                }
                
                // 3. Apply Focus
                target.classList.add('prism-selected');
                target.setAttribute('data-tag-name', target.tagName);
                document.body.classList.add('has-selection');
                
                // 4. Report computed styles to toolbar
                const comp = window.getComputedStyle(target);
                const src = target.tagName === 'IMG' ? target.getAttribute('src') : undefined;

                window.parent.postMessage({
                    type: 'ELEMENT_SELECTED',
                    tagName: target.tagName,
                    fontFamily: comp.fontFamily,
                    textAlign: comp.textAlign,
                    fontWeight: comp.fontWeight,
                    fontSize: comp.fontSize,
                    color: comp.color,
                    src: src
                }, '*');
            });

            // Auto-report content changes on typing and Save History
            let debounceTimer;
            document.body.addEventListener('input', () => {
                reportUpdate();
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    saveHistory();
                }, 800); // Debounce history saving for typing
            });
        </script>
    </head>
    <body ${contentState.isEditable ? 'contenteditable="true"' : ''} data-prism-container="true">
      ${htmlContent}
    </body>
    </html>
  `;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0c0c0e] border-l border-dark-800 shadow-2xl relative animate-fade-in min-w-0">
      
      {/* Top Bar: Modes & Export */}
      <div className="flex-none h-14 border-b border-dark-800 flex items-center justify-between px-4 bg-dark-900/80 backdrop-blur-md z-30">
        <div className="flex items-center space-x-3">
          <button 
             onClick={() => {
                 onUpdateState({ isEditable: !contentState.isEditable });
                 // Clear internal selection when toggling
                 setActiveElement(null); 
             }}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
               contentState.isEditable 
                 ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                 : 'bg-dark-800 text-gray-400 hover:text-white'
             }`}
           >
             <Edit2 size={14} />
             <span>{contentState.isEditable ? 'Editing Active' : 'View Mode'}</span>
           </button>
           
           <div className="h-4 w-px bg-dark-700"></div>
           
           <div className="flex bg-dark-800 rounded-lg p-0.5 border border-dark-700/50">
            <button onClick={() => onDeviceModeChange(DeviceMode.DESKTOP)} className={`p-1.5 rounded ${deviceMode === DeviceMode.DESKTOP ? 'bg-dark-600 text-white' : 'text-gray-500 hover:text-gray-300'}`} title="Desktop"><Monitor size={14} /></button>
            <button onClick={() => onDeviceModeChange(DeviceMode.TABLET)} className={`p-1.5 rounded ${deviceMode === DeviceMode.TABLET ? 'bg-dark-600 text-white' : 'text-gray-500 hover:text-gray-300'}`} title="Tablet"><Tablet size={14} /></button>
            <button onClick={() => onDeviceModeChange(DeviceMode.MOBILE)} className={`p-1.5 rounded ${deviceMode === DeviceMode.MOBILE ? 'bg-dark-600 text-white' : 'text-gray-500 hover:text-gray-300'}`} title="Mobile"><Smartphone size={14} /></button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
           
           {/* Theme Selector */}
           <div className="relative" ref={themeMenuRef}>
             <button
               onClick={() => setShowThemeMenu(!showThemeMenu)}
               className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 text-gray-200 text-xs font-medium rounded-lg border border-dark-700 transition-colors"
               title="Change Theme"
             >
               <Palette size={14} className={activeThemeId !== 'novartis-light' ? 'text-brand-400' : ''} />
               <span className="hidden md:inline">Theme</span>
             </button>

             {showThemeMenu && (
               <div className="absolute top-full right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                  <div className="p-2 space-y-1">
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => applyTheme(theme.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-xs font-medium transition-colors ${activeThemeId === theme.id ? 'bg-brand-500/20 text-brand-400' : 'text-gray-300 hover:bg-dark-700 hover:text-white'}`}
                      >
                         <div className="w-4 h-4 rounded-full border border-gray-500/50" style={{ backgroundColor: theme.bg }}></div>
                         <span>{theme.name}</span>
                         {activeThemeId === theme.id && <Check size={12} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
               </div>
             )}
           </div>

           <div className="h-4 w-px bg-dark-700"></div>

           <div className="relative" ref={exportMenuRef}>
               <button 
                 onClick={() => setShowExportMenu(!showExportMenu)}
                 disabled={isExporting}
                 className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 text-gray-200 text-xs font-medium rounded-lg border border-dark-700 transition-colors"
               >
                 {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                 <span>Export</span>
               </button>

               {showExportMenu && (
                 <div className="absolute top-full right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                    <button onClick={downloadHtml} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-700 text-gray-300 hover:text-white"><FileCode size={14} /><span className="text-xs">HTML File</span></button>
                    <button onClick={downloadImage} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-700 text-gray-300 hover:text-white border-t border-dark-700"><ImageIcon size={14} /><span className="text-xs">PNG Image</span></button>
                 </div>
               )}
           </div>
           <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-full text-gray-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>
      </div>

      {/* Editor Ribbon (Visible only in Edit Mode) */}
      {contentState.isEditable && (
        <div className="flex-none h-14 bg-dark-800/50 border-b border-dark-800 flex items-center px-4 gap-4 z-20 animate-slide-up">
           
           {/* Section 0: Undo/Redo */}
           <div className="flex items-center gap-1 pr-4 border-r border-dark-700/50">
               <button onClick={() => sendCommand('UNDO', {})} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded" title="Undo"><Undo size={14} /></button>
               <button onClick={() => sendCommand('REDO', {})} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded" title="Redo"><Redo size={14} /></button>
           </div>

           {/* Section 1: History / Block */}
           <div className="flex items-center gap-1 pr-4 border-r border-dark-700/50">
              <span className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                 <MousePointer2 size={12} />
                 {activeElement ? activeElement.tagName : 'None'}
              </span>
           </div>

           {/* Section 2: Text Formatting */}
           <div className="flex items-center gap-1 bg-dark-900/50 p-1 rounded-lg border border-dark-700/50">
              <button onClick={() => execCommand('bold')} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded" title="Bold"><Bold size={14} /></button>
              <button onClick={() => execCommand('italic')} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded" title="Italic"><Italic size={14} /></button>
              <button onClick={() => execCommand('underline')} className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded" title="Underline"><Underline size={14} /></button>
           </div>

           {/* Section 3: Alignment */}
           <div className="flex items-center gap-1 bg-dark-900/50 p-1 rounded-lg border border-dark-700/50">
              <button onClick={() => updateSelectedStyle('textAlign', 'left')} className={`p-1.5 rounded hover:bg-dark-700 ${activeElement?.textAlign === 'left' ? 'text-brand-400' : 'text-gray-400'}`}><AlignLeft size={14} /></button>
              <button onClick={() => updateSelectedStyle('textAlign', 'center')} className={`p-1.5 rounded hover:bg-dark-700 ${activeElement?.textAlign === 'center' ? 'text-brand-400' : 'text-gray-400'}`}><AlignCenter size={14} /></button>
              <button onClick={() => updateSelectedStyle('textAlign', 'right')} className={`p-1.5 rounded hover:bg-dark-700 ${activeElement?.textAlign === 'right' ? 'text-brand-400' : 'text-gray-400'}`}><AlignRight size={14} /></button>
           </div>

           {/* Section 4: Typography & Color */}
           <div className="flex items-center gap-2">
              <div className="relative" ref={fontMenuRef}>
                 <button 
                   onClick={() => setShowFontMenu(!showFontMenu)}
                   className="flex items-center gap-1 px-2 py-1.5 bg-dark-900/50 border border-dark-700/50 rounded-lg text-xs text-gray-300 hover:text-white"
                   title="Font Family"
                 >
                    <Type size={12} />
                    <span>Font</span>
                    <ChevronDown size={10} />
                 </button>
                 {showFontMenu && (
                   <div className="absolute top-full left-0 mt-1 w-32 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-[60] animate-fade-in">
                      <button onClick={() => updateSelectedStyle('fontFamily', '"Inter", sans-serif')} className="block w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-dark-700 hover:text-white font-sans">Sans Serif</button>
                      <button onClick={() => updateSelectedStyle('fontFamily', '"Merriweather", serif')} className="block w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-dark-700 hover:text-white font-serif">Serif</button>
                      <button onClick={() => updateSelectedStyle('fontFamily', 'monospace')} className="block w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-dark-700 hover:text-white font-mono">Monospace</button>
                      
                      <div className="h-px bg-dark-700 my-1"></div>
                      
                      {/* Custom Font Upload */}
                      <button 
                          onClick={() => fontInputRef.current?.click()} 
                          className="w-full text-left px-3 py-2 text-xs text-brand-400 hover:bg-dark-700 hover:text-brand-300 flex items-center gap-2"
                      >
                          <Upload size={10} />
                          <span>Upload Font...</span>
                      </button>
                   </div>
                 )}
                 <input 
                    type="file" 
                    ref={fontInputRef} 
                    className="hidden" 
                    accept=".ttf,.woff,.woff2,.otf"
                    onChange={handleCustomFontUpload}
                 />
              </div>

              {/* Font Size Input */}
              <div className="flex items-center bg-dark-900/50 rounded-lg border border-dark-700/50 px-1">
                 <input 
                    type="number" 
                    className="w-10 bg-transparent text-xs text-white border-none focus:ring-0 p-1.5 text-center appearance-none"
                    value={activeElement?.fontSize ? parseInt(activeElement.fontSize) : 16}
                    onChange={(e) => updateSelectedStyle('fontSize', `${e.target.value}px`)}
                    min="8"
                    max="100"
                    title="Font Size (px)"
                 />
                 <span className="text-[10px] text-gray-500 pr-1">px</span>
              </div>
              
              {/* Color Palette */}
              <div className="relative" ref={colorMenuRef}>
                <button 
                  onClick={() => setShowColorMenu(!showColorMenu)}
                  className="flex items-center gap-1 px-2 py-1.5 bg-dark-900/50 border border-dark-700/50 rounded-lg text-xs text-gray-300 hover:text-white"
                  title="Text Color"
                >
                  <Palette size={12} />
                  <ChevronDown size={10} />
                </button>
                {showColorMenu && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-[60] p-2 animate-fade-in">
                      <div className="text-[10px] text-gray-500 font-bold mb-2 uppercase flex justify-between">
                         <span>Color Palette</span>
                         <span className="text-[9px] text-gray-600">Reset for Auto</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 mb-2">
                           {/* Reset / Auto Color (Eraser) */}
                           <button onClick={() => updateSelectedStyle('color', '')} className="w-6 h-6 rounded flex items-center justify-center border border-dark-600 bg-transparent text-gray-400 hover:text-white hover:bg-dark-700 transition" title="Auto / Reset Color"><Eraser size={14}/></button>
                           
                           {/* Standard Colors */}
                           <button onClick={() => updateSelectedStyle('color', '#000000')} className="w-6 h-6 rounded bg-black border border-dark-600 hover:scale-110 transition" title="Black"></button>
                           <button onClick={() => updateSelectedStyle('color', '#ffffff')} className="w-6 h-6 rounded bg-white border border-dark-600 hover:scale-110 transition" title="White"></button>
                           <button onClick={() => updateSelectedStyle('color', '#334155')} className="w-6 h-6 rounded bg-slate-700 border border-dark-600 hover:scale-110 transition" title="Slate"></button>
                           <button onClick={() => updateSelectedStyle('color', '#64748b')} className="w-6 h-6 rounded bg-slate-500 border border-dark-600 hover:scale-110 transition" title="Gray"></button>

                           {/* Brand Colors */}
                           <button onClick={() => updateSelectedStyle('color', '#F16F20')} className="w-6 h-6 rounded bg-[#F16F20] border border-dark-600 hover:scale-110 transition" title="Novartis Orange"></button>
                           <button onClick={() => updateSelectedStyle('color', '#0F766E')} className="w-6 h-6 rounded bg-[#0F766E] border border-dark-600 hover:scale-110 transition" title="Teal"></button>
                           <button onClick={() => updateSelectedStyle('color', '#1e3a8a')} className="w-6 h-6 rounded bg-blue-900 border border-dark-600 hover:scale-110 transition" title="Navy"></button>
                           
                           {/* Accents */}
                           <button onClick={() => updateSelectedStyle('color', '#dc2626')} className="w-6 h-6 rounded bg-red-600 border border-dark-600 hover:scale-110 transition" title="Red"></button>
                           
                           {/* Custom Picker Trigger */}
                           <div className="relative w-6 h-6 group">
                              <input 
                                  type="color" 
                                  ref={colorInputRef}
                                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10" 
                                  onChange={(e) => updateSelectedStyle('color', e.target.value)}
                              />
                              <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-violet-500 border border-dark-600 flex items-center justify-center group-hover:scale-110 transition">
                                  <Plus size={10} className="text-white" />
                              </div>
                           </div>
                      </div>
                  </div>
                )}
              </div>
           </div>
           
           <div className="h-6 w-px bg-dark-700/50 mx-2"></div>

           {/* Section 5: Insert / Replace */}
           <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageInsert}
              />
              <input 
                type="file" 
                ref={replaceImageRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageReplace}
              />

              {activeElement?.tagName === 'IMG' ? (
                 <button 
                    onClick={() => replaceImageRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 bg-brand-600/10 text-brand-400 hover:bg-brand-600 hover:text-white border border-brand-500/20 rounded-lg text-xs font-medium transition-all"
                 >
                    <RefreshCcw size={14} />
                    <span>Replace Image</span>
                 </button>
              ) : (
                 <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 bg-brand-600/10 text-brand-400 hover:bg-brand-600 hover:text-white border border-brand-500/20 rounded-lg text-xs font-medium transition-all"
                 >
                    <ImagePlus size={14} />
                    <span>Insert Image</span>
                 </button>
              )}
           </div>
        </div>
      )}

      {/* Main Preview */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden relative p-4 md:p-8 flex justify-center bg-dots-pattern">
            <div className={`transition-all duration-500 ease-in-out bg-white shadow-2xl ${getContainerWidth()} w-full h-full rounded-lg overflow-hidden ring-1 ring-dark-800 ${contentState.isEditable ? 'ring-2 ring-brand-500/50 scale-[0.98]' : ''}`}>
                {htmlContent ? (
                    <iframe
                        ref={iframeRef}
                        srcDoc={srcDoc}
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
