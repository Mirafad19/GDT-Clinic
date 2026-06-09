/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BodyPart, AppointmentType, PaymentMethodType } from '../types';
import { 
  ArrowRight, CheckCircle2, ChevronRight, MessageSquare, PhoneCall, 
  Video, Calendar, DollarSign, Activity, FileText, User, ShieldCheck, 
  Send, Upload, Clock, Flame, Zap, Check, Play, Square, Eye, Sparkles 
} from 'lucide-react';

export const PatientPortal: React.FC = () => {
  const { 
    patientDetails, 
    setPatientDetails,
    appointments, 
    addAppointment, 
    payments, 
    processPayment, 
    treatmentPlans, 
    updateExerciseProgress,
    assessments, 
    submitAssessment, 
    chats, 
    sendChatMessage, 
    progress, 
    addProgressVideo,
    telehealthMeetingActive,
    setTelehealthMeetingActive
  } = useApp();

  const [activeTab, setActiveTab] = useState<'hub' | 'register' | 'book' | 'exercises' | 'progress' | 'telehealth' | 'messages'>('hub');

  // --- REGISTRATION & ASSESSMENT STATE ---
  const [fullName, setFullName] = useState(patientDetails.fullName);
  const [dob, setDob] = useState(patientDetails.dob);
  const [gender, setGender] = useState(patientDetails.gender);
  const [phone, setPhone] = useState(patientDetails.phone);
  const [email, setEmail] = useState(patientDetails.email);
  const [country, setCountry] = useState(patientDetails.country);
  const [state, setState] = useState(patientDetails.state);
  const [emergencyName, setEmergencyName] = useState(patientDetails.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(patientDetails.emergencyContact.phone);
  const [emergencyRelation, setEmergencyRelation] = useState(patientDetails.emergencyContact.relationship);

  // Medical fields
  const [mainComplaint, setMainComplaint] = useState(patientDetails.mainComplaint);
  const [painLocation, setPainLocation] = useState(patientDetails.painLocation);
  const [durationOfSymptoms, setDurationOfSymptoms] = useState(patientDetails.durationOfSymptoms);
  const [previousTreatmentHistory, setPreviousTreatmentHistory] = useState(patientDetails.previousTreatmentHistory);
  const [currentMedications, setCurrentMedications] = useState(patientDetails.currentMedications);
  const [relevantMedicalConditions, setRelevantMedicalConditions] = useState(patientDetails.relevantMedicalConditions);
  const [previousSurgeries, setPreviousSurgeries] = useState(patientDetails.previousSurgeries);
  
  // Assessment fields
  const [painLevel, setPainLevel] = useState(6);
  const [aggravating, setAggravating] = useState('Descending stairs, squatting');
  const [relieving, setRelieving] = useState('Cold compression, resting');
  const [limitations, setLimitations] = useState('Inability to lift heavy loads comfortably');
  const [sleepDisturb, setSleepDisturb] = useState<'None' | 'Mild' | 'Moderate' | 'Severe'>('Mild');
  const [occupation, setOccupation] = useState('Software Engineer');
  const [activity, setActivity] = useState<'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Highly Active'>('Highly Active');
  const [familyHistory, setFamilyHistory] = useState('None');
  const [selectedBodyParts, setSelectedBodyParts] = useState<BodyPart[]>(['Knee', 'Lower Limb']);

  const [isRegSaved, setIsRegSaved] = useState(false);

  // --- BOOKING STATE ---
  const [bookingStep, setBookingStep] = useState(1); // 1 to 5
  const [selectedType, setSelectedType] = useState<AppointmentType>('Initial Consultation');
  const [selectedDate, setSelectedDate] = useState('2026-06-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [createdApt, setCreatedApt] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('Credit Card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [issuedCode, setIssuedCode] = useState('');

  // --- MESSAGING STATE ---
  const [chatMessageText, setChatMessageText] = useState('');
  const [uploadedAttachmentName, setUploadedAttachmentName] = useState('');

  // --- PROGRESS VIDEO UPLOAD ---
  const [motionVideoTitle, setMotionVideoTitle] = useState('');
  const [motionVideoFile, setMotionVideoFile] = useState('');
  const [showProgressUploadPanel, setShowProgressUploadPanel] = useState(false);

  // --- TELEHEALTH RECTRA SYSTEM ---
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [screenShared, setScreenShared] = useState(false);
  const [sessionRecording, setSessionRecording] = useState(false);
  const [telechatMsg, setTelechatMsg] = useState('');
  const [telechatHistory, setTelechatHistory] = useState<string[]>([
    "System: Connection established with HIPAA server.",
    "System: HD Audio stream synced @ 48kHz."
  ]);

  // Body hotspots for pain chart
  const bodyHazards: { name: BodyPart; x: number; y: number; r: number }[] = [
    { name: 'Face', x: 100, y: 35, r: 12 },
    { name: 'Neck', x: 100, y: 55, r: 10 },
    { name: 'Shoulder', x: 68, y: 75, r: 10 },
    { name: 'Shoulder', x: 132, y: 75, r: 10 },
    { name: 'Elbow', x: 50, y: 110, r: 10 },
    { name: 'Elbow', x: 150, y: 110, r: 10 },
    { name: 'Wrist', x: 40, y: 145, r: 8 },
    { name: 'Wrist', x: 160, y: 145, r: 8 },
    { name: 'Back', x: 100, y: 120, r: 15 },
    { name: 'Hip', x: 80, y: 160, r: 12 },
    { name: 'Hip', x: 120, y: 160, r: 12 },
    { name: 'Knee', x: 80, y: 230, r: 12 },
    { name: 'Knee', x: 120, y: 230, r: 12 },
    { name: 'Ankle', x: 80, y: 295, r: 9 },
    { name: 'Ankle', x: 120, y: 295, r: 9 },
    { name: 'Foot', x: 75, y: 320, r: 10 },
    { name: 'Foot', x: 125, y: 320, r: 10 },
  ];

  const toggleBodyPart = (part: BodyPart) => {
    setSelectedBodyParts(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedDetails = {
      id: patientDetails.id,
      fullName,
      dob,
      gender,
      phone,
      email,
      country,
      state,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship: emergencyRelation
      },
      // medical details
      mainComplaint,
      painLocation,
      durationOfSymptoms,
      previousTreatmentHistory,
      currentMedications,
      relevantMedicalConditions,
      previousSurgeries,
      medicalReportUrl: patientDetails.medicalReportUrl
    };

    setPatientDetails(updatedDetails);
    
    // Also submit assessment details
    submitAssessment({
      painLevel,
      symptomDuration: durationOfSymptoms,
      aggravatingActivities: aggravating,
      relievingActivities: relieving,
      functionalLimitations: limitations,
      sleepDisturbance: sleepDisturb,
      occupation,
      activityLevel: activity,
      familyHistory,
      selectedBodyParts
    });

    setIsRegSaved(true);
    setTimeout(() => setIsRegSaved(false), 3000);
  };

  const handleBookingConfirm = () => {
    if (!selectedTimeSlot) return;
    const apt = addAppointment(selectedType, selectedDate, selectedTimeSlot);
    setCreatedApt(apt);
    setBookingStep(5); // Payment step
  };

  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const fee = selectedType.includes('Initial') ? 150 : 95;
    const rec = processPayment(createdApt.bookingRef, paymentMethod, fee);
    setIssuedCode(rec.accessCode || 'DES-PHY-859472');
    setPaymentSuccess(true);
    setBookingStep(6); // Confirmed
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageText.trim() && !uploadedAttachmentName) return;

    let attachment: any = undefined;
    if (uploadedAttachmentName) {
      attachment = {
        name: uploadedAttachmentName,
        type: uploadedAttachmentName.endsWith('.pdf') ? 'pdf' : 'image',
        url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=400&auto=format&fit=crop'
      };
    }

    sendChatMessage(chatMessageText, 'patient', attachment);
    setChatMessageText('');
    setUploadedAttachmentName('');

    // Simulate auto therapist reply after 5 seconds
    setTimeout(() => {
      sendChatMessage("Thanks Jane, I will examine this information and review your exercises before our session.", 'physiotherapist');
    }, 4000);
  };

  const handleProgressVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motionVideoTitle) return;
    addProgressVideo(patientDetails.id, motionVideoTitle, 'https://assets.mixkit.co/videos/preview/mixkit-stretching-exercises-in-a-sunny-studio-41712-large.mp4');
    setMotionVideoTitle('');
    setShowProgressUploadPanel(false);
  };

  const latestPlan = treatmentPlans.find(p => p.patientId === patientDetails.id) || treatmentPlans[0];
  const patientProgress = progress.find(p => p.patientId === patientDetails.id) || progress[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Sidebar controls */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">
              JC
            </div>
            <div>
              <h3 className="font-semibold text-sm">{patientDetails.fullName}</h3>
              <p className="text-[11px] text-slate-400">Patient ID: {patientDetails.id}</p>
            </div>
          </div>
          
          <div className="p-3 bg-slate-850 rounded-xl border border-slate-800 text-[11px] text-emerald-400 flex items-center justify-between font-mono">
            <span>Recovery Index:</span>
            <span className="font-bold text-xs bg-emerald-500/20 px-2 py-0.5 rounded">{patientProgress?.recoveryPercentage}%</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-0.5">
          <button
            onClick={() => setActiveTab('hub')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'hub' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Rehabilitation Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'register' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> Intakes & Body Chart</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'book' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Book & Pay Session</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'exercises' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Flame className="w-4 h-4" /> Exercise Library</span>
            {latestPlan?.exercises.length > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {latestPlan.exercises.length} Active
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'progress' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Progress & Video logs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('telehealth')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'telehealth' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <span className="flex items-center gap-2"><Video className="w-4 h-4" /> Telehealth Studio</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'messages' ? 'bg-emerald-600 text-white shadow-shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Secure Chat</span>
            <span className="bg-slate-100 text-slate-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {chats.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main tab content */}
      <div className="lg:col-span-9 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[550px]">
        
        {/* --- HUB (HOME) TAB --- */}
        {activeTab === 'hub' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Welcome Back, {patientDetails.fullName}!</h2>
                <p className="text-xs text-slate-600 mt-1">
                  You are making superb progress, recovery index increased by 7% this week! Play your workout and log details.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('telehealth')}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-4 h-4" /> Join Video Telehealth Session
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Recovery Index</span>
                <div className="text-2xl font-black text-slate-800 mt-1">{patientProgress?.recoveryPercentage}%</div>
                <div className="h-1.5 bg-slate-200 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${patientProgress?.recoveryPercentage}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Exercise Compliance</span>
                <div className="text-2xl font-black text-slate-800 mt-1">{patientProgress?.exerciseCompliance}%</div>
                <div className="h-1.5 bg-slate-200 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${patientProgress?.exerciseCompliance}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Prescribed Exercises</span>
                <div className="text-2xl font-black text-slate-800 mt-1">{latestPlan?.exercises.length || 0} Sets</div>
                <p className="text-[10px] text-slate-400 mt-2">Adjusted by PT on June 8</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Next Appointment</span>
                {appointments.filter(a => a.status === 'confirmed').length > 0 ? (
                  <>
                    <div className="text-xs font-bold text-slate-800 mt-1 truncate">
                      {appointments.filter(a => a.status === 'confirmed')[0].type}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">
                      {appointments.filter(a => a.status === 'confirmed')[0].date} @ {appointments.filter(a => a.status === 'confirmed')[0].time}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-bold text-slate-500 mt-1">None Scheduled</div>
                    <button onClick={() => setActiveTab('book')} className="text-left text-[11px] text-emerald-600 hover:underline font-bold mt-1">Book now →</button>
                  </>
                )}
              </div>
            </div>

            {/* Pain charting progress */}
            <div className="border border-slate-100 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center justify-between">
                <span>Pain Indices Over Clinical Weeks</span>
                <span className="text-xs text-slate-400 font-normal">Normal range: lower values represent recovery</span>
              </h3>
              <div className="h-44 flex items-end gap-1.5 border-b border-l border-slate-100 pb-3 pl-3">
                {patientProgress?.metrics.map((metric, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 bg-slate-900 text-white text-[10px] py-1 px-2 rounded hidden group-hover:block whitespace-nowrap">
                      Pain Level: {metric.painScore}/10
                    </div>
                    <div 
                      className="w-full max-w-10 bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t-md transition-all hover:scale-105"
                      style={{ height: `${metric.painScore * 16}px` }}
                    />
                    <span className="mt-2 text-[10.5px] text-slate-500 font-medium font-mono">{metric.week}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-6 mt-4 text-[11.5px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full" /> Pain Score
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-500 rounded-full" /> Exercise Compliance ({patientProgress?.exerciseCompliance}%)
                </span>
              </div>
            </div>

            {/* Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Todays Routine Completion</h4>
                  <p className="text-xs text-slate-500 mt-1">Please log your prescribed movements daily to update your clinic compliance logs.</p>
                  <button onClick={() => setActiveTab('exercises')} className="mt-3 text-xs bg-emerald-600 text-white py-1.5 px-3 rounded-lg font-semibold hover:bg-emerald-700">Open Routine</button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Questions or Soreness?</h4>
                  <p className="text-xs text-slate-500 mt-1">You enjoy a direct messaging channel dedicated directly to Dr. Smith. Attach pictures readily.</p>
                  <button onClick={() => setActiveTab('messages')} className="mt-3 text-xs bg-emerald-600 text-white py-1.5 px-3 rounded-lg font-semibold hover:bg-emerald-700">Write Message</button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- REGISTRATION AND ONLINE ASSESSMENT --- */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Symptom Intakes & Interactive Mapping</h2>
              <p className="text-xs text-slate-500 mt-1">Provide your details and click your somatic pain sources using our visual charting module below.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Personal Intake Forms */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">1. Personal Profile</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:border-emerald-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      required
                      value={dob} 
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:border-emerald-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gender</label>
                    <select 
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Country</label>
                    <input 
                      type="text" 
                      required
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">State / Region</label>
                    <input 
                      type="text" 
                      required
                      value={state} 
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
                  <h4 className="text-[10px] font-bold uppercase text-slate-500">Emergency Contact Contact</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      required
                      value={emergencyName} 
                      onChange={(e) => setEmergencyName(e.target.value)}
                      className="text-[11px] p-2 bg-white border border-slate-250 rounded col-span-1.5 focus:border-emerald-500" 
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone" 
                      required
                      value={emergencyPhone} 
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      className="text-[11px] p-2 bg-white border border-slate-250 rounded col-span-1 focus:border-emerald-500" 
                    />
                    <input 
                      type="text" 
                      placeholder="Relationship" 
                      required
                      value={emergencyRelation} 
                      onChange={(e) => setEmergencyRelation(e.target.value)}
                      className="text-[11px] p-2 bg-white border border-slate-250 rounded col-span-1.5 focus:border-emerald-500" 
                    />
                  </div>
                </div>

                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest pt-2">2. Medical Context</h3>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Main Complaint Narrative</label>
                  <textarea 
                    value={mainComplaint} 
                    required
                    onChange={(e) => setMainComplaint(e.target.value)}
                    rows={2}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:border-emerald-500" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Specific Pain Location</label>
                    <input 
                      type="text" 
                      required
                      value={painLocation} 
                      onChange={(e) => setPainLocation(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Duration of Symptoms</label>
                    <input 
                      type="text" 
                      required
                      value={durationOfSymptoms} 
                      onChange={(e) => setDurationOfSymptoms(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Previous Treatment</label>
                    <input 
                      type="text" 
                      value={previousTreatmentHistory} 
                      onChange={(e) => setPreviousTreatmentHistory(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Current Medications</label>
                    <input 
                      type="text" 
                      value={currentMedications} 
                      onChange={(e) => setCurrentMedications(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Medical Conditions</label>
                    <input 
                      type="text" 
                      value={relevantMedicalConditions} 
                      onChange={(e) => setRelevantMedicalConditions(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Previous Surgeries</label>
                    <input 
                      type="text" 
                      value={previousSurgeries} 
                      onChange={(e) => setPreviousSurgeries(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg" 
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 border-dashed rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-[11px] font-bold block text-slate-700">Intake Clinical Reports</span>
                      <span className="text-[9.5px] text-slate-400">MRI_left_knee_axial_coronal.pdf</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                  </span>
                </div>
              </div>

              {/* Right Column: Physical Mapping Chart */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">3. Pain Chart Mapping</h3>
                
                {/* Interactive diagram canvas */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 italic mb-2">Click affected bodily regions to record somatic hotspots:</span>
                  
                  <div className="relative w-52 h-96 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-inner">
                    {/* Simplified humanoid vector */}
                    <svg viewBox="0 0 200 350" className="w-full h-full text-slate-200 select-none">
                      {/* Human head */}
                      <circle cx="100" cy="35" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                      {/* Neck */}
                      <line x1="100" y1="50" x2="100" y2="60" stroke="currentColor" strokeWidth="3" />
                      {/* Torso/ribs */}
                      <rect x="75" y="60" rx="10" width="50" height="100" fill="none" stroke="currentColor" strokeWidth="2" />
                      {/* Shoulders / arms */}
                      <path d="M 75 70 L 40 100 L 30 150" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 125 70 L 160 100 L 170 150" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      {/* Pelvis / Hips */}
                      <line x1="80" y1="160" x2="120" y2="160" stroke="currentColor" strokeWidth="2" />
                      {/* Legs */}
                      <path d="M 85 160 L 80 230 L 80 300 L 70 310" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 115 160 L 120 230 L 120 300 L 130 310" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Hotspots clickable nodes overlay */}
                      {bodyHazards.map((hz, i) => {
                        const isSelected = selectedBodyParts.includes(hz.name);
                        return (
                          <g key={i} className="cursor-pointer group" onClick={() => toggleBodyPart(hz.name)}>
                            <circle 
                              cx={hz.x} 
                              cy={hz.y} 
                              r={hz.r} 
                              fill={isSelected ? '#10b981' : '#f1f5f9'} 
                              stroke={isSelected ? '#047857' : '#94a3b8'} 
                              strokeWidth="1.5"
                              fillOpacity={isSelected ? '0.75' : '1'}
                              className="transition-all duration-200 hover:fill-red-200 hover:stroke-red-400"
                            />
                            <text 
                              x={hz.x} 
                              y={hz.y + (hz.r > 10 ? 3 : 2.5)} 
                              fontSize="6" 
                              fontWeight="bold"
                              fill={isSelected ? '#ffffff' : '#475569'}
                              textAnchor="middle"
                            >
                              {hz.name[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Display indicators */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 text-[9px] font-mono">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Sore</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-100 border border-slate-300 rounded-full" /> Clear</span>
                    </div>
                  </div>

                  <div className="mt-3 w-full">
                    <span className="text-[10px] font-bold text-slate-500">Active Somatic Selections:</span>
                    <div className="flex flex-wrap gap-1 mt-1.5 min-h-6">
                      {selectedBodyParts.length === 0 ? (
                        <span className="text-[10px] text-slate-400 italic">No nodes marked as sore. Click on map directly.</span>
                      ) : (
                        selectedBodyParts.map((p) => (
                          <span key={p} className="bg-emerald-50 text-emerald-800 text-[9.5px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200/50 flex items-center gap-1">
                            {p} <button type="button" onClick={() => toggleBodyPart(p)} className="hover:text-red-500 text-xs text-slate-400">×</button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Question set */}
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">Current Pain Severity Index ({painLevel}/10)</label>
                      <span className="text-xs font-black text-rose-600 font-mono italic">
                        {painLevel >= 8 ? 'Severe Distress' : painLevel >= 5 ? 'Moderate Soren' : 'Mild discomfort'}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={painLevel} 
                      onChange={(e) => setPainLevel(parseInt(e.target.value))}
                      className="w-full accent-rose-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Aggravating Daily Movements</label>
                    <input 
                      type="text" 
                      value={aggravating} 
                      onChange={(e) => setAggravating(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-250 rounded-lg focus:border-emerald-500" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sleeping Interruptions</label>
                      <select 
                        value={sleepDisturb} 
                        onChange={(e: any) => setSleepDisturb(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-250 rounded-lg"
                      >
                        <option>None</option>
                        <option>Mild</option>
                        <option>Moderate</option>
                        <option>Severe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Professional / Work</label>
                      <input 
                        type="text" 
                        value={occupation} 
                        onChange={(e) => setOccupation(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-250 rounded-lg" 
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              {isRegSaved && (
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Personal & Symptom files saved to secure local records.
                </span>
              )}
              <button
                type="submit"
                id="btn-register-submit"
                className="ml-auto py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                Save Intake File & Assessment Chart
              </button>
            </div>
          </form>
        )}

        {/* --- APPOINTMENT BOOKING & CHECKOUT SYSTEM --- */}
        {activeTab === 'book' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Appointment Booking & Payments Engine</h2>
              <p className="text-xs text-slate-500 mt-1">Book a session type, select slots and finalize using local & international options.</p>
            </div>

            {/* Stepper bar visualization */}
            <div className="flex items-center justify-between max-w-xl mx-auto mb-8 text-xs font-semibold">
              <span className={`px-3 py-1 rounded-full ${bookingStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>1. Session</span>
              <div className="flex-1 h-0.5 bg-slate-100 mx-2" />
              <span className={`px-3 py-1 rounded-full ${bookingStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>2. Date & Time</span>
              <div className="flex-1 h-0.5 bg-slate-100 mx-2" />
              <span className={`px-3 py-1 rounded-full ${bookingStep >= 5 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>3. Checkout</span>
              <div className="flex-1 h-0.5 bg-slate-100 mx-2" />
              <span className={`px-3 py-1 rounded-full ${bookingStep >= 6 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>4. Complete</span>
            </div>

            {/* STEP 1: Select Appointment Type */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800">Select consultation format:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { type: 'Initial Consultation', fee: 150, duration: '45 mins', desc: 'Thorough clinical onboarding, physical screening, interactive charting evaluation, and goals mapping.' },
                    { type: 'Follow-Up Consultation', fee: 95, duration: '30 mins', desc: 'Progress assessment, manual physical review indicators, and exercise program readjustments.' },
                    { type: 'Exercise Review Session', fee: 95, duration: '30 mins', desc: 'Detailed execution check of motion plans, posture analysis, and workload balancing.' },
                    { type: 'Post-Surgery Rehabilitation Session', fee: 150, duration: '45 mins', desc: 'Acute surgical area mobilization and protective range of movement exercise prescriptions.' }
                  ].map((srv) => (
                    <div 
                      key={srv.type}
                      onClick={() => setSelectedType(srv.type as AppointmentType)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedType === srv.type 
                          ? 'border-emerald-600 bg-emerald-50/20' 
                          : 'border-slate-150 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-slate-800">{srv.type}</span>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${srv.fee}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{srv.desc}</p>
                      <span className="text-[10px] text-slate-400 block mt-3 font-medium">Duration: {srv.duration}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    Select preferred slots <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Slots Date & Time choosing */}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-xs text-slate-700 mb-2">Preferred booking date:</h3>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min="2026-06-10"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-xs text-slate-700 mb-2 font-mono">Clinically Available Slots:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '05:00 PM'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTimeSlot(time)}
                          className={`py-2 px-3 text-xs rounded-lg font-medium border font-mono cursor-pointer text-center ${
                            selectedTimeSlot === time
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-slate-50">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="py-2 px-4 border border-slate-250 text-slate-500 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBookingConfirm}
                    disabled={!selectedTimeSlot}
                    className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    Book and checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Payment Processing Panel */}
            {bookingStep === 5 && createdApt && (
              <form onSubmit={handleProceedPayment} className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
                  <h4 className="font-bold text-emerald-950">Draft Booking Details:</h4>
                  <ul className="mt-2 space-y-1 text-emerald-800 list-disc list-inside">
                    <li>Session Type: <strong>{createdApt.type}</strong></li>
                    <li>Referenced Draft Ref: <strong className="font-mono">{createdApt.bookingRef}</strong></li>
                    <li>Scheduled Slot: <strong className="font-mono">{createdApt.date} @ {createdApt.time}</strong></li>
                    <li>Service Fee Total: <strong>${createdApt.type.includes('Initial') ? 150 : 95} USD</strong></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-xs text-slate-700 mb-3 uppercase tracking-wider">Select Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: 'Bank Transfer', label: 'Local Bank' },
                      { name: 'Debit Card', label: 'Debit Card' },
                      { name: 'Credit Card', label: 'Credit Card' },
                      { name: 'USSD', label: 'USS Code' },
                      { name: 'Visa', label: 'Visa Card' },
                      { name: 'Mastercard', label: 'Mastercard' },
                      { name: 'PayPal', label: 'PayPal Checkout' },
                      { name: 'Stripe', label: 'Stripe Platform' }
                    ].map((mode) => (
                      <button
                        key={mode.name}
                        type="button"
                        onClick={() => setPaymentMethod(mode.name as PaymentMethodType)}
                        className={`p-3 text-xs rounded-lg border font-semibold text-center transition-all cursor-pointer ${
                          paymentMethod === mode.name
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulate Payment Form Fields */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Card Details (Simulated Gateway)</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <input 
                        type="text" 
                        required
                        placeholder="Card Holder Name"
                        className="w-full text-xs p-2.5 bg-white border border-slate-250 rounded-lg outline-none" 
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Expiry MM/YY"
                        className="w-full text-xs p-2.5 bg-white border border-slate-250 rounded-lg outline-none" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <input 
                        type="text" 
                        required
                        placeholder="Card Number"
                        className="w-full text-xs p-2.5 bg-white border border-slate-250 rounded-lg outline-none" 
                      />
                    </div>
                    <div>
                      <input 
                        type="password" 
                        required
                        maxLength={4}
                        placeholder="CVV Code"
                        className="w-full text-xs p-2.5 bg-white border border-slate-250 rounded-lg outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setBookingStep(2)}
                    className="py-2 px-4 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1"
                  >
                    Simulate Payment Gateway & Confirm
                  </button>
                </div>
              </form>
            )}

            {/* STEP 6: Confirmation Screen & Access Code Display */}
            {bookingStep === 6 && paymentSuccess && (
              <div className="text-center py-6 max-w-md mx-auto space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="font-bold text-lg text-slate-800">Booking Confirmed & Verified!</h3>
                <p className="text-xs text-slate-500">
                  We have verified your payment of ${selectedType.includes('Initial') ? 150 : 95}. A clinical allocation and automated reminder logs are booked.
                </p>

                <div className="p-4 bg-emerald-950 text-white rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase font-bold">Secure Patient Access Code</span>
                  <div className="text-2xl font-black font-mono tracking-widest text-[#a7f3d0]">{issuedCode}</div>
                  <p className="text-[10px] text-emerald-300">
                    Use this code to directly access protected clinical sessions and dashboard files.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-left text-xs">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Automated Alerts Configured:</span>
                  <ul className="space-y-1 text-slate-600">
                    <li className="flex items-center gap-1.5">✓ <strong>WhatsApp Message:</strong> access details and time</li>
                    <li className="flex items-center gap-1.5">✓ <strong>SMS Ticket:</strong> 24 hour and 1 hour reminders</li>
                    <li className="flex items-center gap-1.5">✓ <strong>Email Receipt:</strong> HIPAA clinical invoice and instructions</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setBookingStep(1);
                      setPaymentSuccess(false);
                      setActiveTab('hub');
                    }}
                    className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                  >
                    Return to Rehabilitation Hub
                  </button>
                </div>
              </div>
            )}

            {/* History of Payments */}
            <div className="border border-slate-150 rounded-xl overflow-hidden mt-8">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Transaction Records</h4>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {payments.filter(p => p.patientId === patientDetails.id).map((pay) => (
                  <div key={pay.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <span className="font-bold text-slate-800">Booking: {pay.bookingRef}</span>
                      <p className="text-[10.5px] text-slate-500 font-mono">Date Paid: {pay.date} | Mode: {pay.method}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">${pay.amount} USD</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">Verified</span>
                      <span className="font-mono text-[9px] bg-slate-100 p-1 rounded border border-slate-200 text-slate-500">Code: {pay.accessCode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- EXERCISE LIBRARY TAB --- */}
        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Assigned Physical Exercise prescriptions</h2>
              <p className="text-xs text-slate-500 mt-1">Checkoff movements daily to feed clinical coordination scores.</p>
            </div>

            {latestPlan?.exercises.length === 0 ? (
              <div className="text-center p-8 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-xs text-slate-400">No active physical movements registered. Telehealth screen onboarding is required.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-emerald-700 animate-pulse" />
                    <div>
                      <span className="text-xs font-bold text-emerald-950 block">Assigned Goals Checklist:</span>
                      <p className="text-[11px] text-emerald-800">Your clinical routine aims to restore optimal patella joint alignment.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {latestPlan?.exercises.map((item) => {
                    const frequencyInt = item.frequency.toLowerCase().includes('twice') ? 2 : 1;
                    const percentComplete = Math.round((item.completedTodayCount / frequencyInt) * 100);
                    
                    return (
                      <div key={item.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden relative group cursor-pointer mb-3">
                            <img 
                              src={item.demoVideoUrl} 
                              alt="demo illustration" 
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                              <span className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center text-xs font-bold shadow shadow-shadow">
                                <Play className="w-4 h-4 ml-0.5 fill-emerald-700" />
                              </span>
                            </div>
                            <span className="absolute bottom-2 left-2 bg-slate-900/70 text-white text-[9.5px] font-mono py-0.5 px-2 rounded">
                              Demonstration Video
                            </span>
                          </div>

                          <div className="flex justify-between items-start">
                            <span className="font-bold text-xs text-slate-800">{item.name}</span>
                            <span className="text-[10px] font-bold text-slate-500 font-mono">Count: {item.completedTodayCount}/{frequencyInt}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] mt-3 bg-slate-50 p-2 rounded-lg font-semibold text-slate-500">
                            <div>• Sets: <strong className="text-slate-800 font-bold">{item.sets} Sets</strong></div>
                            <div>• Reps: <strong className="text-slate-800 font-bold">{item.reps} Reps</strong></div>
                            <div>• Duration: <strong className="text-slate-800 font-bold">{item.duration}</strong></div>
                            <div>• Frequency: <strong className="text-slate-800 font-bold">{item.frequency}</strong></div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                          <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: `${percentComplete}%` }} />
                          </div>
                          
                          <button
                            onClick={() => updateExerciseProgress(patientDetails.id, item.id)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 text-xs py-1.5 px-3 rounded-lg font-bold flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" /> Complete Rep Set
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- PROGRESS & VIDEO RECORDING TAB --- */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Patient Recovery progress & logs</h2>
                <p className="text-xs text-slate-500 mt-1">Upload daily/weekly recordings of physical flexibility movements.</p>
              </div>
              <button
                onClick={() => setShowProgressUploadPanel(!showProgressUploadPanel)}
                className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Record & Share ROM Video
              </button>
            </div>

            {showProgressUploadPanel && (
              <form onSubmit={handleProgressVideoSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 max-w-md">
                <h4 className="text-xs font-bold text-slate-700">Record physical movement check:</h4>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Workout Video Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Week 2 flex extension review"
                    value={motionVideoTitle}
                    onChange={(e) => setMotionVideoTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 bg-emerald-50/50 border border-dashed border-emerald-300 rounded-lg text-center cursor-pointer">
                  <Play className="w-6 h-6 text-emerald-600 mx-auto animate-pulse mb-1" />
                  <span className="text-[10.5px] font-bold text-emerald-800 block">Record via Frontal Camera (Simulated)</span>
                  <span className="text-[9.5px] text-slate-400">Takes 10s video snapshot directly</span>
                </div>

                <div className="flex gap-2 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowProgressUploadPanel(false)}
                    className="py-1.5 px-3 border border-slate-250 text-slate-500 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="py-1.5 px-3 bg-emerald-600 text-white rounded text-xs font-bold"
                  >
                    Confirm Share Clip
                  </button>
                </div>
              </form>
            )}

            {/* Video uploads history list */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest">Shared Physical Execution Clips:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patientProgress?.videoUploads.map((vid) => (
                  <div key={vid.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex gap-3.5 items-start">
                    <div className="w-14 h-14 bg-emerald-900 border border-emerald-800 text-[#a7f3d0] rounded-xl flex items-center justify-center font-bold text-xs shrink-0 relative">
                      <Play className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{vid.title}</span>
                      <p className="text-[10px] text-emerald-700 font-semibold font-mono mt-0.5">Uploaded on {vid.date}</p>
                      <span className="text-[10px] text-slate-400 block mt-2">Format: WebM Video (HD H.264)</span>
                    </div>
                  </div>
                ))}

                {patientProgress?.videoUploads.length === 0 && (
                  <span className="text-xs text-slate-400 italic">No movement checkup video logged yet.</span>
                )}
              </div>
            </div>

            {/* Comprehensive functional score breakdown */}
            <div className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center justify-between">
                <span>Functional Performance Metrics Scorecards</span>
                <span className="text-xs text-slate-400 font-normal">Based on daily checkoff compliance metrics</span>
              </h3>
              
              <div className="space-y-3 pt-2">
                {[
                  { name: 'Walking Capacity', score: 75, color: 'bg-emerald-500' },
                  { name: 'Sitting Tolerance (Postural Spine Check)', score: 90, color: 'bg-blue-500' },
                  { name: 'Standing Symmetry balance', score: 80, color: 'bg-emerald-500' },
                  { name: 'Lifting Threshold Load Capacity', score: 65, color: 'bg-amber-500' },
                  { name: 'Activities of Daily Living (ADL)', score: 75, color: 'bg-emerald-500' }
                ].map((fn, i) => (
                  <div key={i} className="text-xs flex items-center justify-between gap-4">
                    <span className="w-52 font-semibold text-slate-600 block">{fn.name}</span>
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${fn.color} h-full`} style={{ width: `${fn.score}%` }} />
                    </div>
                    <span className="w-12 text-right font-bold text-slate-800">{fn.score}/100</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- TELEHEALTH CONSULTATION tab --- */}
        {activeTab === 'telehealth' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Telehealth Video Consulting Studio</h2>
                <p className="text-xs text-slate-500 mt-1">HIPAA Encrypted high-fidelity virtual consult room with Dr. Alan Smith.</p>
              </div>
              <button
                onClick={() => setTelehealthMeetingActive(!telehealthMeetingActive)}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold shadow cursor-pointer transition-all ${
                  telehealthMeetingActive 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {telehealthMeetingActive ? 'Leave Consult Session' : 'Enter Telehealth Session'}
              </button>
            </div>

            {!telehealthMeetingActive ? (
              <div className="text-center py-10 max-w-sm mx-auto space-y-4">
                <Video className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">Consultation is ready for transmission</h3>
                <p className="text-xs text-slate-400">
                  Please assure your camera and microphone are unlocked and click "Enter Telehealth Session."
                </p>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-left text-xs font-semibold">
                  <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">Pre-checking credentials:</span>
                  <div className="flex items-center gap-1.5 text-slate-600">Camera permission authorized: <strong className="text-emerald-600 font-bold ml-auto">Verified</strong></div>
                  <div className="flex items-center gap-1.5 text-slate-600">Audio input levels online: <strong className="text-emerald-600 font-bold ml-auto">Verified</strong></div>
                  <div className="flex items-center gap-1.5 text-slate-600">Bypass passcode credentials: <strong className="text-emerald-600 font-bold ml-auto">DES-PHY-859472</strong></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Simulated consultation frame layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white">
                  
                  {/* Left Column: HD Stream screen */}
                  <div className="lg:col-span-3 aspect-video bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800">
                    
                    {/* Simulated Therapist camera feed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/25 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300 font-black animate-pulse">
                          AS
                        </div>
                        <span className="text-xs font-bold text-emerald-300 tracking-wider block">Dr. Alan Smith (PT)</span>
                        <span className="text-[10px] text-slate-400">Connected | HD 1080p WebRTC Session</span>
                      </div>
                    </div>

                    {/* Patient PIP Overlay inside card */}
                    <div className="absolute bottom-3 right-3 w-28 md:w-36 aspect-video bg-slate-950/90 border border-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
                      {cameraActive ? (
                        <div className="text-center space-y-1 p-1">
                          <span className="text-[9.5px] font-bold text-emerald-400 block truncate">You (Jane Cooper)</span>
                          <span className="text-[8.5px] text-slate-500 block">Camera Active</span>
                        </div>
                      ) : (
                        <span className="text-[9.5px] text-rose-500">Video Off</span>
                      )}
                    </div>

                    {/* Floating HUD status */}
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                      <span>{sessionRecording ? 'REC ON (Simulated)' : 'NOT RECORDING'}</span>
                    </div>

                    {/* Overlay controls row */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5 z-40 bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
                      <button 
                        type="button" 
                        onClick={() => setCameraActive(!cameraActive)}
                        className={`p-1.5 rounded transition ${cameraActive ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
                      >
                        Camera
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setMicActive(!micActive)}
                        className={`p-1.5 rounded transition ${micActive ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
                      >
                        Mic
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          setScreenShared(!screenShared);
                          setTelechatHistory(prev => [...prev, `System: Jane toggled screen sharing: ${!screenShared ? 'ACTIVE' : 'IDLE'}`]);
                        }}
                        className={`p-1.5 rounded transition ${screenShared ? 'bg-amber-600 text-white' : 'bg-slate-700 text-white'}`}
                      >
                        Share Screen
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSessionRecording(!sessionRecording)}
                        className={`p-1.5 rounded transition ${sessionRecording ? 'bg-red-650 bg-red-600 text-white' : 'bg-slate-700 text-white'}`}
                      >
                        Rec
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Mini Interactive Call Chat */}
                  <div className="lg:col-span-1 flex flex-col justify-between h-full min-h-64">
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex-1 flex flex-col justify-between shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">Session Chat Logs</span>
                      <div className="space-y-1.5 text-[10px] max-h-48 overflow-y-auto">
                        {telechatHistory.map((h, i) => (
                          <div key={i} className="text-slate-300 font-mono italic leading-relaxed">{h}</div>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-1 pt-1.5 border-t border-slate-800">
                        <input
                          type="text"
                          value={telechatMsg}
                          onChange={(e) => setTelechatMsg(e.target.value)}
                          placeholder="Type..."
                          className="flex-1 bg-slate-950 text-[10px] font-medium p-1 text-white border border-slate-800 rounded outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!telechatMsg.trim()) return;
                            setTelechatHistory(prev => [...prev, `Jane: ${telechatMsg}`]);
                            setTelechatMsg('');
                          }}
                          className="bg-emerald-600 px-2 py-1 rounded text-[10px] shrink-0 font-bold"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Automation disclaimer */}
                <div className="p-3 bg-amber-50 text-amber-900 text-xs border border-amber-200 rounded-xl">
                  <strong>Clinician Autosave Integration:</strong> Narrative logs of muscle extension profiles completed during the telehealth consulting call are saved automatically to the clinician clinical records ledger.
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- PRIVATE SECURE MESSAGES CHANNEL --- */}
        {activeTab === 'messages' && (
          <div className="space-y-6 flex flex-col h-full justify-between">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Direct Secure Clinical Messaging Pipeline</h2>
              <p className="text-xs text-slate-500 mt-1">Direct communication with Dr. Alan Smith (PT). HIPAA cleared encrypted session.</p>
            </div>

            {/* Chat list channel container */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 flex-1 pb-4">
              {chats.map((msg) => {
                const isPatient = msg.senderRole === 'patient';
                return (
                  <div key={msg.id} className={`flex ${isPatient ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md rounded-2xl p-4 text-xs space-y-1 shadow-sm border ${
                      isPatient 
                        ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none' 
                        : 'bg-slate-50 text-slate-750 border-slate-150 rounded-tl-none'
                    }`}>
                      <div className="flex justify-between items-center gap-6">
                        <span className="font-extrabold text-[10.5px] uppercase tracking-wider">
                          {msg.senderName}
                        </span>
                        <span className={`text-[9px] font-mono ${isPatient ? 'text-emerald-200' : 'text-slate-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <p className="leading-relaxed mt-1 font-medium">{msg.content}</p>

                      {/* Display attachments if present */}
                      {msg.attachment && (
                        <div className={`mt-2.5 p-2 rounded-lg border flex items-center justify-between gap-4 text-[10px] ${
                          isPatient ? 'bg-emerald-700/50 border-emerald-500/50' : 'bg-white border-slate-200'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span className="font-bold underline cursor-pointer">{msg.attachment.name}</span>
                          </div>
                          {msg.attachment.type === 'image' && (
                            <img 
                              src={msg.attachment.url} 
                              alt="diagnostic attachments" 
                              className="w-12 h-12 object-cover rounded border" 
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Write box */}
            <form onSubmit={handleSendMessage} className="space-y-3 pt-4 border-t border-slate-150 mt-auto">
              
              {uploadedAttachmentName && (
                <div className="flex items-center gap-1.5 p-2 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 max-w-sm inline-block">
                  <FileText className="w-4 h-4" /> Attached file: <strong>{uploadedAttachmentName}</strong>
                  <button 
                    type="button" 
                    onClick={() => setUploadedAttachmentName('')}
                    className="ml-auto font-black hover:text-red-500 text-xs text-slate-400"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={chatMessageText}
                  onChange={(e) => setChatMessageText(e.target.value)}
                  placeholder="Ask Dr. Alan Smith a question or report post-workout soreness..."
                  className="flex-1 text-xs p-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                />

                {/* Simulate file attachment selection */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      const options = ['soreness_check_selfie.png', 'knee_flex_mri.pdf', 'squat_stance_pic.jpg'];
                      const randomOpt = options[Math.floor(Math.random() * options.length)];
                      setUploadedAttachmentName(randomOpt);
                    }}
                    className="p-3.5 border border-slate-250 hover:bg-slate-50 text-slate-500 rounded-xl text-xs font-semibold flex items-center justify-center cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1 cursor-pointer"
                >
                  Send Message <Send className="w-4.5 h-4.5 ml-1" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
