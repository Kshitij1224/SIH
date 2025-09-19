import React, { useEffect, useState } from 'react';
import { Clock, Pill, Activity, Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Settings, X } from 'lucide-react';

const AppointmentsMedications = () => {
  const appointments = [
    {
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      time: '10:30 AM',
      date: 'Today',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    {
      doctor: 'Dr. Michael Johnson',
      specialty: 'Neurologist',
      time: '2:15 PM',
      date: 'Tomorrow',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
  ];

  const medications = [
    { name: 'Cetrizine', dosage: '10mg', frequency: 'Once daily' },
    { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily' },
  ];

  const vitals = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', color: 'text-green-600' },
    { label: 'Blood Sugar', value: '100', unit: 'mg/dl', color: 'text-blue-600' },
    { label: 'Weight', value: '70', unit: 'kg', color: 'text-purple-600' },
    { label: 'SpO2', value: '98', unit: '%', color: 'text-teal-600' },
  ];

  // Video call state
  const [inCall, setInCall] = useState(false);
  const [activeAppt, setActiveAppt] = useState<number | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  // Medications history modal state
  const [showMedsModal, setShowMedsModal] = useState(false);

  type Med = { name: string; dosage: string; frequency: string; status: 'present' | 'past' | 'intermittent'; ended?: string };
  const allMeds: Med[] = [
    { name: 'Cetrizine', dosage: '10mg', frequency: 'Once daily', status: 'present' },
    { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', status: 'present' },
    { name: 'Vitamin D3', dosage: '60k IU', frequency: 'Weekly', status: 'intermittent' },
    { name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed', status: 'intermittent' },
    { name: 'Azithromycin', dosage: '250mg', frequency: 'Once daily for 3 days', status: 'past', ended: '2025-08-18' },
  ];

  useEffect(() => {
    if (!inCall) return;
    setElapsed(0);
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [inCall]);

  const timeStr = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Appointments & Medications */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              Upcoming Online Appointments
            </h3>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={appointment.avatar}
                      alt={appointment.doctor}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-500">{appointment.date} • {appointment.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveAppt(index); setInCall(true); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Pill className="w-5 h-5 text-green-600 mr-2" />
                Medications
              </h3>
              <button
                onClick={() => setShowMedsModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View More
              </button>
            </div>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                  </div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Vital Signs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Activity className="w-5 h-5 text-red-600 mr-2" />
            Vital Signs
          </h3>
          <div className="space-y-6">
            {vitals.map((vital, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{vital.label}</span>
                  <span className={`text-sm font-semibold ${vital.color}`}>Normal</span>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                  <span className="text-sm text-gray-500 mb-1">{vital.unit}</span>
                </div>
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500`} style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medications history modal */}
      {showMedsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMedsModal(false)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-5 relative">
              <h3 className="text-xl font-semibold">Medications</h3>
              <p className="text-white/90 text-sm">Present, on & off, and past medications</p>
              <button
                aria-label="Close"
                onClick={() => setShowMedsModal(false)}
                className="absolute right-3 top-3 p-2 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Legend */}
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Present</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> On & Off</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Past</div>
              </div>

              {/* Sections */}
              {(['present','intermittent','past'] as const).map((group) => (
                <div key={group}>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    {group === 'present' ? 'Present Medications' : group === 'intermittent' ? 'On & Off Medications' : 'Past Medications'}
                  </h4>
                  <ul className="space-y-2">
                    {allMeds.filter(m => m.status === group).map((m, idx) => (
                      <li key={idx} className="p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{m.name} <span className="text-gray-500 font-normal">• {m.dosage}</span></div>
                          <div className="text-sm text-gray-600">{m.frequency}{m.ended ? ` • Ended: ${m.ended}` : ''}</div>
                        </div>
                        <span className={`w-3.5 h-3.5 rounded-full ${group==='present' ? 'bg-green-500' : group==='intermittent' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {inCall && activeAppt !== null && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setInCall(false)} />
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <div className="w-full max-w-5xl h-[75vh] bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 border-b border-gray-700">
                <div className="text-sm text-gray-200">
                  Connected with <span className="font-semibold">{appointments[activeAppt].doctor}</span>
                </div>
                <div className="text-xs text-gray-300 font-mono">{timeStr}</div>
              </div>
              {/* Video area */}
              <div className="relative h-[calc(75vh-140px)] bg-black">
                {/* Remote video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto w-24 h-24 rounded-full bg-gray-700 mb-3 overflow-hidden">
                      <img src={appointments[activeAppt].avatar} alt="remote" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-gray-300">{appointments[activeAppt].doctor}</div>
                    <div className="text-gray-500 text-sm">{appointments[activeAppt].specialty}</div>
                  </div>
                </div>
                {/* Local preview tile */}
                <div className="absolute right-4 bottom-4 w-40 h-28 bg-gray-800/70 rounded-lg border border-gray-700 flex items-center justify-center text-gray-300 text-xs">
                  {camOn ? 'Camera Preview' : 'Camera Off'}
                </div>
              </div>
              {/* Controls */}
              <div className="flex items-center justify-center gap-4 px-4 py-4 bg-gray-800/80 border-t border-gray-700">
                <button onClick={() => setMicOn((v) => !v)} className={`w-11 h-11 rounded-full flex items-center justify-center ${micOn ? 'bg-gray-100 text-gray-900' : 'bg-red-600 text-white'}`}>
                  {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button onClick={() => setCamOn((v) => !v)} className={`w-11 h-11 rounded-full flex items-center justify-center ${camOn ? 'bg-gray-100 text-gray-900' : 'bg-red-600 text-white'}`}>
                  {camOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-100 text-gray-900">
                  <Settings className="w-5 h-5" />
                </button>
                <button onClick={() => setInCall(false)} className="w-14 h-14 rounded-full flex items-center justify-center bg-red-600 text-white">
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AppointmentsMedications;