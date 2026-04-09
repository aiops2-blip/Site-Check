/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  ShieldAlert, 
  Zap, 
  Menu,
  X,
  ChevronRight,
  HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ChatInterface from './components/ChatInterface';
import KnowledgeBase from './components/KnowledgeBase';
import QuickTools from './components/QuickTools';
import RiskManagement from './components/RiskManagement';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentMode, setCurrentMode] = useState('Director Mode');

  const navItems = [
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'tools', label: 'Quick Tools', icon: Zap },
    { id: 'risks', label: 'Risk Management', icon: ShieldAlert },
  ];

  const modes = [
    { name: 'Director Mode', color: 'bg-blue-500' },
    { name: 'Training Mode', color: 'bg-green-500' },
    { name: 'Troubleshooting Onsite Mode', color: 'bg-red-500' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-72 bg-slate-900 text-white flex flex-col z-50"
          >
            <div className="p-6 flex flex-col gap-1 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <HardHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl tracking-tight">TECH MASTER</h1>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Operation Director AI</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-3 px-2">Active Mode</p>
              <div className="space-y-1">
                {modes.map((mode) => (
                  <button
                    key={mode.name}
                    onClick={() => setCurrentMode(mode.name)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                      currentMode === mode.name 
                        ? 'bg-slate-800 text-white border border-slate-700' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${mode.color}`} />
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-3 px-2">Navigation</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </nav>

            <div className="p-6 border-t border-slate-800">
              <div className="bg-slate-800/50 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-2">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-200">Onsite Ready</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-500 hover:bg-slate-100"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="h-6 w-[1px] bg-slate-200 mx-2" />
            <div className="flex flex-col">
              <h2 className="font-semibold text-slate-700 leading-tight">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              {activeTab === 'chat' && (
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                  {currentMode}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
              v2.0.25
            </Badge>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TechMaster" alt="User" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              {activeTab === 'chat' && <ChatInterface mode={currentMode} />}
              {activeTab === 'knowledge' && <KnowledgeBase />}
              {activeTab === 'tools' && <QuickTools />}
              {activeTab === 'risks' && <RiskManagement />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
