
import React, { useState } from 'react';
import { Globe, Video, Search, Share2, Loader2, Sparkles, Youtube, Instagram, CheckCircle2, TrendingUp, Megaphone } from 'lucide-react';
import { generateSeoMetadata, createVideoScript } from '../services/geminiService';
import { SeoMetadata, VideoScript } from '../types';

export const ContentAutomationView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seo, setSeo] = useState<SeoMetadata | null>(null);
  const [script, setScript] = useState<VideoScript | null>(null);

  const sampleQ = "중국 지난성 엔럭스 호텔 주변에 3인이 식사할 수 있는 가성비 좋은 로컬 맛집 추천해주세요!";
  const sampleA = "엔럭스 호텔 도보 5분 거리의 '지난 루차이관'을 추천합니다. 3인 식사 시 약 150위안 내외로 매우 저렴하며 정통 로컬의 맛을 느낄 수 있습니다.";

  const handleAutomate = async () => {
    setLoading(true);
    try {
      const seoData = await generateSeoMetadata(sampleQ, sampleA);
      const scriptData = await createVideoScript(sampleQ, sampleA);
      setSeo(seoData);
      setScript(scriptData);
    } catch (e) {
      alert("자동화 처리 중 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-[2rem] text-white shadow-xl flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Sparkles /> 콘텐츠 멀티플라이어 엔진
          </h2>
          <p className="text-purple-100 opacity-80">Q&A 하나로 SEO와 SNS를 동시에 장악합니다.</p>
        </div>
        <button 
          onClick={handleAutomate}
          disabled={loading}
          className="bg-white text-purple-600 px-6 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Megaphone size={20} />}
          마케팅 에셋 자동 생성
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SEO Dashboard */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold">Search Engine Optimization</h3>
          </div>

          {!seo ? (
            <div className="h-64 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 italic">
              자동 생성을 시작하세요...
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-blue-500 uppercase mb-1">Generated Title</div>
                <div className="text-sm font-bold text-slate-800">{seo.title}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-blue-500 uppercase mb-1">Meta Description</div>
                <div className="text-xs text-slate-600 leading-relaxed">{seo.description}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {seo.keywords.map((k, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold border border-blue-100">
                    #{k}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <CheckCircle2 size={14} /> QAPage Schema Ready
                </div>
                <div className="text-[10px] font-mono text-slate-400">/{seo.slug}</div>
              </div>
            </div>
          )}
        </div>

        {/* Video Automation Dashboard */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Video size={120} />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold">Short-form Automation</h3>
          </div>

          {!script ? (
            <div className="h-64 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center text-slate-600 italic">
              Q&A를 비디오로 변환 대기 중...
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              <div className="space-y-3">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] font-bold text-pink-400 mb-1">SCRIPT HOOK (0-3s)</div>
                  <div className="text-sm italic">"{script.hook}"</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] font-bold text-pink-400 mb-1">VEO AI VISUAL PROMPT</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2">{script.visualPrompt}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-red-600/20 border border-red-500/30 rounded-xl flex items-center justify-center gap-2">
                  <Youtube size={16} className="text-red-500" />
                  <span className="text-[10px] font-bold">SHORTS</span>
                </div>
                <div className="flex-1 p-3 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center gap-2">
                  <Instagram size={16} className="text-purple-500" />
                  <span className="text-[10px] font-bold">REELS</span>
                </div>
                <div className="flex-1 p-3 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center gap-2">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-bold">TIKTOK</span>
                </div>
              </div>

              <div className="bg-emerald-500 text-white p-3 rounded-xl text-center text-xs font-bold animate-pulse">
                Veo AI Rendering in Progress... (70%)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
