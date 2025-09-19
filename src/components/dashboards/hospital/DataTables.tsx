import { UserPlus, Activity } from 'lucide-react';

const DataTables = () => {
  const recentAdmissions = [
    { name: 'Michael Lee', reason: 'Appendicitis', date: '2025-09-18', time: '09:15 AM', department: 'General Surgery' },
    { name: 'Jane Doe', reason: 'Pneumonia', date: '2025-09-18', time: '10:40 AM', department: 'Pulmonology' },
    { name: 'John Smith', reason: 'Broken Arm', date: '2025-09-18', time: '11:20 AM', department: 'Orthopedics' },
    { name: 'Emily White', reason: 'Diabetes Management', date: '2025-09-18', time: '01:05 PM', department: 'Endocrinology' },
  ];

  const doctorActivity = [
    { name: 'Dr. Anya Sharma', department: 'Cardiology', patient: 'Rahul Mehta', action: 'Treated patient', time: '09:30 AM' },
    { name: 'Dr. Kevin Chen', department: 'Neurology', patient: '-', action: 'Completed rounds', time: '10:15 AM' },
    { name: "Dr. Jessica O'Connor", department: 'Emergency', patient: 'Aarti Singh', action: 'Treated patient', time: '11:50 AM' },
    { name: 'Dr. Priyanka Rao', department: 'Radiology', patient: '-', action: 'Reviewed lab reports', time: '12:25 PM' },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Admissions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <UserPlus className="w-5 h-5 text-blue-600 mr-2" />
              Recent Admissions
            </h3>
            <button
              onClick={() => { window.location.hash = '#/admissions'; }}
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
            >
              View More
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Reason for Admission
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAdmissions.map((admission, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-0">
                      <span className="font-semibold text-gray-900">{admission.name}</span>
                    </td>
                    <td className="py-4 px-0">
                      <span className="text-gray-600">{admission.date}</span>
                    </td>
                    <td className="py-4 px-0">
                      <span className="text-gray-600">{admission.time}</span>
                    </td>
                    <td className="py-4 px-0">
                      <span className="text-gray-600">{admission.department}</span>
                    </td>
                    <td className="py-4 px-0">
                      <span className="text-gray-600">{admission.reason}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Activity */
        }
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 text-blue-600 mr-2" />
              Doctor Activity
            </h3>
            <button
              onClick={() => { 
                window.location.hash = '#/doctor-activity';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
            >
              View More
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {doctorActivity.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-0">
                      <span className="font-semibold text-gray-900">{activity.name}</span>
                    </td>
                    <td className="py-4 px-0"><span className="text-gray-600">{activity.department}</span></td>
                    <td className="py-4 px-0"><span className="text-gray-600">{activity.patient}</span></td>
                    <td className="py-4 px-0"><span className="text-gray-600">{activity.action}</span></td>
                    <td className="py-4 px-0"><span className="text-gray-600">{activity.time}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTables;