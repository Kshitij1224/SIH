import React, { useEffect, useState } from 'react';
import { Activity, Flame, Moon, Heart, TrendingUp, Droplet, Zap } from 'lucide-react';

const HealthOverview = () => {
  const healthMetrics = [
    {
      title: 'Steps Count',
      value: '8,432',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      chartColor: 'bg-blue-500',
      progress: 75,
      trend: 'up',
      unit: 'steps',
      description: 'Daily goal: 10,000',
      trendValue: '12%',
      trendIcon: TrendingUp,
      trendColor: 'text-green-500',
    },
    {
      title: 'Calories Burned',
      value: '2,340',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      chartColor: 'bg-orange-500',
      progress: 65,
      trend: 'up',
      unit: 'kcal',
      description: 'Daily goal: 3,500',
      trendValue: '8%',
      trendIcon: TrendingUp,
      trendColor: 'text-green-500',
    },
    {
      title: 'Sleep',
      value: '7h 30m',
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      chartColor: 'bg-purple-500',
      progress: 85,
      trend: 'down',
      unit: 'hours',
      description: 'Recommended: 7-9 hours',
      trendValue: '5%',
      trendIcon: TrendingUp,
      trendColor: 'text-red-500',
    },
    {
      title: 'Heart Rate',
      value: '72 bpm',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      chartColor: 'bg-red-500',
      progress: 60,
      trend: 'stable',
      unit: 'bpm',
      description: 'Resting rate: 60-100 bpm',
      trendValue: '2%',
      trendIcon: TrendingUp,
      trendColor: 'text-yellow-500',
    },
    {
      title: 'Hydration',
      value: '1.8L',
      icon: Droplet,
      color: 'text-cyan-500',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      chartColor: 'bg-cyan-500',
      progress: 90,
      trend: 'up',
      unit: 'liters',
      description: 'Daily goal: 2.0L',
      trendValue: '15%',
      trendIcon: TrendingUp,
      trendColor: 'text-green-500',
    },
  ];

  const [activeMetric, setActiveMetric] = useState<null | typeof healthMetrics[number]>(null);
  const [selectedDay, setSelectedDay] = useState(6); // default to last day (Sat)

  useEffect(() => {
    if (activeMetric) setSelectedDay(6);
  }, [activeMetric]);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Overview</h2>
          <p className="text-sm text-gray-500">Track your daily health metrics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trendIcon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-200 overflow-hidden"
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
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-3 h-3 ${metric.chartColor} rounded-bl-full transition-all duration-300 group-hover:w-4 group-hover:h-4`}></div>
              
              {/* Border highlight on hover */}
              <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-opacity-20 group-hover:${metric.chartColor} transition-all duration-300 pointer-events-none`}></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${metric.bgColor} shadow-inner`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                
                {/* Trend indicator */}
                <div className={`flex items-center text-xs font-medium ${metric.trendColor}`}>
                  <TrendIcon className="w-3.5 h-3.5 mr-1" />
                  {metric.trendValue}
                </div>
              </div>
              
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{metric.title}</h3>
              <p className="text-xl font-bold text-gray-900 mb-1">{metric.value} 
                <span className="text-sm font-normal text-gray-500 ml-0.5">{metric.unit}</span>
              </p>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${metric.chartColor} rounded-full`}
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
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