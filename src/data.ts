/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  PatientDetails, 
  Appointment, 
  PaymentRecord, 
  TreatmentPlan, 
  OnlineAssessment, 
  ChatMessage, 
  PatientProgress, 
  NotificationAlert, 
  ClinicalReport 
} from './types';

export const CURRENT_PATIENT_ID = 'pat-jcooper';
export const CURRENT_THERAPIST_ID = 'ther-asmith';

export const defaultPatientDetails: PatientDetails = {
  id: CURRENT_PATIENT_ID,
  fullName: 'Jane Cooper',
  dob: '1992-04-12',
  gender: 'Female',
  phone: '+1 (555) 019-2834',
  email: 'jane.cooper@example.com',
  country: 'United States',
  state: 'California',
  emergencyContact: {
    name: 'Robert Cooper',
    phone: '+1 (555) 019-8877',
    relationship: 'Spouse'
  },
  mainComplaint: 'Left Knee pain with slight swelling after a local marathon run.',
  painLocation: 'Anterior Left Knee, around patella',
  durationOfSymptoms: '3 weeks',
  previousTreatmentHistory: 'Applied ice and wore a compression sleeve occasionally, did minor quadricep stretching.',
  currentMedications: 'Ibuprofen (400mg) as needed for pain.',
  relevantMedicalConditions: 'Mild asthma managed with inhaler.',
  previousSurgeries: 'None.',
  medicalReportUrl: 'marathon_knee_mri_scan.pdf'
};

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-001',
    bookingRef: 'PT-2026-00125',
    patientId: CURRENT_PATIENT_ID,
    patientName: 'Jane Cooper',
    type: 'Initial Consultation',
    date: '2026-06-05',
    time: '10:00 AM',
    status: 'completed',
    paymentId: 'pay-001'
  },
  {
    id: 'apt-002',
    bookingRef: 'PT-2026-00164',
    patientId: CURRENT_PATIENT_ID,
    patientName: 'Jane Cooper',
    type: 'Follow-Up Consultation',
    date: '2026-06-12',
    time: '02:30 PM',
    status: 'confirmed',
    paymentId: 'pay-002'
  },
  {
    id: 'apt-003',
    bookingRef: 'PT-2026-00198',
    patientId: 'pat-mgreen',
    patientName: 'Marcus Green',
    type: 'Post-Surgery Rehabilitation Session',
    date: '2026-06-10',
    time: '11:00 AM',
    status: 'confirmed',
    paymentId: 'pay-003'
  },
  {
    id: 'apt-004',
    bookingRef: 'PT-2026-00210',
    patientId: 'pat-sobrien',
    patientName: 'Sarah O\'Brien',
    type: 'Exercise Review Session',
    date: '2026-06-11',
    time: '09:00 AM',
    status: 'confirmed',
    paymentId: 'pay-004'
  }
];

export const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-001',
    bookingRef: 'PT-2026-00125',
    patientId: CURRENT_PATIENT_ID,
    patientName: 'Jane Cooper',
    amount: 150,
    currency: 'USD',
    method: 'Credit Card',
    date: '2026-06-03',
    status: 'verified',
    accessCode: 'DES-PHY-859472'
  },
  {
    id: 'pay-002',
    bookingRef: 'PT-2026-00164',
    patientId: CURRENT_PATIENT_ID,
    patientName: 'Jane Cooper',
    amount: 95,
    currency: 'USD',
    method: 'Stripe',
    date: '2026-06-08',
    status: 'verified',
    accessCode: 'DES-PHY-991204'
  },
  {
    id: 'pay-003',
    bookingRef: 'PT-2026-00198',
    patientId: 'pat-mgreen',
    patientName: 'Marcus Green',
    amount: 180,
    currency: 'USD',
    method: 'PayPal',
    date: '2026-06-09',
    status: 'verified',
    accessCode: 'DES-PHY-110482'
  },
  {
    id: 'pay-004',
    bookingRef: 'PT-2026-00210',
    patientId: 'pat-sobrien',
    patientName: 'Sarah O\'Brien',
    amount: 95,
    currency: 'USD',
    method: 'Debit Card',
    date: '2026-06-09',
    status: 'verified',
    accessCode: 'DES-PHY-764921'
  }
];

