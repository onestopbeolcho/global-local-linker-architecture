
import React, { useState } from 'react';
import { DollarSign, PieChart, TrendingUp, AlertCircle, Zap, ShieldCheck, Wallet, ArrowUpRight, BarChart3, Loader2 } from 'lucide-react';
import { analyzeMonetizationPotential } from '../services/geminiService';
import { MonetizationAnalysis } from '../types';

export const MonetizationView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MonetizationAnalysis | null>(null);

  const sampleQ = "중국 지난성 엔럭스 호텔 주변 로컬 맛집 추천";
  const sampleA = "지난 루차이관 추천! 3인 150위안 수준.";

  const runAnalysis = async () => {
    setLoading(true);
    try {
      // 조회수 1200, 팁 $45 상황 시뮬레이션
      const result = await analyzeMonetizationPotential(sampleQ, sampleA, { views: 1200, tips: 45 });
      setAnalysis(result);
    } catch (e) {
      alert("분석 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-3xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">총 플랫폼 수수료 수익 (10%)</div>
          <div className="text-2xl font-black text-emerald-400">$12,450</div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
             <ArrowUpRight size={10} /> 15% vs last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">AI 마케팅 자동 생성 비용</div>
          <div className="text-2xl font-black text-red-500">$840</div>
          <div className="text-[10px] text-slate-400 mt-2 italic">Flash model optimized</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">유료 영상 제작 매출</div>
          <div className="text-2xl font-black text-indigo-600">$3,200</div>
          <div className="text-[10px] text-slate-400 mt-2">640 units generated</div>
        </div>
        <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg shadow-emerald-100">
          <div className="text-[10px] font-bold text-emerald-200 uppercase mb-2">Net Marketing ROI</div>
          <div className="text-2xl font-black">380%</div>
          <div className="text-[10px] text-emerald-100 mt-2">Efficiency verified</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ad Product Simulator */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2 italic">
             <Zap className="text-yellow-500" /> API 비용 효율화 시뮬레이터
           </h3>
           <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8">
              <p className="text-sm text-slate-600 mb-4 font-medium italic">"인기 답변을 자동으로 분석하여 비디오 생성 투자 여부를 결정합니다."</p>
              <button 
                onClick={runAnalysis}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : <BarChart3 size={18} />}
                바이럴 잠재력 및 ROI 분석 실행
              </button>
           </div>

           {analysis && (
             <div className="space-y-6 animate-in zoom-in-95">
               <div className="flex gap-4">
                 <div className="flex-1 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                   <div className="text-[10px] font-bold text-indigo-600 uppercase mb-1">Viral Potential</div>
                   <div className="text-2xl font-black text-indigo-900">{analysis.viralPotential}%</div>
                 </div>
                 <div className="flex-1 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                   <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Est. Ad Value</div>
                   <div className="text-2xl font-black text-emerald-900">${analysis.estimatedAdRevenue}</div>
                 </div>
               </div>
               
               <div className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${analysis.recommendation === 'PROCEED' ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${analysis.recommendation === 'PROCEED' ? 'bg-emerald-500' : 'bg-orange-500'} text-white shadow-lg`}>
                   {analysis.recommendation === 'PROCEED' ? <ShieldCheck /> : <AlertCircle />}
                 </div>
                 <div>
                   <div className="font-black text-slate-900">의사결정 결과: {analysis.recommendation}</div>
                   <p className="text-xs text-slate-500 mt-1">예상 API 비용 $0.5 대비 마케팅 가치가 월등히 높습니다.</p>
                 </div>
               </div>
             </div>
           )}
        </div>

        {/* Monetization Models */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl">
             <h4 className="font-black text-lg mb-4">Revenue Stream</h4>
             <ul className="space-y-4">
               <li className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">10%</div>
                 <span className="text-xs text-slate-300 italic">팁 결제 중개 수수료</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">$2</div>
                 <span className="text-xs text-slate-300 italic">유료 비디오 생성 (Veo)</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">Ads</div>
                 <span className="text-xs text-slate-300 italic">로컬 비즈니스 후원 Q&A</span>
               </li>
             </ul>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200">
             <div className="flex items-center gap-2 mb-4">
               <PieChart size={18} className="text-emerald-500" />
               <h4 className="font-bold text-sm">운영 비용 구조 (Cost-Cutter)</h4>
             </div>
             <div className="space-y-3">
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[80%]" />
               </div>
               <div className="flex justify-between text-[10px] font-bold">
                 <span>Gemini 3 Flash (Optimized)</span>
                 <span className="text-emerald-600">80%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[15%]" />
               </div>
               <div className="flex justify-between text-[10px] font-bold">
                 <span>Veo (On-Demand Only)</span>
                 <span className="text-indigo-600">15%</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
