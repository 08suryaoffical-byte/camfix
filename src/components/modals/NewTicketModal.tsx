import React, { useState } from 'react';
import { Plus, X, Camera, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { CameraCaptureModal } from '../complaints/CameraCaptureModal';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

export const NewTicketModal: React.FC<NewTicketModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AV & Lecture Tech');
  const [location, setLocation] = useState('Block B • Rm 204');
  const [severity, setSeverity] = useState('High');
  const [submitting, setSubmitting] = useState(false);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCapture = (dataUrl: string, meta?: any) => {
    setCapturedPhoto(dataUrl);
    if (meta?.assetName && !title) {
      setTitle(`${meta.assetName} - ${meta.defect || 'Fault Reported'}`);
    }
    if (meta?.category) setCategory(meta.category);
    if (meta?.severity) setSeverity(meta.severity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const generatedCode = `CFX-${Math.floor(1000 + Math.random() * 9000)}`;
      onSuccess(generatedCode);
      onClose();
    }, 600);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-700" />
              <h3 className="text-base font-bold text-slate-900 font-display">
                Submit New Campus Incident / Simulation
              </h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Live Camera Capture Trigger Bar */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-red-600" />
                  <span>Optical Camera Proof</span>
                </span>
                <span className="font-mono text-[10px] text-teal-700 font-bold">
                  {capturedPhoto ? 'Photo Attached ✓' : 'Live Camera Available'}
                </span>
              </div>

              {capturedPhoto ? (
                <div className="relative rounded-lg overflow-hidden h-28 bg-slate-950 border border-slate-200">
                  <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setCameraModalOpen(true)}
                    className="absolute bottom-2 right-2 px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retake Photo</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCameraModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Turn On Camera to Capture Defect</span>
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Title / Brief Summary
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Overhead projector flicker during CSE seminar"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                >
                  <option>AV & Lecture Tech</option>
                  <option>HVAC & Air Quality</option>
                  <option>Electrical & Lighting</option>
                  <option>Plumbing & Sanitation</option>
                  <option>Network & Wi-Fi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Severity
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none"
                >
                  <option>Low (Routine / 48 hrs)</option>
                  <option>Medium (Scheduled / 24 hrs)</option>
                  <option>High (Impacts lecture / 4 hrs)</option>
                  <option>Critical (Immediate Exam Risk)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Block B • Floor 2 • Room 204"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/60 text-xs text-blue-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>AI Triage will automatically check duplicate clusters and determine required spare parts.</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                {submitting ? 'Submitting to AI Triage...' : 'Dispatch Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <CameraCaptureModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onCapture={handleCapture}
      />
    </>
  );
};
