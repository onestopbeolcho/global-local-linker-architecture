
import React from 'react';
import { Globe2, Zap, Navigation, Timer, Info, TerminalSquare, CheckCircle2, MapPin, Activity, Network, ShieldCheck, Globe, Smartphone, Monitor, Laptop, Layers, Cpu, ArrowRight } from 'lucide-react';

export const FirebaseStudioGuide: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      {/* Platform Injection Hero */}
      <div className="bg-slate-900 border-4 border-emerald-500/50 rounded-[3.5rem] p-12 relative overflow-hidden shadow-2xl text-white">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
          <Layers size={280} className="text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20 mb-8">
            <Cpu size={14} className="text-emerald-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">AI Logic Platform Injection</span>
          </div>
          <h2 className="text-6xl font-black mb-6 italic tracking-tight leading-none text-emerald-400">
            CONNECT <span className="text-white underline decoration-emerald-500 underline-offset-8">INTELLIGENCE</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            Flutter는 하나지만, AI는 각 플랫폼의 통로를 통해 전달됩니다. 
            웹(WEB) 플랫폼을 먼저 선택하여 'Global Local-Linker'의 두뇌를 활성화하세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Terminal Step: App Selection */}
        <div className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-xl relative">
          <div className="flex items-center gap-3 mb-6">
            <TerminalSquare className="text-emerald-600" />
            <h4 className="font-black text-slate-800 uppercase tracking-widest text-sm">플랫폼 선택 (Terminal)</h4>
          </div>
          
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative">
             <div className="font-mono text-[10px] text-slate-500 mb-4 italic">
               ? Select the Firebase app to enable AI Logic for:
             </div>
             <div className="space-y-2 font-mono text-[9px]">
                <div className="text-slate-500 opacity-30 pl-4">globallocallinker_app (android)</div>
                <div className="text-slate-500 opacity-30 pl-4">globallocallinker_app (ios)</div>
                <div className="bg-emerald-500/20 text-emerald-400 font-black p-3 rounded-xl border border-emerald-500/30 flex items-center justify-between scale-105 shadow-lg">
                   <span>❯ globallocallinker_app (web)</span>
                   <CheckCircle2 size={12} />
                </div>
                <div className="text-slate-500 opacity-30 pl-4 italic">...other platforms</div>
             </div>
             <div className="mt-6 flex items-center gap-2">
                <Activity size={12} className="text-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] text-slate-500 italic">Injecting Gemini AI Bridge to Web SDK...</span>
             </div>
          </div>

          <div className="mt-6 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-start gap-4">
             <Info className="text-emerald-600 shrink-0" size={24} />
             <div>
                <h5 className="text-sm font-black text-emerald-900 italic uppercase">왜 웹(WEB)을 먼저 고르나요?</h5>
                <p className="text-[10px] text-emerald-800 leading-relaxed mt-1">
                  우리는 현재 브라우저 기반의 IDE와 프리뷰를 사용 중입니다. <strong>Web App</strong>을 먼저 선택해야 
                  지금 작성하는 코드에서 즉시 Gemini AI의 응답을 받아볼 수 있습니다.
                </p>
             </div>
          </div>
        </div>

        {/* Multi-Platform Architecture Visualization */}
        <div className="bg-slate-100 border-2 border-dashed border-slate-300 p-8 rounded-[3rem] shadow-sm relative overflow-hidden flex flex-col justify-center">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 px-4 text-center">One Code, Multi-Bridge AI</h4>
          <div className="relative flex flex-col items-center gap-6">
             {/* Central Logic */}
             <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 relative z-20">
                <Cpu size={24} />
                <span className="font-black italic text-xs uppercase tracking-widest">Gemini Engine (Cloud)</span>
             </div>

             {/* Connection Lines */}
             <div className="flex gap-12 relative z-10">
                <div className="flex flex-col items-center gap-2 opacity-30">
                   <div className="h-12 w-0.5 bg-slate-300"></div>
                   <Smartphone size={20} className="text-slate-400" />
                   <span className="text-[8px] font-black">ANDROID</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="h-12 w-0.5 bg-emerald-500 animate-pulse"></div>
                   <Monitor size={20} className="text-emerald-600" />
                   <span className="text-[8px] font-black text-emerald-600">WEB (ACTIVE)</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-30">
                   <div className="h-12 w-0.5 bg-slate-300"></div>
                   <Laptop size={20} className="text-slate-400" />
                   <span className="text-[8px] font-black">DESKTOP</span>
                </div>
             </div>
          </div>
          <p className="text-[9px] text-slate-400 italic text-center mt-6">
            * 각 플랫폼은 고유한 API 인증 토큰을 생성하여 보안을 유지합니다.
          </p>
        </div>
      </div>

      {/* Logic Flow */}
      <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
               <h4 className="text-2xl font-black mb-4 flex items-center gap-3 italic text-emerald-600">
                 <ShieldCheck size={28} /> Production Security Protocol
               </h4>
               <p className="text-sm text-slate-600 leading-relaxed mb-6">
                 플랫폼을 선택하면 Firebase는 해당 앱에 대한 **App Check** 보안 키를 발행합니다. 
                 이를 통해 승인되지 않은 비정상적인 AI 호출을 전 세계 어디서든 차단할 수 있습니다.
               </p>
               <div className="flex gap-4">
                  <div className="bg-emerald-50 px-4 py-2 rounded-xl text-[10px] font-bold text-emerald-600 border border-emerald-100 inline-flex items-center gap-2">
                    <Zap size={12} /> Priority: Web-SDK Connectivity
                  </div>
               </div>
            </div>
            <div className="w-full md:w-80 bg-slate-50 p-8 rounded-[3rem] border border-slate-200 flex flex-col items-center">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-600 mb-4">
                  <Layers size={32} className="animate-pulse" />
               </div>
               <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Arrow keys to select</div>
               <div className="text-slate-900 font-black italic text-center text-xs leading-tight tracking-widest">
                  Select <span className="text-emerald-600 underline">... (WEB)</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
