/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Mail, MessageSquare, PhoneCall, ShieldAlert, X } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative z-50">
      <button
        id="btn-notif-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/3 -translate-y-1/3 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-sm">
          <div className="p-4 bg-emerald-600 text-white flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="w-4 h-4" /> System Alerts & Reminders
            </h3>
            <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                No active notifications found.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-4 transition-colors ${notif.read ? 'bg-white' : 'bg-emerald-50/40'}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                      {notif.type === 'appointment_rem' && <PhoneCall className="w-3.5 h-3.5 text-blue-500" />}
                      {notif.type === 'exercise_rem' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      {notif.type === 'weekly_checkin' && <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />}
                      {notif.type === 'payment_rec' && <Check className="w-3.5 h-3.5 text-purple-500" />}
                      {notif.title}
                    </span>
                    {!notif.read && (
                      <button
                        onClick={() => markNotificationRead(notif.id)}
                        className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1 font-medium"
                      >
                        <Check className="w-3 h-3" /> Mark read
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1 text-xs leading-relaxed">{notif.message}</p>
                  
                  {/* Channels log */}
                  <div className="mt-2.5 flex items-center gap-2 text-[10px] text-gray-400">
                    <span>Delivered via:</span>
                    {notif.deliveredVia.map(channel => (
                      <span 
                        key={channel} 
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-medium text-xs ${
                          channel === 'Email' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                          channel === 'SMS' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                        }`}
                      >
                        {channel === 'Email' && <Mail className="w-2.5 h-2.5" />}
                        {channel === 'SMS' && <MessageSquare className="w-2.5 h-2.5" />}
                        {channel === 'WhatsApp' && <MessageSquare className="w-2.5 h-2.5" />}
                        {channel}
                      </span>
                    ))}
                    <span className="ml-auto">
                      {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-800 font-medium py-1 px-4 block w-full"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
