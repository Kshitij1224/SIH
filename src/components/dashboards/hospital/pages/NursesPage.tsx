import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';

export type NurseRecord = {
  id: string;
  name: string;
  department: string;
  age: number;
  experienceYears: number;
};

const sampleNurses: NurseRecord[] = [
  { id: 'n1', name: 'Anita Desai', department: 'ICU', age: 32, experienceYears: 8 },
  { id: 'n2', name: 'Kavya Rao', department: 'Emergency', age: 29, experienceYears: 6 },
  { id: 'n3', name: 'Shreya Patel', department: 'Pediatrics', age: 27, experienceYears: 4 },
  { id: 'n4', name: 'Meenakshi Iyer', department: 'Gynecology', age: 35, experienceYears: 11 },
  { id: 'n5', name: 'Pooja Singh', department: 'Cardiology', age: 31, experienceYears: 7 },
  { id: 'n6', name: 'Niharika Sharma', department: 'General Surgery', age: 33, experienceYears: 9 },
];

const NursesPage: React.FC = () => {
  const goHome = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-pink-50 text-pink-600">
            <Heart className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Nurses Directory</h2>
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="p-4 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Department</th>
              <th className="py-2 pr-4 font-medium">Age</th>
              <th className="py-2 pr-4 font-medium">Experience</th>
            </tr>
          </thead>
          <tbody>
            {sampleNurses.map((n, idx) => (
              <tr key={n.id} className="text-sm text-gray-800">
                <td className={`py-3 pr-4 ${idx !== sampleNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.name}</td>
                <td className={`py-3 pr-4 ${idx !== sampleNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.department}</td>
                <td className={`py-3 pr-4 ${idx !== sampleNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.age}</td>
                <td className={`py-3 pr-4 ${idx !== sampleNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.experienceYears} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NursesPage;
