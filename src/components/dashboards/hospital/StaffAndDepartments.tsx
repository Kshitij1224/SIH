import React from 'react';
import { useState } from 'react';
import { Users, Stethoscope, Heart, Activity, X } from 'lucide-react';

type Department = {
  name: string;
  load: string;
  color: string;
  bgColor: string;
  dotColor: string;
  description: string;
};

interface DepartmentDetailsModalProps {
  department: Department | null;
  onClose: () => void;
}

// Department details modal component
const DepartmentDetailsModal = ({ department, onClose }: DepartmentDetailsModalProps) => {
  if (!department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{department.name} Department</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Load:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${department.bgColor} ${department.color}`}>
                {department.load}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Department Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Active Patients</p>
                  <p className="text-lg font-semibold">
                    {department.name === 'Cardiology' ? '42' : 
                     department.name === 'Emergency' ? '38' : 
                     department.name === 'Pediatrics' ? '29' : '24'}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Available Beds</p>
                  <p className="text-lg font-semibold">
                    {department.name === 'Cardiology' ? '12' : 
                     department.name === 'Emergency' ? '8' : 
                     department.name === 'Pediatrics' ? '15' : '18'}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Staff On Duty</p>
                  <p className="text-lg font-semibold">
                    {department.name === 'Cardiology' ? '18' : 
                     department.name === 'Emergency' ? '22' : 
                     department.name === 'Pediatrics' ? '14' : '16'}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Avg. Wait Time</p>
                  <p className="text-lg font-semibold">
                    {department.name === 'Cardiology' ? '25 min' : 
                     department.name === 'Emergency' ? '15 min' : 
                     department.name === 'Pediatrics' ? '20 min' : '30 min'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StaffAndDepartments = () => {
  const staffData = [
    { role: 'Doctors', count: 54, status: 'On Duty', icon: Stethoscope, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { role: 'Nurses', count: 120, status: 'On Duty', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { role: 'Support Staff', count: 85, status: 'On Duty', icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  
  const departmentData = [
    { 
      name: 'Cardiology', 
      load: 'High', 
      color: 'text-red-600', 
      bgColor: 'bg-red-100', 
      dotColor: 'bg-red-500',
      description: 'Cardiology department handles heart-related conditions and treatments.'
    },
    { 
      name: 'Neurology', 
      load: 'Normal', 
      color: 'text-green-600', 
      bgColor: 'bg-green-100', 
      dotColor: 'bg-green-500',
      description: 'Neurology department specializes in disorders of the nervous system.'
    },
    { 
      name: 'Pediatrics', 
      load: 'Medium', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100', 
      dotColor: 'bg-yellow-500',
      description: 'Pediatrics department provides medical care for infants, children, and adolescents.'
    },
    { 
      name: 'Emergency', 
      load: 'High', 
      color: 'text-red-600', 
      bgColor: 'bg-red-100', 
      dotColor: 'bg-red-500',
      description: 'Emergency department provides immediate treatment for acute illnesses and injuries.'
    },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Status Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Activity className="w-5 h-5 text-blue-600 mr-2" />
            Staff Status
          </h3>
          <div className="space-y-4">
            {staffData.map((staff, index) => {
              const Icon = staff.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-colors ${
                    staff.role === 'Doctors' || staff.role === 'Nurses' || staff.role === 'Support Staff' ? 'hover:bg-blue-50 cursor-pointer' : 'hover:bg-gray-100'
                  }`}
                  onClick={
                    staff.role === 'Doctors'
                      ? () => { window.location.hash = '#/doctors'; }
                      : staff.role === 'Nurses'
                      ? () => { window.location.hash = '#/nurses'; }
                      : staff.role === 'Support Staff'
                      ? () => { window.location.hash = '#/staff'; }
                      : undefined
                  }
                  role={staff.role === 'Doctors' || staff.role === 'Nurses' || staff.role === 'Support Staff' ? 'button' : undefined}
                  tabIndex={staff.role === 'Doctors' || staff.role === 'Nurses' || staff.role === 'Support Staff' ? 0 : undefined}
                  onKeyDown={
                    staff.role === 'Doctors' || staff.role === 'Nurses' || staff.role === 'Support Staff'
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const hash = staff.role === 'Doctors' ? '#/doctors' : staff.role === 'Nurses' ? '#/nurses' : '#/staff';
                            window.location.hash = hash;
                          }
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${staff.bgColor}`}>
                      <Icon className={`w-5 h-5 ${staff.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{staff.role}</h4>
                      <p className="text-sm text-gray-600">{staff.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{staff.count}</p>
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-auto mt-1"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Load Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Stethoscope className="w-5 h-5 text-blue-600 mr-2" />
              Department Load
            </h3>
            <button
              onClick={() => { window.location.hash = '#/departments'; }}
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
            >
              View More
            </button>
          </div>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => setSelectedDept(dept)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDept(dept);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${dept.dotColor}`}></div>
                  <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${dept.bgColor} ${dept.color}`}>
                  {dept.load}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedDept && (
        <DepartmentDetailsModal 
          department={selectedDept} 
          onClose={() => setSelectedDept(null)} 
        />
      )}
    </section>
  );
};

export default StaffAndDepartments;