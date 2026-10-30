import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Box, 
  Camera, 
  AlertCircle, 
  Menu, 
  X, 
  Users, 
  DoorOpen, 
  Cpu, 
  Package, 
  CheckSquare, 
  GitFork, 
  Network, 
  Brain, 
  BarChart3, 
  BellRing, 
  ShieldCheck, 
  Building2, 
  Smartphone,
  Sparkles
} from 'lucide-react';
import { COLLEGE_INFO } from '../../data/mockData';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

interface MobileBottomNavProps {
  activePath: string;
  onNavigate: (path: string) => void;
  onOpenCamera: () => void;
  onOpenCollegePhoto: () => void;
  onOpenRoleSwitcher: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePath,
  onNavigate,
  onOpenCamera,
  onOpenCollegePhoto,
  onOpenRoleSwitcher,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { id: 'command-center', label: 'Command', icon: LayoutGrid },
    { id: 'digital-twin-map', label: '3D Twin', icon: Box },
    // Center is the Shutter Button
    { id: 'complaint-management', label: 'Tickets', icon: AlertCircle, badge: '4' },
  ];

  const allModules = [
    {
      group: 'Core Operations',
      items: [
        { path: 'command-center', label: 'Overview & Command', icon: LayoutGrid },
        { path: 'complaint-management', label: 'Complaints & AI Triage', icon: AlertCircle },
        { path: 'staff-assignment', label: 'Smart Staff Assignment', icon: Users },
        { path: 'room-facility-booking', label: 'Room & Facilities', icon: DoorOpen },
      ],
    },
    {
      group: 'Spatial & Assets',
      items: [
        { path: 'digital-twin-map', label: 'Campus Digital Twin 3D', icon: Box },
        { path: 'equipment-asset-registry', label: 'Equipment & Assets', icon: Cpu },
        { path: 'inventory-spare-parts', label: 'Spare Parts & Inventory', icon: Package },
        { path: 'procurement-approvals', label: 'Approvals & Procurement', icon: CheckSquare },
      ],
    },
    {
      group: 'Intelligence & Resilience',
      items: [
        { path: 'disruption-simulator', label: 'Disruption Simulator', icon: GitFork },
        { path: 'relationship-graph', label: 'Incident Relationship Graph', icon: Network },
        { path: 'predictive-ai-maintenance', label: 'Predictive Maintenance AI', icon: Brain },
        { path: 'compliance-reports', label: 'Reports & Compliance', icon: BarChart3 },
      ],
    },
    {
      group: 'System & Security',
      items: [
        { path: 'notification-center', label: 'Notification Center', icon: BellRing },
        { path: 'access-control', label: 'Role & Access Control', icon: ShieldCheck },
      ],
    },
  ];

  const handleSelectPath = (path: string) => {
    onNavigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 text-slate-300 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 px-3 shadow-2xl select-none"
      >
        <div className="flex items-center justify-around relative max-w-lg mx-auto">
          {/* Tab 1: Command Center */}
          <button
            onClick={() => handleSelectPath('command-center')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
              activePath === 'command-center'
                ? 'text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Overview</span>
            {activePath === 'command-center' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 -mt-0.5"></span>
            )}
          </button>

          {/* Tab 2: Digital Twin 3D */}
          <button
            onClick={() => handleSelectPath('digital-twin-map')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
              activePath === 'digital-twin-map'
                ? 'text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Twin 3D</span>
            {activePath === 'digital-twin-map' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 -mt-0.5"></span>
            )}
          </button>

          {/* Center Elevated Camera Shutter Button */}
          <div className="relative -top-5 flex flex-col items-center">
            <button
              onClick={onOpenCamera}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1 shadow-lg shadow-blue-500/35 border-2 border-slate-900 active:scale-90 transition-transform flex items-center justify-center cursor-pointer group"
              title="Capture Campus Issue with Camera"
              aria-label="Capture Campus Issue"
            >
              <div className="w-full h-full rounded-full bg-slate-950/20 flex items-center justify-center backdrop-blur-xs">
                <Camera className="w-6 h-6 text-white animate-pulse" />
              </div>
            </button>
            <span className="text-[9px] font-bold text-cyan-300 uppercase tracking-widest mt-1">
              Capture
            </span>
          </div>

          {/* Tab 3: Complaints / Tickets */}
          <button
            onClick={() => handleSelectPath('complaint-management')}
            className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
              activePath === 'complaint-management'
                ? 'text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Tickets</span>
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              4
            </span>
            {activePath === 'complaint-management' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 -mt-0.5"></span>
            )}
          </button>

          {/* Tab 4: More / All Navigation Modules */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
              drawerOpen ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="More Options"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Slide-up Sheet */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-h-[85vh] bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 overflow-y-auto shadow-2xl flex flex-col text-slate-100"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">DSIT CampusOps Mobile</h3>
                  <p className="text-[11px] text-slate-400">All Modules & System Controls</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 gap-2 my-4">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenCollegePhoto();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition text-left"
              >
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">College Campus</p>
                  <p className="text-[10px] text-slate-400">View Arch Image</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenRoleSwitcher();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition text-left"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">Switch Role</p>
                  <p className="text-[10px] text-slate-400">Admin / Tech / Student</p>
                </div>
              </button>
            </div>

            {/* App Install trigger */}
            <div className="p-3 mb-4 rounded-xl bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-semibold text-white">Install as Mobile App</span>
              </div>
              <PWAInstallButton variant="compact" />
            </div>

            {/* Navigation Groups */}
            <div className="space-y-4 pb-6">
              {allModules.map((grp) => (
                <div key={grp.group} className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
                    {grp.group}
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {grp.items.map((item) => {
                      const Icon = item.icon;
                      const isSel = activePath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleSelectPath(item.path)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                            isSel
                              ? 'bg-blue-600 text-white font-bold shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSel ? 'text-white' : 'text-slate-400'}`} />
                          <span className="flex-1">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
