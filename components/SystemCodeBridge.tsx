
import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Rocket, Smartphone, ShieldCheck, Wallet, Database, Globe, Share2, Cloud, Zap, Search, AlertTriangle, Target, Scale, ShieldAlert, Sparkles, Lightbulb, Info, RefreshCcw } from 'lucide-react';

export const SystemCodeBridge: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [workingTitle, setWorkingTitle] = useState('LOCAL-LINKER: CORE');

  const pwaPrompt = `
# Module: PWA Deployment & Core Architecture Injection
이 프롬프트는 브랜드 네이밍이 확정되기 전, 기술적 뼈대를 먼저 구축하기 위한 가이드입니다.

## Cursor AI를 위한 지침:
1. **기술 중심 아키텍처**: 브랜드명은 임시로 "${workingTitle}"로 유지하고, 모든 UI 컴포넌트에서 '기능성(Functionality)'이 돋보이도록 인디고/슬레이트 테마를 적용해줘.
2. **화이트 라벨 설계**: 나중에 브랜드명을 한 번에 바꿀 수 있도록 전역 상수(AppConstants.appName)를 사용하여 이름을 관리하는 로직을 Flutter에 구현해줘.
3. **PWA 기술 스펙**: 
   - Manifest.json에 'standalone' 모드를 설정하여 네이티브 앱 같은 사용자 경험을 제공할 것.
   - 서비스 워커를 통해 오프라인 지도 데이터와 메시지 캐싱 로직을 포함해줘.
4. **브랜드 보류 대응**: 브랜드명이 들어갈 자리에 'Architecture V3 Placeholder' 등의 기술적인 시각 요소를 배치해줘.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pwaPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Naming Deferral Info */}
      <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <RefreshCcw size={200} className="animate-spin-slow" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 mb-6">
            <Info size={14} className="text-indigo-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100 italic">Strategy: Function First, Branding Later</span>
          </div>
          <h2 className="text-4xl font-black italic mb-4 tracking-tighter uppercase leading-tight">
            ARCHITECTURE <span className="text-indigo-200">ONLY</span> BRIDGE
          </h2>
          <p className="text-indigo-100 text-lg font-medium max-w-2xl mb-10 leading-relaxed">
            이름 때문에 멈추지 마세요. 기술적 핵심(Core Engine)을 먼저 배포하고 브랜딩은 나중에 주입합니다. 
            아래 프롬프트는 '화이트 라벨' 방식의 배포를 가이드합니다.
          </p>

          <div className="bg-black/20 p-6 rounded-[2rem] border border-white/5 mb-8">
            <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Project Working Title</span>
               <span className="text-[10px] text-white/40 italic">Global Variable Applied</span>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="text" 
                value={workingTitle}
                onChange={(e) => setWorkingTitle(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm outline-none focus:border-indigo-400 transition-all"
              />
              <button className="p-3 bg-white/10 rounded-xl text-indigo-200 hover:bg-white/20 transition-all">
                <RefreshCcw size={18} />
              </button>
            </div>
          </div>

          <button 
            onClick={handleCopy}
            className="flex items-center gap-4 px-10 py-6 bg-white text-indigo-900 rounded-[2rem] font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 mb-6"
          >
            {copied ? <Check /> : <Share2 />}
            {copied ? "복사 완료!" : "화이트 라벨 배포 프롬프트 복사"}
          </button>
        </div>
      </div>

      {/* Core Logic Focus Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1C2028] p-10 rounded-[3rem] border border-slate-700">
          <h4 className="font-black text-white text-xl italic mb-6 uppercase flex items-center gap-3">
            <Code2 className="text-indigo-400" /> Technical Core Focus
          </h4>
          <div className="space-y-4">
            <AuditItem 
              icon={<Target className="text-indigo-500" />} 
              title="Geofencing & Auth" 
              desc="이름에 관계없이 작동하는 하이퍼-로컬 지오펜싱(50km) 로직" 
            />
            <AuditItem 
              icon={<ShieldCheck className="text-emerald-500" />} 
              title="AI Guardian System" 
              desc="스팸과 사기를 원천 차단하는 Gemini 기반 실시간 필터링" 
            />
            <AuditItem 
              icon={<Wallet className="text-amber-500" />} 
              title="Global Payout Engine" 
              desc="Stripe Connect를 통한 120개국 다국적 정산 자동화" 
            />
          </div>
        </div>

        <div className="bg-indigo-900/20 p-10 rounded-[3rem] border border-indigo-500/30">
          <h4 className="font-black text-white text-xl italic mb-6 uppercase flex items-center gap-3">
            <Sparkles className="text-indigo-400" /> UI Abstraction Guide
          </h4>
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-[10px] font-bold text-indigo-400 uppercase mb-2">Neutral Color Palette</div>
              <p className="text-xs text-slate-400 leading-relaxed">어떤 브랜드가 와도 잘 어울리는 Slate & Indigo 다크 테마를 기본으로 유지합니다.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800 rounded-2xl text-center border border-white/5">
                <div className="text-white font-bold text-xs uppercase">Function First</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl text-center border border-white/5">
                <div className="text-white font-bold text-xs uppercase">Modular UI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuditItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all">
    <div className="shrink-0 mt-1">{icon}</div>
    <div>
      <div className="font-bold text-white text-sm mb-1">{title}</div>
      <p className="text-[10px] text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);