export const initialTreatmentPlans: TreatmentPlan[] = [
  {
    patientId: CURRENT_PATIENT_ID,
    goals: [
      'Reduce left knee swelling and anterior patella pain from 6/10 to 1/10',
      'Increase active knee flexion to 135 degrees and expand extension to full range',
      'Achieve painless quad activation to allow comfortable downhill running',
      'Regain functional running distance safely without compensation'
    ],
    exercises: [
      {
        id: 'ex-001',
        name: 'Quad Set Isometric Activation',
        demoVideoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300&auto=format&fit=crop',
        sets: 3,
        reps: 10,
        duration: 'Hold 5 seconds',
        frequency: 'Twice Daily',
        completedTodayCount: 2
      },
      {
        id: 'ex-002',
        name: 'Straight Leg Raise (Knee Locked)',
        demoVideoUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&auto=format&fit=crop',
        sets: 3,
        reps: 12,
        duration: 'Controlled 3s lift/lower',
        frequency: 'Twice Daily',
        completedTodayCount: 1
      },
      {
        id: 'ex-003',
        name: 'Patella Mobilization',
        demoVideoUrl: 'https://images.unsplash.com/photo-1597811219159-f81395b0ff12?q=80&w=300&auto=format&fit=crop',
        sets: 2,
        reps: 15,
        duration: 'Gently glide side-to-side',
        frequency: 'Once Daily',
        completedTodayCount: 0
      }
    ],
    createdDate: '2026-06-05',
    updatedDate: '2026-06-08'
  },
  {
    patientId: 'pat-mgreen',
    goals: [
      'Restore full knee extension post ACL reconstructive graft',
      'Improve weight-bearing stance symmetry to 50/50 balance',
      'Reduce post-operative swelling and scar tissue stiffness'
    ],
    exercises: [
      {
        id: 'ex-201',
        name: 'Heel Slides with Strap Assistance',
        demoVideoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=300&auto=format&fit=crop',
        sets: 3,
        reps: 10,
        duration: 'Controlled glide',
        frequency: 'Twice Daily',
        completedTodayCount: 0
      },
      {
        id: 'ex-202',
        name: 'Standing Terminal Knee Extension (TKE)',
        demoVideoUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=300&auto=format&fit=crop',
        sets: 3,
        reps: 15,
        duration: 'Hold 2s at lockout',
        frequency: 'Twice Daily',
        completedTodayCount: 0
      }
    ],
    createdDate: '2026-05-28',
    updatedDate: '2026-06-02'
  }
];

export const initialAssessments: OnlineAssessment[] = [
  {
    patientId: CURRENT_PATIENT_ID,
    painLevel: 6,
    symptomDuration: '3 weeks',
    aggravatingActivities: 'Running downhill, descending stairs, squatting beyond 90 degrees.',
    relievingActivities: 'Ice packs, complete rest, leg elevation.',
    functionalLimitations: 'Struggling to descend stairs foot-over-foot without guarding; running is impossible.',
    sleepDisturbance: 'Mild',
    occupation: 'Software Engineer',
    activityLevel: 'Highly Active',
    familyHistory: 'No specific knee arthritis; maternal family has joint hypermobility.',
    selectedBodyParts: ['Knee', 'Lower Limb'],
    dateCompleted: '2026-06-04'
  }
];

export const initialChats: ChatMessage[] = [
  {
    id: 'msg-001',
    senderId: CURRENT_THERAPIST_ID,
    senderName: 'Dr. Alan Smith (PT)',
    senderRole: 'physiotherapist',
    content: 'Hi Jane, welcome to your portal! Let me know if you suffer any sharp pinch during the Quad Isometric prescription. You should feel tension in the thigh, but zero sharp pain beneath the kneecap.',
    timestamp: '2026-06-05T14:30:00Z'
  },
  {
    id: 'msg-002',
    senderId: CURRENT_PATIENT_ID,
    senderName: 'Jane Cooper',
    senderRole: 'patient',
    content: 'Hi Dr. Smith! Thanks, yes - I did the quad holds this afternoon. There was just a broad pressure feeling, no sharp pain. I also attached the snapshot of the slight swelling below my kneecap.',
    timestamp: '2026-06-05T17:45:00Z',
    attachment: {
      name: 'knee_swelling_front.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=400&auto=format&fit=crop'
    }
  },
  {
    id: 'msg-003',
    senderId: CURRENT_THERAPIST_ID,
    senderName: 'Dr. Alan Smith (PT)',
    senderRole: 'physiotherapist',
    content: 'Excellent, that is perfectly normal. Continue with ice directly after the straight leg raise exercise. I will see you online for our next telehealth check-in!',
    timestamp: '2026-06-06T09:12:00Z'
  }
];

export const initialProgress: PatientProgress[] = [
  {
    patientId: CURRENT_PATIENT_ID,
    recoveryPercentage: 62,
    exerciseCompliance: 85,
    metrics: [
      {
        week: 'Week 1',
        painScore: 7,
        functionalScores: { walking: 40, sitting: 80, standing: 50, lifting: 30, adl: 45 }
      },
      {
        week: 'Week 2',
        painScore: 6,
        functionalScores: { walking: 60, sitting: 85, standing: 70, lifting: 50, adl: 60 }
      },
      {
        week: 'Week 3',
        painScore: 4,
        functionalScores: { walking: 75, sitting: 90, standing: 80, lifting: 65, adl: 75 }
      }
    ],
    videoUploads: [
      {
        id: 'vid-01',
        title: 'Straight Leg Raise Knee Lock Check',
        date: '2026-06-07',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-stretching-exercises-in-a-sunny-studio-41712-large.mp4'
      }
    ]
  },
  {
    patientId: 'pat-mgreen',
    recoveryPercentage: 35,
    exerciseCompliance: 92,
    metrics: [
      {
        week: 'Week 1',
        painScore: 8,
        functionalScores: { walking: 20, sitting: 60, standing: 30, lifting: 10, adl: 25 }
      },
      {
        week: 'Week 2',
        painScore: 6,
        functionalScores: { walking: 45, sitting: 75, standing: 50, lifting: 25, adl: 40 }
      }
    ],
    videoUploads: []
  }
];

