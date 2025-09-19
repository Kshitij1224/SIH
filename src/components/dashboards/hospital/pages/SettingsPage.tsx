import { useState, useEffect } from 'react';
import { Building2, UserCog, ArrowLeft, Shield, Save, AlertCircle, CheckCircle } from 'lucide-react';

const SettingsPage = () => {
  const goHome = () => {
    window.location.hash = '#/'
  };

  // Sample settings state (no persistence yet)
  const [hospital, setHospital] = useState({
    name: 'MedX Multispeciality Hospital',
    address: 'Block A, Sector 21, New Delhi, 110001',
    phone: '+91-011-4000-1000',
    email: 'info@medxhospital.in',
    totalBeds: 250,
    icuBeds: 30,
    emergency24x7: true,
    website: 'www.medxhospital.in',
    established: '2015',
    accreditation: 'NABH, NABL'
  });

  const [admin, setAdmin] = useState({
    name: 'Dr. Admin',
    role: 'Hospital Administrator',
    email: 'admin@medxhospital.in',
    phone: '+91-98100-12345',
    department: 'Administration',
    emergencyContact: '+91-98765-43210'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{type: 'success' | 'error' | null, message: string} | null>(null);
  
  // Create local state for form data to handle cancel functionality
  const [formData, setFormData] = useState({
    hospital: { ...hospital },
    admin: { ...admin }
  });
  
  // Update local form data when props change
  useEffect(() => {
    setFormData({
      hospital: { ...hospital },
      admin: { ...admin }
    });
  }, [hospital, admin]);

  const onHospitalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!isEditing) return;
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      hospital: { 
        ...prev.hospital, 
        [name]: type === 'checkbox' ? checked : value 
      }
    }));
  };

  const onAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      admin: { 
        ...prev.admin, 
        [name]: value 
      }
    }));
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // If turning off edit mode, reset form data
      setFormData({
        hospital: { ...hospital },
        admin: { ...admin }
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleCancel = () => {
    // Reset form data and exit edit mode
    setFormData({
      hospital: { ...hospital },
      admin: { ...admin }
    });
    setIsEditing(false);
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;
    
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the main state with the new values
      setHospital(formData.hospital);
      setAdmin(formData.admin);
      
      setSaveStatus({
        type: 'success',
        message: 'Settings saved successfully!'
      });
      
      // Exit edit mode after successful save
      setTimeout(() => {
        setIsEditing(false);
      }, 1000);
      
    } catch (error) {
      setSaveStatus({
        type: 'error',
        message: 'Failed to save settings. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hospital Settings</h1>
              <p className="text-sm text-blue-100">Manage your hospital and admin configurations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEditToggle}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Settings
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={goHome} 
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      
      {/* Save status indicator */}
      {saveStatus && (
        <div className={`px-6 py-3 text-sm font-medium ${
          saveStatus.type === 'success' 
            ? 'bg-green-50 text-green-800' 
            : 'bg-red-50 text-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {saveStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {saveStatus.message}
          </div>
        </div>
      )}

      <form onSubmit={saveSettings} className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
      {!isEditing && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
          <button
            type="button"
            onClick={handleEditToggle}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-blue-700 bg-white border-2 border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Click to Edit Settings
          </button>
        </div>
      )}
        {/* Hospital Settings */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Hospital Profile</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Update your hospital's basic information and contact details</p>
          </div>
          
          <div className="p-6 space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Hospital Name</label>
              <input 
                name="name" 
                value={isEditing ? formData.hospital.name : hospital.name} 
                onChange={onHospitalChange} 
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                placeholder="Enter hospital name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  name="phone" 
                  value={hospital.phone} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="+91-XXX-XXXX-XXXX"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  name="email" 
                  type="email"
                  value={hospital.email} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="contact@hospital.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Total Beds</label>
                <input 
                  name="totalBeds" 
                  type="number" 
                  min={0} 
                  value={hospital.totalBeds} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">ICU Beds</label>
                <input 
                  name="icuBeds" 
                  type="number" 
                  min={0} 
                  value={hospital.icuBeds} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Website</label>
                <input 
                  name="website" 
                  value={hospital.website} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="www.hospital.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Established Year</label>
                <input 
                  name="established" 
                  value={hospital.established} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="e.g., 2010"
                />
              </div>
              
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Accreditation</label>
                <input 
                  name="accreditation" 
                  value={hospital.accreditation} 
                  onChange={onHospitalChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="e.g., NABH, NABL, JCI"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 pt-2">
              <div className="flex items-center">
                <input 
                  id="emergency24x7" 
                  name="emergency24x7" 
                  type="checkbox" 
                  checked={isEditing ? formData.hospital.emergency24x7 : hospital.emergency24x7} 
                  onChange={onHospitalChange}
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  !isEditing ? 'bg-gray-100' : 'bg-white'
                }`}
                />
                <label htmlFor="emergency24x7" className="ml-2 block text-sm text-gray-700">
                  24/7 Emergency Services Available
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">Enable this if your hospital provides round-the-clock emergency services</p>
            </div>
          </div>
        </section>

        {/* Admin Settings */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCog className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Profile</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Update administrator's contact information and role</p>
          </div>
          
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  name="name" 
                  value={isEditing ? formData.admin.name : admin.name} 
                  onChange={onAdminChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <input 
                  name="role" 
                  value={isEditing ? formData.admin.role : admin.role} 
                  onChange={onAdminChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="e.g., Hospital Administrator"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <input 
                  name="department" 
                  value={isEditing ? formData.admin.department : admin.department} 
                  onChange={onAdminChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="e.g., Administration"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input 
                  name="email" 
                  type="email"
                  value={isEditing ? formData.admin.email : admin.email} 
                  onChange={onAdminChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="admin@hospital.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input 
                  name="phone" 
                  value={isEditing ? formData.admin.phone : admin.phone} 
                  onChange={onAdminChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="+91-XXX-XXXX-XXXX"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                <input 
                  name="emergencyContact" 
                  value={isEditing ? formData.admin.emergencyContact : admin.emergencyContact} 
                  onChange={onAdminChange} 
                  disabled={!isEditing}
                className={`w-full px-4 py-2.5 text-sm border ${
                  isEditing 
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white' 
                    : 'border-transparent bg-gray-50'
                } rounded-lg transition-colors`}
                  placeholder="+91-XXX-XXXX-XXXX"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Note
                </h4>
                <p className="mt-1 text-xs text-blue-700">
                  For security reasons, some sensitive information may require additional verification to update.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        {isEditing && (
          <div className="lg:col-span-2 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                Last saved: {new Date().toLocaleString()}
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SettingsPage;
