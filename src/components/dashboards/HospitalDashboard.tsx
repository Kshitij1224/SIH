import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Building2 } from 'lucide-react';

const HospitalDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span>Welcome, Admin</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hospital Overview</CardTitle>
            <CardDescription>Key metrics and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Patients: 0</p>
            <p>Active Doctors: 0</p>
            <p>Available Beds: 0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Management</CardTitle>
            <CardDescription>Manage hospital staff</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Staff: 0</p>
            <p>Doctors: 0</p>
            <p>Nurses: 0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Appointments: 0</p>
            <p>Completed: 0</p>
            <p>Pending: 0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;