export const initialNotifications: NotificationAlert[] = [
  {
    id: 'notif-001',
    title: 'Appointment Reminder - 24 Hours Away',
    message: 'Your Follow-Up Consultation with Dr. Alan Smith is scheduled for June 12th at 02:30 PM (UTC). Ready your workspace!',
    time: '2026-06-11T14:30:00Z',
    type: 'appointment_rem',
    deliveredVia: ['Email', 'WhatsApp'],
    read: false
  },
  {
    id: 'notif-002',
    title: 'Daily Exercise Reminder',
    message: 'Time for your Quad Set Isometric Activation and Straight Leg Raises! Consistency breeds speedy recovery path.',
    time: '2026-06-09T08:00:00Z',
    type: 'exercise_rem',
    deliveredVia: ['SMS', 'WhatsApp'],
    read: true
  },
  {
    id: 'notif-003',
    title: 'Weekly Symptom Log',
    message: 'Please complete your Weekly Symptom Log & Pain Chart to allow Dr. Smith to adjust your clinical load.',
    time: '2026-06-07T18:00:00Z',
    type: 'weekly_checkin',
    deliveredVia: ['Email'],
    read: false
  }
];

export const initialReports: ClinicalReport[] = [
  {
    id: 'rep-001',
    patientId: CURRENT_PATIENT_ID,
    patientName: 'Jane Cooper',
    therapistId: CURRENT_THERAPIST_ID,
    date: '2026-06-05',
    reportType: 'Assessment',
    narrative: 'Patient presented with Left Knee pain locally centered about the patellofemoral articulation. Aggravated prominently during downhill gradients. Physical telehealth test reveals decent tracking with mild extension lag. Plan initiated consisting of quad recruitment sets.',
    goalsMet: ['Reduce left knee swelling and anterior patella pain from 6/10 to 1/10']
  }
];

export const mockExerciseLibrary = [
  {
    name: 'Neck Retraction Exercise',
    target: 'Neck',
    sets: 3,
    reps: 10,
    duration: 'Hold 5s',
    frequency: 'Twice Daily',
    desc: 'Sit up straight, look forward, and pull your chin straight back as if trying to make a double chin.'
  },
  {
    name: 'Scapular Squeeze / Wall Slide',
    target: 'Shoulder',
    sets: 3,
    reps: 12,
    duration: 'Hold 3s',
    frequency: 'Twice Daily',
    desc: 'Squeeze shoulder blades together as if holding a pencil between them, slide elbows down on a wall.'
  },
  {
    name: 'Wrist Extension Stretch',
    target: 'Wrist',
    sets: 2,
    reps: 5,
    duration: 'Hold 20s',
    frequency: 'Twice Daily',
    desc: 'Extend your arm horizontally, fold your wrist downward gently pulling the hand close with opposite wrist.'
  },
  {
    name: 'Bird Dog Spine Stabilization',
    target: 'Back',
    sets: 3,
    reps: 10,
    duration: 'Hold 3s per limb',
    frequency: 'Once Daily',
    desc: 'On all fours, extend opposite arm and opposite leg parallel to the floor; engage trunk stabilizers.'
  },
  {
    name: 'Prone Hip Extension',
    target: 'Hip',
    sets: 3,
    reps: 12,
    duration: 'Hold 2s',
    frequency: 'Once Daily',
    desc: 'Lie face down, lift target leg up toward the ceiling keeping knee straight; target your gluteal fibers.'
  },
  {
    name: 'Ankle Dorsiflexion Stretch',
    target: 'Ankle',
    sets: 2,
    reps: 3,
    duration: 'Hold 30s',
    frequency: 'Twice Daily',
    desc: 'Place a strap around the ball of your foot and pull toward you to stretch the calf muscles.'
  }
];

export const otherPatients = [
  { id: 'pat-mgreen', name: 'Marcus Green', age: 34, injury: 'ACL Knee Reconstruction Post-Op', email: 'marcus.g@example.com' },
  { id: 'pat-sobrien', name: 'Sarah O\'Brien', age: 29, injury: 'Cervical Spine Stiffness', email: 'sarah.o@example.com' },
  { id: 'pat-dlevy', name: 'David Levy', age: 41, injury: 'Rotator Cuff Shoulder Strain', email: 'david.l@example.com' }
];
