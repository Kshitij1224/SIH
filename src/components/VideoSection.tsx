import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

const VideoSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos: Video[] = [
    {
      id: 'heart-health',
      title: "Heart Health: Prevention Tips",
      duration: "5:30",
      thumbnail: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/9YffrCViTVk",
      description: "Learn essential tips for maintaining a healthy heart and preventing cardiovascular diseases through proper diet, exercise, and lifestyle changes."
    },
    {
      id: 'diabetes-management',
      title: "Diabetes Management Guide",
      duration: "8:45",
      thumbnail: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/wZAjVQWbMlE",
      description: "Comprehensive guide on managing diabetes through medication, diet, exercise, and regular monitoring of blood sugar levels."
    },
  
    {
      id: 'healthy-diet',
      title: "Healthy Diet Guidelines",
      duration: "7:15",
      thumbnail: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/1bqMY82xzAo",
      description: "Nutritional guidelines for a balanced diet, including portion control, food groups, and healthy eating habits for all ages."
    },

    
    {
      id: 'child-vaccination',
      title: "Child Vaccination Schedule",
      duration: "4:50",
      thumbnail: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/4SKfHbc0DMM",
      description: "Complete vaccination schedule for children from birth to adolescence, including information about each vaccine and its importance."
    }
  ];

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, videos.length - 2));
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, videos.length - 2)) % Math.max(1, videos.length - 2));
  };

  const openVideo = (video: Video) => {
    // Extract video ID from the embed URL
    const videoId = video.videoUrl.split('/').pop();
    // Open the video in a new tab on YouTube
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section id="videos" className="py-24 bg-gradient-to-b from-blue-50 to-white">
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
              disabled={currentIndex === 0}
              className="mr-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 border-2 border-blue-100 hover:border-blue-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
              {videos.slice(currentIndex, currentIndex + 3).map((video, index) => (
                <motion.div
                  key={`${video.id}-${currentIndex + index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => openVideo(video)}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 ease-in-out cursor-pointer group h-full flex flex-col bg-white border-2 border-transparent hover:border-blue-100 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white hover:to-blue-50/20">
                    <div className="relative flex-grow overflow-hidden">
                      <div className="relative w-full h-64 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <Play className="h-12 w-12 text-white transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
                          </div>
                        </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2.5 py-1 rounded-full text-xs font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="flex items-center">
                          <Play className="h-3 w-3 mr-1" fill="currentColor" />
                          {video.duration}
                        </span>
                      </div>
                    </div>
                    </div>
                    <CardContent className="p-6 flex flex-col relative z-10">
                      <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {video.title}
                        <div className="w-10 h-0.5 bg-blue-500 mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">{video.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextVideo}
              disabled={currentIndex >= videos.length - 3}
              className="ml-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 border-2 border-blue-100 hover:border-blue-200"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoSection;