import React, { useState } from 'react';
import { DIGITAL_TWIN_ROOMS } from '../../data/mockData';
import { RoomTelemetry } from '../../types';
import { 
  Box, 
  Layers, 
  Grid, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Activity, 
  Thermometer, 
  Zap, 
  Droplets, 
  Radio, 
  PhoneCall, 
  GitFork, 
  Video, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Compass,
  Cpu,
  Tv
} from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('Block A (Science & Computing)');
  const [selectedFloor, setSelectedFloor] = useState('L3');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('302');
  const [viewMode, setViewMode] = useState<'2.5d' | 'ortho' | 'xray'>('2.5d');
  const [activeOverlay, setActiveOverlay] = useState<string>('power');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [callActive, setCallActive] = useState(false);
  const [rerouteActive, setRerouteActive] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const selectedRoom: RoomTelemetry = DIGITAL_TWIN_ROOMS[selectedRoomId] || DIGITAL_TWIN_ROOMS['302'];

  const buildings = [
    'Block A (Science & Computing)',
    'Block B (Mech & Civil)',
    'Block C (Humanities)',
    'Central Library',
    'Tech Innovation Hub',
  ];

  const handleIntercomCall = () => {
    setCallActive(true);
    setTimeout(() => {
      setCallActive(false);
    }, 4000);
  };

  const handleRerouteLab = () => {
    setRerouteActive(true);
    setTimeout(() => {
      setRerouteActive(false);
    }, 3500);
  };

  const handleExportSnapshot = () => {
    setExportNotice(true);
    setTimeout(() => {
      setExportNotice(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-5 w-full animate-in fade-in duration-200">
      
      {/* Top Command Context Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center shadow-xs">
            <Box className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-slate-900 font-display tracking-tight">
                Digital Twin: Spatial Ops Center
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                BIM Level 4 Synced
              </span>
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            </div>
            <p className="text-xs text-slate-500">
              Live telemetry, spatial disruption propagation, and autonomous dispatch triangulation across DSIT campus.
            </p>
          </div>
        </div>

        {/* Campus & Building Selector Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
          {buildings.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBuilding(b)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedBuilding === b
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Main Spatial Viewport & Inspector Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        
        {/* Left / Center: Interactive Floorplan Canvas & Controls (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="relative bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col overflow-hidden">
            
            {/* Controls Overlay Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
              {/* Floor Elevation Tier Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
                <span className="font-mono text-[10px] text-slate-400 px-2 uppercase font-bold">Elevation:</span>
                <button
                  onClick={() => setSelectedFloor('L1')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedFloor === 'L1' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  L1 (Ground)
                </button>
                <button
                  onClick={() => setSelectedFloor('L2')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedFloor === 'L2' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  L2 (Lecture Halls)
                </button>
                <button
                  onClick={() => setSelectedFloor('L3')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    selectedFloor === 'L3' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>L3 (Research & Server Labs)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
                </button>
                <button
                  onClick={() => setSelectedFloor('L4')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedFloor === 'L4' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  L4 (HVAC & Solar)
                </button>
              </div>

              {/* View Mode Toggles & Metrics */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
                  <button
                    onClick={() => setViewMode('2.5d')}
                    className={`p-1.5 rounded text-xs transition-colors ${
                      viewMode === '2.5d' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="2.5D Isometric Mode"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('ortho')}
                    className={`p-1.5 rounded text-xs transition-colors ${
                      viewMode === 'ortho' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Orthographic Plan"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('xray')}
                    className={`p-1.5 rounded text-xs transition-colors ${
                      viewMode === 'xray' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="X-Ray Wireframe"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200/60 rounded-lg font-mono text-xs text-slate-700">
                  <span className="text-slate-400">Sensor Mesh:</span>
                  <span className="text-teal-700 font-bold">142/142 Online</span>
                </div>
              </div>
            </div>

            {/* Blueprint / 2.5D Interactive Schematic Container */}
            <div className="relative w-full h-[500px] rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center p-4 select-none border border-slate-800">
              
              {/* Radial Coordinate Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              ></div>

              {/* Decorative Compass & Axis */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center gap-1.5 text-blue-400 font-mono text-xs">
                  <Compass className="w-4 h-4" />
                  <span>GRID REF: BLK-A-L3-NE</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Scale: 1:120 BIM Standard</span>
              </div>

              <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1 pointer-events-none">
                <span className="font-mono text-[10px] px-2 py-0.5 bg-red-600 text-white rounded font-bold uppercase tracking-wider animate-pulse shadow-md">
                  Critical Alert: Room 302
                </span>
                <span className="font-mono text-[10px] text-slate-400">Last mesh sync: 2 sec ago</span>
              </div>

              {/* Interactive Floorplan SVG */}
              <svg 
                className="w-full h-full max-w-full drop-shadow-2xl transition-transform duration-300"
                viewBox="0 0 960 480"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <defs>
                  <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7f1d1d" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                  <linearGradient id="nominalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#064e3b" />
                    <stop offset="100%" stopColor="#022c22" />
                  </linearGradient>
                  <linearGradient id="warningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#451a03" />
                  </linearGradient>
                </defs>

                {/* Central Corridor Spine */}
                <polygon 
                  points="120,240 840,240 810,290 90,290" 
                  fill="url(#corridorGrad)" 
                  stroke="#334155" 
                  strokeWidth="1.5"
                />
                <text x="440" y="270" fill="#94a3b8" fontFamily="Inter" fontSize="11" fontWeight="700" letterSpacing="3">
                  CENTRAL CORRIDOR SPINE 3-A
                </text>

                {/* ROOM 301 (Lecture Hall A) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoomId('301')}
                >
                  <polygon 
                    points="100,80 320,80 300,220 80,220" 
                    fill={selectedRoomId === '301' ? '#047857' : 'url(#nominalGrad)'}
                    stroke="#10b981" 
                    strokeWidth={selectedRoomId === '301' ? '2.5' : '1'}
                    className="transition-all duration-200 group-hover:brightness-125"
                  />
                  <polygon points="80,220 300,220 300,228 80,228" fill="#065f46" />
                  <circle cx="190" cy="130" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                  <text x="190" y="134" fill="#34d399" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle">301</text>
                  <text x="190" y="160" fill="#f8fafc" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">Lecture Hall A</text>
                  <text x="190" y="176" fill="#34d399" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle">Active • 22.1°C</text>
                  <circle cx="115" cy="100" r="4" fill="#10b981" />
                </g>

                {/* ROOM 302 (Critical Disruption - Computing Lab 4) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoomId('302')}
                >
                  <polygon 
                    points="340,75 580,75 550,220 310,220" 
                    fill={selectedRoomId === '302' ? '#b91c1c' : 'url(#alertGrad)'}
                    stroke="#ef4444" 
                    strokeWidth={selectedRoomId === '302' ? '3' : '1.5'}
                    className="transition-all duration-200 group-hover:brightness-125"
                  />
                  <polygon points="310,220 550,220 550,230 310,230" fill="#7f1d1d" />
                  
                  {/* Alert Symbol Box */}
                  <polygon points="415,105 465,105 460,150 410,150" fill="#dc2626" />
                  <text x="437" y="132" fill="#ffffff" fontFamily="Inter" fontSize="16" fontWeight="bold" textAnchor="middle">⚠</text>
                  <text x="435" y="170" fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle">LAB 302: DISRUPTION</text>
                  <text x="435" y="186" fill="#fca5a5" fontFamily="JetBrains Mono" fontSize="9.5" fontWeight="700" textAnchor="middle">TRIP: 14 FAULTS (EXAM AT RISK)</text>
                  <circle cx="340" cy="95" r="5" fill="#ef4444" className="animate-ping" />
                </g>

                {/* ROOM 303 (IoT Embedded Lab - Amber) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoomId('303')}
                >
                  <polygon 
                    points="600,80 840,80 800,220 560,220" 
                    fill={selectedRoomId === '303' ? '#b45309' : 'url(#warningGrad)'}
                    stroke="#f59e0b" 
                    strokeWidth={selectedRoomId === '303' ? '2.5' : '1'}
                    className="transition-all duration-200 group-hover:brightness-125"
                  />
                  <polygon points="560,220 800,220 800,228 560,228" fill="#78350f" />
                  <circle cx="690" cy="130" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="690" y="134" fill="#fbbf24" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle">303</text>
                  <text x="690" y="160" fill="#f8fafc" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">IoT Embedded Lab</text>
                  <text x="690" y="176" fill="#fbbf24" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle">Humidity 68% • HVAC Fltr</text>
                  <circle cx="610" cy="98" r="4" fill="#f59e0b" />
                </g>

                {/* South Wing Rooms: 304, 305, 306 */}
                {/* ROOM 304 (Seminar Room B) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoomId('304')}
                >
                  <polygon 
                    points="80,310 380,310 360,430 60,430" 
                    fill={selectedRoomId === '304' ? '#047857' : 'url(#nominalGrad)'}
                    stroke="#10b981" 
                    strokeWidth={selectedRoomId === '304' ? '2.5' : '1'}
                    className="transition-all duration-200 group-hover:brightness-125"
                  />
                  <text x="210" y="365" fill="#f8fafc" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle">Room 304 (Seminar B)</text>
                  <text x="210" y="382" fill="#34d399" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle">Dept Review in Session • AC 21°C</text>
                  <circle cx="100" cy="330" r="4" fill="#10b981" />
                </g>

                {/* ROOM 305 (Faculty Lounge) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoomId('305')}
                >
                  <polygon 
                    points="400,310 650,310 630,430 380,430" 
                    fill={selectedRoomId === '305' ? '#047857' : 'url(#nominalGrad)'}
                    stroke="#10b981" 
                    strokeWidth={selectedRoomId === '305' ? '2.5' : '1'}
                    className="transition-all duration-200 group-hover:brightness-125"
                  />
                  <text x="510" y="365" fill="#f8fafc" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle">Room 305 (Faculty Lounge)</text>
                  <text x="510" y="382" fill="#34d399" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle">Optimal Ambient • 14 Occupants</text>
                  <circle cx="420" cy="330" r="4" fill="#10b981" />
                </g>

                {/* ROOM 306 (Core Rack 3-SE) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoomId('306')}
                >
                  <polygon 
                    points="670,310 880,310 860,430 650,430" 
                    fill={selectedRoomId === '306' ? '#1d4ed8' : '#1e293b'}
                    stroke="#3b82f6" 
                    strokeWidth={selectedRoomId === '306' ? '2.5' : '1'}
                    className="transition-all duration-200 group-hover:brightness-125"
                  />
                  <text x="760" y="365" fill="#f8fafc" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle">Core Rack 3-SE</text>
                  <text x="760" y="382" fill="#60a5fa" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle">UPS Battery: 99.4% Online</text>
                  <circle cx="690" cy="330" r="4" fill="#3b82f6" />
                </g>

                {/* Animated Technician Beacon (Kumar R.) in Corridor moving toward Room 302 */}
                <g transform="translate(370, 255)">
                  <circle cx="0" cy="0" r="14" fill="#3b82f6" opacity="0.3" className="animate-ping" />
                  <circle cx="0" cy="0" r="8" fill="#2563eb" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  <rect x="12" y="-12" width="145" height="22" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                  <text x="18" y="3" fill="#ffffff" fontFamily="Inter" fontSize="9" fontWeight="600">Tech: Kumar R. (In Transit)</text>
                </g>
              </svg>

              {/* Floating Map Zoom/Pan Utility Pad */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-slate-900 border border-slate-700 p-1 rounded-lg shadow-lg z-10">
                <button 
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6))}
                  className="w-8 h-8 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.8))}
                  className="w-8 h-8 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setZoomLevel(1)}
                  className="w-8 h-8 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-colors"
                  title="Reset Camera"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Spatial Status Legend Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-lg">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                Live Room Condition Legend:
              </span>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> Normal (Nominal)
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span> Scheduled Maint.
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Active Issue (Amber)
                </div>
                <div className="flex items-center gap-1.5 text-red-600 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span> Critical Disruption
                </div>
                <div className="flex items-center gap-1.5 text-purple-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Exam in Progress
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sub-Block Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-500">L3 Power Substation</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-red-600">Trip / 48.2 kW</span>
                  <span className="font-mono text-[10px] text-red-600 font-semibold">Sub-panel B2</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <Thermometer className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-500">L3 Mean Climate</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-slate-900">22.4°C</span>
                  <span className="font-mono text-[10px] text-teal-700 font-semibold">Nominal Flow</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-500">Active Hall Occupants</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-slate-900">198</span>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">Capacity: 450</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Telemetry & Incident Inspector Drawer (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          
          {/* Room Deep Dive Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-amber-500"></div>

            {/* Room Header */}
            <div className="flex items-start justify-between gap-2 pt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900 font-display">
                    {selectedRoom.name}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold uppercase">
                    {selectedRoom.status === 'critical' ? 'Critical Fault' : 'Active'}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{selectedRoom.type}</span>
              </div>
              <Zap className="w-6 h-6 text-red-600" />
            </div>

            {/* Critical Alert Box */}
            {selectedRoom.activeExam && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-red-800 font-semibold text-xs">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  <span>Final Examination in Jeopardy</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedRoom.activeExam}. Main circuit breaker #14 tripped with 14 student complaints filed in 6 minutes.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-red-700 font-bold border border-red-200">
                    14 Linked Tickets
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                    Auto-Clustered by AI
                  </span>
                </div>
              </div>
            )}

            {/* Live Room Telemetry Matrix */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Live Room Telemetry
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span className="font-mono text-[10px]">Ambient Temp</span>
                    <Thermometer className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base font-bold text-slate-900 mt-0.5">{selectedRoom.temperature}</span>
                  <span className="font-mono text-[10px] text-red-600 font-medium">+4.2°C rise (No AC)</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span className="font-mono text-[10px]">Power Draw</span>
                    <Zap className="w-3.5 h-3.5 text-red-600" />
                  </div>
                  <span className="text-base font-bold text-red-600 mt-0.5">{selectedRoom.powerDraw}</span>
                  <span className="font-mono text-[10px] text-red-600 font-medium">Breaker Tripped</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span className="font-mono text-[10px]">Humidity</span>
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base font-bold text-slate-900 mt-0.5">{selectedRoom.humidity}</span>
                  <span className="font-mono text-[10px] text-teal-700 font-medium">Normal Range</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span className="font-mono text-[10px]">IoT Breakers</span>
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base font-bold text-red-600 mt-0.5">OFFLINE</span>
                  <span className="font-mono text-[10px] text-slate-400 font-medium">Node BRK-302-B</span>
                </div>
              </div>
            </div>

            {/* Impacted High-Value Assets */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  Impacted High-Value Assets
                </span>
                <span className="font-mono text-[10px] text-blue-700 font-bold">
                  {selectedRoom.assets.length} Units
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {selectedRoom.assets.map((asset) => (
                  <div key={asset.tag} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-xs">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{asset.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">{asset.tag}</span>
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                      asset.status === 'online' ? 'bg-teal-100 text-teal-800' :
                      asset.status === 'unpowered' ? 'bg-red-100 text-red-800' :
                      asset.status === 'stalled' ? 'bg-red-100 text-red-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {asset.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dispatched Field Specialist */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase font-mono">
                  Dispatched Field Specialist
                </span>
                <span className="font-mono text-[10px] text-teal-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping"></span> Live Beacon
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                  alt="Kumar R." 
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">Kumar R. (Senior Electrician)</span>
                  <span className="text-[11px] text-slate-600 font-mono">
                    ETA: <strong className="text-red-600 font-bold">4 mins</strong> (Walking Corridor 3-West)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button 
                  onClick={handleIntercomCall}
                  className={`py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs ${
                    callActive ? 'bg-teal-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{callActive ? 'Connected (Radio #14)...' : 'Intercom Call'}</span>
                </button>
                <button 
                  onClick={handleRerouteLab}
                  className={`py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs ${
                    rerouteActive ? 'bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{rerouteActive ? 'Rerouted to Hall 104 ✓' : 'Reroute Backup Lab'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* CCTV Feeds */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 font-display">
                Live CCTV & Spatial Feeds
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-semibold border border-slate-200">
                SEC-NET-CAM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="relative group rounded-lg overflow-hidden bg-slate-950 aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&auto=format&fit=crop&q=80" 
                  alt="Cam 302"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5 justify-between">
                  <div className="flex items-center gap-1 text-white font-mono text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span>CAM-302-INT</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/80">LIVE</span>
                </div>
              </div>

              <div className="relative group rounded-lg overflow-hidden bg-slate-950 aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&auto=format&fit=crop&q=80" 
                  alt="Corridor 3"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5 justify-between">
                  <div className="flex items-center gap-1 text-white font-mono text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <span>CAM-L3-CORR</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/80">LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Campus Intelligence Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Spatial Overlays:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'power', label: 'Power Grid Topology', icon: Zap },
              { id: 'wifi', label: 'Wi-Fi Density Heatmap', icon: Radio },
              { id: 'hvac', label: 'HVAC Airflow Zones', icon: Activity },
              { id: 'safety', label: 'Safety & Evac Corridors', icon: AlertTriangle },
            ].map((ov) => {
              const Icon = ov.icon;
              const isActive = activeOverlay === ov.id;
              return (
                <button
                  key={ov.id}
                  onClick={() => setActiveOverlay(ov.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{ov.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <Box className="w-3.5 h-3.5 text-teal-600" />
            <span>Active Digital Twins: <strong className="text-teal-700">5 Buildings</strong></span>
          </div>

          <button
            onClick={handleExportSnapshot}
            className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportNotice ? 'BIM Exported (JSON/IFC) ✓' : 'Export BIM Telemetry Snapshot'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
