import { useState, Suspense } from 'react';
import './i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HeartAnimation from './components/HeartAnimation';
import Navigation from './components/Navigation';
import BlurText from './components/BlurText';
import GovernmentSchemes from './components/GovernmentSchemes';
import WhatWeOffer from './components/WhatWeOffer';
import LoginModal from './components/LoginModal';
import AIChatbot from './components/AIChatbot';
import Telemedicine from './components/Telemedicine';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import PatientDashboard from './components/dashboards/PatientDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import HospitalDashboard from './components/dashboards/HospitalDashboard';
import AppointmentsPage from './components/dashboards/patient/AppointmentsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import AIChatPage from './pages/AIChatPage';

const AppContent = () => {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLanding, setShowLanding] = useState(() => {
    // Skip loading if coming from sign out
    return !location.state?.skipLoading;
  });

  const handleLandingComplete = () => {
    // Add a small delay to ensure the loading animation completes
    setTimeout(() => {
      setShowLanding(false);
    }, 300);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.5,
                ease: "easeInOut"
              } 
            }}
          >
            <HeartAnimation onComplete={handleLandingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 0.8, 
                ease: "easeInOut",
                delay: 0.2
              } 
            }}
            className="min-h-screen bg-white"
          >
            <Navigation onLoginClick={() => setShowLoginModal(true)} />
            
            
            <main className="relative">
              {/* Hero Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
                style={{ marginTop: '72px' }}
              >
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/src/assets/main .mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-teal-600/80"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                  <div className="text-5xl md:text-6xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                    <BlurText
                      text="Welcome To"
                      animateBy="words"
                      delay={500}
                      direction="top"
                      className="inline"
                      onAnimationComplete={() => console.log('Welcome animation completed!')}
                    />
                    <BlurText
                      text="MedX"
                      animateBy="letters"
                      delay={510}
                      direction="top"
                      className="text-white"
                      animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -30 }}
                      animationTo={[
                        { filter: 'blur(5px)', opacity: 0.9, y: 5 },
                        { filter: 'blur(0px)', opacity: 1, y: 0 }
                      ]}
                    />
                  </div>
                  <p className="text-xl md:text-xl text-gray-200 mt-10 mb-8 max-w-3xl mx-auto">
                   MedX - One platform for all your healthcare needs. From records to AI-powered diagnostics, doctor discovery to telemedicine, we make trusted care accessible to everyone, everywhere in India.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => document.getElementById('telemedicine')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105 duration-200"
                    >
                      Telemedicine
                    </button>
                    <button
                      onClick={() => document.getElementById('ai-chatbot')?.scrollIntoView({ behavior: 'smooth' })}
                      className="border-2 border-white text-white hover:bg-blue-600 hover:border-blue-600 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 duration-200"
                    >
                      Try AI Assistant
                    </button>
                  </div>
                </div>
              </motion.section>
              <WhatWeOffer />
              <GovernmentSchemes />
              
              <AIChatbot />
              <Telemedicine />
              <VideoSection />
            </main>

            <Footer />

            <LoginModal 
              isOpen={showLoginModal} 
              onClose={() => setShowLoginModal(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/login" element={<Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route 
          path="/patient/dashboard" 
          element={
            <ProtectedRoute requiredUserType="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient/appointments" 
          element={
            <ProtectedRoute requiredUserType="patient">
              <AppointmentsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/chat" element={<AIChatPage />} />
        <Route 
          path="/doctor/dashboard" 
          element={
            <ProtectedRoute requiredUserType="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hospital/dashboard" 
          element={
            <ProtectedRoute requiredUserType="hospital">
              <HospitalDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;