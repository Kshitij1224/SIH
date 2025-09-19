import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, HeartPulse, Stethoscope, Syringe, Users, PhoneCall } from 'lucide-react';

const WhatWeOffer: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-blue-600" />,
      title: "AI-Powered Health Assistant",
      description: "Get instant answers to your health-related queries with our advanced AI assistant."
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-green-600" />,
      title: "Expert Medical Consultation",
      description: "Connect with certified doctors for online consultations from the comfort of your home."
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-red-500" />,
      title: "Health Monitoring",
      description: "Track your health metrics and get personalized health insights and recommendations."
    },
    {
      icon: <PhoneCall className="h-10 w-10 text-orange-500" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your healthcare needs and emergencies."
    },
  ];

  return (
    <section id="what-we-offer" className="py-24 bg-white min-h-[800px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-9">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full min-h-[300px] p-8 hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col justify-center relative overflow-hidden border-2 border-transparent hover:border-blue-100 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30">
                {/* Subtle background pattern on hover */}
                <div className="absolute inset-0 bg-grid-blue-100/20 dark:bg-grid-blue-900/10 [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-blue-50 group-hover:bg-white group-hover:shadow-lg mb-6 transition-all duration-500 transform group-hover:-translate-y-1">
                    {React.cloneElement(feature.icon, {
                      className: `${feature.icon.props.className} transition-transform duration-500 group-hover:scale-110`
                    })}
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-500">
                      {feature.title}
                      <div className="w-12 h-1 bg-blue-500 mt-2 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-500">{feature.description}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
