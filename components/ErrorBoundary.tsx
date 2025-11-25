
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-zinc-950 text-white p-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
              The application encountered an unexpected error. This usually happens when processing very large files or complex data.
            </p>
            <div className="p-3 bg-black/30 rounded-lg mb-6 text-xs font-mono text-red-300 overflow-hidden text-left">
              {this.state.error?.message || "Unknown Error"}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
