import React, { useState } from 'react';
import { DISRUPTION_SCENARIOS, GRAPH_NODES } from '../../data/mockData';
import { GraphNodeData } from '../../types';
import { 
  GitFork, 
  Network, 
  Sparkles, 
  Zap, 
  Users, 
  Building2, 
  Clock, 
  Package, 
  ShieldCheck, 
  Radio, 
  CheckCircle2, 
  X, 
  Maximize2, 
  RotateCcw, 
  Info,
  ArrowRight,
  TrendingUp,
  Cpu,
  History,
  Lock
} from 'lucide-react';

interface DisruptionSimulatorProps {
  onNavigateToDigitalTwin?: () => void;
  onNavigateToComplaints?: () => void;
}

export const DisruptionSimulator: React.FC<DisruptionSimulatorProps> = ({
  onNavigateToDigitalTwin,
  onNavigateToComplaints,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('root');
  const [activeTab, setActiveTab] = useState<'sim' | 'graph'>('sim');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scenario = DISRUPTION_SCENARIOS[activeScenarioId];
  const selectedNode: GraphNodeData = GRAPH_NODES.find((n) => n.id === selectedNodeId) || GRAPH_NODES[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleExecuteMitigation = () => {
    triggerToast('Mitigation Directive Executed: Academic relocation locked, spares released, and student broadcast sent!');
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider text-teal-800 px-2 py-0.5 rounded bg-teal-50 border border-teal-200 font-bold">
              Resilience Engine v4.9
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Predictive Spatial Modeling</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-blue-800 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping"></span>
              Air-Gapped Sandbox Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl tracking-tight text-slate-900 font-bold font-display">
            What-If Disruption Simulator & Incident Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Autonomous blast-radius modeling and structural causal analysis. Evaluate contingency strategies across academic, physical, and technical networks prior to dispatch execution at DSIT.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center bg-white border border-slate-200 shadow-2xs rounded-lg p-1">
            <button
              onClick={() => setActiveTab('sim')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'sim'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Simulator Cockpit</span>
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'graph'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Causal Incident Graph</span>
            </button>
          </div>

          <button
            onClick={() => setCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold transition-all shadow-2xs"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
            <span>Compare Scenarios</span>
          </button>

          <button
            onClick={handleExecuteMitigation}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Execute Mitigation Workflow</span>
          </button>
        </div>
      </div>

      {/* Dynamic Disruption Preset Selector */}
      <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <GitFork className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Dynamic Disruption Preset
            </span>
            <span className="text-xs font-bold text-slate-900">Select Pre-configured Stress Vector</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 max-w-4xl">
          {(['A', 'B', 'C', 'D'] as const).map((id) => {
            const sc = DISRUPTION_SCENARIOS[id];
            const isActive = activeScenarioId === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveScenarioId(id);
                  triggerToast(`Applied Stress Vector: Scenario ${id} (${sc.name})`);
                }}
                className={`text-left p-2.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-blue-50/70 border-blue-500 text-blue-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
                    SCENARIO {id}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${sc.severityColor}`}></span>
                </div>
                <div className="text-xs font-bold truncate text-slate-900">{sc.name}</div>
                <div className="font-mono text-[10px] text-slate-500 truncate">{sc.stressVector}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Dynamic Impact Counter Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] uppercase font-semibold tracking-wider">Affected Spaces</span>
            <Building2 className="w-4 h-4 text-blue-700" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 font-display">{scenario.affectedRooms}</span>
              <span className="text-xs text-red-600 font-semibold">Rooms offline</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 truncate">{scenario.roomsDetail}</div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-600 h-full rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] uppercase font-semibold tracking-wider">Student & Exams</span>
            <Users className="w-4 h-4 text-red-600" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600 font-display">{scenario.impactedStudents}</span>
              <span className="text-xs text-red-600 font-semibold">Occupants</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 truncate">{scenario.examsDetail}</div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-600 h-full rounded-full w-5/6"></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] uppercase font-semibold tracking-wider">Equipment Offline</span>
            <Cpu className="w-4 h-4 text-teal-600" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 font-display">{scenario.hardwareOffline}</span>
              <span className="text-xs text-slate-600 font-semibold">Units</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 truncate">{scenario.hardwareDetail}</div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full w-3/5"></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] uppercase font-semibold tracking-wider">Crew Required</span>
            <Users className="w-4 h-4 text-blue-700" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 font-display">{scenario.crewRequired}</span>
              <span className="text-xs text-teal-700 font-semibold">Specialists</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 truncate">{scenario.crewDetail}</div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full w-2/3"></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] uppercase font-semibold tracking-wider">Inventory Stock</span>
            <Package className="w-4 h-4 text-teal-600" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-teal-700 font-display">{scenario.inventoryStock}</span>
              <span className="text-xs text-teal-700 font-semibold">Stocked</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 truncate">{scenario.inventoryDetail}</div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {/* Main Workspace based on active tab */}
      {activeTab === 'sim' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left 8 Cols: Dynamic Blast Radius & Action Routing */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
              <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <GitFork className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 font-display block">
                      Dynamic Blast Radius & Automated Action Routing
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Causal propagation path derived from Building A Electrical Sub-Bus 3
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                    Auto-Generated Plan
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">Confidence: 99.1%</span>
                </div>
              </div>

              {/* 3 Mitigation Action Steps */}
              <div className="p-4 sm:p-5 flex flex-col gap-3">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-100/70 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Emergency Academic Re-allocation
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-red-100 text-red-800 font-bold border border-red-200">
                          Priority 1
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Reroute <strong className="text-slate-800">CS302 AI Final Examination</strong> (78 Students) → <span className="text-teal-700 font-bold">Block B Auditorium Hall 104</span>. Capacity: 120 seats, AC online, verified dual generator backup.
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-slate-500">
                        <span>Target: 10:00 - 13:00 IST</span>
                        <span>•</span>
                        <span className="text-teal-700 font-bold">Space Vacant & Approved</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button 
                      onClick={() => triggerToast('Classroom Lock Engaged for Hall 104')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs"
                    >
                      Preview Room
                    </button>
                    <button 
                      onClick={() => triggerToast('CS302 Re-allocation Locked & Scheduled')}
                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs"
                    >
                      Lock Booking
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-100/70 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Field Engineering Smart Dispatch
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-bold border border-teal-200">
                          Rapid Response
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Auto-dispatch order generated for <strong className="text-slate-800">Kumar R. (Sr. High-Voltage Eng.)</strong> and <strong className="text-slate-800">Vikram S. (Electrical Specialist)</strong>. ETA to Block A Substation: 6 minutes.
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-slate-500">
                        <span>Carrier: EC-409</span>
                        <span>•</span>
                        <span className="text-blue-700 font-bold">Work Order #WO-8910 Issued</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button 
                      onClick={() => triggerToast('Calling Field Radio Dispatch...')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs"
                    >
                      Radio Ping
                    </button>
                    <button 
                      onClick={() => triggerToast('Dispatch Directive Confirmed')}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs"
                    >
                      Confirm Dispatch
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-100/70 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-700 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Campus Mass Notification Push
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-bold">
                          Digital Broadcaster
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Multi-channel notification (SMS, CamFix Mobile App, In-Hall Smart Screens) drafted for <strong className="text-slate-800">420 impacted students</strong> and <strong className="text-slate-800">4 academic invigilators</strong>.
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-slate-500">
                        <span>Channels: Mobile + SMS + Screens</span>
                        <span>•</span>
                        <span className="text-teal-700 font-bold">Draft Ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button 
                      onClick={() => triggerToast('Broadcasting SMS Preview to Operator...')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs"
                    >
                      Preview SMS
                    </button>
                    <button 
                      onClick={() => triggerToast('Blast Notification Dispatched to 420 Students')}
                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs"
                    >
                      Broadcast Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit Safe Sandbox Footnote */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Audit Safe Sandbox: Simulation executes isolated runtime state without altering live physical building relays.</span>
                </div>
                <button 
                  onClick={() => triggerToast('Simulation Snapshot saved to Institutional Compliance Audit Trail')}
                  className="text-blue-700 hover:underline font-semibold shrink-0"
                >
                  Save Simulation Audit
                </button>
              </div>
            </div>

            {/* Physical Asset Impact Assessment */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-700" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Physical Asset Impact Assessment
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  Telemetry Live
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400">CRITICAL HUB</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 bg-red-100 text-red-800 rounded font-bold border border-red-200">
                      DOWN
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">Substation Transformer A-3</div>
                  <div className="font-mono text-[10px] text-slate-500">415V 3-Phase • Overload Trip (142%)</div>
                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-400">Cooling: 89°C</span>
                    <span className="text-red-600 font-bold">Needs Reset</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400">AIR HANDLER</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold border border-amber-200">
                      FAILSAFE
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">Central AHU 03 (Floor 3)</div>
                  <div className="font-mono text-[10px] text-slate-500">CFM: 0 (Static) • Dampers Closed</div>
                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-400">Indoor Temp: +3.2°C/hr</span>
                    <span className="text-amber-700 font-bold">Temp rising</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400">COMPUTE CLUSTER</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-bold">
                      STANDBY
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">AI Lab Workstation Bank 302</div>
                  <div className="font-mono text-[10px] text-slate-500">84 RTX 4090 Rigs • Safe Power-off</div>
                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-400">UPS Battery: 18m left</span>
                    <span className="text-teal-700 font-bold">Data Preserved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Warehouse Stock Lock & Historical Analogs */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Warehouse Stock Lock */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Warehouse Stock Lock
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-teal-700 font-bold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                  Instant Reserve
                </span>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                Spare components automatically earmarked for Scenario A resolution order. Logistics tracking initiates upon dispatch.
              </p>

              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">32A 3-Phase Contactor</span>
                    <span className="font-mono text-[10px] text-slate-400">SKU: ELEC-CNT-32A-4P</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-teal-700 font-mono text-xs block">1 Reserved</span>
                    <span className="font-mono text-[10px] text-slate-400">Stock: 4 units</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">Cat6 Gigabit Patch Panel</span>
                    <span className="font-mono text-[10px] text-slate-400">SKU: NET-PP-48P-CAT6</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-teal-700 font-mono text-xs block">1 Reserved</span>
                    <span className="font-mono text-[10px] text-slate-400">Stock: 1 unit</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">Heavy Duty Copper Bus Link</span>
                    <span className="font-mono text-[10px] text-slate-400">SKU: ELEC-BUS-CU-200A</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-teal-700 font-mono text-xs block">2 Reserved</span>
                    <span className="font-mono text-[10px] text-slate-400">Stock: 12 units</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => triggerToast('Hardware parts securely locked in Bay 4 Shelf B for Tech Kumar R.')}
                className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors mt-1"
              >
                Authorize Parts Release to Tech Kumar R.
              </button>
            </div>

            {/* Historical Analogs */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-700" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Historical Analogs
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Sim Engine AI</span>
              </div>
              
              <p className="text-xs text-slate-500">
                Matches pattern against 48 recorded campus disruptions from the last 24 months at DSIT.
              </p>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Oct 14, 2023 Outage</span>
                  <span className="font-mono text-xs text-teal-700 font-bold">94% similarity</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Block C 2nd floor contactor burn out. Mean time to complete physical repair was <strong>48 minutes</strong>. 0 student academic grading incidents logged due to early hall rerouting.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Jan 22, 2024 Bus Surge</span>
                  <span className="font-mono text-xs text-teal-700 font-bold">81% similarity</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Repaired with dual-tech dispatch. Recovery time: <strong>34 minutes</strong> with pre-staged contactor.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Directed DAG Interactive Incident Relationship Graph */
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                <Network className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Module 10: Smart Incident Relationship Graph
                  </h2>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                    Graph Topology: Directed DAG
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Interactive causal dependency network mapping root physical failures to downstream academic, spatial, and technical disruptions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-xs">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span className="font-medium text-slate-700">1 Root Failure</span>
                <span className="text-slate-400 mx-1">•</span>
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <span className="font-medium text-slate-700">8 Connected Entities</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Graph Canvas Viewport (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 shadow-md overflow-hidden flex flex-col relative h-[520px]">
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              ></div>

              {/* Connecting Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="220" y1="260" x2="380" y2="120" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,4" className="animate-pulse" />
                <line x1="220" y1="260" x2="380" y2="260" stroke="#3b82f6" strokeWidth="2" />
                <line x1="220" y1="260" x2="380" y2="400" stroke="#10b981" strokeWidth="2" />
                
                <line x1="380" y1="120" x2="560" y2="80" stroke="#ef4444" strokeWidth="2" />
                <line x1="380" y1="120" x2="560" y2="170" stroke="#ef4444" strokeWidth="2" />
                <line x1="380" y1="260" x2="560" y2="260" stroke="#3b82f6" strokeWidth="2" />
                <line x1="380" y1="400" x2="560" y2="350" stroke="#10b981" strokeWidth="2" />
                <line x1="380" y1="400" x2="560" y2="440" stroke="#10b981" strokeWidth="2" />
              </svg>

              {/* Interactive Nodes */}
              <div className="absolute inset-0 p-4">
                {GRAPH_NODES.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      className={`absolute cursor-pointer p-2.5 rounded-xl border shadow-lg flex items-center gap-2.5 transition-all select-none ${
                        isSelected 
                          ? 'scale-105 ring-2 ring-blue-400 bg-slate-900 border-blue-500' 
                          : 'bg-slate-900/90 hover:bg-slate-850 border-slate-700/80 hover:scale-102'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        node.colorType === 'error' ? 'bg-red-600 text-white' :
                        node.colorType === 'primary' ? 'bg-blue-600 text-white' :
                        node.colorType === 'secondary' ? 'bg-teal-600 text-white' :
                        'bg-slate-700 text-slate-200'
                      }`}>
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col pr-1 min-w-0">
                        <span className={`font-mono text-[9px] uppercase font-bold ${
                          node.colorType === 'error' ? 'text-red-400' :
                          node.colorType === 'primary' ? 'text-blue-400' :
                          node.colorType === 'secondary' ? 'text-teal-400' :
                          'text-slate-400'
                        }`}>
                          {node.badge}
                        </span>
                        <span className="text-xs font-bold text-white whitespace-nowrap">
                          {node.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Instructions */}
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-3 text-xs text-slate-300">
                <span>Click any node to view real-time causal telemetry in inspector</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  Pan & Select Active
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Node Inspector */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Node Inspector
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
                  {selectedNode.badge}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Entity Title
                </span>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  {selectedNode.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {selectedNode.desc}
                </p>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Asset Identifier:</span>
                  <span className="font-bold text-slate-900">{selectedNode.assetId}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Parent Circuit:</span>
                  <span className="font-bold text-slate-900">{selectedNode.parentCircuit}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Causal Blast Radius:</span>
                  <span className="font-bold text-red-600">{selectedNode.blastRadius}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Mitigation State:</span>
                  <span className="font-bold text-teal-700">{selectedNode.mitigationStatus}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    if (onNavigateToDigitalTwin) onNavigateToDigitalTwin();
                    triggerToast(`Opening 3D Digital Twin for ${selectedNode.title}...`);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-all"
                >
                  Isolate Sub-Graph in Digital Twin 3D
                </button>
                <button 
                  onClick={() => {
                    if (onNavigateToComplaints) onNavigateToComplaints();
                    triggerToast('Auditing linked student tickets...');
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all"
                >
                  Audit Linked Duplicate Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Scenarios Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    Disruption Comparison: Unmitigated vs Mitigated
                  </h3>
                  <span className="font-mono text-xs text-slate-500">
                    Scenario A (Unchecked) vs Mitigation Plan A-Prime
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setCompareModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Unmitigated */}
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-800 uppercase font-mono">Unmitigated Scenario A</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-red-600 text-white rounded font-bold">Standard Drift</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>CS302 Final Exam:</strong> Cancelled entirely, re-examination cost 3.2 weeks delay.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>Average Downtime:</strong> 4h 15m until manual inspection starts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>Helpdesk Influx:</strong> Estimated ~90 panicked duplicate phone tickets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>Financial Overhead:</strong> ~₹1,85,000 in overtime, rescheduling logistics.</span>
                  </li>
                </ul>
              </div>

              {/* Mitigated */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 uppercase font-mono">Mitigation Plan A-Prime</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-teal-700 text-white rounded font-bold">CamFix AI Optimized</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>CS302 Final Exam:</strong> Relocated to Block B Hall 104 with 0 min loss.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Average Downtime:</strong> 38 minutes (Techs pre-dispatched with exact parts).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Helpdesk Influx:</strong> Auto-merged tickets + instantaneous 420-student SMS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Net Savings:</strong> 96% academic downtime reduction verified.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button 
                onClick={() => setCompareModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setCompareModalOpen(false);
                  handleExecuteMitigation();
                }}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs"
              >
                Adopt Mitigation A-Prime
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
