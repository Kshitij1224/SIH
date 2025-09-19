import { Stethoscope, ArrowLeft, Pencil, X, Save } from 'lucide-react';
import { useState } from 'react';

export type DepartmentRecord = {
  id: string;
  name: string;
  doctors: number;
  patients: number;
  beds: number;
  icuBeds: number;
  opdHours: string; // e.g., "Mon-Sat, 9:00 AM - 5:00 PM"
  head: string; // Head of Department
  phone: string; // Department contact
  location: string; // Floor/Wing
  emergency: boolean; // Emergency support available
  load: 'Low' | 'Normal' | 'Medium' | 'High';
};

const sampleDepartments: DepartmentRecord[] = [
  { id: 'dep1', name: 'Cardiology', doctors: 18, patients: 64, beds: 40, icuBeds: 8, opdHours: 'Mon-Sat, 9:00 AM - 5:00 PM', head: 'Dr. Arjun Mehta', phone: '+91-011-4000-1001', location: 'Block A, 3rd Floor', emergency: true, load: 'High' },
  { id: 'dep2', name: 'Neurology', doctors: 11, patients: 30, beds: 28, icuBeds: 4, opdHours: 'Mon-Sat, 10:00 AM - 4:00 PM', head: 'Dr. Kavita Rao', phone: '+91-011-4000-1002', location: 'Block B, 2nd Floor', emergency: true, load: 'Normal' },
  { id: 'dep3', name: 'Pediatrics', doctors: 14, patients: 52, beds: 32, icuBeds: 2, opdHours: 'Mon-Sat, 9:00 AM - 6:00 PM', head: 'Dr. Neha Kapoor', phone: '+91-011-4000-1003', location: 'Block C, 1st Floor', emergency: true, load: 'Medium' },
  { id: 'dep4', name: 'Emergency', doctors: 22, patients: 78, beds: 24, icuBeds: 6, opdHours: '24x7', head: 'Dr. Rohan Iyer', phone: '+91-011-4000-1004', location: 'Ground Floor, ER Wing', emergency: true, load: 'High' },
  { id: 'dep5', name: 'Orthopedics', doctors: 13, patients: 36, beds: 26, icuBeds: 0, opdHours: 'Mon-Sat, 9:30 AM - 5:30 PM', head: 'Dr. Sneha Kulkarni', phone: '+91-011-4000-1005', location: 'Block A, 4th Floor', emergency: false, load: 'Normal' },
  { id: 'dep6', name: 'Gynecology', doctors: 12, patients: 40, beds: 30, icuBeds: 2, opdHours: 'Mon-Sat, 9:00 AM - 5:00 PM', head: 'Dr. Priya Sharma', phone: '+91-011-4000-1006', location: 'Block C, 2nd Floor', emergency: true, load: 'Medium' },
  { id: 'dep7', name: 'Oncology', doctors: 10, patients: 34, beds: 22, icuBeds: 2, opdHours: 'Mon-Fri, 10:00 AM - 5:00 PM', head: 'Dr. Vivek Khanna', phone: '+91-011-4000-1007', location: 'Block B, 4th Floor', emergency: true, load: 'High' },
  { id: 'dep8', name: 'Nephrology', doctors: 9, patients: 27, beds: 18, icuBeds: 2, opdHours: 'Mon-Sat, 9:00 AM - 4:00 PM', head: 'Dr. Sanjay Patel', phone: '+91-011-4000-1008', location: 'Block A, 2nd Floor', emergency: false, load: 'Medium' },
  { id: 'dep9', name: 'Gastroenterology', doctors: 8, patients: 24, beds: 16, icuBeds: 1, opdHours: 'Mon-Sat, 10:00 AM - 5:00 PM', head: 'Dr. Meera Nair', phone: '+91-011-4000-1009', location: 'Block D, 3rd Floor', emergency: false, load: 'Normal' },
  { id: 'dep10', name: 'Dermatology', doctors: 6, patients: 18, beds: 12, icuBeds: 0, opdHours: 'Mon-Sat, 10:00 AM - 4:00 PM', head: 'Dr. Ritu Malhotra', phone: '+91-011-4000-1010', location: 'Block C, Ground Floor', emergency: false, load: 'Normal' },
  { id: 'dep11', name: 'Radiology', doctors: 7, patients: 20, beds: 10, icuBeds: 0, opdHours: 'Mon-Sat, 8:00 AM - 8:00 PM', head: 'Dr. Kunal Singh', phone: '+91-011-4000-1011', location: 'Block B, Ground Floor', emergency: true, load: 'Normal' },
  { id: 'dep12', name: 'Anesthesiology', doctors: 12, patients: 0, beds: 0, icuBeds: 0, opdHours: 'On Call', head: 'Dr. Shreya Menon', phone: '+91-011-4000-1012', location: 'Operating Theatres', emergency: true, load: 'Normal' },
  { id: 'dep13', name: 'Urology', doctors: 7, patients: 19, beds: 14, icuBeds: 1, opdHours: 'Mon-Sat, 9:30 AM - 5:00 PM', head: 'Dr. Manish Suri', phone: '+91-011-4000-1013', location: 'Block D, 2nd Floor', emergency: false, load: 'Medium' },
  { id: 'dep14', name: 'ENT', doctors: 5, patients: 16, beds: 10, icuBeds: 0, opdHours: 'Mon-Sat, 9:00 AM - 3:00 PM', head: 'Dr. Aparna Das', phone: '+91-011-4000-1014', location: 'Block A, 1st Floor', emergency: false, load: 'Normal' },
  { id: 'dep15', name: 'Pulmonology', doctors: 9, patients: 29, beds: 20, icuBeds: 2, opdHours: 'Mon-Sat, 9:00 AM - 5:00 PM', head: 'Dr. Imran Qureshi', phone: '+91-011-4000-1015', location: 'Block B, 3rd Floor', emergency: true, load: 'Medium' },
];

