import React from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChatList } from './components/ChatList';
import { Contacts } from './components/Contacts';
import { Settings } from './components/Settings';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 selection:text-white">
      <HashRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 overflow-x-hidden">
             <div className="max-w-7xl mx-auto h-full">
               <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chats" element={<ChatList />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
             </div>
          </main>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
