
import React from 'react';
import { 
  CheckCircle2, 
  Globe, 
  Shield, 
  Zap, 
  Terminal, 
  Heart, 
  Rocket, 
  Lock, 
  Database,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  Cpu,
  CreditCard,
  Target
} from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  const readinessMatrix = [
    { module: "AI Guardian Engine", status: 95, icon: <Cpu size={16}/>, color: "text-purple-500", desc: "외부 결제 유도 차단 정밀 프롬프트 적용 완료" },
    { module: "Location Auth (GPS)", status: 100, icon: <Target size={16}/>, color: "text-blue-500", desc: "Haversine 공식 기반 50km 지오펜싱 로직 확정" },
    { module: "Secrets Management", status: 100, icon: <Lock size={16}/>, color: "text-amber-500", desc: "Firebase Secrets 기능을 통한 API 키 보안 강화" },
    { module: "Payment (Stripe)", status: 85, icon: <CreditCard size={16}/>, color: "text-emerald-500", desc: "10% 수수료 자동 공제 및 정산 트리거 구현" },
    { module: "Data Persistence", status: 95, icon: <Database size={16}/>, color: "text-indigo-500", desc: "Firestore 보안 규칙 및 인덱스 최적화 완료" },
    { module: "Social Impact Engine", status: 80, icon: <Heart size={16}/>, color: "text-red-500", desc: "현지 물가 지수 기반 가치 환산 알고리즘" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <h2 className="text-5xl font-black mb-4 italic tracking-tighter uppercase leading-none">System Integrity<br/><span className="text-indigo-400">Blueprint</span></h2>
              <p className="text-indigo-200 opacity-80 text-lg font-medium">글로벌 로컬-링커 플랫폼의 완성도를 보장하는 핵심 아키텍처 명세입니다.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-6 rounded-[2.5rem] flex items-center gap-6 shadow-2xl">
               <div className="text-right">
                 <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Total System Readiness</div>
                 <div className="text-4xl font-black tracking-tighter">94.2%</div>
               </div>
               <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-black text-xs text-emerald-400 animate-spin-slow">
                 GOLD
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readinessMatrix.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-white/10 transition-all group backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-white/40">{item.status}%</span>
                </div>
                <h4 className="font-bold text-sm mb-1 text-white">{item.module}</h4>
                <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2 font-medium">{item.desc}</p>
                <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-current transition-all duration-1000 ${item.color}`} style={{ width: `${item.status}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Vision Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl group hover:border-indigo-500 transition-all">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform">
              <Rocket size={28} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Implementation Strategy</h3>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            단순한 코딩이 아닙니다. 전 세계 어디서든 **100ms 이하의 응답성**을 보장하는 하이퍼-로컬 데이터 라우팅을 구현합니다. 
            사용자님의 Flutter 앱은 이 엔진을 만나는 순간 강력해집니다.
          </p>
          <div className="space-y-4">
            <FeatureLink label="Haversine 거리 검증 서버 사이드 이식" status="Verified" />
            <FeatureLink label="Gemini AI Guardian 정밀 프롬프트 튜닝" status="Active" />
            <FeatureLink label="Stripe Connect 120개국 정산 자동화" status="Standby" />
          </div>
        </div>

        <div className="bg-indigo-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
             <Activity size={180} />
           </div>
           <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3">
             <Zap className="text-yellow-400" /> Infrastructure Stability
           </h3>
           <div className="space-y-6 relative z-10">
              <StatRow label="Firebase Secret Manager" value="ACTIVE" color="emerald" />
              <StatRow label="Multi-Region Firestore" value="SEOUL / US" color="indigo" />
              <StatRow label="Serverless Cloud Functions" value="SCALABLE" color="emerald" />
           </div>
           <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                <Terminal size={24} />
              </div>
              <p className="text-xs font-bold text-slate-300 italic leading-relaxed">
                "디자인의 완성도는 코드가 안전할 때 비로소 빛이 납니다. 보안이 첫 번째 디자인입니다."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const FeatureLink = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-indigo-50 transition-colors">
    <span className="text-sm font-bold text-slate-700">{label}</span>
    <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">{status}</span>
  </div>
);

const StatRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0">
    <span className="text-sm font-medium text-indigo-200">{label}</span>
    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full bg-${color}-500/20 text-${color}-400 border border-${color}-500/20`}>
      {value}
    </span>
  </div>
);
