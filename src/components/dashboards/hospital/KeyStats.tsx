import { useState } from 'react';
import { UserPlus, UserMinus, Bed, Clock, Droplet, Ambulance } from 'lucide-react';
import AdmissionsModal, { type AdmissionRecord } from './AdmissionsModal';
import DischargesModal from './DischargesModal';
import BedOccupancyModal, { type WardOccupancy } from './BedOccupancyModal';
import BloodBankModal, { type BloodStock } from './BloodBankModal';
import AmbulanceModal, { type AmbulanceRecord } from './AmbulanceModal';

const KeyStats = () => {
  const [showAdmissions, setShowAdmissions] = useState(false);
  const [showDischarges, setShowDischarges] = useState(false);
  const [showBedOccupancy, setShowBedOccupancy] = useState(false);
  const [showBloodBank, setShowBloodBank] = useState(false);
  const [showAmbulance, setShowAmbulance] = useState(false);
  const wardRecords: WardOccupancy[] = [
    { name: 'ICU Ward', occupied: 18, available: 2 },
    { name: 'Medical Ward', occupied: 50, available: 8 },
    { name: 'Surgical Ward', occupied: 30, available: 6 },
    { name: 'Maternity Ward', occupied: 10, available: 5 },
    { name: 'Emergency Ward', occupied: 14, available: 3 },
  ];
  const ambulanceRecords: AmbulanceRecord[] = [
    { id: 'am1', vehicleNumber: 'DL01 AB 2345', driverName: 'Ravi Kumar', driverPhone: '+91-9876543210', status: 'Available' },
    { id: 'am2', vehicleNumber: 'MH12 CD 6789', driverName: 'Sanjay Patel', driverPhone: '+91-9876501234', status: 'On Duty' },
    { id: 'am3', vehicleNumber: 'KA05 EF 1122', driverName: 'Ayesha Khan', driverPhone: '+91-9988776655', status: 'Available' },
    { id: 'am4', vehicleNumber: 'GJ27 GH 3344', driverName: 'Manish Sharma', driverPhone: '+91-9123456780', status: 'Maintenance' },
    { id: 'am5', vehicleNumber: 'TN09 IJ 5566', driverName: 'Priya Singh', driverPhone: '+91-9012345678', status: 'On Duty' },
  ];
  const bloodStockRecords: BloodStock[] = [
    { group: 'O+', units: 120 },
    { group: 'A+', units: 95 },
    { group: 'B+', units: 62 },
    { group: 'AB+', units: 10 },
    { group: 'O-', units: 12 },
    { group: 'A-', units: 6 },
    { group: 'B-', units: 4 },
    { group: 'AB-', units: 3 },
  ];
  const admissionsRecords: AdmissionRecord[] = [
    { id: 'a1', patient: 'John Doe', date: '2025-09-18', time: '09:15 AM', doctor: 'Dr. Smith', reason: 'Chest Pain' },
    { id: 'a2', patient: 'Jane Williams', date: '2025-09-18', time: '10:40 AM', doctor: 'Dr. Chen', reason: 'High Fever' },
    { id: 'a3', patient: 'Michael Brown', date: '2025-09-18', time: '11:05 AM', doctor: 'Dr. Patel', reason: 'Dehydration' },
    { id: 'a4', patient: 'Ava Johnson', date: '2025-09-18', time: '12:20 PM', doctor: 'Dr. Rahman', reason: 'Fracture Assessment' },
    { id: 'a5', patient: 'Liam Davis', date: '2025-09-18', time: '01:30 PM', doctor: 'Dr. Kim', reason: 'Shortness of Breath' },
  ];
  const dischargesRecords: AdmissionRecord[] = [
    { id: 'd1', patient: 'Noah Wilson', date: '2025-09-18', time: '10:10 AM', doctor: 'Dr. Singh', reason: 'Recovered – Pneumonia' },
    { id: 'd2', patient: 'Emma Garcia', date: '2025-09-18', time: '11:25 AM', doctor: 'Dr. Lopez', reason: 'Post-op Observation Complete' },
    { id: 'd3', patient: 'Olivia Martinez', date: '2025-09-18', time: '01:50 PM', doctor: 'Dr. Khan', reason: 'Stabilized – Dehydration' },
    { id: 'd4', patient: 'William Anderson', date: '2025-09-18', time: '03:05 PM', doctor: 'Dr. Brown', reason: 'Fracture Managed' },
  ];
  const stats = [
    {
      title: 'Admissions',
      value: '124',
      subtitle: 'New patients admitted today',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100/80',
      trend: '+12%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Discharges',
      value: '98',
      subtitle: 'Patients discharged today',
      icon: UserMinus,
      color: 'text-green-600',
      bgColor: 'bg-green-100/80',
      trend: '+8%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Bed Occupancy',
      value: '85%',
      subtitle: '24 beds available across all wards',
      icon: Bed,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100/80',
      trend: '↑ 5%',
      trendColor: 'text-amber-600',
    },
    {
      title: 'ER Wait Time',
      value: '2h 15m',
      subtitle: 'Current average wait time in ER',
      icon: Clock,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100/80',
      trend: '↓ 30min',
      trendColor: 'text-green-600',
    },
    {
      title: 'Blood Bank',
      value: '312 units',
      subtitle: 'O+: 120 • A+: 95 • B+: 62',
      icon: Droplet,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100/80',
      trend: '+4%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Ambulance',
      value: '8 Active',
      subtitle: '10 on duty • 2 in maintenance',
      icon: Ambulance,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100/80',
      trend: '2 standby',
      trendColor: 'text-indigo-600',
    },
  ];

  // Function to get gradient colors based on card type
  const getCardGradient = (title: string) => {
    switch(title) {
      case 'Admissions': return 'from-blue-50 to-blue-100';
      case 'Discharges': return 'from-green-50 to-green-100';
      case 'Bed Occupancy': return 'from-amber-50 to-amber-100';
      case 'ER Wait Time': return 'from-rose-50 to-rose-100';
      case 'Blood Bank': return 'from-purple-50 to-purple-100';
      case 'Ambulance': return 'from-indigo-50 to-indigo-100';
      default: return 'from-gray-50 to-gray-100';
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Hospital Overview</h2>
        <p className="text-gray-500 mt-2">Key metrics at a glance</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const gradient = getCardGradient(stat.title);
          
          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ease-in-out
                bg-gradient-to-br ${gradient} border border-opacity-30 border-white shadow-md
                hover:shadow-lg hover:-translate-y-1 h-full flex flex-col
                ${['Admissions', 'Discharges', 'Bed Occupancy', 'Blood Bank', 'Ambulance'].includes(stat.title) 
                  ? 'cursor-pointer' 
                  : ''}`}
              onClick={
                stat.title === 'Admissions' ? () => setShowAdmissions(true) :
                stat.title === 'Discharges' ? () => setShowDischarges(true) :
                stat.title === 'Bed Occupancy' ? () => setShowBedOccupancy(true) :
                stat.title === 'Blood Bank' ? () => setShowBloodBank(true) :
                stat.title === 'Ambulance' ? () => setShowAmbulance(true) :
                undefined
              }
              role={['Admissions', 'Discharges', 'Bed Occupancy', 'Blood Bank', 'Ambulance'].includes(stat.title) ? 'button' : undefined}
              tabIndex={['Admissions', 'Discharges', 'Bed Occupancy', 'Blood Bank', 'Ambulance'].includes(stat.title) ? 0 : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (stat.title === 'Admissions') setShowAdmissions(true);
                  else if (stat.title === 'Discharges') setShowDischarges(true);
                  else if (stat.title === 'Bed Occupancy') setShowBedOccupancy(true);
                  else if (stat.title === 'Blood Bank') setShowBloodBank(true);
                  else if (stat.title === 'Ambulance') setShowAmbulance(true);
                }
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10" 
                   style={{ background: `radial-gradient(circle, ${stat.color.replace('text-', '')} 0%, transparent 70%)` }}>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  {/* Icon with animated background */}
                  <div className={`p-2.5 rounded-lg ${stat.bgColor} shadow-inner 
                                transition-all duration-300 group-hover:scale-110`}>
                    <Icon className={`w-5 h-5 ${stat.color} transition-transform duration-300`} />
                  </div>
                  
                  {/* Trend indicator */}
                  <span className={`text-xs font-medium ${stat.trendColor} bg-white/90 px-2 py-1 rounded-full 
                                 shadow-sm transition-all duration-200`}>
                    {stat.trend}
                  </span>
                </div>
                
                {/* Main content */}
                <div className="mt-1">
                  <h3 className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {stat.subtitle}
                  </p>
                </div>
                
                {/* View details link */}
                {['Admissions', 'Discharges', 'Bed Occupancy', 'Blood Bank', 'Ambulance'].includes(stat.title) && (
                  <div className="mt-auto pt-3 -mb-1">
                    <span className="inline-flex items-center text-xs font-medium text-blue-600 group-hover:text-blue-800 
                                transition-colors duration-200">
                      View details
                      <svg className="w-3 h-3 ml-1" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                           xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <AdmissionsModal
        open={showAdmissions}
        onClose={() => setShowAdmissions(false)}
        onViewAll={() => {
          setShowAdmissions(false);
          window.location.hash = '#/admissions';
        }}
        records={admissionsRecords}
      />
      <DischargesModal
        open={showDischarges}
        onClose={() => setShowDischarges(false)}
        onViewAll={() => {
          setShowDischarges(false);
          window.location.hash = '#/discharges';
        }}
        records={dischargesRecords}
      />
      <BedOccupancyModal
        open={showBedOccupancy}
        onClose={() => setShowBedOccupancy(false)}
        records={wardRecords}
      />
      <BloodBankModal
        open={showBloodBank}
        onClose={() => setShowBloodBank(false)}
        records={bloodStockRecords}
      />
      <AmbulanceModal
        open={showAmbulance}
        onClose={() => setShowAmbulance(false)}
        records={ambulanceRecords}
      />
    </section>
  );
};

export default KeyStats;