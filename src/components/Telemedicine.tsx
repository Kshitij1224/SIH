import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ChevronDown, Check, MapPin, ChevronRight, Clock as ClockIcon, Play, FileText, RefreshCw, Shield } from 'lucide-react';
import ayushmanImage from '../assets/ayushman.jpeg';
import LoginModal from './LoginModal';

const Telemedicine: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('Today, 17 Sep');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [showTimeSlots, setShowTimeSlots] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  
  const handleBookAppointment = () => {
    // Set the user type to 'patient' when booking an appointment
    setSelectedUserType('patient');
    setIsLoginModalOpen(true);
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  return (
    <section id="telemedicine" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Online Consultations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Skip the waiting rooms. With MedX Telemedicine, you can connect with verified doctors anytime, anywhere right from your phone.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: <Play className="h-6 w-6 text-blue-600" />,
              title: "Instant Video Consultations",
              description: "Connect with doctors instantly via secure video calls"
            },
            {
              icon: <Calendar className="h-6 w-6 text-green-600" />,
              title: "Easy Appointment Booking",
              description: "Book appointments in just a few taps"
            },
            {
              icon: <FileText className="h-6 w-6 text-purple-600" />,
              title: "Digital Prescriptions",
              description: "Get e-prescriptions directly to your device"
            },
            {
              icon: <Shield className="h-6 w-6 text-cyan-600" />,
              title: "Secure & Private",
              description: "End-to-end encrypted consultations"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-start hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                {React.cloneElement(feature.icon, {
                  className: `${feature.icon.props.className} group-hover:scale-110 transition-transform duration-300`
                })}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Booking Form */}
          <div>
            <Card className="overflow-hidden border border-gray-200">
              <CardHeader className="bg-blue-600 text-white p-6">
                <CardTitle className="text-2xl">Book Appointment</CardTitle>
                <CardDescription className="text-blue-100">
                  Select a date and time for your consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <select 
                        className="block w-full pl-10 pr-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        <option>Today, 20 Sep</option>
                        <option>Tomorrow, 21 Sep</option>
                        <option>Monday, 22 Sep</option>
                        <option>Tuesday, 23 Sep</option>
                        <option>Wednesday, 24 Sep</option>
                      </select>
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time Slot
                    </label>
                    <div className="relative">
                      <div 
                        className="relative cursor-pointer"
                        onClick={() => setShowTimeSlots(!showTimeSlots)}
                      >
                        <div className="flex items-center justify-between w-full pl-4 pr-3 py-3 text-base border border-gray-300 rounded-md bg-white hover:border-blue-500 transition-colors">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{selectedTime}</span>
                          </div>
                          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showTimeSlots ? 'transform rotate-180' : ''}`} />
                        </div>
                        {showTimeSlots && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {timeSlots.map((time) => (
                              <div 
                                key={time}
                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between ${selectedTime === time ? 'bg-blue-50' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTime(time);
                                  setShowTimeSlots(false);
                                }}
                              >
                                <span>{time}</span>
                                {selectedTime === time && <Check className="h-5 w-5 text-blue-600" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <select className="block w-full pl-10 pr-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md">
                        <option>Dr. Ayushman Sharma (Cardiologist)</option>
                        <option>Dr. Khilar (Neurologist)</option>
                        <option>Dr. Anupam (Pediatrician)</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <select className="block w-full pl-10 pr-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md">
                        <option>Video Consultation (Online)</option>
                        <option>Clinic Visit (New Delhi)</option>
                        <option>Home Visit (Delhi NCR)</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookAppointment}
                    className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <LoginModal 
                    isOpen={isLoginModalOpen}
                    onClose={() => {
                      setIsLoginModalOpen(false);
                      // Reset the selected user type when modal is closed
                      setSelectedUserType(null);
                    }}
                    initialUserType={selectedUserType}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <ClockIcon className="h-4 w-4 text-green-500 mr-1.5" />
                <span>24/7 Available Doctors</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 mr-1.5" />
                <span>100% Safe & Secure</span>
              </div>
            </div>
          </div>

          {/* Right Side - Doctor Image */}
          <div className="hidden lg:block h-full group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full transform transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
              <div className="relative h-full overflow-hidden">
                <img
                  src={ayushmanImage}
                  alt="Doctor consultation"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.3))] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-end p-8">
                <div className="w-full">
                  <div className="relative overflow-hidden">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold text-white mb-2">Dr. Ayushman Sharma</h3>
                      <p className="text-blue-200 mb-3 border-l-2 border-blue-400 pl-3 py-1">Senior Cardiologist</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-blue-100 transition-all duration-700 ease-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
                      Expert in cardiovascular diseases with over 12 years of experience. 
                      Specialized in non-invasive cardiology and preventive care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Telemedicine;