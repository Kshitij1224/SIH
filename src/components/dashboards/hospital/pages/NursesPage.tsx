import React, { useState } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';

export type NurseRecord = {
  id: string;
  name: string;
  department: string;
  age: number;
  experienceYears: number;
  status: 'On Duty' | 'Off Duty';
};

// Helper function to get random status (70% chance of being 'On Duty')
const getRandomStatus = (): 'On Duty' | 'Off Duty' => {
  return Math.random() > 0.3 ? 'On Duty' : 'Off Duty';
};

const sampleNurses: NurseRecord[] = [
  // Original Nurses
  { id: 'n1', name: 'Anita Desai', department: 'ICU', age: 32, experienceYears: 8, status: getRandomStatus() },
  { id: 'n2', name: 'Kavya Rao', department: 'Emergency', age: 29, experienceYears: 6, status: getRandomStatus() },
  { id: 'n3', name: 'Shreya Patel', department: 'Pediatrics', age: 27, experienceYears: 4, status: getRandomStatus() },
  { id: 'n4', name: 'Meenakshi Iyer', department: 'Gynecology', age: 35, experienceYears: 11, status: getRandomStatus() },
  { id: 'n5', name: 'Pooja Singh', department: 'Cardiology', age: 31, experienceYears: 7, status: getRandomStatus() },
  { id: 'n6', name: 'Niharika Sharma', department: 'General Surgery', age: 33, experienceYears: 9, status: getRandomStatus() },
  
  // Additional Nurses (15 more)
  { id: 'n7', name: 'Priya Reddy', department: 'Neurology', age: 30, experienceYears: 5, status: getRandomStatus() },
  { id: 'n8', name: 'Anjali Kapoor', department: 'Oncology', age: 34, experienceYears: 8, status: getRandomStatus() },
  { id: 'n9', name: 'Divya Menon', department: 'NICU', age: 28, experienceYears: 4, status: getRandomStatus() },
  { id: 'n10', name: 'Riya Malhotra', department: 'Orthopedics', age: 29, experienceYears: 5, status: getRandomStatus() },
  { id: 'n11', name: 'Sneha Joshi', department: 'Dermatology', age: 31, experienceYears: 6, status: getRandomStatus() },
  { id: 'n12', name: 'Aarohi Verma', department: 'ENT', age: 33, experienceYears: 7, status: getRandomStatus() },
  { id: 'n13', name: 'Ishita Gupta', department: 'Ophthalmology', age: 30, experienceYears: 5, status: getRandomStatus() },
  { id: 'n14', name: 'Tanya Khanna', department: 'Urology', age: 35, experienceYears: 9, status: getRandomStatus() },
  { id: 'n15', name: 'Neha Kapoor', department: 'Psychiatry', age: 32, experienceYears: 6, status: getRandomStatus() },
  { id: 'n16', name: 'Kiran Nair', department: 'Radiology', age: 34, experienceYears: 8, status: getRandomStatus() },
  { id: 'n17', name: 'Meera Krishnan', department: 'Physiotherapy', age: 29, experienceYears: 4, status: getRandomStatus() },
  { id: 'n18', name: 'Ananya Das', department: 'Nephrology', age: 31, experienceYears: 6, status: getRandomStatus() },
  { id: 'n19', name: 'Sumanthini R.', department: 'Endocrinology', age: 33, experienceYears: 7, status: getRandomStatus() },
  { id: 'n20', name: 'Preethi K.', department: 'Gastroenterology', age: 30, experienceYears: 5, status: getRandomStatus() },
  { id: 'n21', name: 'Lakshmi P.', department: 'Pulmonology', age: 35, experienceYears: 9, status: getRandomStatus() },
];

