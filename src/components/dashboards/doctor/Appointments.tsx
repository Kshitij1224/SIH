import { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Search, Filter, Plus, ChevronLeft, ChevronRight, User, X, CheckCircle } from 'lucide-react';

// Utility functions for generating random data
const firstNames = ['John', 'Emily', 'Michael', 'Sarah', 'David', 'Jennifer', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Emma', 'Daniel', 'Olivia', 'Matthew'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
const appointmentTypes = ['Consultation', 'Follow-up', 'Check-up', 'Procedure', 'Vaccination', 'Therapy'];
const reasons = [
  'Chest pain follow-up', 'Hypertension monitoring', 'Annual physical', 'Heart palpitations',
  'Diabetes check', 'Allergy testing', 'Vaccination', 'Injury evaluation', 'Medication review',
  'Blood work', 'Prenatal check', 'Post-surgery follow-up', 'Mental health consultation'
];
const statuses = ['confirmed', 'pending', 'completed', 'cancelled'];
const urgencies = ['low', 'medium', 'high'];

interface PatientDetails {
  id: number;
  age: number;
  gender: string;
  bloodType: string;
  lastVisit: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
}

// Sample patient details data
const patientDetails: Record<string, PatientDetails> = {
  'John Smith': {
    id: 1,
    age: 45,
    gender: 'Male',
    bloodType: 'A+',
    lastVisit: '2023-09-10',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg']
  },
  'Sarah Johnson': {
    id: 2,
    age: 32,
    gender: 'Female',
    bloodType: 'O-',
    lastVisit: '2023-09-15',
    allergies: ['Latex'],
    conditions: ['Asthma'],
    medications: ['Albuterol Inhaler']
  },
  // Add more patients as needed
};

const getRandomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomTime = () => {
  const hour = getRandomInt(8, 17); // Between 8 AM and 5 PM
  const minute = getRandomInt(0, 1) * 30; // 00 or 30
  const duration = getRandomInt(1, 4) * 15; // 15, 30, 45, or 60 minutes
  const endHour = minute + duration >= 60 ? hour + 1 : hour;
  const endMinute = (minute + duration) % 60;
  
  const formatTime = (h: number, m: number) => 
    `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    
  return {
    start: formatTime(hour, minute),
    end: formatTime(endHour, endMinute),
    display: `${formatTime(hour, minute)} - ${formatTime(endHour, endMinute)}`
  };
};

const generateRandomDate = (daysOffset = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + getRandomInt(0, daysOffset));
  return date.toISOString().split('T')[0];
};

const generateRandomPatient = () => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  return `${firstName} ${lastName}`;
};

export function Appointments() {
  const [currentView, setCurrentView] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'name'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  // Toast notification state
  const [toast, setToast] = useState<{ visible: boolean; message: string }>(
    { visible: false, message: '' }
  );
  const triggerToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  }, []);

  // Helpers for date filtering
  const toStartOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const isSameDay = (a: Date, b: Date) => toStartOfDay(a).getTime() === toStartOfDay(b).getTime();
  const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  const isInSameWeek = (date: Date, ref: Date) => {
    const start = new Date(ref);
    // Week starts on Sunday
    start.setDate(ref.getDate() - ref.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const d = toStartOfDay(date).getTime();
    return d >= toStartOfDay(start).getTime() && d <= toStartOfDay(end).getTime();
  };

  // Formatters for date inputs
  const selectedDateISO = selectedDate.toISOString().split('T')[0];
  const selectedMonthISO = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;

  // Handle date/month input change
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type } = e.target as HTMLInputElement;
    if (!value) return;
    if (type === 'month') {
      const [y, m] = value.split('-').map(Number);
      if (!isNaN(y) && !isNaN(m)) setSelectedDate(new Date(y, m - 1, 1));
    } else {
      setSelectedDate(new Date(value));
    }
  };

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    reason: '',
    status: 'pending'
  });

  // Sort and filter appointments
  const sortAndFilterAppointments = useCallback(() => {
    let result = [...appointments];

    // Filter by selected date and current view
    result = result.filter(appt => {
      const apptDate = new Date(appt.date);
      if (currentView === 'day') return isSameDay(apptDate, selectedDate);
      if (currentView === 'week') return isInSameWeek(apptDate, selectedDate);
      // month view
      return isSameMonth(apptDate, selectedDate);
    });
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(appt => 
        appt.patient.toLowerCase().includes(query) ||
        appt.type.toLowerCase().includes(query) ||
        appt.reason.toLowerCase().includes(query) ||
        appt.status.toLowerCase().includes(query) ||
        appt.time?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'time') {
        const timeA = a.time?.split(' - ')[0] || '';
        const timeB = b.time?.split(' - ')[0] || '';
        return sortOrder === 'asc' 
          ? timeA.localeCompare(timeB)
          : timeB.localeCompare(timeA);
      } else {
        return sortOrder === 'asc'
          ? a.patient.localeCompare(b.patient)
          : b.patient.localeCompare(a.patient);
      }
    });
    
    setFilteredAppointments(result);
  }, [appointments, searchQuery, sortBy, sortOrder, currentView, selectedDate]);
  
  useEffect(() => {
    sortAndFilterAppointments();
  }, [sortAndFilterAppointments]);
  
  const handleSortChange = (type: 'time' | 'name') => {
    if (sortBy === type) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmitAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newAppointment.patient || !newAppointment.type || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new appointment object
    const appointmentTime = generateRandomTime();
    const newAppt = {
      id: appointments.length + 1,
      patient: newAppointment.patient,
      type: newAppointment.type,
      time: newAppointment.time,
      status: 'pending',
      date: newAppointment.date,
      reason: newAppointment.reason || 'Not specified',
      ...appointmentTime
    };
    
    // Add to appointments
    setAppointments(prev => [...prev, newAppt]);
    
    // Reset form and close modal
    setNewAppointment({
      patient: '',
      type: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      reason: '',
      status: 'pending'
    });
    setShowNewAppointment(false);
    // Show success toast
    triggerToast('Appointment created successfully');
  };

  const handleAppointmentAction = async (requestId: number, action: 'accept' | 'decline') => {
    setIsProcessing(requestId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (action === 'accept') {
      // Move from pending requests to appointments
      const requestToApprove = pendingRequests.find(req => req.id === requestId);
      if (requestToApprove) {
        const newAppt = {
          ...requestToApprove,
          id: Math.max(0, ...appointments.map(a => a.id)) + 1, // Generate new unique ID
          status: 'confirmed',
          time: requestToApprove.requestedTime,
          date: requestToApprove.requestedDate
        };
        
        setAppointments(prev => [...prev, newAppt]);
      }
    }
    
    // Remove from pending requests
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    setIsProcessing(null);
    
    // Show success message
    alert(`Appointment request ${action === 'accept' ? 'accepted' : 'declined'} successfully`);
  };

  const handlePreviousPeriod = () => {
    const newDate = new Date(selectedDate);
    if (currentView === 'day') {
      newDate.setDate(selectedDate.getDate() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(selectedDate.getDate() - 7);
    } else {
      // month view
      newDate.setMonth(selectedDate.getMonth() - 1);
    }
    setSelectedDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    if (currentView === 'day') {
      newDate.setDate(selectedDate.getDate() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(selectedDate.getDate() + 7);
    } else {
      // month view
      newDate.setMonth(selectedDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  useEffect(() => {
    // Generate random appointments
    const newAppointments = Array.from({ length: getRandomInt(3, 8) }, (_, i) => ({
      id: i + 1,
      patient: generateRandomPatient(),
      type: getRandomElement(appointmentTypes),
      ...generateRandomTime(),
      status: getRandomElement(statuses),
      date: generateRandomDate(3), // Within next 3 days
      reason: getRandomElement(reasons)
    }));

    // Generate random pending requests
    const newPendingRequests = Array.from({ length: getRandomInt(1, 5) }, (_, i) => ({
      id: i + 1,
      patient: generateRandomPatient(),
      requestedDate: generateRandomDate(14), // Within next 14 days
      requestedTime: generateRandomTime().start,
      reason: getRandomElement(reasons),
      urgency: getRandomElement(urgencies)
    }));

    setAppointments(newAppointments);
    setPendingRequests(newPendingRequests);
  }, []); // Empty dependency array means this runs once on mount

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close filter popup
      if (showFilter && !target.closest('.filter-container')) {
        setShowFilter(false);
      }
      
      // Close patient details popup
      if (selectedPatient && !target.closest('.patient-details-container')) {
        setSelectedPatient(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilter, selectedPatient]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your schedule and patient appointments</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => setShowNewAppointment(true)}
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <button 
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              {showFilter && (
                <div className="absolute z-10 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 filter-container">
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                    Sort by
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => handleSortChange('time')}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                        sortBy === 'time' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>Time</span>
                      {sortBy === 'time' && (
                        <span className="text-blue-600">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleSortChange('name')}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                        sortBy === 'name' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>Patient Name</span>
                      {sortBy === 'name' && (
                        <span className="text-blue-600">
                          {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* View Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['day', 'week', 'month'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${
                    currentView === view
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Previous period"
                title="Previous period"
                onClick={handlePreviousPeriod}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-900 min-w-[140px] text-center">
                {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Next period"
                title="Next period"
                onClick={handleNextPeriod}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {/* Direct date/month picker */}
              {currentView === 'month' ? (
                <input
                  type="month"
                  value={selectedMonthISO}
                  onChange={handleDateInputChange}
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Select month"
                  title="Select month"
                />
              ) : (
                <input
                  type="date"
                  value={selectedDateISO}
                  onChange={handleDateInputChange}
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Select date"
                  title="Select date"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Today's Schedule
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="mx-auto h-8 w-8 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {searchQuery ? 'No appointments found' : 'No appointments scheduled for today'}
                  </h3>
                  {searchQuery && (
                    <p className="mt-1 text-sm text-gray-500">
                      No appointments match "{searchQuery}"
                    </p>
                  )}
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-mono text-gray-600 min-w-[80px]">
                        {appointment.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <button 
                            onClick={() => {
                              const patientKey = Object.keys(patientDetails).find(key => 
                                key.toLowerCase() === appointment.patient.toLowerCase()
                              );
                              if (patientKey) {
                                setSelectedPatient(patientDetails[patientKey as keyof typeof patientDetails]);
                              } else {
                                setSelectedPatient({
                                  id: appointment.id,
                                  age: 0,
                                  gender: 'Unknown',
                                  bloodType: 'Unknown',
                                  lastVisit: 'Never',
                                  allergies: [],
                                  conditions: [],
                                  medications: []
                                });
                              }
                            }}
                            className="font-medium text-gray-900 hover:text-blue-600 hover:underline focus:outline-none"
                          >
                            {appointment.patient}
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 ml-10 -mt-1">{appointment.reason}</div>
                        <div className="text-xs text-gray-400 mt-1 ml-10">{appointment.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {appointment.status}
                      </span>
                      <div className="flex space-x-1">
                        <button 
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          aria-label="Edit appointment"
                          title="Edit appointment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          aria-label="Delete appointment"
                          title="Delete appointment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Pending Requests
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium text-gray-900">{request.patient}</div>
                        <div className="text-sm text-gray-500">{request.reason}</div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {request.urgency}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Requested: {request.requestedDate} at {request.requestedTime}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAppointmentAction(request.id, 'accept')}
                        disabled={isProcessing === request.id}
                        className={`flex-1 flex items-center justify-center ${
                          isProcessing === request.id 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white px-3 py-2 rounded-md text-sm transition-colors`}
                        aria-label={`Accept appointment request from ${request.patient}`}
                        title="Accept appointment"
                      >
                        {isProcessing === request.id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : 'Accept'}
                      </button>
                      <button 
                        onClick={() => handleAppointmentAction(request.id, 'decline')}
                        disabled={isProcessing === request.id}
                        className={`flex-1 flex items-center justify-center ${
                          isProcessing === request.id 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        } text-gray-800 px-3 py-2 rounded-md text-sm transition-colors`}
                        aria-label={`Decline appointment request from ${request.patient}`}
                        title="Decline appointment"
                      >
                        {isProcessing === request.id ? 'Processing...' : 'Decline'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No pending requests</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">New Appointment</h2>
              <button 
                onClick={() => setShowNewAppointment(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitAppointment} className="p-6 space-y-4">
              <div>
                <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="patient-name"
                  type="text"
                  name="patient"
                  value={newAppointment.patient}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  aria-required="true"
                  placeholder="Enter patient name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                    aria-label="Appointment date"
                  />
                </div>
                
                <div>
                  <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="appointment-time"
                    type="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                    aria-label="Appointment time"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="appointment-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="appointment-type"
                  name="type"
                  value={newAppointment.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  aria-required="true"
                  aria-label="Select appointment type"
                >
                  <option value="">Select type</option>
                  {appointmentTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <textarea
                  name="reason"
                  value={newAppointment.reason}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Briefly describe the reason for the appointment"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewAppointment(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md patient-details-container">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Patient Details</h2>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close patient details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {Object.keys(patientDetails).find(key => 
                      (patientDetails as any)[key].id === selectedPatient.id
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">ID: {selectedPatient.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Type</p>
                  <p className="font-medium">{selectedPatient.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p className="font-medium">{selectedPatient.lastVisit}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Medical Information</h4>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-1">Allergies</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies.length > 0 ? (
                      selectedPatient.allergies.map((allergy: string, index: number) => (
                        <span key={index} className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No known allergies</span>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-1">Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.conditions.length > 0 ? (
                      selectedPatient.conditions.map((condition: string, index: number) => (
                        <span key={index} className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full">
                          {condition}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No conditions recorded</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Medications</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedPatient.medications.length > 0 ? (
                      selectedPatient.medications.map((med: string, index: number) => (
                        <li key={index}>{med}</li>
                      ))
                    ) : (
                      <li className="text-gray-500">No current medications</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 border-t">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => {
                  // Add functionality to view full patient record
                  alert('Viewing full patient record...');
                }}
              >
                View Full Record
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-6 right-6 z-50" role="status" aria-live="polite">
          <div className="flex items-start space-x-3 bg-white border border-green-200 shadow-lg rounded-lg px-4 py-3">
            <div className="mt-0.5 text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{toast.message}</p>
              <p className="text-xs text-gray-500 mt-0.5">You can view it in your schedule.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}