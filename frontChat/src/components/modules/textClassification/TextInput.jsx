import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { MAX_TEXT_LENGTH } from '@constants/config';

const TextInput = ({ text, onChange, onAnalyze, loading }) => {
  const characterCount = text.length;
  const progressPercent = (characterCount / MAX_TEXT_LENGTH) * 100;

  const exampleTexts = [
    "J'adore cette application ! Elle est vraiment géniale et m'aide beaucoup à apprendre l'IA.",
    "Ce film était ennuyeux et décevant. Je ne le recommande pas du tout.",
    "L'intelligence artificielle transforme notre monde de manière fascinante.",
  ];

  const handleExampleClick = (example) => {
    onChange({ target: { value: example } });
  };

  return (
    <div className="space-y-4">
      {/* Titre */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Analyse de Texte</h3>
          <p className="text-sm text-gray-600">Entre un texte pour analyser son sentiment et son thème</p>
        </div>
      </div>

      {/* Zone de texte */}
      <div className="relative">
        <textarea
          value={text}
          onChange={onChange}
          placeholder="Entre ton texte ici... Par exemple, une critique de film, un avis sur un produit, ou n'importe quel texte que tu veux analyser."
          className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-purple-500 transition"
          maxLength={MAX_TEXT_LENGTH}
        />

        {/* Compteur de caractères */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className={`text-sm font-medium ${
            characterCount > MAX_TEXT_LENGTH * 0.9 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {characterCount} / {MAX_TEXT_LENGTH}
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            progressPercent > 90 
              ? 'bg-gradient-to-r from-red-500 to-red-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Exemples de texte */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-gray-700">Exemples rapides</span>
        </div>
        
        <div className="space-y-2">
          {exampleTexts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="w-full text-left text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>

      {/* Bouton d'analyse */}
      <button
        onClick={onAnalyze}
        disabled={!text.trim() || loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Analyse en cours...
          </span>
        ) : (
          'Analyser le texte'
        )}
      </button>
    </div>
  );
};

export default TextInput;