import { useState } from 'react';
import { Users, ArrowLeft } from 'lucide-react';

export type StaffRecord = {
  id: string;
  name: string;
  department: string; // e.g., Housekeeping, Security, Admin
  age: number;
  experienceYears: number;
};

const sampleStaff: StaffRecord[] = [
  { id: 's1', name: 'Ramesh Kumar', department: 'Housekeeping', age: 40, experienceYears: 12 },
  { id: 's2', name: 'Seema Joshi', department: 'Reception', age: 28, experienceYears: 5 },
  { id: 's3', name: 'Anil Gupta', department: 'Security', age: 35, experienceYears: 9 },
  { id: 's4', name: 'Rahul Mehta', department: 'Maintenance', age: 38, experienceYears: 11 },
  { id: 's5', name: 'Priti Deshmukh', department: 'Billing', age: 31, experienceYears: 7 },
  { id: 's6', name: 'Saurabh Patil', department: 'Pharmacy', age: 29, experienceYears: 6 },
  { id: 's7', name: 'Anita Paul', department: 'Laboratory', age: 33, experienceYears: 8 },
  { id: 's8', name: 'Mohit Sharma', department: 'Transport', age: 42, experienceYears: 15 },
];

 const StaffPage: React.FC = () => {
  const goHome = () => {
    window.location.hash = '#/';
  };

  const [staff, setStaff] = useState<StaffRecord[]>(sampleStaff);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [age, setAge] = useState<number>(0);
  const [experienceYears, setExperienceYears] = useState<number>(0);

  const addStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) return;
    const newStaff: StaffRecord = {
      id: `s${Date.now()}`,
      name: name.trim(),
      department: department.trim(),
      age: Math.max(0, Number(age) || 0),
      experienceYears: Math.max(0, Number(experienceYears) || 0),
    };
    setStaff([newStaff, ...staff]);
    setName('');
    setDepartment('');
    setAge(0);
    setExperienceYears(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-green-50 text-green-600">
            <Users className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Support Staff Directory</h2>
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      {/* Add New Staff */}
      <form onSubmit={addStaff} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3 border-b border-gray-100">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input type="number" min={0} value={age} onChange={(e) => setAge(parseInt(e.target.value || '0'))} placeholder="Age" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input type="number" min={0} value={experienceYears} onChange={(e) => setExperienceYears(parseInt(e.target.value || '0'))} placeholder="Experience (yrs)" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Add Staff</button>
      </form>

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
            {staff.map((n, idx) => (
              <tr key={n.id} className="text-sm text-gray-800">
                <td className={`py-3 pr-4 ${idx !== staff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.name}</td>
                <td className={`py-3 pr-4 ${idx !== staff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.department}</td>
                <td className={`py-3 pr-4 ${idx !== staff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.age}</td>
                <td className={`py-3 pr-4 ${idx !== staff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.experienceYears} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
