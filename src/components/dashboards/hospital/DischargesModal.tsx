import React from 'react';
import { type AdmissionRecord } from './AdmissionsModal';

interface DischargesModalProps {
  open: boolean;
  onClose: () => void;
  onViewAll: () => void;
  records: AdmissionRecord[];
}

const DischargesModal: React.FC<DischargesModalProps> = ({ open, onClose, onViewAll, records }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Today’s Discharges</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
            aria-label="Close discharges details"
          >
            ×
          </button>
        </div>

        <div className="p-4 overflow-auto max-h-[70vh]">
          {records.length === 0 ? (
            <p className="text-sm text-gray-600">No discharges found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="py-2 pr-4 font-medium">Patient</th>
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Time</th>
                    <th className="py-2 pr-4 font-medium">Assigned Doctor</th>
                    <th className="py-2 pr-4 font-medium">Reason of Admission</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, idx) => (
                    <tr key={r.id} className="text-sm text-gray-800">
                      <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.patient}</td>
                      <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.date}</td>
                      <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.time}</td>
                      <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.doctor}</td>
                      <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between">
          <button
            onClick={onViewAll}
            className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 border border-blue-200"
          >
            View All
          </button>
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

export default DischargesModal;
