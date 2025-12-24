
import React from 'react';
import { ShieldCheck, Zap, Globe, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Cpu, Terminal, Info } from 'lucide-react';

export const AIActivationChoice: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 mb-8">
            <Info size={14} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Decision Support System</span>
          </div>
          <h2 className="text-5xl font-black mb-6 italic leading-tight">
            WHICH <span className="text-orange-500">ENGINE</span><br/>
            IS FOR YOU?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            캡처하신 화면의 두 선택지는 앱의 '엔진 등급'을 결정하는 것입니다. 
            <strong>글로벌 로컬-링커</strong>의 성공을 위해 어떤 길을 가야 할까요?
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Choice A */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl opacity-60 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
           <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <Zap size={32} />
              </div>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase">For Prototypes</span>
           </div>
           <h3 className="text-2xl font-black text-slate-900 mb-4 italic">Gemini Developer API</h3>
           <p className="text-sm text-slate-500 font-medium mb-8">무료로 빠르게 시작하고 싶을 때 적합합니다. 하지만 엔터프라이즈 기능이 부족합니다.</p>
           <ul className="space-y-3 mb-10 text-xs font-bold text-slate-400">
             <li className="flex items-center gap-2">✕ 앱 체크 보안 통합 미흡</li>
             <li className="flex items-center gap-2">✕ 글로벌 리전 선택 불가</li>
             <li className="flex items-center gap-2">✕ 엔터프라이즈 모니터링 제외</li>
           </ul>
           <div className="p-4 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 text-center">
             개인 블로그나 소규모 실험용으로 권장
           </div>
        </div>

        {/* Choice B - Recommended */}
        <div className="bg-white p-10 rounded-[3rem] border-4 border-indigo-600 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-indigo-600 text-white px-8 py-2 font-black text-[10px] rotate-45 translate-x-10 translate-y-4 shadow-lg uppercase tracking-widest">
             Recommended
           </div>
           <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Production Ready</span>
           </div>
           <h3 className="text-2xl font-black text-slate-900 mb-4 italic">Vertex AI Gemini API</h3>
           <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">우리 플랫폼처럼 <strong>결제, 정산, 글로벌 보안</strong>이 중요한 '엔터프라이즈'급 앱에 반드시 필요합니다.</p>
           <ul className="space-y-3 mb-10 text-xs font-bold text-slate-700">
             <li className="flex items-center gap-2 text-indigo-600"><CheckCircle2 size={14} /> Firebase App Check와 완벽 연동 (보안)</li>
             <li className="flex items-center gap-2 text-indigo-600"><CheckCircle2 size={14} /> 서울 리전 등 전세계 리전 선택 가능 (성능)</li>
             <li className="flex items-center gap-2 text-indigo-600"><CheckCircle2 size={14} /> 사용한 만큼만 지불하는 투명한 비용 (Blaze)</li>
           </ul>
           <div className="bg-slate-900 rounded-2xl p-5 text-white flex items-center justify-between">
              <span className="text-[10px] font-black text-orange-400 uppercase italic">수석 엔지니어의 선택: "이걸 누르세요!"</span>
              <ArrowRight size={16} className="animate-pulse" />
           </div>
        </div>
      </div>

      {/* After clicking guide */}
      <div className="bg-indigo-50 border border-indigo-100 p-10 rounded-[3.5rem] flex flex-col md:flex-row gap-12 items-center">
         <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-indigo-600 shrink-0">
           <Terminal size={48} />
         </div>
         <div className="flex-1">
           <h4 className="text-2xl font-black text-indigo-900 mb-4 italic">오른쪽 버튼을 누른 다음에는?</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">1</div>
                    <span className="text-xs font-black text-indigo-900 uppercase">Enable API</span>
                 </div>
                 <p className="text-[11px] text-indigo-700 leading-relaxed font-medium">
                   구글 클라우드에서 Vertex AI API를 자동으로 활성화합니다. 약 1분 정도 소요됩니다.
                 </p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">2</div>
                    <span className="text-xs font-black text-indigo-900 uppercase">Location Selection</span>
                 </div>
                 <p className="text-[11px] text-indigo-700 leading-relaxed font-medium">
                   리전을 선택하라고 나오면 <strong>'asia-northeast3' (서울)</strong>을 선택하여 지연 시간을 최소화하세요.
                 </p>
              </div>
           </div>
         </div>
      </div>
    </div>
  );
};
