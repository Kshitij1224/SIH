import React from 'react';
import { motion } from 'framer-motion';

interface LoadingPulseProps {
  // Pulse animation props
  size?: number; // size in pixels
  color?: string;
  pulseColor?: string;
  speed?: number; // pulse speed (lower is faster)
  
  // Progress bar props
  progress?: number; // 0-100
  duration?: number; // animation duration in seconds
  backgroundColor?: string; // background color of the progress bar
}

const LoadingPulse: React.FC<LoadingPulseProps> = ({
  // Pulse animation defaults
  size = 60,
  color = '#10B981',
  pulseColor = '#34D399',
  speed = 1.2,
  
  // Progress bar defaults
  progress,
  duration = 0.5,
  backgroundColor = '#E5E7EB'
}) => {
  const coreStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 20px ${color}40`, // Add glow effect
  };

  const pulseStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: pulseColor,
    borderRadius: '50%',
    opacity: 0,
  };

  // If progress is provided, render a progress bar
  if (progress !== undefined) {
    return (
      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration }}
        />
      </div>
    );
  }

  // Otherwise, render the pulse animation
  return (
    <div className="flex items-center justify-center p-6">
      <motion.div
        style={coreStyle}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          style={{
            ...pulseStyle,
            backgroundColor: pulseColor,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: speed * 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingPulse;
