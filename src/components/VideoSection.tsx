import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const VideoSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      title: "Heart Health: Prevention Tips",
      duration: "5:30",
      thumbnail: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Diabetes Management Guide",
      duration: "8:45",
      thumbnail: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Mental Health Awareness",
      duration: "6:20",
      thumbnail: "https://images.pexels.com/photos/3846464/pexels-photo-3846464.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Healthy Diet Guidelines",
      duration: "7:15",
      thumbnail: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Exercise for Seniors",
      duration: "9:10",
      thumbnail: "https://images.pexels.com/photos/6111563/pexels-photo-6111563.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Child Vaccination Schedule",
      duration: "4:50",
      thumbnail: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, videos.length - 2));
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, videos.length - 2)) % Math.max(1, videos.length - 2));
  };

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Health Education Videos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about health topics from medical experts through our curated video library
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevVideo}
              className="mr-4 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
              {videos.slice(currentIndex, currentIndex + 3).map((video, index) => (
                <motion.div
                  key={currentIndex + index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="h-12 w-12 text-white" fill="currentColor" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextVideo}
              className="ml-4 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center space-x-2">
            {Array.from({ length: Math.max(1, videos.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;