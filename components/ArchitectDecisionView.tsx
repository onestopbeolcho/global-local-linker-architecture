
import React from 'react';
import { Laptop, Cloud, ShieldCheck, Zap, LaptopIcon, Globe, Code2, Rocket, Server, GitBranch, Cpu, MessageSquare } from 'lucide-react';

export const ArchitectDecisionView: React.FC = () => {
  const comparison = [
    {
      title: "Cursor (Local IDE)",
      subtitle: "The Master's Workbench",
      icon: <Laptop className="text-indigo-500" />,
      pros: ["전체 프로젝트 문맥 이해도 (Cursor AI)", "iOS/Android 에뮬레이터 완벽 지원", "오프라인 작업 및 강력한 Git 관리"],
      recommend: true
    },
    {
      title: "Firebase Studio (IDX)",
      subtitle: "Cloud Native Sandbox",
      icon: <Cloud className="text-orange-500" />,
      pros: ["설정 없는 즉시 시작", "Gemini 모델 테스트(Genkit) 최적화", "어디서나 접속 가능한 개발 환경"],
      recommend: false
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4 italic tracking-tight uppercase">
            Architect's <span className="text-indigo-400">Final Choice</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            운영과 확장성을 고려한다면 **"로컬 환경(Cursor)에서 설계하고, Firebase를 엔진으로 사용하는 것"**이 정답입니다. 
            스튜디오는 '실험실'로, 로컬은 '생산 공장'으로 활용하세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {comparison.map((item, i) => (
          <div key={i} className={`p-8 rounded-[3rem] border-4 transition-all ${item.recommend ? 'bg-white border-indigo-600 shadow-2xl scale-105 z-10' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
                {item.icon}
              </div>
              {item.recommend && (
                <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">
                  Professional Choice
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">{item.title}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase mb-8">{item.subtitle}</p>
            
            <div className="space-y-4">
              {item.pros.map((pro, j) => (
                <div key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.recommend ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                    <ShieldCheck size={12} />
                  </div>
                  {pro}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl">
        <h3 className="text-2xl font-black mb-10 text-center italic">글로벌 서비스 운영을 위한 <span className="text-indigo-600">골든 워크플로우</span></h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
           
           {[
             { step: "Design", icon: <Code2 />, label: "Cursor AI", desc: "고도화된 로직 코딩" },
             { step: "Deploy", icon: <Rocket />, label: "Firebase CLI", desc: "클라우드 즉시 배포" },
             { step: "Monitor", icon: <Server />, label: "Firebase Console", desc: "사용자/결제 데이터 관리" }
           ].map((s, i) => (
             <div key={i} className="relative z-10 flex flex-col items-center text-center group">
               <div className="w-20 h-20 bg-white border-4 border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 group-hover:border-indigo-600 group-hover:text-indigo-600 transition-all shadow-xl mb-4">
                 {s.icon}
               </div>
               <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{s.step}</div>
               <div className="font-black text-slate-900">{s.label}</div>
               <p className="text-[10px] text-slate-500 mt-1">{s.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
