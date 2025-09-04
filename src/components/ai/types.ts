export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: number;
  sources?: string[];
}

export interface AIResponse {
  content: string;
  sources?: string[];
}

export interface KnowledgeBaseItem {
  title: string;
  folder: string;
  subfolder?: string;
  keywords: string[];
  summary: string;
}