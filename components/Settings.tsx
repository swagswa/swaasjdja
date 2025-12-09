import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { DEFAULT_CONFIG } from '../constants';
import { 
  Save, 
  RefreshCw, 
  Key, 
  MessageSquare, 
  Sliders, 
  CheckCircle, 
  Smartphone, 
  Globe, 
  Zap,
  Trash2,
  X,
  Plus
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isSaved, setIsSaved] = useState(false);
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  const [tempToken, setTempToken] = useState('');

  const handleSave = () => {
    // Simulate API call
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleConnect = (channel: 'telegram' | 'whatsapp') => {
    setEditingChannel(channel);
    setTempToken(config.apiKeys[channel] || '');
  };

  const saveChannel = (channel: 'telegram' | 'whatsapp') => {
    setConfig(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [channel]: tempToken
      }
    }));
    setEditingChannel(null);
    setTempToken('');
  };

  const disconnectChannel = (channel: 'telegram' | 'whatsapp') => {
    if (confirm('Are you sure you want to disconnect this account? The bot will stop responding on this platform.')) {
      setConfig(prev => ({
        ...prev,
        apiKeys: {
          ...prev.apiKeys,
          [channel]: ''
        }
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="flex items-center justify-between sticky top-0 z-40 bg-black/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Configuration</h1>
          <p className="text-neutral-500 text-sm">Manage bot behavior, API keys, and system parameters.</p>
        </div>
        <Button 
          onClick={handleSave} 
          icon={isSaved ? <CheckCircle size={18} /> : <Save size={18} />}
          className={isSaved ? "bg-emerald-500 hover:bg-emerald-600 text-black transition-colors" : ""}
        >
          {isSaved ? "Changes Saved" : "Save Changes"}
        </Button>
      </div>

      {/* Channels & Integrations Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="text-neutral-400" size={20} />
          <h2 className="text-lg font-medium text-white">Channels & Integrations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram Card */}
          <Card className={`transition-all duration-300 ${config.apiKeys.telegram ? 'border-emerald-500/20 bg-emerald-900/5' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${config.apiKeys.telegram ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-white'}`}>
                  <Zap size={20} fill={config.apiKeys.telegram ? "currentColor" : "none"} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Telegram</h3>
                  <p className="text-xs text-neutral-500">Bot API Integration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 {config.apiKeys.telegram && (
                   <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                 )}
              </div>
            </div>

            {editingChannel === 'telegram' ? (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div>
                   <label className="block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wide">Bot Token</label>
                   <input 
                    type="text" 
                    value={tempToken}
                    onChange={(e) => setTempToken(e.target.value)}
                    placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 font-mono"
                    autoFocus
                  />
                  <p className="text-[10px] text-neutral-600 mt-2">
                    Enter the token provided by <a href="#" className="text-neutral-400 hover:text-white underline">@BotFather</a>.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveChannel('telegram')} className="w-full bg-white text-black hover:bg-neutral-200">
                    Connect Bot
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingChannel(null)} className="px-3">
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {config.apiKeys.telegram ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-black/30 rounded-lg border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-mono text-neutral-400">
                        {config.apiKeys.telegram.substring(0, 8)}••••••••••••••••
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                    </div>
                    <div className="flex gap-2">
                       <Button size="sm" variant="secondary" className="flex-1" onClick={() => handleConnect('telegram')}>
                         Configure
                       </Button>
                       <Button size="sm" variant="danger" onClick={() => disconnectChannel('telegram')}>
                         <Trash2 size={16} />
                       </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-neutral-500 mb-4">Connect your Telegram bot to start receiving and replying to messages.</p>
                    <Button onClick={() => handleConnect('telegram')} className="w-full" icon={<Plus size={16} />}>
                      Connect Account
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* WhatsApp Card */}
          <Card className={`transition-all duration-300 ${config.apiKeys.whatsapp ? 'border-emerald-500/20 bg-emerald-900/5' : ''}`}>
             <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${config.apiKeys.whatsapp ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-white'}`}>
                  <MessageSquare size={20} fill={config.apiKeys.whatsapp ? "currentColor" : "none"} />
                </div>
                <div>
                  <h3 className="font-medium text-white">WhatsApp</h3>
                  <p className="text-xs text-neutral-500">Meta Cloud API</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 {config.apiKeys.whatsapp && (
                   <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                 )}
              </div>
            </div>

            {editingChannel === 'whatsapp' ? (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div>
                   <label className="block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wide">Access Token</label>
                   <input 
                    type="password" 
                    value={tempToken}
                    onChange={(e) => setTempToken(e.target.value)}
                    placeholder="EAAG..."
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 font-mono"
                    autoFocus
                  />
                  <p className="text-[10px] text-neutral-600 mt-2">
                    Requires a System User Token with <code>whatsapp_business_messaging</code> permission.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveChannel('whatsapp')} className="w-full bg-white text-black hover:bg-neutral-200">
                    Connect Number
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingChannel(null)} className="px-3">
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {config.apiKeys.whatsapp ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-black/30 rounded-lg border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-mono text-neutral-400">
                        ••••••••••••••••••••••••
                      </span>
                       <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                    </div>
                    <div className="flex gap-2">
                       <Button size="sm" variant="secondary" className="flex-1" onClick={() => handleConnect('whatsapp')}>
                         Configure
                       </Button>
                       <Button size="sm" variant="danger" onClick={() => disconnectChannel('whatsapp')}>
                         <Trash2 size={16} />
                       </Button>
                    </div>
                  </div>
                ) : (
                   <div className="mt-2">
                    <p className="text-sm text-neutral-500 mb-4">Connect a WhatsApp Business number via Meta Cloud API.</p>
                    <Button onClick={() => handleConnect('whatsapp')} className="w-full" icon={<Plus size={16} />}>
                      Connect Account
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* AI Engine Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Key className="text-neutral-400" size={20} />
          <h2 className="text-lg font-medium text-white">AI Engine Credentials</h2>
        </div>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <label className="text-sm font-medium text-white">Google Gemini API</label>
                 <p className="text-xs text-neutral-500">Primary reasoning engine for the chatbot.</p>
              </div>
              <span className="text-xs text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Operational
              </span>
            </div>
            
            <div className="relative group">
              <input 
                type="password"
                value={config.apiKeys.gemini || "sk-goog-**************************"} 
                readOnly
                className="w-full bg-black border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-neutral-400 font-mono focus:outline-none focus:border-white/30 transition-all group-hover:bg-white/[0.02]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* Prompt Configuration */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="text-neutral-400" size={20} />
          <h2 className="text-lg font-medium text-white">Behavioral Configuration</h2>
        </div>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <label className="block text-sm font-medium text-neutral-400">System Prompt</label>
              <textarea 
                value={config.prompt}
                onChange={(e) => setConfig({...config, prompt: e.target.value})}
                rows={8}
                className="w-full bg-black border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all leading-relaxed resize-none scrollbar-thin scrollbar-thumb-white/10"
                placeholder="Define how the AI should behave..."
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Tone</label>
                <select 
                  value={config.tone}
                  onChange={(e) => setConfig({...config, tone: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Technical</option>
                  <option>Sales-oriented</option>
                </select>
              </div>
              
              <div className="p-4 rounded-lg bg-neutral-900/50 border border-white/5">
                <h4 className="text-xs font-medium text-white mb-2 uppercase tracking-wider">Tips</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Changes to the system prompt take effect immediately for new conversations. Existing contexts may need to be cleared.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Advanced Parameters */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="text-neutral-400" size={20} />
          <h2 className="text-lg font-medium text-white">System Parameters</h2>
        </div>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="flex justify-between mb-3">
                 <label className="text-sm font-medium text-neutral-400">Typing Delay Latency</label>
                 <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white">{config.typingDelay}ms</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3000" 
                step="100"
                value={config.typingDelay}
                onChange={(e) => setConfig({...config, typingDelay: parseInt(e.target.value)})}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-200 transition-all"
              />
            </div>

            <div>
               <div className="flex justify-between mb-3">
                 <label className="text-sm font-medium text-neutral-400">Max Token Limit</label>
                 <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white">{config.maxTokens}</span>
              </div>
               <input 
                type="range" 
                min="256" 
                max="4096" 
                step="256"
                value={config.maxTokens}
                onChange={(e) => setConfig({...config, maxTokens: parseInt(e.target.value)})}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-200 transition-all"
              />
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
             <div>
               <label className="text-sm font-medium text-white block">Context Retention</label>
               <span className="text-xs text-neutral-500">Keep message history for multi-turn conversations.</span>
             </div>
             <button 
               onClick={() => setConfig({...config, contextRetention: !config.contextRetention})}
               className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 ${config.contextRetention ? 'bg-white' : 'bg-neutral-800'}`}
             >
               <div className={`w-4 h-4 rounded-full bg-black shadow transform transition-transform duration-300 ${config.contextRetention ? 'translate-x-6' : 'translate-x-0'}`} />
             </button>
          </div>
        </Card>
      </section>
    </div>
  );
};
