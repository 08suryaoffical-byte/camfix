import React, { useState } from 'react';
import { COLLEGE_INFO, MOCK_USERS } from '../../data/mockData';
import { UserProfile, UserRole } from '../../types';
import { 
  Building2, 
  ShieldCheck, 
  KeyRound, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ZoomIn,
  GraduationCap,
  Wrench,
  UserCheck,
  Lock,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { OfflineIndicator } from '../pwa/OfflineIndicator';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  onGuestTriage?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onGuestTriage }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('ops_admin');
  const [identifier, setIdentifier] = useState('director.ops@dsit.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const user = MOCK_USERS[role];
    if (user) {
      setIdentifier(user.email);
      setPassword('password123');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorNotice('Please provide your institutional email or registration ID.');
      return;
    }
    setErrorNotice(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = MOCK_USERS[selectedRole] || MOCK_USERS.ops_admin;
      onLogin(user);
    }, 450);
  };

  const handleQuickLogin = (role: UserRole) => {
    handleRoleSelect(role);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(MOCK_USERS[role]);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Institutional Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-900/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white font-display">
                {COLLEGE_INFO.name}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                {COLLEGE_INFO.shortName}
              </span>
            </div>
            <span className="text-xs text-slate-400 truncate max-w-md">
              {COLLEGE_INFO.campus} • {COLLEGE_INFO.tagline}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <PWAInstallButton variant="compact" />
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Campus Grid: <strong className="text-emerald-400">99.4% Operational</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800/50 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>CamFix Mobile</span>
          </div>
        </div>
      </header>
      <OfflineIndicator />
      <PWAInstallButton variant="floating-banner" />

      {/* Main Two-Column Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: College Image Spotlight Showcase (Prominently displays the institution name in the photograph) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-black/80">
            
            {/* The College Campus Image with Name clearly visible on the building portico */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-950">
              <img 
                src={COLLEGE_INFO.image}
                alt={COLLEGE_INFO.logoAlt}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback in case of path resolution variance
                  const target = e.currentTarget;
                  if (!target.src.includes('public/')) {
                    target.src = '/public/assets/aistudio/Screenshot_2026-10-30_102756_29d3acc9.png';
                  }
                }}
              />
              
              {/* Subtle Ambient Vignette / Scrim to ensure the image name stays sharp */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

              {/* Spotlight Badge Highlighting the Building Signage */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  Main Academic Block & Portal Gateway
                </span>
              </div>

              {/* Interactive Zoom / Inspect button */}
              <button
                type="button"
                onClick={() => setZoomModalOpen(true)}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-850 backdrop-blur-md border border-slate-700/80 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg transition-all hover:border-blue-400 group/btn"
                title="Click to view full photo and inspect the college name board"
              >
                <ZoomIn className="w-3.5 h-3.5 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                <span>Inspect College Signage</span>
              </button>

              {/* Direct Name Board Spotlight overlay indicator matching the blue building arch board */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 font-mono">
                    Official Institutional Campus Landmark
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-white font-display tracking-tight flex items-center gap-2">
                    {COLLEGE_INFO.name}
                  </h2>
                  <p className="text-xs text-slate-300">
                    <span className="font-semibold text-slate-200">Visible on Building Arch:</span> {COLLEGE_INFO.campus}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setZoomModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-1"
                  >
                    <span>View Facade</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Micro-Features Strip below image */}
            <div className="p-4 bg-slate-900 border-t border-slate-800/80 grid grid-cols-3 divide-x divide-slate-800 text-center">
              <div className="px-2">
                <span className="block text-xs font-semibold text-slate-300">Campus Twin 3D</span>
                <span className="text-[11px] text-slate-500">BIM Level 4 Synced</span>
              </div>
              <div className="px-2">
                <span className="block text-xs font-semibold text-slate-300">AI Neural Triage</span>
                <span className="text-[11px] text-slate-500">98% Redundancy Filter</span>
              </div>
              <div className="px-2">
                <span className="block text-xs font-semibold text-slate-300">Resilience Engine</span>
                <span className="text-[11px] text-slate-500">Autonomous Mitigation</span>
              </div>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/40 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-blue-300 font-semibold">CamFix Institutional Access:</strong> Unified operational command, automated complaint clustering, and digital facility management for students, faculty, engineers, and administrators of DSIT.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Enterprise Authentication Portal */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Accent Gradient Rim */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400"></div>

            {/* Card Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  CamFix Enterprise Ops
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SSO v2.4 Active
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white font-display tracking-tight">
                Institutional Sign In
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Enter your credentials or select a role to test the live operations suite.
              </p>
            </div>

            {/* Quick Demo Role Selector (1-Click Switchers) */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                One-Click Quick Sign In (Choose Persona):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('ops_admin')}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    selectedRole === 'ops_admin' 
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm' 
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">Dr. Aris Vance</span>
                    <span className="text-[10px] text-slate-400 truncate">Ops Director</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('technician')}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    selectedRole === 'technician' 
                      ? 'bg-teal-600/15 border-teal-500 text-white shadow-sm' 
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">Kumar R.</span>
                    <span className="text-[10px] text-slate-400 truncate">Lead Electrical</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('faculty')}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    selectedRole === 'faculty' 
                      ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm' 
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">Prof. Zimmerman</span>
                    <span className="text-[10px] text-slate-400 truncate">Exam Dean / CSE</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('student')}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    selectedRole === 'student' 
                      ? 'bg-amber-600/15 border-amber-500 text-white shadow-sm' 
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">Sarah Jenkins</span>
                    <span className="text-[10px] text-slate-400 truncate">Student (21BCE)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Error notice if any */}
            {errorNotice && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Standard Login Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Institutional Email or Student Reg / Employee ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. director.ops@dsit.ac.in or 21BCE1092"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Please contact DSIT IT Helpdesk at helpdesk@dsit.ac.in or Extension #402.'); }} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter institutional password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Remember on this terminal</span>
                </label>
                <span className="text-slate-500">Campus Unit: DSIT Central</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Authenticating with DSIT Directory...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to CamFix Operations</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Guest student incident report button */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onGuestTriage) {
                    onGuestTriage();
                  } else {
                    handleQuickLogin('student');
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Guest Student Fast-Pass: Report Urgent Incident</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="border-t border-slate-800/60 bg-slate-900/60 px-4 sm:px-8 py-3 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>{COLLEGE_INFO.name}</span>
          <span>·</span>
          <span>Samayapuram, Tiruchirappalli - 621 112</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span>Security Certified ISO 27001</span>
          <span>·</span>
          <span>BIM & Facility Operations</span>
          <span>·</span>
          <span>CamFix v4.9.2</span>
        </div>
      </footer>

      {/* High-Resolution College Facade Zoom Modal */}
      {zoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    {COLLEGE_INFO.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-Fidelity Campus View • Signage Verification
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setZoomModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* High Resolution Image View with Signage Highlight */}
            <div className="relative flex-1 bg-slate-950 overflow-auto p-2 flex items-center justify-center">
              <div className="relative max-w-full">
                <img 
                  src={COLLEGE_INFO.image}
                  alt={COLLEGE_INFO.logoAlt}
                  className="max-h-[68vh] w-auto rounded-lg object-contain"
                />

                {/* Visible Name Board Highlight Box on Portico */}
                <div className="absolute top-[35%] left-[29%] w-[12%] h-[6%] rounded border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] pointer-events-none animate-pulse">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold whitespace-nowrap shadow-md">
                    College Name Board
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Callout */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Signage Text Verified:</strong> &quot;{COLLEGE_INFO.signageText}&quot;
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shrink-0"
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
