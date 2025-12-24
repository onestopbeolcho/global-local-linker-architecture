
import React, { useState } from 'react';
import { CreditCard, ArrowRight, Wallet, ShieldCheck, Landmark, ArrowUpRight, Loader2, CheckCircle2, Globe } from 'lucide-react';
import { createPaymentIntent } from '../services/stripeService';
import { ReceiptView } from './ReceiptView';

export const PaymentFlowView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  const handleStartPayment = async () => {
    setLoading(true);
    // 시뮬레이션: $20 미션 보상 결제
    const result = await createPaymentIntent(20);
    setPaymentInfo(result);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <CreditCard size={120} />
        </div>
        
        <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
          <Globe className="text-indigo-600" /> Stripe Connect 글로벌 정산 시스템
        </h3>

        {step === 1 && (
          <div className="space-y-6">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
              <div className="text-sm font-bold text-slate-400 uppercase mb-2">테스트 미션 보상액</div>
              <div className="text-5xl font-black text-slate-900">$20.00</div>
              <div className="text-xs text-slate-500 mt-2 italic">Currency: USD (Global Base)</div>
            </div>
            <button 
              onClick={handleStartPayment}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-3 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><CreditCard /> 결제 세션 생성</>}
            </button>
          </div>
        )}

        {step === 2 && paymentInfo && (
          <div className="space-y-8 animate-in zoom-in-95">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">총 결제액</div>
                <div className="text-xl font-black text-indigo-900">${paymentInfo.grossAmount}</div>
              </div>
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-[10px] font-bold text-red-400 uppercase mb-1">플랫폼 수수료 (10%)</div>
                <div className="text-xl font-black text-red-900">-${paymentInfo.fee}</div>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">현지인 정산액</div>
                <div className="text-xl font-black text-emerald-900">+${paymentInfo.netAmount}</div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="text-emerald-400" />
                  </div>
                  <div className="text-sm font-bold">Stripe 3D Secure Active</div>
                </div>
                <div className="text-xs text-slate-400 font-mono">{paymentInfo.id}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-slate-400">Payment Method</span>
                  <span className="font-bold flex items-center gap-2">•••• 4242 <CreditCard size={14}/></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Merchant</span>
                  <span className="font-bold">Global Local-Linker Platform</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleConfirmPayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "지금 결제하기 (T+0 Escrow)"}
            </button>
          </div>
        )}

        {step === 3 && paymentInfo && (
          <div className="space-y-8 animate-in fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-black text-slate-900">결제 완료!</h4>
            </div>

            <ReceiptView 
              txId={paymentInfo.id}
              amount={paymentInfo.grossAmount}
              fee={paymentInfo.fee}
              net={paymentInfo.netAmount}
              masterName="Mateo Garcia"
              timestamp={new Date().toISOString()}
            />
            
            <button 
              onClick={() => setStep(1)} 
              className="w-full text-slate-400 font-bold text-sm hover:text-slate-600"
            >
              새로운 거래 시뮬레이션
            </button>
          </div>
        )}
      </div>

      {/* Backend Logic Explanation */}
      <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
         <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="p-6 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm">
               <Landmark className="text-yellow-400 mb-4" size={32} />
               <h5 className="font-bold mb-2">Firebase Cloud Functions 로직</h5>
               <p className="text-xs text-indigo-200 leading-relaxed italic">
                 "사용자가 결제하면 Stripe Webhook이 발송되고, Cloud Function은 이를 수신하여 Firestore의 Transaction 상태를 COMPLETED로 업데이트합니다."
               </p>
            </div>
            <div className="flex-1 space-y-4">
               <div className="flex items-start gap-3">
                 <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                 <p className="text-sm opacity-80">Stripe Connect Account 생성 (Express Onboarding)</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                 <p className="text-sm opacity-80">PaymentIntent 생성 시 Transfer_Data 필드에 현지인 계좌 지정</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                 <p className="text-sm opacity-80">Application_Fee_Amount 설정을 통한 플랫폼 수수료 원천징수</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
