import React from 'react';
import Navbar from './patient/Navbar';
import HealthOverview from './patient/HealthOverview';
import Services from './patient/Services';
import MedicalImaging from './patient/MedicalImaging';
import AppointmentsMedications from './patient/AppointmentsMedications';
import Initiatives from './patient/Initiatives';
import Footer from './patient/Footer';

const PatientDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </div>

        <HealthOverview />
        <Services />
        <MedicalImaging />
        <AppointmentsMedications />
        <Initiatives />
      </main>

      <Footer />
    </div>
  );
};

export default PatientDashboard;