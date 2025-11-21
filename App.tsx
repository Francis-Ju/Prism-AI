import React, { useState, useEffect } from 'react';
import ChatSidebar from './components/ChatSidebar';
import PreviewArea from './components/PreviewArea';
import AuthScreen from './components/AuthScreen';
import HistorySidebar from './components/HistorySidebar';
import TemplateLibrary from './components/TemplateLibrary';
import { ChatMessage, MessageRole, DeviceMode, GeneratedContentState, User, ChatSession, Template, ModelType } from './types';
import { generateAgentResponse } from './services/geminiService';
import { DEFAULT_TEMPLATES } from './constants';

// Helper to convert file to Base64 (for Images/PDFs)
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Helper to read file as Text (for Code/Text/Markdown)
const fileToText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const App: React.FC = () => {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(null);
  
  // --- App State ---
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>('gemini-3-pro-preview');
  
  // --- UI State ---
  const [showArtifact, setShowArtifact] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  // --- Theme State ---
  const [theme, setTheme] = useState<'prism' | 'novartis'>('prism');

  const [deviceMode, setDeviceMode] = useState<DeviceMode>(DeviceMode.TABLET);
  const [contentState, setContentState] = useState<GeneratedContentState>({
    html: '',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
    isEditable: false
  });

  // --- Initialization ---
  useEffect(() => {
    const storedUser = localStorage.getItem('prism_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      loadSessions(parsedUser.id);
    }

    const storedTheme = localStorage.getItem('prism_theme') as 'prism' | 'novartis';
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // --- Theme Effect ---
  useEffect(() => {
    document.body.className = theme === 'novartis' ? 'theme-novartis' : '';
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'prism' ? 'novartis' : 'prism';
    setTheme(newTheme);
    localStorage.setItem('prism_theme', newTheme);
  };

  // --- Session Management ---
  const loadSessions = (userId: string) => {
    const storedSessions = localStorage.getItem(`prism_sessions_${userId}`);
    if (storedSessions) {
      const parsed = JSON.parse(storedSessions);
      setSessions(parsed);
      if (parsed.length > 0) {
        // Start fresh by default to respect "New Project" feel
        startNewChat(false); 
      } else {
        startNewChat(false);
      }
    } else {
      startNewChat(false);
    }
  };

  const saveSessionsToStorage = (updatedSessions: ChatSession[]) => {
    if (!user) return;
    localStorage.setItem(`prism_sessions_${user.id}`, JSON.stringify(updatedSessions));
  };

  const startNewChat = (shouldResetUI = true) => {
    const newSessionId = Date.now().toString();
    const initialMessage: ChatMessage = {
        id: 'welcome',
        role: MessageRole.MODEL,
        text: "Welcome to Prism. I am your design intelligence agent.\n\nI can analyze documents or help you create stunning visual artifacts. How can I help you today?",
    };

    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Project',
      userId: user?.id || 'temp',
      messages: [initialMessage],
      lastModified: Date.now(),
      artifactState: undefined
    };

    if (shouldResetUI) {
        setSessions(prev => {
            const updated = [...prev, newSession];
            saveSessionsToStorage(updated);
            return updated;
        });
        setCurrentSessionId(newSessionId);
        setMessages([initialMessage]);
        setShowArtifact(false);
        setContentState({
            html: '',
            backgroundColor: '#ffffff',
            fontFamily: 'sans-serif',
            isEditable: false
        });
    } else {
        // Just set initial state for internal logic
        setMessages([initialMessage]);
        setCurrentSessionId(null); 
        // Fix: Ensure content state is reset on load to prevent ghost artifacts
        setContentState({
            html: '',
            backgroundColor: '#ffffff',
            fontFamily: 'sans-serif',
            isEditable: false
        });
    }
  };

  const handleLogin = (username: string) => {
    const newUser: User = {
      id: username.toLowerCase().replace(/\s+/g, '_'), 
      username: username,
      createdAt: Date.now()
    };
    localStorage.setItem('prism_user', JSON.stringify(newUser));
    setUser(newUser);
    loadSessions(newUser.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('prism_user');
    setUser(null);
    setSessions([]);
    setMessages([]);
    setShowArtifact(false);
    setCurrentSessionId(null);
  };

  const handleSelectSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      if (session.artifactState && session.artifactState.html) {
        setContentState(session.artifactState);
        setShowArtifact(true);
      } else {
        setShowArtifact(false);
        // Reset content state to avoid ghost artifact card from previous session
        setContentState({
          html: '',
          backgroundColor: '#ffffff',
          fontFamily: 'sans-serif',
          isEditable: false
        });
      }
    }
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== sessionId);
    setSessions(updated);
    saveSessionsToStorage(updated);
    if (currentSessionId === sessionId) {
      startNewChat();
    }
  };

  const updateCurrentSession = (newMessages: ChatMessage[], newArtifactState?: GeneratedContentState) => {
    if (!currentSessionId && user) {
        // If sending first message and no session selected/created properly
        const newId = Date.now().toString();
        const newSession: ChatSession = {
            id: newId,
            title: newMessages[newMessages.length - 1].text.slice(0, 30) + '...',
            userId: user.id,
            messages: newMessages,
            lastModified: Date.now(),
            artifactState: newArtifactState || contentState
        };
        setCurrentSessionId(newId);
        setSessions(prev => {
            const updated = [...prev, newSession];
            saveSessionsToStorage(updated);
            return updated;
        });
        return;
    }

    if (currentSessionId) {
      setSessions(prev => {
        const updated = prev.map(s => {
          if (s.id === currentSessionId) {
            let title = s.title;
            // Update title if it's the second message (User's first actual prompt) and title is default
            if (s.messages.length <= 1 && newMessages.length > 1 && s.title === 'New Project') {
                 const firstUserMsg = newMessages.find(m => m.role === MessageRole.USER);
                 if (firstUserMsg) title = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
            }
            
            return {
              ...s,
              messages: newMessages,
              lastModified: Date.now(),
              artifactState: newArtifactState || (showArtifact ? contentState : undefined),
              title
            };
          }
          return s;
        });
        saveSessionsToStorage(updated);
        return updated;
      });
    }
  };

  const handleSelectTemplate = (template: Template) => {
    // Load the template content directly into the editor state (for viewing/editing)
    const newArtifactState: GeneratedContentState = {
      html: template.htmlContent,
      backgroundColor: '#ffffff', 
      fontFamily: 'sans-serif',
      isEditable: false
    };

    setContentState(newArtifactState);
    setShowArtifact(true);

    // Update current session state without adding a chat message
    updateCurrentSession(messages, newArtifactState);
  };

  const handleApplyTemplate = async (templateId: string) => {
    // Find template by ID (check defaults then local storage)
    let template = DEFAULT_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      try {
        const stored = localStorage.getItem('prism_templates');
        if (stored) {
          const customTemplates: Template[] = JSON.parse(stored);
          template = customTemplates.find(t => t.id === templateId);
        }
      } catch (e) {
        // ignore error
      }
    }

    if (template) {
      // Trigger a chat message to generate content using this template
      // We attach the template HTML as a file context so the model knows exactly what structure to use
      const file = new File([template.htmlContent], `${template.name}.html`, { type: 'text/html' });
      
      await handleSendMessage(
        `Apply the "${template.name}" template style to the content we are working on. Use the structure provided in the attached file.`,
        file
      );
    } else {
      console.warn(`Template with ID ${templateId} not found`);
    }
  };

  // --- Message Handling ---
  const handleSendMessage = async (text: string, file?: File) => {
    // 1. Prepare Attachment Data
    let inlineData: string | undefined;
    let mimeType: string | undefined;
    let fullPrompt = text;

    if (file) {
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      const isTextFile = file.type.startsWith('text/') || 
                         file.name.match(/\.(json|md|txt|js|ts|tsx|jsx|css|html|htm|csv|xml|py)$/i);

      if (isImage || isPdf) {
        inlineData = await fileToBase64(file);
        mimeType = file.type;
      } else if (isTextFile) {
        try {
          const fileContent = await fileToText(file);
          fullPrompt = `${text}\n\n<AttachedFile name="${file.name}">\n${fileContent}\n</AttachedFile>`;
        } catch (e) {
           console.error("Failed to read text file", e);
           fullPrompt += `\n[System: Failed to read content of attached file ${file.name}]`;
        }
      } else {
         fullPrompt += `\n[System: User uploaded ${file.name}. Treat this as a file reference.]`;
      }
    }

    // 1. Update Local State with Message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: text,
      attachments: file ? [{
        name: file.name,
        type: file.type,
        data: inlineData || '' // Store data for history context
      }] : undefined
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsProcessing(true);
    
    updateCurrentSession(updatedMessages);

    try {
      // Construct History correctly using stored base64 data for context
      const historyForApi = updatedMessages.slice(0, -1).map(m => {
        const parts: any[] = [];
        if (m.attachments && m.attachments.length > 0) {
          m.attachments.forEach(att => {
            // Only re-send image/pdf data. Text files were already embedded in prompt text.
            if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
              parts.push({
                inlineData: {
                  mimeType: att.type,
                  data: att.data
                }
              });
            }
          });
        }
        parts.push({ text: m.text });
        
        return {
          role: m.role === MessageRole.USER ? 'user' : 'model',
          parts: parts
        };
      });

      // Call Gemini Service with selected Model
      // Pass inlineData explicitly for the CURRENT turn if it exists
      const response = await generateAgentResponse(fullPrompt, historyForApi, inlineData, mimeType, selectedModel);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: response.chatResponse,
        thoughtProcess: response.thoughtProcess,
        isThinking: false,
        // If HTML was generated, add a preview card to the message
        artifactPreview: response.generatedHtml ? {
            title: "View Generated Artifact",
            description: "Click to expand the design panel"
        } : undefined,
        // Map structured recommendation to message field
        recommendedTemplates: response.recommendedTemplates
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      let newArtifactState = undefined;
      if (response.generatedHtml) {
        newArtifactState = {
          ...contentState,
          html: response.generatedHtml!
        };
        setContentState(newArtifactState);
        setShowArtifact(true);
      }

      updateCurrentSession(finalMessages, newArtifactState);

    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: MessageRole.MODEL,
        text: "I encountered a glitch in the prism. Please try again.",
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-dark-950 text-white relative font-sans">
      
      {/* Background Ambient Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[120px] opacity-30"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* History Sidebar */}
      <HistorySidebar 
        sessions={sessions}
        currentSessionId={currentSessionId}
        user={user}
        onSelectSession={handleSelectSession}
        onNewChat={() => startNewChat(true)}
        onDeleteSession={handleDeleteSession}
        onLogout={handleLogout}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />

      <div className="flex-1 flex h-full relative z-10">
        {/* Chat Area */}
        <ChatSidebar 
           messages={messages}
           onSendMessage={handleSendMessage}
           isProcessing={isProcessing}
           isCentered={!showArtifact}
           showHistoryToggle={!showHistory}
           onToggleHistory={() => setShowHistory(true)}
           selectedModel={selectedModel}
           onSelectModel={setSelectedModel}
           onOpenTemplates={() => setShowTemplates(true)}
           onApplyTemplate={handleApplyTemplate}
           onShowArtifact={() => setShowArtifact(true)}
           hasArtifact={!!contentState.html}
           currentTheme={theme}
           onToggleTheme={toggleTheme}
        />

        {/* Preview Area */}
        {showArtifact && (
          <PreviewArea 
            htmlContent={contentState.html}
            deviceMode={deviceMode}
            onDeviceModeChange={setDeviceMode}
            backgroundColor={contentState.backgroundColor}
            contentState={contentState}
            onUpdateState={(updates) => setContentState(prev => ({ ...prev, ...updates }))}
            onClose={() => setShowArtifact(false)}
          />
        )}
      </div>

      <TemplateLibrary 
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
      
    </div>
  );
};

export default App;