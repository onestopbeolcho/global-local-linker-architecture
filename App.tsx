
import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  LayoutDashboard, 
  MessageSquare, 
  Wallet, 
  Activity, 
  Rocket, 
  Bell,
  Terminal,
  Code2,
  Box,
  Layers,
  Smartphone,
  Eye,
  Settings,
  ShieldAlert,
  BarChart3,
  UserCircle
} from 'lucide-react';

// View Components
import { ProjectOverview } from './components/ProjectOverview';
import { MissionFeedView } from './components/MissionFeedView';
import { AIGuardianDemo } from './components/AIGuardianDemo';
import { MasteryLevelingView } from './components/MasteryLevelingView';
import { PaymentFlowView } from './components/PaymentFlowView';
import { SystemCodeBridge } from './components/SystemCodeBridge';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MasterToolkit } from './components/MasterToolkit';
import { AdminDashboard } from './components/AdminDashboard';
import { GrowthView } from './components/GrowthView';
import { PrototypeFlow } from './components/PrototypeFlow';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('platform-home');
  const [navGroup, setNavGroup] = useState<'platform' | 'admin' | 'engineering'>('platform');

  return (
    <div className="min-h-screen flex bg-[#0F1115] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* High-End Cyber Sidebar */}
      <aside className="w-72 bg-[#16191F] border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen shadow-2xl z-[100]">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-2">
            <Globe className="text-white animate-pulse" size={22} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white leading-none uppercase">
              LOCAL-LINKER
            </h1>
            <span className="text-[9px] font-black text-indigo-400 tracking-[0.2em] uppercase opacity-70">Control Unit</span>
          </div>
        </div>

        {/* Top Tier Switcher */}
        <div className="flex bg-black/40 p-1.5 rounded-2xl mb-8 border border-white/5">
          <button 
            onClick={() => {setNavGroup('platform'); setActiveTab('platform-home');}}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${navGroup === 'platform' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Field
          </button>
          <button 
            onClick={() => {setNavGroup('admin'); setActiveTab('admin-home');}}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${navGroup === 'admin' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Admin
          </button>
          <button 
            onClick={() => {setNavGroup('engineering'); setActiveTab('eng-home');}}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${navGroup === 'engineering' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Engine
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {navGroup === 'platform' && (
            <>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-3 block">User Experience</label>
              <MenuButton active={activeTab === 'platform-home'} onClick={() => setActiveTab('platform-home')} icon={<Smartphone size={18}/>} label="유저 저니 시뮬" />
              <MenuButton active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding')} icon={<UserCircle size={18}/>} label="마스터 온보딩" />
              <MenuButton active={activeTab === 'missions'} onClick={() => setActiveTab('missions')} icon={<Rocket size={18}/>} label="실시간 미션 피드" />
              <MenuButton active={activeTab === 'master-toolkit'} onClick={() => setActiveTab('master-toolkit')} icon={<Zap size={18}/>} label="마스터 툴킷" />
            </>
          )}

          {navGroup === 'admin' && (
            <>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-3 block">Command Center</label>
              <MenuButton active={activeTab === 'admin-home'} onClick={() => setActiveTab('admin-home')} icon={<LayoutDashboard size={18}/>} label="운영 대시보드" color="emerald" />
              <MenuButton active={activeTab === 'guardian'} onClick={() => setActiveTab('guardian')} icon={<ShieldCheck size={18}/>} label="AI 가디언 관제" color="emerald" />
              <MenuButton active={activeTab === 'growth'} onClick={() => setActiveTab('growth')} icon={<BarChart3 size={18}/>} label="글로벌 성장 지표" color="emerald" />
              <MenuButton active={activeTab === 'mastery'} onClick={() => setActiveTab('mastery')} icon={<Activity size={18}/>} label="마스터 랭크 관리" color="emerald" />
            </>
          )}

          {navGroup === 'engineering' && (
            <>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-3 block">Infrastructure</label>
              <MenuButton active={activeTab === 'eng-home'} onClick={() => setActiveTab('eng-home')} icon={<Box size={18}/>} label="아키텍처 개요" color="purple" />
              <MenuButton active={activeTab === 'payment'} onClick={() => setActiveTab('payment')} icon={<Wallet size={18}/>} label="정산 엔진 명세" color="purple" />
              <MenuButton active={activeTab === 'bridge'} onClick={() => setActiveTab('bridge')} icon={<Code2 size={18}/>} label="Flutter 마스터 브릿지" color="purple" />
            </>
          )}
        </nav>

        {/* Live System Log Widget */}
        <div className="mt-8 bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-[9px]">
          <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
            System Runtime
          </div>
          <div className="space-y-1 opacity-60">
            <div className="truncate text-indigo-200"> [OK] Kernel Active</div>
            <div className="truncate text-indigo-200"> [OK] Geo-Fence Ready</div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#16191F]/50 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-white/50 italic">
              Mode: <span className={navGroup === 'platform' ? 'text-indigo-400' : navGroup === 'admin' ? 'text-emerald-400' : 'text-purple-400'}>{navGroup.toUpperCase()}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gemini 3 Flash Connected</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <div className="flex-1 overflow-y-auto p-10 bg-gradient-to-br from-[#0F1115] to-[#1A1D23] custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-20">
            {/* Platform Simulation Views */}
            {activeTab === 'platform-home' && <PrototypeFlow />}
            {activeTab === 'onboarding' && <OnboardingFlow />}
            {activeTab === 'missions' && <MissionFeedView />}
            {activeTab === 'master-toolkit' && <MasterToolkit />}

            {/* Admin/Dashboard Views */}
            {activeTab === 'admin-home' && <AdminDashboard />}
            {activeTab === 'guardian' && <AIGuardianDemo />}
            {activeTab === 'growth' && <GrowthView />}
            {activeTab === 'mastery' && <MasteryLevelingView />}

            {/* Engineering Bridge Views */}
            {activeTab === 'eng-home' && <ProjectOverview />}
            {activeTab === 'payment' && <PaymentFlowView />}
            {activeTab === 'bridge' && <SystemCodeBridge />}
          </div>
        </div>
      </main>
    </div>
  );
};

const MenuButton = ({ active, onClick, icon, label, color = 'slate' }: any) => {
  const activeClass = color === 'indigo' ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 
                      color === 'emerald' ? 'bg-emerald-600 text-white shadow-emerald-500/20' :
                      color === 'purple' ? 'bg-purple-600 text-white shadow-purple-500/20' :
                      'bg-slate-800 text-white';

  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-[13px] ${active ? `${activeClass} shadow-xl scale-[1.03] z-10` : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
    >
      <span className={`${active ? 'text-white' : 'text-slate-500'}`}>{icon}</span>
      <span className="truncate">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
};

export default App;
