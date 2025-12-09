import React from 'react';
import { Card } from './ui/Card';
import { MessageCircle, Users, Zap, Clock, TrendingUp } from 'lucide-react';
import { MOCK_CHATS, MOCK_USERS } from '../constants';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock chart data
const DATA = [
  { name: '00:00', value: 12 },
  { name: '04:00', value: 8 },
  { name: '08:00', value: 45 },
  { name: '12:00', value: 98 },
  { name: '16:00', value: 75 },
  { name: '20:00', value: 110 },
  { name: '23:59', value: 30 },
];

const StatCard = ({ title, value, sub, icon: Icon }: { title: string; value: string; sub: string; icon: any }) => (
  <Card className="flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-light text-white mt-2 tracking-tight">{value}</p>
      </div>
      <div className="p-2 bg-white/5 rounded-lg border border-white/5">
        <Icon size={20} className="text-white opacity-80" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-auto">
      <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
        <TrendingUp size={12} /> +12%
      </span>
      <span className="text-neutral-600 text-xs">{sub}</span>
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const activeChats = MOCK_CHATS.filter(c => c.status === 'active').length;
  const totalMessages = MOCK_USERS.reduce((acc, u) => acc + u.messageCount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light tracking-tight text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Live Updates Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Chats" value={activeChats.toString()} sub="vs last hour" icon={MessageCircle} />
        <StatCard title="Total Users" value={MOCK_USERS.length.toString()} sub="Unique contacts" icon={Users} />
        <StatCard title="Messages" value={totalMessages.toString()} sub="processed today" icon={Zap} />
        <StatCard title="Avg Response" value="1.2s" sub="System latency" icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <Card className="lg:col-span-2 flex flex-col h-full">
          <h3 className="text-neutral-400 text-sm font-medium mb-6">MESSAGE VOLUME (24H)</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-full">
          <h3 className="text-neutral-400 text-sm font-medium mb-6">PLATFORM DISTRIBUTION</h3>
          <div className="space-y-4">
            {[
              { label: 'Telegram', val: 65, color: 'bg-white' },
              { label: 'WhatsApp', val: 25, color: 'bg-neutral-600' },
              { label: 'Messenger', val: 10, color: 'bg-neutral-800' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-300">{item.label}</span>
                  <span className="text-neutral-500">{item.val}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${item.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-lg bg-neutral-900/30 border border-white/5">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-500">
                  <Zap size={16} />
               </div>
               <div>
                 <p className="text-sm text-white">System Healthy</p>
                 <p className="text-xs text-neutral-500">All nodes operational</p>
               </div>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
