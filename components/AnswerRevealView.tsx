
import React, { useState } from 'react';
import { CheckCircle2, MapPin, Camera, Star, Heart, Award, ArrowRight, Zap, ShieldCheck, MessageSquare, Share2, DollarSign, Loader2, Coffee, Briefcase } from 'lucide-react';
import { LocalAnswer } from '../types';

interface Props {
  answer: LocalAnswer;
  rewardAmount: number;
  onApprove: () => void;
}

export const AnswerRevealView: React.FC<Props> = ({ answer, rewardAmount, onApprove }) => {
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsApproved(true);
      onApprove();
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Visual Evidence Card */}
      <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
        <img 
          src="https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80" 
          alt="Local Evidence" 
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
           <div className={`backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2 shadow-lg ${answer.mode === 'PRO' ? 'bg-emerald-500/90' : 'bg-indigo-500/90'}`}>
             <Camera size={14} /> LIVE PHOTO VERIFIED
           </div>
           {answer.mode === 'PRO' && (
             <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2 shadow-lg">
                <Briefcase size={12} /> MISSION COMPLETE
             </div>
           )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
           <div className="flex items-center gap-2 text-emerald-400 mb-1">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">{answer.distanceFromTarget}km Distance Verified</span>
           </div>
           <h3 className="text-xl font-bold">"{answer.masterName}" 마스터의 답변</h3>
        </div>
      </div>

      {/* Answer Content Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative">
        <div className="absolute -top-6 right-8">
           <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-50 text-3xl">
             {answer.masterAvatar}
           </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
           <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${answer.mode === 'PRO' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
             {answer.mode === 'PRO' ? 'Professional Track' : 'Social Advice Track'}
           </div>
           <span className="text-xs font-bold text-slate-400 ml-1">Trust Score: {answer.impactScore}</span>
        </div>

        <div className="text-slate-700 leading-relaxed font-medium text-lg mb-8">
          {answer.content}
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <MapPin size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Verification Point</div>
            <div className="text-sm font-bold text-slate-800">Buenos Aires, Argentina</div>
          </div>
        </div>
      </div>

      {/* Impact & Action Card */}
      {!isApproved ? (
        <div className={`rounded-[2.5rem] p-8 text-white shadow-2xl animate-in zoom-in-95 delay-300 ${answer.mode === 'PRO' ? 'bg-slate-900' : 'bg-indigo-900'}`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="text-2xl font-black italic mb-1 flex items-center gap-2">
                {answer.mode === 'PRO' ? <><Briefcase size={20} className="text-emerald-400" /> 보상금 승인</> : <><Heart size={20} className="text-red-400 fill-red-400" /> 감사의 팁 보내기</>}
              </h4>
              <p className="text-indigo-200 text-xs">{answer.mode === 'PRO' ? '계약된 보상을 지급합니다.' : '답변이 도움이 되었다면 감사를 전하세요.'}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-emerald-400">${rewardAmount}</div>
              <div className="text-[10px] font-bold opacity-50 uppercase">{answer.mode === 'PRO' ? 'Contract Value' : 'Voluntary Tip'}</div>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 mb-8">
             <div className="text-[10px] font-bold text-emerald-300 uppercase mb-2">Social Impact Expectation</div>
             <p className="text-sm italic leading-relaxed text-indigo-100">
               "이 금액은 현지 마스터에게 <strong>행복한 저녁 식사</strong>를 선물할 수 있는 가치입니다."
             </p>
          </div>

          <button 
            onClick={handleApprove}
            disabled={loading}
            className={`w-full py-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 ${answer.mode === 'PRO' ? 'bg-emerald-600 text-white' : 'bg-indigo-500 text-white'}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <>{answer.mode === 'PRO' ? <><CheckCircle2 /> 보상 승인 및 계약 종료</> : <><Coffee /> 감사의 커피 보내기</>}</>}
          </button>
          
          {answer.mode === 'SOCIAL' && (
            <button 
              onClick={onApprove}
              className="w-full mt-4 text-white/50 text-xs font-bold hover:text-white transition-colors"
            >
              도움이 되지 않았어요 (무료 확인)
            </button>
          )}
        </div>
      ) : (
        <div className="bg-emerald-500 rounded-[2.5rem] p-10 text-white text-center shadow-2xl animate-in zoom-in-95">
           <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <Award size={40} className="animate-bounce" />
           </div>
           <h4 className="text-3xl font-black mb-2">연결 완료!</h4>
           <p className="text-emerald-50 opacity-90 mb-8">성공적으로 처리되었습니다.</p>
        </div>
      )}
    </div>
  );
};
