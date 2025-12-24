
import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Star, 
  Briefcase, 
  Coffee, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Activity,
  Award,
  Clock
} from 'lucide-react';
import { MissionType, MissionMode } from '../types';

export const MissionFeedView: React.FC = () => {
  const [filter, setFilter] = useState<MissionMode | 'ALL'>('ALL');
  
  const missions: (MissionType & { distance: number, masterLevel: string, time: string, applicants: number })[] = [
    { id: 'm1', title: '부에노스아이레스 카미니토 거리 실시간 혼잡도', mode: 'PRO', type: 'PHOTO', reward: 15, location: 'La Boca, AR', description: '지금 사람 많은지 사진 3장만 찍어주세요!', distance: 1.2, masterLevel: 'GUIDE', time: '10분 전', applicants: 3 },
    { id: 'm2', title: '탱고 박물관 근처 분위기 좋은 카페?', mode: 'SOCIAL', type: 'INFO', reward: 5, location: 'San Telmo, AR', description: '로컬들만 가는 숨은 카페 있을까요?', distance: 3.5, masterLevel: 'ROOKIE', time: '25분 전', applicants: 12 },
    { id: 'm3', title: '라 봄보네라 경기장 투어 예약 도와주세요', mode: 'PRO', type: 'ACTION', reward: 25, location: 'La Boca, AR', description: '내일 오후 2시 투어 현장 예약이 가능한지 확인 필요합니다.', distance: 1.8, masterLevel: 'MASTER', time: '1시간 전', applicants: 1 },
    { id: 'm4', title: '엘 아테네오 서점에서 이 책 재고 있나요?', mode: 'PRO', type: 'RESEARCH', reward: 12, location: 'Recoleta, AR', description: '보르헤스 초판본 재고 확인 부탁드려요.', distance: 5.4, masterLevel: 'GUIDE', time: '2시간 전', applicants: 5 },
  ];

  const filteredMissions = filter === 'ALL' ? missions : missions.filter(m => m.mode === filter);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl">
        <div className="flex-1 w-full space-y-4">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
            <Activity className="text-emerald-500" /> Active Missions
          </h3>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="위치 또는 키워드로 주변 미션 검색..." 
              className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-inner focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-700"
            />
          </div>
        </div>
        <div className="flex gap-2 p-2 bg-slate-100 rounded-[2rem] border border-slate-200">
          <FilterTab active={filter === 'ALL'} onClick={() => setFilter('ALL')} label="전체" />
          <FilterTab active={filter === 'PRO'} onClick={() => setFilter('PRO')} label="PRO" icon={<Zap size={14}/>} />
          <FilterTab active={filter === 'SOCIAL'} onClick={() => setFilter('SOCIAL')} label="SOCIAL" icon={<Coffee size={14}/>} />
        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="group bg-white p-8 rounded-[3.5rem] border-2 border-slate-100 shadow-lg hover:border-indigo-500 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${mission.mode === 'PRO' ? 'bg-slate-900 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                {mission.mode === 'PRO' ? <Zap size={28} className="fill-yellow-400" /> : <Coffee size={28} />}
              </div>
              <div className="text-right">
                <div className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">${mission.reward}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mission.mode} REWARD</div>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <Clock size={12} /> {mission.time} <span className="text-slate-300">|</span> <MapPin size={12} /> {mission.location}
              </div>
              <h4 className="text-xl font-black text-slate-900 leading-tight italic">{mission.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                {mission.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">M</div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600">+{mission.applicants}</div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase">Applicants</span>
              </div>
              <button className={`px-6 py-3 rounded-2xl font-black text-xs shadow-lg flex items-center gap-2 transition-all ${mission.mode === 'PRO' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'} group-hover:translate-x-1`}>
                미션 수락하기 <ChevronRight size={14} />
              </button>
            </div>

            {/* Verification Badge */}
            <div className="absolute top-8 right-32 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-lg shadow-emerald-500/20">
                 <ShieldCheck size={10} /> LOCAL VERIFIED
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Geofencing Notice Card */}
      <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl flex items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32"></div>
        <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center text-white shrink-0 shadow-2xl">
          <Navigation size={40} className="animate-bounce" />
        </div>
        <div>
          <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Hyper-Local Geofencing Active</h4>
          <p className="text-indigo-100 font-medium opacity-80 leading-relaxed">
            질문자로부터 **50km 이내**의 검증된 현지 마스터에게만 미션을 노출합니다. 
            GPS 조작이나 허위 위치 인증은 AI 가디언에 의해 실시간으로 차단됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

const FilterTab = ({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon?: any }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${active ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800'}`}
  >
    {icon} {label}
  </button>
);
