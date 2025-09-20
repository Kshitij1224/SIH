import React from 'react';
import { Calendar, Clock, MapPin, X, ArrowLeft, Stethoscope, FileText, Home, User, MessageSquare, Bell, Menu, X as Close, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  // Sample data for upcoming appointments with Indian doctor names
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      date: '2023-06-15',
      time: '10:00 AM',
      location: 'Apollo Hospitals, Mumbai',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      doctor: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      date: '2023-06-17',
      time: '2:30 PM',
      location: 'Fortis Hospital, Delhi',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
  ];

  // Sample data for past appointments with Indian doctor names and additional details
  const pastAppointments = [
    {
      id: 3,
      doctor: 'Dr. Amit Patel',
      specialty: 'General Physician',
      date: '2023-05-20',
      time: '11:15 AM',
      location: 'Max Healthcare, Bangalore',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      diagnosis: 'Seasonal Allergies',
      prescription: 'Antihistamines, Nasal Spray',
    },
    {
      id: 4,
      doctor: 'Dr. Ananya Reddy',
      specialty: 'Gynecologist',
      date: '2023-05-15',
      time: '3:45 PM',
      location: 'Manipal Hospital, Hyderabad',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      diagnosis: 'Routine Checkup',
      prescription: 'Blood Tests, Vitamin D Supplements',
    },
    {
      id: 5,
      doctor: 'Dr. Vikram Singh',
      specialty: 'Orthopedic Surgeon',
      date: '2023-04-28',
      time: '9:30 AM',
      location: 'Medanta Hospital, Gurgaon',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      diagnosis: 'Knee Pain',
      prescription: 'Physiotherapy, Pain Relievers',
    },
    {
      id: 6,
      doctor: 'Dr. Neha Gupta',
      specialty: 'Pediatrician',
      date: '2023-04-15',
      time: '1:00 PM',
      location: 'Rainbow Children\'s Hospital, Mumbai',
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
      diagnosis: 'Viral Fever',
      prescription: 'Rest, Paracetamol, Hydration',
    },
    {
      id: 7,
      doctor: 'Dr. Arjun Mehta',
      specialty: 'ENT Specialist',
      date: '2023-03-30',
      time: '4:15 PM',
      location: 'Artemis Hospital, Delhi',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      diagnosis: 'Ear Infection',
      prescription: 'Antibiotics, Ear Drops',
    },
  ];

  const handleCancelAppointment = (appointmentId: number) => {
    // In a real app, this would make an API call to cancel the appointment
    console.log('Canceling appointment:', appointmentId);
    alert('Appointment cancellation would be processed here');
  };

  const handleBookAppointment = () => {
    // In a real app, this would navigate to a booking page or open a booking modal
    console.log('Initiating new appointment booking');
    alert('Redirecting to book a new appointment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center text-gray-700 hover:text-gray-900 p-2 rounded-md"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">MediCare</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="flex items-center text-sm rounded-full focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User profile"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your upcoming and past medical appointments
            </p>
          </div>
          <button
            onClick={handleBookAppointment}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Book New Appointment
          </button>
        </div>

        <div className="space-y-12">
          {/* Upcoming Appointments */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {upcomingAppointments.length} {upcomingAppointments.length === 1 ? 'Appointment' : 'Appointments'}
              </span>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <li key={appointment.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={appointment.avatar}
                            alt={`${appointment.doctor} avatar`}
                          />
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="text-sm font-medium text-gray-900">
                                {appointment.doctor}
                              </h3>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {appointment.specialty}
                              </span>
                            </div>
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {new Date(appointment.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {appointment.time}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {appointment.location}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center bg-white py-12 rounded-lg border-2 border-dashed border-gray-300">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by booking a new appointment.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleBookAppointment}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    New Appointment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Past Appointments</h2>
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {pastAppointments.length} {pastAppointments.length === 1 ? 'Appointment' : 'Appointments'}
              </span>
            </div>

            {pastAppointments.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {pastAppointments.map((appointment) => (
                    <motion.li 
                      key={appointment.id} 
                      className="px-6 py-6 bg-white rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded-full border-2 border-blue-100"
                            src={appointment.avatar}
                            alt={`${appointment.doctor} avatar`}
                          />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {appointment.doctor}
                              </h3>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Completed
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-start">
                              <Calendar className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p className="text-sm text-gray-900">
                                  {new Date(appointment.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Clock className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Time</p>
                                <p className="text-sm text-gray-900">{appointment.time}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <MapPin className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Location</p>
                                <p className="text-sm text-gray-900">{appointment.location}</p>
                              </div>
                            </div>
                            
                            {appointment.diagnosis && (
                              <div className="flex items-start">
                                <FileText className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Diagnosis</p>
                                  <p className="text-sm text-gray-900">{appointment.diagnosis}</p>
                                </div>
                              </div>
                            )}
                            
                            {appointment.prescription && (
                              <div className="flex items-start">
                                <Stethoscope className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Prescription</p>
                                  <p className="text-sm text-gray-900">{appointment.prescription}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex justify-end space-x-3">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Book Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center bg-white py-12 rounded-lg border-2 border-dashed border-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No past appointments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your past appointments will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MediCare</h3>
              <p className="text-gray-300 text-sm">
                Your trusted healthcare partner providing quality medical services with compassion and excellence.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Doctors</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Appointments</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Cardiology</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Dermatology</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Neurology</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Pediatrics</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">More...</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 text-sm">
                  <MapPin className="h-4 w-4 mr-2" /> 123 Health St, Medical City, India
                </li>
                <li className="flex items-center text-gray-300 text-sm">
                  <Phone className="h-4 w-4 mr-2" /> +91 98765 43210
                </li>
                <li className="flex items-center text-gray-300 text-sm">
                  <Mail className="h-4 w-4 mr-2" /> info@medicare.com
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MediCare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppointmentsPage;
