
import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, DollarSign, Users, Globe, BarChart3, Zap, ArrowUpRight, ArrowDownRight, Server, Search, Terminal, Filter } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeIncident, setActiveIncident] = useState<number | null>(null);

  const stats = [
    { label: "오늘 총 거래액 (GMV)", value: "$12,840", trend: "+12.5%", isUp: true },
    { label: "플랫폼 순이익 (10%)", value: "$1,284", trend: "+10.2%", isUp: true },
    { label: "AI 차단 시도", value: "142건", trend: "-5.4%", isUp: false },
    { label: "활성 마스터", value: "4,892명", trend: "+2.1%", isUp: true },
  ];

  const aiLogs = [
    { id: 1, time: "14:22:10", location: "Seoul, KR", message: "외부 결제 링크 전송 시도", status: "BLOCKED", level: "CRITICAL", user: "User_8812" },
    { id: 2, time: "14:21:05", location: "Paris, FR", message: "신분증 위조 가능성 감지", status: "FLAGGED", level: "HIGH", user: "Master_992" },
    { id: 3, time: "14:20:45", location: "Cairo, EG", message: "스팸 홍보 문구 포함", status: "BLOCKED", level: "MEDIUM", user: "User_110" },
    { id: 4, time: "14:18:30", location: "Tokyo, JP", message: "개인 연락처 노출 방지", status: "CLEANED", level: "LOW", user: "Master_004" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic">
            <Terminal className="text-indigo-600" /> ADMIN COMMAND CENTER
          </h2>
          <p className="text-slate-500 font-medium">플랫폼 실시간 운영 상태 및 AI 보안 관제</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2">
            <Server size={14} /> CLOUD SYSTEMS: OPERATIONAL
          </div>
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-indigo-200">
            <Zap size={14} className="fill-white" /> AI GUARDIAN: ACTIVE
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{s.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${s.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {s.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Security Feed */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="text-white font-bold flex items-center gap-3 uppercase tracking-tighter italic">
              <ShieldAlert className="text-red-500" /> AI Guardian Real-time Logs
            </h3>
            <button className="text-white/40 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-white/30 uppercase tracking-widest border-b border-white/5">
                  <th className="px-8 py-4">Timestamp</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Security Event</th>
                  <th className="px-4 py-4">Action</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                {aiLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setActiveIncident(log.id)}>
                    <td className="px-8 py-4 text-white/40">{log.time}</td>
                    <td className="px-4 py-4 text-white/60">{log.location}</td>
                    <td className="px-4 py-4">
                      <div className="text-white font-medium">{log.message}</div>
                      <div className="text-[9px] text-white/20">{log.user}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${
                        log.level === 'CRITICAL' ? 'bg-red-500/10 border-red-500/50 text-red-400' :
                        log.level === 'HIGH' ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' :
                        'bg-blue-500/10 border-blue-500/50 text-blue-400'
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'BLOCKED' ? 'bg-red-500' : log.status === 'FLAGGED' ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                        <span className="text-white/80">{log.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-white/5 border-t border-white/5 text-center">
             <button className="text-xs text-indigo-400 font-bold hover:underline">로그 전체 보기 (Download JSON)</button>
          </div>
        </div>

        {/* Global Financial Flow */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Globe size={100} className="text-indigo-600" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 italic">
              <Globe className="text-indigo-600" size={18} /> Global Cash Flow
            </h4>
            <div className="space-y-4">
               {[
                 { city: "Buenos Aires", amount: "$1,240", percentage: 75 },
                 { city: "Seoul", amount: "$820", percentage: 55 },
                 { city: "Paris", amount: "$540", percentage: 35 },
                 { city: "Tokyo", amount: "$310", percentage: 20 },
               ].map((c, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">{c.city}</span>
                      <span className="text-indigo-600">{c.amount}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${c.percentage}%` }} />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-50">
               <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-2">
                 <BarChart3 size={14} /> 정산 리포트 발행
               </button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
             <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-indigo-300">System Vital Signs</h4>
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div className="text-xs font-bold text-indigo-200">Gemini 3.0 Pro API</div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> STABLE
                   </div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="text-xs font-bold text-indigo-200">Firebase Auth Latency</div>
                   <div className="text-[10px] font-black text-indigo-100">142ms</div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="text-xs font-bold text-indigo-200">Stripe Webhook Sync</div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full" /> SYNCED
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
