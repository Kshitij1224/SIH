import React from 'react';
import { Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MedX</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted healthcare companion for better health management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">
                About Us
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Emergency</h3>
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-800">Emergency Helpline</p>
                <p className="text-lg font-bold text-red-600">911</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 MedX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;