
import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Rocket, Smartphone, ShieldCheck, Wallet, Database } from 'lucide-react';

export const SystemCodeBridge: React.FC = () => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activePrompt, setActivePrompt] = useState<'core' | 'ui' | 'backend'>('core');

  const prompts = {
    core: `
# Module: Core Infrastructure Implementation
당신은 Flutter 시니어 개발자입니다. 프로젝트의 중추인 Core 레이어를 구현합니다.

## 구현 파일:
1. \`lib/core/services/ai_guardian_service.dart\`: Gemini 3 Flash API를 사용하여 메시지 스팸/보안 스캔 로직 구현.
2. \`lib/core/services/location_service.dart\`: Geolocation 패키지를 사용하여 현재 위치를 가져오고, Haversine 공식을 통해 질문 좌표와 50km 이내인지 검증하는 로직 구현.
3. \`lib/core/models/master_model.dart\`: ROOKIE, GUIDE, MASTER 레벨과 신뢰 점수를 포함한 데이터 모델 설계.

위 내용을 기반으로 클린 아키텍처 원칙에 따라 코드를 작성해줘.
`,
    ui: `
# Module: Premium UI Implementation
당신은 UI/UX에 정통한 Flutter 엔지니어입니다. 대시보드의 'MissionFeedView' 디자인을 Flutter로 이식합니다.

## 요구 사항:
1. \`lib/features/missions/presentation/widgets/mission_card.dart\`: 
   - 다크 테마 기반의 고급스러운 디자인.
   - Pro/Social 모드에 따른 색상 차별화 (Indigo/Emerald).
   - Neumorphism 또는 High-End Glassmorphism 스타일 적용.
2. \`lib/features/missions/presentation/pages/mission_feed_page.dart\`: 
   - 실시간 스트림 빌더를 통한 미션 목록 렌더링.
   - 상단 카테고리 필터링 애니메이션 적용.

가장 세련된 Dart 코드를 작성해줘.
`,
    backend: `
# Module: Firebase & Stripe Integration
당신은 Firebase Expert입니다. 백엔드 보안과 정산 로직을 구현합니다.

## 요구 사항:
1. \`firestore.rules\`: 
   - 답변 작성 시 50km 이내 거주자만 쓰기 권한 허용.
   - 유료 미션은 마스터 레벨이 'GUIDE' 이상일 때만 수락 가능하도록 보안 규칙 작성.
2. \`functions/src/payment_handler.ts\`: 
   - Stripe Webhook 수신 시 플랫폼 수수료 10%를 원천 징수하고 마스터의 Stripe Connect 계정으로 자동 정산하는 Cloud Function 작성.

Node.js와 Firebase Security Rules 코드를 제공해줘.
`
  };

  const handleCopy = (tab: keyof typeof prompts) => {
    navigator.clipboard.writeText(prompts[tab]);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-purple-900/40 rounded-[3rem] p-10 border border-purple-500/30 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Code2 size={200} />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic mb-4 tracking-tighter uppercase leading-tight">
            ENGINEERING <span className="text-purple-400">BRIDGE</span>
          </h2>
          <p className="text-purple-100/70 text-lg font-medium max-w-2xl mb-10 leading-relaxed">
            한 번에 전체를 이식하는 대신, 모듈별로 정교하게 이식하세요. 
            아래 탭을 선택하고 프롬프트를 복사하여 Cursor AI에게 요청하면 됩니다.
          </p>

          <div className="flex gap-4 mb-8">
            <TabButton active={activePrompt === 'core'} onClick={() => setActivePrompt('core')} icon={<Database size={16}/>} label="Core Engine" />
            <TabButton active={activePrompt === 'ui'} onClick={() => setActivePrompt('ui')} icon={<Smartphone size={16}/>} label="Premium UI" />
            <TabButton active={activePrompt === 'backend'} onClick={() => setActivePrompt('backend')} icon={<ShieldCheck size={16}/>} label="Security/Pay" />
          </div>

          <div className="bg-black/60 rounded-3xl p-8 border border-white/5 relative group">
             <pre className="text-xs font-mono text-purple-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
               {prompts[activePrompt]}
             </pre>
             <button 
               onClick={() => handleCopy(activePrompt)}
               className="absolute top-6 right-6 px-6 py-3 bg-white text-purple-900 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 hover:scale-105 transition-all"
             >
               {copiedTab === activePrompt ? <Check size={16} /> : <Copy size={16} />}
               {copiedTab === activePrompt ? "복사됨" : "프롬프트 복사"}
             </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1C2028] p-10 rounded-[3rem] border border-white/5">
        <h4 className="font-black text-white text-xl italic mb-6 uppercase flex items-center gap-3">
          <Rocket className="text-indigo-400" /> Implementation Roadmap
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoadmapStep step="01" title="Core Injection" desc="AI Guardian과 위치 인증 로직을 먼저 이식하여 시스템의 뇌를 만듭니다." />
          <RoadmapStep step="02" title="UI Sync" desc="시뮬레이터에서 본 미션 카드와 피드 UI를 Flutter 테마로 동기화합니다." />
          <RoadmapStep step="03" title="Cloud Webhook" desc="실제 결제와 보안 규칙을 배포하여 운영 가능한 상태로 전환합니다." />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 transition-all border ${active ? 'bg-purple-600 border-purple-400 text-white shadow-lg' : 'bg-black/20 border-white/5 text-slate-500 hover:text-slate-300'}`}
  >
    {icon} {label}
  </button>
);

const RoadmapStep = ({ step, title, desc }: any) => (
  <div className="space-y-4">
    <div className="text-4xl font-black text-white/5">{step}</div>
    <h5 className="font-bold text-indigo-400 uppercase tracking-widest text-xs">{title}</h5>
    <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);
