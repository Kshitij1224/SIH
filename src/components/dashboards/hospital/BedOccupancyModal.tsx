import React from 'react';

export type WardOccupancy = {
  name: string;
  occupied: number;
  available: number;
};

interface BedOccupancyModalProps {
  open: boolean;
  onClose: () => void;
  records: WardOccupancy[];
}

const BedOccupancyModal: React.FC<BedOccupancyModalProps> = ({ open, onClose, records }) => {
  if (!open) return null;

  const totals = records.reduce(
    (acc, r) => {
      acc.occupied += r.occupied;
      acc.available += r.available;
      return acc;
    },
    { occupied: 0, available: 0 }
  );
  const totalBeds = totals.occupied + totals.available;
  const occupancyPct = totalBeds > 0 ? Math.round((totals.occupied / totalBeds) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Ward Occupancy Details</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
            aria-label="Close bed occupancy details"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 text-sm text-gray-700 flex flex-wrap items-center gap-3">
            <span>
              Total Beds: <strong>{totalBeds}</strong>
            </span>
            <span>
              Occupied: <strong>{totals.occupied}</strong>
            </span>
            <span>
              Available: <strong>{totals.available}</strong>
            </span>
            <span className="ml-auto">Overall Occupancy: <strong>{occupancyPct}%</strong></span>
          </div>

          {records.length === 0 ? (
            <p className="text-sm text-gray-600">No ward data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="py-2 pr-4 font-medium">Ward</th>
                    <th className="py-2 pr-4 font-medium">Occupied</th>
                    <th className="py-2 pr-4 font-medium">Available</th>
                    <th className="py-2 pr-4 font-medium">Total</th>
                    <th className="py-2 pr-4 font-medium">Occupancy</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, idx) => {
                    const total = r.occupied + r.available;
                    const pct = total > 0 ? Math.round((r.occupied / total) * 100) : 0;
                    return (
                      <tr key={r.name} className="text-sm text-gray-800">
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.name}</td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.occupied}</td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{r.available}</td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{total}</td>
                        <td className={`py-3 pr-4 ${idx !== records.length - 1 ? 'border-b border-gray-100' : ''}`}>{pct}%</td>
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

export default BedOccupancyModal;
