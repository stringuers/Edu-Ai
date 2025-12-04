import React, { useEffect, useState } from 'react';
import { MessageSquare, Info, BookOpen, Lightbulb } from 'lucide-react';
import ChatInterface from '@components/modules/chatbot/ChatInterface';
import ChatGPTChatHistorySidebar from '@components/modules/chatbot/ChatGPTChatHistorySidebar';
import { chatSessions } from '@services/storage/chatSessions';
import { storageService } from '@services/storage/localStorage';
import { STORAGE_KEYS } from '@constants/config';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';

const ChatbotPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);

  // Load sessions on mount
  useEffect(() => {
    setChats(chatSessions.getAll());
  }, []);

  const handleNewChat = () => {
    // Prevent creating a new chat if current is empty (no user messages)
    if (selectedChatId) {
      const history = storageService.getItem(`${STORAGE_KEYS.CHAT_HISTORY}:${selectedChatId}`) || [];
      const hasUser = Array.isArray(history) && history.some((m) => m.role === 'user');
      if (!hasUser) return; // block creation
    }

    const session = chatSessions.create('Nouvelle conversation');
    setChats(chatSessions.getAll());
    setSelectedChatId(session.id);
  };

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    chatSessions.touch(id);
    setChats(chatSessions.getAll());
  };

  const handleDeleteChat = (id) => {
    chatSessions.delete(id);
    setChats(chatSessions.getAll());
    if (selectedChatId === id) setSelectedChatId(null);
  };

  const handleRenameChat = (id, newName) => {
    chatSessions.rename(id, newName);
    setChats(chatSessions.getAll());
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-mint p-3 rounded-xl shadow-card">
                <MessageSquare className="w-8 h-8 text-brand-slate" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-slate">
                  Chatbot Intelligent
                </h1>
                <p className="text-brand-slate mt-1">
                  Discute avec l'IA et découvre comment elle comprend tes questions
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowInfo(true)}
              icon={<Info className="w-5 h-5" />}
              className="text-brand-slate border-brand-mint hover:bg-brand-mint hover:text-brand-slate"
            >
              Comment ça marche ?
            </Button>
          </div>

          {/* Conseils rapides */}
          <div className="bg-brand-mint/40 border-l-4 border-brand-mint p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-brand-slate flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-text-primary mb-1">💡 Conseils pour discuter</h3>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Pose des questions sur l'IA, le machine learning, ou les technologies</li>
                  <li>• Sois clair et précis dans tes questions</li>
                  <li>• N'hésite pas à demander des explications supplémentaires</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interface du chat */}
        <div className="animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-220px)]">
            <div className="h-full">
              <ChatGPTChatHistorySidebar
                chats={chats}
                onSelectChat={handleSelectChat}
                onDeleteChat={handleDeleteChat}
                onRenameChat={handleRenameChat}
                onNewChat={handleNewChat}
                collapsed={collapsed}
                onToggleCollapsed={() => setCollapsed((v) => !v)}
                activeId={selectedChatId}
                newChatDisabled={!!selectedChatId && !((storageService.getItem(`${STORAGE_KEYS.CHAT_HISTORY}:${selectedChatId}`) || []).some((m) => m.role === 'user'))}
              />
            </div>

            <div className="flex-1">
              <ChatInterface sessionId={selectedChatId} />
            </div>
          </div>
        </div>

        {/* Cartes d'information en bas */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 animate-fade-in">
          <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-brand-mint p-2 rounded-lg text-brand-slate">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Traitement du langage</h3>
            </div>
            <p className="text-sm text-text-secondary">
              Le chatbot utilise le NLP (Natural Language Processing) pour comprendre et générer du texte naturel.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-brand-mint p-2 rounded-lg text-brand-slate">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Apprentissage continu</h3>
            </div>
            <p className="text-sm text-text-secondary">
              L'IA s'améliore constamment grâce aux interactions et aux nouvelles données d'entraînement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-brand-mint p-2 rounded-lg text-brand-slate">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Contexte conversationnel</h3>
            </div>
            <p className="text-sm text-text-secondary">
              Le chatbot se souvient du contexte de la conversation pour donner des réponses cohérentes.
            </p>
          </div>
        </div>
      </div>

      {/* Modal d'information */}
      <Modal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Comment fonctionne le Chatbot ?"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              🤖 Qu'est-ce qu'un chatbot ?
            </h3>
            <p className="text-text-secondary">
              Un chatbot est un programme informatique conçu pour simuler une conversation avec des utilisateurs humains. 
              Il utilise l'intelligence artificielle pour comprendre les questions et générer des réponses pertinentes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              🧠 Comment ça fonctionne ?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Tu poses une question ou fais une déclaration</li>
              <li>L'IA analyse ton message pour en comprendre le sens</li>
              <li>Elle recherche la meilleure réponse dans ses connaissances</li>
              <li>Elle génère une réponse naturelle et contextuelle</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              💡 Technologies utilisées
            </h3>
            <ul className="space-y-2 text-text-secondary">
              <li>• <strong>NLP</strong> : Traitement du langage naturel</li>
              <li>• <strong>Machine Learning</strong> : Apprentissage automatique</li>
              <li>• <strong>Réseaux de neurones</strong> : Pour la compréhension profonde</li>
            </ul>
          </div>

          <div className="bg-brand-mint/40 p-4 rounded-lg">
            <p className="text-sm text-text-secondary">
              <strong>Note :</strong> Ce chatbot est en mode démonstration. Dans une version complète, 
              il serait connecté à un modèle d'IA avancé comme GPT ou Claude pour des conversations plus riches.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatbotPage;