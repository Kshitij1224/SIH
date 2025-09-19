import { useState } from 'react';
import { Shield, Bell, Calendar, Lock, Globe, CreditCard } from 'lucide-react';

type NotificationSettings = {
  appointments: boolean;
  messages: boolean;
  reminders: boolean;
  marketing: boolean;
};

type PrivacySettings = {
  shareData: boolean;
  analytics: boolean;
  twoFactor: boolean;
};

export function Settings() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    appointments: true,
    messages: true,
    reminders: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    shareData: false,
    analytics: true,
    twoFactor: false
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and system settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Appointment Reminders</div>
                <div className="text-sm text-gray-500">Get notified about upcoming appointments</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="appointment-reminders"
                  type="checkbox"
                  checked={notifications.appointments}
                  onChange={(e) => setNotifications({...notifications, appointments: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Toggle appointment reminders"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">New Messages</div>
                <div className="text-sm text-gray-500">Get notified about new patient messages</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.messages}
                  onChange={(e) => setNotifications({...notifications, messages: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Toggle new messages notifications"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">System Reminders</div>
                <div className="text-sm text-gray-500">Medication refills, lab results, etc.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="system-reminders"
                  type="checkbox"
                  checked={notifications.reminders}
                  onChange={(e) => setNotifications({...notifications, reminders: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Toggle system reminders"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Marketing Communications</div>
                <div className="text-sm text-gray-500">Updates about MEDX features and news</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="marketing-communications"
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Toggle marketing communications notifications"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500">Add an extra layer of security</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="twoFactorToggle"
                  type="checkbox"
                  checked={privacy.twoFactor}
                  onChange={(e) => setPrivacy({...privacy, twoFactor: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Enable two-factor authentication"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="sr-only">Toggle two-factor authentication</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Data Sharing</div>
                <div className="text-sm text-gray-500">Share anonymized data for research</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="data-sharing"
                  type="checkbox"
                  checked={privacy.shareData}
                  onChange={(e) => setPrivacy({...privacy, shareData: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Toggle data sharing"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Analytics</div>
                <div className="text-sm text-gray-500">Help improve MEDX with usage data</div>
              </div>
              <label htmlFor="analytics-toggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  id="analytics-toggle"
                  type="checkbox"
                  checked={privacy.analytics}
                  onChange={(e) => setPrivacy({...privacy, analytics: e.target.checked})}
                  className="sr-only peer"
                  aria-label="Toggle analytics"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <button className="w-full mt-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Calendar Integration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Calendar Integration</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">Google Calendar</div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Connect
                </button>
              </div>
              <p className="text-sm text-gray-600">Sync appointments with your Google Calendar</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">Outlook Calendar</div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Connect
                </button>
              </div>
              <p className="text-sm text-gray-600">Sync appointments with Microsoft Outlook</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">Apple Calendar</div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Connect
                </button>
              </div>
              <p className="text-sm text-gray-600">Sync appointments with Apple Calendar</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select id="language-select" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" aria-label="Select language">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div>
              <label htmlFor="timezone-select" className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select id="timezone-select" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" aria-label="Select time zone">
                <option>Eastern Time (UTC-5)</option>
                <option>Central Time (UTC-6)</option>
                <option>Mountain Time (UTC-7)</option>
                <option>Pacific Time (UTC-8)</option>
              </select>
            </div>

            <div>
              <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select 
                id="dateFormat"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>

            <button className="w-full mt-4 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Export Account Data
            </button>
          </div>
        </div>
      </div>

      {/* Billing Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Billing & Subscription</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">Professional Plan</div>
                  <div className="text-sm text-gray-500">$99/month</div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unlimited appointments</li>
                <li>• Patient management system</li>
                <li>• Secure messaging</li>
                <li>• AI assistant</li>
                <li>• Priority support</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade Plan
              </button>
              <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                View Billing History
              </button>
              <button className="w-full text-red-600 hover:text-red-700 text-sm">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save All Settings
        </button>
      </div>
    </div>
  );
}