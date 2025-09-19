import { useState } from 'react';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, MessageSquare, ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface Conversation {
  id: number;
  patient: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    patient: 'John Smith',
    lastMessage: 'Thank you for the prescription, Doctor.',
    time: '2 hours ago',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    online: true,
    messages: [
      { id: 1, text: 'Hello, doctor!', sender: 'them', time: '10:00 AM' },
      { id: 2, text: 'Hi John, how can I help you today?', sender: 'me', time: '10:02 AM' },
      { id: 3, text: 'I need to reschedule my appointment', sender: 'them', time: '10:30 AM' },
    ]
  },
  {
    id: 2,
    patient: 'Emily Davis',
    lastMessage: 'When should I schedule my next appointment?',
    time: '5 hours ago',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    online: false,
    messages: [
      { id: 1, text: 'Hello, I need a prescription refill', sender: 'them', time: '9:00 AM' },
      { id: 2, text: 'I\'ve sent it to your email', sender: 'me', time: '9:30 AM' },
      { id: 3, text: 'Thank you for the prescription', sender: 'them', time: '10:00 AM' },
    ]
  },
  {
    id: 3,
    patient: 'Michael Brown',
    lastMessage: 'I\'ve been experiencing some side effects...',
    time: '1 day ago',
    unread: 1,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    online: false,
    messages: [
      { id: 1, text: 'Hello, I have some concerns about my medication', sender: 'them', time: '2:00 PM' },
      { id: 2, text: 'What symptoms are you experiencing?', sender: 'me', time: '2:15 PM' },
      { id: 3, text: 'I\'ve been experiencing some side effects...', sender: 'them', time: '2:30 PM' },
    ]
  },
  {
    id: 4,
    patient: 'Sarah Johnson',
    lastMessage: 'Thank you for the quick consultation.',
    time: '2 days ago',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    online: true,
    messages: [
      { id: 1, text: 'Hello, I need a quick consultation', sender: 'them', time: '11:00 AM' },
      { id: 2, text: 'I can help with that. What do you need?', sender: 'me', time: '11:05 AM' },
      { id: 3, text: 'Thank you for the quick consultation.', sender: 'them', time: '11:30 AM' },
    ]
  },
];

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          time: 'Just now',
          unread: 0
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessageInput('');
    
    // Update selected chat to show the new message
    const updatedSelectedChat = updatedConversations.find(c => c.id === selectedChat.id) || null;
    setSelectedChat(updatedSelectedChat);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
                selectedChat?.id === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedChat(conversation)}
            >
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.patient}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{conversation.patient}</h3>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center">
                <button 
                  className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedChat(null)}
                  aria-label="Back to conversations"
                  title="Back to conversations"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.patient}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{selectedChat.patient}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedChat.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Audio call"
                  title="Audio call"
                >
                  <Phone className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Video call"
                  title="Video call"
                >
                  <Video className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="More options"
                  title="More options"
                >
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'me'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 text-right opacity-70">
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700"
                  aria-label="Attach file"
                  title="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 mx-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <button
                  className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleSendMessage}
                  aria-label="Send message"
                  title="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <MessageSquare className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-500 max-w-md">
              Choose a conversation from the list to start messaging or search for someone to chat with.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}