
import React from 'react';
import { Search, TrendingUp, DollarSign, Layout, MousePointer2, BarChart3, Globe, Heart, Award, Users } from 'lucide-react';

export const GrowthView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              <Globe size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-500">+12% WoW</span>
          </div>
          <h4 className="font-bold text-slate-900">글로벌 활성 도시</h4>
          <div className="text-2xl font-black mt-1 text-slate-800">142 Cities</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              <Heart size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-500">Impact Score</span>
          </div>
          <h4 className="font-bold text-slate-900">누적 선순환 팁</h4>
          <div className="text-2xl font-black mt-1 text-slate-800">$1,240,500</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
              <Users size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-500">Verified</span>
          </div>
          <h4 className="font-bold text-slate-900">인증된 동네 마스터</h4>
          <div className="text-2xl font-black mt-1 text-slate-800">4,892 Masters</div>
        </div>
      </div>

      {/* Impact Visualization Card */}
      <div className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] -mr-48 -mt-48"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-6">
              <Award size={16} className="text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest">Global Altruism Index</span>
            </div>
            <h3 className="text-4xl font-black mb-6 leading-tight italic">
              단순한 팁이 아닌,<br/>
              누군가의 삶을 바꾸는 <span className="text-emerald-400">가치</span>입니다.
            </h3>
            <p className="text-indigo-100 text-lg leading-relaxed mb-10 opacity-80">
              Global Local-Linker는 Gemini AI를 통해 당신이 전달한 비용이 현지 경제에서 어떤 가치를 지니는지 분석하여 리포트합니다. 
              우리의 목표는 전 세계 지식 노동자들의 정당한 수익을 보장하는 것입니다.
            </p>
            <div className="flex gap-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex-1">
                  <div className="text-emerald-400 font-black text-2xl mb-1">90%</div>
                  <div className="text-[10px] text-indigo-300 font-bold uppercase">현지인 직접 수익</div>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex-1">
                  <div className="text-emerald-400 font-black text-2xl mb-1">0%</div>
                  <div className="text-[10px] text-indigo-300 font-bold uppercase">부당 광고 수익</div>
               </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h4 className="font-bold mb-6 flex items-center gap-2 italic"><BarChart3 size={18} className="text-emerald-400" /> Real-time Impact Feed</h4>
            <div className="space-y-4">
              {[
                { location: "Nairobi, Kenya", impact: "1개월치 학용품 지원", amt: "$15" },
                { location: "Jinan, China", impact: "풍성한 가족 저녁 식사", amt: "$12" },
                { location: "Hanoi, Vietnam", impact: "주간 대중교통 이용권", amt: "$8" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500/30 rounded-full flex items-center justify-center text-xs">📍</div>
                    <div>
                      <div className="text-xs font-bold">{item.location}</div>
                      <div className="text-[10px] text-indigo-300">{item.impact}</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-black">{item.amt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
