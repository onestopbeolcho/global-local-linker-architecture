
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Loader2, Send, ShieldCheck, Target, Bell, Users, Map, Star, Award, Camera, Mail, CheckCircle, Languages, Eye, Heart, Zap, ShieldAlert, Globe2, RotateCcw, Save, Briefcase, Coffee, Shield, AlertCircle } from 'lucide-react';
import { extractLocationContext, scanMissionWithAI, generateDetailedImpactReport, checkSemanticSimilarity } from '../services/geminiService';
import { saveState, loadState } from '../services/storageService';
import { LocationContext, GuardianResult, LocalAnswer, MissionMode } from '../types';
import { AnswerRevealView } from './AnswerRevealView';

export const PrototypeFlow: React.FC = () => {
  const initialState = loadState()?.prototype || {
    step: 1,
    mode: 'SOCIAL' as MissionMode,
    missionRequest: "아르헨티나 부에노스아이레스의 '카미니토 거리' 분위기가 궁금해요!",
    rewardAmount: 5,
    context: null,
    safetyResult: null,
    impactReport: null,
    receivedAnswer: null
  };

  const [step, setStep] = useState(initialState.step);
  const [mode, setMode] = useState<MissionMode>(initialState.mode);
  const [loading, setLoading] = useState(false);
  const [missionRequest, setMissionRequest] = useState(initialState.missionRequest);
  const [context, setContext] = useState<LocationContext | null>(initialState.context);
  const [safetyResult, setSafetyResult] = useState<GuardianResult | null>(initialState.safetyResult);
  const [impactReport, setImpactReport] = useState<any>(initialState.impactReport);
  const [rewardAmount, setRewardAmount] = useState(initialState.rewardAmount);
  const [receivedAnswer, setReceivedAnswer] = useState<LocalAnswer | null>(initialState.receivedAnswer);
  const [isSaving, setIsSaving] = useState(false);
  const [similarityResult, setSimilarityResult] = useState<{isDuplicate: boolean, similarQuestion?: string} | null>(null);

  // Persistence Effect
  useEffect(() => {
    setIsSaving(true);
    const timeout = setTimeout(() => {
      const currentState = loadState() || {};
      saveState({
        ...currentState,
        prototype: {
          step, mode, missionRequest, rewardAmount, context, safetyResult, impactReport, receivedAnswer
        }
      });
      setIsSaving(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [step, mode, missionRequest, rewardAmount, context, safetyResult, impactReport, receivedAnswer]);

  const handlePostMission = async () => {
    setLoading(true);
    setSimilarityResult(null);
    try {
      // 1. 시맨틱 유사도 검사 (중복 방지)
      const existingQuestions = ["카미니토 거리 사람 많나요?", "라 보카 지구 치안 어떤가요?"];
      const similarity = await checkSemanticSimilarity(missionRequest, existingQuestions);
      
      if (similarity.isDuplicate) {
        setSimilarityResult(similarity);
        setLoading(false);
        return;
      }

      // 2. AI 가디언 스캔
      const safety = await scanMissionWithAI(missionRequest);
      setSafetyResult(safety);
      if (!safety.isSafe) {
        alert("보안 위반 감지: " + safety.reason);
        setLoading(false);
        return;
      }

      // 3. 위치 컨텍스트 추출
      const extracted = await extractLocationContext(missionRequest);
      setContext(extracted);
      setStep(2);
    } catch (e) {
      alert("분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const report = await generateDetailedImpactReport(rewardAmount, "Argentina");
      setImpactReport(report);
      setStep(5);
    } catch (e) {
      alert("결제 처리 중 오류");
    } finally {
      setLoading(false);
    }
  };

  const simulateAnswerReceived = () => {
    setLoading(true);
    setTimeout(() => {
      setReceivedAnswer({
        id: "ans_123",
        masterName: mode === 'PRO' ? "전문가 마테오" : "친절한 가브리엘",
        masterAvatar: mode === 'PRO' ? "👨‍💼" : "🙋‍♂️",
        content: mode === 'PRO' 
          ? "카미니토 거리의 실시간 영상과 리포트입니다. 현재 2번가 입구 쪽은 매우 혼잡합니다."
          : "지금 날씨도 좋고 거리 예술가들이 많아서 활기차요!",
        mediaUrls: ["https://images.unsplash.com/photo-1589909202802-8f4aadce1849"],
        distanceFromTarget: mode === 'PRO' ? 0.8 : 4.5,
        timestamp: new Date().toISOString(),
        impactScore: 98,
        mode: mode
      });
      setLoading(false);
      setStep(6); 
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative pb-20">
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black text-slate-900 mb-2 italic">글로벌 지식 탐험 시작</h3>
            <p className="text-slate-500 font-medium">현지인만 아는 진짜 정보를 발견하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => { setMode('SOCIAL'); setRewardAmount(5); }}
              className={`p-8 rounded-[3rem] border-4 text-left transition-all ${mode === 'SOCIAL' ? 'bg-indigo-600 border-indigo-200 text-white shadow-2xl' : 'bg-white border-slate-100 hover:border-indigo-100'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${mode === 'SOCIAL' ? 'bg-white text-indigo-600' : 'bg-indigo-50 text-indigo-600'}`}>
                <Coffee size={28} />
              </div>
              <h4 className="text-xl font-black mb-2 italic uppercase tracking-tighter">Social Track</h4>
              <p className={`text-sm font-medium leading-relaxed ${mode === 'SOCIAL' ? 'text-indigo-100' : 'text-slate-500'}`}>
                가벼운 질문과 로컬 팁. 답변 확인 후 감사의 커피($5)를 선물할 수 있습니다.
              </p>
            </button>

            <button 
              onClick={() => { setMode('PRO'); setRewardAmount(20); }}
              className={`p-8 rounded-[3rem] border-4 text-left transition-all ${mode === 'PRO' ? 'bg-slate-900 border-slate-700 text-white shadow-2xl' : 'bg-white border-slate-100 hover:border-slate-300'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${mode === 'PRO' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                <Briefcase size={28} />
              </div>
              <h4 className="text-xl font-black mb-2 italic uppercase tracking-tighter">Pro Mission</h4>
              <p className={`text-sm font-medium leading-relaxed ${mode === 'PRO' ? 'text-slate-300' : 'text-slate-500'}`}>
                사진 촬영, 구매 대행 등 구체적인 결과물. 확정 보상($20+)과 품질이 보증됩니다.
              </p>
            </button>
          </div>

          <div className="bg-white p-8 rounded-[3.5rem] border-2 border-slate-200 shadow-xl mt-8">
            <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2 italic uppercase text-xs tracking-widest">
              <Languages size={18} className="text-indigo-500" /> Mission Briefing
            </h4>
            <textarea 
              value={missionRequest}
              onChange={(e) => setMissionRequest(e.target.value)}
              className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none font-bold text-slate-700"
              placeholder="궁금한 내용을 입력하세요..."
            />
            
            {similarityResult && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-3xl flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="text-amber-600 shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-black text-amber-900">유사한 질문이 이미 존재합니다!</div>
                  <p className="text-[10px] text-amber-800 font-medium mt-1">
                    "{similarityResult.similarQuestion}" 질문을 먼저 확인해 보시는 건 어떨까요? 
                    중복 질문은 답변 속도가 늦어질 수 있습니다.
                  </p>
                  <button onClick={() => setSimilarityResult(null)} className="mt-2 text-[10px] font-black underline text-amber-900">그래도 게시하기</button>
                </div>
              </div>
            )}

            <button 
              onClick={handlePostMission}
              disabled={loading || !missionRequest}
              className={`w-full mt-6 py-6 rounded-[2.5rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${mode === 'PRO' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'}`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Zap size={20}/> 미션 게시 및 전송</>}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl animate-in zoom-in-95 text-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={48} />
          </div>
          <h4 className="text-3xl font-black text-slate-900 italic mb-4">AI GUARDIAN APPROVED</h4>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            "{context?.extractedLocation}" 지역의 마스터들에게 미션을 전송합니다.<br/>
            안전 규정을 준수한 요청입니다.
          </p>
          <button onClick={simulateAnswerReceived} className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-lg shadow-2xl">
            답변 기다리기
          </button>
        </div>
      )}

      {step === 6 && receivedAnswer && (
        <AnswerRevealView 
          answer={receivedAnswer} 
          rewardAmount={rewardAmount} 
          onApprove={handlePayment}
        />
      )}

      {step === 5 && impactReport && (
        <div className="max-w-xl mx-auto space-y-8 animate-in zoom-in-95">
           <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl text-center">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-100">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 italic">IMPACT DELIVERED</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                성공적으로 보상이 전달되었습니다.<br/>이 팁이 현지에 미치는 영향입니다:
              </p>
              
              <div className="bg-emerald-50 p-8 rounded-[3rem] border border-emerald-100 text-left">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-emerald-600" />
                  <span className="font-black text-emerald-900 uppercase text-xs tracking-widest italic">Economic Impact Analysis</span>
                </div>
                
                <div className="space-y-6">
                   <div className="text-sm font-black text-emerald-900 leading-relaxed italic">
                      "{impactReport.localValue}"
                   </div>
                   <div className="grid grid-cols-1 gap-3">
                      {impactReport.items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-emerald-100">
                           <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="text-xs font-bold text-emerald-800">{item.label}</span>
                           </div>
                           <span className="font-black text-emerald-900">x{item.count}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <button 
                onClick={() => { setStep(1); setReceivedAnswer(null); }}
                className="w-full mt-10 bg-slate-900 text-white py-6 rounded-2xl font-black shadow-lg"
              >
                새로운 미션 찾기
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
