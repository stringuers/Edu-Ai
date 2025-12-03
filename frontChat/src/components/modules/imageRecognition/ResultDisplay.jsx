import React from 'react';
import { CheckCircle, Award, TrendingUp } from 'lucide-react';

const ResultDisplay = ({ results }) => {
  if (!results || !results.predictions) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* En-tête */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Résultats de l'analyse</h3>
          <p className="text-sm text-gray-600">Voici ce que l'IA a détecté dans ton image</p>
        </div>
      </div>

      {/* Prédiction principale */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Meilleure prédiction</span>
            </div>
            <h4 className="text-2xl font-bold mb-2">
              {results.predictions[0].label}
            </h4>
            <p className="text-sm opacity-90">
              L'IA est sûre à {(results.predictions[0].confidence * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-4xl font-bold opacity-80">
            {(results.predictions[0].confidence * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Autres prédictions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-semibold text-gray-900">Autres détections possibles</h4>
        </div>

        <div className="space-y-3">
          {results.predictions.slice(1).map((prediction, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {prediction.label}
                </span>
                <span className="text-sm font-semibold text-purple-600">
                  {(prediction.confidence * 100).toFixed(1)}%
                </span>
              </div>
              
              {/* Barre de progression */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explication */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h5 className="font-semibold text-blue-900 mb-2">💡 Comment ça marche ?</h5>
        <p className="text-sm text-blue-800">
          L'IA a analysé ton image en utilisant un réseau de neurones entraîné sur des millions d'images. 
          Elle identifie les patterns visuels et les compare à ce qu'elle a appris pour faire ses prédictions. 
          Le pourcentage de confiance indique à quel point l'IA est sûre de sa réponse.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;