import React, { useEffect, useState } from 'react';
import { Activity, Flame, Moon, Heart, Shield } from 'lucide-react';

const HealthOverview = () => {
  const healthMetrics = [
    {
      title: 'Steps Count',
      value: '8,432',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      chartColor: 'bg-blue-500',
    },
    {
      title: 'Calories',
      value: '2,340',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      chartColor: 'bg-orange-500',
    },
    {
      title: 'Sleep',
      value: '7h 30m',
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      chartColor: 'bg-purple-500',
    },
    {
      title: 'Heart Rate',
      value: '72 bpm',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      chartColor: 'bg-red-500',
    },
    {
      title: 'Stress',
      value: 'Low',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      chartColor: 'bg-green-500',
    },
  ];

  const [activeMetric, setActiveMetric] = useState<null | typeof healthMetrics[number]>(null);
  const [selectedDay, setSelectedDay] = useState(6); // default to last day (Sat)

  useEffect(() => {
    if (activeMetric) setSelectedDay(6);
  }, [activeMetric]);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
              onClick={() => setActiveMetric(metric)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveMetric(metric);
                }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {activeMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setActiveMetric(null)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${activeMetric.bgColor}`}>
                  {(() => {
                    const Icon = activeMetric.icon;
                    return <Icon className={`w-6 h-6 ${activeMetric.color}`} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{activeMetric.title} Details</h3>
                  <p className="text-sm text-gray-600">Quick insights and recent trend</p>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setActiveMetric(null)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Quick stat */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Current</div>
                <div className="text-2xl font-bold text-gray-900">{activeMetric.value}</div>
              </div>

              {/* Weekly chart (baseline + rounded bars) */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Last 7 days</div>
                <div className="relative h-32 select-none">
                  {/* Baseline */}
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
                  {/* Bars and markers */}
                  <div className="relative h-full px-2 flex items-end justify-between">
                    {(() => {
                      const labels = ['S','M','T','W','T','F','S'];
                      const datasets: Record<string, number[]> = {
                        'Steps Count': [5400, 7200, 4800, 9800, 6400, 12000, 8600],
                        'Calories': [2100, 2300, 1900, 2500, 2400, 2600, 2200],
                        'Sleep': [6.5, 7.2, 5.8, 8.0, 6.0, 8.5, 7.8],
                        'Heart Rate': [78, 74, 81, 77, 79, 73, 75],
                        'Stress': [20, 35, 28, 25, 32, 22, 27],
                      };
                      const data = datasets[activeMetric.title] || [50, 60, 55, 65, 70, 60, 62];
                      const max = Math.max(...data);
                      return data.map((v, i) => {
                        const pct = Math.max(10, Math.min(100, Math.round((Number(v) / max) * 100)));
                        const isSelected = i === selectedDay;
                        return (
                          <div key={i} className="relative flex flex-col items-center justify-end h-full" onClick={() => setSelectedDay(i)}>
                            {/* marker on baseline */}
                            <span className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${isSelected ? activeMetric.chartColor : 'bg-gray-300'}`} />
                            {/* value bubble when selected */}
                            {isSelected && (
                              <div className="absolute -top-3 -translate-y-full px-2 py-0.5 rounded-full bg-gray-900 text-white text-xs shadow-sm">
                                {v}
                              </div>
                            )}
                            {/* bar */}
                            <div
                              className={`w-3 rounded-full transition-all duration-200 ${activeMetric.chartColor}`}
                              style={{ height: `${pct}%`, opacity: isSelected ? 1 : 0.85 }}
                              title={`Day ${i + 1}: ${v}`}
                            />
                            {/* day label */}
                            <span className={`mt-1 text-[10px] ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>{labels[i]}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                <div className="text-sm font-medium text-gray-800 mb-1">Health tip</div>
                <p className="text-sm text-gray-700">
                  {(() => {
                    switch (activeMetric.title) {
                      case 'Steps Count':
                        return 'Aim for 8–10k steps daily. Consider a 10-minute walk after meals to boost metabolism.';
                      case 'Calories':
                        return 'Balance intake with activity. Prefer whole foods and watch liquid calories.';
                      case 'Sleep':
                        return 'Maintain a consistent schedule. Avoid screens 1 hour before bedtime.';
                      case 'Heart Rate':
                        return 'A resting HR of 60–80 bpm is typical. Try deep breathing to reduce rate and stress.';
                      case 'Stress':
                        return 'Use 4-7-8 breathing for 2 minutes. Short mindfulness sessions help lower stress.';
                      default:
                        return 'Stay consistent and track progress to see steady improvements.';
                    }
                  })()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  onClick={() => setActiveMetric(null)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Placeholder: navigate or open related section if available
                    alert(`Opening detailed view for ${activeMetric.title}...`);
                  }}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HealthOverview;