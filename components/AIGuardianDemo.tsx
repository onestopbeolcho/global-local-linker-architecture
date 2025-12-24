
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Loader2, Send } from 'lucide-react';
// Corrected import from scanMessageWithAI to scanMissionWithAI
import { scanMissionWithAI } from '../services/geminiService';
import { GuardianResult } from '../types';

export const AIGuardianDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GuardianResult | null>(null);

  const handleScan = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      // Corrected function call to scanMissionWithAI
      const res = await scanMissionWithAI(input);
      setResult(res);
    } catch (e) {
      // Do not mention API_KEY to user as per guidelines.
      alert("분석 작업 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "카카오톡 아이디 @travel_scam 추가해주시면 더 저렴하게 결제해드릴게요!",
    "이 근처 맛집은 중앙역 근처에 있는 블루 보틀입니다. 커피가 맛있어요.",
    "무료 비트코인 보상을 받으려면 이 링크를 클릭하세요!!! www.scam-site.com",
    "안녕하세요, 저는 현지 교사입니다. $10를 팁으로 주시면 제 딸의 한 달치 교재비가 됩니다."
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <ShieldCheck className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold">AI 가디언 시뮬레이터</h3>
          <p className="text-sm text-slate-500">Gemini 기반의 실시간 스팸 및 사기 감지</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
            테스트 메시지 입력
          </label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="분석할 메시지를 입력하세요..."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handleScan}
              disabled={loading || !input}
              className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              메시지 검사
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex)}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-colors max-w-[200px] truncate"
            >
              예제 {i + 1}: {ex.substring(0, 30)}...
            </button>
          ))}
        </div>

        {result && (
          <div className={`mt-6 p-4 rounded-xl border-2 ${result.isSafe ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
            <div className="flex items-start gap-3">
              {result.isSafe ? (
                <ShieldCheck className="text-emerald-600 mt-1" />
              ) : (
                <ShieldAlert className="text-red-600 mt-1" />
              )}
              <div>
                <div className="font-bold flex items-center gap-2">
                  {result.isSafe ? '안전한 메시지' : '위험 감지됨'}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${result.score > 70 ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}`}>
                    신뢰도 점수: {result.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{result.reason}</p>
                {result.detectedFlags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.detectedFlags.map((flag, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-2 py-1 rounded">
                        {flag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
