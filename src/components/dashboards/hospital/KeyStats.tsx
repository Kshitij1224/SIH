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
      subtitle: 'Today',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+12%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Discharges',
      value: '98',
      subtitle: 'Today',
      icon: UserMinus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+8%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Bed Occupancy',
      value: '85%',
      subtitle: 'Available: 24 beds',
      icon: Bed,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '↑ 5%',
      trendColor: 'text-orange-600',
    },
    {
      title: 'ER Wait Time',
      value: '2h 15m',
      subtitle: 'Current Average',
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '↓ 30min',
      trendColor: 'text-green-600',
    },
    {
      title: 'Blood Bank',
      value: '312 units',
      subtitle: 'O+: 120 • A+: 95 • B+: 62',
      icon: Droplet,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      trend: '+4%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Ambulance',
      value: '8 Active',
      subtitle: 'Total: 12 • On Duty: 10',
      icon: Ambulance,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      trend: '2 standby',
      trendColor: 'text-indigo-600',
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hospital Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 ${
                stat.title === 'Admissions' || stat.title === 'Discharges' || stat.title === 'Bed Occupancy' || stat.title === 'Blood Bank' || stat.title === 'Ambulance' ? 'cursor-pointer hover:border-blue-200' : ''
              }`}
              onClick={
                stat.title === 'Admissions'
                  ? () => setShowAdmissions(true)
                  : stat.title === 'Discharges'
                  ? () => setShowDischarges(true)
                  : stat.title === 'Bed Occupancy'
                  ? () => setShowBedOccupancy(true)
                  : stat.title === 'Blood Bank'
                  ? () => setShowBloodBank(true)
                  : stat.title === 'Ambulance'
                  ? () => setShowAmbulance(true)
                  : undefined
              }
              role={stat.title === 'Admissions' || stat.title === 'Discharges' || stat.title === 'Bed Occupancy' || stat.title === 'Blood Bank' || stat.title === 'Ambulance' ? 'button' : undefined}
              tabIndex={stat.title === 'Admissions' || stat.title === 'Discharges' || stat.title === 'Bed Occupancy' || stat.title === 'Blood Bank' || stat.title === 'Ambulance' ? 0 : undefined}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${stat.trendColor}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
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