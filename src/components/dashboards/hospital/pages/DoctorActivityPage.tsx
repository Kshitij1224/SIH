import React, { useState } from 'react';
import { Activity, ArrowLeft, Search, Filter } from 'lucide-react';

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
  { id: 'act9', name: 'Dr. Aishwarya Iyer', department: 'Dermatology', patient: 'Priya Patel', action: 'Performed skin biopsy', time: '09:00 AM' },
  { id: 'act10', name: 'Dr. Vikram Desai', department: 'Cardiothoracic', patient: '-', action: 'Performed bypass surgery', time: '10:30 AM' },
  { id: 'act11', name: 'Dr. Neha Gupta', department: 'Obstetrics', patient: 'Sunita Reddy', action: 'Delivered baby', time: '11:15 AM' },
  { id: 'act12', name: 'Dr. Rajiv Malhotra', department: 'Nephrology', patient: '-', action: 'Performed dialysis', time: '12:00 PM' },
  { id: 'act13', name: 'Dr. Anjali Kapoor', department: 'Oncology', patient: 'Ramesh Kumar', action: 'Administered chemotherapy', time: '12:45 PM' },
  { id: 'act14', name: 'Dr. Sanjay Mehta', department: 'Urology', patient: '-', action: 'Performed cystoscopy', time: '01:30 PM' },
  { id: 'act15', name: 'Dr. Preeti Nair', department: 'Endocrinology', patient: 'Suresh Menon', action: 'Adjusted insulin dosage', time: '02:15 PM' },
  { id: 'act16', name: 'Dr. Karthik Reddy', department: 'ENT', patient: '-', action: 'Performed hearing test', time: '03:00 PM' },
  { id: 'act17', name: 'Dr. Deepa Krishnan', department: 'Psychiatry', patient: 'Anita Desai', action: 'Therapy session', time: '03:45 PM' },
  { id: 'act18', name: 'Dr. Rohit Joshi', department: 'Orthopedics', patient: '-', action: 'Applied cast', time: '04:30 PM' },
  { id: 'act19', name: 'Dr. Shalini Nair', department: 'Pediatrics', patient: 'Rahul Sharma', action: 'Administered vaccination', time: '05:15 PM' },
  { id: 'act20', name: 'Dr. Amit Patel', department: 'Ophthalmology', patient: '-', action: 'Performed eye exam', time: '06:00 PM' },
  { id: 'act21', name: 'Dr. Priya Menon', department: 'Dermatology', patient: 'Kavita Nair', action: 'Prescribed medication', time: '08:30 AM' },
  { id: 'act22', name: 'Dr. Ravi Verma', department: 'Cardiology', patient: '-', action: 'Performed ECG', time: '09:45 AM' },
  { id: 'act23', name: 'Dr. Ananya Das', department: 'Neurology', patient: 'Vikram Singh', action: 'Reviewed MRI results', time: '10:30 AM' },
  { id: 'act24', name: 'Dr. Arjun Nambiar', department: 'General Surgery', patient: '-', action: 'Performed appendectomy', time: '11:45 AM' },
  { id: 'act25', name: 'Dr. Nandini Iyer', department: 'Gynecology', patient: 'Meera Krishnan', action: 'Prenatal checkup', time: '12:30 PM' },
  { id: 'act26', name: 'Dr. Suresh Nair', department: 'Urology', patient: '-', action: 'Performed ultrasound', time: '01:45 PM' },
  { id: 'act27', name: 'Dr. Anjali Menon', department: 'Pediatrics', patient: 'Rahul Nair', action: 'Treated fever', time: '02:30 PM' },
  { id: 'act28', name: 'Dr. Rajesh Namboothiri', department: 'Cardiology', patient: '-', action: 'Performed angioplasty', time: '03:45 PM' },
];

const DoctorActivityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  
  const goHome = () => {
    window.location.hash = '/';
  };

  // Get unique departments for filter
  const departments = ['All Departments', ...new Set(sampleDoctorActivity.map(activity => activity.department))];

  // Filter activities based on search term and department
  const filteredActivities = sampleDoctorActivity.filter(activity => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      activity.name.toLowerCase().includes(searchLower) ||
      activity.patient.toLowerCase().includes(searchLower) ||
      activity.department.toLowerCase().includes(searchLower) ||
      activity.action.toLowerCase().includes(searchLower);
    
    const matchesDepartment = departmentFilter === 'All Departments' || activity.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="w-[90%] mx-auto py-8">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
              <Activity className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Activity</h1>
          </div>
          <button onClick={goHome} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="inline-block w-4 h-4 mr-1 align-[-2px]" /> Back to Dashboard
          </button>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Department Filter */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-sm text-gray-600 bg-gray-50">
                <th className="py-3 px-4 font-medium">Doctor</th>
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium">Patient</th>
                <th className="py-3 px-4 font-medium">Action</th>
                <th className="py-3 px-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((r, idx) => {
                // Determine if the row has a patient or not for styling
                const hasPatient = r.patient !== '-';
                
                return (
                  <tr 
                    key={r.id} 
                    className={`text-sm text-gray-800 transition-all duration-200 
                      ${hasPatient ? 'hover:bg-blue-50' : 'hover:bg-gray-50'} 
                      ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                      group hover:shadow-md`}
                  >
                    <td className={`py-3 px-4 font-medium transition-all duration-200 group-hover:text-blue-700`}>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium mr-3 ${
                          hasPatient ? 'bg-blue-600' : 'bg-gray-400'
                        }`}>
                          {r.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium group-hover:text-blue-700 transition-colors duration-200">{r.name}</span>
                          <span className="text-xs text-gray-500">{r.time}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`py-3 px-4`}>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        r.department === 'Cardiology' || r.department === 'Neurology' || r.department === 'Emergency'
                          ? 'bg-red-100 text-red-800 group-hover:bg-red-200'
                          : r.department === 'Dermatology' || r.department === 'Radiology' || r.department === 'Ophthalmology'
                          ? 'bg-green-100 text-green-800 group-hover:bg-green-200'
                          : 'bg-blue-100 text-blue-800 group-hover:bg-blue-200'
                      } transition-colors duration-200`}>
                        {r.department}
                      </span>
                    </td>
                    <td className={`py-3 px-4 ${hasPatient ? 'font-medium text-gray-900' : 'text-gray-400'}`}>
                      {hasPatient ? (
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mr-2">
                            {r.patient.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                          </span>
                          {r.patient}
                        </div>
                      ) : (
                        <span className="inline-flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          {r.patient}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          r.action.toLowerCase().includes('treated') || r.action.toLowerCase().includes('performed')
                            ? 'bg-green-500'
                            : r.action.toLowerCase().includes('consulted') || r.action.toLowerCase().includes('reviewed')
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        }`}></span>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          {r.action}
                        </span>
                        {r.action.toLowerCase().includes('surgery') || r.action.toLowerCase().includes('biopsy') ? (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Critical
                          </span>
                        ) : r.action.toLowerCase().includes('treated') || r.action.toLowerCase().includes('performed') ? (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Completed
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors duration-200">
                          <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {r.time}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-gray-200">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-10 h-10 text-gray-300 mb-2" />
                      <p className="text-lg font-medium">No activities found</p>
                      <p className="text-sm">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorActivityPage;
