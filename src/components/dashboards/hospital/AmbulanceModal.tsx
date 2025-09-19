import React from 'react';
import { Ambulance as AmbulanceIcon, Phone, Car, User } from 'lucide-react';

export type AmbulanceRecord = {
  id: string;
  vehicleNumber: string; // e.g., MH12 AB 1234
  driverName: string;
  driverPhone: string; // e.g., +91-9876543210
  status: 'Available' | 'On Duty' | 'Maintenance';
};

interface AmbulanceModalProps {
  open: boolean;
  onClose: () => void;
  records: AmbulanceRecord[];
}

const AmbulanceModal: React.FC<AmbulanceModalProps> = ({ open, onClose, records }) => {
  if (!open) return null;

  const total = records.length;
  const available = records.filter(r => r.status === 'Available').length;
  const onDuty = records.filter(r => r.status === 'On Duty').length;
  const maintenance = records.filter(r => r.status === 'Maintenance').length;

  const statusStyles: Record<AmbulanceRecord['status'], { chip: string; dot: string }> = {
    'Available': { chip: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
    'On Duty': { chip: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
    'Maintenance': { chip: 'bg-red-50 text-red-700', dot: 'bg-red-500' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="inline-flex p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <AmbulanceIcon className="w-5 h-5" />
            </span>
            Ambulance Fleet Status
          </h3>
          <button
            onClick={onClose}
            className="px-2 py-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
            aria-label="Close ambulance details"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-700">Total: <strong>{total}</strong></span>
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">Available: <strong>{available}</strong></span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700">On Duty: <strong>{onDuty}</strong></span>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700">Maintenance: <strong>{maintenance}</strong></span>
          </div>

          {records.length === 0 ? (
            <p className="text-sm text-gray-600">No ambulance records available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium">Vehicle No.</th>
                    <th className="py-2 pr-4 font-medium">Driver</th>
                    <th className="py-2 pr-4 font-medium">Driver Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, idx) => {
                    const styles = statusStyles[r.status];
                    return (
                      <tr key={r.id} className="text-sm text-gray-800">
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${styles.chip}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${styles.dot}`} />
                            {r.status}
                          </span>
                        </td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <div className="inline-flex items-center gap-2">
                            <Car className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{r.vehicleNumber}</span>
                          </div>
                        </td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <div className="inline-flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            {r.driverName}
                          </div>
                        </td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <a href={`tel:${r.driverPhone}`} className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                            <Phone className="w-4 h-4" />
                            {r.driverPhone}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceModal;
