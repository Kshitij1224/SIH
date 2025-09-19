import { useState } from 'react';
import { Activity, ArrowLeft, X, Calendar, Clock, User, Stethoscope, Activity as StatusIcon } from 'lucide-react';

export type PatientStatus = 'Treating' | 'Waiting' | 'Discharged' | 'All';

export type PatientRecord = {
  id: string;
  name: string;
  department: string;
  status: PatientStatus;
  date: string; // YYYY-MM-DD
  time: string; // e.g., 09:15 AM
};

const samplePatients: PatientRecord[] = [
  { id: 'p1', name: 'Aarav Patel', department: 'Cardiology', status: 'Treating', date: '2025-09-18', time: '09:15 AM' },
  { id: 'p2', name: 'Priya Sharma', department: 'Neurology', status: 'Waiting', date: '2025-09-18', time: '10:40 AM' },
  { id: 'p3', name: 'Rohan Kumar', department: 'Emergency', status: 'Treating', date: '2025-09-18', time: '11:20 AM' },
  { id: 'p4', name: 'Ananya Gupta', department: 'Radiology', status: 'Waiting', date: '2025-09-18', time: '12:05 PM' },
  { id: 'p5', name: 'Arjun Singh', department: 'Orthopedics', status: 'Discharged', date: '2025-09-18', time: '01:05 PM' },
  { id: 'p6', name: 'Kavita Reddy', department: 'General Surgery', status: 'Treating', date: '2025-09-18', time: '02:10 PM' },
  { id: 'p7', name: 'Vikram Joshi', department: 'Endocrinology', status: 'Waiting', date: '2025-09-18', time: '03:25 PM' },
  { id: 'p8', name: 'Meera Iyer', department: 'Cardiology', status: 'Discharged', date: '2025-09-18', time: '09:45 AM' },
  { id: 'p9', name: 'Aditya Malhotra', department: 'Neurology', status: 'Treating', date: '2025-09-18', time: '10:15 AM' },
  { id: 'p10', name: 'Neha Choudhary', department: 'Emergency', status: 'Waiting', date: '2025-09-18', time: '11:30 AM' },
  { id: 'p11', name: 'Rahul Desai', department: 'Radiology', status: 'Treating', date: '2025-09-18', time: '12:35 PM' },
  { id: 'p12', name: 'Pooja Mehta', department: 'Orthopedics', status: 'Discharged', date: '2025-09-18', time: '01:55 PM' },
  { id: 'p13', name: 'Vivek Nair', department: 'General Surgery', status: 'Waiting', date: '2025-09-18', time: '02:40 PM' },
  { id: 'p14', name: 'Shreya Menon', department: 'Endocrinology', status: 'Treating', date: '2025-09-18', time: '03:15 PM' },
  { id: 'p15', name: 'Rajeev Khanna', department: 'Cardiology', status: 'Discharged', date: '2025-09-18', time: '10:05 AM' },
  { id: 'p16', name: 'Anjali Kapoor', department: 'Neurology', status: 'Waiting', date: '2025-09-18', time: '11:45 AM' },
  { id: 'p17', name: 'Suresh Iyengar', department: 'Emergency', status: 'Treating', date: '2025-09-18', time: '12:25 PM' },
  { id: 'p18', name: 'Deepika Chawla', department: 'Radiology', status: 'Discharged', date: '2025-09-18', time: '01:35 PM' },
  { id: 'p19', name: 'Amit Trivedi', department: 'Orthopedics', status: 'Waiting', date: '2025-09-18', time: '02:50 PM' },
  { id: 'p20', name: 'Sunita Venkatesh', department: 'General Surgery', status: 'Treating', date: '2025-09-18', time: '03:40 PM' },
];

