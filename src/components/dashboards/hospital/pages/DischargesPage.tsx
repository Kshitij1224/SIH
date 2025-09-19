import React from 'react';
import { type AdmissionRecord } from '../AdmissionsModal';
import { ArrowLeft } from 'lucide-react';

// Mock monthly data. In a real app, fetch this from an API with month filters.
const monthlyDischarges: AdmissionRecord[] = [
  { id: 'm1', patient: 'Noah Wilson', date: '2025-09-01', time: '10:10 AM', doctor: 'Dr. Singh', reason: 'Recovered – Pneumonia' },
  { id: 'm2', patient: 'Emma Garcia', date: '2025-09-03', time: '11:25 AM', doctor: 'Dr. Lopez', reason: 'Post-op Observation Complete' },
  { id: 'm3', patient: 'Olivia Martinez', date: '2025-09-05', time: '01:50 PM', doctor: 'Dr. Khan', reason: 'Stabilized – Dehydration' },
  { id: 'm4', patient: 'William Anderson', date: '2025-09-08', time: '03:05 PM', doctor: 'Dr. Brown', reason: 'Fracture Managed' },
  { id: 'm5', patient: 'Sophia Lee', date: '2025-09-10', time: '09:35 AM', doctor: 'Dr. Patel', reason: 'Observation Complete' },
  { id: 'm6', patient: 'Liam Davis', date: '2025-09-12', time: '12:40 PM', doctor: 'Dr. Kim', reason: 'Recovered – Respiratory Infection' },
  { id: 'm7', patient: 'Ava Johnson', date: '2025-09-14', time: '04:15 PM', doctor: 'Dr. Rahman', reason: 'Stabilized – Fracture' },
  { id: 'm8', patient: 'Ethan Clark', date: '2025-09-16', time: '02:10 PM', doctor: 'Dr. Smith', reason: 'Routine Post-op Discharge' },
  { id: 'm9', patient: 'Mia Rodriguez', date: '2025-09-17', time: '05:05 PM', doctor: 'Dr. Chen', reason: 'Monitoring Complete' },
];

const DischargesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monthly Discharges</h1>
          <p className="text-gray-600">Showing all patient discharges for the current month</p>
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
              {monthlyDischarges.map((r, idx) => (
                <tr key={r.id} className="text-sm text-gray-800">
                  <td className={`py-3 pr-4 ${idx !== monthlyDischarges.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.patient}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyDischarges.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.date}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyDischarges.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.time}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyDischarges.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.doctor}</td>
                  <td className={`py-3 pr-4 ${idx !== monthlyDischarges.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DischargesPage;
