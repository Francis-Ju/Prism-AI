
import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Sparkles, User, Loader2, Plus, Menu, ScanEye, LayoutTemplate, ChevronDown, Zap, BrainCircuit, ArrowRight, Library, PanelRight, Palette, Edit2, RefreshCw, X, Check, Brain, Layers } from 'lucide-react';
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
  onLoadArtifact: (html: string) => void;
  hasArtifact?: boolean;
  currentTheme: 'prism' | 'novartis';
  onToggleTheme: () => void;
  onEditMessage: (messageId: string, newText: string) => void;
  onRetry: () => void;
  isThinkingEnabled: boolean;
  onToggleThinking: () => void;
}

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB

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
  onLoadArtifact,
  hasArtifact,
  currentTheme,
  onToggleTheme,
  onEditMessage,
  onRetry,
  isThinkingEnabled,
  onToggleThinking
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModelMenu, setShowModelMenu] = useState(false);
  
  // Editing state
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!editingMessageId) {
      scrollToBottom();
    }
  }, [messages, isCentered, editingMessageId]);

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
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert("文件过大，系统限制上传不超过 20MB 的文件。");
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear input
        }
        return;
      }
      setSelectedFile(file);
    }
  };

  const toggleModelMenu = () => setShowModelMenu(!showModelMenu);

  // Edit Handlers
  const startEditing = (msg: ChatMessage) => {
    setEditingMessageId(msg.id);
    setEditText(msg.text);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      onEditMessage(id, editText);
      setEditingMessageId(null);
      setEditText('');
    }
  };

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

         {/* Theme Toggle */}
         <button 
           onClick={onToggleTheme}
           className="p-2 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-dark-800 transition-colors"
           title={`Switch to ${currentTheme === 'prism' ? 'Light' : 'Dark'} Mode`}
         >
           <Palette size={20} />
         </button>
      </div>

      {/* Welcome Screen for Centered Mode */}
      {isCentered && messages.length <= 1 && (
        <div className="absolute top-[15%] left-0 w-full flex justify-center pointer-events-none z-0">
           <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl px-6">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-brand-500/30 mb-4">
               <Sparkles className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-4xl md:text-5xl font-display font-bold text-center text-white">
               今天我们可以 <span className="text-gradient">设计</span> 些什么?
             </h1>
             <p className="text-gray-400 text-lg text-center max-w-md">
               上传文档以进行分析，或描述需求愿景以生成长图文。
             </p>
           </div>
        </div>
      )}

      {/* Messages List */}
      <div className={messageListClasses}>
        {/* Content Wrapper for Centered Mode */}
        <div className={isCentered ? "max-w-3xl mx-auto space-y-8" : "space-y-6"}>
          {messages.filter(m => !(isCentered && m.id === 'welcome')).map((msg, index) => (
            <div key={msg.id} className={`group flex flex-col ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'} animate-slide-up`}>
              <div className="flex items-center space-x-2 mb-2 px-1">
                {msg.role === MessageRole.MODEL ? (
                  <div className={`w-6 h-6 rounded flex items-center justify-center shadow-md ${msg.isError ? 'bg-red-500/20 text-red-400' : 'bg-gradient-to-br from-brand-500 to-accent-500 text-white'}`}>
                    <Sparkles size={12} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded bg-dark-700 flex items-center justify-center">
                    <User size={12} className="text-gray-400" />
                  </div>
                )}
                <span className={`text-xs uppercase font-medium tracking-wider ${msg.isError ? 'text-red-400' : 'text-gray-500'}`}>
                  {msg.role === MessageRole.MODEL ? (msg.isError ? 'Error' : 'Prism') : 'You'}
                </span>
              </div>
              
              <div className={`max-w-[90%] md:max-w-[85%] rounded-2xl p-5 text-[15px] leading-relaxed shadow-lg backdrop-blur-sm relative ${
                msg.role === MessageRole.USER 
                  ? 'bg-dark-800 text-white rounded-tr-none border border-dark-700' 
                  : (msg.isError ? 'bg-red-950/30 border border-red-900/50 text-red-200 rounded-tl-none' : 'bg-dark-900/60 text-gray-200 rounded-tl-none border border-dark-800')
              }`}>
                
                {/* Editing Mode */}
                {editingMessageId === msg.id ? (
                  <div className="w-full min-w-[300px]">
                    <textarea 
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full bg-dark-950 border border-brand-500/50 rounded-lg p-3 text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                      rows={Math.max(3, editText.split('\n').length)}
                      autoFocus
                    />
                    <div className="flex items-center justify-end gap-2 mt-3">
                      <button 
                        onClick={cancelEditing}
                        className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-dark-700 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => saveEdit(msg.id)}
                        className="px-3 py-1.5 text-xs bg-brand-600 hover:bg-brand-500 text-white rounded-md transition-colors font-medium flex items-center gap-1"
                      >
                        <Check size={12} /> Save & Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Attachments */}
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
                          <span>Prism 分析</span>
                        </div>
                        <div className="text-sm text-gray-400 leading-relaxed italic">
                          {msg.thoughtProcess}
                        </div>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Recommended Templates Cards - Moved Above Generated Designs */}
                    {msg.recommendedTemplates && msg.recommendedTemplates.length > 0 && (
                      <div className="mt-5">
                         <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                            <Library size={14} />
                            Suggested Templates
                         </h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      </div>
                    )}

                    {/* Artifact Options (Cards) - Moved Below Suggested Templates */}
                    {msg.artifactOptions && msg.artifactOptions.length > 0 && (
                      <div className="mt-5 space-y-2">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                          <Layers size={14} />
                          Generated Designs ({msg.artifactOptions.length})
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {msg.artifactOptions.map((opt, idx) => (
                            <div 
                              key={opt.id || idx}
                              className="bg-dark-950/80 border border-dark-700 rounded-xl overflow-hidden cursor-pointer group hover:border-brand-500/50 hover:shadow-lg transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                onLoadArtifact(opt.htmlContent);
                              }}
                            >
                              <div className="p-4 flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                      <PanelRight size={20} />
                                   </div>
                                   <div>
                                      <h5 className="font-bold text-gray-200 text-sm group-hover:text-brand-300 transition-colors">{opt.title}</h5>
                                      <p className="text-xs text-gray-500 line-clamp-1">{opt.description}</p>
                                   </div>
                                 </div>
                                 <div className="p-2 rounded-full bg-dark-800 text-gray-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                   <ArrowRight size={16} />
                                 </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Icons (Hover only) */}
                    {!isProcessing && (
                      <div className={`absolute ${msg.role === MessageRole.USER ? '-left-10' : '-right-10'} top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2`}>
                        {msg.role === MessageRole.USER && (
                          <button 
                            onClick={() => startEditing(msg)}
                            className="p-2 bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700 rounded-full shadow-lg border border-dark-700 transition-all"
                            title="Edit message"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        
                        {msg.role === MessageRole.MODEL && (msg.isError || index === messages.length - 1) && (
                          <button 
                            onClick={onRetry}
                            className={`p-2 rounded-full shadow-lg border transition-all ${msg.isError ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500 hover:text-white' : 'bg-dark-800 text-gray-400 hover:text-brand-400 hover:bg-dark-700 border-dark-700'}`}
                            title="Retry response"
                          >
                            <RefreshCw size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </>
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
                          <Sparkles size={16} />
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

                   {/* Deep Thinking Toggle */}
                   <button 
                     onClick={onToggleThinking}
                     className={`p-2 rounded-xl transition-colors ${isThinkingEnabled ? 'text-brand-400 bg-brand-500/10' : 'text-gray-500 hover:text-gray-300'}`}
                     title={isThinkingEnabled ? "Deep Thinking Enabled" : "Deep Thinking Disabled"}
                   >
                     <Brain size={18} />
                   </button>

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
               Prism可能会有错误，仔细阅读生成的结果。
             </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
