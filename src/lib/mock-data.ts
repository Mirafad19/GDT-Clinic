// Centralized mock data for the prototype. Naira (₦), Nigerian context.

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

export const currentPatient = {
  id: "PT-2026-00125",
  accessCode: "DES-PHY-859472",
  name: "Adaeze Okafor",
  email: "adaeze.o@example.com",
  phone: "+234 803 555 1247",
  age: 34,
  gender: "Female",
  country: "Nigeria",
  state: "Lagos",
  mainComplaint: "Lower back pain following prolonged sitting",
  painLocation: "Lumbar spine, radiating to right hip",
  duration: "6 weeks",
  conditions: ["Sciatica (suspected)", "Mild scoliosis"],
  medications: ["Ibuprofen 400mg PRN"],
  surgeries: ["None"],
  emergencyContact: "Chidi Okafor – +234 802 919 0033",
};

export const physiotherapist = {
  name: "Dr. Tunde Bakare, MPT",
  specialty: "Musculoskeletal & Post-Surgical Rehab",
  clinic: "GDT Clinic – Lekki Phase 1",
  rating: 4.9,
  reviews: 312,
};

export const appointments = [
  { id: "APT-1041", date: "2026-06-12", time: "10:00", type: "Follow-Up Consultation", mode: "Telehealth", status: "Upcoming", patient: "Adaeze Okafor" },
  { id: "APT-1042", date: "2026-06-12", time: "11:30", type: "Initial Consultation", mode: "In-clinic", status: "Upcoming", patient: "Emeka Adebola" },
  { id: "APT-1043", date: "2026-06-12", time: "14:00", type: "Exercise Review", mode: "Telehealth", status: "Upcoming", patient: "Fatima Yusuf" },
  { id: "APT-1038", date: "2026-06-09", time: "09:00", type: "Post-Surgery Rehab", mode: "In-clinic", status: "Completed", patient: "Adaeze Okafor" },
  { id: "APT-1032", date: "2026-06-02", time: "16:00", type: "Initial Consultation", mode: "Telehealth", status: "Completed", patient: "Adaeze Okafor" },
];

export const treatmentPlan = {
  diagnosis: "Lumbar facet joint dysfunction with L4-L5 radicular irritation.",
  goals: [
    { label: "Pain reduction to ≤ 2/10", progress: 60 },
    { label: "Restore lumbar flexion ROM", progress: 45 },
    { label: "Core stabilisation endurance > 90s", progress: 30 },
    { label: "Return to full work without flare", progress: 25 },
  ],
  phase: "Phase 2 – Active rehabilitation",
  reviewDate: "2026-06-19",
};

export const exercises = [
  { name: "Neck retraction", sets: 3, reps: 10, frequency: "Twice daily", duration: "30s hold", region: "Cervical" },
  { name: "Cat-cow mobilisation", sets: 2, reps: 12, frequency: "Daily", duration: "—", region: "Lumbar" },
  { name: "Bird-dog hold", sets: 3, reps: 8, frequency: "Daily", duration: "10s each side", region: "Core" },
  { name: "Glute bridge", sets: 3, reps: 15, frequency: "Daily", duration: "—", region: "Hip" },
  { name: "Wall sit", sets: 3, reps: 1, frequency: "Daily", duration: "45s", region: "Knee" },
  { name: "Thoracic foam rolling", sets: 1, reps: 10, frequency: "Every other day", duration: "—", region: "Thoracic" },
];

export const painTrend = [
  { week: "W1", pain: 8, fn: 35 },
  { week: "W2", pain: 7, fn: 45 },
  { week: "W3", pain: 5, fn: 58 },
  { week: "W4", pain: 4, fn: 68 },
  { week: "W5", pain: 3, fn: 76 },
  { week: "W6", pain: 3, fn: 82 },
];

export const messages = [
  { from: "Dr. Tunde Bakare", time: "Today, 09:14", text: "Morning Adaeze – how did the bird-dog feel yesterday? Any flare overnight?", own: false },
  { from: "You", time: "Today, 09:31", text: "Morning Doc. Slept much better – pain was about 3/10 on waking.", own: true },
  { from: "Dr. Tunde Bakare", time: "Today, 09:33", text: "Excellent. Let's progress to 3×10 and add side-plank knee taps. I'll update the plan now.", own: false },
];

export const payments = [
  { id: "PAY-9821", date: "2026-06-02", desc: "Initial Consultation", amount: 25000, status: "Paid", method: "Card" },
  { id: "PAY-9847", date: "2026-06-09", desc: "Post-Surgery Rehab Session", amount: 18000, status: "Paid", method: "Bank Transfer" },
  { id: "PAY-9860", date: "2026-06-12", desc: "Follow-Up Consultation", amount: 15000, status: "Due", method: "—" },
];

export const physioPatients = [
  { id: "PT-2026-00125", name: "Adaeze Okafor", complaint: "Lower back pain", phase: "Active rehab", lastSeen: "2026-06-09", compliance: 86 },
  { id: "PT-2026-00118", name: "Emeka Adebola", complaint: "Rotator cuff tear", phase: "Initial", lastSeen: "2026-06-08", compliance: 70 },
  { id: "PT-2026-00109", name: "Fatima Yusuf", complaint: "Post-ACL reconstruction", phase: "Late rehab", lastSeen: "2026-06-05", compliance: 92 },
  { id: "PT-2026-00097", name: "Chinedu Eze", complaint: "Cervical radiculopathy", phase: "Active rehab", lastSeen: "2026-06-04", compliance: 64 },
  { id: "PT-2026-00091", name: "Zainab Ibrahim", complaint: "Plantar fasciitis", phase: "Discharge planning", lastSeen: "2026-05-30", compliance: 95 },
];

export const adminStats = {
  totalPatients: 1284,
  active: 412,
  newThisMonth: 87,
  totalBookings: 3210,
  completed: 2987,
  missed: 124,
  revenueMonth: 9_840_000,
  outstanding: 712_000,
  subscriptions: 38,
};

export const revenueSeries = [
  { month: "Jan", revenue: 6.2 },
  { month: "Feb", revenue: 6.8 },
  { month: "Mar", revenue: 7.4 },
  { month: "Apr", revenue: 8.1 },
  { month: "May", revenue: 9.0 },
  { month: "Jun", revenue: 9.84 },
];

export const bodyRegions = [
  "Neck", "Shoulder", "Elbow", "Wrist", "Upper limb", "Back", "Hip", "Knee", "Ankle", "Foot", "Lower limb", "Face",
];

export const appointmentTypes = [
  { id: "initial", label: "Initial Consultation", price: 25000, duration: "60 min" },
  { id: "followup", label: "Follow-Up Consultation", price: 15000, duration: "30 min" },
  { id: "exercise", label: "Exercise Review Session", price: 12000, duration: "30 min" },
  { id: "postop", label: "Post-Surgery Rehabilitation", price: 22000, duration: "45 min" },
];
