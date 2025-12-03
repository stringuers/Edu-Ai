import { apiClient, handleApiError } from './config';
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '@constants/config';

/**
 * Service API pour le module Reconnaissance d'Image
 */
export const imageAPI = {
  /**
   * Valide un fichier image
   * @param {File} file - Fichier à valider
   * @returns {Object} Résultat de validation
   */
  validateImage: (file) => {
    if (!file) {
      return { valid: false, error: 'Aucun fichier sélectionné' };
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: 'Format non supporté. Utilise JPG, PNG ou WEBP.' 
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { 
        valid: false, 
        error: `Le fichier est trop volumineux (max ${MAX_FILE_SIZE / 1024 / 1024}MB)` 
      };
    }

    return { valid: true };
  },

  /**
   * Analyse une image
   * @param {File} file - Fichier image à analyser
   * @returns {Promise<Object>} Résultats de l'analyse
   */
  analyzeImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiClient.post('/image/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
   * Obtient des explications sur les prédictions
   * @param {Array} predictions - Les prédictions obtenues
   * @returns {Promise<Object>} Explications
   */
  getExplanation: async (predictions) => {
    try {
      const response = await apiClient.post('/image/explain', {
        predictions
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
   * MODE DÉMO : Simule l'analyse d'une image (sans backend)
   */
  analyzeImageDemo: async (file) => {
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));

    const demoResults = [
      { label: 'Chat', confidence: 0.92 },
      { label: 'Animal domestique', confidence: 0.87 },
      { label: 'Mammifère', confidence: 0.79 },
      { label: 'Félin', confidence: 0.73 },
      { label: 'Animal', confidence: 0.68 }
    ];

    return {
      success: true,
      data: {
        predictions: demoResults,
        imageUrl: URL.createObjectURL(file),
        timestamp: new Date().toISOString()
      }
    };
  }
};