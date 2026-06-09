/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { otherPatients, mockExerciseLibrary } from '../data';
import { 
  Users, Calendar, Video, MessageSquare, FileText, Settings, 
  Search, Plus, Check, Play, UserPlus, HeartPulse, ChevronRight, 
  Sliders, Award, ThumbsUp, DollarSign, Download, Sparkles 
} from 'lucide-react';

export const PhysioPortal: React.FC = () => {
  const { 
    patientDetails, 
    appointments, 
    updateAppointmentStatus,
    payments, 
    treatmentPlans, 
    prescribeExercise,
    assessments, 
    chats, 
    sendChatMessage, 
    progress, 
    reports,
    generateClinicalReport,
    telehealthMeetingActive,
    setTelehealthMeetingActive
  } = useApp();

  const [activeTab, setActiveTab] = useState<'patients' | 'sched' | 'prescribe' | 'telehealth' | 'messages' | 'reports'>('patients');
  
  // Patient details inspection modal / subview state
  const [selectedPatientId, setSelectedPatientId] = useState(patientDetails.id);

  // --- NEW EXERCISE PRECISE PRESCRIBE STATE ---
  const [newExName, setNewExName] = useState('Neck Retraction Exercise');
  const [newExSets, setNewExSets] = useState(3);
  const [newExReps, setNewExReps] = useState(10);
  const [newExDur, setNewExDur] = useState('Hold 5s');
  const [newExFreq, setNewExFreq] = useState('Twice Daily');
  const [exPrescribeSuccess, setExPrescribeSuccess] = useState(false);

  // --- COMPOSING CLINICAL REPORT STATE ---
  const [reportType, setReportType] = useState<'Assessment' | 'Progress' | 'Discharge'>('Progress');
  const [reportNarrative, setReportNarrative] = useState('Patient displays stellar muscle compliance. Terminal knee lock is fully extended without lag. Pain indexes fell to 4/10.');
  const [reportGoalMet, setReportGoalMet] = useState('Reduce left knee swelling and anterior patella pain');
  const [reportSuccess, setReportSuccess] = useState(false);

  // --- THERAPIST CHAT TEXT STATE ---
  const [therapistChatText, setTherapistChatText] = useState('');

  // --- TELEHEALTH NOTE-TAKING STATE ---
  const [teleLiveNote, setTeleLiveNote] = useState('');
  const [savedNoteSuccess, setSavedNoteSuccess] = useState('');

  // Helper selectors
  const getSelectedPatientDetails = () => {
    if (selectedPatientId === patientDetails.id) return patientDetails;
    const oth = otherPatients.find(p => p.id === selectedPatientId);
    return oth ? {
      id: oth.id,
      fullName: oth.name,
      dob: '1990-08-15',
      gender: 'Male',
      phone: '+1 (555) 124-7889',
      email: oth.email,
      country: 'United States',
      state: 'California',
      emergencyContact: { name: 'Sister', phone: '', relationship: 'Sibling' },
      mainComplaint: oth.injury,
      painLocation: 'Joint soreness',
      durationOfSymptoms: '4 weeks',
      previousTreatmentHistory: 'Minor ice therapy',
      currentMedications: 'None',
      relevantMedicalConditions: 'None',
      previousSurgeries: 'None'
    } : null;
  };

  const handlePrescribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    prescribeExercise(selectedPatientId, {
      name: newExName,
      demoVideoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300&auto=format&fit=crop',
      sets: newExSets,
      reps: newExReps,
      duration: newExDur,
      frequency: newExFreq
    });
    setExPrescribeSuccess(true);
    setTimeout(() => setExPrescribeSuccess(false), 3000);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const details = getSelectedPatientDetails();
    if (!details) return;

    generateClinicalReport(
      selectedPatientId,
      details.fullName,
      reportType,
      reportNarrative,
      [reportGoalMet]
    );

    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

  const handleTherapistSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!therapistChatText.trim()) return;
    sendChatMessage(therapistChatText, 'physiotherapist');
    setTherapistChatText('');
  };

  const handleSaveTeleLiveNote = () => {
    if (!teleLiveNote.trim()) return;
    // Simulate auto-saving note directly to intake
    setSavedNoteSuccess('Clinical consultative note saved automatically to patient records ledger.');
    setTeleLiveNote('');
    setTimeout(() => setSavedNoteSuccess(''), 4000);
  };

  const activePatientDet = getSelectedPatientDetails();
  const activePatientProgress = progress.find(p => p.patientId === selectedPatientId) || progress[0];
  const activePlanFile = treatmentPlans.find(plan => plan.patientId === selectedPatientId) || treatmentPlans[0];
  const activeAssessmentFile = assessments.find(a => a.patientId === selectedPatientId) || assessments[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Clinician Left Nav Rail */}
      <div className="lg:col-span-3 space-y-4">
        
        {/* Clinician Profile */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center border border-emerald-400">
              AS
            </div>
            <div>
              <h3 className="font-semibold text-sm">Dr. Alan Smith, PT</h3>
              <p className="text-[10px] text-emerald-400 font-mono tracking-wider">Clinical Physiotherapist</p>
            </div>
          </div>
        </div>

        {/* Clinician Tabs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-0.5 text-xs">
          <button
            onClick={() => setActiveTab('patients')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'patients' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Patient Dossiers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('sched')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'sched' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Appointments Manager</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('prescribe')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'prescribe' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><Sliders className="w-4 h-4" /> Prescribe Workouts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('telehealth')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'telehealth' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <span className="flex items-center gap-2"><Video className="w-4 h-4" /> Clinical Teleconferencing</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'messages' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Secure Consult Inbox</span>
            <span className="bg-slate-100 text-slate-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">New</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'reports' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Clinical Report Writer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Patient quick switcher */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2.5">
          <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Select Active Patient:</span>
          <div className="space-y-1 text-xs">
            {/* Jane Cooper */}
            <button
              onClick={() => setSelectedPatientId(patientDetails.id)}
              className={`w-full p-2.5 rounded-xl text-left font-semibold flex items-center justify-between transition-all border ${
                selectedPatientId === patientDetails.id 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-250' 
                  : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{patientDetails.fullName}</span>
              <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-bold">Knee</span>
            </button>
            {/* Rest of patients */}
            {otherPatients.map((oth) => (
              <button
                key={oth.id}
                onClick={() => setSelectedPatientId(oth.id)}
                className={`w-full p-2.5 rounded-xl text-left font-semibold flex items-center justify-between transition-all border ${
                  selectedPatientId === oth.id 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-250' 
                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{oth.name}</span>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">Sore</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main clinical space */}
      <div className="lg:col-span-9 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[550px]">
        
        {/* --- PATIENT dossiers TAB --- */}
        {activeTab === 'patients' && activePatientDet && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">HIPAA Locked Records Folder</span>
                <h2 className="text-xl font-bold text-slate-800">{activePatientDet.fullName} Clinical Profile</h2>
                <p className="text-xs text-slate-500 font-mono">DoB: {activePatientDet.dob} ({activePatientDet.gender}) | Phone: {activePatientDet.phone}</p>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-550 block text-[10px]">Recovery Index</span>
                  <strong className="text-emerald-800 text-base">{activePatientProgress?.recoveryPercentage || 62}%</strong>
                </div>
                <div className="border-l border-emerald-200 pl-4">
                  <span className="text-slate-550 block text-[10px]">Compliance Ratio</span>
                  <strong className="text-emerald-800 text-base">{activePatientProgress?.exerciseCompliance || 85}%</strong>
                </div>
              </div>
            </div>

            {/* Comprehensive details block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Intakes & Demographics */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> Intake Demographics & File context
                </h3>

                <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100 text-xs text-slate-755 text-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Chief Symptomatic Complaint:</span>
                    <p className="font-semibold">{activePatientDet.mainComplaint}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Pain Articulation Focus:</span>
                    <p className="font-semibold">{activePatientDet.painLocation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Symptom duration:</span>
                      <p className="font-semibold">{activePatientDet.durationOfSymptoms}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Current Medications:</span>
                      <p className="font-semibold">{activePatientDet.currentMedications}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Surgeries history:</span>
                      <p className="font-semibold">{activePatientDet.previousSurgeries}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Associated conditions:</span>
                      <p className="font-semibold">{activePatientDet.relevantMedicalConditions}</p>
                    </div>
                  </div>
                </div>

                {activeAssessmentFile && (
                  <div className="bg-amber-50/50 p-4 rounded-xl space-y-3.5 border border-amber-200/50 text-xs">
                    <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Somatic Mapping Online Assessment
                    </h4>
                    
                    <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-amber-100">
                      <span className="font-semibold">Interactive Pain scale:</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-extrabold font-mono text-sm">
                        {activeAssessmentFile.painLevel} / 10
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-amber-900 leading-relaxed font-semibold">
                      <p>• Aggravating Activities: <span>{activeAssessmentFile.aggravatingActivities}</span></p>
                      <p>• Sleep Disturbances: <span className="font-extrabold">{activeAssessmentFile.sleepDisturbance}</span></p>
                      <p>• Occupational Strain: <span>{activeAssessmentFile.occupation}</span></p>
                      <p>• Daily Physical Burden: <span className="font-bold">{activeAssessmentFile.activityLevel}</span></p>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {activeAssessmentFile.selectedBodyParts.map((pt) => (
                        <span key={pt} className="bg-amber-100 text-amber-950 font-bold px-2 py-0.5 rounded text-[9px] tracking-wide border border-amber-300">
                          {pt}
                        </span>
                      ))}
                    </div>

                  </div>
                )}
              </div>

              {/* Right Column: Physical range / Compliance */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-slate-400" /> Prescribed Exercises Compliance tracker
                </h3>

                <div className="space-y-3.5">
                  {activePlanFile?.exercises.map((item) => (
                    <div key={item.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">{item.name}</span>
                        <div className="flex gap-3 text-[10px] text-slate-400 mt-1 font-semibold">
                          <span>{item.sets} Sets x {item.reps} Reps</span>
                          <span>{item.frequency}</span>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Logged count: {item.completedTodayCount} sets
                      </span>
                    </div>
                  ))}

                  {activePlanFile?.exercises.length === 0 && (
                    <span className="text-xs text-slate-400 italic">No exercises active. Use prescribe workspace to assign tasks.</span>
                  )}
                </div>

                {/* Progress upload inspection */}
                {activePatientProgress?.videoUploads && activePatientProgress.videoUploads.length > 0 && (
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-700">Patient shared video ranges:</h4>
                    {activePatientProgress.videoUploads.map((vid) => (
                      <div key={vid.id} className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold block truncate max-w-44">{vid.title}</span>
                          <span className="text-[10px] text-emerald-700 font-bold font-mono">Date uploaded: {vid.date}</span>
                        </div>
                        <button className="py-1 px-2.5 bg-emerald-600 text-white rounded text-[10px] font-bold flex items-center gap-1">
                          <Play className="w-3 h-3 fill-white" /> Inspect clip
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- APPOINTMENTS MANAGER TAB --- */}
        {activeTab === 'sched' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Clinical Bookings Scheduling Console</h2>
              <p className="text-xs text-slate-500 mt-1">Review schedules, update registration session completions, confirm payments, and admit participants.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-600">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-lg">Patient Name</th>
                    <th className="p-4">Session Format</th>
                    <th className="p-4">Reference Code</th>
                    <th className="p-4">Scheduled Slot</th>
                    <th className="p-4">State</th>
                    <th className="p-4 rounded-r-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((apt) => {
                    const isConfirmed = apt.status === 'confirmed';
                    const isCompleted = apt.status === 'completed';
                    
                    return (
                      <tr key={apt.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">{apt.patientName}</td>
                        <td className="p-4 font-semibold">{apt.type}</td>
                        <td className="p-4 font-mono text-slate-500 font-bold">{apt.bookingRef}</td>
                        <td className="p-4 font-medium">{apt.date} @ {apt.time}</td>
                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isConfirmed ? 'bg-blue-50 text-blue-700' :
                            isCompleted ? 'bg-emerald-50 text-emerald-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {apt.status === 'pending_payment' ? 'Pending checkout' : apt.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1">
                          {apt.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                                className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px]"
                              >
                                Complete Set
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'missed')}
                                className="py-1 px-2 bg-rose-50 text-rose-600 hover:bg-rose-150 rounded text-[10px] font-bold"
                              >
                                Missed
                              </button>
                            </>
                          )}
                          {isCompleted && (
                            <span className="text-emerald-600 font-extrabold text-[10px]">Session logged ✓</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PRESCRIBE GYM WORKOUT WORKSPACE --- */}
        {activeTab === 'prescribe' && activePatientDet && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Rehabilitation Program Builder</h2>
              <p className="text-xs text-slate-500 mt-1">Prescribe new customized physical movements directly into {activePatientDet.fullName}'s home library.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Builder Form */}
              <form onSubmit={handlePrescribeSubmit} className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Prescription Configurer</h3>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Workout Movement Name</label>
                  <select
                    value={newExName}
                    onChange={(e) => setNewExName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  >
                    {mockExerciseLibrary.map((lib, i) => (
                      <option key={i} value={lib.name}>{lib.name} ({lib.target})</option>
                    ))}
                    <option value="Dynamic Hamstring Stretch">Dynamic Hamstring Stretch (Lower Limb)</option>
                    <option value="Cervical rotation locks">Cervical rotation locks (Neck)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sets Count</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={newExSets}
                      onChange={(e) => setNewExSets(parseInt(e.target.value))}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Reps Count</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="30"
                      value={newExReps}
                      onChange={(e) => setNewExReps(parseInt(e.target.value))}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Hold Duration</label>
                    <input 
                      type="text" 
                      value={newExDur}
                      onChange={(e) => setNewExDur(e.target.value)}
                      placeholder="e.g. Hold 5s"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Clinical Frequency</label>
                    <input 
                      type="text" 
                      value={newExFreq}
                      onChange={(e) => setNewExFreq(e.target.value)}
                      placeholder="e.g. Twice Daily"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                {exPrescribeSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                    Workout successfully added and saved to {activePatientDet.fullName} exercise dashboard.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Prescribe movement as Active plan
                </button>
              </form>

              {/* Workout active preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-2">Live Prescription Summary:</h4>
                  <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2 text-xs">
                    <span className="font-bold text-slate-800">{newExName}</span>
                    <hr className="border-slate-100" />
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold">
                      <span>• Target Sets: <strong className="text-slate-800">{newExSets}</strong></span>
                      <span>• Target Reps: <strong className="text-slate-800">{newExReps}</strong></span>
                      <span>• Holds: <strong className="text-slate-800">{newExDur}</strong></span>
                      <span>• Frequency: <strong className="text-slate-800">{newExFreq}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic mt-6">
                  Note: Prescribing triggers automated pushed notifications straight onto patient dashboard files instantly.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- CLINICAL TELECONFERENCING TAB --- */}
        {activeTab === 'telehealth' && activePatientDet && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Telehealth Clinical Teleconferencing</h2>
                <p className="text-xs text-slate-500 mt-1">Conduct securely encrypted sessions with patients in wait room.</p>
              </div>

              <button
                onClick={() => setTelehealthMeetingActive(!telehealthMeetingActive)}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold shadow cursor-pointer transition-all ${
                  telehealthMeetingActive 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {telehealthMeetingActive ? 'End Call Session' : 'Admit Patient into Lobby'}
              </button>
            </div>

            {!telehealthMeetingActive ? (
              <div className="text-center py-10 max-w-sm mx-auto space-y-4">
                <Video className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">Patient Lobby check:</h3>
                
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-left space-y-2 text-xs text-emerald-950 font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Lobby Waiting:</span>
                    <span className="font-black text-rose-600">{activePatientDet.fullName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-normal">
                    <span>Access Verification:</span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-150">DES-PHY-859472</span>
                  </div>
                </div>

                <button
                  onClick={() => setTelehealthMeetingActive(true)}
                  className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  Admit Patient into Call Room
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-900 p-4 rounded-2xl text-white">
                  
                  {/* Streaming Display panel */}
                  <div className="lg:col-span-8 aspect-video bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#a7f3d0] flex items-center justify-center font-bold text-lg mx-auto animate-pulse">
                          JC
                        </div>
                        <span className="text-xs font-bold text-emerald-400 block">{activePatientDet.fullName}</span>
                        <span className="text-[10px] text-slate-500 font-mono italic">Transmitting Video Feed @ 120 FPS</span>
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold">
                      HD STREAM ACTIVE
                    </span>
                  </div>

                  {/* Consult intake logger panel */}
                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2 font-mono">Live Session Intakes</span>
                        <textarea
                          rows={4}
                          value={teleLiveNote}
                          onChange={(e) => setTeleLiveNote(e.target.value)}
                          placeholder="Type notes ... e.g. Left flex lag at 15 degrees, patellar flexion is smooth."
                          className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      {savedNoteSuccess && (
                        <p className="text-[10px] text-emerald-400 font-semibold">{savedNoteSuccess}</p>
                      )}

                      <button
                        type="button"
                        onClick={handleSaveTeleLiveNote}
                        className="w-full mt-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded"
                      >
                        Auto-Save Session Note
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

        {/* --- MESSAGING TAB --- */}
        {activeTab === 'messages' && activePatientDet && (
          <div className="space-y-6 flex flex-col h-full justify-between">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Secure Direct Message consult pipeline</h2>
              <p className="text-xs text-slate-500 mt-1">Consult with {activePatientDet.fullName}. Encrypted HIPAA standard pipeline.</p>
            </div>

            {/* Chats stream */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 pb-4">
              {chats.map((msg) => {
                const isTh = msg.senderRole === 'physiotherapist';
                return (
                  <div key={msg.id} className={`flex ${isTh ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md rounded-2xl p-4 text-xs space-y-1 shadow-sm border ${
                      isTh 
                        ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none' 
                        : 'bg-slate-50 text-slate-750 border-slate-150 rounded-tl-none'
                    }`}>
                      <div className="flex justify-between items-center gap-6">
                        <span className="font-extrabold text-[10.5px] uppercase tracking-wider">
                          {msg.senderName}
                        </span>
                        <span className={`text-[9px] font-mono ${isTh ? 'text-emerald-200' : 'text-slate-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <p className="leading-relaxed mt-1 font-medium">{msg.content}</p>

                      {msg.attachment && (
                        <div className={`mt-2.5 p-2 rounded-lg border flex items-center justify-between gap-4 text-[10px] ${
                          isTh ? 'bg-emerald-700/50 border-emerald-500/50' : 'bg-white border-slate-200'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span className="font-bold underline">{msg.attachment.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleTherapistSend} className="flex gap-2 pt-4 border-t border-slate-150 mt-auto">
              <input
                type="text"
                required
                value={therapistChatText}
                onChange={(e) => setTherapistChatText(e.target.value)}
                placeholder="Reply Advice or Adjust treatments in response to soreness complaints..."
                className="flex-1 text-xs p-3 border border-slate-200 rounded-xl outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-xs shadow"
              >
                Respond Advice
              </button>
            </form>
          </div>
        )}

        {/* --- CLINICAL REPORT WRITER --- */}
        {activeTab === 'reports' && activePatientDet && (
          <form onSubmit={handleCreateReport} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">Clinical Report Builder & Exporter</h2>
              <p className="text-xs text-slate-500 mt-1">Compile comprehensive clinical summaries and export them directly to PDF or Word files.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Report Configuration</h3>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select Report Scope</label>
                  <select 
                    value={reportType}
                    onChange={(e: any) => setReportType(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  >
                    <option>Assessment</option>
                    <option>Progress</option>
                    <option>Discharge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Clinical Narrative Summary</label>
                  <textarea
                    rows={4}
                    value={reportNarrative}
                    onChange={(e) => setReportNarrative(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Goals Fulfilled</label>
                  <input
                    type="text"
                    value={reportGoalMet}
                    onChange={(e) => setReportGoalMet(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>

                {reportSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                    Clinical report compiled successfully and saved to dossiers.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save clinical ledger file
                </button>
              </div>

              {/* Dynamic live report previewer card */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono select-none space-y-4">
                <div className="flex justify-between items-center text-[10px] text-slate-400 block border-b border-slate-200 pb-2">
                  <span>CLINICAL REPORT DRAFT</span>
                  <span>June 9, 2026</span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-700">
                  <p>• Patient: <strong>{activePatientDet.fullName}</strong></p>
                  <p>• Clinician: <strong>Dr. Alan Smith, PT</strong></p>
                  <p>• Scope Classification: <strong className="bg-[#a7f3d0] text-emerald-950 px-1.5 py-0.5 rounded text-[9.5px] tracking-wide">{reportType}</strong></p>
                  <hr className="border-slate-200" />
                  <p className="italic text-slate-500 leading-relaxed">"{reportNarrative}"</p>
                  <hr className="border-slate-200" />
                  <p className="text-[10px] font-bold uppercase text-slate-400">Goals Met Metrics:</p>
                  <span className="inline-block bg-white text-slate-800 p-1 rounded text-xs truncate max-w-xs block font-bold">• {reportGoalMet}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      alert("Simulating high-fidelity Assessment PDF download. All margins, headings, and encryption signatures verified.");
                    }}
                    className="flex-1 py-1.5 bg-white text-slate-850 hover:bg-slate-100 border border-slate-200 rounded text-[10.5px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> Export PDF
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      alert("Simulating Microsoft Word Docx download with embedded XML metadata properties.");
                    }}
                    className="flex-1 py-1.5 bg-white text-slate-850 hover:bg-slate-100 border border-slate-200 rounded text-[10.5px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> Export DOCX
                  </button>
                </div>
              </div>

            </div>

            {/* List historically logged clinical reports */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest font-mono">Dossier clinical reports file history:</h3>
              <div className="space-y-2.5">
                {reports.filter(r => r.patientId === selectedPatientId).map((rep) => (
                  <div key={rep.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <span className="font-extrabold text-xs text-slate-800">{rep.reportType} Clinical Report - {rep.date}</span>
                      <p className="text-[11px] text-slate-500 italic mt-1 leading-relaxed">"{rep.narrative}"</p>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-bold shrink-0">{rep.goalsMet[0]}</span>
                  </div>
                ))}
              </div>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
