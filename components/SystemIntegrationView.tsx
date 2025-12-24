
import React, { useState } from 'react';
// Added Network to imports to fix the error on line 95
import { ShieldCheck, Copy, Check, Terminal, Cpu, Cloud, Globe, Code2, Database, Zap, ArrowRight, Save, Layout, Smartphone, Lock, AlertCircle, Network } from 'lucide-react';

export const SystemIntegrationView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const configData = {
    projectId: "global-local-linker",
    appId: "1:533626297462:web:e272ac851c16d462785357",
    apiKey: "AIzaSyAcui1ZSxODRtG7DkZfuH4K56QFkP0205Q",
    storageBucket: "global-local-linker.firebasestorage.app",
    location: "us-central1 (Iowa, USA)"
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(configData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Celebration Banner */}
      <div className="bg-slate-900 border-4 border-emerald-500/30 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
          <ShieldCheck size={280} className="text-emerald-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20 mb-8">
            <Check size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Handshake Successful</span>
          </div>
          <h2 className="text-6xl font-black mb-6 italic tracking-tight leading-none">
            SYSTEM <span className="text-emerald-400 underline decoration-white underline-offset-8">LIVE</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            축하합니다! 터미널의 설정값이 클라우드와 완벽하게 동기화되었습니다. 
            이제 이 <strong>'디지털 유전자'</strong>를 Flutter 앱에 주입할 준비가 끝났습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Config Inspection Card */}
        <div className="lg:col-span-2 bg-white border-2 border-slate-200 p-10 rounded-[4rem] shadow-xl relative overflow-hidden">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3 italic">
                 <Terminal className="text-indigo-600" /> Configuration Blueprint
              </h3>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                {copied ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY CONFIG</>}
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Project ID", value: configData.projectId, icon: <Database size={16}/> },
                { label: "AI Logic Bridge (App ID)", value: configData.appId, icon: <Cpu size={16}/> },
                { label: "Global API Key", value: "•••• •••• •••• " + configData.apiKey.slice(-4), icon: <Lock size={16}/> },
                { label: "Cloud Hub Region", value: configData.location, icon: <Globe size={16}/> }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-500 transition-all">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                   </div>
                   <div className="text-sm font-mono font-bold text-slate-800 break-all">{item.value}</div>
                </div>
              ))}
           </div>

           <div className="mt-8 p-6 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-indigo-600 shrink-0">
                 <Code2 size={24} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-indigo-900 mb-1">Flutter Developer Note</h4>
                 <p className="text-[10px] text-indigo-700 leading-relaxed font-medium">
                    터미널에서 받은 이 값들은 Flutter 프로젝트의 <code>lib/firebase_options.dart</code>에 자동으로 기록됩니다. 
                    우리는 <code>Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform)</code> 한 줄로 모든 AI 기능을 깨울 수 있습니다.
                 </p>
              </div>
           </div>
        </div>

        {/* Global Architecture Status */}
        <div className="bg-slate-900 text-white p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
           <div className="absolute bottom-0 right-0 p-8 opacity-5">
              <Network size={150} />
           </div>
           <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Zap size={14} className="fill-indigo-400" /> Infrastructure Integrity
           </h4>
           
           <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold">
                    <span>AI Logic Bridge</span>
                    <span className="text-emerald-400">ACTIVE</span>
                 </div>
                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full" />
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold">
                    <span>Global Latency Balance</span>
                    <span className="text-indigo-400">OPTIMIZED</span>
                 </div>
                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[95%]" />
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold">
                    <span>Stripe Payout Webhook</span>
                    <span className="text-amber-400">STANDBY</span>
                 </div>
                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[70%]" />
                 </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                 <div className="bg-white/5 p-5 rounded-3xl border border-white/10 text-center">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest text-center">Current Scale Capacity</div>
                    <div className="text-3xl font-black italic">1M+ <span className="text-xs font-normal text-slate-500">Users/Day</span></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Final Handover Action */}
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12">
         <div className="flex-1">
            <h3 className="text-3xl font-black mb-4 italic">다음 작업: <span className="text-indigo-600">콘텐츠 자동화 구축</span></h3>
            <p className="text-slate-500 font-medium leading-relaxed">
               시스템의 모든 혈관이 연결되었습니다. 이제 현지 마스터들이 답변을 올렸을 때, 
               이를 자동으로 비디오로 변환하고 글로벌 검색 엔진(SEO)에 배포하는 **'마케팅 멀티플라이어'** 엔진을 설계할 차례입니다.
            </p>
         </div>
         <div className="w-full md:w-auto">
            <button className="px-10 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center gap-4 hover:bg-slate-800 transition-all hover:translate-x-2">
               마케팅 엔진 설계로 이동 <ArrowRight />
            </button>
         </div>
      </div>
    </div>
  );
};
