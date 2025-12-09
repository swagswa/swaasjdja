export type Platform = 'telegram' | 'whatsapp' | 'messenger' | 'web';

export type ChatStatus = 'active' | 'resolved' | 'waiting';

export interface User {
  id: string;
  name: string;
  platformId: string;
  platform: Platform;
  avatar?: string;
  firstSeen: string;
  lastActive: string;
  messageCount: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  meta?: {
    tokens?: number;
    latency?: number;
  };
}

export interface Chat {
  id: string;
  userId: string;
  platform: Platform;
  lastMessage: string;
  lastTimestamp: string;
  status: ChatStatus;
  unreadCount: number;
  messages: Message[];
}

export interface SystemConfig {
  prompt: string;
  tone: string;
  typingDelay: number;
  maxTokens: number;
  contextRetention: boolean;
  apiKeys: {
    gemini: string;
    telegram: string;
    whatsapp: string;
  };
}
