import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

const SentimentMeter = ({ sentiment, score }) => {
  const getSentimentConfig = () => {
    switch (sentiment) {
      case 'positif':
        return {
          icon: <Smile className="w-8 h-8" />,
          color: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
          label: 'Positif',
          emoji: '😊'
        };
      case 'négatif':
        return {
          icon: <Frown className="w-8 h-8" />,
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          label: 'Négatif',
          emoji: '😞'
        };
      default:
        return {
          icon: <Meh className="w-8 h-8" />,
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          label: 'Neutre',
          emoji: '😐'
        };
    }
  };

  const config = getSentimentConfig();

  return (
    <div className="space-y-4">
      {/* Carte principale du sentiment */}
      <div className={`bg-gradient-to-r ${config.color} text-white rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              {config.icon}
              <span className="text-sm font-medium opacity-90">Sentiment détecté</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">
              {config.label} {config.emoji}
            </h3>
            <p className="text-sm opacity-90">
              Score de sentiment: {(score * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-5xl font-bold opacity-80">
            {(score * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Jauge visuelle */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Jauge de sentiment</h4>
        
        <div className="relative h-8 bg-gradient-to-r from-red-500 via-gray-300 to-green-500 rounded-full overflow-hidden">
          {/* Indicateur de position */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-500"
            style={{ left: `${score * 100}%` }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
              {(score * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>😞 Négatif</span>
          <span>😐 Neutre</span>
          <span>😊 Positif</span>
        </div>
      </div>

      {/* Explication */}
      <div className={`${config.bgColor} border-l-4 border-${sentiment === 'positif' ? 'green' : sentiment === 'négatif' ? 'red' : 'gray'}-500 p-4 rounded-lg`}>
        <h5 className={`font-semibold ${config.textColor} mb-2`}>
          💡 Interprétation
        </h5>
        <p className={`text-sm ${config.textColor}`}>
          {sentiment === 'positif' 
            ? "Le texte exprime des émotions positives, de la satisfaction ou de l'enthousiasme. L'IA a détecté des mots et expressions optimistes."
            : sentiment === 'négatif'
            ? "Le texte exprime des émotions négatives, de l'insatisfaction ou de la critique. L'IA a identifié des mots et expressions pessimistes."
            : "Le texte est équilibré ou factuel, sans émotion forte dans un sens ou dans l'autre. L'IA n'a pas détecté d'orientation émotionnelle marquée."
          }
        </p>
      </div>
    </div>
  );
};

export default SentimentMeter;