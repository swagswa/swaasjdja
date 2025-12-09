import React from 'react';
import { Card } from './ui/Card';
import { MOCK_USERS } from '../constants';
import { User, MoreHorizontal, Search } from 'lucide-react';

export const Contacts: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light text-white">Contacts</h1>
        <div className="relative w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
           <input 
              type="text" 
              placeholder="Search users..."
              className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
           />
        </div>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-white/5 uppercase font-medium text-xs tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Platform ID</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">First Seen</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Messages</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white border border-white/10">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{user.platformId}</td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2 py-1 rounded bg-neutral-900 border border-white/5 text-xs">
                      {user.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(user.firstSeen).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-neutral-300">{new Date(user.lastActive).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono">{user.messageCount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded transition-colors text-neutral-500 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
