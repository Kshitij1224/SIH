import { useEffect, useState } from 'react';
import { SlidersHorizontal, ArrowLeft } from 'lucide-react';

const themes = ['System', 'Light', 'Dark'] as const;
const languages = ['English', 'हिन्दी', 'मराठी', 'தமிழ்'] as const;
const densities = ['Comfortable', 'Compact'] as const;
const landingPages = [
  { label: 'Dashboard', route: '#/' },
  { label: 'Departments', route: '#/departments' },
  { label: 'Doctors', route: '#/doctors' },
  { label: 'Patients', route: '#/patients' },
  { label: 'Staff', route: '#/staff' },
] as const;

type Prefs = {
  theme: typeof themes[number];
  language: typeof languages[number];
  notifications: boolean;
  density: typeof densities[number];
  landing: typeof landingPages[number]['route'];
};

const defaultPrefs: Prefs = {
  theme: 'System',
  language: 'English',
  notifications: true,
  density: 'Comfortable',
  landing: '#/',
};

const PreferencesPage = () => {
  const goHome = () => {
    window.location.hash = '#/'
  };

  const [prefs, setPrefs] = useState<Prefs>(() => {
    try {
      const raw = localStorage.getItem('medx_prefs');
      return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('medx_prefs', JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  const update = (patch: Partial<Prefs>) => setPrefs((p) => ({ ...p, ...patch }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-2 rounded-lg bg-blue-50 text-blue-600">
            <SlidersHorizontal className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme */}
        <section className="border border-gray-100 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Theme</h3>
          <div className="flex gap-3">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => update({ theme: t })}
                className={`px-3 py-2 rounded-md border ${prefs.theme === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Switch between light, dark, or follow system.</p>
        </section>

        {/* Language */}
        <section className="border border-gray-100 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Language</h3>
          <select
            value={prefs.language}
            onChange={(e) => update({ language: e.target.value as Prefs['language'] })}
            className="px-3 py-2 border rounded-md bg-white"
          >
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <p className="mt-2 text-xs text-gray-500">Choose preferred language for the UI.</p>
        </section>

        {/* Notifications */}
        <section className="border border-gray-100 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
          <label className="inline-flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={prefs.notifications}
              onChange={(e) => update({ notifications: e.target.checked })}
            />
            Enable critical alerts (admissions, emergencies, discharges)
          </label>
        </section>

        {/* Density */}
        <section className="border border-gray-100 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Density</h3>
          <div className="flex gap-3">
            {densities.map((d) => (
              <button
                key={d}
                onClick={() => update({ density: d })}
                className={`px-3 py-2 rounded-md border ${prefs.density === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Adjust table row spacing and UI compactness.</p>
        </section>

        {/* Default landing page */}
        <section className="border border-gray-100 rounded-lg p-4 md:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-2">Default Landing Page</h3>
          <div className="flex flex-wrap gap-3">
            {landingPages.map((p) => (
              <button
                key={p.route}
                onClick={() => update({ landing: p.route })}
                className={`px-3 py-2 rounded-md border ${prefs.landing === p.route ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">This page opens by default when the app loads.</p>
        </section>
      </div>
    </div>
  );
};

export default PreferencesPage;
