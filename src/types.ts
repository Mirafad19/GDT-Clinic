/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'patient' | 'physiotherapist' | 'admin';

export interface PatientDetails {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  // Medical Details
  mainComplaint: string;
  painLocation: string;
  durationOfSymptoms: string;
  previousTreatmentHistory: string;
  currentMedications: string;
  relevantMedicalConditions: string;
  previousSurgeries: string;
  medicalReportUrl?: string; // Simulated file upload name
}

export type AppointmentType = 
  | 'Initial Consultation'
  | 'Follow-Up Consultation'
  | 'Exercise Review Session'
  | 'Post-Surgery Rehabilitation Session';

export interface Appointment {
  id: string;
  bookingRef: string; // PT-2026-XXXXX
  patientId: string;
  patientName: string;
  type: AppointmentType;
  date: string;
  time: string;
  status: 'pending_payment' | 'confirmed' | 'completed' | 'missed';
  paymentId?: string;
  meetingJoined?: boolean;
}

export type PaymentMethodType = 
  | 'Bank Transfer' 
  | 'Debit Card' 
  | 'Credit Card' 
  | 'USSD' 
  | 'Visa' 
  | 'Mastercard' 
  | 'PayPal' 
  | 'Stripe';

export interface PaymentRecord {
  id: string;
  bookingRef: string;
  patientId: string;
  patientName: string;
  amount: number;
  currency: string;
  method: PaymentMethodType;
  date: string;
  status: 'pending' | 'verified' | 'failed';
  accessCode?: string; // DES-PHY-XXXXXX
}

export interface ExerciseItem {
  id: string;
  name: string;
  demoVideoUrl: string; // Placeholder ID/Name
  sets: number;
  reps: number;
  duration: string; // e.g. "Hold for 5s"
  frequency: string; // e.g. "Twice Daily"
  completedTodayCount: number;
}

export interface TreatmentPlan {
  patientId: string;
  goals: string[]; // Pain Reduction, Improved Mobility, Improved Strength, Functional Independence
  exercises: ExerciseItem[];
  createdDate: string;
  updatedDate: string;
}

export type BodyPart = 
  | 'Neck' 
  | 'Shoulder' 
  | 'Elbow' 
  | 'Wrist' 
  | 'Back' 
  | 'Hip' 
  | 'Knee' 
  | 'Ankle' 
  | 'Foot' 
  | 'Upper Limb' 
  | 'Lower Limb' 
  | 'Face';

export interface OnlineAssessment {
  patientId: string;
  painLevel: number; // 0 to 10
  symptomDuration: string;
  aggravatingActivities: string;
  relievingActivities: string;
  functionalLimitations: string;
  sleepDisturbance: 'None' | 'Mild' | 'Moderate' | 'Severe';
  occupation: string;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Highly Active';
  familyHistory: string;
  selectedBodyParts: BodyPart[];
  dateCompleted: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: 'image' | 'video' | 'pdf';
    url: string;
  };
}

export interface WeeklyProgressMetric {
  week: string; // 'Week 1', 'Week 2', 'Week 3', 'Week 4'
  painScore: number; // 0 - 10
  functionalScores: {
    walking: number; // 0 - 100
    sitting: number;
    standing: number;
    lifting: number;
    adl: number; // Activities of daily living
  };
}

export interface PatientProgress {
  patientId: string;
  metrics: WeeklyProgressMetric[];
  recoveryPercentage: number;
  exerciseCompliance: number; // percentage
  videoUploads: { id: string; title: string; date: string; url: string }[];
}

export interface NotificationAlert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment_rem' | 'exercise_rem' | 'weekly_checkin' | 'payment_rec';
  deliveredVia: ('Email' | 'SMS' | 'WhatsApp')[];
  read: boolean;
}

export interface ClinicalReport {
  id: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  date: string;
  reportType: 'Assessment' | 'Progress' | 'Discharge';
  narrative: string;
  goalsMet: string[];
}
