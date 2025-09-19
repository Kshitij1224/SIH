export type UserRole = 'doctor' | 'patient' | 'hospital';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface Doctor extends BaseUser {
  role: 'doctor';
  specialization: string;
  hospital: string;
  phone: string;
  address: string;
  experience?: number;
  qualifications?: string[];
  consultationFee?: number;
  availableHours?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

export interface Patient extends BaseUser {
  role: 'patient';
  age: number;
  gender: string;
  bloodType: string;
  phone: string;
  emergencyContact: string;
  address?: string;
  dateOfBirth?: string;
  insuranceProvider?: string;
  policyNumber?: string;
  allergies?: string[];
  medications?: string[];
}

export interface Hospital extends BaseUser {
  role: 'hospital';
  address: string;
  phone: string;
  departments: string[];
  beds: number;
  doctors: number;
  website?: string;
  establishedYear?: number;
  facilities?: string[];
  accreditation?: string[];
}

export type User = Doctor | Patient | Hospital;

// Type guards
export function isDoctor(user: User): user is Doctor {
  return user.role === 'doctor';
}

export function isPatient(user: User): user is Patient {
  return user.role === 'patient';
}

export function isHospital(user: User): user is Hospital {
  return user.role === 'hospital';
}

// Login credentials type
export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

// Auth response type
export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}
