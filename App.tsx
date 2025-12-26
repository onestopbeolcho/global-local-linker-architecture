
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  LayoutDashboard, 
  Rocket, 
  UserCircle,
  Menu,
  X,
  Plus,
  Settings,
  Terminal,
  Code2,
  Box,
  Smartphone,
  BarChart3,
  Wallet,
  Download,
  Wifi,
  WifiOff,
  AlertCircle
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0F1115] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Sidebar Control */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-[200] p-3 bg-indigo-600 rounded-2xl shadow-2xl hover:scale-110 transition-all lg:flex hidden"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Technical Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full'} bg-[#16191F] border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen shadow-2xl z-[100] transition-all duration-500 overflow-hidden`}>
        <div className="flex items-center gap-3 mb-10 px-2 min-w-[240px]">
          <div className="w-10 h-10 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center shadow-lg rotate-2 group hover:rotate-0 transition-transform">
            <Settings className="text-indigo-400 group-hover:rotate-90 transition-transform" size={22} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white leading-none uppercase">
              LOCAL-LINKER
            </h1>
            <span className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase opacity-70">PWA STATUS: {isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>

        {/* PWA Install Promo */}
        {deferredPrompt && (
          <button 
            onClick={handleInstallClick}
            className="mb-8 p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center gap-3 hover:bg-indigo-600/30 transition-all group min-w-[240px]"
          >
            <Download size={20} className="text-indigo-400 group-hover:bounce" />
            <div className="text-left">
              <div className="text-[10px] font-black text-white">APP INSTALL</div>
              <div className="text-[9px] text-indigo-300">홈 화면에 추가하여 사용하세요</div>
            </div>
          </button>
        )}

        {/* Navigation Group Switcher */}
        <div className="flex bg-black/40 p-1.5 rounded-2xl mb-8 border border-white/5 min-w-[240px]">
          <SwitcherBtn active={navGroup === 'platform'} onClick={() => {setNavGroup('platform'); setActiveTab('platform-home');}} label="Platform" color="indigo" />
          <SwitcherBtn active={navGroup === 'admin'} onClick={() => {setNavGroup('admin'); setActiveTab('admin-home');}} label="Admin" color="emerald" />
          <SwitcherBtn active={navGroup === 'engineering'} onClick={() => {setNavGroup('engineering'); setActiveTab('eng-home');}} label="Bridge" color="purple" />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar min-w-[240px]">
          {navGroup === 'platform' && (
            <>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-3 block">User Simulator</label>
              <MenuButton active={activeTab === 'platform-home'} onClick={() => setActiveTab('platform-home')} icon={<Smartphone size={18}/>} label="플랫폼 홈 (PWA)" />
              <MenuButton active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding')} icon={<UserCircle size={18}/>} label="마스터 온보딩" />
              <MenuButton active={activeTab === 'master-toolkit'} onClick={() => setActiveTab('master-toolkit')} icon={<Zap size={18}/>} label="마스터 툴킷" />
              <MenuButton active={activeTab === 'missions'} onClick={() => setActiveTab('missions')} icon={<Rocket size={18}/>} label="미션 피드" />
            </>
          )}

          {navGroup === 'admin' && (
            <>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-3 block">Command Center</label>
              <MenuButton active={activeTab === 'admin-home'} onClick={() => setActiveTab('admin-home')} icon={<LayoutDashboard size={18}/>} label="운영 대시보드" color="emerald" />
              <MenuButton active={activeTab === 'guardian'} onClick={() => setActiveTab('guardian')} icon={<ShieldCheck size={18}/>} label="AI 가디언 관제" color="emerald" />
              <MenuButton active={activeTab === 'growth'} onClick={() => setActiveTab('growth')} icon={<BarChart3 size={18}/>} label="글로벌 성장 지표" color="emerald" />
            </>
          )}

          {navGroup === 'engineering' && (
            <>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-3 block">System Sync</label>
              <MenuButton active={activeTab === 'eng-home'} onClick={() => setActiveTab('eng-home')} icon={<Box size={18}/>} label="아키텍처 개요" color="purple" />
              <MenuButton active={activeTab === 'bridge'} onClick={() => setActiveTab('bridge')} icon={<Code2 size={18}/>} label="PWA 배포 가이드" color="purple" />
              <MenuButton active={activeTab === 'payment'} onClick={() => setActiveTab('payment')} icon={<Wallet size={18}/>} label="수익 엔진 명세" color="purple" />
            </>
          )}
        </nav>
      </aside>

      {/* Content Container */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Offline Alert */}
        {!isOnline && (
          <div className="bg-red-600 text-white px-6 py-2 text-center text-[10px] font-black tracking-widest flex items-center justify-center gap-2">
            <WifiOff size={14} /> 오프라인 상태입니다. 일부 기능이 제한될 수 있습니다.
          </div>
        )}

        {/* Architecture Header */}
        <header className="h-20 bg-[#16191F]/50 backdrop-blur-xl border-b border-white/5 px-8 lg:flex hidden items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">
               Architecture Mode: Deployment Ready V1.0
             </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Status</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center">
              <Code2 size={20} className="text-slate-400" />
            </div>
          </div>
        </header>

        <div className={`flex-1 overflow-y-auto ${navGroup === 'platform' ? 'p-0 lg:p-10' : 'p-10'} bg-gradient-to-br from-[#0F1115] to-[#1A1D23] custom-scrollbar`}>
          <div className={`${navGroup === 'platform' ? 'max-w-none' : 'max-w-6xl mx-auto'} pb-20`}>
            {navGroup === 'platform' ? (
              <div className="flex justify-center items-start min-h-full">
                <div className="w-full lg:w-[420px] lg:h-[840px] bg-[#0F1115] lg:rounded-[3.5rem] lg:border-[8px] lg:border-[#1F232B] lg:shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">
                  <div className="h-8 bg-transparent px-8 flex justify-between items-center shrink-0 lg:flex hidden">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-4 h-2 bg-white/20 rounded-sm" />
                      <div className="w-3 h-3 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0F1115]">
                    {activeTab === 'platform-home' && <PrototypeFlow />}
                    {activeTab === 'onboarding' && <OnboardingFlow />}
                    {activeTab === 'missions' && <MissionFeedView />}
                    {activeTab === 'master-toolkit' && <MasterToolkit />}
                  </div>

                  <nav className="h-20 bg-[#16191F]/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 shrink-0">
                    <TabIcon active={activeTab === 'platform-home'} onClick={() => setActiveTab('platform-home')} icon={<Globe size={20}/>} label="Explore" />
                    <TabIcon active={activeTab === 'missions'} onClick={() => setActiveTab('missions')} icon={<Rocket size={20}/>} label="Feed" />
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center -mt-10 shadow-xl shadow-indigo-600/30 border-4 border-[#0F1115]" onClick={() => setActiveTab('master-toolkit')}>
                      <Plus className="text-white" size={28} />
                    </div>
                    <TabIcon active={activeTab === 'master-toolkit'} onClick={() => setActiveTab('master-toolkit')} icon={<Zap size={20}/>} label="Action" />
                    <TabIcon active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding'} icon={<UserCircle size={20}/>} label="Profile" />
                  </nav>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'admin-home' && <AdminDashboard />}
                {activeTab === 'guardian' && <AIGuardianDemo />}
                {activeTab === 'growth' && <GrowthView />}
                {activeTab === 'eng-home' && <ProjectOverview />}
                {activeTab === 'payment' && <PaymentFlowView />}
                {activeTab === 'bridge' && <SystemCodeBridge />}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const SwitcherBtn = ({ active, onClick, label, color }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${active ? `bg-${color}-600 text-white shadow-lg` : 'text-slate-500 hover:text-slate-400'}`}
  >
    {label}
  </button>
);

const TabIcon = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group">
    <div className={`p-1 transition-all ${active ? 'text-indigo-400' : 'text-slate-500'}`}>
      {icon}
    </div>
    <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'text-indigo-400 opacity-100' : 'text-slate-600 opacity-60'}`}>
      {label}
    </span>
  </button>
);

const MenuButton = ({ active, onClick, icon, label, color = 'slate' }: any) => {
  const activeClass = color === 'indigo' ? 'bg-indigo-600 text-white' : 
                      color === 'emerald' ? 'bg-emerald-600 text-white' :
                      color === 'purple' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-white';

  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-[13px] ${active ? `${activeClass} shadow-xl scale-[1.03]` : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
      <span>{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
};

export default App;
