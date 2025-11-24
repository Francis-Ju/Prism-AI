
export enum DeviceMode {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface RecommendedTemplate {
  id: string;
  name: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  thoughtProcess?: string;
  attachments?: {
    name: string;
    type: string;
    data: string; // Base64
  }[];
  isThinking?: boolean;
  isError?: boolean;
  artifactPreview?: {
    title: string;
    description: string;
  };
  recommendedTemplates?: RecommendedTemplate[];
}

export interface GeneratedContentState {
  html: string;
  backgroundColor: string;
  fontFamily: string;
  isEditable: boolean; // Toggle for text editing
}

export interface Template {
  id: string;
  name: string;
  description: string;
  htmlContent: string;
  category: string; // e.g., 'Landing Page', 'Report', 'Newsletter'
}

export interface User {
  id: string;
  username: string;
  createdAt: number;
}

export interface ChatSession {
  id: string;
  title: string;
  userId: string;
  messages: ChatMessage[];
  lastModified: number;
  artifactState?: GeneratedContentState;
}

export type ModelType = 'gemini-2.5-flash' | 'gemini-3-pro-preview';