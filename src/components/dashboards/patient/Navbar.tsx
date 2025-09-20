import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, ChevronDown, X, Calendar, Clock, MapPin, MessageCircle, Send, Bot } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Language selector state
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{ code: string; name: string; flag: string }>({ code: 'en', name: 'English', flag: '🇺🇸' });
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  // Appointments modal state
  const [showApptsModal, setShowApptsModal] = useState(false);
  type HistoryItem = { id: string; date: string; timeSlot: string; doctor: string; locationType: string; reason: string };
  const [history, setHistory] = useState<HistoryItem[]>([]);
  // Records now opens a dedicated page (public/records.html)

  // Chat modal state (multi-doctor)
  const [showChatModal, setShowChatModal] = useState(false);
  type ChatMsg = { id: string; sender: 'user' | 'bot'; text: string; time: string };
  type Doctor = { id: string; name: string; specialty: string; avatar: string };
  const doctors: Doctor[] = [
    { id: 'd1', name: 'Dr. Sarah Smith', specialty: 'Cardiologist', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: 'd2', name: 'Dr. Michael Johnson', specialty: 'Neurologist', avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1' },
    { id: 'd3', name: 'Dr. Neha Mishra', specialty: 'General Physician', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];
  const [activeDoctorId, setActiveDoctorId] = useState<string>(doctors[0].id);
  const initialWelcome = () => ({ id: `c-${Date.now()}`, sender: 'bot' as const, text: 'Hello, how can I assist you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  const [chatsByDoctor, setChatsByDoctor] = useState<Record<string, ChatMsg[]>>({
    [doctors[0].id]: [initialWelcome()],
    [doctors[1].id]: [initialWelcome()],
    [doctors[2].id]: [initialWelcome()],
  });
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, sender: 'user', text, time: now };
    setChatsByDoctor((prev) => ({ ...prev, [activeDoctorId]: [...(prev[activeDoctorId] || []), userMsg] }));
    setChatInput('');
    setIsTyping(true);
    // Simple simulated assistant response
    window.setTimeout(() => {
      const replyText = simulateAssistantReply(text);
      const botMsg: ChatMsg = { id: `b-${Date.now()}`, sender: 'bot', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChatsByDoctor((prev) => ({ ...prev, [activeDoctorId]: [...(prev[activeDoctorId] || []), botMsg] }));
      setIsTyping(false);
    }, 900);
  };

  // Notifications dropdown state
  const [showNotif, setShowNotif] = useState(false);
  type Notif = { id: string; kind: 'appointment' | 'chat' | 'info'; title: string; detail: string; time: string };
  const [notifs, setNotifs] = useState<Notif[]>([]);

  // Build a short notifications list when opened
  useEffect(() => {
    if (!showNotif) return;
    const items: Notif[] = [];
    // Latest appointment
    const latestAppt = [...history].sort((a,b) => (a.date < b.date ? 1 : -1))[0];
    if (latestAppt) {
      items.push({
        id: `n-appt-${latestAppt.id}`,
        kind: 'appointment',
        title: 'Appointment booked',
        detail: `${latestAppt.date} • ${latestAppt.timeSlot} with ${latestAppt.doctor}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    // Latest chat (from active doctor)
    const latestArr = chatsByDoctor[activeDoctorId] || [];
    const latestChat = latestArr[latestArr.length - 1];
    if (latestChat) {
      items.push({
        id: `n-chat-${latestChat.id}`,
        kind: 'chat',
        title: latestChat.sender === 'user' ? 'You sent a message' : 'New reply from doctor',
        detail: latestChat.text.length > 60 ? latestChat.text.slice(0,60)+'…' : latestChat.text,
        time: latestChat.time,
      });
    }
    // Generic info
    items.push({
      id: 'n-info-1',
      kind: 'info',
      title: 'Health Tip',
      detail: 'Stay hydrated and aim for 7–8 hours of sleep.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setNotifs(items.slice(0,3));
  }, [showNotif, history, chatsByDoctor, activeDoctorId]);

  // Profile opens a dedicated page (public/profile.html)

  const simulateAssistantReply = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes('appointment')) return 'You can book an appointment from Services → Book Appointment. Need me to open it?';
    if (lower.includes('report')) return 'Your reports are listed under Records. I can summarize them if you want.';
    if (lower.includes('blood')) return 'Blood banks are available under Labs & Blood Banks. Tell me your group and units.';
    return 'Got it! I\'ll note that. Ask me about appointments, reports, labs, or general health tips.';
  };

  // Sample history as fallback so Records is not empty on fresh load
  const sampleHistory: HistoryItem[] = [
    { id: 'n1', date: '2025-09-10', timeSlot: '10:00 AM', doctor: 'Dr. Neha Mishra (General Physician)', locationType: 'In-Person (KIMS Hospital, KIIT)', reason: 'Fever and body ache' },
    { id: 'n2', date: '2025-08-22', timeSlot: '03:00 PM', doctor: 'Dr. R. Mohanty (Dermatologist)', locationType: 'Video Consultation (Online)', reason: 'Skin rash and irritation' },
    { id: 'n3', date: '2025-07-05', timeSlot: '11:30 AM', doctor: 'Dr. K. Sahu (Orthopedic)', locationType: 'In-Person (AMRI Hospitals, Khandagiri)', reason: 'Left knee pain' },
  ];

  useEffect(() => {
    if (!showApptsModal) return;
    try {
      const raw = localStorage.getItem('medicalHistory');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) setHistory(parsed);
        else setHistory(sampleHistory);
      } else {
        setHistory(sampleHistory);
      }
    } catch {
      setHistory(sampleHistory);
    }
  }, [showApptsModal]);

  const categorize = (items: HistoryItem[]) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const past: HistoryItem[] = [];
    const today: HistoryItem[] = [];
    const future: HistoryItem[] = [];
    for (const it of items) {
      if (it.date < todayStr) past.push(it);
      else if (it.date === todayStr) today.push(it);
      else future.push(it);
    }
    return { past, today, future };
  };

  const filteredDoctors = doctors.filter((d) => {
    const q = doctorSearch.trim().toLowerCase();
    if (!q) return true;
    return d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
  });

  return (
    <>
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              {/* Solid blue heart, no border */}
              <svg
                className="w-8 h-8 mr-3 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="blue heart"
                role="img"
              >
                <title>MedX</title>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.2 2.58C11.49 5.01 13.16 4 14.9 4 17.4 4 19.4 6 19.4 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">MedX</span>
            </div>
          </div>

          {/* Center Navigation (absolute centered) */}
          <div className="hidden md:flex absolute inset-x-0 justify-center">
            <div className="flex items-baseline space-x-4">
              <Link 
                to="/patient/dashboard"
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === '/patient/dashboard' || location.pathname === '/patient/dashboard/'
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/patient/appointments"
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  location.pathname.startsWith('/patient/appointments')
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Appointments
              </Link>
              <Link 
                to="/chat"
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === '/chat'
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                AI Chatbot
              </Link>
              <a 
                href="#/records" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/record.html';
                }}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  window.location.hash === '#/records'
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Records
              </a>
              <a 
                href="#/chat" 
                onClick={(e) => {
                  e.preventDefault();
                  setShowChatModal(true);
                }}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  window.location.hash === '#/chat'
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Chat
              </a>
            </div>
          </div>

          {/* Right side: Language, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-haspopup="menu"
                aria-expanded={showLanguageDropdown}
              >
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="text-sm font-medium text-gray-700">{selectedLanguage.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}

    {/* Chat Modal */}
    {showChatModal && (
      <div className="fixed inset-0 z-[70] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowChatModal(false)} />
        <div className="relative z-10 w-full max-w-4xl mx-4 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-6 py-5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Medical Chat</h3>
                  <p className="text-sm text-blue-100">Connect with your healthcare providers</p>
                </div>
              </div>
              <button 
                aria-label="Close" 
                onClick={() => setShowChatModal(false)} 
                className="p-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Body: Doctors list + Messages */}
          <div className="flex">
            {/* Sidebar: doctors */}
            <aside className="w-72 border-r border-gray-200 bg-white">
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Healthcare Providers</h4>
                <div className="relative">
                  <input
                    value={doctorSearch}
                    onChange={(e) => setDoctorSearch(e.target.value)}
                    placeholder="Search by name or specialty..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <ul className="max-h-[calc(75vh-120px)] overflow-y-auto py-2">
                {filteredDoctors.length === 0 ? (
                  <li className="px-4 py-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No doctors found</p>
                  </li>
                ) : (
                  filteredDoctors.map((d) => (
                    <li key={d.id} className="px-3">
                      <button
                        onClick={() => setActiveDoctorId(d.id)}
                        className={`w-full flex items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                          activeDoctorId === d.id 
                            ? 'bg-blue-50 border border-blue-100' 
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="relative">
                          <img src={d.avatar} alt={d.name} className="w-10 h-10 rounded-full object-cover" />
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                            activeDoctorId === d.id ? 'bg-green-400' : 'bg-gray-300'
                          }`}></span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{d.name}</div>
                          <div className="text-xs text-gray-500 truncate">{d.specialty}</div>
                          {activeDoctorId === d.id && (
                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Active Chat
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </aside>

            {/* Messages and input */}
            <section className="flex-1 flex flex-col">
              <div className="p-4 max-h-[75vh] overflow-y-auto space-y-3 bg-gray-50">
                {(chatsByDoctor[activeDoctorId] || []).map((m: ChatMsg) => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'}`}>
                      <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                      <div className={`mt-1 text-[10px] ${m.sender==='user' ? 'text-blue-100' : 'text-gray-500'}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[60%] rounded-2xl px-4 py-2 bg-white text-gray-600 rounded-bl-sm border border-gray-200 shadow-sm">
                      <div className="text-sm">Typing…</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="px-6 pt-4 pb-2 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {['Book appointment', 'Show my reports', 'Find blood bank', 'Health tip'].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setChatInput(q); setTimeout(() => sendChat(), 0); }}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200
                        border border-blue-200 hover:border-blue-300 hover:shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') sendChat(); }}
                      placeholder={`Message ${doctors.find(d=>d.id===activeDoctorId)?.name || 'doctor'}...`}
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder:text-gray-400 text-gray-600"
                    />
                    <button
                      onClick={sendChat}
                      disabled={!chatInput.trim()}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all duration-200
                        ${chatInput.trim() 
                          ? 'text-blue-600 hover:bg-blue-50'
                          : 'text-gray-300'
                        }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )}

    {/* Records now opens in a new tab (public/records.html). Inline modal removed. */}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowNotif((v) => !v)}
                className="relative text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Notifications"
                aria-haspopup="menu"
                aria-expanded={showNotif}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">Notifications</div>
                  <ul className="max-h-72 overflow-y-auto">
                    {notifs.length === 0 ? (
                      <li className="px-4 py-3 text-sm text-gray-500">No new notifications</li>
                    ) : (
                      notifs.map((n) => (
                        <li key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            {n.kind === 'appointment' ? (
                              <Calendar className="w-4 h-4 mt-0.5 text-blue-600" />
                            ) : n.kind === 'chat' ? (
                              <MessageCircle className="w-4 h-4 mt-0.5 text-emerald-600" />
                            ) : (
                              <Bell className="w-4 h-4 mt-0.5 text-indigo-600" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">{n.title}</div>
                              <div className="text-xs text-gray-600 truncate">{n.detail}</div>
                            </div>
                            <div className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                  <div className="px-4 py-2 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer rounded-b-lg" onClick={() => setShowNotif(false)}>
                    Close
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((v) => !v)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                aria-haspopup="menu"
                aria-expanded={showProfileMenu}
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => { setShowProfileMenu(false); window.location.href = '/profile.html'; }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Clear user data from localStorage
                      localStorage.removeItem('user');
                      // Navigate to root with skipLoading state
                      navigate('/', { state: { skipLoading: true } });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 last:rounded-b-lg"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    {/* Appointments Modal */}
    {showApptsModal && (
      <div className="fixed inset-0 z-[70] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowApptsModal(false)} />
        <div className="relative z-10 w-full max-w-3xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 relative">
            <h3 className="text-xl font-semibold">All Appointments</h3>
            <p className="text-white/90 text-sm">Past, today, and upcoming appointments</p>
            <button aria-label="Close" onClick={() => setShowApptsModal(false)} className="absolute right-3 top-3 p-2 rounded-md hover:bg-white/10">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            {(() => {
              const { past, today, future } = categorize(history);
              const Section = ({ title, data }: { title: string; data: HistoryItem[] }) => (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
                  {data.length === 0 ? (
                    <div className="text-sm text-gray-500">No records.</div>
                  ) : (
                    <ul className="space-y-3">
                      {data.map((h) => (
                        <li key={h.id} className="p-4 rounded-lg border border-gray-200">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-3 text-gray-800">
                                <span className="inline-flex items-center gap-1 text-sm"><Calendar className="w-4 h-4 text-blue-600" /> {h.date}</span>
                                <span className="inline-flex items-center gap-1 text-sm"><Clock className="w-4 h-4 text-blue-600" /> {h.timeSlot}</span>
                              </div>
                              <div className="mt-1 text-sm text-gray-700">{h.doctor}</div>
                              <div className="mt-1 inline-flex items-center gap-1 text-xs text-gray-600"><MapPin className="w-4 h-4 text-gray-500" /> {h.locationType}</div>
                              <div className="mt-1 text-xs text-gray-500">Reason: {h.reason}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
              return (
                <>
                  <Section title="Today" data={today} />
                  <Section title="Upcoming" data={future} />
                  <Section title="Past" data={past} />
                </>
              );
            })()}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;