import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  Activity,
  LogOut,
  Hexagon
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group
      ${isActive 
        ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
        : 'text-neutral-500 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={18} className="transition-transform group-hover:scale-110" />
    <span>{label}</span>
  </NavLink>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/5 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-white blur-lg opacity-20"></div>
          <Hexagon className="text-white relative z-10" size={32} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg tracking-tight text-white">NEXUS</span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">Admin Console</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/chats" icon={MessageSquare} label="Live Chats" />
        <NavItem to="/contacts" icon={Users} label="Contacts" />
        <NavItem to="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
         <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-900/50 border border-white/5 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-xs text-neutral-400 font-mono">SYSTEM ONLINE</span>
         </div>
        <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
