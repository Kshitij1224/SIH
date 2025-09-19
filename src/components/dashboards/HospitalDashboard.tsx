import { useEffect, useState } from 'react';
import Navbar from '@/components/dashboards/hospital/Navbar';
import KeyStats from '@/components/dashboards/hospital/KeyStats';
import StaffAndDepartments from '@/components/dashboards/hospital/StaffAndDepartments';
import DataTables from '@/components/dashboards/hospital/DataTables';
// Using the same file for both footers since we've updated MinimalFooter to be the comprehensive Footer
import Footer from '@/components/dashboards/hospital/MinimalFooter';
import DischargesPage from '@/components/dashboards/hospital/pages/DischargesPage';
import AdmissionsPage from '@/components/dashboards/hospital/pages/AdmissionsPage';
import DoctorsPage from './hospital/pages/DoctorsPage';
import NursesPage from '@/components/dashboards/hospital/pages/NursesPage';
import StaffPage from '@/components/dashboards/hospital/pages/StaffPage';
import DepartmentsPage from '@/components/dashboards/hospital/pages/DepartmentsPage';
import DoctorActivityPage from '@/components/dashboards/hospital/pages/DoctorActivityPage';
import PatientsPage from '@/components/dashboards/hospital/pages/PatientsPage';
import SettingsPage from './hospital/pages/SettingsPage';
import PreferencesPage from './hospital/pages/PreferencesPage';

const HospitalDashboard = () => {
  const [route, setRoute] = useState<string>('#/');

  useEffect(() => {
    // This code will only run on the client side
    setRoute(window.location.hash || '#/');
    
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isDischarges = route === '#/discharges';
  const isAdmissions = route === '#/admissions';
  const isDoctors = route === '#/doctors';
  const isNurses = route === '#/nurses';
  const isStaff = route === '#/staff';
  const isDepartments = route === '#/departments';
  const isDoctorActivity = route === '#/doctor-activity';
  const isPatients = route === '#/patients';
  const isSettings = route === '#/settings';
  const isPreferences = route === '#/preferences';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="w-[90%] mx-auto px-6 py-8">
        {isDischarges ? (
          <DischargesPage />
        ) : isAdmissions ? (
          <AdmissionsPage />
        ) : isDoctors ? (
          <DoctorsPage />
        ) : isPatients ? (
          <PatientsPage />
        ) : isNurses ? (
          <NursesPage />
        ) : isStaff ? (
          <StaffPage />
        ) : isDepartments ? (
          <DepartmentsPage />
        ) : isDoctorActivity ? (
          <DoctorActivityPage />
        ) : isSettings ? (
          <SettingsPage />
        ) : isPreferences ? (
          <PreferencesPage />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi, Apollo</h1>
              <p className="text-gray-600">Welcome back. Here's your hospital overview.</p>
            </div>

            <KeyStats />
            <StaffAndDepartments />
            <DataTables />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default HospitalDashboard;