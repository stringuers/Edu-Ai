import React, { useState } from 'react';
import { FileText, Info, Brain, TrendingUp, Target } from 'lucide-react';
import TextInput from '@components/modules/textClassification/TextInput';
import ClassificationResult from '@components/modules/textClassification/ClassificationResult';
import { useTextClassification } from '@hooks/useTextClassification';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import Notification from '@components/common/Notification';

const TextClassificationPage = () => {
  const {
    text,
    setText,
    sentimentResult,
    themeResult,
    loading,
    error,
    analyzeComplete,
    reset
  } = useTextClassification();

  const [showInfo, setShowInfo] = useState(false);

  const handleAnalyze = async () => {
    await analyzeComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Classification de Texte
                </h1>
                <p className="text-gray-600 mt-1">
                  Analyse le sentiment et les thèmes de n'importe quel texte
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
        </div>

        {/* Notification d'erreur */}
        {error && (
          <div className="mb-6">
            <Notification type="error" message={error} />
          </div>
        )}

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Input */}
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <TextInput
                text={text}
                onChange={(e) => setText(e.target.value)}
                onAnalyze={handleAnalyze}
                loading={loading}
              />
            </div>

            {(sentimentResult || themeResult) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Button
                  variant="outline"
                  onClick={reset}
                  className="w-full"
                >
                  Analyser un autre texte
                </Button>
              </div>
            )}

            {/* Info rapide */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                💡 Ce que l'IA analyse
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• <strong>Sentiment</strong> : Positif, négatif ou neutre</li>
                <li>• <strong>Thèmes</strong> : Catégories principales du texte</li>
                <li>• <strong>Mots-clés</strong> : Termes importants identifiés</li>
              </ul>
            </div>
          </div>

          {/* Colonne droite - Résultats */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            {loading && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="inline-block bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-full mb-4 animate-bounce-slow">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analyse en cours...
                </h3>
                <p className="text-gray-600">
                  L'IA examine ton texte
                </p>
              </div>
            )}

            {!loading && !sentimentResult && !themeResult && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun texte analysé
                </h3>
                <p className="text-gray-600">
                  Entre un texte et clique sur "Analyser" pour voir les résultats
                </p>
              </div>
            )}

            {(sentimentResult || themeResult) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ClassificationResult
                  sentimentResult={sentimentResult}
                  themeResult={themeResult}
                />
              </div>
            )}
          </div>
        </div>

        {/* Cartes d'information en bas */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">NLP - Traitement du langage</h3>
            </div>
            <p className="text-sm text-gray-600">
              L'IA utilise le traitement du langage naturel pour comprendre le sens et le contexte du texte.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-teal-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Analyse de sentiment</h3>
            </div>
            <p className="text-sm text-gray-600">
              L'IA détecte les émotions exprimées dans le texte : joie, tristesse, colère, neutralité.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Classification thématique</h3>
            </div>
            <p className="text-sm text-gray-600">
              Le texte est catégorisé selon son contenu : technologie, sport, politique, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Modal d'information */}
      <Modal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Comment fonctionne la classification de texte ?"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📝 Traitement du Langage Naturel (NLP)
            </h3>
            <p className="text-gray-600">
              Le NLP permet aux machines de comprendre, interpréter et manipuler le langage humain. 
              C'est une branche de l'IA qui combine linguistique et informatique.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🔄 Processus d'analyse
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Le texte est tokenisé (découpé en mots/phrases)</li>
              <li>Chaque mot est analysé et contextualisé</li>
              <li>L'IA identifie les patterns linguistiques</li>
              <li>Les émotions et thèmes sont extraits</li>
              <li>Un score de confiance est calculé</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎯 Types d'analyse
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Analyse de sentiment</h4>
                <p className="text-sm text-gray-600">
                  Détermine si le texte exprime une opinion positive, négative ou neutre. 
                  Utile pour analyser des avis, des commentaires ou des retours clients.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Classification thématique</h4>
                <p className="text-sm text-gray-600">
                  Catégorise le texte selon son sujet principal (sport, technologie, politique, etc.). 
                  Permet d'organiser automatiquement de grandes quantités de textes.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🤖 Applications pratiques
            </h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Analyse d'avis clients sur des produits</li>
              <li>• Modération automatique de commentaires</li>
              <li>• Tri automatique d'emails</li>
              <li>• Détection de spam ou de contenu inapproprié</li>
              <li>• Recommandation de contenu personnalisé</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Note :</strong> Les modèles de NLP sont entraînés sur d'énormes corpus de textes 
              pour apprendre les nuances du langage, l'ironie, le sarcasme et les expressions idiomatiques.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TextClassificationPage;