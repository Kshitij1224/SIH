import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Calendar, Clock, Users, AlertCircle, TrendingUp, MessageSquare, X, Mail, Phone, MapPin, Stethoscope, CheckCircle, FilePlus, FileText, History, FlaskConical, BarChart3, ClipboardList, Video, Mic, MicOff, CameraOff, PhoneOff, Upload, Search, ArrowLeft, Eye, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Doctor } from '../../../types/auth';

// Define types
type NotificationType = 'lab' | 'message' | 'appointment' | 'prescription' | 'reminder' | 'alert';

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  time: string;
  read?: boolean;
}

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick?: () => void;
}

interface Appointment {
  id: number;
  time: string;
  patient: string;
  type: string;
  status: 'attended' | 'unattended';
  patientDetails?: {
    age: number;
    gender: string;
    email: string;
    phone: string;
    address: string;
    medicalHistory: string;
    lastVisit: string;
  };
}

export function Dashboard() {
  const { user } = useAuth();
  const doctor = user?.role === 'doctor' ? user as Doctor : null;
  const [appointments, setAppointments] = useState<Appointment[]>([
    { 
      id: 1, 
      time: '09:00', 
      patient: 'John Smith', 
      type: 'Consultation', 
      status: 'attended',
      patientDetails: {
        age: 45,
        gender: 'Male',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        medicalHistory: 'Hypertension, Type 2 Diabetes',
        lastVisit: '2023-10-15'
      }
    },
    { 
      id: 2, 
      time: '10:30', 
      patient: 'Emily Davis', 
      type: 'Follow-up', 
      status: 'attended',
      patientDetails: {
        age: 32,
        gender: 'Female',
        email: 'emily.davis@example.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Ave, Brooklyn, NY 11201',
        medicalHistory: 'Asthma, Allergies',
        lastVisit: '2023-11-20'
      }
    },
    { 
      id: 3, 
      time: '11:15', 
      patient: 'Michael Brown', 
      type: 'Check-up', 
      status: 'unattended',
      patientDetails: {
        age: 28,
        gender: 'Male',
        email: 'michael.brown@example.com',
        phone: '+1 (555) 456-7890',
        address: '789 Pine St, Queens, NY 11375',
        medicalHistory: 'None',
        lastVisit: '2023-09-10'
      }
    },
    { 
      id: 4, 
      time: '14:00', 
      patient: 'Lisa Wilson', 
      type: 'Consultation', 
      status: 'attended',
      patientDetails: {
        age: 52,
        gender: 'Female',
        email: 'lisa.wilson@example.com',
        phone: '+1 (555) 234-5678',
        address: '321 Elm St, Bronx, NY 10451',
        medicalHistory: 'High Cholesterol, Osteoporosis',
        lastVisit: '2023-11-05'
      }
    },
    { 
      id: 5, 
      time: '15:30', 
      patient: 'David Miller', 
      type: 'Follow-up', 
      status: 'unattended',
      patientDetails: {
        age: 38,
        gender: 'Male',
        email: 'david.miller@example.com',
        phone: '+1 (555) 876-5432',
        address: '654 Maple Dr, Staten Island, NY 10301',
        medicalHistory: 'Migraine, Insomnia',
        lastVisit: '2023-10-28'
      }
    },
  ]);
  
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [showPatientsThisWeek, setShowPatientsThisWeek] = useState(false);
  const [showTodaysAppointments, setShowTodaysAppointments] = useState(false);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showReportsInsights, setShowReportsInsights] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Prescription State
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showRecentPrescriptions, setShowRecentPrescriptions] = useState(false);
  const [showPrescriptionHistory, setShowPrescriptionHistory] = useState(false);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState<any>(null);
  const [prescriptionHistoryFilter, setPrescriptionHistoryFilter] = useState('all'); // 'all', 'last30days', 'last6months', 'active', 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for prescription history
  const prescriptionHistory = [
    {
      id: 'PH001',
      patientId: 'P001',
      patientName: 'Emily Davis',
      date: '2024-09-19',
      diagnosis: 'Hypertension',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }
      ],
      doctor: 'Dr. Smith',
      status: 'Active',
      refills: 2,
      notes: 'Patient responding well to current medication. Blood pressure under control.'
    },
    {
      id: 'PH002',
      patientId: 'P002',
      patientName: 'John Smith',
      date: '2024-09-10',
      diagnosis: 'Type 2 Diabetes',
      medications: [
        { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', duration: '30 days' }
      ],
      doctor: 'Dr. Smith',
      status: 'Active',
      refills: 1,
      notes: 'Continue with current treatment. Monitor blood sugar levels regularly.'
    },
    {
      id: 'PH003',
      patientId: 'P001',
      patientName: 'Emily Davis',
      date: '2024-08-15',
      diagnosis: 'Hypertension',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
      ],
      doctor: 'Dr. Smith',
      status: 'Completed',
      refills: 0,
      notes: 'Initial prescription for hypertension. Schedule follow-up in 2 weeks.'
    },
    {
      id: 'PH004',
      patientId: 'P003',
      patientName: 'Sarah Wilson',
      date: '2024-07-22',
      diagnosis: 'Migraine',
      medications: [
        { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', duration: '10 tablets' },
        { name: 'Propranolol', dosage: '40mg', frequency: 'Once daily', duration: '30 days' }
      ],
      doctor: 'Dr. Smith',
      status: 'Active',
      refills: 1,
      notes: 'Patient reports reduced migraine frequency. Continue current treatment.'
    },
    {
      id: 'PH005',
      patientId: 'P002',
      patientName: 'John Smith',
      date: '2024-06-05',
      diagnosis: 'Type 2 Diabetes',
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' }
      ],
      doctor: 'Dr. Smith',
      status: 'Completed',
      refills: 0,
      notes: 'Initial prescription. Schedule follow-up in 1 month.'
    }
  ];

  // Filter prescription history based on selected filter and search query
  const filteredPrescriptionHistory = prescriptionHistory.filter(prescription => {
    // Apply status filter
    if (prescriptionHistoryFilter === 'active' && prescription.status !== 'Active') return false;
    if (prescriptionHistoryFilter === 'completed' && prescription.status !== 'Completed') return false;
    
    // Apply date filter
    const prescriptionDate = new Date(prescription.date);
    const today = new Date();
    
    if (prescriptionHistoryFilter === 'last30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      if (prescriptionDate < thirtyDaysAgo) return false;
    } else if (prescriptionHistoryFilter === 'last6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      if (prescriptionDate < sixMonthsAgo) return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        prescription.patientName.toLowerCase().includes(query) ||
        prescription.diagnosis.toLowerCase().includes(query) ||
        prescription.medications.some((med: any) => 
          med.name.toLowerCase().includes(query)
        )
      );
    }
    
    return true;
  });
  
  // Group prescriptions by patient
  const prescriptionsByPatient = filteredPrescriptionHistory.reduce((acc: any, prescription) => {
    if (!acc[prescription.patientId]) {
      acc[prescription.patientId] = {
        patientId: prescription.patientId,
        patientName: prescription.patientName,
        prescriptions: [],
        lastPrescriptionDate: ''
      };
    }
    acc[prescription.patientId].prescriptions.push(prescription);
    
    // Update last prescription date
    const lastDate = new Date(acc[prescription.patientId].lastPrescriptionDate || 0);
    const currentDate = new Date(prescription.date);
    if (currentDate > lastDate) {
      acc[prescription.patientId].lastPrescriptionDate = prescription.date;
    }
    
    return acc;
  }, {});
  
  // Convert to array and sort by last prescription date (newest first)
  const patientPrescriptions = Object.values(prescriptionsByPatient).sort((a: any, b: any) => 
    new Date(b.lastPrescriptionDate).getTime() - new Date(a.lastPrescriptionDate).getTime()
  );
  
  // Get patient's full prescription history
  const getPatientHistory = (patientId: string) => {
    return prescriptionHistory
      .filter((p: any) => p.patientId === patientId)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  // View patient's prescription history
  const viewPatientHistory = (patient: any) => {
    setSelectedPatientHistory({
      ...patient,
      fullHistory: getPatientHistory(patient.patientId)
    });
  };

  const [recentPrescriptions, setRecentPrescriptions] = useState([
    {
      id: 'RX001',
      patientName: 'Emily Davis',
      date: '2024-09-19',
      diagnosis: 'Hypertension',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }
      ]
    },
    {
      id: 'RX002',
      patientName: 'John Smith',
      date: '2024-09-18',
      diagnosis: 'Type 2 Diabetes',
      medications: [
        { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', duration: '30 days' }
      ]
    },
    {
      id: 'RX003',
      patientName: 'Sarah Wilson',
      date: '2024-09-17',
      diagnosis: 'Migraine',
      medications: [
        { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', duration: '10 tablets' },
        { name: 'Propranolol', dosage: '40mg', frequency: 'Once daily', duration: '30 days' }
      ]
    }
  ]);
  const [prescription, setPrescription] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    instructions: '',
    doctorName: 'Dr. Smith',
    doctorSpecialty: 'General Physician',
    doctorContact: 'clinic@example.com | (555) 123-4567',
    licenseNumber: 'MED123456'
  });

  const handleAddMedication = () => {
    setPrescription({
      ...prescription,
      medications: [...prescription.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setPrescription({ ...prescription, medications: updatedMedications });
  };

  const handleRemoveMedication = (index: number) => {
    if (prescription.medications.length > 1) {
      const updatedMedications = prescription.medications.filter((_, i) => i !== index);
      setPrescription({ ...prescription, medications: updatedMedications });
    }
  };

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new prescription
    const newPrescription = {
      id: `RX${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: prescription.patientName,
      date: new Date().toISOString().split('T')[0],
      diagnosis: prescription.diagnosis,
      medications: prescription.medications
    };
    
    // Add to recent prescriptions (at the beginning of the array)
    setRecentPrescriptions([newPrescription, ...recentPrescriptions].slice(0, 5));
    
    // Reset the form
    setPrescription({
      patientName: '',
      patientAge: '',
      patientGender: '',
      date: new Date().toISOString().split('T')[0],
      diagnosis: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      instructions: '',
      doctorName: 'Dr. Smith',
      doctorSpecialty: 'General Physician',
      doctorContact: 'clinic@example.com | (555) 123-4567',
      licenseNumber: 'MED123456'
    });
    
    // Close the modal
    setShowPrescriptionModal(false);
  };

  const handlePrintPrescription = () => {
    window.print();
  };

  // Patient Reports State
  const [showReport, setShowReport] = useState(false);
  const [showPatientList, setShowPatientList] = useState(false);
  const [reportData, setReportData] = useState<any>({
    patientName: '',
    reportId: '',
    date: '',
    diagnosis: '',
    treatmentPlan: [],
    vitals: {},
    notes: ''
  });
  
  // Mock patient data with medical info
  const patientList = [
    { 
      id: 'P001', 
      name: 'Emily Davis', 
      age: 42, 
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '(555) 123-4567',
      email: 'emily.d@example.com',
      lastVisit: '2023-10-15',
      conditions: ['Type 2 Diabetes', 'Hypertension'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg'],
      lastReport: {
        date: '2023-10-15',
        type: 'Blood Test',
        status: 'Completed',
        summary: 'Routine blood work shows good control of diabetes and hypertension.'
      }
    },
    { 
      id: 'P002', 
      name: 'John Smith', 
      age: 38, 
      gender: 'Male',
      bloodGroup: 'O-',
      phone: '(555) 987-6543',
      email: 'john.s@example.com',
      lastVisit: '2023-10-10',
      conditions: ['Asthma', 'Seasonal Allergies'],
      medications: ['Albuterol Inhaler', 'Cetirizine 10mg'],
      lastReport: {
        date: '2023-10-10',
        type: 'Check-up',
        status: 'Completed',
        summary: 'Asthma well-controlled. Advised to continue current treatment.'
      }
    },
    { 
      id: 'P003', 
      name: 'Sarah Wilson', 
      age: 29, 
      gender: 'Female',
      bloodGroup: 'B+',
      phone: '(555) 456-7890',
      email: 'sarah.w@example.com',
      lastVisit: '2023-09-28',
      conditions: ['Migraine'],
      medications: ['Sumatriptan 50mg'],
      lastReport: {
        date: '2023-09-28',
        type: 'Follow-up',
        status: 'Completed',
        summary: 'Migraine frequency reduced. Continue current medication.'
      }
    }
  ];
  
  const handlePatientClick = useCallback((patient: any) => {
    setShowReport(true);
    setShowPatientList(false);
    setReportData({
      ...patient,
      patientName: patient.name,
      reportId: `RPT-${patient.id}`,
      date: patient.lastVisit,
      diagnosis: patient.conditions?.[0] || 'No diagnosis',
      treatmentPlan: patient.medications || [],
      vitals: {
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        oxygen: '98%'
      },
      notes: patient.lastReport?.summary || 'No additional notes.'
    });
  }, []);
  
  const handleBackToList = () => {
    setShowReport(false);
    setShowPatientList(true);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate API call or report generation
    setTimeout(() => {
      const mockReportData = {
        patientName: 'John Doe',
        date: new Date().toLocaleDateString(),
        reportId: `RPT-${Math.floor(10000 + Math.random() * 90000)}`,
        diagnosis: 'Hypertension Stage 1',
        treatmentPlan: [
          'Lisinopril 10mg once daily',
          'Monitor blood pressure twice daily',
          'Low sodium diet',
          'Follow up in 2 weeks'
        ],
        vitals: {
          bloodPressure: '138/88',
          heartRate: '78 bpm',
          temperature: '98.6°F',
          weight: '175 lbs'
        },
        notes: 'Patient shows improvement. Continue current treatment and monitor blood pressure regularly.'
      };
      
      setReportData(mockReportData);
      setIsGeneratingReport(false);
      setShowReport(true);
    }, 2000); // 2 second delay to simulate processing
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you can add your file upload logic
      console.log('Uploading file:', selectedFile);
      // After successful upload, close the modal
      setShowUploadModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Emily Davis', content: 'Hello, I would like to reschedule my appointment', time: '2 hours ago', read: false },
    { id: 2, sender: 'John Smith', content: 'I have a question about my prescription', time: '4 hours ago', read: false },
    { id: 3, sender: 'Sarah Wilson', content: 'Thank you for the consultation', time: '1 day ago', read: true },
    { id: 4, sender: 'Michael Brown', content: 'Can I get a copy of my medical records?', time: '2 days ago', read: true },
  ]);

  const updateAppointmentStatus = (id: number, status: 'attended' | 'unattended') => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === id ? { ...appt, status } : appt
      )
    );
  };

  const notifications: Notification[] = [
    { 
      id: 1, 
      type: 'lab', 
      message: 'Lab results available for John Smith', 
      time: '2 hours ago', 
      read: false 
    },
    { 
      id: 2, 
      type: 'message', 
      message: 'New message from Emily Davis regarding her treatment', 
      time: '4 hours ago', 
      read: false 
    },
    { 
      id: 3, 
      type: 'appointment', 
      message: 'New appointment request from Robert Johnson', 
      time: '6 hours ago', 
      read: false 
    },
    { 
      id: 4, 
      type: 'lab', 
      message: 'Urgent: Abnormal test results for Sarah Wilson', 
      time: '1 day ago', 
      read: false 
    },
    { 
      id: 5, 
      type: 'reminder', 
      message: 'Follow-up appointment with Michael Brown tomorrow at 2:00 PM', 
      time: '1 day ago', 
      read: true 
    },
    { 
      id: 6, 
      type: 'prescription', 
      message: 'Prescription refill requested by David Miller', 
      time: '2 days ago', 
      read: true 
    },
    { 
      id: 7, 
      type: 'message', 
      message: 'Dr. Smith mentioned you in a patient discussion', 
      time: '3 days ago', 
      read: true 
    }
  ];

  // Toggle message read status
  const toggleMessageRead = useCallback((id: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === id ? { ...msg, read: !msg.read } : msg
      )
    );
  }, []);

  // Get pending requests
  const getPendingRequests = useCallback(() => {
    // In a real app, you would fetch pending requests from your API
    // For now, we'll return a filtered list of appointments with status 'unattended'
    return appointments.filter(appt => appt.status === 'unattended');
  }, [appointments]);

  // Video consultation state
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [videoSeconds, setVideoSeconds] = useState(0);
  const [videoMuted, setVideoMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [selectedVideoPatient, setSelectedVideoPatient] = useState<string | null>(null);

  useEffect(() => {
    if (!showVideoCall) return;
    const id = setInterval(() => setVideoSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [showVideoCall]);





  // Get appointments for today
  const getTodaysAppointments = useCallback(() => {
    const today = new Date().toLocaleDateString();
    // Filter appointments for today
    return appointments.filter(appt => {
      // Convert appointment date to the same format as 'today' for comparison
      const appointmentDate = new Date(appt.time).toLocaleDateString();
      return appointmentDate === today;
    });
  }, [appointments]);

  // Get unique patients for this week
  const getPatientsThisWeek = useCallback(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
    
    // In a real app, you would filter appointments by date range
    // For now, we'll just return all unique patients
    const uniquePatients = new Set<string>();
    appointments.forEach(appt => {
      uniquePatients.add(appt.patient);
    });
    return Array.from(uniquePatients);
  }, [appointments]);

  const stats: StatItem[] = [
    { 
      label: 'Patients This Week', 
      value: getPatientsThisWeek().length.toString(), 
      change: '+12%', 
      icon: Users, 
      color: 'blue',
      onClick: () => setShowPatientsThisWeek(true)
    },
    { 
      label: 'Appointments Today', 
      value: getTodaysAppointments().length.toString(), 
      change: '+2', 
      icon: Calendar, 
      color: 'green',
      onClick: () => setShowTodaysAppointments(true)
    },
    { 
      label: 'Pending Requests', 
      value: getPendingRequests().length.toString(), 
      change: '-1', 
      icon: Clock, 
      color: 'orange',
      onClick: () => setShowPendingRequests(true)
    },
    { 
      label: 'Messages', 
      value: messages.filter(m => !m.read).length.toString(), 
      change: '+8', 
      icon: MessageSquare, 
      color: 'purple',
      onClick: () => setShowMessages(true)
    },
  ];

  const handleAppointmentClick = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  }, []);

  // Add Patient modal state
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    condition: ''
  });


  return (
    <div className="space-y-6 relative">
      {/* Patient Details Modal */}
      {isModalOpen && selectedAppointment?.patientDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedAppointment.patient}
                    <span className="ml-3 text-sm font-normal text-gray-500">
                      {selectedAppointment.patientDetails.age} yrs • {selectedAppointment.patientDetails.gender}
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedAppointment.type} • {selectedAppointment.time}
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                  title="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedAppointment.patientDetails.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedAppointment.patientDetails.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-gray-900">{selectedAppointment.patientDetails.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Stethoscope className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Medical History</p>
                      <p className="text-gray-900">
                        {selectedAppointment.patientDetails.medicalHistory || 'No significant medical history'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Visit</p>
                      <p className="text-gray-900">
                        {new Date(selectedAppointment.patientDetails.lastVisit).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedAppointment) {
                        const updatedAppointment = { ...selectedAppointment, status: 'attended' as const };
                        setSelectedAppointment(updatedAppointment);
                        updateAppointmentStatus(selectedAppointment.id, 'attended');
                      }
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedAppointment?.status === 'attended'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Mark as Attended
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedAppointment) {
                        const updatedAppointment = { ...selectedAppointment, status: 'unattended' as const };
                        setSelectedAppointment(updatedAppointment);
                        updateAppointmentStatus(selectedAppointment.id, 'unattended');
                      }
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedAppointment?.status === 'unattended'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Mark as Unattended
                  </button>
                </div>
                <div className="flex space-x-3">
                  <a
                    href={`tel:${selectedAppointment.patientDetails.phone}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Patient
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Insights Modal */}
      {showReportsInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Weekly Treatment Report</h2>
                  <p className="text-sm text-gray-500 mt-1">Daily treatments overview for the current week</p>
                </div>
                <button 
                  onClick={() => setShowReportsInsights(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Weekly Overview Chart */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Daily Treatments</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-400 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-500">Treatments</span>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="h-64 mt-6">
                  <div className="flex items-end h-full space-x-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      // Sample data - in a real app, this would come from your backend
                      const treatments = [12, 8, 10, 15, 18, 5, 9];
                      const maxHeight = Math.max(...treatments, 1);
                      const height = (treatments[index] / maxHeight) * 100;
                      
                      return (
                        <div key={day} className="flex-1 flex flex-col items-center h-full">
                          <div className="w-full flex justify-center items-end h-full">
                            <div 
                              className="w-8 md:w-10 rounded-t-md bg-gradient-to-b from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition-all duration-300"
                              style={{ height: `${height}%` }}
                              title={`${treatments[index]} treatments on ${day}`}
                            >
                              <div className="absolute -mt-6 text-xs font-medium text-gray-700">
                                {treatments[index]}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs font-medium text-gray-500">{day}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Treatment Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <ClipboardList className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Total Treatments</p>
                      <p className="text-2xl font-semibold text-gray-900">77</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-md">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Unique Patients</p>
                      <p className="text-2xl font-semibold text-gray-900">42</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-md">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Weekly Growth</p>
                      <p className="text-2xl font-semibold text-gray-900">+12%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Treatments */}
              <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Common Treatments This Week</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Routine Checkup', count: 15, color: 'bg-blue-100 text-blue-800' },
                    { name: 'Vaccination', count: 12, color: 'bg-green-100 text-green-800' },
                    { name: 'Blood Test', count: 10, color: 'bg-yellow-100 text-yellow-800' },
                    { name: 'X-Ray', count: 8, color: 'bg-purple-100 text-purple-800' },
                    { name: 'Consultation', count: 32, color: 'bg-pink-100 text-pink-800' },
                  ].map((treatment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{treatment.name}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${treatment.color.replace('text-', 'bg-').replace('-800', '-500')}`}
                            style={{ width: `${(treatment.count / 32) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{treatment.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowReportsInsights(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Patient</h2>
              <button 
                onClick={() => setShowAddPatientModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.phone) {
                  alert('Please fill Name, Age, Gender and Phone');
                  return;
                }
                const queueKey = 'new_patients_queue';
                const existing = JSON.parse(localStorage.getItem(queueKey) || '[]');
                existing.unshift({
                  ...newPatient,
                  age: parseInt(newPatient.age as unknown as string, 10) || 0,
                  createdAt: new Date().toISOString()
                });
                localStorage.setItem(queueKey, JSON.stringify(existing));
                setShowAddPatientModal(false);
                setNewPatient({ name: '', age: '', gender: '', phone: '', email: '', address: '', condition: '' });
                alert('Patient added. It will appear in Patients once synced.');
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rohan Verma"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="patient@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="House / Street, City, State, PIN"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical Condition</label>
                  <input
                    type="text"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Hypertension"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Good morning, {doctor?.name || 'Doctor'}</h2>
            <p className="text-gray-500">Here's what's happening with your practice today.</p>
            
            {/* Doctor's Information */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">{doctor?.name || 'Doctor Name'}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doctor?.specialization || 'Specialization'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{doctor?.hospital || 'Hospital'}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{doctor?.email || 'email@example.com'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{doctor?.phone || '+1 (555) 000-0000'}</span>
                    </div>
                  </div>
                  {doctor?.address && (
                    <div className="mt-2 flex items-start text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span>{doctor.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={stat.label} 
              onClick={stat.onClick}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {stat.change} from yesterday
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Panels - Prescription, Report Analysis, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prescription */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Prescription</h2>
          </div>
          <div className="p-6 space-y-4">
            <a 
              href="https://prescriptiongeneratorsih.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FilePlus className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Create New Prescription</div>
                <div className="text-xs text-gray-500">Generate prescriptions for patients</div>
              </div>
            </a>
            <button 
              onClick={() => setShowRecentPrescriptions(true)}
              className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-gray-100 text-gray-600 mr-3">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Recent Prescriptions</div>
                <div className="text-xs text-gray-500">View and manage past prescriptions</div>
              </div>
            </button>
            <button 
              onClick={() => setShowPrescriptionHistory(true)}
              className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-pink-100 text-pink-600 mr-3">
                <History className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Prescription History</div>
                <div className="text-xs text-gray-500">Track all prescribed medications</div>
              </div>
            </button>
          </div>
        </div>

        {/* Report Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Report Analysis</h2>
          </div>
          <div className="p-6 space-y-4">
            <a 
              href="https://aesthetic-melba-d63008.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600 mr-3">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Analyze Lab Results</div>
                <div className="text-xs text-gray-500">Upload and analyze lab reports</div>
              </div>
            </a>
            
            {!showReport ? (
              <button 
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className={`w-full flex items-center p-4 rounded-lg border ${isGeneratingReport ? 'bg-gray-50' : 'hover:bg-gray-50'} transition-colors text-left`}
              >
                <div className={`p-2 rounded-lg ${isGeneratingReport ? 'bg-gray-200' : 'bg-blue-100'} text-blue-600 mr-3`}>
                  {isGeneratingReport ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  ) : (
                    <BarChart3 className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {isGeneratingReport ? 'Generating Report...' : 'Generate Reports'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isGeneratingReport ? 'Please wait while we generate your report' : 'Create detailed medical reports'}
                  </div>
                </div>
              </button>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Medical Report</h3>
                  <button 
                    onClick={() => setShowReport(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Patient Name</p>
                      <p className="text-sm font-medium">{reportData?.patientName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Report ID</p>
                      <p className="text-sm font-mono">{reportData?.reportId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm">{reportData?.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Diagnosis</p>
                      <p className="text-sm font-medium text-blue-600">{reportData?.diagnosis}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Treatment Plan</h4>
                    <ul className="space-y-2">
                      {reportData?.treatmentPlan.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <span className="ml-2 text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Vital Signs</h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg">
                      {Object.entries(reportData?.vitals || {}).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="text-sm font-medium">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                      {reportData?.notes}
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                      Print
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {!showPatientList && !showReport ? (
              <button 
                onClick={() => setShowPatientList(true)}
                className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-green-100 text-green-600 mr-3">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Patient Reports</div>
                  <div className="text-xs text-gray-500">Access all patient medical reports</div>
                </div>
              </button>
            ) : showPatientList ? (
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Patient List</h3>
                  <button 
                    onClick={() => setShowPatientList(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {patientList.map((patient) => (
                    <div 
                      key={patient.id}
                      onClick={() => handlePatientClick(patient)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.gender}, {patient.age} years</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Last visit</p>
                          <p className="text-xs font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : showReport && reportData ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                {/* Header */}
                <div className="bg-blue-600 text-white p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{reportData.name}</h3>
                      <p className="text-sm text-blue-100">
                        {reportData.age} years • {reportData.gender} • {reportData.bloodGroup}
                      </p>
                    </div>
                    <button 
                      onClick={handleBackToList}
                      className="text-blue-100 hover:text-white"
                      title="Back to list"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="p-4 space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p>{reportData.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="truncate">{reportData.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Medical Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Medical Information</h4>
                    <div className="space-y-3">
                      <div>
                            <p className="text-xs text-gray-500">Conditions</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {reportData.conditions.map((condition: string, index: number) => (
                                <span key={index} className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-full">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Medications</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {reportData.medications.map((med: string, index: number) => (
                                <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </div>
                    </div>
                  </div>

                  {/* Last Report Summary */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Last Visit Summary</h4>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">{reportData.lastReport.type}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(reportData.lastReport.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{reportData.lastReport.summary}</p>
                      <div className="mt-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          reportData.lastReport.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reportData.lastReport.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2">
                    <button 
                      onClick={handleBackToList}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Back to Patient List
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Upload Lab Report</h3>
                  <button 
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-4">
                  {!previewUrl ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Upload className="w-10 h-10 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <label className="relative cursor-pointer">
                            <span className="text-indigo-600 font-medium hover:text-indigo-500">
                              Click to upload
                            </span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                            />
                          </label>
                          <span className="mx-2">or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {selectedFile?.name}
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {selectedFile?.type.startsWith('image/') && (
                        <div className="mt-2">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="h-40 w-full object-contain border rounded"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      selectedFile 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-indigo-300 cursor-not-allowed'
                    }`}
                  >
                    Upload & Analyze
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => setShowAllAppointments(true)}
                title="View full schedule"
              >
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Schedule</div>
              </button>
              <button
                className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => setShowAddPatientModal(true)}
                title="Add a new patient"
              >
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Add Patient</div>
              </button>
              <button
                className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => setShowMessages(true)}
                title="View messages received"
              >
                <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Messages</div>
              </button>
              <button
                className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => setShowReportsInsights(true)}
                title="View weekly report insights"
              >
                <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Reports</div>
              </button>
            </div>
            <button
              className="w-full p-4 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => { setShowVideoPicker(true); }}
              title="Start a video consultation"
            >
              <Video className="w-5 h-5 text-rose-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Start Video Consultation</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
              <button 
                onClick={() => setShowAllAppointments(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  onClick={() => handleAppointmentClick(appointment)}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{appointment.patient}</div>
                    <div className="text-sm text-gray-500">{appointment.type}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {appointment.time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'attended' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                    <button 
                      className="text-blue-600 hover:text-blue-700"
                      aria-label="View appointment details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications & Updates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {notifications.slice(0, 6).map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'lab' ? 'bg-blue-100' :
                          notification.type === 'message' ? 'bg-green-100' :
                          notification.type === 'appointment' ? 'bg-purple-100' :
                          notification.type === 'prescription' ? 'bg-amber-100' :
                          'bg-indigo-100'
                        }`}>
                          {notification.type === 'lab' && <FlaskConical className="w-5 h-5 text-blue-600" />}
                          {notification.type === 'message' && <MessageSquare className="w-5 h-5 text-green-600" />}
                          {notification.type === 'appointment' && <Calendar className="w-5 h-5 text-purple-600" />}
                          {notification.type === 'prescription' && <FileText className="w-5 h-5 text-amber-600" />}
                          {notification.type === 'reminder' && <Clock className="w-5 h-5 text-indigo-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
              ))}
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setShowAllNotifications(true)}
                className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Today's Appointments */}
        <div className="lg:col-span-2">
          {/* Today's Appointments content */}
        </div>
      </div>

      {/* All Notifications Modal */}
      {showAllNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Notifications</h2>
                <button 
                  onClick={() => setShowAllNotifications(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.read 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-blue-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        {notification.type === 'lab' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                        {notification.type === 'message' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                        {notification.type === 'appointment' && <Calendar className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Appointments Modal */}
      {showAllAppointments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Appointments</h2>
                <button 
                  onClick={() => setShowAllAppointments(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className={`p-4 rounded-lg border ${
                      appointment.status === 'attended' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setIsModalOpen(true);
                      setShowAllAppointments(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {appointment.patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.time} • {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'attended' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'attended' ? 'Attended' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAllAppointments(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patients This Week Modal */}
      {showPatientsThisWeek && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Patients This Week</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
                    {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button 
                  onClick={() => setShowPatientsThisWeek(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        {getPatientsThisWeek().length} patient{getPatientsThisWeek().length !== 1 ? 's' : ''} this week
                      </h3>
                      <div className="mt-1 text-sm text-blue-700">
                        <p>{appointments.filter(a => a.status === 'attended').length} appointments completed • {appointments.filter(a => a.status === 'unattended').length} upcoming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {getPatientsThisWeek().length > 0 ? (
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Visit
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Appointments
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getPatientsThisWeek().map((patient, index) => {
                          const patientAppointments = appointments.filter(a => a.patient === patient);
                          const lastAppointment = patientAppointments[0]; // Assuming they're sorted by date
                          return (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{patient}</div>
                                    <div className="text-sm text-gray-500">{lastAppointment?.patientDetails?.gender || 'N/A'}, {lastAppointment?.patientDetails?.age || 'N/A'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {lastAppointment?.time || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {lastAppointment?.type || 'N/A'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{patientAppointments.length}</div>
                                <div className="text-sm text-gray-500">
                                  {patientAppointments.filter(a => a.status === 'attended').length} completed
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  lastAppointment?.status === 'attended' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {lastAppointment?.status === 'attended' ? 'Completed' : 'Upcoming'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => {
                                    // You can implement view details functionality here
                                    console.log('View details for', patient);
                                  }}
                                  className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No patients scheduled this week</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no patients scheduled for this week.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {getPatientsThisWeek().length} of {getPatientsThisWeek().length} patients
                </div>
                <button
                  onClick={() => setShowPatientsThisWeek(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Appointments Modal */}
      {showTodaysAppointments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Today's Appointments</h2>
                <button 
                  onClick={() => setShowTodaysAppointments(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {getTodaysAppointments().length > 0 ? (
                  getTodaysAppointments().map((appointment) => (
                    <div 
                      key={appointment.id}
                      className={`p-4 rounded-lg border ${
                        appointment.status === 'attended' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsModalOpen(true);
                        setShowTodaysAppointments(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {appointment.patient}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.time} • {appointment.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            appointment.status === 'attended' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status === 'attended' ? 'Attended' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments today</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no appointments scheduled for today.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowTodaysAppointments(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Requests Modal */}
      {showPendingRequests && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Pending Requests</h2>
                <button 
                  onClick={() => setShowPendingRequests(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {getPendingRequests().length > 0 ? (
                  getPendingRequests().map((request) => (
                    <div 
                      key={request.id}
                      className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSelectedAppointment(request);
                        setIsModalOpen(true);
                        setShowPendingRequests(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {request.patient}
                            </p>
                            <p className="text-sm text-gray-500">
                              {request.time} • {request.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateAppointmentStatus(request.id, 'attended');
                            }}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Mark as Attended
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
                    <p className="mt-1 text-sm text-gray-500">All requests have been processed.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPendingRequests(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Modal */}
      {showMessages && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {messages.filter(m => !m.read).length} unread
                  </span>
                  <button 
                    onClick={() => setShowMessages(false)}
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`p-4 rounded-lg border ${
                        message.read 
                          ? 'bg-white border-gray-200' 
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <MessageSquare className={`h-5 w-5 ${
                                message.read ? 'text-gray-400' : 'text-blue-600'
                              }`} />
                            </div>
                            <p className="ml-3 text-sm font-medium text-gray-900 truncate">
                              {message.sender}
                            </p>
                            <span className="ml-2 text-xs text-gray-500">
                              {message.time}
                            </span>
                            {!message.read && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                          <p className={`mt-1 text-sm ${
                            message.read ? 'text-gray-500' : 'text-gray-700 font-medium'
                          }`}>
                            {message.content}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            onClick={() => toggleMessageRead(message.id)}
                            className={`text-xs font-medium ${
                              message.read 
                                ? 'text-blue-600 hover:text-blue-800' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {message.read ? 'Mark as unread' : 'Mark as read'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any messages yet.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => {
                    setMessages(prevMessages =>
                      prevMessages.map(msg => ({
                        ...msg,
                        read: true
                      }))
                    );
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => setShowMessages(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Video Patient Picker */}
      {showVideoPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">Select a patient to start video call</div>
              <button
                onClick={() => setShowVideoPicker(false)}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label="Close patient picker"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                {Array.from(new Set(appointments.map(a => a.patient))).map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVideoPatient(name);
                      setShowVideoPicker(false);
                      setVideoSeconds(0);
                      setVideoMuted(false);
                      setCameraOn(true);
                      setShowVideoCall(true);
                    }}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                        {name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                        <div className="text-xs text-gray-500">Tap to start video call</div>
                      </div>
                    </div>
                    <Video className="w-4 h-4 text-rose-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Video Call Modal */}
      {showVideoCall && selectedVideoPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-700">
                <Video className="w-5 h-5" />
                <span className="text-sm font-medium">Video call with {selectedVideoPatient}</span>
              </div>
              <span className="text-xs text-gray-700">
                {`${String(Math.floor(videoSeconds/60)).padStart(2,'0')}:${String(videoSeconds%60).padStart(2,'0')}`}
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-900">
              <div className="md:col-span-9 h-64 md:h-96 bg-black rounded-lg flex items-center justify-center">
                {cameraOn ? (
                  <div className="text-gray-300 text-sm">Remote video stream</div>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <CameraOff className="w-10 h-10 mb-2" />
                    <span>Camera is off</span>
                  </div>
                )}
              </div>
              <div className="md:col-span-3 space-y-4">
                <div className="h-32 bg-black rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-xs">You</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-sm">
                  <div className="font-medium text-gray-900 truncate">{selectedVideoPatient}</div>
                  <div className="text-gray-500">Video consultation</div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setVideoMuted(m => !m)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm border ${videoMuted ? 'bg-red-50 text-red-700 border-red-300' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                  aria-pressed={videoMuted}
                  aria-label="Toggle mute"
                >
                  {videoMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{videoMuted ? 'Muted' : 'Mute'}</span>
                </button>
                <button
                  onClick={() => setCameraOn(c => !c)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm border ${!cameraOn ? 'bg-yellow-50 text-yellow-700 border-yellow-300' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                  aria-pressed={!cameraOn}
                  aria-label="Toggle camera"
                >
                  <CameraOff className="w-5 h-5" />
                  <span>{cameraOn ? 'Camera On' : 'Camera Off'}</span>
                </button>
              </div>
              <button
                onClick={() => { setShowVideoCall(false); setSelectedVideoPatient(null); setVideoSeconds(0); setVideoMuted(false); setCameraOn(true); }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                aria-label="End video call"
              >
                <PhoneOff className="w-5 h-5" />
                <span>End</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Prescription</h3>
                <button 
                  onClick={() => setShowPrescriptionModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handlePrescriptionSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={prescription.patientName}
                      onChange={(e) => setPrescription({...prescription, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={prescription.patientAge}
                      onChange={(e) => setPrescription({...prescription, patientAge: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={prescription.patientGender}
                      onChange={(e) => setPrescription({...prescription, patientGender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                    <input
                      type="text"
                      value={prescription.diagnosis}
                      onChange={(e) => setPrescription({...prescription, diagnosis: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Hypertension, Type 2 Diabetes"
                      required
                    />
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-900">Medications</h4>
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Medication
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {prescription.medications.map((med: any, index: number) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                        <div className="md:col-span-4">
                          <input
                            type="text"
                            placeholder="Medication Name"
                            value={med.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Dosage (e.g., 500mg)"
                            value={med.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Frequency (e.g., BD, TDS)"
                            value={med.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Duration (e.g., 7 days)"
                            value={med.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                          {prescription.medications.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMedication(index)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove medication"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions</label>
                  <textarea
                    value={prescription.instructions}
                    onChange={(e) => setPrescription({...prescription, instructions: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special instructions or notes..."
                  />
                </div>

                {/* Doctor's Information (Read-only) */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Prescribing Doctor</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Doctor's Name</p>
                      <p className="font-medium">{prescription.doctorName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Specialty</p>
                      <p>{prescription.doctorSpecialty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p>{prescription.doctorContact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">License Number</p>
                      <p>{prescription.licenseNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPrescriptionModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintPrescription}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50"
                  >
                    Print
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                  >
                    Save Prescription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Recent Prescriptions Modal */}
      {showRecentPrescriptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Prescriptions</h3>
                <button 
                  onClick={() => setShowRecentPrescriptions(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentPrescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No recent prescriptions</h3>
                    <p className="mt-1 text-sm text-gray-500">Create a new prescription to see it here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentPrescriptions.map((rx) => (
                      <div key={rx.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{rx.patientName}</p>
                            <p className="text-xs text-gray-500 mt-1">{rx.diagnosis}</p>
                            <div className="mt-2 space-y-1">
                              {rx.medications.map((med, idx) => (
                                <div key={idx} className="text-sm text-gray-700 flex items-start">
                                  <span className="text-gray-500 mr-2">•</span>
                                  <span>
                                    <span className="font-medium">{med.name} {med.dosage}</span>
                                    <span className="text-gray-500 ml-2">- {med.frequency} for {med.duration}</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                            {new Date(rx.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                          <button 
                            className="text-sm text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              // Here you could implement a view/edit functionality
                              console.log('View/Edit prescription:', rx.id);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription History Modal */}
      {showPrescriptionHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Prescription History</h3>
                <p className="text-sm text-gray-500 mt-1">View and manage all patient prescriptions</p>
              </div>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients or medications..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  value={prescriptionHistoryFilter}
                  onChange={(e) => setPrescriptionHistoryFilter(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last6months">Last 6 Months</option>
                  <option value="active">Active Only</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => setShowPrescriptionHistory(false)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {selectedPatientHistory ? (
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setSelectedPatientHistory(null)}
                      className="mr-4 p-1 rounded-full hover:bg-gray-100"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </button>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{selectedPatientHistory.patientName}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedPatientHistory.prescriptions.length} prescriptions
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedPatientHistory.fullHistory.map((prescription: any) => (
                      <div key={prescription.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              prescription.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {prescription.status}
                            </span>
                            <span className="ml-3 text-sm text-gray-500">
                              {new Date(prescription.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              onClick={() => {
                                // Handle print prescription
                                console.log('Print prescription:', prescription.id);
                              }}
                            >
                              Print
                            </button>
                            <button 
                              className="text-gray-600 hover:text-gray-800"
                              onClick={() => {
                                // Handle view details
                                console.log('View details:', prescription.id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            {prescription.diagnosis}
                          </h4>
                          <div className="space-y-2">
                            {prescription.medications.map((med: any, idx: number) => (
                              <div key={idx} className="flex items-start">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {med.name} {med.dosage}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {med.frequency} for {med.duration}
                                  </p>
                                </div>
                                {prescription.status === 'Active' && prescription.refills > 0 && (
                                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {prescription.refills} refill{prescription.refills > 1 ? 's' : ''} left
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          {prescription.notes && (
                            <div className="mt-3 p-3 bg-yellow-50 text-sm text-yellow-700 rounded-md">
                              <p className="font-medium">Doctor's Notes:</p>
                              <p>{prescription.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patientPrescriptions.length > 0 ? (
                      patientPrescriptions.map((patient: any) => (
                        <div 
                          key={patient.patientId}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer"
                          onClick={() => viewPatientHistory(patient)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{patient.patientName}</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {patient.prescriptions.length} prescription{patient.prescriptions.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400">
                              Last: {new Date(patient.lastPrescriptionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-1">
                              {Array.from(new Set(
                                patient.prescriptions.flatMap((p: any) => 
                                  p.medications.map((m: any) => m.name)
                                )
                              )).slice(0, 3).map((med: any, idx: number) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                                  {med}
                                </span>
                              ))}
                              {Array.from(new Set(
                                patient.prescriptions.flatMap((p: any) => 
                                  p.medications.map((m: any) => m.name)
                                )
                              )).length > 3 && (
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                                  +{Array.from(new Set(
                                    patient.prescriptions.flatMap((p: any) => 
                                      p.medications.map((m: any) => m.name)
                                    )
                                  )).length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 py-12 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchQuery || prescriptionHistoryFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Create a new prescription to get started.'}
                        </p>
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setPrescriptionHistoryFilter('all');
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Clear filters
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {patientPrescriptions.length} {patientPrescriptions.length === 1 ? 'patient' : 'patients'}
              </p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    setSearchQuery('');
                    setPrescriptionHistoryFilter('all');
                  }}
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    setShowPrescriptionHistory(false);
                    setShowPrescriptionModal(true);
                  }}
                >
                  <Plus className="-ml-1 mr-2 h-4 w-4" />
                  New Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

