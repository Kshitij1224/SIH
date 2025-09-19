import React, { useEffect, useState } from 'react';
import LoadingPulse from './LoadingPulse.new';

interface LoadingPageProps {
  /**
   * If true, the loading will automatically progress from 0 to 100%
   * If false, you need to control the progress with the progress prop
   */
  autoProgress?: boolean;
  /**
   * Progress from 0 to 100
   * Only used if autoProgress is false
   */
  progress?: number;
  /**
   * Loading message to display
   */
  message?: string;
  /**
   * Optional subtitle
   */
  subtitle?: string;
  /**
   * Duration in seconds for auto progress
   */
  duration?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  autoProgress = true,
  progress: externalProgress,
  message = 'Loading...',
  subtitle = 'Please wait while we prepare your experience',
  duration = 1,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoProgress) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoProgress, duration]);

  const currentProgress = autoProgress ? progress : externalProgress || 0;

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-4 z-50">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{message}</h2>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
        
        <div className="w-full">
          <LoadingPulse 
            progress={currentProgress} 
            duration={0.5}
            color="#10B981"
            backgroundColor="#D1FAE5"
          />
        </div>
        
        <div className="text-right">
          <span className="text-sm font-medium text-emerald-600">
            {Math.round(currentProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
