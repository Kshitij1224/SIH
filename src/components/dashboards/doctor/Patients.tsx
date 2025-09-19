import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Plus, Users, FileText, Phone, Mail, MapPin, X, User, Calendar } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  condition: string;
  status: string;
  avatar: string;
}

export function Patients() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id' | 'avatar' | 'lastVisit'>>({ 
    name: '',
    age: 0,
    gender: '',
    phone: '',
    email: '',
    address: '',
    condition: '',
    status: 'Active'
  });

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, New York, NY 10001',
      lastVisit: '2024-01-10',
      condition: 'Hypertension',
      status: 'Active',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Emily Davis',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'emily.davis@email.com',
      address: '456 Oak Ave, New York, NY 10002',
      lastVisit: '2024-01-08',
      condition: 'Diabetes Type 2',
      status: 'Active',
      avatar: 'ED'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 58,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'michael.brown@email.com',
      address: '789 Pine St, New York, NY 10003',
      lastVisit: '2024-01-05',
      condition: 'Heart Disease',
      status: 'Active',
      avatar: 'MB'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      age: 29,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'sarah.johnson@email.com',
      address: '321 Elm St, New York, NY 10004',
      lastVisit: '2023-12-28',
      condition: 'Anxiety',
      status: 'Inactive',
      avatar: 'SJ'
    },
  ]);

  const medicalHistory = [
    {
      date: '2024-01-10',
      type: 'Consultation',
      diagnosis: 'Hypertension follow-up',
      prescription: 'Lisinopril 10mg daily',
      notes: 'Blood pressure improved. Continue current medication.'
    },
    {
      date: '2023-12-15',
      type: 'Lab Results',
      diagnosis: 'Annual checkup',
      prescription: 'N/A',
      notes: 'All lab values within normal range except slightly elevated cholesterol.'
    },
    {
      date: '2023-11-20',
      type: 'Consultation',
      diagnosis: 'Initial hypertension diagnosis',
      prescription: 'Lisinopril 5mg daily',
      notes: 'Started on ACE inhibitor. Follow up in 6 weeks.'
    },
  ];

  const filteredPatients = useMemo(() => {
    return [...patients]
      .filter(patient => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          patient.name.toLowerCase().includes(searchLower) ||
          patient.email.toLowerCase().includes(searchLower) ||
          patient.phone.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else { // sort by lastVisit
          try {
            const dateA = new Date(a.lastVisit).getTime();
            const dateB = new Date(b.lastVisit).getTime();
            
            // Handle invalid dates by putting them at the end
            if (isNaN(dateA)) return sortOrder === 'asc' ? 1 : -1;
            if (isNaN(dateB)) return sortOrder === 'asc' ? -1 : 1;
            
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          } catch (error) {
            console.error('Error sorting dates:', error);
            return 0; // Keep original order if there's an error
          }
        }
      });
  }, [patients, searchTerm, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    // Close the modals when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close add patient modal
      if (showAddPatient && !target.closest('.add-patient-modal')) {
        setShowAddPatient(false);
      }
      
      // Close filter popup
      if (showFilter && !target.closest('.filter-button') && !target.closest('.filter-popup')) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddPatient, showFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">Manage your patient records and medical history</p>
        </div>
        <button 
          onClick={() => setShowAddPatient(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Patient Directory</h2>
              <span className="text-sm text-gray-500">{patients.length} patients</span>
            </div>
            
            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
              <div className="flex space-x-2">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by patient status"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="relative">
                  <button 
                    onClick={() => setShowFilter(!showFilter)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors filter-button"
                    aria-label="Filter and sort patients"
                    aria-expanded={showFilter}
                    aria-haspopup="dialog"
                    type="button"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  
                  {/* Filter Popup */}
                  {showFilter && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 filter-popup">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
                      </div>
                      <div className="p-2 space-y-2">
                        <button
                          onClick={() => {
                            setSortBy('name');
                            setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${
                            sortBy === 'name' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>Name</span>
                          {sortBy === 'name' && (
                            <span className="text-xs text-gray-500">
                              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('lastVisit');
                            setSortOrder(sortBy === 'lastVisit' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${
                            sortBy === 'lastVisit' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>Last Visit</span>
                          {sortBy === 'lastVisit' && (
                            <span className="text-xs text-gray-500">
                              {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{patient.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.condition}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Last visit: {patient.lastVisit}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          patient.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">{selectedPatient.avatar}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.age} years old • {selectedPatient.gender}</p>
                      <p className="text-sm text-gray-500 mt-1">Primary condition: {selectedPatient.condition}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label="Schedule appointment"
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      aria-label="Call patient"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      aria-label="Email patient"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span>{selectedPatient.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Medical Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Last Visit:</strong> {selectedPatient.lastVisit}</div>
                      <div><strong>Status:</strong> {selectedPatient.status}</div>
                      <div><strong>Primary Condition:</strong> {selectedPatient.condition}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Medical History
                    </h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Add Record
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {medicalHistory.map((record) => (
                      <div key={`${record.date}-${record.type}`} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-medium text-gray-900">{record.diagnosis}</div>
                            <div className="text-sm text-gray-500">{record.type} • {record.date}</div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700" aria-label="View details">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                        
                        {record.prescription !== 'N/A' && (
                          <div className="mb-2">
                            <strong className="text-sm text-gray-700">Prescription:</strong>
                            <span className="text-sm text-gray-600 ml-2">{record.prescription}</span>
                          </div>
                        )}
                        
                        <div>
                          <strong className="text-sm text-gray-700">Notes:</strong>
                          <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
              <p className="text-gray-600">Choose a patient from the list to view their detailed information and medical history.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Patient</h2>
              <button 
                onClick={() => setShowAddPatient(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Add the new patient to the patients array
              const addedPatient: Patient = {
                ...newPatient,
                id: Math.max(...patients.map(p => p.id)) + 1,
                avatar: newPatient.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                lastVisit: new Date().toISOString().split('T')[0]
              };
              // In a real app, you would make an API call here
              // For now, we'll update the local state
              setPatients(prevPatients => [addedPatient, ...prevPatients]);
              setShowAddPatient(false);
              setNewPatient({ 
                name: '',
                age: 0,
                gender: '',
                phone: '',
                email: '',
                address: '',
                condition: '',
                status: 'Active'
              });
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      id="fullName"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="John Doe"
                      aria-required="true"
                      aria-label="Full Name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={newPatient.age || ''}
                    onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender-select"
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                    aria-label="Select gender"
                    title="Select gender"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status-select"
                    value={newPatient.status}
                    onChange={(e) => setNewPatient({...newPatient, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select status"
                    title="Select status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="patient@example.com"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="123 Main St, City, State ZIP"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Condition
                  </label>
                  <input
                    type="text"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Hypertension, Diabetes, etc."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddPatient(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}