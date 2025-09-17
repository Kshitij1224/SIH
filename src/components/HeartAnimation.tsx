import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity } from 'lucide-react';

const Pulsemeter = () => {
  const [pulse, setPulse] = useState(60); // Starting BPM
  
  useEffect(() => {
    // Simulate a realistic heart rate between 60-100 BPM
    const interval = setInterval(() => {
      setPulse(Math.floor(Math.random() * 40) + 60);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="flex items-center justify-center my-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div 
        className="relative w-48 h-12 bg-blue-500/20 rounded-full overflow-hidden flex items-center px-4"
        initial={{ width: 0 }}
        animate={{ width: '12rem' }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      >
        <div className="absolute left-4 flex items-center">
          <Activity className="w-5 h-5 text-white" />
          <span className="ml-2 text-white font-mono font-bold">{pulse}</span>
          <span className="ml-1 text-white/80 text-xs">BPM</span>
        </div>
        
        {/* Pulsing line */}
        <motion.div 
          className="absolute left-0 right-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: 60 / pulse, // Adjust speed based on BPM
            ease: 'linear'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

interface HeartAnimationProps {
  onComplete: () => void;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 4000); // 4 seconds total
      }}
    >
      <div className="text-center">
<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1, 1.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: 3,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-24 h-24 text-white mx-auto" fill="currentColor" />
          </motion.div>
          
          {/* Pulsemeter Component */}
          <Pulsemeter />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-4">MedX</h1>
          <p className="text-xl text-blue-100 mt-2">Your Health, Our Priority</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeartAnimation;