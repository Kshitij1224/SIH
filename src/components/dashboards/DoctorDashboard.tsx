
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Stethoscope } from 'lucide-react';

const DoctorDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6" />
          <span>Welcome, Doctor</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No appointments scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Queue</CardTitle>
            <CardDescription>Patients waiting for consultation</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No patients in the queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Access patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Search for a patient to view records</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
