import { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello Dr. Johnson! I\'m your AI assistant. I can help you with patient information, medical guidelines, government schemes, and clinical support. How can I assist you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    'Patient summary for John Smith',
    'Latest hypertension guidelines',
    'Government health schemes',
    'Drug interaction checker',
    'ICD-10 codes for diabetes'
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessages = [
        ...messages,
        { id: messages.length + 1, type: 'user', content: inputMessage },
        { 
          id: messages.length + 2, 
          type: 'ai', 
          content: 'I understand your query. Let me help you with that information. This is a simulated response that would normally be powered by AI to provide relevant medical assistance and guidelines.'
        }
      ];
      setMessages(newMessages);
      setInputMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    const newMessages = [
      ...messages,
      { id: messages.length + 1, type: 'user', content: action },
      { 
        id: messages.length + 2, 
        type: 'ai', 
        content: `Here's the information about "${action}". This would be a detailed response with relevant medical data, guidelines, or patient information based on your request.`
      }
    ];
    setMessages(newMessages);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close AI Assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                message.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>
              <div className={`px-3 py-2 rounded-lg text-sm ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-100">
        <div className="mb-3">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Quick Actions</h4>
          <div className="space-y-1">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="w-full text-left px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            aria-label="Send message"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}