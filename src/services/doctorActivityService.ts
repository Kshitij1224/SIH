const API_BASE_URL = '/api/doctor-activities'; // Update this with your actual API base URL

export interface DoctorActivity {
  id: string | number;
  doctor: string;
  activity: string;
  time: string;
  date: string;
  duration: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  patientId?: string;
  department?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FetchActivitiesParams {
  page?: number;
  limit?: number;
  date?: string;
  status?: string;
  doctor?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const fetchDoctorActivities = async ({
  page = 1,
  limit = 10,
  date,
  status,
  doctor,
  sortBy = 'date',
  sortOrder = 'asc',
}: FetchActivitiesParams = {}): Promise<PaginatedResponse<DoctorActivity>> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(date && { date }),
      ...(status && { status }),
      ...(doctor && { doctor }),
    });

    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctor activities');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching doctor activities:', error);
    throw error;
  }
};

export const fetchDoctorActivityById = async (id: string | number): Promise<DoctorActivity> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctor activity');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching doctor activity with id ${id}:`, error);
    throw error;
  }
};

export const createDoctorActivity = async (activity: Omit<DoctorActivity, 'id'>): Promise<DoctorActivity> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        ...activity,
        date: activity.date || new Date().toISOString().split('T')[0], // Default to today if not provided
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create doctor activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating doctor activity:', error);
    throw error;
  }
};

export const updateDoctorActivity = async (id: string | number, updates: Partial<DoctorActivity>): Promise<DoctorActivity> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update doctor activity');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating doctor activity with id ${id}:`, error);
    throw error;
  }
};

export const deleteDoctorActivity = async (id: string | number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete doctor activity');
    }
  } catch (error) {
    console.error(`Error deleting doctor activity with id ${id}:`, error);
    throw error;
  }
};

export const getAvailableDoctors = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available doctors');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching available doctors:', error);
    return [];
  }
};
