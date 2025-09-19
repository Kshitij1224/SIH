import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Doctor } from '../../../types/auth';
import { Mail, Phone, MapPin, Upload, Save, Edit3 } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const doctor = user && user.role === 'doctor' ? (user as Doctor) : null;
  const [profile, setProfile] = useState({
    name: doctor?.name || '',
    specialty: doctor?.specialization || '',
    email: doctor?.email || '',
    phone: doctor?.phone || '',
    address: doctor?.address || '',
    hospital: doctor?.hospital || '',
    experience: doctor?.experience ? `${doctor.experience} years` : '',
    qualifications: doctor?.qualifications?.join(', ') || '',
    consultationFee: doctor?.consultationFee ? `₹${doctor.consultationFee}` : '',
    availableHours: doctor?.availableHours ? `${doctor.availableHours.days.join(', ')}: ${doctor.availableHours.startTime} - ${doctor.availableHours.endTime}` : '',
  });

  const certifications = [
    {
      name: 'Board Certification - Cardiology',
      issuer: 'American Board of Cardiology',
      date: '2015',
      status: 'Valid'
    },
    {
      name: 'Advanced Cardiac Life Support (ACLS)',
      issuer: 'American Heart Association',
      date: '2023',
      status: 'Valid'
    },
    {
      name: 'Interventional Cardiology Certificate',
      issuer: 'American College of Cardiology',
      date: '2018',
      status: 'Valid'
    },
  ];

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional information and credentials</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo and Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold text-2xl">SJ</span>
            </div>
            {isEditing && (
              <button className="mb-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 mx-auto">
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600 mt-1">{profile.specialty}</p>
            <p className="text-sm text-gray-500 mt-2">{profile.hospital}</p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <span>{profile.address}</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    id="fullName"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    aria-label="Full name"
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.specialty}
                    onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Specialty"
                  />
                ) : (
                  <p className="text-gray-900">{profile.specialty}</p>
                )}
              </div>

              <div>
                {/* License Number removed: not in Doctor type */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    aria-label="Years of experience"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.experience}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Affiliation</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.hospital}
                    onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                    aria-label="Hospital Affiliation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter hospital name"
                  />
                ) : (
                  <p className="text-gray-900">{profile.hospital}</p>
                )}
              </div>

              <div className="md:col-span-2">
                {/* Consultation Hours removed: not in Doctor type */}
              </div>
            </div>
          </div>

          {/* Bio */}
          {/* Professional Bio removed: not in Doctor type */}

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Certifications & Credentials</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer} • {cert.date}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      cert.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {cert.status}
                    </span>
                    <button 
                      className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="View certificate"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}