import React from 'react';
import { type AdmissionRecord } from '../AdmissionsModal';
import { ArrowLeft } from 'lucide-react';

// Mock monthly data for admissions. Replace with API data when available.
const monthlyAdmissions: AdmissionRecord[] = [
  { id: 'am1', patient: 'John Doe', date: '2025-09-01', time: '08:45 AM', doctor: 'Dr. Smith', reason: 'Chest Pain' },
  { id: 'am2', patient: 'Jane Williams', date: '2025-09-02', time: '10:20 AM', doctor: 'Dr. Chen', reason: 'High Fever' },
  { id: 'am3', patient: 'Michael Brown', date: '2025-09-05', time: '11:05 AM', doctor: 'Dr. Patel', reason: 'Dehydration' },
  { id: 'am4', patient: 'Ava Johnson', date: '2025-09-08', time: '12:20 PM', doctor: 'Dr. Rahman', reason: 'Fracture Assessment' },
  { id: 'am5', patient: 'Liam Davis', date: '2025-09-12', time: '01:30 PM', doctor: 'Dr. Kim', reason: 'Shortness of Breath' },
  { id: 'am6', patient: 'Sophia Lee', date: '2025-09-15', time: '02:55 PM', doctor: 'Dr. Patel', reason: 'Observation Required' },
  { id: 'am7', patient: 'Ethan Clark', date: '2025-09-17', time: '09:40 AM', doctor: 'Dr. Smith', reason: 'Post-op Monitoring' },
  { id: 'am8', patient: 'Mia Rodriguez', date: '2025-09-18', time: '04:05 PM', doctor: 'Dr. Chen', reason: 'Monitoring' },
];

const AdmissionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monthly Admissions</h1>
          <p className="text-gray-600">Showing all patient admissions for the current month</p>
        </div>
        <a
          href="#/"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2 pr-4 font-medium">Patient</th>
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Time</th>
                <th className="py-2 pr-4 font-medium">Assigned Doctor</th>
                <th className="py-2 pr-4 font-medium">Reason of Admission</th>
              </tr>
            </thead>
            <tbody>
              {monthlyAdmissions.map((r, idx) => (
                <tr key={r.id} className="text-sm text-gray-800">
                  <td className={`py-3 pr-4 ${idx !== monthlyAdmissions.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.patient}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyAdmissions.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.date}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyAdmissions.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.time}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyAdmissions.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.doctor}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyAdmissions.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;
