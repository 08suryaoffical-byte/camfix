import React, { useState } from 'react';
import { TECHNICIANS_ROSTER } from '../../data/mockData';
import { Users, Wrench, Shield, CheckCircle2, AlertTriangle, Radio, PhoneCall, ArrowUpDown } from 'lucide-react';

export const StaffAssignment: React.FC = () => {
  const [technicians, setTechnicians] = useState(TECHNICIANS_ROSTER);
  const [selectedTech, setSelectedTech] = useState(TECHNICIANS_ROSTER[0]);
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);

  const handleRebalance = () => {
    setTechnicians((prev) =>
      prev.map((t) => {
        if (t.code === 'AV-408') {
          return { ...t, activeTasks: 3, stressIndex: '68%', status: 'Optimal', statusColor: 'bg-teal-600' };
        }
        if (t.code === 'C-305') {
          return { ...t, activeTasks: 3, stressIndex: '58%' };
        }
        return t;
      })
    );
    setDispatchAlert('Workload successfully rebalanced! Shifted 2 tasks from Taro Tanaka to Marcus Vance.');
    setTimeout(() => setDispatchAlert(null), 4000);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 font-display">
              Smart Staff Assignment & Dispatch Roster
            </h1>
            <p className="text-xs text-slate-500">
              Autonomous workforce load balancing and geolocation-based specialist dispatch.
            </p>
          </div>
        </div>

        <button
          onClick={handleRebalance}
          className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>Execute Auto-Load Rebalance</span>
        </button>
      </div>

      {dispatchAlert && (
        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{dispatchAlert}</span>
        </div>
      )}

      {/* Grid: Technician Cards & Active Task Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Technicians List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono px-1">
            <span>On-Duty Specialists ({technicians.length})</span>
            <span>Live Shift Matrix</span>
          </div>

          <div className="flex flex-col gap-3">
            {technicians.map((tech) => {
              const isSelected = selectedTech.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50/50 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={tech.avatar} 
                        alt={tech.name} 
                        className="w-11 h-11 rounded-full object-cover border border-slate-300"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${tech.statusColor}`}></span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{tech.name}</span>
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                          #{tech.code}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{tech.role}</span>
                      <span className="font-mono text-[10px] text-slate-400 mt-0.5">
                        Current Loc: {tech.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500">Tasks:</span>
                      <span className="font-mono text-xs font-bold text-slate-900">{tech.activeTasks}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500">Stress:</span>
                      <span className={`font-mono text-xs font-bold ${
                        parseInt(tech.stressIndex) > 100 ? 'text-red-600' :
                        parseInt(tech.stressIndex) > 70 ? 'text-amber-600' :
                        'text-teal-700'
                      }`}>
                        {tech.stressIndex}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Tech Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 font-mono uppercase">
              Specialist Profile & Route
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
              Active Beacon
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img 
              src={selectedTech.avatar} 
              alt={selectedTech.name} 
              className="w-14 h-14 rounded-full object-cover border border-slate-300 shadow-2xs"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 font-display">{selectedTech.name}</span>
              <span className="text-xs text-slate-500 font-mono">{selectedTech.role}</span>
              <span className="text-xs text-teal-700 font-semibold mt-0.5">{selectedTech.location}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-700">Certified Domain Skill Matrix</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedTech.specialties.map((spec) => (
                <span key={spec} className="font-mono text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => alert(`Radio frequency ping dispatched to ${selectedTech.name} (Radio ID: 104-E).`)}
              className="py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Radio Dispatch</span>
            </button>
            <button
              onClick={() => alert(`Direct VoIP Intercom opened with ${selectedTech.name}...`)}
              className="py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Voice Intercom</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
