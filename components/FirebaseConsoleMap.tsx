
import React from 'react';
import { Laptop, Cloud, Terminal, ShieldAlert, Smartphone, ArrowRight, ShieldCheck, Info, ChevronDown, LayoutDashboard, Zap, Globe, SmartphoneIcon, Download, Server, GitBranch, AlertTriangle, FolderOpen, CheckCircle2, FileCode2, Layers } from 'lucide-react';

export const FirebaseConsoleMap: React.FC = () => {
  const connectionChecks = [
    {
      title: "1. .firebaserc 파일 확인",
      desc: "프로젝트 루트에 이 파일이 있고 프로젝트 ID가 맞는지 확인하세요.",
      icon: <FileCode2 className="text-blue-500" />,
      code: "projects: { default: 'globallocallinker-...' }"
    },
    {
      title: "2. Firebase Options (Flutter)",
      desc: "lib/firebase_options.dart 파일이 존재하면 Flutter가 서버를 인식한 것입니다.",
      icon: <Smartphone className="text-emerald-500" />,
      code: "DefaultFirebaseOptions.currentPlatform"
    },
    {
      title: "3. CLI Current Project",
      desc: "터미널 명령어로 현재 활성화된 프로젝트를 확인하세요.",
      icon: <Terminal className="text-slate-400" />,
      code: "firebase projects:list"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Platform Bridge Explanation */}
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Layers size={200} className="text-indigo-600" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-black italic text-slate-900">
              왜 'Flutter' 대신 <span className="text-indigo-600">여러 앱</span>이 보이나요?
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              사용자님이 캡처하신 **Android, iOS, Web, Windows** 앱들은 Flutter라는 하나의 몸체가 입는 **'4벌의 옷'**과 같습니다. 
              Firebase는 각 옷(플랫폼)마다 고유한 이름표를 붙여줘야 통신이 가능하기 때문입니다.
            </p>
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-3xl border border-indigo-100 text-indigo-700 font-bold text-sm">
              <CheckCircle2 size={20} className="shrink-0" />
              "사용자님은 지금 가장 완벽한 멀티플랫폼 환경을 구축하셨습니다!"
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="w-full md:w-96 bg-slate-900 p-8 rounded-[3rem] text-white relative">
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                 <SmartphoneIcon size={32} />
               </div>
               <div className="font-black italic text-xs uppercase tracking-widest">Your Flutter App</div>
            </div>
            
            <div className="flex justify-between items-center relative py-4">
               <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-500/20 -translate-x-1/2"></div>
               <div className="flex flex-col gap-4 w-full">
                  {[
                    { label: "Android", icon: "🤖", id: "com.example.android" },
                    { label: "iOS", icon: "🍎", id: "com.example.ios" },
                    { label: "Web", icon: "🌐", id: "web-app" },
                    { label: "Windows", icon: "🪟", id: "win-app" }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 hover:border-indigo-500 transition-all">
                       <div className="flex items-center gap-3">
                         <span className="text-lg">{p.icon}</span>
                         <span className="text-[10px] font-bold">{p.label}</span>
                       </div>
                       <div className="text-[8px] font-mono text-slate-500">{p.id}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connectivity Status Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-4 border-indigo-500/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20 mb-8">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Connection Theory Verified</span>
          </div>
          <h2 className="text-5xl font-black mb-6 italic leading-tight uppercase">
            LOCAL-TO-CLOUD <br/>
            <span className="text-emerald-400">SYNC CHECK</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            이제 아래 3가지 파일/명령어를 커서(Cursor)에서 확인하세요. <br/>
            이것들이 존재한다면 콘솔의 4개 앱이 사용자님의 코드 하나에 이미 묶여 있는 것입니다.
          </p>
        </div>
      </div>

      {/* Connectivity Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {connectionChecks.map((check, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col group hover:border-indigo-500 transition-all">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              {check.icon}
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{check.title}</h3>
            <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">{check.desc}</p>
            <div className="mt-auto bg-slate-900 rounded-xl p-3">
              <code className="text-[10px] text-emerald-400 font-mono break-all">{check.code}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Next Step: AI Logic */}
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Zap size={150} className="text-orange-500" />
        </div>
        <h3 className="text-3xl font-black mb-10 text-center italic">
          다음 단계: <span className="text-orange-500">AI Logic(Vertex AI)</span> 활성화
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
              <h4 className="font-black text-orange-900 mb-2 flex items-center gap-2">
                <Zap size={18} /> 왜 AI Logic인가요?
              </h4>
              <p className="text-sm text-orange-800 leading-relaxed font-medium">
                콘솔 상단의 **'AI Logic'** 메뉴는 Firebase 전용 Gemini SDK를 설정하는 곳입니다. 
                이걸 활성화해야 Flutter 앱에서 API 키 노출 없이 안전하게 Gemini를 쓸 수 있습니다.
              </p>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
               <ArrowRight className="animate-bounce-h" />
               <span className="text-xs font-bold uppercase tracking-widest text-center">콘솔에서 'Vertex AI 시작하기' 버튼을 누르세요</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-8 text-white">
            <h4 className="font-black text-sm mb-4 text-indigo-400 uppercase tracking-widest">수석 엔지니어의 팁</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <p className="text-xs text-slate-400">사용자님이 캡처한 화면은 모든 앱의 '집'이 완성된 상태입니다. 이제 그 안에 '인공지능'을 채울 차례입니다.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <p className="text-xs text-slate-400">Blaze 요금제(사용량 기반 무료)가 설정되어 있어야 AI 기능을 활성화할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
