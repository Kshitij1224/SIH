import * as React from 'react';
import { useState, useCallback } from 'react';
import { Calendar, Clock, Users, AlertCircle, TrendingUp, MessageSquare, X, Mail, Phone, MapPin, Stethoscope, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { Doctor } from '../../../types/auth';

// Define types
type NotificationType = 'lab' | 'message' | 'appointment' | 'alert';

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
    { id: 1, type: 'lab', message: 'Lab results available for John Smith', time: '2 hours ago', read: false },
    { id: 2, type: 'message', message: 'New message from Emily Davis', time: '4 hours ago', read: false },
    { id: 3, type: 'appointment', message: 'Appointment request from new patient', time: '6 hours ago', read: false },
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
            <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
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
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-900 min-w-[60px]">
                      {appointment.time}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{appointment.patient}</div>
                      <div className="text-sm text-gray-500">{appointment.type}</div>
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
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'lab' ? 'bg-blue-100' :
                    notification.type === 'message' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      notification.type === 'lab' ? 'text-blue-600' :
                      notification.type === 'message' ? 'text-green-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
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
        
        {/* Right Column - Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Schedule</div>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Add Patient</div>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Messages</div>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Reports</div>
              </button>
            </div>
          </div>
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Patients This Week</h2>
                <button 
                  onClick={() => setShowPatientsThisWeek(false)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-3">
                {getPatientsThisWeek().length > 0 ? (
                  getPatientsThisWeek().map((patient, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{patient}</p>
                        <p className="text-sm text-gray-500">
                          {appointments
                            .filter(a => a.patient === patient)
                            .length} appointment{appointments.filter(a => a.patient === patient).length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No patients this week</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no patients scheduled for this week.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
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
    </div>
  );
}
