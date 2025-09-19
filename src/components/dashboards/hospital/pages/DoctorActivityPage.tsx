import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';

type ActivityRecord = {
  id: string;
  name: string; // doctor name
  department: string;
  patient: string; // '-' if none
  action: string;
  time: string;
};

const sampleDoctorActivity: ActivityRecord[] = [
  { id: 'act1', name: 'Dr. Anya Sharma', department: 'Cardiology', patient: 'Rahul Mehta', action: 'Treated patient', time: '09:30 AM' },
  { id: 'act2', name: 'Dr. Kevin Chen', department: 'Neurology', patient: '-', action: 'Completed rounds', time: '10:15 AM' },
  { id: 'act3', name: "Dr. Jessica O'Connor", department: 'Emergency', patient: 'Aarti Singh', action: 'Treated patient', time: '11:50 AM' },
  { id: 'act4', name: 'Dr. Priyanka Rao', department: 'Radiology', patient: '-', action: 'Reviewed lab reports', time: '12:25 PM' },
  { id: 'act5', name: 'Dr. Rahul Saini', department: 'Orthopedics', patient: 'Mohit Kumar', action: 'Treated patient', time: '01:10 PM' },
  { id: 'act6', name: 'Dr. Meera Joshi', department: 'Pediatrics', patient: '-', action: 'Consulted parents', time: '01:45 PM' },
  { id: 'act7', name: 'Dr. Rohan Kulkarni', department: 'Pulmonology', patient: 'Neeraj Verma', action: 'Treated patient', time: '02:20 PM' },
  { id: 'act8', name: 'Dr. Arvind Nair', department: 'Gastroenterology', patient: '-', action: 'Performed endoscopy', time: '03:05 PM' },
];

const DoctorActivityPage: React.FC = () => {
  const goHome = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
            <Activity className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Activity</h1>
        </div>
        <button onClick={goHome} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
          <ArrowLeft className="inline-block w-4 h-4 mr-1 align-[-2px]" /> Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2 pr-4 font-medium">Doctor</th>
                <th className="py-2 pr-4 font-medium">Department</th>
                <th className="py-2 pr-4 font-medium">Patient</th>
                <th className="py-2 pr-4 font-medium">Action</th>
                <th className="py-2 pr-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {sampleDoctorActivity.map((r, idx) => (
                <tr key={r.id} className="text-sm text-gray-800">
                  <td className={`py-3 pr-4 ${idx !== sampleDoctorActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.name}</td>
                  <td className={`py-3 pr-4 ${idx !== sampleDoctorActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.department}</td>
                  <td className={`py-3 pr-4 ${idx !== sampleDoctorActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.patient}</td>
                  <td className={`py-3 pr-4 ${idx !== sampleDoctorActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.action}</td>
                  <td className={`py-3 pr-4 ${idx !== sampleDoctorActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorActivityPage;
