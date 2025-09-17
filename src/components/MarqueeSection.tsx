import React from 'react';
import { motion } from 'framer-motion';

const MarqueeSection: React.FC = () => {
  const features = [
    "AI Chatbot – 24/7 Availability",
    "Government Scheme Information",
    "Easy Booking",
    "Online Consultation",
    "Telemedicine Services",
    "Health Videos Library",
    "Expert Medical Advice"
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 py-4 mt-20 overflow-hidden">
      <motion.div
        animate={{ x: [-1000, 1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="whitespace-nowrap"
      >
        <span className="text-white text-lg font-medium">
          {features.map((feature, index) => (
            <span key={index} className="mx-8">
              ✨ {feature}
            </span>
          ))}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeSection;