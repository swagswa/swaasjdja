import { Chat, User, SystemConfig } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alice Freeman',
    platformId: '@alice_free',
    platform: 'telegram',
    firstSeen: '2023-11-01T10:00:00Z',
    lastActive: '2023-12-15T09:30:00Z',
    messageCount: 142,
  },
  {
    id: 'u2',
    name: 'Bob Chen',
    platformId: '+14155550199',
    platform: 'whatsapp',
    firstSeen: '2023-12-05T14:20:00Z',
    lastActive: '2023-12-15T09:15:00Z',
    messageCount: 45,
  },
  {
    id: 'u3',
    name: 'Charlie Davis',
    platformId: 'charlie.d',
    platform: 'messenger',
    firstSeen: '2023-10-20T11:00:00Z',
    lastActive: '2023-12-14T18:00:00Z',
    messageCount: 89,
  },
  {
    id: 'u4',
    name: 'Dana Scully',
    platformId: '@trustno1',
    platform: 'telegram',
    firstSeen: '2023-09-01T08:00:00Z',
    lastActive: '2023-12-15T08:45:00Z',
    messageCount: 312,
  }
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    userId: 'u1',
    platform: 'telegram',
    lastMessage: 'I need help with my recent order #12345',
    lastTimestamp: '2023-12-15T09:30:00Z',
    status: 'active',
    unreadCount: 1,
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi, are you there?', timestamp: '2023-12-15T09:28:00Z' },
      { id: 'm2', sender: 'bot', text: 'Hello Alice! Yes, I am here. How can I assist you today?', timestamp: '2023-12-15T09:28:05Z' },
      { id: 'm3', sender: 'user', text: 'I need help with my recent order #12345', timestamp: '2023-12-15T09:30:00Z' },
    ]
  },
  {
    id: 'c2',
    userId: 'u2',
    platform: 'whatsapp',
    lastMessage: 'Thanks, that solved it!',
    lastTimestamp: '2023-12-15T09:15:00Z',
    status: 'resolved',
    unreadCount: 0,
    messages: [
      { id: 'm4', sender: 'user', text: 'My login is not working.', timestamp: '2023-12-15T09:00:00Z' },
      { id: 'm5', sender: 'bot', text: 'Have you tried resetting your password using the "Forgot Password" link?', timestamp: '2023-12-15T09:01:00Z' },
      { id: 'm6', sender: 'user', text: 'Ah, I missed that. Trying now.', timestamp: '2023-12-15T09:05:00Z' },
      { id: 'm7', sender: 'user', text: 'Thanks, that solved it!', timestamp: '2023-12-15T09:15:00Z' },
    ]
  },
  {
    id: 'c3',
    userId: 'u3',
    platform: 'messenger',
    lastMessage: 'Is there a discount available?',
    lastTimestamp: '2023-12-14T18:00:00Z',
    status: 'waiting',
    unreadCount: 0,
    messages: [
      { id: 'm8', sender: 'user', text: 'Hello', timestamp: '2023-12-14T17:55:00Z' },
      { id: 'm9', sender: 'bot', text: 'Hi Charlie! Welcome to Nexus.', timestamp: '2023-12-14T17:55:05Z' },
      { id: 'm10', sender: 'user', text: 'Is there a discount available?', timestamp: '2023-12-14T18:00:00Z' },
    ]
  },
  {
    id: 'c4',
    userId: 'u4',
    platform: 'telegram',
    lastMessage: 'Can I speak to a human?',
    lastTimestamp: '2023-12-15T08:45:00Z',
    status: 'active',
    unreadCount: 2,
    messages: [
      { id: 'm11', sender: 'user', text: 'This answer is confusing.', timestamp: '2023-12-15T08:40:00Z' },
      { id: 'm12', sender: 'bot', text: 'I apologize for the confusion. Could you clarify which part is unclear?', timestamp: '2023-12-15T08:40:30Z' },
      { id: 'm13', sender: 'user', text: 'Can I speak to a human?', timestamp: '2023-12-15T08:45:00Z' },
    ]
  }
];

export const DEFAULT_CONFIG: SystemConfig = {
  prompt: "You are Nexus, a helpful and intelligent AI support assistant. Your goal is to solve user problems efficiently while maintaining a professional yet approachable tone.",
  tone: "Professional",
  typingDelay: 800,
  maxTokens: 2048,
  contextRetention: true,
  apiKeys: {
    gemini: "",
    telegram: "",
    whatsapp: "",
  }
};
