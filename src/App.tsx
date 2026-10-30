/**
 * CamFix DSIT Enterprise Operations Application
 * Dhanalakshmi Srinivasa Institute of Technology
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { MOCK_USERS, COLLEGE_INFO } from './data/mockData';
import { LoginPage } from './components/auth/LoginPage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewCommand } from './components/dashboard/OverviewCommand';
import { DigitalTwinView } from './components/digitaltwin/DigitalTwinView';
import { ComplaintCenter } from './components/complaints/ComplaintCenter';
import { DisruptionSimulator } from './components/simulator/DisruptionSimulator';
import { StaffAssignment } from './components/staff/StaffAssignment';
import { EquipmentInventory } from './components/assets/EquipmentInventory';
import { CampusPhotoModal } from './components/modals/CampusPhotoModal';
import { SearchModal } from './components/modals/SearchModal';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { NewTicketModal } from './components/modals/NewTicketModal';
import { RoleSwitcherModal } from './components/modals/RoleSwitcherModal';
import { RealDeviceCameraModal } from './components/complaints/RealDeviceCameraModal';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';
import { PWAInstallButton } from './components/pwa/PWAInstallButton';
import { 
  DoorOpen, 
  BellRing, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  FileText, 
  Sparkles,
  Building2
} from 'lucide-react';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('camfix_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Start at login page so user immediately sees the College Image and visible name!
    return null;
  });

  // Active Navigation Route
  const [activePath, setActivePath] = useState<string>('command-center');

  // Modals state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [realCameraModalOpen, setRealCameraModalOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('camfix_user', JSON.stringify(user));
    triggerToast(`Welcome back, ${user.name} (${user.roleTitle})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('camfix_user');
  };

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setEmergencyModalOpen(false);
        setNewTicketModalOpen(false);
        setRoleSwitcherOpen(false);
        setPhotoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // When logged out, render the Login Page featuring the Dhanalakshmi Srinivasa Institute of Technology image!
  if (!currentUser) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGuestTriage={() => {
          handleLogin(MOCK_USERS.student);
          setActivePath('complaint-management');
        }}
      />
    );
  }

  // Render the Authenticated Enterprise Operations Application
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        activePath={activePath}
        onNavigate={(path) => setActivePath(path)}
        onOpenCollegePhoto={() => setPhotoModalOpen(true)}
      />

      {/* Main Content Area (Responsive on mobile with bottom padding for mobile bar) */}
      <div className="pl-0 md:pl-72 flex-1 flex flex-col min-w-0 pb-20 md:pb-6 transition-all">
        
        {/* Fixed Top Header Bar */}
        <Header
          currentUser={currentUser}
          activePath={activePath}
          onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
          onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
          onOpenNewTicketModal={() => setNewTicketModalOpen(true)}
          onOpenSearchModal={() => setSearchModalOpen(true)}
          onOpenCollegePhoto={() => setPhotoModalOpen(true)}
          onOpenCameraCapture={() => setRealCameraModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Viewport Router Body */}
        <main className="w-full pt-16 px-3 sm:px-8 py-4 sm:py-6 min-h-screen max-w-7xl">
          {activePath === 'command-center' && (
            <OverviewCommand
              onNavigate={(path) => setActivePath(path)}
              onOpenCollegePhoto={() => setPhotoModalOpen(true)}
            />
          )}

          {activePath === 'digital-twin-map' && (
            <DigitalTwinView />
          )}

          {activePath === 'complaint-management' && (
            <ComplaintCenter
              onNavigate={(path) => setActivePath(path)}
            />
          )}

          {activePath === 'disruption-simulator' && (
            <DisruptionSimulator
              onNavigateToDigitalTwin={() => setActivePath('digital-twin-map')}
              onNavigateToComplaints={() => setActivePath('complaint-management')}
            />
          )}

          {activePath === 'relationship-graph' && (
            <DisruptionSimulator
              onNavigateToDigitalTwin={() => setActivePath('digital-twin-map')}
              onNavigateToComplaints={() => setActivePath('complaint-management')}
            />
          )}

          {activePath === 'staff-assignment' && (
            <StaffAssignment />
          )}

          {(activePath === 'equipment-asset-registry' || 
            activePath === 'inventory-spare-parts' || 
            activePath === 'procurement-approvals') && (
            <EquipmentInventory />
          )}

          {activePath === 'room-facility-booking' && (
            <div className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                    <DoorOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-display">
                      Room & Facilities Reservation Protection
                    </h2>
                    <span className="text-xs text-slate-500">
                      Automated exam hall safeguards & emergency rerouting schedule
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                  14 Exam Halls Armed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-900">Block B Auditorium Hall 104</span>
                  <span className="text-xs text-slate-500">Backup target for CS302 Final Exam</span>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="text-teal-700 font-semibold">Vacant & Ready</span>
                    <span className="font-mono text-slate-500">Cap: 120</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-900">Computing Lab 4 (Room 302)</span>
                  <span className="text-xs text-red-600 font-semibold">Power Tripped (Pending Reset)</span>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="text-red-700 font-bold">Relocation Active</span>
                    <span className="font-mono text-slate-500">Cap: 80</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-900">Turing Wing Lecture Hall 301</span>
                  <span className="text-xs text-slate-500">Mid-term Exam Scheduled (11:00 AM)</span>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="text-teal-700 font-semibold">Generator Synced</span>
                    <span className="font-mono text-slate-500">Cap: 90</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePath === 'notification-center' && (
            <div className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-display">
                      Institutional Notification Center
                    </h2>
                    <span className="text-xs text-slate-500">
                      Live SMS, CamFix Mobile App, and campus digital signage dispatch logs
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold">
                  6 Active Alerts
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {[
                  { title: 'Emergency Broadcast to 420 Students in Block A', time: '10:14 AM', type: 'SMS / Push' },
                  { title: 'Substation Transformer A-3 Overload Incident Logged', time: '10:12 AM', type: 'System Telemetry' },
                  { title: 'Spare Board #SP-441 Reserved in Bay 04', time: '10:05 AM', type: 'Warehouse' },
                  { title: 'Lead Tech Kumar R. Dispatched to Room 302', time: '09:58 AM', type: 'Dispatch' },
                ].map((n, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span className="font-semibold text-slate-900">{n.title}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                      <span>{n.type}</span>
                      <span>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePath === 'access-control' && (
            <div className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-display">
                      Role & Access Control Matrix (RBAC)
                    </h2>
                    <span className="text-xs text-slate-500">
                      Security levels and operational clearance for DSIT campus personnel
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  Enforced via JWT & Directory
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(MOCK_USERS).map((user) => (
                  <div key={user.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{user.name}</span>
                          <span className="font-mono text-[10px] text-slate-500">{user.regOrEmpId}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-600 font-medium block">{user.roleTitle}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Clearance:</span>
                      <span className="font-mono font-bold text-blue-700">{user.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <CampusPhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={(path) => setActivePath(path)}
      />

      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      <NewTicketModal
        isOpen={newTicketModalOpen}
        onClose={() => setNewTicketModalOpen(false)}
        onSuccess={(code) => triggerToast(`Ticket ${code} auto-triaged and assigned to field queue.`)}
      />

      <RoleSwitcherModal
        isOpen={roleSwitcherOpen}
        onClose={() => setRoleSwitcherOpen(false)}
        currentUser={currentUser}
        onSelectRole={(user) => {
          setCurrentUser(user);
          localStorage.setItem('camfix_user', JSON.stringify(user));
          triggerToast(`Switched persona to ${user.name} (${user.roleTitle})`);
        }}
      />

      {/* Real Physical Device Camera Modal */}
      <RealDeviceCameraModal
        isOpen={realCameraModalOpen}
        onClose={() => setRealCameraModalOpen(false)}
        onComplaintCreated={(complaint) => {
          triggerToast(`Complaint ${complaint.id} created & AI triaged!`);
        }}
      />

      {/* Mobile Bottom Navigation Bar with Quick Actions & Shutter */}
      <MobileBottomNav
        activePath={activePath}
        onNavigate={(path) => setActivePath(path)}
        onOpenCamera={() => setRealCameraModalOpen(true)}
        onOpenCollegePhoto={() => setPhotoModalOpen(true)}
        onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
      />

      {/* Offline Status Detection */}
      <OfflineIndicator />

      {/* Mobile Install Home-Screen Banner */}
      <PWAInstallButton variant="floating-banner" />

      {/* Global Toast */}
      {toastNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-xs font-medium">{toastNotice}</span>
        </div>
      )}
    </div>
  );
}
