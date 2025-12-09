import React from 'react';
import { Chat, User } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  X, 
  Send, 
  MoreHorizontal, 
  User as UserIcon, 
  Clock, 
  Hash 
} from 'lucide-react';

interface ChatDetailProps {
  chat: Chat;
  user: User;
  onClose?: () => void;
}

export const ChatDetail: React.FC<ChatDetailProps> = ({ chat, user, onClose }) => {
  return (
    <Card className="h-full flex flex-col animate-in fade-in duration-300" noPadding>
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center">
            <span className="font-semibold text-lg text-white">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-medium text-white flex items-center gap-2">
              {user.name}
              <span className={`w-2 h-2 rounded-full ${chat.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-500'}`}></span>
            </h3>
            <div className="flex items-center gap-3 text-xs text-neutral-500">
               <span className="flex items-center gap-1"><Hash size={10} /> {user.platform}</span>
               <span className="flex items-center gap-1"><Clock size={10} /> Seen {new Date(user.lastActive).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" icon={<MoreHorizontal size={18} />}>
            Actions
           </Button>
           {onClose && (
             <button onClick={onClose} className="lg:hidden p-2 text-neutral-400 hover:text-white">
               <X size={20} />
             </button>
           )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/40">
        {chat.messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] group`}>
                <div className="flex items-end gap-2 mb-1">
                   {!isBot && <span className="text-[10px] text-neutral-500 ml-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>}
                   <span className={`text-xs font-medium ${isBot ? 'text-white ml-auto' : 'text-neutral-400'}`}>
                     {isBot ? 'Nexus AI' : user.name}
                   </span>
                   {isBot && <span className="text-[10px] text-neutral-500 mr-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>}
                </div>
                
                <div 
                  className={`
                    p-4 rounded-2xl text-sm leading-relaxed relative
                    ${isBot 
                      ? 'bg-white text-black rounded-tr-sm' 
                      : 'bg-neutral-900 border border-white/10 text-neutral-200 rounded-tl-sm'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area (Read-only for Admin, but implies capability to intervene) */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
        <div className="relative flex items-center gap-2">
           <div className="flex-1 relative">
             <input 
              type="text" 
              placeholder="Type to intervene or add note..."
              className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-neutral-600"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors">
              <Send size={14} />
            </button>
           </div>
        </div>
        <div className="mt-2 flex justify-between items-center text-[10px] text-neutral-600 px-1">
           <span>Pressing Enter will send as <strong className="text-neutral-400">Human Operator</strong></span>
           <span>Bot Status: <span className="text-emerald-500">Auto-Reply ON</span></span>
        </div>
      </div>
    </Card>
  );
};
