import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface NavigationProps {
  onLoginClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLoginClick }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  // Set default language if not set
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-white/50 backdrop-blur-md shadow-lg z-40 border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" fill="currentColor" />
            <span className="text-2xl font-bold text-gray-900">MedX</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {t('nav.home', 'Home')}
            </button>
            <button
              onClick={() => scrollToSection('government-schemes')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {t('nav.governmentSchemes', 'Government Schemes')}
            </button>
            <button
              onClick={() => scrollToSection('ai-chatbot')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {t('nav.aiChatbot')}
            </button>
            <button
              onClick={() => scrollToSection('telemedicine')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {t('nav.telemedicine')}
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {t('nav.videos')}
            </button>
            
            <Select 
              value={i18n.language} 
              onValueChange={changeLanguage}
            >
              <SelectTrigger className="w-32">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={onLoginClick} className="bg-blue-600 hover:bg-blue-700">
              {t('nav.login')}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;