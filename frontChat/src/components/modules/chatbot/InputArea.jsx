import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

const InputArea = ({ onSend, loading, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end space-x-3">
        {/* Bouton d'attachement (optionnel - désactivé pour le moment) */}
        <button
          type="button"
          className="flex-shrink-0 p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={true}
          title="Fonctionnalité bientôt disponible"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Zone de saisie */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pose ta question sur l'IA..."
            disabled={loading || disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-purple-500 transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            style={{ maxHeight: '150px' }}
          />
        </div>

        {/* Bouton vocal (optionnel - désactivé pour le moment) */}
        <button
          type="button"
          className="flex-shrink-0 p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={true}
          title="Fonctionnalité bientôt disponible"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={!message.trim() || loading || disabled}
          className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Indicateur de saisie */}
      <div className="mt-2 px-2">
        <p className="text-xs text-gray-500">
          Appuie sur <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Entrée</kbd> pour envoyer, 
          <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs ml-1">Shift + Entrée</kbd> pour une nouvelle ligne
        </p>
      </div>
    </form>
  );
};

export default InputArea;