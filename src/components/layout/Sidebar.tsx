import React from 'react';
import { COLLEGE_INFO } from '../../data/mockData';
import { 
  LayoutGrid, 
  AlertCircle, 
  Users, 
  DoorOpen, 
  Box, 
  Cpu, 
  Package, 
  CheckSquare, 
  GitFork, 
  Network, 
  Brain, 
  BarChart3, 
  BellRing, 
  ShieldCheck,
  Building,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  onOpenCollegePhoto: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePath, onNavigate, onOpenCollegePhoto }) => {
  const navSections = [
    {
      title: 'Core Operations',
      items: [
        { path: 'command-center', label: 'Overview & Command', icon: LayoutGrid },
        { path: 'complaint-management', label: 'Complaints & AI Triage', icon: AlertCircle },
        { path: 'staff-assignment', label: 'Smart Staff Assignment', icon: Users },
        { path: 'room-facility-booking', label: 'Room & Facilities', icon: DoorOpen },
      ],
    },
    {
      title: 'Spatial & Assets',
      items: [
        { path: 'digital-twin-map', label: 'Campus Digital Twin 3D', icon: Box },
        { path: 'equipment-asset-registry', label: 'Equipment & Assets', icon: Cpu },
        { path: 'inventory-spare-parts', label: 'Spare Parts & Inventory', icon: Package },
        { path: 'procurement-approvals', label: 'Approvals & Procurement', icon: CheckSquare },
      ],
    },
    {
      title: 'Intelligence & Resilience',
      items: [
        { path: 'disruption-simulator', label: 'Disruption Simulator', icon: GitFork },
        { path: 'relationship-graph', label: 'Incident Relationship Graph', icon: Network },
        { path: 'predictive-ai-maintenance', label: 'Predictive Maintenance AI', icon: Brain },
        { path: 'compliance-reports', label: 'Reports & Compliance', icon: BarChart3 },
      ],
    },
    {
      title: 'System',
      items: [
        { path: 'notification-center', label: 'Notification Center', icon: BellRing },
        { path: 'access-control', label: 'Role & Access Control', icon: ShieldCheck },
      ],
    },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200/80 shadow-xs z-30 flex-col justify-between overflow-y-auto">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-sm">
            <Building className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold text-blue-900 tracking-tight leading-none">
              CamFix
            </span>
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Enterprise Ops
            </span>
          </div>
        </div>

        {/* Institution Central Tag / College Image Trigger */}
        <div className="px-4 py-2 border-b border-slate-100">
          <button
            onClick={onOpenCollegePhoto}
            className="w-full px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg flex items-center justify-between transition-colors group text-left"
            title="Click to inspect college image and entrance name board"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
              <span className="text-xs font-semibold text-slate-800 truncate">
                {COLLEGE_INFO.shortName} Central
              </span>
            </div>
            <span className="text-[10px] font-mono text-teal-700 font-bold px-1.5 py-0.5 bg-teal-50 border border-teal-200 rounded">
              Trichy
            </span>
          </button>
        </div>

        {/* Nav Sections */}
        <nav className="p-3 flex flex-col gap-4">
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              <span className="px-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                {section.title}
              </span>
              <div className="flex flex-col gap-0.5 mt-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-blue-700 text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Health Indicator */}
      <div className="p-3 m-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">SLA Health</span>
          <span className="font-mono text-xs font-bold text-teal-700">99.8%</span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-teal-600 h-full rounded-full w-[99.8%]"></div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
          <span>v4.8.2 Engine</span>
          <span className="text-slate-500 font-semibold">Synced</span>
        </div>
      </div>
    </aside>
  );
};
