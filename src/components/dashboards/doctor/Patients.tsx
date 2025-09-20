import { useState, useEffect, useMemo } from 'react';
import type React from 'react';
import { Search, Filter, Plus, Users, FileText, Phone, PhoneCall, PhoneOff, Mic, MicOff, Volume2, VolumeX, Mail, MapPin, X, User, Calendar, Send, Paperclip, MailCheck } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  condition: string;
  status: string;
  avatar: string;
}

export function Patients() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id' | 'avatar' | 'lastVisit'>>({ 
    name: '',
    age: 0,
    gender: '',
    phone: '',
    email: '',
    address: '',
    condition: '',
    status: 'Active'
  });

  // Add Medical Record modal state (moved inside component)
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Consultation',
    visitReason: '',
    systolic: '',
    diastolic: '',
    pulse: '',
    temperature: '',
    spo2: '',
    weightKg: '',
    heightCm: '',
    diagnosis: '',
    prescription: '',
    notes: '',
    followUpDate: '',
    advice: ''
  });

  const handleNewRecordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  // Call popup state
  const [showCall, setShowCall] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // Appointment dates modal state
  const [showAppointmentDates, setShowAppointmentDates] = useState(false);

  // Mail compose state
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  // Toast notification state (for email sent)
  const [toast, setToast] = useState<{ visible: boolean; message: string }>(
    { visible: false, message: '' }
  );
  const triggerToast = (message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  useEffect(() => {
    if (!showCall) return;
    const id = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [showCall]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'Arjun Sharma',
      age: 45,
      gender: 'Male',
      phone: '+91 98765 43210',
      email: 'arjun.sharma@example.in',
      address: 'A-102, Andheri West, Mumbai, Maharashtra 400053',
      lastVisit: '2024-01-10',
      condition: 'Hypertension',
      status: 'Active',
      avatar: 'AS'
    },
    {
      id: 2,
      name: 'Priya Verma',
      age: 32,
      gender: 'Female',
      phone: '+91 98670 12345',
      email: 'priya.verma@example.in',
      address: 'Sector 18, Noida, Uttar Pradesh 201301',
      lastVisit: '2024-01-08',
      condition: 'Type 2 Diabetes',
      status: 'Active',
      avatar: 'PV'
    },
    {
      id: 3,
      name: 'Rohan Mehta',
      age: 58,
      gender: 'Male',
      phone: '+91 98200 45678',
      email: 'rohan.mehta@example.in',
      address: 'Indiranagar, Bengaluru, Karnataka 560038',
      lastVisit: '2024-01-05',
      condition: 'Heart Disease',
      status: 'Active',
      avatar: 'RM'
    },
    {
      id: 4,
      name: 'Aisha Khan',
      age: 29,
      gender: 'Female',
      phone: '+91 98111 22334',
      email: 'aisha.khan@example.in',
      address: 'Salt Lake, Kolkata, West Bengal 700064',
      lastVisit: '2023-12-28',
      condition: 'Anxiety',
      status: 'Inactive',
      avatar: 'AK'
    },
  ]);

  const [medicalHistory, setMedicalHistory] = useState<Array<{
    date: string;
    type: string;
    diagnosis: string;
    prescription: string;
    notes: string;
    visitReason?: string;
    vitals?: {
      bp?: string;
      pulse?: string;
      temperature?: string;
      spo2?: string;
      weightKg?: string;
      heightCm?: string;
      bmi?: string;
    };
    followUpDate?: string;
    advice?: string;
  }>>([
    {
      date: '2024-01-10',
      type: 'Consultation',
      diagnosis: 'Hypertension follow-up',
      prescription: 'Lisinopril 10mg daily',
      notes: 'Blood pressure improved. Continue current medication.'
    },
    {
      date: '2023-12-15',
      type: 'Lab Results',
      diagnosis: 'Annual checkup',
      prescription: 'N/A',
      notes: 'All lab values within normal range except slightly elevated cholesterol.'
    },
    {
      date: '2023-11-20',
      type: 'Consultation',
      diagnosis: 'Initial hypertension diagnosis',
      prescription: 'Lisinopril 5mg daily',
      notes: 'Started on ACE inhibitor. Follow up in 6 weeks.'
    },
  ]);

  // Unique appointment dates derived from medicalHistory and patients' lastVisit
  const appointmentDates = useMemo(() => {
    const dates = new Set<string>();
    medicalHistory.forEach(r => dates.add(r.date));
    patients.forEach(p => p.lastVisit && dates.add(p.lastVisit));
    return Array.from(dates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [medicalHistory, patients]);

  const filteredPatients = useMemo(() => {
    return [...patients]
      .filter(patient => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          patient.name.toLowerCase().includes(searchLower) ||
          patient.email.toLowerCase().includes(searchLower) ||
          patient.phone.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else { // sort by lastVisit
          try {
            const dateA = new Date(a.lastVisit).getTime();
            const dateB = new Date(b.lastVisit).getTime();
            
            // Handle invalid dates by putting them at the end
            if (isNaN(dateA)) return sortOrder === 'asc' ? 1 : -1;
            if (isNaN(dateB)) return sortOrder === 'asc' ? -1 : 1;
            
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          } catch (error) {
            console.error('Error sorting dates:', error);
            return 0; // Keep original order if there's an error
          }
        }
      });
  }, [patients, searchTerm, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    // Close the modals when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close add patient modal
      if (showAddPatient && !target.closest('.add-patient-modal')) {
        setShowAddPatient(false);
      }
      
      // Close filter popup
      if (showFilter && !target.closest('.filter-button') && !target.closest('.filter-popup')) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddPatient, showFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">Manage your patient records and medical history</p>
        </div>
        <button 
          onClick={() => setShowAddPatient(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Patient Directory</h2>
              <span className="text-sm text-gray-500">{patients.length} patients</span>
            </div>
            
            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
              <div className="flex space-x-2">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by patient status"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="relative">
                  <button 
                    onClick={() => setShowFilter(!showFilter)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors filter-button"
                    aria-label="Filter and sort patients"
                    aria-expanded={showFilter}
                    aria-haspopup="dialog"
                    type="button"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  
                  {/* Filter Popup */}
                  {showFilter && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 filter-popup">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
                      </div>
                      <div className="p-2 space-y-2">
                        <button
                          onClick={() => {
                            setSortBy('name');
                            setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${
                            sortBy === 'name' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>Name</span>
                          {sortBy === 'name' && (
                            <span className="text-xs text-gray-500">
                              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('lastVisit');
                            setSortOrder(sortBy === 'lastVisit' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${
                            sortBy === 'lastVisit' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>Last Visit</span>
                          {sortBy === 'lastVisit' && (
                            <span className="text-xs text-gray-500">
                              {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{patient.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.condition}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Last visit: {patient.lastVisit}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          patient.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">{selectedPatient.avatar}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.age} years old • {selectedPatient.gender}</p>
                      <p className="text-sm text-gray-500 mt-1">Primary condition: {selectedPatient.condition}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label="Schedule appointment"
                      type="button"
                      title="View appointment dates"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowAppointmentDates(true); }}
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      aria-label="Call patient"
                      onClick={() => { setShowCall(true); setCallSeconds(0); }}
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      aria-label="Email patient"
                      type="button"
                      role="button"
                      title="Compose Email"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (selectedPatient) {
                          setComposeTo(selectedPatient.email || '');
                          setComposeSubject('');
                          setComposeBody('');
                          setShowCompose(true);
                        }
                      }}
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                      <button
                        type="button"
                        className="flex items-center space-x-2 text-sm group"
                        onClick={(e) => {
                          e.preventDefault();
                          setComposeTo(selectedPatient.email || '');
                          setComposeSubject('');
                          setComposeBody('');
                          setShowCompose(true);
                        }}
                        title="Compose Email"
                      >
                        <Mail className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                        <span className="text-gray-700 group-hover:text-purple-700 underline">{selectedPatient.email}</span>
                      </button>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span>{selectedPatient.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Medical Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Last Visit:</strong> {selectedPatient.lastVisit}</div>
                      <div><strong>Status:</strong> {selectedPatient.status}</div>
                      <div><strong>Primary Condition:</strong> {selectedPatient.condition}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Medical History
                    </h3>
                    <button
                      onClick={() => setShowAddRecord(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      type="button"
                    >
                      Add Record
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {medicalHistory.map((record) => (
                      <div key={`${record.date}-${record.type}`} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-medium text-gray-900">{record.diagnosis}</div>
                            <div className="text-sm text-gray-500">{record.type} • {record.date}</div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700" aria-label="View details">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                        
                        {record.prescription !== 'N/A' && (
                          <div className="mb-2">
                            <strong className="text-sm text-gray-700">Prescription:</strong>
                            <span className="text-sm text-gray-600 ml-2">{record.prescription}</span>
                          </div>
                        )}
                        
                        <div>
                          <strong className="text-sm text-gray-700">Notes:</strong>
                          <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
              <p className="text-gray-600">Choose a patient from the list to view their detailed information and medical history.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Patient</h2>
              <button 
                onClick={() => setShowAddPatient(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Add the new patient to the patients array
              const addedPatient: Patient = {
                ...newPatient,
                id: Math.max(...patients.map(p => p.id)) + 1,
                avatar: newPatient.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                lastVisit: new Date().toISOString().split('T')[0]
              };
              // In a real app, you would make an API call here
              // For now, we'll update the local state
              setPatients(prevPatients => [addedPatient, ...prevPatients]);
              setShowAddPatient(false);
              setNewPatient({ 
                name: '',
                age: 0,
                gender: '',
                phone: '',
                email: '',
                address: '',
                condition: '',
                status: 'Active'
              });
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      id="fullName"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="John Doe"
                      aria-required="true"
                      aria-label="Full Name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={newPatient.age || ''}
                    onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender-select"
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                    aria-label="Select gender"
                    title="Select gender"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status-select"
                    value={newPatient.status}
                    onChange={(e) => setNewPatient({...newPatient, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select status"
                    title="Select status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="patient@example.com"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="123 Main St, City, State ZIP"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Condition
                  </label>
                  <input
                    type="text"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Hypertension, Diabetes, etc."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddPatient(false)}
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
      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Compose Email</h2>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close compose"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!composeTo || !composeSubject || !composeBody) {
                  alert('Please fill in To, Subject and Message');
                  return;
                }
                triggerToast(`Email sent to ${composeTo}`);
                setShowCompose(false);
              }}
              className="px-6 py-5 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="patient@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Regarding your recent visit"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here..."
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => alert('Attachment feature coming soon')}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach
                </button>
                <div className="space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowCompose(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Call Popup */}
      {showCall && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-[28rem] md:w-[32rem] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b bg-green-50 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-green-700">
                <PhoneCall className="w-6 h-6" />
                <span className="text-base font-semibold">Calling {selectedPatient.name}</span>
              </div>
              <span className="text-sm text-gray-700">{formatTime(callSeconds)}</span>
            </div>
            <div className="p-6 flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                {selectedPatient.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-lg font-semibold text-gray-900 truncate">{selectedPatient.name}</div>
                <div className="text-base text-gray-700 truncate">{selectedPatient.phone}</div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 flex items-center justify-between">
              <button
                onClick={() => setIsMuted((m) => !m)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm border ${isMuted ? 'bg-red-50 text-red-700 border-red-300' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                aria-pressed={isMuted}
                aria-label="Toggle mute"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isMuted ? 'Muted' : 'Mute'}</span>
              </button>
              <button
                onClick={() => setIsSpeakerOn((s) => !s)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm border ${isSpeakerOn ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                aria-label="Speaker"
                aria-pressed={isSpeakerOn}
              >
                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                <span>{isSpeakerOn ? 'Speaker On' : 'Speaker Off'}</span>
              </button>
              <button
                onClick={() => { setShowCall(false); setCallSeconds(0); setIsMuted(false); }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                aria-label="End call"
              >
                <PhoneOff className="w-5 h-5" />
                <span>End</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {showAppointmentDates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" /> Appointment Dates
              </h2>
              <button
                onClick={() => setShowAppointmentDates(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close appointment dates"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              {appointmentDates.length > 0 ? (
                <ul className="space-y-2 max-h-64 overflow-auto">
                  {appointmentDates.map(date => (
                    <li key={date} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                      <span className="text-gray-800">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-xs text-gray-500">{date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-600 py-6">No appointment dates available</div>
              )}
            </div>
          </div>
        </div>
      )}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Add Recent Check-up Record</h2>
              <button
                onClick={() => setShowAddRecord(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close add record"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newRecord.diagnosis || !newRecord.type || !newRecord.date) {
                  alert('Please fill in Date, Type and Diagnosis');
                  return;
                }
                let bmi = '';
                const w = parseFloat(newRecord.weightKg || '');
                const h = parseFloat(newRecord.heightCm || '');
                if (!isNaN(w) && !isNaN(h) && h > 0) {
                  const hM = h / 100;
                  bmi = (w / (hM * hM)).toFixed(1);
                }
                setMedicalHistory(prev => [
                  {
                    date: newRecord.date,
                    type: newRecord.type,
                    diagnosis: newRecord.diagnosis,
                    prescription: newRecord.prescription,
                    notes: newRecord.notes,
                    visitReason: newRecord.visitReason,
                    vitals: {
                      bp: newRecord.systolic && newRecord.diastolic ? `${newRecord.systolic}/${newRecord.diastolic} mmHg` : undefined,
                      pulse: newRecord.pulse,
                      temperature: newRecord.temperature,
                      spo2: newRecord.spo2,
                      weightKg: newRecord.weightKg,
                      heightCm: newRecord.heightCm,
                      bmi
                    },
                    followUpDate: newRecord.followUpDate,
                    advice: newRecord.advice
                  },
                  ...prev,
                ]);
                setShowAddRecord(false);
                setNewRecord({
                  date: new Date().toISOString().split('T')[0],
                  type: 'Consultation',
                  visitReason: '',
                  systolic: '',
                  diastolic: '',
                  pulse: '',
                  temperature: '',
                  spo2: '',
                  weightKg: '',
                  heightCm: '',
                  diagnosis: '',
                  prescription: '',
                  notes: '',
                  followUpDate: '',
                  advice: ''
                });
                triggerToast('Medical record added');
              }}
              className="px-6 py-5 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newRecord.date}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={newRecord.type}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Consultation</option>
                    <option>Lab Results</option>
                    <option>Follow-up</option>
                    <option>Procedure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                  <input
                    type="text"
                    name="visitReason"
                    value={newRecord.visitReason}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Routine check-up, fever, etc."
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="systolic"
                      value={newRecord.systolic}
                      onChange={handleNewRecordChange}
                      placeholder="Systolic"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">/</span>
                    <input
                      type="number"
                      name="diastolic"
                      value={newRecord.diastolic}
                      onChange={handleNewRecordChange}
                      placeholder="Diastolic"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="number"
                    name="pulse"
                    value={newRecord.pulse}
                    onChange={handleNewRecordChange}
                    placeholder="Pulse (bpm)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={newRecord.temperature}
                    onChange={handleNewRecordChange}
                    placeholder="Temp (°C)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="spo2"
                    value={newRecord.spo2}
                    onChange={handleNewRecordChange}
                    placeholder="SpO₂ (%)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="weightKg"
                    value={newRecord.weightKg}
                    onChange={handleNewRecordChange}
                    placeholder="Weight (kg)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="heightCm"
                    value={newRecord.heightCm}
                    onChange={handleNewRecordChange}
                    placeholder="Height (cm)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={newRecord.diagnosis}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter diagnosis"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prescription</label>
                  <input
                    type="text"
                    name="prescription"
                    value={newRecord.prescription}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Metformin 500mg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newRecord.notes}
                  onChange={handleNewRecordChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    name="followUpDate"
                    value={newRecord.followUpDate}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advice</label>
                  <input
                    type="text"
                    name="advice"
                    value={newRecord.advice}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Diet, rest, etc."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecord(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Toast: Email Sent */}
      {toast.visible && (
        <div className="fixed top-6 right-6 z-[100] pointer-events-none" role="status" aria-live="polite">
          <div className="flex items-start space-x-3 bg-white border border-green-200 shadow-lg rounded-lg px-4 py-3">
            <div className="mt-0.5 text-green-600">
              <MailCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{toast.message}</p>
              <p className="text-xs text-gray-500 mt-0.5">The email has been queued for delivery.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}