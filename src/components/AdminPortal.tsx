/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, Calendar, DollarSign, Settings, ShieldCheck, 
  HelpCircle, BarChart3, TrendingUp, AlertTriangle, Play 
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    appointments, 
    payments, 
    twoFactorEnabled, 
    setTwoFactorEnabled 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'finance' | 'users' | 'settings' | 'support'>('finance');

  // --- PLATFORM SETTINGS MODIFIERS ---
  const [sessionDurationFlag, setSessionDurationFlag] = useState('30 minutes');
  const [dataRetentionStrategy, setDataRetentionStrategy] = useState('7 Years (HIPAA)');
  const [backupScheduleOption, setBackupScheduleOption] = useState('Daily (Midnight UTC)');

  // Calculate high quality operational statistics
  const totalPatientsCount = 142;
  const activePatientsCount = 118;
  const newRegistrationsCount = 16;

  const totalBookingsCount = appointments.length + 84;
  const completedSessionsCount = appointments.filter(a => a.status === 'completed').length + 72;
  const missedSessionsCount = appointments.filter(a => a.status === 'missed').length + 4;

  const localRevenueTotal = payments
    .filter(p => ['Bank Transfer', 'Debit Card', 'Credit Card', 'USSD'].includes(p.method))
    .reduce((sum, current) => sum + current.amount, 0) + 12500;

  const intlRevenueTotal = payments
    .filter(p => ['Visa', 'Mastercard', 'PayPal', 'Stripe'].includes(p.method))
    .reduce((sum, current) => sum + current.amount, 0) + 24800;

  // Total sums
  const totalNetRevenue = localRevenueTotal + intlRevenueTotal;
  const outstandingPaymentsSum = 450; 

  const activeSubscriptionsPct = 94.2;

  // Simulated Support Tickets database
  const [tickets, setTickets] = useState([
    { id: 't-101', patient: 'Theresa Webb', issue: 'Stripe transaction bounced during 3-D secure challenge', status: 'open', priority: 'high', date: '2026-06-08' },
    { id: 't-102', patient: 'Kathryn Murphy', issue: 'Camera permissions crash during iOS iPad telehealth join', status: 'pending', priority: 'medium', date: '2026-06-08' },
    { id: 't-103', patient: 'Albert Flores', issue: 'Requesting access code reset for orthopedic sessions PT-2026-00115', status: 'resolved', priority: 'low', date: '2026-06-05' }
  ]);

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Sidebar navigation */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-black">
              AD
            </div>
            <div>
              <h3 className="font-bold text-xs truncate">Admin Control Desk</h3>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider block">Authorized Session Only</span>
            </div>
          </div>
        </div>

        {/* Console Nav buttons */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-0.5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('finance')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'finance' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Operational Financials
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'users' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" /> Platform Users Monitor
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'support' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Help Support Tickets ({tickets.filter(t => t.status !== 'resolved').length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" /> Platform Global Modifiers
          </button>
        </div>

        {/* Operational Indicators */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-3 font-semibold text-slate-600">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold font-mono block">Real-time Telemetry:</span>
          <div className="flex justify-between">Server Status: <strong className="text-emerald-650 text-emerald-600">ONLINE (Cloud)</strong></div>
          <div className="flex justify-between">HIPAA Socket: <strong className="text-emerald-650 text-emerald-600">ENCRYPTED</strong></div>
          <div className="flex justify-between">Client DB nodes: <strong className="text-slate-800">4 Synchronized</strong></div>
        </div>
      </div>

      {/* Main operational workspace */}
      <div className="lg:col-span-9 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[550px]">
        
        {/* --- FINANCIALS TAB --- */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Operational Financial Reporting</h2>
              <p className="text-xs text-slate-500 mt-1">Global platform income aggregations segmented by domestic USSD / Bank wire, and automated Stripe/PayPal channels.</p>
            </div>

            {/* Micro Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
                <span className="text-slate-550 block text-[10px] uppercase font-bold tracking-wider">Gross Platform Revenues</span>
                <strong className="text-2xl font-black text-emerald-950 mt-1 block">${totalNetRevenue.toLocaleString()} USD</strong>
                <p className="text-[10px] text-emerald-700 font-semibold mt-2">Includes both domestic and Stripe channels</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
                <span className="text-slate-550 block text-[10px] uppercase font-bold tracking-wider">Outstanding Billings</span>
                <strong className="text-2xl font-black text-rose-800 mt-1 block">${outstandingPaymentsSum} USD</strong>
                <p className="text-[10px] text-rose-600 font-semibold mt-2">Estimated checkout drops</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-slate-900">
                <span className="text-slate-550 block text-[10px] uppercase font-bold tracking-wider">Payments Verification Rate</span>
                <strong className="text-2xl font-black mt-1 block">100.0%</strong>
                <p className="text-[10px] text-slate-500 font-semibold mt-2">Zero chargebacks registered</p>
              </div>
            </div>

            {/* Income segmentation block */}
            <div className="border border-slate-150 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-slate-800 mb-4">Revenues channels split:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Local payments */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-3">
                  <span className="font-bold text-slate-700 block text-xs underline">A. Domestic Payment Networks (${localRevenueTotal.toLocaleString()})</span>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span>Bank Transfer wires</span>
                      <strong className="font-mono text-slate-800">45% ($5,625)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span>Local Debit Card</span>
                      <strong className="font-mono text-slate-800">35% ($4,375)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span>USSD Quick-Code channels</span>
                      <strong className="font-mono text-slate-800">20% ($2,500)</strong>
                    </div>
                  </div>
                </div>

                {/* International payments */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-3">
                  <span className="font-bold text-slate-700 block text-xs underline">B. Global Payment Gateways (${intlRevenueTotal.toLocaleString()})</span>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span>Stripe direct checkouts</span>
                      <strong className="font-mono text-slate-800">55% ($13,640)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span>Visa / MasterCard credit networks</span>
                      <strong className="font-mono text-slate-800">30% ($7,440)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span>PayPal accounts</span>
                      <strong className="font-mono text-slate-800">15% ($3,720)</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Recent payments stream ledger */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h4 className="font-bold text-slate-700 uppercase tracking-widest">Global incoming transactions ledger:</h4>
              </div>
              <div className="divide-y divide-slate-150">
                {payments.map((p) => (
                  <div key={p.id} className="p-3.5 flex justify-between items-center hover:bg-slate-50/40">
                    <div>
                      <span className="font-bold text-slate-800">{p.patientName}</span>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Method: {p.method} | Ref: {p.bookingRef}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-700">+${p.amount} USD</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full ml-2">Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- USERS MONITORING TAB --- */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Platform Users Monitoring</h2>
              <p className="text-xs text-slate-500 mt-1">Platform enrollment analytics, clinician allocations, active sessions and compliance registers.</p>
            </div>

            {/* Metrics layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Patient statistics:</span>
                <div className="flex justify-between text-slate-700">Total Registered: <strong className="text-slate-900 font-black">{totalPatientsCount}</strong></div>
                <div className="flex justify-between text-slate-700">Clinical Active: <strong className="text-slate-900 font-black">{activePatientsCount}</strong></div>
                <div className="flex justify-between text-slate-700">Weekly New registrations: <strong className="text-slate-900 font-black">+{newRegistrationsCount}</strong></div>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Consultative sessions:</span>
                <div className="flex justify-between text-slate-700">Bookings recorded: <strong className="text-slate-900 font-bold">{totalBookingsCount}</strong></div>
                <div className="flex justify-between text-slate-700">Completed consultations: <strong className="text-slate-900 font-bold">{completedSessionsCount}</strong></div>
                <div className="flex justify-between text-slate-700">Missed appointments: <strong className="text-slate-900 font-bold">{missedSessionsCount}</strong></div>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-xs space-y-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Subscription Retention</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">{activeSubscriptionsPct}%</div>
                </div>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">94.2% of rehabilitation patients persist with therapy schedules.</p>
              </div>

            </div>

            {/* Clinical staffing table */}
            <div className="border border-slate-150 rounded-xl overflow-hidden mt-6 text-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h4 className="font-semibold text-slate-750 font-bold">Clinical Staffing & Allocations Desk:</h4>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Dr. Alan Smith, PT', caseload: 34, rating: '4.95 ★', status: 'Active' },
                  { name: 'Dr. Claire Jenkins, DPT', caseload: 28, rating: '4.91 ★', status: 'Active' },
                  { name: 'Dr. David Marcus, PT', caseload: 31, rating: '4.88 ★', status: 'On Leave' }
                ].map((st) => (
                  <div key={st.name} className="p-4 flex justify-between items-center font-semibold text-slate-755">
                    <div>
                      <span className="font-bold text-slate-800">{st.name}</span>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Rating: {st.rating} | HIPAA credentials verified</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span>{st.caseload} active patients</span>
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                        st.status === 'Active' ? 'bg-emerald-50 text-emerald-800' : 'bg-yellow-50 text-yellow-800'
                      }`}>{st.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- HELP SUPPORT REQUESTS TAB --- */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Platform Help & Support Tickets</h2>
              <p className="text-xs text-slate-500 mt-1">Resolve hardware camera issues, Stripe transaction queries, and access pass credentials audits.</p>
            </div>

            <div className="space-y-3.5 text-xs">
              {tickets.map((tk) => {
                const isResolved = tk.status === 'resolved';
                return (
                  <div key={tk.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-850">Ticket: {tk.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          tk.priority === 'high' ? 'bg-rose-100 text-rose-800' :
                          tk.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>{tk.priority} priority</span>
                      </div>
                      <span className="font-mono text-[9.5px] text-slate-400 block">User: {tk.patient} | Recieved: {tk.date}</span>
                      <p className="text-slate-600 font-semibold">{tk.issue}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        isResolved ? 'bg-emerald-5 border border-emerald-200 text-emerald-800' : 'bg-yellow-50 text-yellow-800'
                      }`}>
                        {tk.status}
                      </span>
                      {!isResolved && (
                        <button
                          onClick={() => handleResolveTicket(tk.id)}
                          className="py-1 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-250 font-bold rounded text-[10.5px] cursor-pointer"
                        >
                          Resolve ticket
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- GLOBAL SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <form className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Platform Global Settings & Security</h2>
              <p className="text-xs text-slate-500 mt-1">Configure HIPAA compliance factors, data strategies, dual-factor authentication triggers, and clock indices.</p>
            </div>

            <div className="space-y-5">
              
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Platform Security & Identity Policies
                </h4>
                
                {/* Two Factor setup */}
                <div className="flex items-center justify-between text-xs bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <h5 className="font-bold text-slate-850">Mandatory Unified Two-Factor Authentication (2FA)</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Enforces verification checks before letting clients view clinical dossiers.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
                  </label>
                </div>

                {/* Session lengths */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Telehealth auto disconnect session limit</label>
                    <select
                      value={sessionDurationFlag}
                      onChange={(e) => setSessionDurationFlag(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Medical Record Retentions Strategic Duration</label>
                    <select
                      value={dataRetentionStrategy}
                      onChange={(e) => setDataRetentionStrategy(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <option>5 Years</option>
                      <option>7 Years (HIPAA)</option>
                      <option>10 Years</option>
                      <option>Forever</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Automatic Database Backups Cadence</label>
                  <input
                    type="text"
                    value={backupScheduleOption}
                    onChange={(e) => setBackupScheduleOption(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  alert("Platform operational parameters updated successfully. Backup scheduled.");
                }}
                className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Save Platforms Parameters
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
