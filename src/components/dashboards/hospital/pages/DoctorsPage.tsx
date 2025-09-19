import { useState } from 'react';
import { Stethoscope, ArrowLeft, X, Phone, Calendar, Briefcase, MapPin } from 'lucide-react';

export type DoctorRecord = {
  id: string;
  name: string;
  department: string;
  specialty: string;
  experienceYears: number;
  degree: string; // e.g., MD, MS, DM, MCh
};

const sampleDoctors: DoctorRecord[] = [
  { id: 'doc1', name: 'Dr. Amit Verma', department: 'Cardiology', specialty: 'Interventional Cardiology', experienceYears: 12, degree: 'DM' },
  { id: 'doc2', name: 'Dr. Neha Sharma', department: 'Neurology', specialty: 'Stroke & Epilepsy', experienceYears: 10, degree: 'DM' },
  { id: 'doc3', name: 'Dr. Rakesh Mehta', department: 'Orthopedics', specialty: 'Joint Replacement', experienceYears: 15, degree: 'MS' },
  { id: 'doc4', name: 'Dr. Priya Nair', department: 'Pediatrics', specialty: 'Neonatology', experienceYears: 8, degree: 'MD' },
  { id: 'doc5', name: 'Dr. Arjun Singh', department: 'Emergency', specialty: 'Trauma Care', experienceYears: 9, degree: 'MD' },
  { id: 'doc6', name: 'Dr. Sana Khan', department: 'Gynecology', specialty: 'High-risk Pregnancy', experienceYears: 11, degree: 'MS' },
  { id: 'doc7', name: 'Dr. Vivek Rao', department: 'General Surgery', specialty: 'Laparoscopic Surgery', experienceYears: 13, degree: 'MS' },
  { id: 'doc8', name: 'Dr. Meera Iyer', department: 'Dermatology', specialty: 'Cosmetology', experienceYears: 7, degree: 'MD' },
  { id: 'doc9', name: 'Dr. Rajiv Khanna', department: 'Cardiology', specialty: 'Cardiac Electrophysiology', experienceYears: 14, degree: 'DM' },
  { id: 'doc10', name: 'Dr. Ananya Reddy', department: 'Neurology', specialty: 'Movement Disorders', experienceYears: 9, degree: 'DM' },
  { id: 'doc11', name: 'Dr. Vikram Patel', department: 'Orthopedics', specialty: 'Spine Surgery', experienceYears: 16, degree: 'MCh' },
  { id: 'doc12', name: 'Dr. Kavita Joshi', department: 'Pediatrics', specialty: 'Pediatric Cardiology', experienceYears: 10, degree: 'DM' },
  { id: 'doc13', name: 'Dr. Rohit Malhotra', department: 'Emergency', specialty: 'Critical Care', experienceYears: 8, degree: 'MD' },
  { id: 'doc14', name: 'Dr. Anjali Desai', department: 'Gynecology', specialty: 'Fertility Specialist', experienceYears: 12, degree: 'DGO' },
  { id: 'doc15', name: 'Dr. Sanjay Kapoor', department: 'General Surgery', specialty: 'Gastrointestinal Surgery', experienceYears: 15, degree: 'MCh' },
  { id: 'doc16', name: 'Dr. Nandini Choudhary', department: 'Dermatology', specialty: 'Dermatosurgery', experienceYears: 6, degree: 'MD' },
  { id: 'doc17', name: 'Dr. Aditya Menon', department: 'Cardiology', specialty: 'Pediatric Cardiology', experienceYears: 11, degree: 'DM' },
  { id: 'doc18', name: 'Dr. Sunita Venkatesh', department: 'Neurology', specialty: 'Headache Specialist', experienceYears: 13, degree: 'DM' },
  { id: 'doc9', name: 'Dr. Karan Malhotra', department: 'Radiology', specialty: 'Interventional Radiology', experienceYears: 10, degree: 'MD' },
  { id: 'doc10', name: 'Dr. Ananya Bose', department: 'Anesthesiology', specialty: 'Cardiac Anesthesia', experienceYears: 9, degree: 'MD' },
  { id: 'doc11', name: 'Dr. Rohit Gupta', department: 'Nephrology', specialty: 'Dialysis & Transplant', experienceYears: 14, degree: 'DM' },
  { id: 'doc12', name: 'Dr. Nidhi Kulkarni', department: 'Endocrinology', specialty: 'Diabetes & Thyroid', experienceYears: 8, degree: 'DM' },
];

