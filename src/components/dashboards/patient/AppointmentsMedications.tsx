import React, { useEffect, useState } from 'react';
import { Clock, Pill, Activity, Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Settings, X, Heart, Thermometer, Wind, Droplet } from 'lucide-react';

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
    { name: 'Vitamin D3', dosage: '60k IU', frequency: 'Weekly', status: 'intermittent' },
    { name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed' },
  ];

  // Enriched vitals for creative UI
  const vitals = {
    gauges: [
      { key: 'hr', label: 'Heart Rate', value: 72, unit: 'bpm', icon: Heart, color: 'from-rose-500 to-pink-500', ring: '#fb7185' },
      { key: 'spo2', label: 'SpO2', value: 98, unit: '%', icon: Droplet, color: 'from-emerald-500 to-teal-500', ring: '#10b981' },
      { key: 'temp', label: 'Temp', value: 36.8, unit: '°C', icon: Thermometer, color: 'from-amber-500 to-orange-500', ring: '#f59e0b' },
      { key: 'resp', label: 'Resp Rate', value: 16, unit: 'rpm', icon: Wind, color: 'from-sky-500 to-blue-500', ring: '#0ea5e9' },
    ],
    bloodPressure: {
      label: 'Blood Pressure',
      systolic: 118,
      diastolic: 78,
      unit: 'mmHg',
      systolicTrend: [112, 116, 120, 118, 122, 117, 118],
      diastolicTrend: [74, 76, 80, 78, 82, 76, 78],
      color: 'text-violet-600',
    },
  } as const;

  // Video call state
  const [inCall, setInCall] = useState(false);
  const [activeAppt, setActiveAppt] = useState<number | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  // Medications history modal state
  const [showMedsModal, setShowMedsModal] = useState(false);
  // BP trend interaction
  const [bpSelectedDay, setBpSelectedDay] = useState<number | null>(null);

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
                  <div
                    className={`w-4 h-4 rounded-full ${
                      med.name === 'Vitamin D3' || med.name === 'Ibuprofen' ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    title={med.name === 'Vitamin D3' || med.name === 'Ibuprofen' ? 'On & Off' : 'Present'}
                  />
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

          {/* Gauges grid */}
          <div className="grid grid-cols-2 gap-4">
            {vitals.gauges.map((g) => {
              const Icon = g.icon;
              const pct = Math.max(0, Math.min(100, Math.round((Number(g.value) / (g.key==='hr'?120:g.key==='resp'?30:g.key==='spo2'?100:40)) * 100)));
              const angle = Math.round((pct / 100) * 360);
              const ringBg = `conic-gradient(${g.ring} ${angle}deg, #e5e7eb ${angle}deg)`; // gray-200 remainder
              return (
                <div key={g.key} className="relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-md bg-gradient-to-br ${g.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-gray-500">{g.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full" style={{ background: ringBg }} />
                      <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900 leading-tight">{g.value}</div>
                          <div className="text-[10px] text-gray-500">{g.unit}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-1">
                        <div className="text-xl font-bold text-gray-900">{g.value}</div>
                        <div className="text-xs text-gray-500">{g.unit}</div>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-1 text-[10px] text-gray-500">{pct}% of daily target</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Blood Pressure card (enhanced) */}
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-violet-100">
                    <Activity className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-800">{vitals.bloodPressure.label}</div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500"></span>Systolic</span>
                  <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span>Diastolic</span>
                  <span className="text-xs">{vitals.bloodPressure.unit}</span>
                </div>
              </div>

              {/* Current reading */}
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                  </div>
                  <div className="text-sm text-gray-500 mb-0.5">{vitals.bloodPressure.unit}</div>
                </div>
                {(() => {
                  const s = vitals.bloodPressure.systolic;
                  const d = vitals.bloodPressure.diastolic;
                  const category = s < 120 && d < 80
                    ? { label: 'Normal', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                    : (s < 130 && d < 80)
                      ? { label: 'Elevated', cls: 'bg-amber-50 text-amber-700 border-amber-200' }
                      : (s < 140 || d < 90)
                        ? { label: 'Stage 1', cls: 'bg-orange-50 text-orange-700 border-orange-200' }
                        : { label: 'Stage 2', cls: 'bg-red-50 text-red-700 border-red-200' };
                  return <span className={`px-2 py-1 rounded-full text-xs border ${category.cls}`}>{category.label}</span>;
                })()}
              </div>

              {/* Derived metrics */}
              {(() => {
                const s = vitals.bloodPressure.systolic;
                const d = vitals.bloodPressure.diastolic;
                const pp = s - d; // Pulse Pressure
                const map = Math.round(d + pp / 3); // Mean Arterial Pressure (approx)
                return (
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg border border-gray-200 p-2">
                      <div className="text-[10px] text-gray-500">Pulse Pressure</div>
                      <div className="text-sm font-semibold text-gray-900">{pp} mmHg</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-2">
                      <div className="text-[10px] text-gray-500">MAP</div>
                      <div className="text-sm font-semibold text-gray-900">{map} mmHg</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-2">
                      <div className="text-[10px] text-gray-500">Target</div>
                      <div className="text-sm font-semibold text-gray-900">120/80</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Daily BP level bars (MAP-derived) */}
            <div className="mt-3 px-4 pb-4">
              <div className="h-20 relative">
                <div className="absolute inset-0">
                  <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 grid grid-cols-7 items-end gap-2 h-full">
                  {(() => {
                    const maps = vitals.bloodPressure.systolicTrend.map((sv, i) => {
                      const dv = vitals.bloodPressure.diastolicTrend[i] || Math.round(sv * 0.66);
                      const pp = sv - dv;
                      return Math.round(dv + pp / 3);
                    });
                    return maps.map((mv, i) => {
                      // Map MAP to a wider clinical range 50–120 mmHg -> 20–100% height
                      const norm = Math.max(0, Math.min(1, (mv - 50) / 70));
                      const h = Math.round(20 + norm * 80);
                      // Single consistent color for all bars (indigo-500)
                      const color = '#6366f1';
                      const sv = vitals.bloodPressure.systolicTrend[i];
                      const dv = vitals.bloodPressure.diastolicTrend[i] || Math.round(sv * 0.66);
                      const selected = bpSelectedDay === i;
                      return (
                        <div
                          key={i}
                          className="relative flex flex-col items-center justify-end h-full cursor-pointer focus:outline-none"
                          onClick={() => setBpSelectedDay(selected ? null : i)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setBpSelectedDay(selected ? null : i);
                            }
                          }}
                        >
                          {selected && (
                            <div className="absolute -top-2 -translate-y-full px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] shadow-md whitespace-nowrap">
                              {sv}/{dv} • MAP {mv} {vitals.bloodPressure.unit}
                            </div>
                          )}
                          <div className="w-full rounded-t-md" style={{ height: `${h}%`, backgroundColor: color, opacity: selected ? 1 : 0.85 }} title={`MAP ${mv} mmHg`} />
                          <div className="mt-1 text-[10px] text-gray-400">{['S','M','T','W','T','F','S'][i]}</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
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