import React from 'react';
import { MessageSquare, Plus, Clock, Trash2, LogOut, PanelLeftClose } from 'lucide-react';
import { ChatSession, User } from '../types';

interface HistorySidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  user: User;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (e: React.MouseEvent, sessionId: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  sessions,
  currentSessionId,
  user,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onLogout,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`fixed lg:relative z-50 h-full bg-dark-950 border-r border-dark-800 w-[280px] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-none lg:overflow-hidden'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-dark-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-xs font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-medium text-white leading-none mb-1">{user.username}</span>
               <span className="text-[10px] text-gray-500 uppercase tracking-wider">Pro Plan</span>
            </div>
          </div>
          
          {/* Collapse Button */}
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
            title="Collapse Sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button 
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 text-white py-3 rounded-xl border border-dark-700 transition-all group"
          >
            <Plus size={18} className="text-brand-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">New Project</span>
          </button>
        </div>

        {/* Session List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Recent Artifacts
          </div>
          
          {sessions.length === 0 ? (
             <div className="px-4 py-8 text-center">
               <Clock size={24} className="mx-auto text-dark-700 mb-2" />
               <p className="text-sm text-dark-600">No history yet</p>
             </div>
          ) : (
            sessions.sort((a, b) => b.lastModified - a.lastModified).map(session => (
              <div 
                key={session.id}
                onClick={() => {
                  onSelectSession(session.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors relative ${currentSessionId === session.id ? 'bg-dark-800/80 text-white' : 'text-gray-400 hover:bg-dark-900 hover:text-gray-200'}`}
              >
                <MessageSquare size={16} className={currentSessionId === session.id ? 'text-brand-400' : 'text-dark-600'} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{session.title}</h4>
                  <p className="text-[10px] text-gray-600 truncate">
                    {new Date(session.lastModified).toLocaleDateString()}
                  </p>
                </div>
                
                <button 
                  onClick={(e) => onDeleteSession(e, session.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-all absolute right-2"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-white hover:bg-dark-800 rounded-lg transition-colors text-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;