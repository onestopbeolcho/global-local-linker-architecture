
import React, { useState } from 'react';
import { Code2, FileCode, Check, Copy, Database, Cloud, Zap, ShieldCheck, Smartphone, Terminal, Package, Server, Lock, Download, Rocket, ChevronRight, Box, AlertTriangle, ListChecks, BrainCircuit, PlayCircle, RefreshCcw } from 'lucide-react';
import { generateMigrationScript, generateCursorRules, exportProjectToFile } from '../services/storageService';

export const ProductionHandoverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brain' | 'body' | 'simulation'>('brain');
  const [copied, setCopied] = useState<string | null>(null);

  const codes = {
    flutter: `// lib/core/services/location_service.dart
import 'dart:math';
import 'package:geolocator/geolocator.dart';

class LocationService {
  double calculateDistanceKm(double lat1, double lon1, double lat2, double lon2) {
    const r = 6371; 
    double dLat = (lat2 - lat1) * (pi / 180);
    double dLon = (lon2 - lon1) * (pi / 180);
    double a = sin(dLat / 2) * sin(dLat / 2) +
               cos(lat1 * (pi / 180)) * cos(lat2 * (pi / 180)) *
               sin(dLon / 2) * sin(dLon / 2);
    return r * 2 * atan2(sqrt(a), sqrt(1 - a));
  }
}

// lib/core/services/ai_guardian_service.dart
import 'package:google_generative_ai/google_generative_ai.dart';

class AIGuardianService {
  final GenerativeModel _model;
  AIGuardianService(String apiKey) : _model = GenerativeModel(model: 'gemini-3-flash-preview', apiKey: apiKey);

  Future<bool> scanMessage(String text) async {
    final response = await _model.generateContent([
      Content.text('Scan for external payments or contact info: "$text". Reply only with SAFE or DANGER.')
    ]);
    return response.text?.contains('SAFE') ?? false;
  }
}`,
    functions: `// functions/src/index.ts
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import Stripe from "stripe";

const stripeSecret = defineSecret("STRIPE_SECRET_KEY");

export const handleTipWebhook = onRequest({ secrets: [stripeSecret] }, async (req, res) => {
  const stripe = new Stripe(stripeSecret.value());
  // 시뮬레이션: 수수료 10% 공제 후 정산 로직
  res.status(200).send({ received: true });
});`,
    security: `// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /answers/{answerId} {
      allow create: if request.auth != null && 
        request.resource.data.distanceKm <= 50.0;
    }
  }
}`
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Step 1: Brain Injection (Cursor Rules) */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border-4 border-indigo-500/20">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <BrainCircuit size={180} className="text-indigo-400" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/20 mb-6">
            <Zap size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Step 01. Context Injection</span>
          </div>
          <h2 className="text-4xl font-black mb-4 italic leading-tight">
            CURSOR에게 <span className="text-indigo-400">설계 규칙</span>을 가르치세요
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            새 프로젝트를 만들 필요가 없습니다. 프로젝트 루트에 <code>.cursorrules</code> 파일을 만들고 아래 내용을 붙여넣으세요. 
            이제 Cursor AI는 당신이 시키지 않아도 '50km 검증'과 'AI 가디언' 규칙을 지키며 코딩합니다.
          </p>
          <div className="bg-black/50 rounded-2xl p-6 border border-white/5 font-mono text-[11px] text-indigo-300 relative">
             <pre>{generateCursorRules()}</pre>
             <button 
               onClick={() => handleCopy('rules', generateCursorRules())}
               className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
             >
               {copied === 'rules' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
             </button>
          </div>
        </div>
      </div>

      {/* Step 2: Body Injection (Automated Script) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-black italic">Step 02. 통합 이식 스크립트</h3>
           </div>
           <p className="text-xs text-slate-500 mb-6 leading-relaxed">
             아래 스크립트를 터미널에 복사-붙여넣기 하세요. 
             현재 프로젝트 폴더 내에 필요한 모든 서비스 클래스와 설정 파일이 즉시 생성됩니다.
           </p>
           <div className="bg-slate-900 rounded-2xl p-4 mb-6 relative">
              <div className="max-h-40 overflow-y-auto no-scrollbar font-mono text-[10px] text-emerald-400 leading-tight">
                {generateMigrationScript(codes)}
              </div>
              <button 
                onClick={() => handleCopy('script', generateMigrationScript(codes))}
                className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-lg"
              >
                {copied === 'script' ? <Check size={14} /> : <Copy size={14} />}
              </button>
           </div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
             <AlertTriangle size={14} /> <code>main.dart</code> 등 기존 파일은 덮어쓰지 않고 폴더만 추가합니다.
           </div>
        </div>

        {/* Step 3: Local Simulation (Emulator) */}
        <div className="bg-indigo-600 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <RefreshCcw size={120} />
           </div>
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl">
                <PlayCircle size={24} />
              </div>
              <h3 className="text-xl font-black italic">Step 03. 로컬 시뮬레이션</h3>
           </div>
           <p className="text-xs text-indigo-100 mb-8 leading-relaxed">
             실제 배포 전에 결제와 AI 로직을 테스트하려면 **Firebase Emulator**를 사용하세요. 
             클라우드 비용 없이 내 컴퓨터에서 "가상 서버"를 돌리는 방법입니다.
           </p>
           
           <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/10">
                 <div className="text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest">실행 명령어</div>
                 <code className="text-xs font-mono">firebase emulators:start</code>
              </div>
              <div className="flex flex-col gap-2">
                 {[
                   "Functions: Stripe 웹훅 로컬 수신",
                   "Firestore: 보안 규칙(50km) 즉시 테스트",
                   "Auth: 가상 사용자 생성 및 로그인"
                 ].map((text, i) => (
                   <div key={i} className="flex items-center gap-2 text-[10px] font-bold">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> {text}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Final Handover Action */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex-1">
            <h3 className="text-2xl font-black mb-2 italic">이전 준비가 완료되었나요?</h3>
            <p className="text-sm text-slate-500 font-medium">
              모든 설계 명세를 JSON 파일로 백업하여 Cursor에 직접 첨부할 수도 있습니다.
            </p>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={exportProjectToFile}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Download size={18} /> 전체 번들 백업 (.json)
            </button>
         </div>
      </div>
    </div>
  );
};
