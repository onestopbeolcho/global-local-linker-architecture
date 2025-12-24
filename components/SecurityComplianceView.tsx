
import React from 'react';
import { ShieldCheck, Map, Camera, Zap, Award, Target, HelpCircle, Activity, Bell, Smartphone, Share2, CheckCircle, MapPin, Navigation } from 'lucide-react';

export const SecurityComplianceView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Neighborhood Mastery Layer */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="text-orange-500" /> 하이퍼 로컬 라우팅 (Hyper-Local Routing)
          </h3>
          <p className="text-sm text-slate-500 mb-6">질문이 어떻게 5,000km 밖의 현지인에게 정확히 전달되는가?</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <Map size={16} />
                </div>
                <div className="text-sm font-bold text-blue-900">AI 엔티티 추출 엔진</div>
              </div>
              <p className="text-xs text-blue-700 leading-relaxed">
                Gemini가 자연어 질문에서 '엔럭스 호텔', '지난성' 같은 핵심 엔티티를 좌표(lat/lng)로 변환합니다.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Navigation size={16} />
                </div>
                <div className="text-sm font-bold text-emerald-900">50km 로컬 인증 로직</div>
              </div>
              <code className="text-[10px] block bg-white p-2 rounded border border-emerald-200 text-emerald-800 font-mono">
                distance = haversine(q_lat, q_lng, user_lat, user_lng);<br/>
                isLocal = distance &lt;= 50; // Unit: km
              </code>
            </div>
          </div>
        </div>

        {/* Expertise Tags Layer */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-yellow-400" /> 신원 및 전문성 레이어 (KYC & Trust)
          </h3>
          <p className="text-sm text-slate-400 mb-8">답변자의 신뢰도를 보장하는 다각도 검증 시스템입니다.</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <Smartphone size={16} className="text-blue-400" />
                <span className="text-xs">전화번호 기반 소유권 인증</span>
              </div>
              <CheckCircle size={14} className="text-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <Share2 size={16} className="text-purple-400" />
                <span className="text-xs">소셜 신뢰 평판 통합 (Social Graph)</span>
              </div>
              <CheckCircle size={14} className="text-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-orange-400" />
                <span className="text-xs">GPS 기반 실제 거주 활동 증명</span>
              </div>
              <CheckCircle size={14} className="text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Mastery Progress Simulation */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h4 className="font-bold flex items-center gap-2">
            <Activity className="text-emerald-500" size={18} /> 글로벌 데이터 전송 로그 (Live)
          </h4>
        </div>
        <div className="p-6">
          <div className="space-y-4 font-mono text-[11px]">
            <div className="flex items-start gap-4 text-slate-400 border-b border-slate-50 pb-2">
              <span className="w-24 text-slate-300">18:05:22</span>
              <span className="text-blue-500 font-bold">[EXTRACT]</span>
              <span>Query from KR: "Enlux Hotel, Jinan" -> Coords(36.65, 117.02)</span>
            </div>
            <div className="flex items-start gap-4 text-emerald-500 bg-emerald-50 -mx-2 px-2 py-2 rounded">
              <span className="w-24">18:05:23</span>
              <span className="text-emerald-600 font-bold">[DISPATCH]</span>
              <div>
                <strong>Notifications Pushed!</strong>
                <p className="mt-1 opacity-80">Sent to 14 active users in Jinan within 5km radius with 'Foodie' tag.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-slate-400">
              <span className="w-24 text-slate-300">18:06:45</span>
              <span className="text-orange-500 font-bold">[MATCH]</span>
              <span>User_CN_102 Accepted. Virtual Chat Tunnel established.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
