import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import esicImage from '../assets/esic.webp';
import missionImage from '../assets/mi.webp';
import nhmImage from '../assets/nhm.webp'; 
import abyImage from '../assets/ABY.jpg';
import nipImage from '../assets/nip.jpg';

interface Scheme {
  image: string;
  title: string;
  description: string;
  link: string;
}

const GovernmentSchemes: React.FC = () => {
  const schemes: Scheme[] = [
    {
      image: abyImage,
      title: 'Ayushman Bharat (PM-JAY)',
      description: 'Provides ₹5 lakh annual health insurance per family for cashless treatment at empanelled hospitals.',
      link: 'https://pmjay.gov.in/'
    },
    {
      image: nhmImage,
      title: 'National Health Mission (NHM)',
      description: 'Strengthens public health systems and offers free maternal, child, and disease-control services.',
      link: 'https://nhm.gov.in/'
    },
    {
      image: nipImage,
      title: 'Universal Immunisation Programme (UIP)',
      description: 'Free vaccination for children and pregnant women against preventable diseases.',
      link: 'https://www.mohfw.gov.in/?q=en/Major-Programmes/universal-immunization-programme-uip'
    },
    {
      image: esicImage,
      title: 'Employees’ State Insurance Scheme (ESIS)',
      description: 'Social insurance offering medical care and cash benefits for workers and their families.',
      link: 'https://www.india.gov.in/spotlight/employees-state-insurance-scheme#tab=tab-1'
    },
    {
      image: missionImage,
      title: 'Mission Indradhanush',
      description: 'Nationwide drive to achieve >90% immunization coverage for children and pregnant women.',
      link: 'https://nhm.gov.in/index1.php?lang=1&level=1&sublinkid=1064&lid=613'
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = schemes.map(scheme => scheme.image);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  return (
    <section id="government-schemes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Government Schemes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive healthcare programs and initiatives by the government
          </p>
        </motion.div>

        <div 
          className="relative w-full mx-auto overflow-hidden rounded-xl shadow-xl"
          style={{ width: '85%', height: '65vh' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <div className="relative w-full h-full">
                <img
                  src={schemes[currentIndex].image}
                  alt={schemes[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-12 text-white">
                    <h2 className="text-3xl font-bold mb-3">{schemes[currentIndex].title}</h2>
                    <p className="text-gray-300 mb-4">{schemes[currentIndex].description}</p>
                    <a 
                      href={schemes[currentIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full inline-flex items-center transition-all duration-300 group"
                    >
                      <span className="font-medium">Know more about it</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {schemes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                aria-label={`Go to ${schemes[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;