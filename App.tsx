
import React, { useState, useEffect } from 'react';
import ChatSidebar from './components/ChatSidebar';
import PreviewArea from './components/PreviewArea';
import AuthScreen from './components/AuthScreen';
import HistorySidebar from './components/HistorySidebar';
import TemplateLibrary from './components/TemplateLibrary';
import { ChatMessage, MessageRole, DeviceMode, GeneratedContentState, User, ChatSession, Template, ModelType } from './types';
import { generateAgentResponse } from './services/geminiService';
import { DEFAULT_TEMPLATES } from './constants';
import { storage } from './services/storage';

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

// Helper to reliably get MIME type
const getMimeType = (file: File): string => {
  if (file.type) return file.type;
  
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'application/pdf';
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'webp') return 'image/webp';
  return 'application/octet-stream';
};

const App: React.FC = () => {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  
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
    const initApp = async () => {
      try {
        await storage.init();
        
        // Load User
        const storedUser = await storage.get<User>('prism_user');
        if (storedUser) {
          setUser(storedUser);
          await loadSessions(storedUser.id);
        }

        // Load Theme
        const storedTheme = await storage.get<string>('prism_theme');
        if (storedTheme && (storedTheme === 'prism' || storedTheme === 'novartis')) {
          setTheme(storedTheme as 'prism' | 'novartis');
        }
      } catch (e) {
        console.error("Initialization failed", e);
      } finally {
        setIsInitializing(false);
      }
    };
    
    initApp();
  }, []);

  // --- Theme Effect ---
  useEffect(() => {
    document.body.className = theme === 'novartis' ? 'theme-novartis' : '';
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'prism' ? 'novartis' : 'prism';
    setTheme(newTheme);
    await storage.set('prism_theme', newTheme);
  };

  // --- Session Management ---
  const loadSessions = async (userId: string) => {
    const storedSessions = await storage.get<ChatSession[]>(`prism_sessions_${userId}`);
    if (storedSessions) {
      setSessions(storedSessions);
      if (storedSessions.length > 0) {
        // Start fresh by default to respect "New Project" feel
        startNewChat(false); 
      } else {
        startNewChat(false);
      }
    } else {
      startNewChat(false);
    }
  };

  const saveSessionsToStorage = async (updatedSessions: ChatSession[]) => {
    if (!user) return;
    await storage.set(`prism_sessions_${user.id}`, updatedSessions);
  };

  const startNewChat = (shouldResetUI = true) => {
    const newSessionId = Date.now().toString();
    const initialMessage: ChatMessage = {
        id: 'welcome',
        role: MessageRole.MODEL,
        text: "欢迎来到Prism，我是您的设计智能代理。我可以分析文档，也可以帮您创建精美的视觉生产。今天我能为您提供什么帮助呢?",
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

  const handleLogin = async (username: string) => {
    const newUser: User = {
      id: username.toLowerCase().replace(/\s+/g, '_'), 
      username: username,
      createdAt: Date.now()
    };
    await storage.set('prism_user', newUser);
    setUser(newUser);
    loadSessions(newUser.id);
  };

  const handleLogout = async () => {
    await storage.delete('prism_user');
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

  // Refactored to allow explicit session ID management for async flows
  const updateCurrentSession = (
    newMessages: ChatMessage[], 
    sessionId: string | null, 
    newArtifactState?: GeneratedContentState
  ): string => {
    if (!user) return '';
    
    let targetId = sessionId;

    // Case 1: Create New Session (if no ID provided)
    if (!targetId) {
        const newId = Date.now().toString();
        
        let title = 'New Project';
        // Try to generate a better title from the first user message if available
        const firstUserMsg = newMessages.find(m => m.role === MessageRole.USER);
        if (firstUserMsg) {
             title = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
        }

        const newSession: ChatSession = {
            id: newId,
            title: title,
            userId: user.id,
            messages: newMessages,
            lastModified: Date.now(),
            artifactState: newArtifactState || contentState
        };
        
        // Update state
        setCurrentSessionId(newId);
        setSessions(prev => {
            const updated = [...prev, newSession];
            saveSessionsToStorage(updated);
            return updated;
        });
        
        return newId;
    }

    // Case 2: Update Existing Session
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === targetId) {
          let title = s.title;
          // Update title if it's "New Project" and we have user messages now
          if (s.title === 'New Project') {
               const firstUserMsg = newMessages.find(m => m.role === MessageRole.USER);
               if (firstUserMsg) {
                   title = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
               }
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
    
    return targetId;
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
    updateCurrentSession(messages, currentSessionId, newArtifactState);
  };

  const handleApplyTemplate = async (templateId: string) => {
    // Find template by ID (check defaults then local storage)
    let template = DEFAULT_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      try {
        const stored = await storage.get<Template[]>('prism_templates');
        if (stored) {
          template = stored.find(t => t.id === templateId);
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

  const handleLoadArtifact = (html: string) => {
    const newArtifactState = {
      ...contentState,
      html: html
    };
    setContentState(newArtifactState);
    setShowArtifact(true);
    // Update session state as well so it persists if user navigates away and back
    updateCurrentSession(messages, currentSessionId, newArtifactState);
  };

  // --- Message Handling ---
  const handleSendMessage = async (text: string, file?: File) => {
    // START PROCESSING IMMEDIATELY to prevent UI hang/no response feeling
    setIsProcessing(true);

    // Safety Check: Limit file size to 20MB to prevent browser crash/white screen during read
    if (file && file.size > 20 * 1024 * 1024) {
       setMessages(prev => [
         ...prev, 
         {
           id: Date.now().toString(),
           role: MessageRole.USER,
           text: text,
           attachments: [{ name: file.name, type: file.type || 'application/octet-stream', data: '' }] 
         },
         {
           id: (Date.now() + 1).toString(),
           role: MessageRole.MODEL,
           text: "文件处理失败：文件大小超过 20MB 限制。请上传较小的文件以避免系统卡顿。",
           isError: true
         }
       ]);
       setIsProcessing(false);
       return;
    }

    // Capture locally for catch block access
    let updatedMessages: ChatMessage[] = [];
    // FIX: Use local variable activeSessionId. 
    // If currentSessionId is null (New Project), updateCurrentSession will return the NEW ID.
    // We must capture it to use after the await call below.
    let activeSessionId = currentSessionId;

    try {
      // 1. Prepare Attachment Data
      let inlineData: string | undefined;
      let mimeType: string | undefined;
      // Default prompt if empty but file exists to satisfy API requirements
      let fullPrompt = text.trim() === '' && file ? "Please analyze this document." : text;

      if (file) {
        const determinedMimeType = getMimeType(file);
        const isImage = determinedMimeType.startsWith('image/');
        const isPdf = determinedMimeType === 'application/pdf';
        // Treat these as text if not PDF/Image
        const isTextFile = !isImage && !isPdf && (
            determinedMimeType.startsWith('text/') || 
            file.name.match(/\.(json|md|txt|js|ts|tsx|jsx|css|html|htm|csv|xml|py)$/i)
        );

        if (isImage || isPdf) {
          try {
             inlineData = await fileToBase64(file);
             mimeType = determinedMimeType;
          } catch (e) {
             console.error("Failed to read file:", e);
             fullPrompt += `\n[System Error: Could not read file ${file.name}]`;
          }
        } else if (isTextFile) {
          try {
            const fileContent = await fileToText(file);
            fullPrompt = `${fullPrompt}\n\n<AttachedFile name="${file.name}">\n${fileContent}\n</AttachedFile>`;
          } catch (e) {
             console.error("Failed to read text file", e);
             fullPrompt += `\n[System: Failed to read content of attached file ${file.name}]`;
          }
        } else {
           fullPrompt += `\n[System: User uploaded ${file.name}. Treat this as a file reference.]`;
        }
      }

      // 2. Update Local State with Message
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: MessageRole.USER,
        text: text, // Display original text to user, even if empty
        attachments: file ? [{
          name: file.name,
          type: file.type || 'application/octet-stream',
          data: inlineData || '' // Store data for history context
        }] : undefined
      };

      // Update UI with user message
      updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      activeSessionId = updateCurrentSession(updatedMessages, activeSessionId);

      // 3. Construct API Call
      // Construct History correctly using stored base64 data for context
      // EXCLUDE the last message we just added, as it's passed as 'prompt' to generateAgentResponse wrapper
      const historyForApi = messages.map((m, index) => {
        // MEMORY & STABILITY OPTIMIZATION:
        // Do not send heavy base64 data for old messages. 
        // Only keep 'Heavy' attachments (> 200KB) if they are from the IMMEDIATE previous turn (index == last).
        // This prevents the request payload from ballooning to 50MB+ causing XHR/500 crashes.
        
        const isLastMessage = index === messages.length - 1;
        
        const parts: any[] = [];
        if (m.attachments && m.attachments.length > 0) {
          m.attachments.forEach(att => {
             // Only include inlineData if it's the most recent interaction OR if it's very small (< 200KB)
             const isSmall = att.data.length < 200 * 1024;
             
             if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                if (isLastMessage || isSmall) {
                   parts.push({
                     inlineData: {
                       mimeType: att.type,
                       data: att.data
                     }
                   });
                } else {
                   // Pruned marker to save memory and prevent XHR crashes
                   parts.push({ text: `[System: Attachment ${att.name} pruned to save memory. Refer to previous analysis.]` });
                }
             }
          });
        }
        parts.push({ text: m.text || " " }); // Ensure no empty text parts in history
        
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
        artifactOptions: response.generatedArtifacts,
        recommendedTemplates: response.recommendedTemplates
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      let newArtifactState = undefined;
      
      // Auto-open if only one artifact is generated
      if (response.generatedArtifacts && response.generatedArtifacts.length === 1) {
        newArtifactState = {
          ...contentState,
          html: response.generatedArtifacts[0].htmlContent
        };
        setContentState(newArtifactState);
        setShowArtifact(true);
      }

      // Use the stable activeSessionId here
      updateCurrentSession(finalMessages, activeSessionId, newArtifactState);

    } catch (error: any) {
      console.error("Error generating response:", error);
      
      let errorText = "I encountered a glitch in the prism. Please try again.";
      // Customize error message for better UX
      if (error.message?.includes('401') || error.status === 401) {
          errorText = error.message || "Authentication failed. The API Key may be invalid.";
      } else if (error.message?.includes('500') || error.status === 500 || error.message?.includes('xhr')) {
          errorText = "Connection error. The document might be too large or the server is momentarily overloaded. I have already tried retrying, but please try uploading a smaller file or trying again in a moment.";
      } else if (error.message?.includes('429')) {
          errorText = "We are sending requests too quickly. Please wait a moment.";
      }

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: MessageRole.MODEL,
        text: errorText,
        isError: true
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      // Update session even on error to prevent session fragmentation
      updateCurrentSession(finalMessages, activeSessionId);

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

    try {
        // We need to extract attachments from the edited message if they exist, to pass to API
        let inlineData: string | undefined;
        let mimeType: string | undefined;
        let fullPrompt = newText;

        if (updatedMessage.attachments && updatedMessage.attachments.length > 0) {
            const att = updatedMessage.attachments[0];
            // If it's text file, technically we should re-read it but here we assume 'text' in prompt was already enriched.
            // If it was an image, we need to pass it again.
            if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                 inlineData = att.data;
                 mimeType = att.type;
            }
        }

        // Construct API history from previous messages
        // Apply pruning logic here as well
        const historyForApi = previousMessages.map((m, index) => {
            const isLastMessage = index === previousMessages.length - 1;
            const parts: any[] = [];
            if (m.attachments && m.attachments.length > 0) {
                m.attachments.forEach(att => {
                    const isSmall = att.data.length < 200 * 1024;
                    if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                        if (isLastMessage || isSmall) {
                            parts.push({ inlineData: { mimeType: att.type, data: att.data } });
                        } else {
                            parts.push({ text: `[Attachment pruned]` });
                        }
                    }
                });
            }
            parts.push({ text: m.text || " " });
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
            artifactOptions: response.generatedArtifacts,
            recommendedTemplates: response.recommendedTemplates
        };

        const finalMessages = [...intermediateMessages, aiMessage];
        setMessages(finalMessages);

        let newArtifactState = undefined;
        if (response.generatedArtifacts && response.generatedArtifacts.length === 1) {
            newArtifactState = { ...contentState, html: response.generatedArtifacts[0].htmlContent };
            setContentState(newArtifactState);
            setShowArtifact(true);
        }
        
        // Pass currentSessionId explicitly
        updateCurrentSession(finalMessages, currentSessionId, newArtifactState);

    } catch (error: any) {
        console.error("Error generating response after edit:", error);
        
        let errorText = "I encountered a glitch while regenerating. Please try again.";
        if (error.message?.includes('500') || error.message?.includes('xhr')) {
             errorText = "Connection error. The content might be too large. Please try again.";
        }

        const errorMessage: ChatMessage = {
            id: Date.now().toString(),
            role: MessageRole.MODEL,
            text: errorText,
            isError: true
        };
        const finalMessages = [...intermediateMessages, errorMessage];
        setMessages(finalMessages);
        // Persist error state
        updateCurrentSession(finalMessages, currentSessionId);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleRetry = async () => {
     // Find the last user message to resend
     const reversed = [...messages].reverse();
     const lastUserMsg = reversed.find(m => m.role === MessageRole.USER);
     
     if (!lastUserMsg) return;

     // If the very last message is an error message, remove it.
     let currentHistory = [...messages];
     if (currentHistory[currentHistory.length - 1].role === MessageRole.MODEL && currentHistory[currentHistory.length - 1].isError) {
         currentHistory.pop();
     }
     
     // Strip any model response that came AFTER that user message
     const lastUserIndex = currentHistory.findIndex(m => m.id === lastUserMsg.id);
     if (lastUserIndex !== -1) {
         currentHistory = currentHistory.slice(0, lastUserIndex + 1);
     }
     
     // Set state to this clean history
     setMessages(currentHistory);
     setIsProcessing(true);

     try {
         const historyMessages = currentHistory.slice(0, -1);
         
         let inlineData: string | undefined;
         let mimeType: string | undefined;
         
         if (lastUserMsg.attachments && lastUserMsg.attachments.length > 0) {
             const att = lastUserMsg.attachments[0];
             if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                 inlineData = att.data;
                 mimeType = att.type;
             }
         }

         const historyForApi = historyMessages.map((m, index) => {
            const isLastMessage = index === historyMessages.length - 1;
            const parts: any[] = [];
            if (m.attachments && m.attachments.length > 0) {
                m.attachments.forEach(att => {
                    const isSmall = att.data.length < 200 * 1024;
                    if ((att.type.startsWith('image/') || att.type === 'application/pdf') && att.data) {
                         if (isLastMessage || isSmall) {
                            parts.push({ inlineData: { mimeType: att.type, data: att.data } });
                        } else {
                            parts.push({ text: `[Attachment pruned]` });
                        }
                    }
                });
            }
            parts.push({ text: m.text || " " });
            return { role: m.role === MessageRole.USER ? 'user' : 'model', parts };
        });

        const response = await generateAgentResponse(
            lastUserMsg.text || "Retry", 
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
            artifactOptions: response.generatedArtifacts,
            recommendedTemplates: response.recommendedTemplates
        };

        const finalMessages = [...currentHistory, aiMessage];
        setMessages(finalMessages);

        let newArtifactState = undefined;
        if (response.generatedArtifacts && response.generatedArtifacts.length === 1) {
            newArtifactState = { ...contentState, html: response.generatedArtifacts[0].htmlContent };
            setContentState(newArtifactState);
            setShowArtifact(true);
        }
        
        // Pass currentSessionId explicitly
        updateCurrentSession(finalMessages, currentSessionId, newArtifactState);
     } catch (error: any) {
        console.error("Retry failed:", error);
        
        let errorText = "Retry failed. Please try again.";
        if (error.message?.includes('500') || error.message?.includes('xhr')) {
             errorText = "Connection error. The server is overwhelmed or content is too large.";
        }

        const errorMessage: ChatMessage = {
            id: Date.now().toString(),
            role: MessageRole.MODEL,
            text: errorText,
            isError: true
        };
        const finalMessages = [...currentHistory, errorMessage];
        setMessages(finalMessages);
        // Persist error state
        updateCurrentSession(finalMessages, currentSessionId);
     } finally {
        setIsProcessing(false);
     }
  };

  if (isInitializing) {
    return <div className="h-screen w-screen bg-dark-950 text-white flex items-center justify-center">Initializing Prism...</div>;
  }

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
           onLoadArtifact={handleLoadArtifact}
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
