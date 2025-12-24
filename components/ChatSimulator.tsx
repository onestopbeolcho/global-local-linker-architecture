
import React, { useState, useEffect, useRef } from 'react';
/* Added Heart to lucide-react imports to fix the error on line 173 */
import { Send, Languages, Info, ShieldCheck, Coffee, DollarSign, Loader2, User, Globe, MessageSquare, Zap, Heart } from 'lucide-react';
import { translateWithContext, scanMissionWithAI } from '../services/geminiService';

interface Message {
  id: string;
  sender: 'traveler' | 'local';
  text: string;
  translatedText?: string;
  timestamp: Date;
}

export const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'local', text: "¡Hola! Bienvenido a Buenos Aires. ¿En qué puedo ayudarte con la calle Caminito?", translatedText: "안녕하세요! 부에노스아이레스에 오신 것을 환영합니다. 카미니토 거리와 관련해 무엇을 도와드릴까요?", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [tipAmount, setTipAmount] = useState(5);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'traveler',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTranslating(true);

    try {
      // 1. AI Guardian 검사 (채팅 보안)
      const safety = await scanMissionWithAI(inputText);
      if (!safety.isSafe) {
        alert(`보안 경고: ${safety.reason}`);
        return;
      }

      // 2. 실시간 번역 (한국어 -> 스페인어 맥락)
      const translated = await translateWithContext(inputText, "Spanish (Argentine style)");
      
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, translatedText: translated } : msg
      ));

      // 3. 현지인 답변 시뮬레이션 (2초 후)
      setTimeout(() => {
        const localReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'local',
          text: "El clima está perfecto ahora. No hay mucha gente, es el mejor momento para fotos.",
          translatedText: "지금 날씨가 완벽해요. 사람이 많지 않으니 사진 찍기에 가장 좋은 시간입니다.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, localReply]);
      }, 2000);

    } catch (e) {
      console.error("Translation Error", e);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Left: Chat Area */}
      <div className="lg:col-span-2 flex flex-col h-[600px] bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
            <div>
              <div className="font-black text-slate-900 leading-none">Mateo (Local Master)</div>
              <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Verified Local • 1.2km away
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-400">
              <Languages size={18} />
            </div>
            <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-400">
              <ShieldCheck size={18} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'traveler' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] space-y-1 ${msg.sender === 'traveler' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-3xl font-medium text-sm shadow-sm ${msg.sender === 'traveler' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                  {msg.text}
                </div>
                {msg.translatedText && (
                  <div className={`text-[10px] font-bold flex items-center gap-1 italic px-2 ${msg.sender === 'traveler' ? 'text-indigo-400 justify-end' : 'text-slate-400'}`}>
                    <Languages size={10} /> {msg.translatedText}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTranslating && (
            <div className="flex justify-end">
              <div className="bg-indigo-50 text-indigo-400 px-4 py-2 rounded-2xl text-[10px] font-bold flex items-center gap-2 animate-pulse">
                <Loader2 size={12} className="animate-spin" /> AI가 번역 중...
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-slate-100">
          <div className="relative">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="메시지를 입력하세요 (예: 여기 사진 명당 알려주세요!)"
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 top-2 p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Cultural Context & Tip Preview */}
      <div className="space-y-6">
        {/* Cultural Context Card */}
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Globe size={80} />
          </div>
          <h4 className="text-lg font-black mb-4 flex items-center gap-2 italic">
            <Zap className="text-yellow-400" size={18} /> Cultural Insights
          </h4>
          <div className="space-y-4 relative z-10">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-[10px] font-black text-indigo-300 uppercase mb-1 tracking-widest">Tipping Culture</div>
              <p className="text-xs text-indigo-100 leading-relaxed">아르헨티나에서는 식당 팁으로 10%를 'Propina'라고 부르며 주는 것이 예의입니다.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-[10px] font-black text-indigo-300 uppercase mb-1 tracking-widest">Safety Note</div>
              <p className="text-xs text-indigo-100 leading-relaxed">카미니토 거리는 해가 지면 위험할 수 있으니 낮 시간에 방문하는 것을 권장합니다.</p>
            </div>
          </div>
        </div>

        {/* Tip Impact Preview */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
          <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Heart className="text-red-500" size={18} /> Social Impact Preview
          </h4>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">감사의 팁 설정</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setTipAmount(Math.max(1, tipAmount - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-bold">-</button>
                <span className="text-xl font-black">${tipAmount}</span>
                <button onClick={() => setTipAmount(tipAmount + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-bold">+</button>
              </div>
            </div>

            <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
               <div className="text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-widest">현지 가치 환산 (ARS)</div>
               <p className="text-sm text-emerald-800 leading-relaxed italic font-medium">
                 "이 ${tipAmount}는 마테오 가족이 신선한 <strong>소고기 스테이크(Parrilla)</strong>를 풍족하게 즐길 수 있는 금액입니다."
               </p>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2">
              <DollarSign size={16} /> 팁 미리 결제 (Escrow)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
