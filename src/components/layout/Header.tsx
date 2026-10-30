import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { COLLEGE_INFO } from '../../data/mockData';
import { 
  Search, 
  Bell, 
  Plus, 
  AlertTriangle, 
  Shield, 
  LogOut, 
  Users, 
  ChevronDown, 
  Building2,
  Camera,
  Smartphone
} from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

interface HeaderProps {
  currentUser: UserProfile;
  onOpenRoleSwitcher: () => void;
  onOpenEmergencyModal: () => void;
  onOpenNewTicketModal: () => void;
  onOpenSearchModal: () => void;
  onOpenCollegePhoto: () => void;
  onOpenCameraCapture?: () => void;
  onLogout: () => void;
  activePath: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenRoleSwitcher,
  onOpenEmergencyModal,
  onOpenNewTicketModal,
  onOpenSearchModal,
  onOpenCollegePhoto,
  onOpenCameraCapture,
  onLogout,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs z-40 px-3 sm:px-6 flex items-center justify-between">
      {/* Mobile Brand / Search & Grid Operational Pill */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-2xl">
        {/* Mobile App Branding Badge (visible on < md) */}
        <div className="flex md:hidden items-center gap-2 mr-1">
          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            DSIT
          </div>
        </div>

        {/* Live Grid Operational Status */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse shrink-0"></span>
          <span className="text-[11px] sm:text-xs text-slate-700 font-medium">
            <span className="hidden sm:inline">Live Grid: </span>
            <span className="text-teal-700 font-semibold">99.4%</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold ml-0.5 shrink-0">
            4 Faults
          </span>
        </div>

        {/* Search trigger */}
        <div 
          onClick={onOpenSearchModal}
          className="relative flex-1 hidden md:flex items-center cursor-pointer"
        >
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            readOnly
            placeholder="Quick search complaints, assets, buildings, staff... (Cmd+K)"
            className="w-full pl-9 pr-12 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-lg text-xs transition-colors cursor-pointer"
          />
          <span className="absolute right-2.5 font-mono text-[10px] text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* PWA Install Button */}
        <PWAInstallButton variant="compact" />

        {/* Campus Photo Inspect Button */}
        <button
          onClick={onOpenCollegePhoto}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors shadow-2xs"
          title="Inspect the Dhanalakshmi Srinivasa Institute of Technology campus photo and name board"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>DSIT Campus</span>
        </button>

        {/* Role Switcher Pill */}
        <button
          onClick={onOpenRoleSwitcher}
          className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 transition-colors"
        >
          <Shield className="w-4 h-4 text-blue-700" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Role: {currentUser.role}</span>
            <span className="text-xs font-bold text-blue-800 leading-tight">Switch Role</span>
          </div>
        </button>

        {/* Emergency Ticker Button */}
        <button
          onClick={onOpenEmergencyModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors shadow-2xs"
        >
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>Emergency</span>
        </button>

        {/* Real Device Camera Issue Capture Button */}
        {onOpenCameraCapture && (
          <button
            onClick={onOpenCameraCapture}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-xs shadow-red-950/20 cursor-pointer group active:scale-[0.98]"
            title="Open real device camera to capture and analyze campus maintenance issue"
          >
            <Camera className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Capture Issue</span>
          </button>
        )}

        {/* New Ticket Button */}
        <button
          onClick={onOpenNewTicketModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden lg:inline">New Ticket</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => alert('Operational Notifications: 6 alerts queued (1 Master Incident, 2 Voltage Deviations, 3 SLA threshold reminders).')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[10px] flex items-center justify-center font-bold shadow-xs">
            6
          </span>
        </div>

        {/* User Profile & Dropdown */}
        <div className="relative pl-1">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-2xs"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight truncate max-w-[110px]">
                {currentUser.roleTitle}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">{currentUser.email}</p>
                <p className="text-[10px] text-blue-600 font-semibold mt-0.5">{COLLEGE_INFO.name}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenCollegePhoto();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>View College Campus Landmark</span>
                </button>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenRoleSwitcher();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  <span>Switch Operational Persona</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out (Return to Login)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
