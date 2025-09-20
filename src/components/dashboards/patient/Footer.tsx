import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-blue-400" fill="currentColor" />
              <span className="text-2xl font-bold">MedX</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted healthcare partner, providing accessible medical services and health information for all.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={handleLogout} 
                  className="group flex items-center w-full text-left hover:text-white transition-all duration-300 transform hover:translate-x-1"
                >
                  <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  <span>Government Schemes</span>
                </button>
              </li>
              <li>
                <a href="#ai-chatbot" className="group flex items-center hover:text-white transition-all duration-300">
                  <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  <span>AI Chatbot</span>
                </a>
              </li>
              <li>
                <a href="#telemedicine" className="group flex items-center hover:text-white transition-all duration-300">
                  <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  <span>Telemedicine</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="group flex items-center w-full text-left hover:text-white transition-all duration-300 transform hover:translate-x-1"
                >
                  <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  <span>Health Videos</span>
                </button>
              </li>
              
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="group flex items-center">
                <span className="w-1 h-1 mr-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Online Consultations</span>
              </li>
              <li className="group flex items-center">
                <span className="w-1 h-1 mr-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Health Check-ups</span>
              </li>
              <li className="group flex items-center">
                <span className="w-1 h-1 mr-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Emergency Services</span>
              </li>
              <li className="group flex items-center">
                <span className="w-1 h-1 mr-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Health Insurance</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="group flex items-center space-x-3 transition-colors duration-300 hover:text-white">
                <Phone className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                <span>777-888-999</span>
              </div>
              <div className="group flex items-center space-x-3 transition-colors duration-300 hover:text-white">
                <Mail className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                <a href="mailto:support@medx.com" className="hover:underline">support@medx.com</a>
              </div>
              <div className="group flex items-start space-x-3 transition-colors duration-300 hover:text-white">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0" />
                <span>123 Industrial Area, New Delhi, India - 110001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <div className="flex flex-wrap justify-center gap-4">
            <span>&copy; 2025 MedX. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;