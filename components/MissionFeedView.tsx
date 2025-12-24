
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Filter, Star, Clock, Briefcase, Coffee, ShieldCheck, Zap, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';
import { MissionType, MissionMode } from '../types';

export const MissionFeedView: React.FC = () => {
  const [filter, setFilter] = useState<MissionMode | 'ALL'>('ALL');
  
  // 시뮬레이션 데이터
  const missions: (MissionType & { distance: number, masterLevel: string, time: string })[] = [
    { id: 'm1', title: '부에노스아이레스 카미니토 거리 실시간 혼잡도', mode: 'PRO', type: 'PHOTO', reward: 15, location: 'La Boca, AR', description: '지금 사람 많은지 사진 3장만 찍어주세요!', distance: 1.2, masterLevel: 'GUIDE', time: '10분 전' },
    { id: 'm2', title: '탱고 박물관 근처 분위기 좋은 카페?', mode: 'SOCIAL', type: 'INFO', reward: 5, location: 'San Telmo, AR', description: '로컬들만 가는 숨은 카페 있을까요?', distance: 3.5, masterLevel: 'ROOKIE', time: '25분 전' },
    { id: 'm3', title: '라 봄보네라 경기장 투어 예약 도와주세요', mode: 'PRO', type: 'ACTION', reward: 25, location: 'La Boca, AR', description: '내일 오후 2시 투어 현장 예약이 가능한지 확인 필요합니다.', distance: 1.8, masterLevel: 'MASTER', time: '1시간 전' },
    { id: 'm4', title: '엘 아테네오 서점에서 이 책 재고 있나요?', mode: 'PRO', type: 'RESEARCH', reward: 12, location: 'Recoleta, AR', description: '보르헤스 초판본 재고 확인 부탁드려요.', distance: 5.4, masterLevel: 'GUIDE', time: '2시간 전' },
  ];

  const filteredMissions = filter === 'ALL' ? missions : missions.filter(m => m.mode === filter);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="주변 미션 검색..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
          />
        </div>
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-3xl border border-slate-200 w-full md:w-auto overflow-x-auto">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${filter === 'ALL' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            All Missions
          </button>
          <button 
            onClick={() => setFilter('PRO')}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-2 ${filter === 'PRO' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            <Briefcase size={14} /> Professional
          </button>
          <button 
            onClick={() => setFilter('SOCIAL')}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-2 ${filter === 'SOCIAL' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            <Coffee size={14} /> Social
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Missions</div>
           <div className="text-2xl font-black text-slate-900">14</div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Near You (5km)</div>
           <div className="text-2xl font-black text-indigo-600">6</div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Bounty</div>
           <div className="text-2xl font-black text-emerald-600">$420</div>
         </div>
         <div className="bg-slate-900 p-6 rounded-3xl shadow-xl flex items-center justify-between">
           <div>
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Rank</div>
             <div className="text-xl font-black text-white italic">ROOKIE</div>
           </div>
           <Zap className="text-yellow-400 fill-yellow-400" size={24} />
         </div>
      </div>

      {/* Live Feed List */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 px-2">
          <Activity className="text-emerald-500" /> Real-time Mission Feed
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredMissions.map((mission) => (
            <div key={mission.id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${mission.mode === 'PRO' ? 'bg-slate-900 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                          {mission.mode === 'PRO' ? <Briefcase size={24} /> : <Coffee size={24} />}
                       </div>
                       <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mission.time}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className={`text-[10px] font-black uppercase ${mission.mode === 'PRO' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                              {mission.mode} TRACK
                            </span>
                          </div>
                          <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{mission.title}</h4>
                       </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                       {mission.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-600">
                          <MapPin size={12} className="text-indigo-500" /> {mission.location}
                       </div>
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-600">
                          <Navigation size={12} className="text-blue-500" /> {mission.distance}km away
                       </div>
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-600">
                          <Star size={12} className="text-yellow-500" /> Req: {mission.masterLevel}
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between items-end gap-4">
                     <div className="text-right">
                        <div className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform origin-right">
                          ${mission.reward}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Estimated Bounty</div>
                     </div>
                     <button className={`px-8 py-3 rounded-2xl font-black text-sm shadow-lg flex items-center gap-2 transition-all ${mission.mode === 'PRO' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'} group-hover:translate-x-1`}>
                        Details <ChevronRight size={16} />
                     </button>
                  </div>
               </div>
               
               {/* Decorative Gradient Background */}
               <div className={`absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl -mr-32 -mt-32 rounded-full ${mission.mode === 'PRO' ? 'bg-slate-500' : 'bg-indigo-500'}`} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Simulation Info */}
      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] flex items-start gap-6">
         <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-indigo-600 shrink-0">
           <ShieldCheck size={28} />
         </div>
         <div>
           <h4 className="text-lg font-black text-indigo-900 mb-1">Hyper-Local Geofencing 가동 중</h4>
           <p className="text-sm text-indigo-700 leading-relaxed opacity-80">
             플랫폼은 하버사인(Haversine) 공식을 사용하여 질문자의 위치와 마스터의 GPS 정보를 실시간 대조합니다. 
             50km를 초과하는 지역의 마스터에게는 Pro 미션이 노출되지 않으며, Social 답변 시에도 'Local Verified' 배지가 부여되지 않습니다.
           </p>
         </div>
      </div>
    </div>
  );
};
