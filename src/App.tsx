import React, { useState, Suspense } from 'react';
import './i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HeartAnimation from './components/HeartAnimation';
import Navigation from './components/Navigation';
import MarqueeSection from './components/MarqueeSection';
import GovernmentSchemes from './components/GovernmentSchemes';
import LoginModal from './components/LoginModal';
import AIChatbot from './components/AIChatbot';
import Telemedicine from './components/Telemedicine';
import VideoSection from './components/VideoSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PatientDashboard from './components/dashboards/PatientDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import HospitalDashboard from './components/dashboards/HospitalDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppContent = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleLandingComplete = () => {
    setShowLanding(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <HeartAnimation key="landing" onComplete={handleLandingComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen"
          >
            <Navigation onLoginClick={() => setShowLoginModal(true)} />
            <MarqueeSection />
            
            <main className="relative">
              {/* Hero Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-teal-50"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Welcome to <span className="text-blue-600">MedX</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Your comprehensive healthcare platform offering AI-powered assistance, 
                    telemedicine services, and access to government health schemes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => document.getElementById('ai-chatbot')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105 duration-200"
                    >
                      Try AI Assistant
                    </button>
                    <button
                      onClick={() => document.getElementById('government-schemes')?.scrollIntoView({ behavior: 'smooth' })}
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 duration-200"
                    >
                      Explore Schemes
                    </button>
                  </div>
                </div>
              </motion.section>

              <GovernmentSchemes />
              <AIChatbot />
              <Telemedicine />
              <VideoSection />
              <FAQ />
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
      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </Suspense>
  );
}

export default App;