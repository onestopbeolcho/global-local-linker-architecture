
import React from 'react';
import { Box, Cpu, Sparkles, Code2, CheckCircle2, ArrowRight, Smartphone, Settings, ShieldCheck, Zap, Layers, MousePointer2 } from 'lucide-react';

export const FirebaseStudioSetupWorkshop: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "AI Logic 활성화",
      icon: <Sparkles className="text-blue-500" />,
      desc: "콘솔에서 'AI Logic' 메뉴를 클릭하세요. 이것이 우리 앱에 Gemini의 지능을 이식하는 첫 관문입니다.",
      action: "Vertex AI for Firebase 시작하기 클릭",
      details: ["Gemini 2.5 Flash 모델 선택", "API 보안 및 할당량 설정"]
    },
    {
      id: "02",
      title: "Genkit으로 가디언 설계",
      icon: <Cpu className="text-purple-500" />,
      desc: "확인하신 'Genkit' 메뉴는 우리 앱의 'AI 가디언' 로직을 시각화합니다. 스팸과 사기를 여기서 걸러냅니다.",
      action: "Genkit Developer UI 활성화",
      details: ["Guardian Flow 정의", "문맥 유지 번역 엔진 셋업"]
    },
    {
      id: "03",
      title: "Flutter SDK Bridge 연동",
      icon: <Smartphone className="text-emerald-500" />,
      desc: "콘솔에서 설정한 AI 로직을 Flutter 앱의 '미션 전송' 버튼에 단 몇 줄의 코드로 연결합니다.",
      action: "firebase_vertexai 패키지 설치",
      details: ["App Check로 보안 통신", "클라우드 펑션 연동"]
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Workshop Header */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 mb-8">
            <Settings size={14} className="animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-widest text-indigo-300">System Configuration Workshop</span>
          </div>
          <h2 className="text-5xl font-black mb-6 italic tracking-tight leading-tight">
            DEPLOY <span className="text-orange-500">AI ENGINE</span><br/>
            FROM THE CONSOLE
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            사용자님이 확인하신 **AI Logic**과 **Genkit**을 순서대로 세팅하면, 
            우리 앱은 별도의 복잡한 서버 코딩 없이도 전 세계 최고 성능의 AI 기능을 갖게 됩니다.
          </p>
        </div>
      </div>

      {/* Interactive Step Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col group hover:border-indigo-500 transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div className="text-4xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors">{step.id}</div>
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{step.desc}</p>
            
            <div className="bg-slate-900 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer2 size={12} className="text-orange-400" />
                <span className="text-[10px] font-black text-orange-400 uppercase">Console Action</span>
              </div>
              <div className="text-xs font-mono text-white leading-relaxed">{step.action}</div>
            </div>

            <div className="space-y-2 mt-auto">
              {step.details.map((detail, j) => (
                <div key={j} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                  <CheckCircle2 size={12} className="text-emerald-500" /> {detail}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
