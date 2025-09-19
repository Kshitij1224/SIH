import React from 'react';
import { Users, Stethoscope, Heart, Activity } from 'lucide-react';

const StaffAndDepartments = () => {
  const staffData = [
    { role: 'Doctors', count: 54, status: 'On Duty', icon: Stethoscope, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { role: 'Nurses', count: 120, status: 'On Duty', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { role: 'Support Staff', count: 85, status: 'On Duty', icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const departmentData = [
    { name: 'Cardiology', load: 'High', color: 'text-red-600', bgColor: 'bg-red-100', dotColor: 'bg-red-500' },
    { name: 'Neurology', load: 'Normal', color: 'text-green-600', bgColor: 'bg-green-100', dotColor: 'bg-green-500' },
    { name: 'Pediatrics', load: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100', dotColor: 'bg-yellow-500' },
    { name: 'Emergency', load: 'High', color: 'text-red-600', bgColor: 'bg-red-100', dotColor: 'bg-red-500' },
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
              onClick={() => window.open('#/departments', '_blank')}
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
                onClick={() => { window.location.hash = '#/departments'; }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.hash = '#/departments';
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
    </section>
  );
};

export default StaffAndDepartments;