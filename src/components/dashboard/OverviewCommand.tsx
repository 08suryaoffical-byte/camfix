import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Bolt, 
  Users, 
  DoorOpen, 
  TrendingDown, 
  Sparkles, 
  Network, 
  GitFork, 
  Radio, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Check, 
  Wrench, 
  Package, 
  ArrowRight, 
  X,
  Building2,
  Calendar,
  Activity
} from 'lucide-react';

interface OverviewCommandProps {
  onNavigate: (path: string) => void;
  onOpenCollegePhoto: () => void;
}

export const OverviewCommand: React.FC<OverviewCommandProps> = ({ onNavigate, onOpenCollegePhoto }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Critical' | 'Electrical' | 'HVAC' | 'Labs'>('All');
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [rebalanceExecuted, setRebalanceExecuted] = useState(false);
  const [autoAssignedElena, setAutoAssignedElena] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [autoPoSent, setAutoPoSent] = useState(false);

  const handleExecuteRebalance = () => {
    setRebalanceExecuted(true);
    setTimeout(() => {
      setDispatchModalOpen(false);
    }, 900);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      
      {/* 1. Dynamic Operational Telemetry Ticker */}
      <div className="w-full bg-slate-100 border border-slate-200/80 rounded-xl p-3 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            DEFCON 2 ALERT
          </span>
          <span className="text-xs text-slate-800 font-medium">
            Power substation micro-trip flagged in North Academic Quadrant (DSIT Block A).
          </span>
          <span className="font-mono text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
            Event Sync #SYN-9942
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-600 font-mono text-[11px] flex-wrap">
          <span>GRID STABILITY: <strong className="text-teal-700 font-bold">98.92%</strong></span>
          <span>•</span>
          <span>AI TELEMETRY PIPELINE: <strong className="text-blue-700 font-bold">ACTIVE (14ms latency)</strong></span>
          <span>•</span>
          <span>CAMPUS CADENCE: <strong className="text-slate-900 font-bold">EXAM CYCLE DAY 4</strong></span>
        </div>
      </div>

      {/* 2. Hero Master Metric Strip (6 Metric Tiles) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Tile 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-700"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Active Complaints
            </span>
            <AlertTriangle className="w-4 h-4 text-blue-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display">142</span>
            <span className="font-mono text-[10px] text-teal-700 font-bold bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
              -8% vs LW
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">112 auto-triaged by NLP</p>
        </div>

        {/* Tile 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Pending Triage
            </span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display">18</span>
            <span className="font-mono text-[10px] text-red-700 font-bold bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
              4 Critical
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">SLA cutoff: &lt;14 min window</p>
        </div>

        {/* Tile 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Master Clusters
            </span>
            <Network className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display">7</span>
            <span className="font-mono text-[10px] text-blue-700 font-bold bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
              49 Linked Dupes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Saved ~130 tech man-hrs</p>
        </div>

        {/* Tile 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-600"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Field Crew
            </span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display">
              26<span className="text-base text-slate-400 font-normal">/32</span>
            </span>
            <span className="font-mono text-[10px] text-slate-700 font-semibold bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
              81% On-Site
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Avg Resolution: <strong className="text-slate-800">42m</strong></p>
        </div>

        {/* Tile 5 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Room Utilization
            </span>
            <DoorOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display">88.4%</span>
            <span className="font-mono text-[10px] text-teal-700 font-bold bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
              High Traffic
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">14 Protected Exam Halls</p>
        </div>

        {/* Tile 6 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Predictive AI At-Risk
            </span>
            <Activity className="w-4 h-4 text-rose-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600 font-display">3 Units</span>
            <span className="font-mono text-[10px] text-red-700 font-bold bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
              P1 Risk
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">HVAC-Chiller 2, Sub-B Breaker</p>
        </div>
      </section>

      {/* 3. Live Master Incident Banner & Duplicate Aggregation Cockpit */}
      <section>
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden relative">
          <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-blue-700 to-teal-500"></div>
          <div className="p-5 sm:p-6 flex flex-col gap-4">
            
            {/* Banner Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-full font-mono text-[11px] font-bold bg-red-600 text-white tracking-wider flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  P1 Master Incident Clustered
                </span>
                <span className="font-mono text-xs font-semibold text-blue-800 bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded">
                  INC-2024-884
                </span>
                <span className="font-mono text-xs text-slate-500">
                  Detected 18 mins ago (10:14 AM)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  AI Conf: 99.4% Aggregated
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  onClick={() => onNavigate('relationship-graph')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Network className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Inspect Relationship Graph</span>
                </button>
                <button 
                  onClick={() => onNavigate('disruption-simulator')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <GitFork className="w-3.5 h-3.5 text-teal-700" />
                  <span>Simulate Disruption Impact</span>
                </button>
                <button 
                  onClick={() => {
                    setBroadcastSent(true);
                    setTimeout(() => setBroadcastSent(false), 3000);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                    broadcastSent ? 'bg-teal-700' : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{broadcastSent ? 'Notice Pushed to 420 Students ✓' : 'Broadcast Student Update'}</span>
                </button>
              </div>
            </div>

            {/* Banner Core Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
              {/* Col A: Problem Diagnosis */}
              <div className="xl:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Bolt className="w-5 h-5 text-red-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                      Block A 3rd Floor Power Transformer Trip
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sudden overload across Sub-Panel A3 tripped the secondary distribution busbar at DSIT North Academic Block. 
                    <span className="font-semibold text-slate-900 ml-1">14 individual student complaints</span> via CamFix Mobile App and Hallway QR points successfully consolidated into this single master dispatch tree.
                  </p>
                </div>

                {/* Affected Entities */}
                <div className="mt-3 pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Immediate Impact:</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-800 font-semibold shadow-2xs">
                    Physics Lab 302
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-800 font-semibold shadow-2xs">
                    Lecture Hall 301
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 font-mono text-[11px] font-bold shadow-2xs flex items-center gap-1 animate-pulse">
                    <Clock className="w-3 h-3" /> 2 Final Exams Scheduled in 45m
                  </span>
                </div>
              </div>

              {/* Col B: Technician & Logistics Status */}
              <div className="xl:col-span-3 flex flex-col justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Assigned Incident Commander
                </span>
                <div className="flex items-center gap-3 my-2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                    alt="Kumar R." 
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Kumar R.</span>
                    <span className="text-[11px] font-mono text-teal-700 font-semibold">Lead Electrical Tech #E-104</span>
                    <span className="text-[11px] text-slate-500 font-mono">ETA on site: 3 mins</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                    <span>Dispatch Status:</span>
                    <span className="text-blue-700 font-bold">Replacement Breaker Dispatched</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-blue-600 h-full rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Col C: Clustered Complaints Accordion / Mini Counter */}
              <div className="xl:col-span-3 flex flex-col justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Duplication Engine
                  </span>
                  <span className="font-mono text-[10px] bg-teal-100 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold">
                    14 Complaints Merged
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 my-2">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="truncate max-w-[170px]">&quot;AC and lights dead in 301&quot;</span>
                    <span className="font-mono text-[10px] text-slate-400">10:15 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="truncate max-w-[170px]">&quot;Power cut mid prep exam&quot;</span>
                    <span className="font-mono text-[10px] text-slate-400">10:16 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="truncate max-w-[170px] font-medium text-red-600">&quot;Spark smell from switchboard&quot;</span>
                    <span className="font-mono text-[10px] text-red-500 font-bold">10:18 AM</span>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigate('complaint-management')}
                  className="w-full py-1.5 text-center text-xs text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-semibold flex items-center justify-center gap-1"
                >
                  <span>View All 14 Clustered Reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Two-Column Operations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL (Col 1-8): Real-Time Incident Stream & AI Triage Feed */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            {/* Header with Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-700" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  Real-Time Incident Stream & AI Triage Feed
                </h2>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-slate-100 font-mono text-[10px] text-slate-600 font-semibold border border-slate-200">
                  Live Polling
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
                {(['All', 'Critical', 'Electrical', 'HVAC', 'Labs'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      activeFilter === tab
                        ? 'bg-white text-blue-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'All' ? 'All (142)' : tab === 'Critical' ? 'Critical (4)' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Incident Item 1: High Severity with AI Explainability Card */}
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 hover:bg-slate-100/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    #CMP-9041
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Critical Severity
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    CS-301 Server Cooling Failure & Overheat
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  Reported 7m ago by Student ID: #ST-8902
                </span>
              </div>

              {/* Natural Language Chips & Parsed Entities */}
              <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Asset: <strong className="text-slate-900">Carrier AC-Unit #4</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Location: <strong className="text-slate-900">Block B - CS Dept Rm 301</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-semibold">
                  Activity: Mid-Term Exam at 11:00 AM
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                  AI Dup Match: 94%
                </span>
              </div>

              {/* AI Decision Explainability Vector Callout */}
              <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-teal-700 font-bold uppercase tracking-wider">
                      AI Reasoning Vector
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-bold">
                      High Confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Why Classified Critical:</strong> Final examination in CS-301 in 35 mins; indoor temperature exceeds 28°C threshold. High risk of candidate disruption and server cluster auto-shutdown.
                  </p>
                </div>
              </div>

              {/* Row Dispatch Actions */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Suggested Technician:</span>
                  <span className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    Elena Rostova (HVAC Senior)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert('Incident #CMP-9041 dismissed from urgent triage queue.')}
                    className="px-3 py-1 rounded bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Dismiss
                  </button>
                  <button 
                    onClick={() => {
                      setAutoAssignedElena(true);
                      setTimeout(() => setAutoAssignedElena(false), 3000);
                    }}
                    className={`px-3 py-1 rounded text-white text-xs font-semibold transition-colors shadow-2xs ${
                      autoAssignedElena ? 'bg-teal-700' : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    {autoAssignedElena ? 'Elena Dispatched ✓' : 'Auto-Assign Elena'}
                  </button>
                </div>
              </div>
            </div>

            {/* Incident Item 2: Aquatics Center */}
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 hover:bg-slate-100/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    #CMP-9038
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1">
                    Moderate Severity
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    Aquatics Center Main Pool Water Pressure Drop
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  Reported 24m ago by Coach Davis
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Asset: <strong className="text-slate-900">Grundfos Pump #P-2</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Location: <strong className="text-slate-900">Athletics Complex - Pool Plant</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Impact: Swim Training (Non-Exam)
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                  Standalone Ticket
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-blue-700 font-bold uppercase tracking-wider">
                    AI Reasoning Vector
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Why Classified Moderate:</strong> Secondary pump P-1 currently absorbing load with 82% efficiency. Zero schedule conflict with academic examinations. Recommended maintenance within 4 hour window.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Status:</span>
                  <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    Queued in General Pipeline
                  </span>
                </div>
                <button 
                  onClick={() => alert('Hydraulics engineering team dispatched to Athletics Pool Plant.')}
                  className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  Dispatch Hydraulics Team
                </button>
              </div>
            </div>

            {/* Incident Item 3: Projector Malfunction */}
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    #CMP-9034
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-medium">
                    Low Severity
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    Audio Hum and HDMI Flicker in Room 104
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  Reported 48m ago by Prof. Zimmerman
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Asset: <strong className="text-slate-900">Epson Laser Proj #L-89</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  Location: <strong className="text-slate-900">Block C - Humanities Hall 104</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                  Dupe of #CMP-9029
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Handled by Master Cluster:</span>
                  <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    AV-HUM-BATCH-4
                  </span>
                </div>
                <button 
                  onClick={() => onNavigate('complaint-management')}
                  className="px-3 py-1 rounded bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
                >
                  View Master Ticket
                </button>
              </div>
            </div>
          </div>

          {/* Campus Image Spotlights (Substation & Main Auditorium) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Incident Site Snapshot
                  </span>
                  <span className="font-mono text-[10px] text-teal-700 font-bold bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                    Field Upload
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 font-display">
                  Block A Sub-Station Transformer Room
                </h4>
                <div className="relative rounded-lg overflow-hidden h-44 mb-3 bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80" 
                    alt="Substation Transformer Room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded text-white font-mono text-[10px]">
                    Camera Feed: A-SUB-PWR-01
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thermal imaging sensors confirm coil heat dissipating normally post breaker trip. Replacement unit arriving at loading dock.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Automated Exam Hall Safeguard
                  </span>
                  <span className="font-mono text-[10px] text-blue-700 font-bold bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                    Protocol #EX-09
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 font-display">
                  Main Auditorium CS-301 Readiness
                </h4>
                <div className="relative rounded-lg overflow-hidden h-44 mb-3 bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80" 
                    alt="Auditorium Readiness"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded text-white font-mono text-[10px]">
                    Status: Standby Generator Online
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                UPS inverter backup holding 230V steady. Emergency lighting armed. Examination chief alerted with real-time green dispatch badge.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL (Col 9-12): Spatial Building Health & Technician Operations */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Spatial Health Index */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Spatial Health Index
                </h3>
              </div>
              <span className="font-mono text-[10px] text-teal-700 font-bold">
                Live Sensor Grid
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Block A: Science */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900">Block A (Science & Labs)</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-red-600">76% - AMBER</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-red-600 h-full rounded-full w-[76%]"></div>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-0.5">
                  <span>Power Substation Outage</span>
                  <span>1 Master INC Active</span>
                </div>
              </div>

              {/* Block B: Engineering */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                    <span className="text-xs font-bold text-slate-900">Block B (Engineering)</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-teal-700">98% - OPTIMAL</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-teal-600 h-full rounded-full w-[98%]"></div>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-0.5">
                  <span>HVAC load stable</span>
                  <span>1 Minor Ticket</span>
                </div>
              </div>

              {/* Block C: Humanities */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                    <span className="text-xs font-bold text-slate-900">Block C (Humanities & Arts)</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-teal-700">95% - STABLE</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-teal-600 h-full rounded-full w-[95%]"></div>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-0.5">
                  <span>AV Hum resolved</span>
                  <span>3 Open Normal</span>
                </div>
              </div>

              {/* Central Library */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                    <span className="text-xs font-bold text-slate-900">Central Library Quad</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-teal-700">100% - PERFECT</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-teal-600 h-full rounded-full w-full"></div>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-0.5">
                  <span>Air exchange optimal</span>
                  <span>0 Open Defects</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('digital-twin-map')}
              className="mt-3 w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <DoorOpen className="w-3.5 h-3.5" />
              <span>Open Digital Twin 3D Inspector</span>
            </button>
          </div>

          {/* Critical Inventory Alert */}
          <div className="bg-red-50/80 border border-red-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider font-mono">
                Critical Inventory Threshold Alert
              </span>
            </div>
            
            <div className="p-3.5 rounded-lg bg-white border border-red-100 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    Schneider Electric 32A MCB Breakers
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    SKU: SCH-MCB-32-4P
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded">
                  2 Units Left
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-slate-600 font-mono text-[11px]">
                <span>Safety Stock Minimum: <strong>5 units</strong></span>
                <span className="text-red-600 font-semibold">-60% under buffer</span>
              </div>

              <div className="mt-3">
                <button 
                  onClick={() => {
                    setAutoPoSent(true);
                    setTimeout(() => setAutoPoSent(false), 3000);
                  }}
                  className={`w-full py-1.5 rounded text-white text-xs font-semibold transition-colors shadow-2xs flex items-center justify-center gap-1.5 ${
                    autoPoSent ? 'bg-teal-700' : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{autoPoSent ? 'PO #4902 Dispatched to Schneider ✓' : 'Auto-PO Direct to Vendor'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Shift Workload Roster */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Shift Workload Roster
                </h3>
              </div>
              <span className="font-mono text-[11px] text-slate-500 font-semibold">
                26 On-Duty
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Elena */}
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                      alt="Elena" 
                      className="w-8 h-8 rounded-full object-cover border border-slate-300"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Elena Rostova</span>
                    <span className="font-mono text-[10px] text-slate-500">HVAC Lead • 3 tasks active</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Workload details for Elena Rostova opened.')}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 font-mono text-[10px] font-semibold text-blue-700"
                >
                  Reassign
                </button>
              </div>

              {/* Marcus */}
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" 
                      alt="Marcus" 
                      className="w-8 h-8 rounded-full object-cover border border-slate-300"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Marcus Vance</span>
                    <span className="font-mono text-[10px] text-slate-500">Civil & Facilities • 1 task active</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Workload details for Marcus Vance opened.')}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 font-mono text-[10px] font-semibold text-blue-700"
                >
                  Reassign
                </button>
              </div>

              {/* Taro */}
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" 
                      alt="Taro" 
                      className="w-8 h-8 rounded-full object-cover border border-slate-300"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Taro Tanaka</span>
                    <span className="font-mono text-[10px] text-red-600 font-bold">Overloaded • 5 tasks active</span>
                  </div>
                </div>
                <button 
                  onClick={() => setDispatchModalOpen(true)}
                  className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 font-mono text-[10px] font-bold"
                >
                  Offload
                </button>
              </div>
            </div>

            {/* Smart Dispatch Trigger Button */}
            <button 
              onClick={() => setDispatchModalOpen(true)}
              className="mt-3 w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <GitFork className="w-3.5 h-3.5 text-blue-700" />
              <span>Open Smart Dispatch Matrix</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Interactive Modal: Smart Workload Rebalancer */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Smart Workload Rebalancer
                </h3>
              </div>
              <button 
                onClick={() => setDispatchModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 my-4 leading-relaxed">
              AI proposes shifting 2 non-critical AV tasks from <strong className="text-slate-900">Taro Tanaka</strong> to <strong className="text-slate-900">Marcus Vance</strong> to guarantee 100% SLA for today&apos;s afternoon examinations at DSIT.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2 mb-5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-600">Taro&apos;s Stress Index:</span>
                <span className="text-red-600 font-bold">114% (Overbooked) → 68% (Optimal)</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-600">Marcus&apos;s Available Window:</span>
                <span className="text-teal-700 font-bold">3.5 Available Hours</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setDispatchModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleExecuteRebalance}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                {rebalanceExecuted ? 'Applied Successfully ✓' : 'Execute Rebalance Protocol'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
