import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'floating-banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, isStandalone, promptInstall } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // If already running in standalone mode (installed app), show active badge or nothing
  if (isStandalone) {
    if (variant === 'compact') {
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>App Installed</span>
        </span>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    if (isInstallable) {
      await promptInstall();
    } else {
      // If browser doesn't support direct prompt, open iOS modal or info popup
      setShowIOSModal(true);
    }
  };

  if (variant === 'floating-banner') {
    if (bannerDismissed || (!isInstallable && !isIOS)) return null;

    return (
      <>
        <div className="fixed bottom-20 left-4 right-4 z-40 sm:max-w-md sm:left-auto sm:right-6 bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white tracking-wide">Install CampusOps App</p>
              <p className="text-[11px] text-slate-300 truncate">Fast offline access & instant camera triage</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-lg shadow-sm transition active:scale-95"
            >
              Install
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showIOSModal && <IOSInstallModal onClose={() => setShowIOSModal(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer ${className}`}
        title="Install Mobile App"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{variant === 'full' ? 'Install CampusOps App' : 'Get App'}</span>
      </button>

      {showIOSModal && <IOSInstallModal onClose={() => setShowIOSModal(false)} />}
    </>
  );
};

const IOSInstallModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
              <img src="/pwa-192x192.png" alt="CampusOps" className="w-11 h-11 rounded-[14px] object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Install CampusOps</h3>
              <p className="text-xs text-slate-400">Dhanalakshmi Srinivasa IT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Install this mobile app to your home screen for full-screen camera issue reporting and fast offline access:
        </p>

        <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="flex items-center gap-3 text-slate-200">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Share className="w-4 h-4" />
            </div>
            <span>
              1. Tap the <strong className="text-white">Share</strong> button in Safari's bottom toolbar.
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-200">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <PlusSquare className="w-4 h-4" />
            </div>
            <span>
              2. Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>
              3. Tap <strong className="text-white">Add</strong> in the top right to complete installation.
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
        >
          Got It
        </button>
      </div>
    </div>
  );
};
