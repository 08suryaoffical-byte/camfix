import React, { useState } from 'react';
import { Search, X, AlertTriangle, Cpu, DoorOpen, Users, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { type: 'incident', title: 'CFX-8921: Epson Projector Burning in Rm 204', path: 'complaint-management', icon: AlertTriangle },
    { type: 'incident', title: 'INC-2024-884: Block A 3rd Fl Transformer Trip', path: 'command-center', icon: AlertTriangle },
    { type: 'asset', title: 'Carrier AC-Unit #4 (CS Dept Room 301)', path: 'digital-twin-map', icon: Cpu },
    { type: 'room', title: 'Computing Lab 4 (Room 302 - Critical)', path: 'digital-twin-map', icon: DoorOpen },
    { type: 'staff', title: 'Kumar R. (Lead High-Voltage Tech)', path: 'staff-assignment', icon: Users },
    { type: 'simulator', title: 'What-If Disruption Scenario A', path: 'disruption-simulator', icon: Cpu },
  ];

  const filtered = quickLinks.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search incidents, assets, buildings, rooms, technicians... (e.g. 302, projector, Kumar)"
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-3 max-h-80 overflow-y-auto flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1 font-semibold">
            {query ? 'Search Results' : 'Suggested Operational Records'}
          </span>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching records found for &quot;{query}&quot;. Try searching for &quot;Block A&quot;, &quot;Projector&quot;, or &quot;302&quot;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigate(item.path);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 text-left transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-900">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with mouse or tap</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
