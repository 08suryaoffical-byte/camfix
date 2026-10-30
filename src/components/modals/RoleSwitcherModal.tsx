import React from 'react';
import { MOCK_USERS } from '../../data/mockData';
import { UserProfile, UserRole } from '../../types';
import { ShieldCheck, Wrench, GraduationCap, UserCheck, X } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectRole: (user: UserProfile) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const rolesList: { role: UserRole; icon: any; color: string }[] = [
    { role: 'ops_admin', icon: ShieldCheck, color: 'text-blue-700 bg-blue-100' },
    { role: 'technician', icon: Wrench, color: 'text-teal-700 bg-teal-100' },
    { role: 'faculty', icon: GraduationCap, color: 'text-indigo-700 bg-indigo-100' },
    { role: 'student', icon: UserCheck, color: 'text-amber-700 bg-amber-100' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Switch Operational Persona
            </h3>
            <p className="text-xs text-slate-500">
              Select a user role to simulate role-based permissions and interface views.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {rolesList.map(({ role, icon: Icon, color }) => {
            const user = MOCK_USERS[role];
            const isCurrent = currentUser.role === role;

            return (
              <button
                key={role}
                onClick={() => {
                  onSelectRole(user);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  isCurrent
                    ? 'bg-blue-50/80 border-blue-500 shadow-2xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{user.name}</span>
                      {isCurrent && (
                        <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">{user.roleTitle}</span>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                  {user.regOrEmpId}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
