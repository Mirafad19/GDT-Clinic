/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Shield, Key, ArrowRight, UserCheck, Smartphone, Eye, EyeOff } from 'lucide-react';

interface LoginPortalProps {
  onLoginSuccess: () => void;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({ onLoginSuccess }) => {
  const { currentRole, setCurrentRole, twoFactorEnabled, setTwoFactorEnabled } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  
  // 2FA Flow states
  const [is2FAPending, setIs2FAPending] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getEmailForRole = (role: UserRole) => {
    switch (role) {
      case 'patient': return 'jane.cooper@example.com';
      case 'physiotherapist': return 'alan.smith.pt@gdtclinic.ng';
      case 'admin': return 'admin.support@gdtclinic.ng';
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password) {
      setErrorMessage('Please input your password.');
      return;
    }

    if (twoFactorEnabled) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
      setIs2FAPending(true);
      // Simulate sending SMS via trigger
      console.log(`[SECURE 2FA] OTP Code issued: ${code}`);
      return;
    }

    // Direct Login
    setCurrentRole(selectedRole);
    onLoginSuccess();
  };

  const handle2FAVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsCode === generatedCode || smsCode === '1234') {
      setCurrentRole(selectedRole);
      onLoginSuccess();
    } else {
      setErrorMessage(`Invalid authentication code. Hint: Use standard bypass '1234' or '${generatedCode}'`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header branding */}
        <div className="p-8 bg-emerald-600 text-white text-center relative">
          <div className="absolute top-4 right-4 bg-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-300" /> Secure SSL
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-sans">GDT Clinic Portal</h2>
          <p className="text-emerald-100 text-xs mt-1">
            Telehealth Consulting & Exercise Recovery Workspace
          </p>
        </div>

        {/* Outer content container */}
        <div className="p-8">
          {!is2FAPending ? (
            <form onSubmit={handleInitialSubmit} className="space-y-6">
              
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Choose Login Role
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['patient', 'physiotherapist', 'admin'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        selectedRole === role
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'border-slate-250 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <UserCheck className={`w-4 h-4 ${selectedRole === role ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span className="capitalize">{role === 'physiotherapist' ? 'Physio' : role}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    readOnly
                    value={getEmailForRole(selectedRole)}
                    className="w-full pl-3 pr-3 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-medium text-emerald-600 bg-emerald-55 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Demo Mode
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-3 pr-10 py-2.5 border border-slate-250 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Two-Factor Toggle */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-600 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Two-Factor Authentication</h4>
                    <p className="text-[11px] text-slate-400">Request validation pin code via SMS / Email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                id="btn-login-submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FAVerify} className="space-y-6">
              <div className="text-center space-y-2">
                <Smartphone className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="font-bold text-lg text-slate-800">Verification Required</h3>
                <p className="text-xs text-slate-400">
                  We have dispatched a security PIN to your device of choice.
                </p>
                <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-100 text-xs inline-block">
                  Your SMS/Email Code is: <strong className="font-bold text-sm text-yellow-900">{generatedCode}</strong>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 text-center">
                  Insert 4-Digit Security Code
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  placeholder="0000"
                  className="w-32 mx-auto block text-center tracking-widest text-xl font-bold py-2.5 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIs2FAPending(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium rounded-xl text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md"
                >
                  Verify PIN
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Support disclaimer */}
        <div className="p-4 bg-slate-50 text-center border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-slate-300" /> End-to-End HIPAA Encrypted Secure Pipeline.
        </div>
      </div>
    </div>
  );
};
