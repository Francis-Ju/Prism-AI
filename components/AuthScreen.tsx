import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (username: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-dark-950 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="z-10 w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-brand-500/30 mb-6">
             <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold text-white mb-2 tracking-tight">Prism AI</h1>
          <p className="text-gray-400 text-lg text-center">Design Intelligence Interface</p>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-xl border border-dark-800 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2 ml-1">
                Identity
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-xl px-4 py-4 text-white placeholder-dark-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-lg"
                placeholder="Enter your alias..."
                autoComplete="off"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={!username.trim()}
              className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                username.trim() 
                  ? 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10 transform hover:-translate-y-0.5' 
                  : 'bg-dark-800 text-dark-600 cursor-not-allowed'
              }`}
            >
              <span>Enter System</span>
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-xs text-dark-700 font-mono">
          SECURE SESSION • v2.1.0
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;