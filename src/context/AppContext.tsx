/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  PatientDetails, 
  Appointment, 
  PaymentRecord, 
  TreatmentPlan, 
  OnlineAssessment, 
  ChatMessage, 
  PatientProgress, 
  NotificationAlert, 
  ClinicalReport,
  AppointmentType,
  PaymentMethodType,
  ExerciseItem,
  WeeklyProgressMetric
} from '../types';
import {
  defaultPatientDetails,
  initialAppointments,
  initialPayments,
  initialTreatmentPlans,
  initialAssessments,
  initialChats,
  initialProgress,
  initialNotifications,
  initialReports,
  CURRENT_PATIENT_ID,
  CURRENT_THERAPIST_ID
} from '../data';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  patientDetails: PatientDetails;
  setPatientDetails: (details: PatientDetails) => void;
  appointments: Appointment[];
  addAppointment: (type: AppointmentType, date: string, time: string) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  payments: PaymentRecord[];
  processPayment: (bookingRef: string, method: PaymentMethodType, amount: number) => PaymentRecord;
  treatmentPlans: TreatmentPlan[];
  addTreatmentPlanGoal: (patientId: string, goal: string) => void;
  prescribeExercise: (patientId: string, exercise: Omit<ExerciseItem, 'completedTodayCount'>) => void;
  updateExerciseProgress: (patientId: string, exerciseId: string) => void;
  assessments: OnlineAssessment[];
  submitAssessment: (assessment: Omit<OnlineAssessment, 'patientId' | 'dateCompleted'>) => void;
  chats: ChatMessage[];
  sendChatMessage: (content: string, role: UserRole, attachment?: ChatMessage['attachment']) => void;
  progress: PatientProgress[];
  addProgressVideo: (patientId: string, title: string, url: string) => void;
  updateRecoveryPercentage: (patientId: string, pct: number) => void;
  updateWeeklyMetrics: (patientId: string, week: string, pain: number, func: Record<string, number>) => void;
  notifications: NotificationAlert[];
  addNotification: (title: string, message: string, type: NotificationAlert['type'], channels: NotificationAlert['deliveredVia']) => void;
  markNotificationRead: (id: string) => void;
  reports: ClinicalReport[];
  generateClinicalReport: (patientId: string, patientName: string, type: ClinicalReport['reportType'], narrative: string, goals: string[]) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  telehealthMeetingActive: boolean;
  setTelehealthMeetingActive: (active: boolean) => void;
  activeMeetingParticipant: string | null;
  setActiveMeetingParticipant: (name: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('physio_role');
    return (saved as UserRole) || 'patient';
  });

  const [patientDetails, setPatientDetails] = useState<PatientDetails>(() => {
    const saved = localStorage.getItem('physio_patient_details');
    return saved ? JSON.parse(saved) : defaultPatientDetails;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('physio_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('physio_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(() => {
    const saved = localStorage.getItem('physio_treatment_plans');
    return saved ? JSON.parse(saved) : initialTreatmentPlans;
  });

  const [assessments, setAssessments] = useState<OnlineAssessment[]>(() => {
    const saved = localStorage.getItem('physio_assessments');
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  const [chats, setChats] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('physio_chats');
    return saved ? JSON.parse(saved) : initialChats;
  });

  const [progress, setProgress] = useState<PatientProgress[]>(() => {
    const saved = localStorage.getItem('physio_progress');
    return saved ? JSON.parse(saved) : initialProgress;
  });

  const [notifications, setNotifications] = useState<NotificationAlert[]>(() => {
    const saved = localStorage.getItem('physio_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [reports, setReports] = useState<ClinicalReport[]>(() => {
    const saved = localStorage.getItem('physio_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('physio_2fa');
    return saved === 'true';
  });

  const [telehealthMeetingActive, setTelehealthMeetingActive] = useState(false);
  const [activeMeetingParticipant, setActiveMeetingParticipant] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('physio_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('physio_patient_details', JSON.stringify(patientDetails));
  }, [patientDetails]);

  useEffect(() => {
    localStorage.setItem('physio_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('physio_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('physio_treatment_plans', JSON.stringify(treatmentPlans));
  }, [treatmentPlans]);

  useEffect(() => {
    localStorage.setItem('physio_assessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('physio_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('physio_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('physio_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('physio_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('physio_2fa', String(twoFactorEnabled));
  }, [twoFactorEnabled]);


  const addAppointment = (type: AppointmentType, date: string, time: string) => {
    // PT-2026-XXXXX
    const randomNum = Math.floor(100 + Math.random() * 900);
    const bookingRef = `PT-2026-00${randomNum}`;
    const id = `apt-${Date.now()}`;

    const newApt: Appointment = {
      id,
      bookingRef,
      patientId: CURRENT_PATIENT_ID,
      patientName: patientDetails.fullName,
      type,
      date,
      time,
      status: 'pending_payment'
    };

    setAppointments(prev => [newApt, ...prev]);

    // Send local confirmation notification
    addNotification(
      'Session Booked Successfully',
      `Your session (${type}) on ${date} at ${time} is recorded. Please proceed to payment to finalize allocation.`,
      'appointment_rem',
      ['Email']
    );

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const processPayment = (bookingRef: string, method: PaymentMethodType, amount: number) => {
    const id = `pay-${Date.now()}`;
    // DES-PHY-XXXXXX
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const accessCode = `DES-PHY-${randomCode}`;

    const newPayment: PaymentRecord = {
      id,
      bookingRef,
      patientId: CURRENT_PATIENT_ID,
      patientName: patientDetails.fullName,
      amount,
      currency: 'USD',
      method,
      date: new Date().toISOString().split('T')[0],
      status: 'verified',
      accessCode
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update appointment status to 'confirmed'
    setAppointments(prev => prev.map(a => a.bookingRef === bookingRef ? { ...a, status: 'confirmed' } : a));

    // Automated Reminders and Access Code notifications
    addNotification(
      'Payment Confirmed & Code Issued',
      `Payment of $${amount} verified. Your Telehealth access code is: ${accessCode}. Keep this secure!`,
      'payment_rec',
      ['Email', 'SMS', 'WhatsApp']
    );

    addNotification(
      'WhatsApp Notification Dispatched',
      `Delivered: "Your GDT Clinic session PT reference is active. Use security access code ${accessCode} to sign-in."`,
      'payment_rec',
      ['WhatsApp']
    );

    return newPayment;
  };

  const addTreatmentPlanGoal = (patientId: string, goal: string) => {
    setTreatmentPlans(prev => prev.map(p => {
      if (p.patientId === patientId) {
        return {
          ...p,
          goals: [...p.goals, goal],
          updatedDate: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  const prescribeExercise = (patientId: string, exercise: Omit<ExerciseItem, 'completedTodayCount'>) => {
    const newEx: ExerciseItem = {
      ...exercise,
      id: `ex-${Date.now()}`,
      completedTodayCount: 0
    };

    setTreatmentPlans(prev => {
      const exists = prev.some(p => p.patientId === patientId);
      if (exists) {
        return prev.map(p => {
          if (p.patientId === patientId) {
            return {
              ...p,
              exercises: [...p.exercises, newEx],
              updatedDate: new Date().toISOString().split('T')[0]
            };
          }
          return p;
        });
      } else {
        return [...prev, {
          patientId,
          goals: ['Custom prescribed rehabilitation plan.'],
          exercises: [newEx],
          createdDate: new Date().toISOString().split('T')[0],
          updatedDate: new Date().toISOString().split('T')[0]
        }];
      }
    });

    addNotification(
      'New Exercise Prescribed',
      `Dr. Smith prescribed "${exercise.name}" (${exercise.sets} Sets x ${exercise.reps} Reps). Check your exercise library!`,
      'exercise_rem',
      ['Email', 'WhatsApp']
    );
  };

  const updateExerciseProgress = (patientId: string, exerciseId: string) => {
    setTreatmentPlans(prev => prev.map(p => {
      if (p.patientId === patientId) {
        return {
          ...p,
          exercises: p.exercises.map(ex => {
            if (ex.id === exerciseId) {
              const updatedCount = ex.completedTodayCount + 1;
              return { ...ex, completedTodayCount: updatedCount };
            }
            return ex;
          })
        };
      }
      return p;
    }));

    // Recompute compliance rate for the patient
    setProgress(prev => prev.map(pr => {
      if (pr.patientId === patientId) {
        const fullPlan = treatmentPlans.find(plan => plan.patientId === patientId);
        if (!fullPlan) return pr;
        
        let completed = 0;
        let totalNeeded = 0;
        
        fullPlan.exercises.forEach(ex => {
          // completed holds actual ticks, limit total to some relative target count
          const todayTarget = ex.frequency.toLowerCase().includes('twice') ? 2 : 1;
          completed += Math.min(ex.completedTodayCount + (ex.id === exerciseId ? 1 : 0), todayTarget);
          totalNeeded += todayTarget;
        });

        const compliance = totalNeeded > 0 ? Math.round((completed / totalNeeded) * 100) : pr.exerciseCompliance;
        return {
          ...pr,
          exerciseCompliance: Math.min(100, Math.max(20, compliance))
        };
      }
      return pr;
    }));
  };

  const submitAssessment = (assessment: Omit<OnlineAssessment, 'patientId' | 'dateCompleted'>) => {
    const newAssessment: OnlineAssessment = {
      ...assessment,
      patientId: CURRENT_PATIENT_ID,
      dateCompleted: new Date().toISOString().split('T')[0]
    };

    setAssessments(prev => [newAssessment, ...prev]);

    addNotification(
      'Assessment Evaluation Uploaded',
      'Your interactive body chart assessment has been submitted. Dr. Smith is designing your rehabilitation protocol.',
      'weekly_checkin',
      ['Email']
    );
  };

  const sendChatMessage = (content: string, role: UserRole, attachment?: ChatMessage['attachment']) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: role === 'patient' ? CURRENT_PATIENT_ID : CURRENT_THERAPIST_ID,
      senderName: role === 'patient' ? patientDetails.fullName : 'Dr. Alan Smith (PT)',
      senderRole: role,
      content,
      timestamp: new Date().toISOString(),
      attachment
    };

    setChats(prev => [...prev, newMessage]);
  };

  const addProgressVideo = (patientId: string, title: string, url: string) => {
    setProgress(prev => prev.map(p => {
      if (p.patientId === patientId) {
        return {
          ...p,
          videoUploads: [
            ...p.videoUploads,
            {
              id: `vid-${Date.now()}`,
              title,
              date: new Date().toISOString().split('T')[0],
              url
            }
          ]
        };
      }
      return p;
    }));

    addNotification(
      'Activity Video Shared',
      `You uploaded "${title}" for range of motion review by Dr. Smith.`,
      'weekly_checkin',
      ['Email']
    );
  };

  const updateRecoveryPercentage = (patientId: string, pct: number) => {
    setProgress(prev => prev.map(p => p.patientId === patientId ? { ...p, recoveryPercentage: pct } : p));
  };

  const updateWeeklyMetrics = (patientId: string, week: string, pain: number, func: Record<string, number>) => {
    setProgress(prev => prev.map(p => {
      if (p.patientId === patientId) {
        const existingWeekIdx = p.metrics.findIndex(m => m.week === week);
        const newMetric: WeeklyProgressMetric = {
          week,
          painScore: pain,
          functionalScores: {
            walking: func.walking ?? 50,
            sitting: func.sitting ?? 50,
            standing: func.standing ?? 50,
            lifting: func.lifting ?? 50,
            adl: func.adl ?? 50,
          }
        };

        let updatedMetrics = [...p.metrics];
        if (existingWeekIdx >= 0) {
          updatedMetrics[existingWeekIdx] = newMetric;
        } else {
          updatedMetrics.push(newMetric);
        }

        return {
          ...p,
          metrics: updatedMetrics
        };
      }
      return p;
    }));
  };

  const addNotification = (title: string, message: string, type: NotificationAlert['type'], channels: NotificationAlert['deliveredVia']) => {
    const newNotif: NotificationAlert = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: new Date().toISOString(),
      type,
      deliveredVia: channels,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const generateClinicalReport = (patientId: string, patientName: string, type: ClinicalReport['reportType'], narrative: string, goals: string[]) => {
    const newRep: ClinicalReport = {
      id: `rep-${Date.now()}`,
      patientId,
      patientName,
      therapistId: CURRENT_THERAPIST_ID,
      date: new Date().toISOString().split('T')[0],
      reportType: type,
      narrative,
      goalsMet: goals
    };
    setReports(prev => [newRep, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
      patientDetails,
      setPatientDetails,
      appointments,
      addAppointment,
      updateAppointmentStatus,
      payments,
      processPayment,
      treatmentPlans,
      addTreatmentPlanGoal,
      prescribeExercise,
      updateExerciseProgress,
      assessments,
      submitAssessment,
      chats,
      sendChatMessage,
      progress,
      addProgressVideo,
      updateRecoveryPercentage,
      updateWeeklyMetrics,
      notifications,
      addNotification,
      markNotificationRead,
      reports,
      generateClinicalReport,
      twoFactorEnabled,
      setTwoFactorEnabled,
      telehealthMeetingActive,
      setTelehealthMeetingActive,
      activeMeetingParticipant,
      setActiveMeetingParticipant
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
