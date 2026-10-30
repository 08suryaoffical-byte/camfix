import React, { useState } from 'react';
import { AlertTriangle, Radio, ShieldAlert, X, CheckCircle2, Siren, BellRing, PhoneCall } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [broadcastDone, setBroadcastDone] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-red-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600 animate-pulse"></div>

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <Siren className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Emergency Ticker & Defcon Alert
              </h3>
              <span className="font-mono text-[10px] text-red-700 font-bold uppercase tracking-wider">
                DEFCON 2 // Power Substation Micro-Trip
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex flex-col gap-1.5">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Active Campus Advisory: North Academic Quadrant</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">
            Sudden voltage drop across Feeder 3A triggered automated UPS containment for Block A & Computing Labs. Dual back-up generators active on stand-by.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500">Event Sync Token:</span>
            <span className="font-bold text-slate-900">#SYN-9942</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500">Standby Generator Status:</span>
            <span className="font-bold text-teal-700">ONLINE (Holding 230V)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500">Scheduled Exams Protected:</span>
            <span className="font-bold text-blue-700">14 Halls Monitored</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              setBroadcastDone(true);
              setTimeout(() => {
                setBroadcastDone(false);
                onClose();
              }, 2000);
            }}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4" />
            <span>{broadcastDone ? 'Broadcast Pushed to All Campus Nodes ✓' : 'Broadcast Emergency Notice to DSIT App'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            Dismiss Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
