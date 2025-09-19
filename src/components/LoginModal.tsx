import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Stethoscope, Building2, ArrowLeft } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUserType?: string | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen: isOpenProp, onClose, initialUserType = null }) => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(initialUserType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(isOpenProp);

  // Reset form when modal is opened/closed
  React.useEffect(() => {
    if (isOpen !== isOpenProp) {
      setIsOpen(isOpenProp);
      if (isOpenProp) {
        // Use the initialUserType if provided, otherwise reset to null
        setSelectedUserType(initialUserType);
        setEmail('');
        setPassword('');
      }
    }
  }, [isOpenProp, initialUserType]);

  const userTypes = [
    {
      type: 'patient',
      title: 'Patient',
      description: 'Access your health records and book appointments',
      icon: User,
      color: 'text-blue-600'
    },
    {
      type: 'doctor',
      title: 'Doctor',
      description: 'Manage patients and consultations',
      icon: Stethoscope,
      color: 'text-green-600'
    },
    {
      type: 'hospital',
      title: 'Hospital',
      description: 'Manage hospital operations and staff',
      icon: Building2,
      color: 'text-purple-600'
    }
  ];

  const { login } = useAuth();
  const { t } = useTranslation();

  const handleLogin = () => {
    if (!selectedUserType) {
      // Shouldn't happen as we require user type selection first
      console.error('No user type selected');
      return;
    }
    // In a real app, you would validate the credentials first
    login(email, password, selectedUserType as any);
    onClose();
  };

  const handleRegister = () => {
    if (!selectedUserType) {
      // Shouldn't happen as we require user type selection first
      console.error('No user type selected');
      return;
    }
    // In a real app, you would handle registration here
    console.log(`Registration for ${selectedUserType}`);
    // After successful registration, you might want to automatically log the user in
    login(email, password, selectedUserType as any);
    onClose();
  };

  const handleBack = () => {
    setSelectedUserType(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
      setIsOpen(open);
    }}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {selectedUserType ? (
              <div className="flex items-center justify-center space-x-2">
                <button 
                  onClick={handleBack}
                  className="p-1 rounded-full hover:bg-gray-100 mr-2"
                  aria-label="Back to user type selection"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <span>{t(`userType.${selectedUserType}`)} {t('login.loginButton')}</span>
              </div>
            ) : t('login.chooseType')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {selectedUserType ? t('login.enterCredentials') : 'Select your user type to proceed'}
          </DialogDescription>
        </DialogHeader>

        {!selectedUserType ? (
          <div className="grid md:grid-cols-3 gap-6 p-6">
            {userTypes.map((userType) => (
              <motion.div
                key={userType.type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedUserType(userType.type)}
                >
                  <CardHeader className="text-center">
                    <userType.icon className={`w-12 h-12 mx-auto mb-2 ${userType.color}`} />
                    <CardTitle className="text-xl">{t(`userType.${userType.type}`)}</CardTitle>
                    <CardDescription>{t(`userType.${userType.type}Desc`)}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('login.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('login.password')}
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <div className="space-y-3 pt-4">
                <Button type="button" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>
                  {t('login.loginButton')}
                </Button>
                <Button onClick={handleRegister} variant="outline" className="w-full">
                  Register Now
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setSelectedUserType(null)}
                  className="w-full mt-4 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('login.back')} User Type Selection
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;