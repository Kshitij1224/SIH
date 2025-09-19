import { useState } from 'react';
import { Building2, UserCog, ArrowLeft } from 'lucide-react';

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
  });

  const [admin, setAdmin] = useState({
    name: 'Dr. Admin',
    role: 'Hospital Administrator',
    email: 'admin@medxhospital.in',
    phone: '+91-98100-12345',
  });

  const onHospitalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setHospital((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Persist to backend or localStorage
    alert('Settings saved locally (demo).');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
            <Building2 className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Hospital & Admin Settings</h2>
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <form onSubmit={saveSettings} className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hospital Settings */}
        <section className="border border-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Hospital Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Hospital Name</label>
              <input name="name" value={hospital.name} onChange={onHospitalChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Phone</label>
              <input name="phone" value={hospital.phone} onChange={onHospitalChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-500">Address</label>
              <input name="address" value={hospital.address} onChange={onHospitalChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input name="email" value={hospital.email} onChange={onHospitalChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Total Beds</label>
              <input name="totalBeds" type="number" min={0} value={hospital.totalBeds} onChange={onHospitalChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">ICU Beds</label>
              <input name="icuBeds" type="number" min={0} value={hospital.icuBeds} onChange={onHospitalChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input id="emergency24x7" name="emergency24x7" type="checkbox" checked={hospital.emergency24x7} onChange={onHospitalChange} />
              <label htmlFor="emergency24x7" className="text-sm text-gray-700">Emergency 24x7 Available</label>
            </div>
          </div>
        </section>

        {/* Admin Settings */}
        <section className="border border-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <UserCog className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Admin Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <input name="name" value={admin.name} onChange={onAdminChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Role</label>
              <input name="role" value={admin.role} onChange={onAdminChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input name="email" value={admin.email} onChange={onAdminChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Phone</label>
              <input name="phone" value={admin.phone} onChange={onAdminChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="lg:col-span-2 flex items-center justify-end gap-3">
          <button type="button" onClick={goHome} className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