const NursesPage: React.FC = () => {
  const goHome = () => {
    window.location.hash = '#/';
  };

  // Helper function to generate a random date within the last 30 days
  const getRandomDate = () => {
    const today = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() - randomDaysAgo);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Get unique departments for filter dropdown
  const departments = ['All', ...new Set(sampleNurses.map(nurse => nurse.department))];

  // Filter nurses based on search and filters
  const filteredNurses = sampleNurses.filter(nurse => {
    const matchesSearch = searchTerm === '' || 
      nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || 
      nurse.department === selectedDepartment;
      
    const matchesStatus = statusFilter === 'All' || 
      nurse.status === statusFilter;
    
    // For date filter, we'll just check if the nurse is on duty when a date is selected
    const matchesDate = !dateFilter || nurse.status === 'On Duty';
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  // Count nurses by status for the stats
  const onDutyCount = sampleNurses.filter(n => n.status === 'On Duty').length;
  const offDutyCount = sampleNurses.length - onDutyCount;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-0 flex-1 w-[90%] mx-auto">
      <div className="p-4 border-b border-gray-100 flex flex-col gap-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex p-2 rounded-lg bg-pink-50 text-pink-600">
              <Heart className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-semibold text-gray-900 ml-4">Nurses Directory</h2>
          </div>
          <button onClick={goHome} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Nurses</p>
            <p className="text-2xl font-semibold text-gray-900">{sampleNurses.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-100 bg-green-50">
            <p className="text-sm font-medium text-green-800">On Duty</p>
            <p className="text-2xl font-semibold text-green-900">{onDutyCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-100 bg-red-50">
            <p className="text-sm font-medium text-red-800">Off Duty</p>
            <p className="text-2xl font-semibold text-red-900">{offDutyCount}</p>
          </div>
        </div>

        {/* Search and Filter Panel */}
        <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search nurses..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                id="department"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="On Duty">On Duty</option>
                <option value="Off Duty">Off Duty</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Shift Date</label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedDepartment !== 'All' || statusFilter !== 'All' || dateFilter) && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Filters:</span>
              {selectedDepartment !== 'All' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Department: {selectedDepartment}
                  <button 
                    onClick={() => setSelectedDepartment('All')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-300 focus:outline-none"
                  >
                    <span className="sr-only">Remove filter</span>
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                      <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              {statusFilter !== 'All' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Status: {statusFilter}
                  <button 
                    onClick={() => setStatusFilter('All')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 focus:outline-none"
                  >
                    <span className="sr-only">Remove filter</span>
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                      <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              {dateFilter && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Date: {new Date(dateFilter).toLocaleDateString()}
                  <button 
                    onClick={() => setDateFilter('')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-200 text-green-800 hover:bg-green-300 focus:outline-none"
                  >
                    <span className="sr-only">Remove filter</span>
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                      <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSelectedDepartment('All');
                  setStatusFilter('All');
                  setDateFilter('');
                  setSearchTerm('');
                }}
                className="text-sm text-blue-600 hover:text-blue-800 ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="min-h-full">
        <table className="min-w-full border-separate border-spacing-1.5">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="py-2 pr-4 pl-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Department</th>
              <th className="py-2 pr-4 font-medium">Age</th>
              <th className="py-2 pr-4 font-medium">Experience</th>
              <th className="py-2 pr-4 font-medium">Last Shift</th>
              <th className="py-2 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredNurses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  <div className="min-h-[400px] flex items-center justify-center">
                    <div>
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-2">No nurses found matching your criteria</p>
                      <button
                        onClick={() => {
                          setSelectedDepartment('All');
                          setStatusFilter('All');
                          setDateFilter('');
                          setSearchTerm('');
                        }}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredNurses.map((n, idx) => (
              <tr key={n.id} className={`text-sm text-gray-800 transition-all duration-200 hover:shadow-md hover:bg-blue-50/50 group ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className={`py-3 pr-4 pl-4 font-medium transition-colors duration-200 group-hover:text-blue-700 ${idx !== filteredNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-medium text-white ${n.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {n.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                    {n.name}
                  </div>
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors duration-200">
                    {n.department}
                  </span>
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredNurses.length - 1 ? 'border-b border-gray-100' : ''} text-gray-700`}>
                  {n.age} yrs
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredNurses.length - 1 ? 'border-b border-gray-100' : ''} text-gray-700`}>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        className={`h-1.5 rounded-full ${n.experienceYears > 5 ? 'bg-blue-600' : 'bg-green-500'}`} 
                        style={{ width: `${Math.min(100, (n.experienceYears / 15) * 100)}%` }}
                      ></div>
                    </div>
                    {n.experienceYears} yrs
                  </div>
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredNurses.length - 1 ? 'border-b border-gray-100' : ''} text-gray-500 group-hover:text-gray-700 transition-colors duration-200`}>
                  <div className="flex items-center text-sm">
                    <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {getRandomDate()}
                  </div>
                </td>
                <td className={`py-3 pr-4 ${idx !== filteredNurses.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    n.status === 'On Duty' 
                      ? 'bg-green-100 text-green-800 group-hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 group-hover:bg-red-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${n.status === 'On Duty' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {n.status}
                  </span>
                </td>
              </tr>
            ))
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NursesPage;
