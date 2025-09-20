import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './patient/Navbar';
import HealthOverview from './patient/HealthOverview';
import Services from './patient/Services';
import MedicalImaging from './patient/MedicalImaging';
import AppointmentsMedications from './patient/AppointmentsMedications';
import Initiatives from './patient/Initiatives';
import Footer from './patient/Footer';

const PatientDashboard: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        {/* Welcome Section */}
        <motion.div 
          className="relative mb-12 p-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl text-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-blue-600 transform-gpu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full -mr-8 -mt-8 opacity-20"></div>
          <div className="absolute bottom-0 right-10 w-20 h-20 bg-white rounded-full -mb-8 -mr-8 opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="transition-all duration-300 group">
                <p className="text-blue-100 font-medium mb-1 group-hover:text-white transition-colors duration-300">Welcome back,</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300 inline-block">John! <span className="inline-block group-hover:animate-wave">👋</span></h1>
                <p className="text-blue-100 group-hover:text-white transition-colors duration-300">Here's your health overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Last login</p>
                  <p className="font-medium">2 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-blue-400/30 flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm font-medium">All systems normal</span>
              </div>
              <div className="hidden sm:flex items-center text-sm text-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No pending actions
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-20">
          <HealthOverview />
          <Services />
          <MedicalImaging />
          <AppointmentsMedications />
          <Initiatives />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientDashboard;