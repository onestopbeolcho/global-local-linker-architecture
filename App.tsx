
import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  Rocket,
  Cloud, 
  Sparkles, 
  MousePointer2,
  ListFilter,
  Monitor,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Network,
  Download
} from 'lucide-react';

// Import local components
import { MissionFeedView } from './components/MissionFeedView';
import { FirebaseConsoleMap } from './components/FirebaseConsoleMap';
import { FirebaseStudioGuide } from './components/FirebaseStudioGuide';
import { ProductionHandoverView } from './components/ProductionHandoverView';
import { AIActivationChoice } from './components/AIActivationChoice';
import { ArchitectDecisionView } from './components/ArchitectDecisionView';
import { SystemIntegrationView } from './components/SystemIntegrationView';
import { PrototypeFlow } from './components/PrototypeFlow';
import { MasterToolkit } from './components/MasterToolkit';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'blueprint' | 'handover' | 'studio' | 'console_map' | 'ai_choice' | 'decision' | 'integration' | 'prototype' | 'master'>('handover');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 px-8 flex justify-between items-center border-b border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cloud className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter text-indigo-100 leading-none uppercase">Local-Linker Core</h1>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400/60">Global Handover System</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-400 uppercase tracking-widest text-[10px]">Production Ready</span>
          </span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 overflow-x-auto shadow-sm no-scrollbar">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 py-4">
            <button 
              onClick={() => setActiveTab('handover')}
              className={`flex items-center gap-2 font-black italic transition-all whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest ${activeTab === 'handover' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
            >
              <Download size={14} /> 01. 시스템 이전 (Code)
            </button>
            <button 
              onClick={() => setActiveTab('prototype')}
              className={`flex items-center gap-2 font-black italic transition-all whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest ${activeTab === 'prototype' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
            >
              <Rocket size={14} /> 02. 여행자 시뮬레이션
            </button>
            <button 
              onClick={() => setActiveTab('master')}
              className={`flex items-center gap-2 font-black italic transition-all whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest ${activeTab === 'master' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
            >
              <ShieldCheck size={14} /> 03. 마스터 툴킷
            </button>
            <button 
              onClick={() => setActiveTab('decision')}
              className={`flex items-center gap-2 font-black italic transition-all whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest ${activeTab === 'decision' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
            >
              <Cpu size={14} /> 아키텍처 가이드
            </button>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 pb-24">
        {activeTab === 'handover' && <section className="animate-in fade-in slide-in-from-bottom-4"><ProductionHandoverView /></section>}
        {activeTab === 'prototype' && <section className="animate-in fade-in slide-in-from-bottom-4"><PrototypeFlow /></section>}
        {activeTab === 'master' && <section className="animate-in fade-in slide-in-from-bottom-4"><MasterToolkit /></section>}
        {activeTab === 'decision' && <section className="animate-in fade-in slide-in-from-bottom-4"><ArchitectDecisionView /></section>}
        {/* Hidden internal tabs... */}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-8 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">&copy; 2024 Global Local-Linker • Architecture Handover Complete</p>
          <div className="flex gap-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
             <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
             <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
