import { useState } from 'react';
import { Activity, ArrowLeft } from 'lucide-react';

export type PatientStatus = 'Treating' | 'Waiting' | 'Discharged';

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

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState<PatientStatus>('Waiting');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.department.toLowerCase().includes(searchLower) ||
      patient.status.toLowerCase().includes(searchLower) ||
      patient.date.includes(searchTerm) ||
      patient.time.toLowerCase().includes(searchLower)
    );
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
          <option value="Treating">Treating</option>
          <option value="Waiting">Waiting</option>
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

      {/* Search Bar */}
      <div className="px-4 pb-2">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name, department, status..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
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
              <tr key={p.id} className="text-sm text-gray-800 transition-colors duration-150 hover:bg-blue-50/30 cursor-pointer">
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
