
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
  const [isThinkingEnabled, setIsThinkingEnabled] = useState(true);
  
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
      // EXCLUDE the last message we just added, as it's passed as 'prompt' to generateAgentResponse wrapper
      const historyForApi = messages.map(m => {
        const parts: any[] = [];
        if (m.attachments && m.attachments.length > 0) {
          m.attachments.forEach(att => {
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

      const response = await generateAgentResponse(
        fullPrompt, 
        historyForApi, 
        inlineData, 
        mimeType, 
        selectedModel, 
        isThinkingEnabled
      );

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: response.chatResponse,
        thoughtProcess: response.thoughtProcess,
        isThinking: false,
        artifactPreview: response.generatedHtml ? {
            title: "View Generated Artifact",
            description: "Click to expand the design panel"
        } : undefined,
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
        isError: true
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditMessage = async (messageId: string, newText: string) => {
    // 1. Find the index of the message being edited
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    // 2. Truncate history: Keep everything BEFORE this message
    const previousMessages = messages.slice(0, messageIndex);
    
    // 3. Create the updated user message
    const originalMessage = messages[messageIndex];
    const updatedMessage: ChatMessage = {
      ...originalMessage,
      text: newText,
      // We keep attachments from original unless logic changes to allow removing them
    };

    // 4. Update UI immediately
    const intermediateMessages = [...previousMessages, updatedMessage];
    setMessages(intermediateMessages);
    setIsProcessing(true);

    // 5. Re-trigger generation
    // We need to extract attachments from the edited message if they exist, to pass to API
    let inlineData: string | undefined;
    let mimeType: string | undefined;
    let fullPrompt = newText;

    if (updatedMessage.attachments && updatedMessage.attachments.length > 0) {
        const att = updatedMessage.attachments[0];
        // If it's text file, technically we should re-read it but here we assume 'text' in prompt was already enriched.
        // If it was an image, we need to pass it again.
        if (att.type.startsWith('image/') || att.type === 'application/pdf') {
             inlineData = att.data;
             mimeType = att.type;
        }
    }

    try {
        // Construct API history from previous messages
        const historyForApi = previousMessages.map(m => {
            const parts: any[] = [];
            if (m.attachments && m.attachments.length > 0) {
                m.attachments.forEach(att => {
                    if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                        parts.push({ inlineData: { mimeType: att.type, data: att.data } });
                    }
                });
            }
            parts.push({ text: m.text });
            return { role: m.role === MessageRole.USER ? 'user' : 'model', parts };
        });

        const response = await generateAgentResponse(
            fullPrompt, 
            historyForApi, 
            inlineData, 
            mimeType, 
            selectedModel,
            isThinkingEnabled
        );

        const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: MessageRole.MODEL,
            text: response.chatResponse,
            thoughtProcess: response.thoughtProcess,
            isThinking: false,
            artifactPreview: response.generatedHtml ? {
                title: "View Generated Artifact",
                description: "Click to expand the design panel"
            } : undefined,
            recommendedTemplates: response.recommendedTemplates
        };

        const finalMessages = [...intermediateMessages, aiMessage];
        setMessages(finalMessages);

        let newArtifactState = undefined;
        if (response.generatedHtml) {
            newArtifactState = { ...contentState, html: response.generatedHtml! };
            setContentState(newArtifactState);
            setShowArtifact(true);
        }
        updateCurrentSession(finalMessages, newArtifactState);

    } catch (error) {
        console.error("Error generating response after edit:", error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: MessageRole.MODEL,
            text: "I encountered a glitch while regenerating. Please try again.",
            isError: true
        }]);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleRetry = async () => {
     // Find the last user message to resend
     // We assume the error happened on the last model turn, so the last USER message is what we want.
     // OR if the last message is an error model message, we look before it.
     
     const reversed = [...messages].reverse();
     const lastUserMsg = reversed.find(m => m.role === MessageRole.USER);
     
     if (!lastUserMsg) return;

     // If the very last message is an error message, remove it.
     let currentHistory = [...messages];
     if (currentHistory[currentHistory.length - 1].role === MessageRole.MODEL && currentHistory[currentHistory.length - 1].isError) {
         currentHistory.pop();
     }
     
     // But wait, if we want to "Retry", we usually want to regenerate the response to the *last user message*.
     // So we should strip any model response that came AFTER that user message (if partial/error).
     const lastUserIndex = currentHistory.findIndex(m => m.id === lastUserMsg.id);
     if (lastUserIndex !== -1) {
         currentHistory = currentHistory.slice(0, lastUserIndex + 1);
     }
     
     // Set state to this clean history
     setMessages(currentHistory);
     setIsProcessing(true);

     // Trigger generation
     // Similar logic to edit: prompt is last user msg, history is everything before it
     const historyMessages = currentHistory.slice(0, -1);
     
     let inlineData: string | undefined;
     let mimeType: string | undefined;
     
     if (lastUserMsg.attachments && lastUserMsg.attachments.length > 0) {
         const att = lastUserMsg.attachments[0];
         if (att.type.startsWith('image/') || att.type === 'application/pdf') {
             inlineData = att.data;
             mimeType = att.type;
         }
     }

     try {
         const historyForApi = historyMessages.map(m => {
            const parts: any[] = [];
            if (m.attachments && m.attachments.length > 0) {
                m.attachments.forEach(att => {
                    if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                        parts.push({ inlineData: { mimeType: att.type, data: att.data } });
                    }
                });
            }
            parts.push({ text: m.text });
            return { role: m.role === MessageRole.USER ? 'user' : 'model', parts };
        });

        const response = await generateAgentResponse(
            lastUserMsg.text, 
            historyForApi, 
            inlineData, 
            mimeType, 
            selectedModel,
            isThinkingEnabled
        );

        const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: MessageRole.MODEL,
            text: response.chatResponse,
            thoughtProcess: response.thoughtProcess,
            isThinking: false,
            artifactPreview: response.generatedHtml ? {
                title: "View Generated Artifact",
                description: "Click to expand the design panel"
            } : undefined,
            recommendedTemplates: response.recommendedTemplates
        };

        const finalMessages = [...currentHistory, aiMessage];
        setMessages(finalMessages);

        let newArtifactState = undefined;
        if (response.generatedHtml) {
            newArtifactState = { ...contentState, html: response.generatedHtml! };
            setContentState(newArtifactState);
            setShowArtifact(true);
        }
        updateCurrentSession(finalMessages, newArtifactState);
     } catch (error) {
        console.error("Retry failed:", error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: MessageRole.MODEL,
            text: "Retry failed. Please try again.",
            isError: true
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
           onEditMessage={handleEditMessage}
           onRetry={handleRetry}
           isThinkingEnabled={isThinkingEnabled}
           onToggleThinking={() => setIsThinkingEnabled(!isThinkingEnabled)}
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
