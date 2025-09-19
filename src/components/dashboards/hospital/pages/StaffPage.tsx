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
  // Housekeeping
  { id: 's1', name: 'Ramesh Kumar', department: 'Housekeeping', age: 40, experienceYears: 12 },
  { id: 's9', name: 'Sunita Devi', department: 'Housekeeping', age: 38, experienceYears: 8 },
  { id: 's10', name: 'Vijay Singh', department: 'Housekeeping', age: 45, experienceYears: 15 },
  { id: 's11', name: 'Meena Kumari', department: 'Housekeeping', age: 32, experienceYears: 5 },
  
  // Reception
  { id: 's2', name: 'Seema Joshi', department: 'Reception', age: 28, experienceYears: 5 },
  { id: 's12', name: 'Arjun Reddy', department: 'Reception', age: 26, experienceYears: 3 },
  { id: 's13', name: 'Priya Nair', department: 'Reception', age: 30, experienceYears: 6 },
  
  // Security
  { id: 's3', name: 'Anil Gupta', department: 'Security', age: 35, experienceYears: 9 },
  { id: 's14', name: 'Rajesh Yadav', department: 'Security', age: 42, experienceYears: 12 },
  { id: 's15', name: 'Suresh Kumar', department: 'Security', age: 38, experienceYears: 10 },
  
  // Maintenance
  { id: 's4', name: 'Rahul Mehta', department: 'Maintenance', age: 38, experienceYears: 11 },
  { id: 's16', name: 'Amit Patel', department: 'Maintenance', age: 45, experienceYears: 15 },
  { id: 's17', name: 'Deepak Sharma', department: 'Maintenance', age: 40, experienceYears: 12 },
  
  // Billing
  { id: 's5', name: 'Priti Deshmukh', department: 'Billing', age: 31, experienceYears: 7 },
  { id: 's18', name: 'Neha Gupta', department: 'Billing', age: 29, experienceYears: 5 },
  { id: 's19', name: 'Ravi Verma', department: 'Billing', age: 34, experienceYears: 8 },
  
  // Pharmacy
  { id: 's6', name: 'Saurabh Patil', department: 'Pharmacy', age: 29, experienceYears: 6 },
  { id: 's20', name: 'Anjali Iyer', department: 'Pharmacy', age: 27, experienceYears: 4 },
  { id: 's21', name: 'Vikram Rao', department: 'Pharmacy', age: 32, experienceYears: 7 },
  
  // Laboratory
  { id: 's7', name: 'Anita Paul', department: 'Laboratory', age: 33, experienceYears: 8 },
  { id: 's22', name: 'Rajeev Menon', department: 'Laboratory', age: 35, experienceYears: 9 },
  { id: 's23', name: 'Divya Nair', department: 'Laboratory', age: 30, experienceYears: 6 },
  
  // Transport
  { id: 's8', name: 'Mohit Sharma', department: 'Transport', age: 42, experienceYears: 15 },
  { id: 's24', name: 'Sanjay Kumar', department: 'Transport', age: 45, experienceYears: 12 },
  { id: 's25', name: 'Rahul Singh', department: 'Transport', age: 39, experienceYears: 10 },
  
  // Additional Departments
  // Nursing
  { id: 's26', name: 'Ananya Reddy', department: 'Nursing', age: 28, experienceYears: 5 },
  { id: 's27', name: 'Kavita Sharma', department: 'Nursing', age: 32, experienceYears: 8 },
  { id: 's28', name: 'Preeti Joshi', department: 'Nursing', age: 29, experienceYears: 6 },
  
  // Administration
  { id: 's29', name: 'Arun Khanna', department: 'Administration', age: 45, experienceYears: 15 },
  { id: 's30', name: 'Neeta Kapoor', department: 'Administration', age: 42, experienceYears: 14 },
  
  // IT Support
  { id: 's31', name: 'Rohit Malhotra', department: 'IT Support', age: 35, experienceYears: 9 },
  { id: 's32', name: 'Ayesha Khan', department: 'IT Support', age: 30, experienceYears: 6 },
  
  // Cafeteria
  { id: 's33', name: 'Ramesh Iyer', department: 'Cafeteria', age: 48, experienceYears: 12 },
  { id: 's34', name: 'Lakshmi Nair', department: 'Cafeteria', age: 42, experienceYears: 10 },
  
  // Human Resources
  { id: 's35', name: 'Meera Kapoor', department: 'Human Resources', age: 38, experienceYears: 11 },
  { id: 's36', name: 'Vikram Singh', department: 'Human Resources', age: 40, experienceYears: 12 }
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
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Get unique departments for filter dropdown
  const departments = ['All', ...new Set(staff.map(staff => staff.department))];
  const statuses = ['All', 'Active', 'Inactive'];

  // Filter staff based on search term and filters
  const filteredStaff = staff.filter(staff => {
    const matchesSearch = searchTerm === '' || 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.age.toString().includes(searchTerm) ||
      staff.experienceYears.toString().includes(searchTerm);

    const matchesDepartment = departmentFilter === 'All' || staff.department === departmentFilter;
    // For demo purposes, considering experience > 0 as 'Active', you can modify this logic based on your needs
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && staff.experienceYears > 0) ||
      (statusFilter === 'Inactive' && staff.experienceYears === 0);
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

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

  // Function to determine if staff is active
  const isStaffActive = (experienceYears: number) => experienceYears > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-green-50 text-green-600">
            <Users className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Support Staff Directory</h2>
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      {/* Add New Staff */}
      <form onSubmit={addStaff} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3 border-b border-gray-100">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input 
          type="number" 
          min={0} 
          value={age || ''} 
          onChange={(e) => setAge(parseInt(e.target.value || '0'))} 
          placeholder="age" 
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
        />
        <input 
          type="number" 
          min={0} 
          value={experienceYears || ''} 
          onChange={(e) => setExperienceYears(parseInt(e.target.value || '0'))} 
          placeholder="Experience (yrs)" 
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">Add Staff</button>
      </form>

      {/* Search and Filter Bar */}
      <div className="px-4 pb-2">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Department Filter */}
          <div className="w-full sm:w-48">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-32">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Department</th>
              <th className="py-2 pr-4 font-medium">Age</th>
              <th className="py-2 pr-4 font-medium">Experience</th>
              <th className="py-2 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No staff members found matching your search.
                </td>
              </tr>
            ) : (
              filteredStaff.map((n, idx) => (
              <tr key={n.id} className="text-sm text-gray-800">
                <td className={`py-3 pr-4 ${idx !== filteredStaff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.name}</td>
                <td className={`py-3 pr-4 ${idx !== filteredStaff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.department}</td>
                <td className={`py-3 pr-4 ${idx !== filteredStaff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.age}</td>
                <td className={`py-3 pr-4 ${idx !== filteredStaff.length - 1 ? 'border-b border-gray-100' : ''}`}>{n.experienceYears} years</td>
                <td className={`py-3 pr-4 ${idx !== filteredStaff.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isStaffActive(n.experienceYears) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isStaffActive(n.experienceYears) ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            )))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