const loadChip = (load: DepartmentRecord['load']) => {
  switch (load) {
    case 'High':
      return 'bg-red-100 text-red-700';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'Normal':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<DepartmentRecord[]>(sampleDepartments);
  const [editingDept, setEditingDept] = useState<DepartmentRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept => {
    const searchLower = searchTerm.toLowerCase();
    return (
      dept.name.toLowerCase().includes(searchLower) ||
      dept.head.toLowerCase().includes(searchLower) ||
      dept.location.toLowerCase().includes(searchLower) ||
      dept.phone.includes(searchTerm) ||
      dept.opdHours.toLowerCase().includes(searchLower)
    );
  });

  const goHome = () => {
    window.location.hash = '/';
  };

  const handleEdit = (dept: DepartmentRecord) => {
    setEditingDept({...dept});
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingDept) return;
    
    setDepartments(departments.map(d => 
      d.id === editingDept.id ? editingDept : d
    ));
    setIsEditing(false);
    setEditingDept(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingDept) return;
    
    const { name, value, type } = e.target as HTMLInputElement;
    
    setEditingDept({
      ...editingDept,
      [name]: type === 'number' ? parseInt(value) || 0 : 
              name === 'emergency' ? (e.target as HTMLInputElement).checked :
              value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
            <Stethoscope className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Departments Overview</h2>
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search departments by name, head, location, or phone..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2 pr-4 font-medium">Department</th>
                <th className="py-2 pr-4 font-medium">Doctors</th>
                <th className="py-2 pr-4 font-medium">Patients</th>
                <th className="py-2 pr-4 font-medium">Beds</th>
                <th className="py-2 pr-4 font-medium">ICU Beds</th>
                <th className="py-2 pr-4 font-medium">OPD Hours</th>
                <th className="py-2 pr-4 font-medium">HOD</th>
                <th className="py-2 pr-4 font-medium">Contact</th>
                <th className="py-2 pr-4 font-medium">Location</th>
                <th className="py-2 pr-4 font-medium">Emergency</th>
                <th className="py-2 pr-4 font-medium">Load</th>
                <th className="py-2 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((d, idx) => (
                <tr key={d.id} className="text-sm text-gray-800 transition-colors duration-150 hover:bg-blue-50/30">
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.name}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.doctors}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.patients}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.beds}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.icuBeds}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.opdHours}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.head}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <a href={`tel:${d.phone.replace(/\s|\(|\)|-/g, '')}`} className="text-blue-600 hover:underline">{d.phone}</a>
                  </td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>{d.location}</td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${d.emergency ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {d.emergency ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${loadChip(d.load)}`}>{d.load}</span>
                  </td>
                  <td className={`py-3 pr-4 ${idx !== filteredDepartments.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <button
                      onClick={() => handleEdit(d)}
                      className="p-1.5 rounded-md text-gray-500 hover:bg-blue-100/50 hover:text-blue-600 transition-colors duration-150"
                      title="Edit department"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Department Modal */}
      {isEditing && editingDept && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Edit Department</h3>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingDept?.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  name="head"
                  value={editingDept?.head || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Doctors</label>
                <input
                  type="number"
                  name="doctors"
                  value={editingDept?.doctors || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={editingDept?.beds || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ICU Beds</label>
                <input
                  type="number"
                  name="icuBeds"
                  value={editingDept?.icuBeds || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OPD Hours</label>
                <input
                  type="text"
                  name="opdHours"
                  value={editingDept?.opdHours || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editingDept?.phone || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editingDept?.location || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emergency"
                  name="emergency"
                  checked={editingDept?.emergency || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emergency" className="ml-2 block text-sm text-gray-700">
                  Emergency Support Available
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workload</label>
                <select
                  name="load"
                  value={editingDept?.load || 'Normal'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default DepartmentsPage;
