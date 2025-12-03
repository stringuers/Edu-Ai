import React, { useState } from 'react';
import { MessageSquare, Info, BookOpen, Lightbulb } from 'lucide-react';
import ChatInterface from '@components/modules/chatbot/ChatInterface';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';

const ChatbotPage = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Chatbot Intelligent
                </h1>
                <p className="text-gray-600 mt-1">
                  Discute avec l'IA et découvre comment elle comprend tes questions
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowInfo(true)}
              icon={<Info className="w-5 h-5" />}
            >
              Comment ça marche ?
            </Button>
          </div>

          {/* Conseils rapides */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">💡 Conseils pour discuter</h3>
                <ul className="text-sm text-blue-800 space-y-1">
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
          <ChatInterface />
        </div>

        {/* Cartes d'information en bas */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Traitement du langage</h3>
            </div>
            <p className="text-sm text-gray-600">
              Le chatbot utilise le NLP (Natural Language Processing) pour comprendre et générer du texte naturel.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Apprentissage continu</h3>
            </div>
            <p className="text-sm text-gray-600">
              L'IA s'améliore constamment grâce aux interactions et aux nouvelles données d'entraînement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Lightbulb className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Contexte conversationnel</h3>
            </div>
            <p className="text-sm text-gray-600">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🤖 Qu'est-ce qu'un chatbot ?
            </h3>
            <p className="text-gray-600">
              Un chatbot est un programme informatique conçu pour simuler une conversation avec des utilisateurs humains. 
              Il utilise l'intelligence artificielle pour comprendre les questions et générer des réponses pertinentes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🧠 Comment ça fonctionne ?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Tu poses une question ou fais une déclaration</li>
              <li>L'IA analyse ton message pour en comprendre le sens</li>
              <li>Elle recherche la meilleure réponse dans ses connaissances</li>
              <li>Elle génère une réponse naturelle et contextuelle</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              💡 Technologies utilisées
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>NLP</strong> : Traitement du langage naturel</li>
              <li>• <strong>Machine Learning</strong> : Apprentissage automatique</li>
              <li>• <strong>Réseaux de neurones</strong> : Pour la compréhension profonde</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800">
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