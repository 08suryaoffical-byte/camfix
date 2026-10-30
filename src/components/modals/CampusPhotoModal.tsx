import React, { useState } from 'react';
import { COLLEGE_INFO } from '../../data/mockData';
import { Building2, CheckCircle2, ZoomIn, ZoomOut, RotateCcw, X, MapPin, ExternalLink } from 'lucide-react';

interface CampusPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusPhotoModal: React.FC<CampusPhotoModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [showSignageHighlight, setShowSignageHighlight] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-display">
                {COLLEGE_INFO.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>{COLLEGE_INFO.campus}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSignageHighlight(!showSignageHighlight)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                showSignageHighlight
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span>{showSignageHighlight ? 'Signage Highlighted ✓' : 'Highlight Name Board'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* High-Resolution Canvas */}
        <div className="relative flex-1 bg-slate-950 overflow-auto p-4 flex items-center justify-center min-h-[350px]">
          <div 
            className="relative max-w-full transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            <img 
              src={COLLEGE_INFO.image}
              alt={COLLEGE_INFO.logoAlt}
              className="max-h-[66vh] w-auto rounded-xl object-contain shadow-2xl border border-slate-800"
            />

            {/* Glowing Name Board Spotlight on the Building Entrance Arch */}
            {showSignageHighlight && (
              <div className="absolute top-[34%] left-[28.5%] w-[13%] h-[7%] rounded border-2 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.9)] pointer-events-none animate-pulse">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold whitespace-nowrap shadow-xl flex items-center gap-1 font-mono">
                  <span>Signboard: {COLLEGE_INFO.shortName}</span>
                </div>
              </div>
            )}
          </div>

          {/* Floating Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-slate-900 border border-slate-700 p-1 rounded-lg shadow-lg">
            <button 
              onClick={() => setZoom((prev) => Math.min(prev + 0.2, 2.2))}
              className="w-8 h-8 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.8))}
              className="w-8 h-8 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoom(1)}
              className="w-8 h-8 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Details */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Verified Building Inscription:</strong> &quot;{COLLEGE_INFO.signageText}&quot;
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-xs"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
