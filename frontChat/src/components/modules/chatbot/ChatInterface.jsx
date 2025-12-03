import React, { useRef, useEffect } from 'react';
import { Trash2, Download, RefreshCw } from 'lucide-react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import { useChat } from '@hooks/useChat';
import Loader from '@components/common/Loader';
import Button from '@components/common/Button';

const ChatInterface = () => {
  const { messages, loading, error, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleExportChat = () => {
    const chatText = messages
      .map(msg => `[${msg.role === 'user' ? 'Toi' : 'IA'}]: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString()}.txt`;
    a.click();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chatbot IA</h2>
          <p className="text-sm text-gray-600">Pose tes questions sur l'intelligence artificielle</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportChat}
            icon={<Download className="w-4 h-4" />}
            disabled={messages.length === 0}
          >
            Exporter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={clearMessages}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-gray-50">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <Loader size="sm" />
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <p className="text-gray-600">L'IA réfléchit...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <InputArea onSend={sendMessage} loading={loading} disabled={false} />
    </div>
  );
};

export default ChatInterface;