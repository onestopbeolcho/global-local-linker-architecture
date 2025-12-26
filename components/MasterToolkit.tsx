
import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Send, ShieldCheck, Loader2, Zap, AlertCircle, CheckCircle, Video, Image as ImageIcon, RotateCw, X, Sparkles, Languages, Navigation } from 'lucide-react';
import { scanMissionWithAI, analyzeImageContent } from '../services/geminiService';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
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
  
  const missionTarget = { lat: -34.6394, lng: -58.3621 };
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1080 }, height: { ideal: 1920 } } 
      });
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
        const d = calculateDistance(userLat, userLng, missionTarget.lat, missionTarget.lng);
        setDistance(d);
      });
    }
  }, [step]);

  const takePhoto = async () => {
    triggerHaptic(50);
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const data = canvasRef.current.toDataURL('image/jpeg', 0.8);
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
      const res = await scanMissionWithAI(answerText);
      setSafetyStatus(res);
      
      if (res.isSafe) {
        triggerHaptic([50, 30, 50]);
        setTimeout(() => {
          setLoading(false);
          setStep(4);
        }, 1500);
      } else {
        triggerHaptic(200);
        setLoading(false);
      }
    } catch (e) {
      alert("전송 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20 p-4">
      <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] flex justify-between items-center shadow-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap size={24} className="fill-white" />
          </div>
          <div>
            <h2 className="text-lg font-black italic tracking-tight uppercase">Master Engine</h2>
            <div className="flex items-center gap-2 text-[8px] text-emerald-400 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Tracking
            </div>
          </div>
        </div>
        <div className="text-right">
           {distance !== null ? (
             <span className={`px-3 py-1 rounded-full text-[9px] font-black ${distance <= 50 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
               {distance <= 50 ? 'IN RANGE' : 'OUT OF RANGE'}
             </span>
           ) : (
             <span className="text-[9px] text-slate-500 italic">Authenticating...</span>
           )}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-xl font-black text-slate-100 px-2 italic uppercase">Available Missions</h3>
          {[
            { id: 'm1', title: '카미니토 거리 인파 확인', reward: 15, distance: '1.2km' },
            { id: 'm2', title: '라 봄보네라 경기장 주변 사진', reward: 20, distance: '2.5km' }
          ].map((m) => (
            <button 
              key={m.id}
              onClick={() => { triggerHaptic(10); setStep(2); }}
              className="w-full bg-[#1A1D23] p-6 rounded-[2.5rem] border border-white/5 shadow-sm flex items-center justify-between group hover:border-indigo-600 transition-all hover:shadow-xl"
            >
              <div className="text-left">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{m.distance} From You</div>
                <div className="font-black text-white text-lg italic leading-none">{m.title}</div>
              </div>
              <div className="bg-emerald-500 text-white px-5 py-3 rounded-2xl font-black text-base shadow-lg group-active:scale-95 transition-all">
                ${m.reward}
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="animate-in zoom-in-95">
          <div className="relative rounded-[3rem] overflow-hidden bg-black aspect-[3/4] shadow-2xl border-4 border-[#1F232B]">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
              <button onClick={() => setStep(1)} className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white">
                <X size={20} />
              </button>
              <div className="space-y-2">
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-[9px] font-black shadow-lg flex items-center gap-2">
                  <Navigation size={12} /> TARGET LOCKED
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <button 
                onClick={takePhoto}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl active:scale-90 transition-all p-1"
              >
                <div className="w-full h-full bg-slate-900 rounded-full border-2 border-white/10" />
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#1F232B] aspect-video">
            {capturedImage && <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />}
          </div>

          <div className="bg-[#1A1D23] rounded-[2.5rem] p-8 shadow-xl border border-white/5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Master's Submission</h4>
            <textarea 
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="현지 상황을 설명하세요..."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold text-white resize-none text-base"
            />
            
            {safetyStatus && !safetyStatus.isSafe && (
              <div className="mt-6 p-4 bg-red-900/20 rounded-3xl border border-red-500/30 flex items-start gap-3 animate-shake">
                <AlertCircle className="text-red-500 shrink-0 mt-1" size={16} />
                <div className="text-[10px] font-bold text-red-200">{safetyStatus.reason}</div>
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || !answerText || (distance !== null && distance > 50)}
            className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> 제출 및 보상 대기</>}
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-12 animate-in zoom-in-95">
           <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
             <CheckCircle size={40} />
           </div>
           <h3 className="text-3xl font-black text-white mb-4 italic tracking-tighter uppercase leading-none">Job Done!</h3>
           <p className="text-slate-500 text-sm font-medium mb-10 max-w-xs mx-auto">
             리포트가 질문자에게 전송되었습니다.<br/>승인 시 즉시 정산됩니다.
           </p>
           <button onClick={() => setStep(1)} className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black shadow-lg">대시보드</button>
        </div>
      )}
    </div>
  );
};
