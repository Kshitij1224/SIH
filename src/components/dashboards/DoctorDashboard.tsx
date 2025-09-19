import { useState } from 'react';
import { Header } from './doctor/Header';
import { Doctor } from '../../types/auth';
import { useAuth } from '../contexts/AuthContext';
import { Dashboard } from './doctor/Dashboard';
import { Appointments } from './doctor/Appointments';
import { Patients } from './doctor/Patients';
import { Messages } from './doctor/Messages';
import { Profile } from './doctor/Profile';
import { Settings } from './doctor/Settings';
import { AIAssistant } from './doctor/AIAssistant';
import Footer from './doctor/Footer';

export type TabType = 'dashboard' | 'appointments' | 'patients' | 'messages' | 'profile' | 'settings';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const { user } = useAuth();
  const doctor = user && user.role === 'doctor' ? (user as Doctor) : null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'patients':
        return <Patients />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} doctor={doctor} />
      
      <div className="flex flex-1">
        <main className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </main>
        
        {showAIAssistant && (
          <AIAssistant onClose={() => setShowAIAssistant(false)} />
        )}
      </div>

      {/* AI Assistant Toggle Button */}
      <button
        onClick={() => setShowAIAssistant(!showAIAssistant)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Toggle AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
