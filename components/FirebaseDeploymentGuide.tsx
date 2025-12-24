
import React from 'react';
import { Cloud, Globe, Sparkles, ShieldCheck, Database, Terminal, CheckCircle2, Layout, Zap, Rocket, Code, Laptop } from 'lucide-react';

export const FirebaseDeploymentGuide: React.FC = () => {
  const deploymentSteps = [
    {
      title: "1. Flutter Web 호스팅 배포",
      icon: <Globe className="text-blue-500" />,
      desc: "Flutter로 개발한 웹 버전을 Firebase 서버에 올립니다.",
      cmds: ["flutter build web", "firebase deploy --only hosting"],
      tip: "사용자님이 보신 '웹 앱 호스팅' 타일을 클릭하여 시작하세요."
    },
    {
      title: "2. Firebase용 Vertex AI (Gemini)",
      icon: <Sparkles className="text-purple-500" />,
      desc: "API 키 노출 없이 앱 내에서 Gemini를 직접 사용합니다.",
      cmds: ["firebase vertexai:setup"],
      tip: "콘솔의 '앱에 AI 추가' 메뉴에서 Gemini 2.5 Flash를 활성화하세요."
    },
    {
      title: "3. 데이터베이스 및 보안 (Firestore)",
      icon: <Database className="text-orange-500" />,
      desc: "우리가 설계한 데이터 스키마와 보안 규칙을 배포합니다.",
      cmds: ["firebase deploy --only firestore:rules"],
      tip: "콘솔의 '백엔드 빌드' 타일에서 Firestore를 생성하세요."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      {/* Console Welcome Banner */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-20">
          <Cloud size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20 mb-6 text-xs font-black uppercase tracking-widest">
            <Zap size={14} /> Firebase Native Ops
          </div>
          <h2 className="text-5xl font-black mb-6 italic tracking-tight leading-none">
            FROM CODE TO <span className="text-slate-900 underline decoration-white underline-offset-8">CLOUD</span>
          </h2>
          <p className="text-orange-100 text-lg leading-relaxed font-medium">
            사용자님이 지금 보고 계신 Firebase 콘솔이 바로 우리 앱의 심장입니다.<br/>
            커서 AI로 짠 코드를 이곳에 '이식'하는 과정을 가이드해 드립니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {deploymentSteps.map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col group hover:border-orange-500 transition-all">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">{step.desc}</p>
            
            <div className="space-y-3 mb-8 flex-1">
              {step.cmds.map((cmd, j) => (
                <div key={j} className="bg-slate-900 rounded-xl p-3 flex items-center justify-between group/cmd">
                  <code className="text-[10px] text-emerald-400 font-mono">{cmd}</code>
                  <Terminal size={12} className="text-slate-600" />
                </div>
              ))}
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-orange-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-orange-800 font-bold italic leading-relaxed">
                "콘솔 팁: {step.tip}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Comparison */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
               <h3 className="text-2xl font-black italic flex items-center gap-3">
                 <Laptop className="text-indigo-600" /> 커서 AI vs Firebase 콘솔
               </h3>
               <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 font-black italic">IDE</div>
                    <div>
                      <div className="font-bold text-slate-900">커서 AI (Cursor)</div>
                      <p className="text-xs text-slate-500">코드를 작성하고, 버그를 수정하며, 구조를 잡는 '설계 사무소' 역할입니다.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0 font-black italic">OPS</div>
                    <div>
                      <div className="font-bold text-slate-900">Firebase 콘솔</div>
                      <p className="text-xs text-slate-500">서버를 돌리고, 데이터를 저장하며, AI를 실제 서비스에 연결하는 '공장' 역할입니다.</p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-80 p-8 bg-slate-900 rounded-[2.5rem] text-white">
               <div className="flex items-center gap-3 mb-4 text-emerald-400">
                 <ShieldCheck size={20} />
                 <h4 className="font-bold">최종 배포 체크리스트</h4>
               </div>
               <div className="space-y-4">
                  {[
                    "Firestore Index 최적화",
                    "Firebase Hosting SSL 자동 적용",
                    "Vertex AI Quota 설정",
                    "Cloud Functions 리전(Seoul) 설정"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold">
                       <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500">✓</div>
                       {item}
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
