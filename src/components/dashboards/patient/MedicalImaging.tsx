import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, ArrowRight, ClipboardPlus, Shield, Mic, Globe } from 'lucide-react';


const AIChatbot: React.FC = () => {


  const features = [
    {
      icon: <ClipboardPlus className="w-6 h-6 text-blue-600" />,
      title: "Analyze & Understand Your Prescriptions",
      description: "Upload your prescription for instant medicine guidance and instructions.",
      bgColor: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      hoverBg: 'hover:from-blue-50 hover:to-blue-100/80'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Privacy First",
      description: "Your health data is always kept private and secure",
      bgColor: 'from-green-50 to-green-100',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-300',
      hoverBg: 'hover:from-green-50 hover:to-green-100/80'
    },
    {
      icon: <Mic className="w-6 h-6 text-purple-600" />,
      title: "Voice Assistant",
      description: "Use voice commands for hands-free health assistance",
      bgColor: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-300',
      hoverBg: 'hover:from-purple-50 hover:to-purple-100/80'
    },
    {
      icon: <Globe className="w-6 h-6 text-amber-600" />,
      title: "Multilingual Support",
      description: "Get assistance in multiple languages for better understanding",
      bgColor: 'from-amber-50 to-amber-100',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      hoverBorder: 'hover:border-amber-300',
      hoverBg: 'hover:from-amber-50 hover:to-amber-100/80'
    }
  ];

  return (
    <section id="ai-chatbot" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Bot className="w-4 h-4 mr-2" />
            AI Health Assistant
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Your Personal Health Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant, reliable health information and guidance from our AI-powered assistant, available whenever you need it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-10 left-20 w-36 h-36 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 mx-auto">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">How can I help you today?</h3>
              <p className="text-gray-600 text-center mb-8">
                Whether you have questions about symptoms, medications, or general health advice, I'm here to help.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "What are the symptoms of the flu?",
                  "How can I improve my sleep?",
                  "What are the side effects of this medication?"
                ].map((question, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
                    "{question}"
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => window.location.href = "https://medxbot.netlify.app/"}
                className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chat Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 15
                }}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-gradient-to-br ${feature.bgColor} ${feature.borderColor} ${feature.hoverBorder} ${feature.hoverBg}`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${feature.iconBg} mb-4`}>
                  {React.cloneElement(feature.icon, { className: `w-6 h-6 ${feature.iconColor}` })}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.15 }
          }}
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 mb-3 group-hover:bg-white/15 transition-colors duration-200">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-white/95 transition-colors duration-200">
            Need medical advice now?
          </h3>
          <p className="text-blue-100/90 text-sm max-w-2xl mx-auto">
            Our AI Health Assistant is available 24/7 to answer your health questions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIChatbot;