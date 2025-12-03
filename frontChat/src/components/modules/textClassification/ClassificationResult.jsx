import React from 'react';
import { Tag, TrendingUp, Award } from 'lucide-react';
import SentimentMeter from './SentimentMeter';

const ClassificationResult = ({ sentimentResult, themeResult }) => {
  if (!sentimentResult && !themeResult) return null;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Analyse de sentiment */}
      {sentimentResult && (
        <div>
          <SentimentMeter 
            sentiment={sentimentResult.sentiment} 
            score={sentimentResult.score} 
          />
        </div>
      )}

      {/* Classification par thème */}
      {themeResult && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Classification par thème</h3>
              <p className="text-sm text-gray-600">Catégories détectées dans le texte</p>
            </div>
          </div>

          {/* Thème principal */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">Thème principal</span>
                </div>
                <h4 className="text-2xl font-bold mb-2">
                  {themeResult.primaryTheme}
                </h4>
                <p className="text-sm opacity-90">
                  Détecté avec {(themeResult.themes[0].confidence * 100).toFixed(1)}% de confiance
                </p>
              </div>
              <div className="text-4xl font-bold opacity-80">
                {(themeResult.themes[0].confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Autres thèmes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h4 className="text-lg font-semibold text-gray-900">Autres thèmes détectés</h4>
            </div>

            <div className="space-y-3">
              {themeResult.themes.slice(1).map((theme, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        {theme.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-purple-600">
                      {(theme.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Barre de progression */}
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500"
                      style={{ width: `${theme.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mots-clés détectés */}
      {sentimentResult?.keywords && sentimentResult.keywords.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Mots-clés détectés</h4>
          <div className="flex flex-wrap gap-2">
            {sentimentResult.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Explication du fonctionnement */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
        <h5 className="font-semibold text-purple-900 mb-2">🤖 Comment l'IA analyse le texte ?</h5>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• L'IA découpe le texte en mots et analyse leur contexte</li>
          <li>• Elle identifie les émotions exprimées (positives, négatives, neutres)</li>
          <li>• Elle détecte les thèmes principaux abordés dans le contenu</li>
          <li>• Le pourcentage de confiance indique la certitude de l'IA</li>
        </ul>
      </div>
    </div>
  );
};

export default ClassificationResult;