const statusChip = (status: PatientStatus) => {
  switch (status) {
    case 'Treating':
      return 'bg-blue-100 text-blue-700';
    case 'Waiting':
      return 'bg-yellow-100 text-yellow-700';
    case 'Discharged':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const PatientsPage = () => {
  const goHome = () => {
    window.location.hash = '#/'
  };

  const [patients, setPatients] = useState<PatientRecord[]>(samplePatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'All'>('All');

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState<PatientStatus>('All');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  // Filter patients based on search term and status filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = searchTerm === '' || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.date.includes(searchTerm) ||
      patient.time.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const addPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) return;
    const newPatient: PatientRecord = {
      id: `p${Date.now()}`,
      name: name.trim(),
      department: department.trim(),
      status,
      date: date || new Date().toISOString().slice(0, 10),
      time: time || new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    };
    setPatients([newPatient, ...patients]);
    setName('');
    setDepartment('');
    setStatus('Waiting');
    setDate('');
    setTime('');
  };

  const total = patients.length;
  const treating = patients.filter(p => p.status === 'Treating').length;
  const waiting = patients.filter(p => p.status === 'Waiting').length;
  const discharged = patients.filter(p => p.status === 'Discharged').length;

  // Open patient details modal
  const openPatientDetails = (patient: PatientRecord) => {
    setSelectedPatient(patient);
  };

  // Close patient details modal
  const closePatientDetails = () => {
    setSelectedPatient(null);
  };

  // Patient Details Modal
  const PatientDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedPatient?.name}</h2>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedPatient?.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                  selectedPatient?.status === 'Treating' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedPatient?.status}
                </span>
              </div>
            </div>
            <button 
              onClick={closePatientDetails}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Patient Name</h3>
                <p className="text-sm text-gray-900">{selectedPatient?.name}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p className="text-sm text-gray-900">{selectedPatient?.department}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <StatusIcon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="text-sm text-gray-900">{selectedPatient?.status}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-sm text-gray-900">{selectedPatient?.date}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Time</h3>
                <p className="text-sm text-gray-900">{selectedPatient?.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {selectedPatient && <PatientDetailsModal />}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
            <Activity className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Patients Overview</h2>
        </div>
        <button 
          onClick={goHome} 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      {/* Summary cards */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-gray-100 bg-gray-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <p className="text-xs text-gray-500">Total Patients</p>
          <p className="text-xl font-semibold text-gray-900">{total}</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-100 bg-blue-50/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <p className="text-xs text-blue-700">Treating</p>
          <p className="text-xl font-semibold text-blue-900">{treating}</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-100 bg-yellow-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <p className="text-xs text-yellow-700">Waiting</p>
          <p className="text-xl font-semibold text-yellow-900">{waiting}</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-100 bg-green-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <p className="text-xs text-green-700">Discharged</p>
          <p className="text-xl font-semibold text-green-900">{discharged}</p>
        </div>
      </div>

      {/* Add New Patient */}
      <form onSubmit={addPatient} className="p-4 grid grid-cols-1 md:grid-cols-6 gap-3 border-b border-gray-100">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <select value={status} onChange={(e) => setStatus(e.target.value as PatientStatus)} className="px-3 py-2 border rounded-md bg-white">
          <option value="All">All Status</option>
          <option value="Waiting">Waiting</option>
          <option value="Treating">Treating</option>
          <option value="Discharged">Discharged</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 border rounded-md" />
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time (e.g., 02:10 PM)" className="px-3 py-2 border rounded-md" />
        <button 
          type="submit" 
          className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Add Patient
        </button>
      </form>

      {/* Search and Filter Bar */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="min-w-[180px]">
            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PatientStatus | 'All')}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="All">All Status</option>
              <option value="Waiting">Waiting</option>
              <option value="Treating">Treating</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-4 pt-0 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Department</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-sm">No patients found. Try adjusting your search.</p>
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear search
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filteredPatients.map((p, idx) => (
              <tr 
                key={p.id} 
                className="text-sm text-gray-800 transition-colors duration-150 hover:bg-blue-50/30 cursor-pointer"
                onClick={() => openPatientDetails(p)}
              >
                <td className={`py-3 pr-4 ${idx !== patients.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="font-medium">{p.name}</div>
                </td>
                <td className={`py-3 pr-4 ${idx !== patients.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="text-gray-600">{p.department}</div>
                </td>
                <td className={`py-3 pr-4 ${idx !== patients.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusChip(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className={`py-3 pr-4 ${idx !== patients.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="text-gray-600">{p.date}</div>
                </td>
                <td className={`py-3 pr-4 ${idx !== patients.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="text-gray-600">{p.time}</div>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;
