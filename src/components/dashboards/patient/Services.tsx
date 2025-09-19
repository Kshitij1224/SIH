import { useState, useEffect } from 'react';
import { TestTube, Calendar, AlertTriangle, FileText, PhoneCall, MapPin, X, Clock, User, ChevronRight, Droplet, Microscope, ClipboardList, Truck, ShoppingBag, Building, Search, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showLabsModal, setShowLabsModal] = useState(false);
  const [labsStep, setLabsStep] = useState<'home' | 'labs' | 'blood'>('home');
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [bloodGroup, setBloodGroup] = useState<string>('A+');
  const [units, setUnits] = useState<number>(1);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [bloodSearch, setBloodSearch] = useState<string>('');

  type BloodBank = {
    name: string;
    address: string;
    phone?: string;
    stock: Record<string, number>; // blood group -> units available
  };
  const bloodBanks: BloodBank[] = [
    {
      name: 'KIMS Blood Bank (KIIT Campus)',
      address: 'KIIT University, Patia, Bhubaneswar 751024',
      phone: '+916742725555',
      stock: { 'A+': 12, 'A-': 4, 'B+': 9, 'B-': 2, 'O+': 15, 'O-': 3, 'AB+': 6, 'AB-': 1 },
    },
    {
      name: 'Capital Hospital Blood Bank',
      address: 'Unit 6, Near AG Square, Bhubaneswar 751001',
      phone: '+916742395638',
      stock: { 'A+': 8, 'A-': 2, 'B+': 7, 'B-': 2, 'O+': 10, 'O-': 2, 'AB+': 3, 'AB-': 0 },
    },
    {
      name: 'SUM Hospital Blood Bank',
      address: 'K8, Kalinga Nagar, Bhubaneswar 751003',
      phone: '+916742384800',
      stock: { 'A+': 10, 'A-': 3, 'B+': 11, 'B-': 1, 'O+': 13, 'O-': 2, 'AB+': 5, 'AB-': 1 },
    },
  ];

  const labTests = [
    {
      name: 'Complete Blood Count (CBC)',
      desc: 'Screens overall health and detects a variety of disorders',
      price: 399,
      sample: 'Blood',
      reportTime: '24 hrs',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Thyroid Profile (T3, T4, TSH)',
      desc: 'Evaluates thyroid gland function and hormone levels',
      price: 599,
      sample: 'Blood',
      reportTime: '24-48 hrs',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      name: 'Liver Function Test (LFT)',
      desc: 'Assesses liver health and enzyme levels',
      price: 699,
      sample: 'Blood',
      reportTime: '24 hrs',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Kidney Function Test (KFT)',
      desc: 'Measures kidney performance and waste filtration',
      price: 649,
      sample: 'Blood',
      reportTime: '24-48 hrs',
      color: 'from-emerald-500 to-green-500',
    },
    {
      name: 'Vitamin D (25-OH)',
      desc: 'Checks Vitamin D levels essential for bone health',
      price: 899,
      sample: 'Blood',
      reportTime: '48 hrs',
      color: 'from-fuchsia-500 to-purple-500',
    },
    {
      name: 'Blood Sugar (Fasting)',
      desc: 'Measures blood glucose after an overnight fast',
      price: 199,
      sample: 'Blood',
      reportTime: 'Same day',
      color: 'from-cyan-500 to-sky-500',
    },
  ];

  const toggleTest = (name: string) => {
    setSelectedTests((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const totalPrice = selectedTests.reduce((sum, t) => {
    const item = labTests.find((x) => x.name === t);
    return sum + (item ? item.price : 0);
  }, 0);

  // Simple form state for appointment booking
  const today = new Date();
  const [date, setDate] = useState<string>(today.toISOString().slice(0, 10));
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM');
  const [doctor, setDoctor] = useState<string>('Dr. Ayushman Sharma (Cardiologist)');
  const [locationType, setLocationType] = useState<string>('Video Consultation (Online)');
  const [reason, setReason] = useState<string>('Routine checkup');

  type HistoryItem = {
    id: string;
    date: string;
    timeSlot: string;
    doctor: string;
    locationType: string;
    reason: string;
  };
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Toast state for success messages
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    window.clearTimeout((showToast as any)._t);
    (showToast as any)._t = window.setTimeout(() => setToastVisible(false), 3200);
  };

  // Default sample reports to show if there is no saved history yet
  const sampleHistory: HistoryItem[] = [
    {
      id: 'sample-1',
      date: '2025-09-10',
      timeSlot: '10:00 AM',
      doctor: 'Dr. Neha Mishra (General Physician)',
      locationType: 'In-Person (KIMS Hospital, KIIT)',
      reason: 'Fever and body ache',
    },
    {
      id: 'sample-2',
      date: '2025-08-22',
      timeSlot: '03:00 PM',
      doctor: 'Dr. R. Mohanty (Dermatologist)',
      locationType: 'Video Consultation (Online)',
      reason: 'Skin rash and irritation',
    },
    {
      id: 'sample-3',
      date: '2025-07-05',
      timeSlot: '11:30 AM',
      doctor: 'Dr. K. Sahu (Orthopedic)',
      locationType: 'In-Person (AMRI Hospitals, Khandagiri)',
      reason: 'Left knee pain',
    },
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem('medicalHistory');
      if (raw) {
        const parsed: HistoryItem[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
        } else {
          setHistory(sampleHistory);
          localStorage.setItem('medicalHistory', JSON.stringify(sampleHistory));
        }
      } else {
        setHistory(sampleHistory);
        localStorage.setItem('medicalHistory', JSON.stringify(sampleHistory));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Nearby hospitals around KIIT, Bhubaneswar. Please verify phone numbers locally.
  const nearbyHospitals = [
    {
      name: 'KIMS Hospital (KIIT Campus)',
      address: 'KIIT University, Patia, Bhubaneswar, Odisha 751024',
      phone: '+916742725555',
      mapsQuery: 'KIMS Hospital KIIT Bhubaneswar',
    },
    {
      name: 'Apollo Hospitals Bhubaneswar',
      address: 'Old Sainik School Rd, Unit 15, Bhubaneswar, Odisha 751005',
      phone: '+916742540200',
      mapsQuery: 'Apollo Hospitals Bhubaneswar',
    },
    {
      name: 'AMRI Hospitals Bhubaneswar',
      address: 'Plot No. 1, Near Satyasai Enclave, Khandagiri, Bhubaneswar, Odisha 751030',
      phone: '+916746666600',
      mapsQuery: 'AMRI Hospitals Bhubaneswar',
    },
    {
      name: 'SUM Ultimate Medicare',
      address: 'K8, Kalinga Nagar, Bhubaneswar, Odisha 751003',
      phone: '+9118003132424',
      mapsQuery: 'SUM Ultimate Medicare Bhubaneswar',
    },
    {
      name: 'Hi-Tech Medical College & Hospital',
      address: 'Pandra, Rasulgarh, Bhubaneswar, Odisha 751025',
      phone: '+916742371700',
      mapsQuery: 'Hi-Tech Medical College and Hospital Bhubaneswar',
    },
  ];

  const services = [
    {
      title: 'Labs & Blood Banks',
      description: 'Book lab tests and find blood banks',
      icon: TestTube,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      title: 'Book Appointment',
      description: 'Schedule with healthcare providers',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-600',
    },
    {
      title: 'Emergency',
      description: 'Get immediate medical assistance',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-600',
    },
    {
      title: 'Your Reports',
      description: 'Access your medical history',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-600',
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group ${service.hoverColor} hover:text-white`}
              onClick={() => {
                if (service.title === 'Emergency') {
                  setShowEmergencyModal(true);
                }
                if (service.title === 'Book Appointment') {
                  setShowAppointmentModal(true);
                }
                if (service.title === 'Your Reports') {
                  setShowReportsModal(true);
                }
                if (service.title === 'Labs & Blood Banks') {
                  setLabsStep('home');
                  setSelectedTests([]);
                  setShowLabsModal(true);
                }
              }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-lg ${service.bgColor} group-hover:bg-white/20 transition-colors`}>
                  <Icon className={`w-8 h-8 ${service.color} group-hover:text-white transition-colors`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAppointmentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAppointmentModal(false)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white px-6 py-5 relative">
              <h3 className="text-xl font-semibold">Book Appointment</h3>
              <p className="text-white/90 text-sm">Select a date and time for your consultation</p>
              <button
                aria-label="Close"
                onClick={() => setShowAppointmentModal(false)}
                className="absolute right-3 top-3 p-2 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Clock className="w-4 h-4" />
                  </span>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full appearance-none pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {['09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM'].map(ts => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full appearance-none pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Dr. Ayushman Sharma (Cardiologist)</option>
                    <option>Dr. Neha Mishra (General Physician)</option>
                    <option>Dr. R. Mohanty (Dermatologist)</option>
                    <option>Dr. K. Sahu (Orthopedic)</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <select
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                    className="w-full appearance-none pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Video Consultation (Online)</option>
                    <option>In-Person (KIMS Hospital, KIIT)</option>
                    <option>In-Person (AMRI Hospitals, Khandagiri)</option>
                  </select>
                </div>
              </div>

              {/* Reason for visit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Fever and headache"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  const item: HistoryItem = {
                    id: `${Date.now()}`,
                    date,
                    timeSlot,
                    doctor,
                    locationType,
                    reason,
                  };
                  const updated = [item, ...history];
                  setHistory(updated);
                  try {
                    localStorage.setItem('medicalHistory', JSON.stringify(updated));
                  } catch {}
                  showToast(`Appointment booked on ${date} at ${timeSlot} with ${doctor}.`);
                  setShowAppointmentModal(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
              >
                Book Appointment Now <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-6 text-sm text-gray-600 pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> 24/7 Available Doctors
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> 100% Safe & Secure
                </div>
              </div>
            </div>

            
          </div>
        </div>
      )}

      {/* Global Toast */}
      {toastVisible && (
        <div className="fixed top-4 right-4 z-[60]">
          <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-white shadow-lg p-4 min-w-[280px]">
            <div className="mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm text-gray-800">
              <div className="font-semibold text-gray-900 mb-0.5">Appointment Confirmed</div>
              <div>{toastMessage}</div>
            </div>
            <button
              aria-label="Close notification"
              onClick={() => setToastVisible(false)}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showLabsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLabsModal(false)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-3xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 relative">
              <h3 className="text-xl font-semibold">
                {labsStep === 'labs' ? 'Book Lab Tests' : 'Labs & Blood Banks'}
              </h3>
              <p className="text-white/90 text-sm">
                {labsStep === 'labs' ? 'Select tests and proceed to booking' : 'Choose an option to continue'}
              </p>
              <button
                aria-label="Close"
                onClick={() => {
                  setShowLabsModal(false);
                  setLabsStep('home');
                  setSelectedTests([]);
                }}
                className="absolute right-3 top-3 p-2 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Body */}
            {labsStep === 'home' && (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Labs Option */}
                  <button
                    onClick={() => setLabsStep('labs')}
                    className="group w-full text-left p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <Microscope className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-gray-900">Labs</div>
                        <div className="text-sm text-gray-600">Book lab tests and diagnostics</div>
                      </div>
                    </div>
                  </button>

                  {/* Blood Banks Option */}
                  <button
                    onClick={() => setLabsStep('blood')}
                    className="group w-full text-left p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-red-50">
                        <Droplet className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-gray-900">Blood Banks</div>
                        <div className="text-sm text-gray-600">Find nearby blood banks</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {labsStep === 'labs' && (
              <div className="p-6">
                {/* Subheader */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-gray-700 text-sm">Popular Tests</div>
                  <button
                    onClick={() => {
                      setLabsStep('home');
                      setSelectedTests([]);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                </div>

                {/* Tests grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {labTests.map((t) => {
                    const selected = selectedTests.includes(t.name);
                    return (
                      <div key={t.name} className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                        <div className={`h-1.5 bg-gradient-to-r ${t.color}`} />
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <ClipboardList className="w-4 h-4 text-gray-500" />
                                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Sample: {t.sample}</span>
                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Reports: {t.reportTime}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">₹ {t.price}</div>
                              <button
                                onClick={() => toggleTest(t.name)}
                                className={`mt-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selected ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                              >
                                {selected ? 'Selected' : 'Select'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary CTA */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-700">
                    {selectedTests.length > 0 ? (
                      <>
                        <span className="font-medium">{selectedTests.length}</span> test(s) selected • Total: <span className="font-semibold">₹ {totalPrice}</span>
                      </>
                    ) : (
                      <span>Select tests to continue</span>
                    )}
                  </div>
                  <button
                    disabled={selectedTests.length === 0}
                    onClick={() => {
                      alert(`Booked ${selectedTests.length} test(s):\n- ${selectedTests.join('\n- ')}\nTotal: ₹ ${totalPrice}`);
                      setShowLabsModal(false);
                      setLabsStep('home');
                      setSelectedTests([]);
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium ${selectedTests.length === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Proceed to Book <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {labsStep === 'blood' && (
              <div className="p-6">
                {/* Controls */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Building className="w-4 h-4" />
                    <span>Blood Banks</span>
                  </div>
                  <button onClick={() => setLabsStep('home')} className="text-sm text-blue-600 hover:text-blue-700">← Back</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  {/* Blood group */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Units */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={units}
                      onChange={(e) => setUnits(Math.max(1, Math.min(5, Number(e.target.value))))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Order Type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fulfillment</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setOrderType('pickup')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${orderType==='pickup' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        <ShoppingBag className="w-4 h-4" /> Pickup
                      </button>
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${orderType==='delivery' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        <Truck className="w-4 h-4" /> Delivery
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-4 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name or area..."
                    value={bloodSearch}
                    onChange={(e) => setBloodSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Banks list */}
                <div className="space-y-4">
                  {bloodBanks
                    .filter(bb => bb.name.toLowerCase().includes(bloodSearch.toLowerCase()) || bb.address.toLowerCase().includes(bloodSearch.toLowerCase()))
                    .map((bb) => {
                      const available = bb.stock[bloodGroup] || 0;
                      const canFulfill = available >= units;
                      return (
                        <div key={bb.name} className="p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold text-gray-900">{bb.name}</div>
                              <div className="mt-1 flex items-start gap-2 text-gray-600">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                                <span className="text-sm">{bb.address}</span>
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                <span className={`px-2 py-1 rounded-full ${available>0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                  {bloodGroup} Available: {available} unit(s)
                                </span>
                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Max per order: 5</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {bb.phone && (
                                <a
                                  href={`tel:${bb.phone.replace(/\s|\(|\)|-/g, '')}`}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                                >
                                  <PhoneCall className="w-4 h-4" /> Call
                                </a>
                              )}
                              <button
                                disabled={!canFulfill}
                                onClick={() => {
                                  if (!canFulfill) return;
                                  const msg = `Request placed for ${units} unit(s) of ${bloodGroup} at ${bb.name} via ${orderType}.`;
                                  alert(msg);
                                }}
                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${canFulfill ? (orderType==='delivery' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-blue-600 text-white hover:bg-blue-700') : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                              >
                                {orderType==='delivery' ? <Truck className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />} {orderType==='delivery' ? 'Order for Delivery' : 'Reserve for Pickup'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showReportsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowReportsModal(false)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-purple-600 text-white px-6 py-5 relative">
              <h3 className="text-xl font-semibold">Your Reports</h3>
              <p className="text-white/90 text-sm">All your past appointments and reasons</p>
              <button
                aria-label="Close"
                onClick={() => setShowReportsModal(false)}
                className="absolute right-3 top-3 p-2 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {history.length === 0 ? (
                <div className="text-center text-gray-600">No appointments yet. Book one to see it here.</div>
              ) : (
                <ul className="space-y-4">
                  {history.map((h) => (
                    <li key={h.id} className="p-4 rounded-lg border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-semibold text-gray-900">{h.date} • {h.timeSlot}</div>
                          <div className="text-sm text-gray-700">{h.doctor}</div>
                          <div className="text-sm text-gray-600">{h.locationType}</div>
                        </div>
                        <div className="text-sm text-gray-700"><span className="font-medium">Reason:</span> {h.reason}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {showEmergencyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowEmergencyModal(false)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Nearby Hospitals</h3>
              </div>
              <button
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setShowEmergencyModal(false)}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto">
              <p className="text-sm text-gray-600 mb-4">
                If this is a life-threatening emergency, call your local emergency number immediately.
              </p>

              <ul className="space-y-4">
                {nearbyHospitals.map((h, idx) => (
                  <li key={idx} className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">{h.name}</h4>
                        <div className="mt-1 flex items-start gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                          <span className="text-sm">{h.address}</span>
                        </div>
                        {h.phone && (
                          <div className="mt-1 text-gray-700 text-sm">{h.phone}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {h.phone && (
                          <a
                            href={`tel:${h.phone.replace(/\s|\(|\)|-/g, '')}`}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
                          >
                            <PhoneCall className="w-4 h-4" /> Call
                          </a>
                        )}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapsQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                        >
                          <MapPin className="w-4 h-4" /> Maps
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <button
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowEmergencyModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;