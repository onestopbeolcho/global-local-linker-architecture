
import React from 'react';
import { Award, Star, TrendingUp, CheckCircle, Lock, Zap, ShieldCheck, ChevronRight, Users, Coffee, Briefcase } from 'lucide-react';
import { UserMastery, MasterLevel } from '../types';

export const MasteryLevelingView: React.FC = () => {
  // 시뮬레이션 데이터
  const mastery: UserMastery = {
    level: 'ROOKIE',
    trustScore: 72,
    socialCount: 8,
    proCount: 0,
    isProEligible: false,
    pointsToNextLevel: 28
  };

  const levels: { id: MasterLevel; title: string; color: string; desc: string; perks: string[]; requirements: string[] }[] = [
    {
      id: 'ROOKIE',
      title: 'Rookie Master',
      color: 'bg-slate-500',
      desc: '이제 막 시작한 동네 탐험가입니다.',
      perks: ['Social Track 답변 가능', '자발적 팁 수령 가능'],
      requirements: ['KYC 인증 완료', 'GPS 위치 인증']
    },
    {
      id: 'GUIDE',
      title: 'Local Guide',
      color: 'bg-indigo-600',
      desc: '동네의 믿을만한 정보원입니다.',
      perks: ['소액 Pro 미션 수주 가능 ($10)', '가이드 배지 부여'],
      requirements: ['Social 답변 10회', '신뢰 점수 75점 이상']
    },
    {
      id: 'MASTER',
      title: 'Certified Master',
      color: 'bg-emerald-600',
      desc: '플랫폼이 인증하는 전문 마스터입니다.',
      perks: ['모든 Pro 미션 제한 없음', '수수료 10% -> 7% 감면', '우선 매칭권'],
      requirements: ['Pro 미션 5회 성공', '신뢰 점수 90점 이상']
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Current Mastery Status Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -mr-48 -mt-48"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-4xl shadow-2xl border-4 border-white/10">
            {mastery.level === 'ROOKIE' ? '👶' : '🥇'}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h2 className="text-3xl font-black italic">{mastery.level} MASTER</h2>
              <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</div>
            </div>
            <p className="text-indigo-200 mb-6 font-medium">현재 {mastery.socialCount}명의 여행자에게 도움을 주었습니다.</p>
            
            <div className="space-y-2 max-w-md">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-indigo-300">
                 <span>Next Level: Local Guide</span>
                 <span>{mastery.trustScore}%</span>
               </div>
               <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                 <div className="h-full bg-emerald-500 w-[72%] shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-1000" />
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
               <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">신뢰 점수</div>
               <div className="text-2xl font-black">{mastery.trustScore}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
               <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">해금된 권한</div>
               <div className="text-sm font-black text-emerald-400">Social Only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leveling Path Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {levels.map((level, idx) => {
          const isCurrent = level.id === mastery.level;
          const isLocked = idx > 0 && mastery.level === 'ROOKIE' && level.id !== 'ROOKIE';
          
          return (
            <div key={level.id} className={`p-8 rounded-[3rem] border-4 transition-all relative overflow-hidden ${isCurrent ? 'bg-white border-indigo-600 shadow-xl' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
              {isLocked && (
                <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center">
                    <Lock size={24} className="text-slate-400 mb-2" />
                    <span className="text-[10px] font-black text-slate-500">잠금됨</span>
                  </div>
                </div>
              )}
              
              <div className={`w-12 h-12 ${level.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                {idx === 0 ? <Users size={24} /> : idx === 1 ? <Coffee size={24} /> : <Briefcase size={24} />}
              </div>
              
              <h4 className="text-xl font-black text-slate-900 mb-2">{level.title}</h4>
              <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">{level.desc}</p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">혜택 (Perks)</div>
                  <ul className="space-y-2">
                    {level.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                        <Zap size={12} className="text-yellow-500 mt-0.5" /> {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">승급 조건</div>
                  <ul className="space-y-2">
                    {level.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        {isCurrent ? <CheckCircle size={12} className="text-emerald-500" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Logic Card */}
      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] flex items-start gap-6">
         <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-indigo-600 shrink-0">
           <ShieldCheck size={32} />
         </div>
         <div>
           <h4 className="text-lg font-black text-indigo-900 mb-2 italic">왜 단계별 승급이 필요한가요?</h4>
           <p className="text-sm text-indigo-700 leading-relaxed opacity-80">
             글로벌 플랫폼에서 '신뢰'는 가장 비싼 자산입니다. 질문자님 말씀대로 누구나 유료 미션을 하게 되면 저품질 결과물로 인해 여행자는 실망하고, 
             플랫폼은 분쟁 조정 비용으로 인해 손실을 봅니다. <strong>Social Track을 통해 검증된 로컬에게만 Pro 권한을 주는 것</strong>은 플랫폼의 장기적인 가용성과 수익성을 보장하는 가장 안전한 알고리즘입니다.
           </p>
         </div>
      </div>
    </div>
  );
};
