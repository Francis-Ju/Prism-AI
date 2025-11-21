import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Sparkles, User, Loader2, Plus, Menu, ScanEye, LayoutTemplate, ChevronDown, Zap, BrainCircuit, ArrowRight, Library, PanelRight, ChevronUp } from 'lucide-react';
import { ChatMessage, MessageRole, ModelType } from '../types';

interface ChatSidebarProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, file?: File) => void;
  isProcessing: boolean;
  isCentered: boolean;
  showHistoryToggle: boolean;
  onToggleHistory: () => void;
  selectedModel: ModelType;
  onSelectModel: (model: ModelType) => void;
  onOpenTemplates: () => void;
  onApplyTemplate: (templateId: string) => void;
  onShowArtifact: () => void;
  hasArtifact?: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  messages, 
  onSendMessage, 
  isProcessing, 
  isCentered,
  showHistoryToggle,
  onToggleHistory,
  selectedModel,
  onSelectModel,
  onOpenTemplates,
  onApplyTemplate,
  onShowArtifact,
  hasArtifact
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModelMenu, setShowModelMenu] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isCentered]);

  const handleSend = () => {
    if ((!inputValue.trim() && !selectedFile) || isProcessing) return;
    onSendMessage(inputValue, selectedFile || undefined);
    setInputValue('');
    setSelectedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const toggleModelMenu = () => setShowModelMenu(!showModelMenu);

  // Refactored: Logic to separate outer container width from inner content width
  // When centered (Main view), outer container is w-full to let header span full width.
  // Inner content will be constrained to max-w-3xl.
  const containerClasses = isCentered 
    ? "flex flex-col h-full w-full transition-all duration-500 ease-in-out relative" 
    : "flex flex-col h-full w-full max-w-md min-w-[340px] border-r border-dark-800 bg-dark-950/50 transition-all duration-500 ease-in-out relative";

  const messageListClasses = isCentered
    ? "flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide w-full"
    : "flex-1 overflow-y-auto p-4 space-y-6 w-full";

  return (
    <div className={containerClasses}>
      {/* Header / Navigation - Spans full width now in centered mode */}
      <div className={`flex-none w-full p-5 flex items-center justify-between z-20 ${!isCentered ? 'bg-dark-950/80 backdrop-blur-md border-b border-dark-800' : ''}`}>
         <div className="flex items-center gap-3">
            {showHistoryToggle && (
              <button 
                onClick={onToggleHistory}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <Menu size={20} />
              </button>
            )}
            
            {!isCentered && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <h2 className="font-display font-bold text-white tracking-wide text-lg">Novartis Prism AI</h2>
              </div>
            )}
         </div>
      </div>

      {/* Welcome Screen for Centered Mode */}
      {isCentered && messages.length <= 1 && (
        <div className="absolute top-[15%] left-0 w-full flex justify-center pointer-events-none z-0">
           <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl px-6">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-brand-500/30 mb-4">
               <Sparkles className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-4xl md:text-5xl font-display font-bold text-center text-white">
               What shall we <span className="text-gradient">design</span> today?
             </h1>
             <p className="text-gray-400 text-lg text-center max-w-md">
               Upload a document to analyze or describe a vision to generate an interactive artifact.
             </p>
           </div>
        </div>
      )}

      {/* Messages List */}
      <div className={messageListClasses}>
        {/* Content Wrapper for Centered Mode */}
        <div className={isCentered ? "max-w-3xl mx-auto space-y-8" : "space-y-6"}>
          {messages.filter(m => !(isCentered && m.id === 'welcome')).map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'} animate-slide-up`}>
              <div className="flex items-center space-x-2 mb-2 px-1">
                {msg.role === MessageRole.MODEL ? (
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-md">
                    <Sparkles size={12} className="text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded bg-dark-700 flex items-center justify-center">
                    <User size={12} className="text-gray-400" />
                  </div>
                )}
                <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">{msg.role === MessageRole.MODEL ? 'Prism' : 'You'}</span>
              </div>
              
              <div className={`max-w-[90%] md:max-w-[85%] rounded-2xl p-5 text-[15px] leading-relaxed shadow-lg backdrop-blur-sm ${
                msg.role === MessageRole.USER 
                  ? 'bg-dark-800 text-white rounded-tr-none border border-dark-700' 
                  : 'bg-dark-900/60 text-gray-200 rounded-tl-none border border-dark-800'
              }`}>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-4 p-3 bg-dark-950/50 rounded-xl border border-dark-700 flex items-center space-x-3">
                    <div className="p-2 bg-brand-500/10 rounded-lg">
                      <FileText size={18} className="text-brand-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300 truncate">{msg.attachments[0].name}</span>
                  </div>
                )}

                {/* Thought Process Analysis Block */}
                {msg.thoughtProcess && (
                  <div className="mb-4 p-3 rounded-lg bg-dark-950/50 border border-dashed border-brand-500/30">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
                      <ScanEye size={14} />
                      <span>Prism Analysis</span>
                    </div>
                    <div className="text-sm text-gray-400 leading-relaxed italic">
                      {msg.thoughtProcess}
                    </div>
                  </div>
                )}

                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Recommended Templates Cards */}
                {msg.recommendedTemplates && msg.recommendedTemplates.length > 0 && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {msg.recommendedTemplates.map(t => (
                      <div 
                        key={t.id} 
                        className="bg-dark-950/80 border border-dark-700 rounded-xl p-4 hover:border-brand-500/50 transition-all cursor-pointer group shadow-sm hover:shadow-md hover:shadow-brand-900/20"
                        onClick={() => onApplyTemplate(t.id)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                           <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                             <LayoutTemplate size={16} />
                           </div>
                           <h4 className="font-semibold text-gray-200 text-sm group-hover:text-brand-300 transition-colors">{t.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{t.description}</p>
                        <button className="w-full py-2 bg-dark-800 hover:bg-brand-600 text-xs font-medium text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                          <span>Use Template</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Artifact Preview Card (If explicitly generated) - Moved into message bubble */}
                {msg.artifactPreview && (
                  <div 
                    className="mt-4 relative overflow-hidden rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-900/20 to-dark-900/50 group cursor-pointer hover:border-brand-500/60 hover:from-brand-900/30 transition-all shadow-lg shadow-black/20" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowArtifact();
                    }}
                  >
                     {/* Decorative top line */}
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-50"></div>
                     
                     <div className="p-4 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-dark-950/50 border border-brand-500/20 flex items-center justify-center text-brand-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                              <PanelRight size={22} />
                           </div>
                           <div>
                             <h4 className="font-bold text-white text-[15px] group-hover:text-brand-300 transition-colors">
                               {msg.artifactPreview.title}
                             </h4>
                             <p className="text-xs text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                               {msg.artifactPreview.description}
                             </p>
                           </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                           <ArrowRight size={16} />
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex items-start space-x-3 animate-pulse">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center opacity-50">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="flex items-center space-x-2 p-4">
                 <span className="text-sm text-gray-400 font-medium">Reasoning & Designing...</span>
              </div>
            </div>
          )}
        </div>
        {/* Spacer to ensure content doesn't hide behind sticky footer */}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Sticky Input Area */}
      <div className={`flex-none p-6 ${isCentered ? 'w-full' : 'bg-dark-950 border-t border-dark-800'} z-20 relative`}>
        
        {/* Centered Wrapper for Input */}
        <div className={isCentered ? "max-w-3xl mx-auto" : ""}>
          
          {/* Selected File Chip */}
          {selectedFile && (
            <div className="mb-3 px-4 py-2 bg-dark-800/80 backdrop-blur-sm rounded-lg flex items-center justify-between border border-dark-700 animate-slide-up w-fit">
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileText size={14} className="text-brand-400 flex-shrink-0" />
                <span className="text-sm text-gray-200 truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
              <button onClick={() => setSelectedFile(null)} className="ml-3 text-gray-500 hover:text-white transition-colors">
                &times;
              </button>
            </div>
          )}
          
          <div className={`relative flex flex-col bg-dark-800/50 border border-dark-700 rounded-2xl focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/50 transition-all shadow-xl backdrop-blur-xl ${isCentered ? 'p-3' : 'p-3'}`}>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              onChange={handleFileSelect}
              accept="image/*,.pdf,.pptx,.docx,.txt,.md,.json" 
            />
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Prism..."
              className={`w-full bg-transparent text-white text-[15px] p-2 ${isCentered ? 'min-h-[50px]' : 'min-h-[20px]'} resize-none focus:outline-none placeholder-gray-500 scrollbar-thumb-dark-700 scrollbar-track-transparent`}
            />

            {/* Toolbar Footer */}
            <div className="flex items-center justify-between mt-2 pt-2">
               
               {/* Left Actions */}
               <div className="flex items-center gap-2">
                   <button 
                     className="p-2 text-gray-400 hover:text-brand-400 transition-colors hover:bg-dark-700/50 rounded-xl"
                     onClick={() => fileInputRef.current?.click()}
                     title="Attach context"
                   >
                     <Plus size={20} />
                   </button>
                   
                   <div className="relative">
                       <button 
                         className="p-2 text-gray-400 hover:text-brand-400 transition-colors hover:bg-dark-700/50 rounded-xl flex items-center gap-1"
                         onClick={toggleModelMenu}
                         title="Select Model"
                       >
                          {selectedModel === 'gemini-2.5-flash' ? <Zap size={20} /> : <BrainCircuit size={20} />}
                          <ChevronDown size={12} />
                       </button>
                       {showModelMenu && (
                         <div className="absolute bottom-full left-0 mb-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden z-50">
                            <button 
                              onClick={() => { onSelectModel('gemini-2.5-flash'); setShowModelMenu(false); }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-700 transition-colors ${selectedModel === 'gemini-2.5-flash' ? 'text-brand-400 bg-dark-700/50' : 'text-gray-300'}`}
                            >
                              <Zap size={16} />
                              <div>
                                <div className="text-sm font-medium">Flash 2.5</div>
                                <div className="text-[10px] text-gray-500">Fast & Efficient</div>
                              </div>
                            </button>
                            <button 
                              onClick={() => { onSelectModel('gemini-3-pro-preview'); setShowModelMenu(false); }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-700 transition-colors ${selectedModel === 'gemini-3-pro-preview' ? 'text-brand-400 bg-dark-700/50' : 'text-gray-300'}`}
                            >
                              <BrainCircuit size={16} />
                              <div>
                                <div className="text-sm font-medium">Pro 3.0 (Preview)</div>
                                <div className="text-[10px] text-gray-500">Complex Reasoning</div>
                              </div>
                            </button>
                         </div>
                       )}
                   </div>

                   {/* Template Library Button */}
                   <button 
                     onClick={onOpenTemplates}
                     className="p-2 text-gray-400 hover:text-brand-400 transition-colors hover:bg-dark-700/50 rounded-xl"
                     title="Browse Templates"
                   >
                      <Library size={20} />
                   </button>
               </div>

               {/* Right Actions */}
               <button 
                  className={`p-3 rounded-xl transition-all duration-200 ${!inputValue.trim() && !selectedFile ? 'text-dark-600 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10'}`}
                  onClick={handleSend}
                  disabled={!inputValue.trim() && !selectedFile}
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
               </button>
            </div>

          </div>
          {isCentered && (
             <p className="mt-4 text-center text-xs text-gray-600">
               Prism can make mistakes. Review generated artifacts.
             </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;