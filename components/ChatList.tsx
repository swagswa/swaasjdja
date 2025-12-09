import React, { useState } from 'react';
import { Card } from './ui/Card';
import { ChatDetail } from './ChatDetail';
import { MOCK_CHATS, MOCK_USERS } from '../constants';
import { Chat, User } from '../types';
import { Search, Filter, MessageCircle, MoreVertical, Smartphone } from 'lucide-react';

export const ChatList: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const getUser = (userId: string) => MOCK_USERS.find(u => u.id === userId);

  const filteredChats = MOCK_CHATS.filter(chat => {
    const user = getUser(chat.userId);
    const matchesSearch = user?.name.toLowerCase().includes(search.toLowerCase()) || 
                          chat.lastMessage.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || chat.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-[calc(100vh-2.5rem)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* List Column */}
      <Card className="w-full lg:w-1/3 flex flex-col h-full" noPadding>
        <div className="p-4 border-b border-white/5 space-y-4 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Inbox</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white">
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['all', 'active', 'waiting', 'resolved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all
                  ${filter === f 
                    ? 'bg-white text-black' 
                    : 'bg-neutral-900 text-neutral-500 hover:text-neutral-300 border border-white/5'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => {
            const user = getUser(chat.userId);
            if (!user) return null;
            
            const isSelected = selectedChat?.id === chat.id;
            
            return (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 relative group
                  ${isSelected ? 'bg-white/10 border-l-2 border-l-white' : 'border-l-2 border-l-transparent'}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${chat.status === 'active' ? 'bg-emerald-500' : chat.status === 'waiting' ? 'bg-amber-500' : 'bg-neutral-500'}`} />
                    <span className="font-medium text-sm text-white group-hover:text-white transition-colors">
                      {user.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {new Date(chat.lastTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                
                <p className="text-xs text-neutral-400 line-clamp-2 mb-2 group-hover:text-neutral-300 transition-colors">
                  {chat.lastMessage}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-white/5 flex items-center gap-1">
                    {chat.platform === 'telegram' ? <Smartphone size={10} /> : <MessageCircle size={10} />}
                    {chat.platform}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="ml-auto bg-white text-black text-[10px] font-bold px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detail Column */}
      <div className="hidden lg:block lg:w-2/3 h-full">
        {selectedChat ? (
          <ChatDetail chat={selectedChat} user={getUser(selectedChat.userId)!} onClose={() => setSelectedChat(null)} />
        ) : (
          <Card className="h-full flex flex-col items-center justify-center text-neutral-500" noPadding>
            <div className="p-6 bg-neutral-900/50 rounded-full mb-4 border border-white/5">
              <MessageCircle size={48} className="opacity-20" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Select a conversation</h3>
            <p className="text-sm max-w-xs text-center">
              Choose a chat from the list to view history, user details, and manage the session.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
