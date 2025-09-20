import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, ArrowLeft, Sparkles, Plus, Mic, Paperclip, ThumbsUp, ThumbsDown, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  loading?: boolean;
  liked?: boolean | null;
}

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add welcome message on component mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: "Hello! I'm your AI Health Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Auto-focus input on load
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      liked: null
    };

    // Add loading message
    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: '...',
      sender: 'bot',
      timestamp: new Date(),
      loading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        const loadingIndex = newMessages.findIndex(msg => msg.loading);
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = {
            ...newMessages[loadingIndex],
            text: getBotResponse(inputMessage),
            loading: false,
            liked: null
          };
        }
        return newMessages;
      });
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const toggleVoiceInput = () => {
    // This is a placeholder for actual voice recognition implementation
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        const sampleQuestions = [
          "What are the symptoms of flu?",
          "How can I improve my sleep?",
          "What should I do for a headache?",
          "How to manage stress?"
        ];
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        setInputMessage(randomQuestion);
        setIsListening(false);
        inputRef.current?.focus();
      }, 2000);
    }
  };

  const handleLikeDislike = (messageId: number, isLiked: boolean) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, liked: isLiked } : msg
      )
    );
  };

  const getBotResponse = (input: string): string => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('hello') || inputLower.includes('hi') || inputLower.includes('hey')) {
      return "Hello! I'm your AI Health Assistant. How can I assist you with your health concerns today?";
    } else if (inputLower.includes('symptom') || inputLower.includes('not feeling well')) {
      return "I understand you're not feeling well. While I can provide general health information, it's important to consult with a healthcare professional for an accurate diagnosis. Would you like me to help you find a doctor?";
    } else if (inputLower.includes('appointment') || inputLower.includes('doctor')) {
      return "You can book an appointment with one of our healthcare providers through the 'Book Appointment' section. Would you like me to take you there?";
    } else if (inputLower.includes('thank')) {
      return "You're welcome! If you have any more questions or need further assistance, feel free to ask.";
    } else if (inputLower.includes('emergency')) {
      return "If this is a medical emergency, please call your local emergency number or go to the nearest hospital immediately.";
    } else {
      const responses = [
        "I understand your concern. For accurate medical advice, please consult with a healthcare professional.",
        "That's a great question! Here are some general health tips that might help...",
        "For medication-related queries, please consult your pharmacist or doctor.",
        "I'd be happy to help you find the right healthcare provider for your needs.",
        "I recommend scheduling an appointment with a doctor for a proper evaluation of your symptoms.",
        "I can provide general health information, but for specific medical advice, please consult a healthcare professional.",
        "That's an important question. Let me find the most accurate information for you..."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const getSuggestedQuestions = () => [
    "What are the symptoms of COVID-19?",
    "How can I improve my sleep quality?",
    "What foods help with digestion?",
    "How to manage stress and anxiety?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-blue-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </Button>
          
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h1 className="text-lg font-semibold text-gray-800">AI Health Assistant</h1>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          
          <div className="w-8"></div> {/* Spacer for flex alignment */}
        </div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold">Happiny Health Assistant</h2>
                  <div className="flex items-center text-xs text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                    <span>Online • Responds in seconds</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-4 bg-gradient-to-b from-white to-blue-50/50">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div className="flex max-w-[85%] md:max-w-[70%]">
                      {message.sender === 'bot' && !message.loading && (
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1">
                          <Bot className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                          } ${message.loading ? 'animate-pulse' : ''}`}
                        >
                          {message.loading ? (
                            <div className="flex space-x-1.5">
                              <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          ) : (
                            <p className="text-sm md:text-base">{message.text}</p>
                          )}
                        </div>
                        
                        {!message.loading && (
                          <div className={`flex items-center mt-1 space-x-2 text-xs text-gray-400 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.sender === 'bot' && !message.loading && (
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => handleLikeDislike(message.id, true)}
                                  className={`p-0.5 rounded ${message.liked === true ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'} transition-colors`}
                                >
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleLikeDislike(message.id, false)}
                                  className={`p-0.5 rounded ${message.liked === false ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                                >
                                  <ThumbsDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {message.sender === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-2 mt-1">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </AnimatePresence>
              
              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 px-4"
                >
                  <div className="text-center text-sm text-gray-500 mb-3">
                    Try asking me about:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {getSuggestedQuestions().map((question, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white border border-gray-100 rounded-xl p-3 text-sm cursor-pointer hover:shadow-md transition-all"
                        onClick={() => {
                          setInputMessage(question);
                          inputRef.current?.focus();
                        }}
                      >
                        <div className="flex items-center">
                          <div className="bg-blue-50 p-1 rounded-lg mr-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <span className="text-gray-700">{question}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-100 p-4 bg-white">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <button 
                    onClick={toggleVoiceInput}
                    className={`p-1.5 rounded-full ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-600'} transition-colors`}
                    title={isListening ? 'Listening...' : 'Voice input'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
                    title="Attach file"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
                
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                  placeholder="Type your health question..."
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
                  className="pl-12 pr-16 py-5 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-base bg-gray-50"
                />
                
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 rounded-full ${
                    inputMessage.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">
                {isListening ? (
                  <span className="text-blue-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                    Listening...
                  </span>
                ) : (
                  "Happiny AI may produce inaccurate information about people, places, or facts."
                )}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {[
            {
              title: "Book Appointment",
              description: "Schedule a video consultation with our doctors",
              icon: <Plus className="w-5 h-5 text-blue-600" />,
              action: () => navigate('/telemedicine'),
              color: "bg-blue-50 text-blue-700 hover:bg-blue-100"
            },
            {
              title: "Find Doctors",
              description: "Search for specialists near you",
              icon: <User className="w-5 h-5 text-green-600" />,
              action: () => navigate('/doctors'),
              color: "bg-green-50 text-green-700 hover:bg-green-100"
            },
            {
              title: "Health Records",
              description: "View your medical history",
              icon: <FileText className="w-5 h-5 text-purple-600" />,
              action: () => navigate('/health-records'),
              color: "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-xl cursor-pointer transition-all ${item.color} border border-transparent hover:border-opacity-20 hover:shadow-sm`}
              onClick={item.action}
            >
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-lg bg-white bg-opacity-50 mr-3">
                  {item.icon}
                </div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <p className="text-sm opacity-80">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatPage;
