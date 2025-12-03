import { apiClient, handleApiError } from './config';
import { MAX_TEXT_LENGTH } from '@constants/config';

/**
 * Service API pour le module Classification de Texte
 */
export const textAPI = {
  /**
   * Valide un texte
   * @param {string} text - Texte à valider
   * @returns {Object} Résultat de validation
   */
  validateText: (text) => {
    if (!text || text.trim().length === 0) {
      return { valid: false, error: 'Le texte ne peut pas être vide' };
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return { 
        valid: false, 
        error: `Le texte est trop long (max ${MAX_TEXT_LENGTH} caractères)` 
      };
    }

    return { valid: true };
  },

  /**
   * Analyse le sentiment d'un texte
   * @param {string} text - Texte à analyser
   * @returns {Promise<Object>} Résultats de l'analyse
   */
  analyzeSentiment: async (text) => {
    try {
      const response = await apiClient.post('/text/sentiment', { text });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Classifie un texte par thème
   * @param {string} text - Texte à classifier
   * @returns {Promise<Object>} Résultats de la classification
   */
  classifyTheme: async (text) => {
    try {
      const response = await apiClient.post('/text/classify', { text });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Obtient des explications sur la classification
   * @param {string} text - Texte original
   * @param {Object} result - Résultats de classification
   * @returns {Promise<Object>} Explications
   */
  getExplanation: async (text, result) => {
    try {
      const response = await apiClient.post('/text/explain', {
        text,
        result
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * MODE DÉMO : Simule l'analyse de sentiment (sans backend)
   */
  analyzeSentimentDemo: async (text) => {
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Logique simple pour démo
    const positiveWords = ['super', 'génial', 'excellent', 'magnifique', 'heureux', 'joie', 'aime'];
    const negativeWords = ['nul', 'mauvais', 'horrible', 'déteste', 'triste', 'ennuyeux'];

    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });

    let sentiment = 'neutre';
    let score = 0.5;

    if (positiveCount > negativeCount) {
      sentiment = 'positif';
      score = 0.7 + (positiveCount * 0.1);
    } else if (negativeCount > positiveCount) {
      sentiment = 'négatif';
      score = 0.3 - (negativeCount * 0.1);
    }

    score = Math.max(0, Math.min(1, score));

    return {
      success: true,
      data: {
        sentiment,
        score,
        confidence: 0.82,
        keywords: positiveCount > 0 ? positiveWords.slice(0, 3) : negativeWords.slice(0, 3),
        timestamp: new Date().toISOString()
      }
    };
  },

  /**
   * MODE DÉMO : Simule la classification par thème (sans backend)
   */
  classifyThemeDemo: async (text) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const themes = [
      { label: 'Technologie', confidence: 0.75 },
      { label: 'Éducation', confidence: 0.68 },
      { label: 'Science', confidence: 0.52 },
      { label: 'Divertissement', confidence: 0.34 },
      { label: 'Sport', confidence: 0.21 }
    ];

    return {
      success: true,
      data: {
        themes,
        primaryTheme: themes[0].label,
        timestamp: new Date().toISOString()
      }
    };
  }
};