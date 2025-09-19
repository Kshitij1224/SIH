import React from 'react';
import { Droplet, AlertTriangle } from 'lucide-react';

export type BloodStock = {
  group: string; // e.g., 'O+', 'A-'
  units: number; // number of units/bottles available
};

interface BloodBankModalProps {
  open: boolean;
  onClose: () => void;
  records: BloodStock[];
}

const BloodBankModal: React.FC<BloodBankModalProps> = ({ open, onClose, records }) => {
  if (!open) return null;

  const totalUnits = records.reduce((sum, r) => sum + r.units, 0);
  const maxUnits = Math.max(1, ...records.map(r => r.units));

  const groupOrder = ['O+','A+','B+','AB+','O-','A-','B-','AB-'];
  const sorted = [...records].sort((a,b) => groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group));

  const groupColors: Record<string, {bg: string; text: string; bar: string; soft: string}> = {
    'O+': { bg: 'bg-rose-100', text: 'text-rose-700', bar: 'bg-rose-500', soft: 'bg-rose-50' },
    'A+': { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500', soft: 'bg-red-50' },
    'B+': { bg: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-500', soft: 'bg-orange-50' },
    'AB+': { bg: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-500', soft: 'bg-amber-50' },
    'O-': { bg: 'bg-teal-100', text: 'text-teal-700', bar: 'bg-teal-500', soft: 'bg-teal-50' },
    'A-': { bg: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-500', soft: 'bg-emerald-50' },
    'B-': { bg: 'bg-cyan-100', text: 'text-cyan-700', bar: 'bg-cyan-500', soft: 'bg-cyan-50' },
    'AB-': { bg: 'bg-indigo-100', text: 'text-indigo-700', bar: 'bg-indigo-500', soft: 'bg-indigo-50' },
  };

  const stockLevel = (units: number) => {
    if (units <= 5) return { label: 'Critical', color: 'text-red-700', bg: 'bg-red-50', icon: AlertTriangle };
    if (units <= 15) return { label: 'Low', color: 'text-orange-700', bg: 'bg-orange-50', icon: AlertTriangle };
    return { label: 'Healthy', color: 'text-green-700', bg: 'bg-green-50', icon: Droplet };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="inline-flex p-2 rounded-lg bg-rose-50 text-rose-600">
              <Droplet className="w-5 h-5" />
            </span>
            Blood Bank Inventory
          </h3>
          <button
            onClick={onClose}
            className="px-2 py-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
            aria-label="Close blood bank details"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">Total Units: <strong>{totalUnits}</strong></span>
            <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-700">Groups: <strong>{records.length}</strong></span>
            <span className="ml-auto text-xs text-gray-500">Bars relative to group with highest stock</span>
          </div>

          {records.length === 0 ? (
            <p className="text-sm text-gray-600">No blood stock data available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sorted.map((r) => {
                const pct = Math.max(6, Math.round((r.units / maxUnits) * 100));
                const colors = groupColors[r.group] ?? { bg: 'bg-gray-100', text: 'text-gray-700', bar: 'bg-gray-400', soft: 'bg-gray-50' };
                const level = stockLevel(r.units);
                const LevelIcon = level.icon;
                return (
                  <div key={r.group} className={`rounded-xl border border-gray-100 shadow-sm ${colors.soft} p-4`}> 
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-sm font-semibold ${colors.bg} ${colors.text}`}>{r.group}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${level.bg} ${level.color}`}>
                        <LevelIcon className="w-3.5 h-3.5" /> {level.label}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mb-2">
                      <div className="text-2xl font-bold text-gray-900">{r.units}</div>
                      <div className="text-xs text-gray-500">units</div>
                    </div>

                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full ${colors.bar}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
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

export default BloodBankModal;
