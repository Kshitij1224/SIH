
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { User } from 'lucide-react';

const PatientDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6" />
          <span>Welcome, Patient</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next medical appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No upcoming appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>View your health history</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Recent records will appear here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prescriptions</CardTitle>
            <CardDescription>Your current medications</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No active prescriptions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
