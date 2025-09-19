import React, { useState } from 'react';
import { type AdmissionRecord } from '../AdmissionsModal';
import { ArrowLeft, Calendar, Clock, Search, Filter, User, Stethoscope, Activity, Plus, X, Clipboard, HeartPulse } from 'lucide-react';
import NewAdmissionModal from '../components/NewAdmissionModal';

// Mock monthly data for admissions. Replace with API data when available.
const monthlyAdmissions: AdmissionRecord[] = [
  { id: 'am1', patient: 'Rahul Sharma', date: '2025-09-01', time: '08:30 AM', doctor: 'Dr. Anil Kumar', reason: 'Hypertension' },
  { id: 'am2', patient: 'Priya Patel', date: '2025-09-01', time: '09:15 AM', doctor: 'Dr. Meera Iyer', reason: 'Diabetes Checkup' },
  { id: 'am3', patient: 'Aarav Gupta', date: '2025-09-01', time: '10:00 AM', doctor: 'Dr. Rajesh Nair', reason: 'Fractured Arm' },
  { id: 'am4', patient: 'Ananya Reddy', date: '2025-09-01', time: '10:45 AM', doctor: 'Dr. Sunita Rao', reason: 'Prenatal Checkup' },
  { id: 'am5', patient: 'Vikram Singh', date: '2025-09-01', time: '11:30 AM', doctor: 'Dr. Arjun Menon', reason: 'Chest Pain' },
  { id: 'am6', patient: 'Kavita Nair', date: '2025-09-01', time: '12:15 PM', doctor: 'Dr. Neha Kapoor', reason: 'Migraine' },
  { id: 'am7', patient: 'Rohit Verma', date: '2025-09-01', time: '01:00 PM', doctor: 'Dr. Sanjay Mehta', reason: 'Fever' },
  { id: 'am8', patient: 'Meera Krishnan', date: '2025-09-01', time: '02:30 PM', doctor: 'Dr. Anjali Joshi', reason: 'Thyroid Check' },
  { id: 'am9', patient: 'Arjun Malhotra', date: '2025-09-02', time: '09:00 AM', doctor: 'Dr. Preeti Nair', reason: 'Allergy Test' },
  { id: 'am10', patient: 'Divya Iyer', date: '2025-09-02', time: '10:20 AM', doctor: 'Dr. Karthik Reddy', reason: 'Joint Pain' },
  { id: 'am11', patient: 'Rahul Nambiar', date: '2025-09-02', time: '11:10 AM', doctor: 'Dr. Deepa Krishnan', reason: 'Back Pain' },
  { id: 'am12', patient: 'Anjali Menon', date: '2025-09-02', time: '12:30 PM', doctor: 'Dr. Rohit Joshi', reason: 'Pregnancy Scan' },
  { id: 'am13', patient: 'Suresh Nair', date: '2025-09-03', time: '09:45 AM', doctor: 'Dr. Shalini Nair', reason: 'Blood Pressure' },
  { id: 'am14', patient: 'Kiran Patel', date: '2025-09-03', time: '10:50 AM', doctor: 'Dr. Amit Patel', reason: 'Eye Checkup' },
  { id: 'am15', patient: 'Priyanka Rao', date: '2025-09-03', time: '11:40 AM', doctor: 'Dr. Ravi Verma', reason: 'Skin Allergy' },
  { id: 'am16', patient: 'Ramesh Kumar', date: '2025-09-03', time: '01:15 PM', doctor: 'Dr. Ananya Das', reason: 'Heart Checkup' },
  { id: 'am17', patient: 'Sunita Reddy', date: '2025-09-04', time: '09:30 AM', doctor: 'Dr. Arjun Nambiar', reason: 'Diabetes Review' },
  { id: 'am18', patient: 'Vijay Menon', date: '2025-09-04', time: '10:25 AM', doctor: 'Dr. Nandini Iyer', reason: 'Knee Pain' },
  { id: 'am19', patient: 'Anita Desai', date: '2025-09-04', time: '11:50 AM', doctor: 'Dr. Suresh Nair', reason: 'Thyroid Test' },
  { id: 'am20', patient: 'Rajesh Namboothiri', date: '2025-09-04', time: '01:00 PM', doctor: 'Dr. Anjali Menon', reason: 'Fever & Cold' },
  { id: 'am21', patient: 'Deepak Sharma', date: '2025-09-05', time: '08:45 AM', doctor: 'Dr. Rajesh Namboothiri', reason: 'Stomach Pain' },
  { id: 'am22', patient: 'Pooja Nair', date: '2025-09-05', time: '10:10 AM', doctor: 'Dr. Deepak Sharma', reason: 'Pregnancy Check' },
  { id: 'am23', patient: 'Rahul Pillai', date: '2025-09-05', time: '11:20 AM', doctor: 'Dr. Pooja Nair', reason: 'Fractured Leg' },
  { id: 'am24', patient: 'Anjali Namboothiri', date: '2025-09-05', time: '12:45 PM', doctor: 'Dr. Rahul Pillai', reason: 'Headache' },
  { id: 'am25', patient: 'Sanjay Menon', date: '2025-09-08', time: '09:15 AM', doctor: 'Dr. Anjali Namboothiri', reason: 'Blood Test' },
  { id: 'am26', patient: 'Meenakshi Iyer', date: '2025-09-08', time: '10:30 AM', doctor: 'Dr. Sanjay Menon', reason: 'Joint Pain' },
  { id: 'am27', patient: 'Vikram Nair', date: '2025-09-08', time: '11:45 AM', doctor: 'Dr. Meenakshi Iyer', reason: 'Back Pain' },
  { id: 'am28', patient: 'Shweta Rao', date: '2025-09-08', time: '01:00 PM', doctor: 'Dr. Vikram Nair', reason: 'Prenatal Visit' },
  { id: 'am29', patient: 'Arvind Namboothiri', date: '2025-09-09', time: '09:30 AM', doctor: 'Dr. Shweta Rao', reason: 'Fever' },
  { id: 'am30', patient: 'Lakshmi Menon', date: '2025-09-09', time: '10:50 AM', doctor: 'Dr. Arvind Namboothiri', reason: 'Thyroid Test' },
  { id: 'am31', patient: 'Rahul Nair', date: '2025-09-09', time: '11:40 AM', doctor: 'Dr. Lakshmi Menon', reason: 'Chest Pain' },
  { id: 'am32', patient: 'Ananya Nambiar', date: '2025-09-09', time: '12:55 PM', doctor: 'Dr. Rahul Nair', reason: 'Skin Rash' },
  { id: 'am33', patient: 'Suresh Kumar', date: '2025-09-10', time: '09:00 AM', doctor: 'Dr. Ananya Nambiar', reason: 'Blood Pressure' },
  { id: 'am34', patient: 'Divya Nair', date: '2025-09-10', time: '10:15 AM', doctor: 'Dr. Suresh Kumar', reason: 'Diabetes Check' },
  { id: 'am35', patient: 'Rajiv Pillai', date: '2025-09-10', time: '11:30 AM', doctor: 'Dr. Divya Nair', reason: 'Knee Pain' },
  { id: 'am36', patient: 'Anjali Nair', date: '2025-09-10', time: '12:45 PM', doctor: 'Dr. Rajiv Pillai', reason: 'Pregnancy Test' },
  { id: 'am37', patient: 'Vijay Namboothiri', date: '2025-09-11', time: '09:20 AM', doctor: 'Dr. Anjali Nair', reason: 'Fever & Cold' },
  { id: 'am38', patient: 'Priya Menon', date: '2025-09-11', time: '10:40 AM', doctor: 'Dr. Vijay Namboothiri', reason: 'Stomach Pain' },
  { id: 'am39', patient: 'Rahul Namboothiri', date: '2025-09-11', time: '11:50 AM', doctor: 'Dr. Priya Menon', reason: 'Headache' },
  { id: 'am40', patient: 'Anita Nair', date: '2025-09-11', time: '01:05 PM', doctor: 'Dr. Rahul Namboothiri', reason: 'Blood Test' },
  { id: 'am41', patient: 'Sanjay Nambiar', date: '2025-09-12', time: '09:10 AM', doctor: 'Dr. Anita Nair', reason: 'Joint Pain' },
  { id: 'am42', patient: 'Meera Nair', date: '2025-09-12', time: '10:25 AM', doctor: 'Dr. Sanjay Nambiar', reason: 'Back Pain' },
  { id: 'am43', patient: 'Vikram Pillai', date: '2025-09-12', time: '11:40 AM', doctor: 'Dr. Meera Nair', reason: 'Prenatal Visit' },
  { id: 'am44', patient: 'Shweta Namboothiri', date: '2025-09-12', time: '12:55 PM', doctor: 'Dr. Vikram Pillai', reason: 'Fever' },
  { id: 'am45', patient: 'Arvind Menon', date: '2025-09-15', time: '09:30 AM', doctor: 'Dr. Shweta Namboothiri', reason: 'Thyroid Test' },
  { id: 'am46', patient: 'Lakshmi Nair', date: '2025-09-15', time: '10:45 AM', doctor: 'Dr. Arvind Menon', reason: 'Chest Pain' },
  { id: 'am47', patient: 'Rahul Namboothiri', date: '2025-09-15', time: '11:55 AM', doctor: 'Dr. Lakshmi Nair', reason: 'Skin Rash' },
  { id: 'am48', patient: 'Ananya Pillai', date: '2025-09-15', time: '01:10 PM', doctor: 'Dr. Rahul Namboothiri', reason: 'Blood Pressure' },
  { id: 'am49', patient: 'Suresh Nair', date: '2025-09-16', time: '09:15 AM', doctor: 'Dr. Ananya Pillai', reason: 'Diabetes Check' },
  { id: 'am50', patient: 'Divya Namboothiri', date: '2025-09-16', time: '10:30 AM', doctor: 'Dr. Suresh Nair', reason: 'Knee Pain' },
];

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch(status) {
    case 'Admitted': return 'bg-blue-100 text-blue-800';
    case 'In Treatment': return 'bg-yellow-100 text-yellow-800';
    case 'Discharged': return 'bg-green-100 text-green-800';
    case 'In Recovery': return 'bg-purple-100 text-purple-800';
    case 'Critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const AdmissionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionRecord | null>(null);
  const [admissions, setAdmissions] = useState(monthlyAdmissions);
  
  // Handle new admission submission
  const handleNewAdmission = (newAdmission: any) => {
    // Format the new admission with proper fields
    const formattedAdmission: AdmissionRecord = {
      id: `am${Date.now()}`,
      patient: newAdmission.patientName || 'New Patient',
      doctor: newAdmission.doctor || 'Dr. Unknown',
      reason: newAdmission.reason || 'Checkup',
      date: new Date().toISOString().split('T')[0],
      time: newAdmission.time || new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
    
    // Add the new admission to the beginning of the list
    setAdmissions(prev => [formattedAdmission, ...prev]);
    // Show a success message (you can replace this with a toast notification)
    alert(`Successfully admitted ${formattedAdmission.patient}`);
  };


  // Function to get status for an admission
  const getAdmissionStatus = (id: string) => {
    // Use the last digit of the ID to determine status
    const lastDigit = parseInt(id.replace(/\D/g, '').slice(-1)) || 0;
    
    if (lastDigit >= 8) return 'Critical';
    if (lastDigit >= 6) return 'In Treatment';
    if (lastDigit >= 4) return 'In Recovery';
    if (lastDigit >= 2) return 'Discharged';
    return 'Admitted';
  };

  const filteredAdmissions = admissions.filter(admission => {
    // Get the status for this admission
    const status = getAdmissionStatus(admission.id);
    
    // Apply status filter
    if (statusFilter !== 'All' && status !== statusFilter) {
      return false;
    }
    
    // Apply search filter if search term exists
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        admission.patient.toLowerCase().includes(searchLower) || 
        admission.doctor.toLowerCase().includes(searchLower) ||
        admission.reason.toLowerCase().includes(searchLower) ||
        admission.date.includes(searchTerm) ||
        admission.time.toLowerCase().includes(searchLower) ||
        status.toLowerCase().includes(searchLower);
      
      return matchesSearch;
    }
    
    return true;
  });

  // Handle row click to show patient details
  const handleRowClick = (admission: AdmissionRecord) => {
    setSelectedAdmission(admission);
  };

  // Close the details modal
  const closeDetailsModal = () => {
    setSelectedAdmission(null);
  };

  return (
    <div className="w-[90%] mx-auto py-6 relative">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="p-2 bg-white/20 rounded-lg mr-4">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Patient Admissions</h1>
                <p className="text-blue-100 mt-1">Manage and track all hospital admissions</p>
              </div>
            </div>
          </div>
          <a
            href="#/"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-sm font-medium rounded-lg transition-colors duration-200 border border-white/30 hover:border-white/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Admissions</p>
              <p className="text-2xl font-bold text-gray-800">{monthlyAdmissions.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Cases</p>
              <p className="text-2xl font-bold text-gray-800">{Math.floor(monthlyAdmissions.length * 0.7)}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical Cases</p>
              <p className="text-2xl font-bold text-gray-800">{Math.floor(monthlyAdmissions.length * 0.15)}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Stay</p>
              <p className="text-2xl font-bold text-gray-800">3.2 <span className="text-sm font-normal text-gray-500">days</span></p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search patients, doctors, or reasons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Admitted">Admitted</option>
                <option value="In Treatment">In Treatment</option>
                <option value="In Recovery">In Recovery</option>
                <option value="Critical">Critical</option>
                <option value="Discharged">Discharged</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Admission
            </button>
          </div>
        </div>
      </div>

      {/* Admissions List */}
      <div className="space-y-4">
        {filteredAdmissions.length > 0 ? (
          filteredAdmissions.map((admission) => {
            const status = getAdmissionStatus(admission.id);
            const statusColor = getStatusColor(status);
            const isCritical = status === 'Critical';
            
            return (
              <div 
                key={admission.id} 
                onClick={() => handleRowClick(admission)}
                className={`bg-white rounded-xl shadow-sm border ${
                  isCritical ? 'border-red-200' : 'border-gray-100'
                } p-5 transition-all duration-200 hover:shadow-md cursor-pointer`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start md:items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      isCritical ? 'bg-red-50' : 'bg-blue-50'
                    }`}>
                      <User className={`w-6 h-6 ${isCritical ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{admission.patient}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColor}`}>
                          {status}
                        </span>
                        {isCritical && (
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{admission.reason}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Stethoscope className="w-4 h-4 mr-1.5 text-gray-400" />
                          {admission.doctor}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                          {new Date(admission.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                          {admission.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No admissions found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <div className="mt-6">
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Admission Modal */}
      <NewAdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewAdmission}
      />

      {/* Patient Details Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeDetailsModal}>
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAdmission.patient}</h2>
                  <p className="text-gray-600">Admission ID: {selectedAdmission.id}</p>
                </div>
                <button 
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Patient Name</h3>
                      <p className="text-sm text-gray-600">{selectedAdmission.patient}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Doctor</h3>
                      <p className="text-sm text-gray-600">{selectedAdmission.doctor}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Clipboard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Reason</h3>
                      <p className="text-sm text-gray-600">{selectedAdmission.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Admission Date</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedAdmission.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Admission Time</h3>
                      <p className="text-sm text-gray-600">{selectedAdmission.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <HeartPulse className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Status</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getAdmissionStatus(selectedAdmission.id) === 'Critical' ? 'bg-red-100 text-red-800' :
                        getAdmissionStatus(selectedAdmission.id) === 'In Treatment' ? 'bg-yellow-100 text-yellow-800' :
                        getAdmissionStatus(selectedAdmission.id) === 'In Recovery' ? 'bg-blue-100 text-blue-800' :
                        getAdmissionStatus(selectedAdmission.id) === 'Discharged' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getAdmissionStatus(selectedAdmission.id)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {selectedAdmission.reason ? 
                      `Patient admitted for ${selectedAdmission.reason.toLowerCase()}. ` : ''}
                    Regular monitoring and treatment in progress. Next check-up scheduled for tomorrow.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeDetailsModal}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Clipboard className="-ml-1 mr-2 h-4 w-4" />
                  View Full History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsPage;