// Doctor Details Component
const DoctorDetails = ({ doctor, onClose }: { doctor: DoctorRecord | null, onClose: () => void }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
              <p className="text-lg text-blue-600">{doctor.specialty}</p>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {doctor.department} Department
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Professional Information
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Specialization:</span> {doctor.specialty}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Department:</span> {doctor.department}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {doctor.experienceYears} years
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Qualification:</span> {doctor.degree}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Availability
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Monday - Friday:</span> 9:00 AM - 5:00 PM
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Saturday:</span> 9:00 AM - 1:00 PM
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Emergency:</span> On-call
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a 
              href="tel:+911234567890" 
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorsPage: React.FC = () => {
  const goHome = () => {
    window.location.hash = '/';
  };
  
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorRecord | null>(null);

  const [doctors, setDoctors] = useState<DoctorRecord[]>(sampleDoctors);

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [degree, setDegree] = useState('');
  const [experienceYears, setExperienceYears] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Get unique departments and specialties for filters
  const departments = Array.from(new Set(doctors.map(doc => doc.department))).sort();
  const specialties = Array.from(new Set(doctors.map(doc => doc.specialty))).sort();

  // Filter doctors based on search term and selected filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.experienceYears.toString().includes(searchTerm);
      
    const matchesDepartment = !selectedDepartment || doctor.department === selectedDepartment;
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesDepartment && matchesSpecialty;
  });

  // Reset specialty filter when department changes if needed
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    // Reset specialty filter if the selected department doesn't have the current specialty
    if (selectedSpecialty && !filteredDoctors.some(doc => doc.specialty === selectedSpecialty)) {
      setSelectedSpecialty('');
    }
  };

  const addDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !department.trim() || !specialty.trim() || !degree) return;
    const newDoc: DoctorRecord = {
      id: `doc${Date.now()}`,
      name: name.trim(),
      department: department.trim(),
      specialty: specialty.trim(),
      degree: degree.trim(),
      experienceYears: Math.max(0, Number(experienceYears) || 0), // Convert empty string to 0
    };
    setDoctors([newDoc, ...doctors]);
    setName('');
    setDepartment('');
    setSpecialty('');
    setDegree('');
    setExperienceYears('');
  };

  return (
    <>
      {selectedDoctor && (
        <DoctorDetails 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
            <Stethoscope className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Doctors Directory</h2>
        </div>
        <button 
          onClick={goHome} 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      {/* Add New Doctor */}
      <form onSubmit={addDoctor} className="p-4 grid grid-cols-1 md:grid-cols-6 gap-3 border-b border-gray-100">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Specialty" className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <select 
          value={degree} 
          onChange={(e) => setDegree(e.target.value)} 
          className="px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">Select Degree</option>
          <option value="MD">MD (Doctor of Medicine)</option>
          <option value="MS">MS (Master of Surgery)</option>
          <option value="DM">DM (Doctorate of Medicine)</option>
          <option value="MCh">MCh (Master of Chirurgiae)</option>
        </select>
        <input 
      type="number" 
      min="0" 
      value={experienceYears} 
      onChange={(e) => setExperienceYears(e.target.value === '' ? '' : parseInt(e.target.value) || 0)} 
      placeholder="Experience (yrs)" 
      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
    />
        <button 
          type="submit" 
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Add Doctor
        </button>
      </form>

      {/* Search and Filter Section */}
      <div className="px-4 pb-4 space-y-4">
        {/* Search Bar */}
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
            placeholder="Search doctors by name, department, or specialty..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              id="department-filter"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select
              id="specialty-filter"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              disabled={!selectedDepartment && departments.length > 0}
            >
              <option value="">All Specialties</option>
              {specialties
                .filter(spec => !selectedDepartment || doctors.some(doc => doc.department === selectedDepartment && doc.specialty === spec))
                .map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
            </select>
          </div>

          {(selectedDepartment || selectedSpecialty) && (
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedDepartment('');
                  setSelectedSpecialty('');
                }}
                className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Department</th>
              <th className="py-2 pr-4 font-medium">Specialty</th>
              <th className="py-2 pr-4 font-medium">Qualification</th>
              <th className="py-2 pr-4 font-medium">Experience</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, idx) => (
              <tr 
                key={doctor.id} 
                className="text-sm text-gray-800 hover:bg-blue-50/30 transition-colors cursor-pointer"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <td className={`py-3 pr-4 ${idx !== filteredDoctors.length - 1 ? 'border-b border-gray-100' : ''} font-medium text-blue-600`}>
                  {doctor.name}
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredDoctors.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  {doctor.department}
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredDoctors.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {doctor.specialty}
                  </span>
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredDoctors.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                    {doctor.degree}
                  </span>
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredDoctors.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center">
                    <span className="text-gray-600">{doctor.experienceYears} years</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export default DoctorsPage;
