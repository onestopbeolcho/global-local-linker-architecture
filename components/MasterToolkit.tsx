
import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Send, ShieldCheck, Loader2, Zap, AlertCircle, CheckCircle, Video, Image as ImageIcon, RotateCw, X, Sparkles, Languages, Navigation } from 'lucide-react';
import { scanMissionWithAI, analyzeImageContent } from '../services/geminiService';

// 하버사인 거리 계산 함수
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const MasterToolkit: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [safetyStatus, setSafetyStatus] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<{summary: string, details: string[]} | null>(null);
  
  const missionTarget = { lat: -34.6394, lng: -58.3621 }; // 카미니토 거리 샘플 좌표
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("카메라 접근 실패:", err);
    }
  };

  useEffect(() => {
    if (step === 2) {
      startCamera();
      navigator.geolocation.getCurrentPosition((pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        setLocation({ lat: userLat, lng: userLng });
        
        // 거리 계산 (미션 장소와 현재 장소)
        const d = calculateDistance(userLat, userLng, missionTarget.lat, missionTarget.lng);
        setDistance(d);
      });
    }
  }, [step]);

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const data = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(data);
        
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        
        setLoading(true);
        try {
          const analysis = await analyzeImageContent(data);
          setAiAnalysis(analysis);
          setAnswerText(analysis.summary);
          setStep(3);
        } catch (e) {
          setStep(3);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // AI 가디언 검사 (외부 결제 유도 필터링)
      const res = await scanMissionWithAI(answerText);
      setSafetyStatus(res);
      
      if (res.isSafe) {
        setTimeout(() => {
          setLoading(false);
          setStep(4);
        }, 1500);
      } else {
        setLoading(false);
      }
    } catch (e) {
      alert("전송 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      <div className="bg-slate-900 text-white p-8 rounded-[3rem] flex justify-between items-center shadow-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap size={24} className="fill-white" />
          </div>
          <div>
            <h2 className="text-xl font-black italic tracking-tight">MASTER ENGINE</h2>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Geofencing Active
            </div>
          </div>
        </div>
        <div className="text-right">
           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Local Auth Status</div>
           {distance !== null ? (
             <span className={`px-3 py-1 rounded-full text-[10px] font-black ${distance <= 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
               {distance <= 50 ? 'VERIFIED LOCAL' : 'OUT OF RANGE'}
             </span>
           ) : (
             <span className="text-[10px] text-slate-500 italic">Checking...</span>
           )}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-xl font-black text-slate-800 px-4 italic">내 주변 활성 미션</h3>
          {[
            { id: 'm1', title: '카미니토 거리 인파 확인', reward: 15, distance: '1.2km' },
            { id: 'm2', title: '라 봄보네라 경기장 주변 사진', reward: 20, distance: '2.5km' }
          ].map((m) => (
            <button 
              key={m.id}
              onClick={() => setStep(2)}
              className="w-full bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-600 transition-all hover:shadow-xl"
            >
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.distance} Nearby</div>
                <div className="font-black text-slate-900 text-xl italic leading-none">{m.title}</div>
              </div>
              <div className="bg-emerald-100 text-emerald-600 px-6 py-3 rounded-2xl font-black text-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                ${m.reward}
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="animate-in zoom-in-95">
          <div className="relative rounded-[3.5rem] overflow-hidden bg-black aspect-[3/4] shadow-2xl border-4 border-white">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
              <button onClick={() => setStep(1)} className="p-4 bg-black/40 backdrop-blur-md rounded-full text-white">
                <X size={24} />
              </button>
              <div className="space-y-2">
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-[10px] font-black shadow-lg flex items-center gap-2">
                  <Navigation size={12} /> GPS LOCKED
                </div>
                {distance !== null && (
                  <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-black text-center">
                    {distance.toFixed(1)}km from Target
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
              <button 
                onClick={takePhoto}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-8 border-white/20 shadow-2xl active:scale-90 transition-all"
              >
                <div className="w-16 h-16 bg-slate-900 rounded-full" />
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-video">
            {capturedImage && <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />}
          </div>

          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 italic">Master's Response</h4>
            <textarea 
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="현지 상황을 설명하세요..."
              className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700 resize-none text-lg"
            />
            
            {safetyStatus && !safetyStatus.isSafe && (
              <div className="mt-6 p-5 bg-red-50 rounded-3xl border border-red-100 flex items-start gap-4 animate-shake">
                <AlertCircle className="text-red-500 shrink-0 mt-1" />
                <div>
                   <div className="text-sm font-black text-red-900">AI 가디언에 의해 차단되었습니다</div>
                   <p className="text-xs text-red-800 mt-1">{safetyStatus.reason}</p>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || !answerText || (distance !== null && distance > 50)}
            className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send /> 미션 리포트 최종 제출</>}
          </button>
          
          {distance !== null && distance > 50 && (
            <p className="text-center text-red-500 text-xs font-bold italic">
              "현재 위치가 미션 지역으로부터 50km를 초과합니다. 답변 제출이 불가능합니다."
            </p>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-16 animate-in zoom-in-95">
           <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
             <CheckCircle size={48} />
           </div>
           <h3 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tighter uppercase">Mission Accomplished</h3>
           <p className="text-slate-500 font-medium mb-12 max-w-xs mx-auto">
             성공적으로 제출되었습니다. 질문자가 승인하면 즉시 보상이 정산됩니다.
           </p>
           <button onClick={() => setStep(1)} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black shadow-lg">대시보드로 돌아가기</button>
        </div>
      )}
    </div>
  );
};
