
import React from 'react';
import { CreditCard, ShieldCheck, Download, Printer, Landmark, Globe, CheckCircle2 } from 'lucide-react';

interface ReceiptProps {
  txId: string;
  amount: number;
  fee: number;
  net: number;
  masterName: string;
  timestamp: string;
}

export const ReceiptView: React.FC<ReceiptProps> = ({ txId, amount, fee, net, masterName, timestamp }) => {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl max-w-md mx-auto relative overflow-hidden animate-in zoom-in-95">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      {/* Receipt Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="text-indigo-600" />
        </div>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Official Receipt</h3>
        <p className="text-slate-400 text-[10px] font-bold mt-1">GLOBAL LOCAL-LINKER PLATFORM</p>
      </div>

      {/* Transaction Details */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-bold">Transaction ID</span>
          <span className="font-mono text-slate-900">{txId}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-bold">Date</span>
          <span className="text-slate-900">{new Date(timestamp).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-bold">Recipient</span>
          <span className="text-slate-900 font-black">{masterName} (Master)</span>
        </div>
      </div>

      {/* Price Table */}
      <div className="border-t border-b border-dashed border-slate-200 py-6 mb-8 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-600">Total Amount</span>
          <span className="text-sm font-black text-slate-900">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-red-500">
          <span className="text-xs font-bold">Platform Fee (10%)</span>
          <span className="text-xs font-black">-${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="text-base font-black text-slate-900">Net to Master</span>
          <span className="text-lg font-black text-emerald-600">${net.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Footer */}
      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 mb-8">
        <ShieldCheck className="text-emerald-500" size={24} />
        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase">Stripe Secured</div>
          <p className="text-[10px] text-slate-600">This transaction is protected by end-to-end encryption and Escrow security.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2">
          <Download size={14} /> SAVE
        </button>
        <button className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2">
          <Printer size={14} /> PRINT
        </button>
      </div>
      
      {/* Decorative Cutout */}
      <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-4 h-8 bg-slate-50 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};
