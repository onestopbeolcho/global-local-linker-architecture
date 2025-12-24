
import React from 'react';
import { CheckCircle2, Globe, Shield, Zap, DollarSign, Terminal, Heart, Rocket, Code2, Lock, Cloud, Share2, BarChart3, Activity, ShieldCheck, Cpu, CreditCard, Scale, Laptop, Award, MessageSquare, MapPin, Database } from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  const readinessMatrix = [
    { module: "AI Guardian Engine", status: 95, icon: <Cpu size={16}/>, color: "text-purple-500", desc: "외부 결제 유도 차단 정밀 프롬프트 적용 완료" },
    { module: "Location Auth (GPS)", status: 100, icon: <MapPin size={16}/>, color: "text-blue-500", desc: "Haversine 공식 기반 50km 지오펜싱 로직 확정" },
    { module: "Secrets Management", status: 100, icon: <Lock size={16}/>, color: "text-amber-500", desc: "Firebase Secrets 기능을 통한 API 키 보안 강화" },
    { module: "Payment (Stripe)", status: 85, icon: <CreditCard size={16}/>, color: "text-emerald-500", desc: "10% 수수료 자동 공제 및 정산 트리거 구현" },
    { module: "Data Persistence", status: 95, icon: <Database size={16}/>, color: "text-indigo-500", desc: "Firestore 보안 규칙 및 인덱스 최적화 완료" },
    { module: "Social Impact Engine", status: 80, icon: <Heart size={16}/>, color: "text-red-500", desc: "현지 물가 지수 기반 가치 환산 알고리즘" }
  ];

  const engineeringMilestones = [
    { date: "2024.Q1", task: "Architecture Blueprint", status: "Done" },
    { date: "2024.Q2", task: "AI Translation & Safety", status: "Done" },
    { date: "2024.Q3", task: "Stripe & Secrets Config", status: "Done" },
    { date: "2024.Q4", task: "Global Beta Launch", status: "Planned" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      {/* Executive Summary */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black mb-2 italic tracking-tight uppercase">System Integrity Report</h2>
              <p className="text-indigo-200 opacity-80">Final Handover Build: Version 1.0.0-gold</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-3xl flex items-center gap-4">
               <div className="text-right">
                 <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Total Readiness</div>
                 <div className="text-3xl font-black">92.5%</div>
               </div>
               <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 flex items-center justify-center font-black text-[10px]">
                 GOLD
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readinessMatrix.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-white/40">{item.status}%</span>
                </div>
                <h4 className="font-bold text-sm mb-1">{item.module}</h4>
                <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2">{item.desc}</p>
                <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-current transition-all duration-1000 ${item.color}`} style={{ width: `${item.status}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engineering Roadmap */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Rocket className="text-orange-500" /> Development Lifecycle
          </h3>
          <div className="space-y-6">
            {engineeringMilestones.map((ms, i) => (
              <div key={i} className="flex items-center gap-6 relative">
                {i < engineeringMilestones.length - 1 && (
                  <div className="absolute left-[2.25rem] top-10 w-0.5 h-10 bg-slate-100" />
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-lg ${ms.status === 'Done' ? 'bg-emerald-500 text-white' : ms.status === 'In-Progress' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {ms.status === 'Done' ? <CheckCircle2 size={18} /> : ms.date}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-slate-800">{ms.task}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${ms.status === 'Done' ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {ms.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scalability Stats */}
        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-3 italic">
             <Globe className="text-indigo-600" /> Infrastructure Stability
           </h3>
           <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Lock className="text-amber-500" />
                  <span className="text-sm font-bold text-slate-700">Firebase Secret Manager</span>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-500" />
                  <span className="text-sm font-bold text-slate-700">Server-side Geofencing</span>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Verified</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Database className="text-indigo-600" />
                  <span className="text-sm font-bold text-slate-700">Multi-Region Firestore</span>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Global</div>
              </div>
           </div>
           
           <div className="mt-12 p-6 bg-slate-900 rounded-3xl border border-white/10 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <Terminal size={24} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Master Architect's Note</div>
                <div className="text-sm font-black text-white italic">"Security is not a feature, it's the foundation."</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
