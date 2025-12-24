
import React from 'react';
import { Cloud, Database, ShieldCheck, Zap, CreditCard, Layout, Server, Lock, Code, Globe, MessageSquare } from 'lucide-react';

export const FirebaseIntegrationView: React.FC = () => {
  const integrationMap = [
    {
      title: "Backend Services (Cloud Functions)",
      icon: <Server className="text-orange-500" />,
      items: [
        { label: "Gemini AI Guardian", desc: "모든 텍스트/이미지의 보안 검사 수행", tech: "Node.js + Vertex AI SDK" },
        { label: "Stripe Connect Payout", desc: "거래 성공 시 수수료 10% 자동 정산", tech: "Stripe API + Firebase Admin" }
      ]
    },
    {
      title: "Data & Storage (Firestore/Storage)",
      icon: <Database className="text-blue-500" />,
      items: [
        { label: "Mission Master Schema", desc: "NoSQL 기반 고성능 지리 데이터 저장", tech: "Firestore GeoPoint" },
        { label: "Local Evidence Vault", desc: "현지 인증 사진 및 영상 암호화 저장", tech: "Firebase Storage Rules" }
      ]
    },
    {
      title: "AI & Connectivity",
      icon: <Zap className="text-yellow-500" />,
      items: [
        { label: "Vertex AI for Firebase", desc: "앱 내 실시간 번역 및 시맨틱 검색", tech: "Gemini 2.5 Flash" },
        { label: "Firebase Extensions", desc: "결제 및 이메일 알림 자동화", tech: "Stripe Extension" }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[100px] -mr-40 -mt-40"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-6 italic tracking-tight text-white">Firebase Power-up Map</h2>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-2xl">
            Cursor AI로 작성한 코드가 Firebase의 어떤 엔진들과 결합되는지 확인하세요. 
            이 구성이 완료되면 당신의 앱은 전 세계 어디서든 동작하는 엔터프라이즈급 서비스가 됩니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {integrationMap.map((section, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-slate-50 rounded-2xl shadow-inner">
                {/* Fixed: size prop type error by casting to ReactElement with any props */}
                {React.cloneElement(section.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <h3 className="font-black text-slate-800 leading-tight">{section.title}</h3>
            </div>
            
            <div className="space-y-6 flex-1">
              {section.items.map((item, j) => (
                <div key={j} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600">{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">{item.tech}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actual Firebase CLI Step-by-Step */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 italic">
          <Code className="text-indigo-600" /> Firebase CLI 셋업 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              {[
                { step: "Login", cmd: "firebase login", desc: "구글 계정으로 터미널 인증" },
                { step: "Init", cmd: "firebase init", desc: "Firestore, Functions, Hosting 활성화" },
                { step: "Deploy", cmd: "firebase deploy", desc: "작성한 보안 규칙 및 서버 코드 배포" }
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-xs shrink-0">{i+1}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{c.step}</div>
                    <code className="text-[10px] text-emerald-600 font-mono block mt-1">{c.cmd}</code>
                    <p className="text-[10px] text-slate-500 mt-1">{c.desc}</p>
                  </div>
                </div>
              ))}
           </div>
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <div className="flex items-center gap-3 mb-4 text-orange-400">
                <Lock size={20} />
                <h4 className="font-bold">보안 정책 (Security First)</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic mb-6">
                "클라이언트에서 Firebase를 직접 호출할 때는 반드시 Firestore Rules를 통해 50km 위치 인증 로직을 서버사이드에서 검증해야 합니다. Cursor AI에게 이 보안 규칙을 먼저 작성해달라고 요청하세요."
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 font-mono text-[10px] text-emerald-300">
                allow create: if request.resource.data.distance &lt;= 50;
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
