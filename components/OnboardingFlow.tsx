
import React, { useState } from 'react';
import { UserCheck, Shield, MapPin, Landmark, ArrowRight, Loader2, Camera, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { verifyIdWithAI } from '../services/geminiService';

export const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [idData, setIdData] = useState<any>(null);
  const [locationVerified, setLocationVerified] = useState(false);

  const handleIdUpload = async () => {
    setLoading(true);
    // 실제 구현 시에는 FileReader로 base64 변환
    // 시뮬레이션을 위해 샘플 여권 데이터 분석 호출 (이미지는 더미 사용)
    try {
      // 3초 후 인공지능이 분석한 것처럼 시뮬레이션
      setTimeout(async () => {
        const result = { isValid: true, name: "Mateo Garcia", country: "Argentina" };
        setIdData(result);
        setLoading(false);
        setStep(2);
      }, 2000);
    } catch (e) {
      alert("신분증 분석 실패");
      setLoading(false);
    }
  };

  const handleLocationVerify = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setTimeout(() => {
          setLocationVerified(true);
          setLoading(false);
          setStep(3);
        }, 1500);
      },
      (err) => {
        alert("위치 권한이 필요합니다.");
        setLoading(false);
      }
    );
  };

  const handleStripeLink = () => {
    setLoading(true);
    // Stripe Express Onboarding Redirect 시뮬레이션
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Progress Stepper */}
      <div className="flex justify-between items-center px-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step >= s ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-300'}`}>
              {step > s ? <CheckCircle size={20} /> : s}
            </div>
            {s < 4 && <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>
        
        {step === 1 && (
          <div className="space-y-6 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Camera size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900">신원 인증</h3>
            <p className="text-slate-500">정부 발행 신분증(여권/ID카드)을 업로드해주세요.<br/>Gemini AI가 즉시 진위 여부를 확인합니다.</p>
            <div className="p-12 border-4 border-dashed border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
              <input type="file" className="hidden" id="id-upload" onChange={handleIdUpload} />
              <label htmlFor="id-upload" className="cursor-pointer">
                <div className="text-slate-400 group-hover:text-indigo-500 transition-colors font-bold">이미지 업로드 또는 드래그</div>
              </label>
            </div>
            <button onClick={handleIdUpload} disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : "AI 검증 시작하기"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center animate-in slide-in-from-right-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MapPin size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900">실거주지 확인</h3>
            <p className="text-slate-500">현지인 마스터로 활동하려면 현재 해당 국가에<br/>체류 중임을 증명해야 합니다.</p>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-left">
              <div className="flex items-center gap-4 text-emerald-700 font-bold mb-2">
                <Shield size={20} /> GPS 지오펜싱 보안 가동 중
              </div>
              <p className="text-xs text-slate-500">수집된 위치 데이터는 50km 이내 현지 마스터 매칭을 위해서만 사용되며 별도 저장되지 않습니다.</p>
            </div>
            <button onClick={handleLocationVerify} disabled={loading} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : "현재 위치 전송 및 인증"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center animate-in slide-in-from-right-4">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Landmark size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900">결제 계좌 연결</h3>
            <p className="text-slate-500">Stripe Connect를 통해 안전하게 수익을 정산받으세요.<br/>120개국 이상의 통화를 지원합니다.</p>
            <div className="flex flex-wrap gap-2 justify-center py-4 opacity-50">
               <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold">VISA</span>
               <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold">Mastercard</span>
               <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold">Apple Pay</span>
            </div>
            <button onClick={handleStripeLink} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : "Stripe 온보딩 시작"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-10 animate-in zoom-in-95">
             <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200">
               <UserCheck size={48} />
             </div>
             <h3 className="text-4xl font-black text-slate-900 mb-4">마스터 인증 완료!</h3>
             <p className="text-slate-500 mb-10 leading-relaxed">
               축하합니다, <strong>{idData?.name}</strong>님!<br/>
               이제 'Global Local-Linker'의 공식 마스터로서<br/>
               전 세계 여행자들에게 도움을 주고 수익을 창출할 수 있습니다.
             </p>
             <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="text-[10px] font-bold text-slate-400 uppercase">Trust Score</div>
                   <div className="text-lg font-black text-indigo-600">80 pts</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="text-[10px] font-bold text-slate-400 uppercase">Master Rank</div>
                   <div className="text-lg font-black text-indigo-600">Bronze</div>
                </div>
             </div>
             <button onClick={() => window.location.reload()} className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black shadow-lg">대시보드로 이동</button>
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white/70 text-xs flex items-center gap-3">
         <Shield size={16} className="text-emerald-400" />
         모든 온보딩 과정은 GDPR 및 로컬 금융 규제를 준수하며, 데이터는 암호화되어 관리됩니다.
      </div>
    </div>
  );
};
