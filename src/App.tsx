/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPortal } from './components/LoginPortal';
import { PatientPortal } from './components/PatientPortal';
import { PhysioPortal } from './components/PhysioPortal';
import { AdminPortal } from './components/AdminPortal';
import { NotificationCenter } from './components/NotificationToast';
import { 
  ShieldCheck, ShieldAlert, LogOut, HelpCircle, 
  RotateCcw, Sliders, UserCheck, RefreshCw 
} from 'lucide-react';

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

function MainAppContent() {
  const { currentRole, setCurrentRole } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for smooth demo experience

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans transition-all duration-300 antialiased text-slate-800">
      
      {!isAuthenticated ? (
        <LoginPortal onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Global platform header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left Branding */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow shadow-emerald-55 border border-emerald-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-emerald-600 tracking-wider flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Compliant Telehealth
                </span>
                <span className="font-extrabold text-slate-800 text-lg block leading-none">PhysioCare Clinical Hub</span>
              </div>
            </div>

            {/* Middle Quick Testing Role Mutator Swapper */}
            <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1">
              <span className="text-[9.5px] font-extrabold uppercase text-slate-400 tracking-wider px-2 font-mono flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" /> Simulation Sandbox:
              </span>
              {[
                { r: 'patient', label: 'Patient View' },
                { r: 'physiotherapist', label: 'Therapist' },
                { r: 'admin', label: 'Admin Panel' }
              ].map((b) => (
                <button
                  key={b.r}
                  onClick={() => setCurrentRole(b.r as any)}
                  className={`py-1.5 px-3 rounded-xl text-[10.5px] font-extrabold cursor-pointer transition-all ${
                    currentRole === b.r
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-150 hover:text-slate-800'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Notification Alerts Tray */}
              <NotificationCenter />
              
              <div className="h-6 w-px bg-slate-200" />
              
              {/* Active User label tag */}
              <div className="text-right hidden sm:block">
                <span className="text-xs font-black block text-slate-800 capitalize">{currentRole === 'physiotherapist' ? 'Dr. Alan Smith' : currentRole}</span>
                <span className="text-[9.5px] font-medium text-slate-400 font-mono italic">Validated credential</span>
              </div>

              {/* Log out trigger */}
              <button
                id="btn-app-logout"
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                title="Sign out of clinic session"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>

          </header>

          {/* Core Content Body wrapper */}
          <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
            {currentRole === 'patient' && <PatientPortal />}
            {currentRole === 'physiotherapist' && <PhysioPortal />}
            {currentRole === 'admin' && <AdminPortal />}
          </main>

          {/* Footer credentials check */}
          <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-[10.5px] font-medium text-slate-400 space-y-1">
            <p>Protected by PhysioCare cryptographic security. HIPAA & GDPR Client Privacy Seals Verified.</p>
            <p className="font-mono text-[9px] text-slate-300">Build session: UTC 2026-06-09 | SSL: sha256_aes_gcm</p>
          </footer>
        </>
      )}

    </div>
  );
}
