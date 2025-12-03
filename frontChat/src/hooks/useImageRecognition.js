import { useState } from 'react';
import { imageAPI } from '@services/api/imageAPI';

/**
 * Hook personnalisé pour la reconnaissance d'image
 */
export const useImageRecognition = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Gère la sélection d'une image
   */
  const handleImageSelect = (file) => {
    setError(null);
    setResults(null);

    // Valider l'image
    const validation = imageAPI.validateImage(file);
    if (!validation.valid) {
      setError(validation.error);
      return false;
    }

    // Créer une prévisualisation
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setImage(file);
    return true;
  };

  /**
   * Analyse l'image sélectionnée
   */
  const analyzeImage = async () => {
    if (!image) {
      setError('Aucune image sélectionnée');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Utiliser le mode démo (à remplacer par le vrai API)
      const response = await imageAPI.analyzeImageDemo(image);
      
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l\'analyse.');
      console.error('Erreur analyse image:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Réinitialise tout
   */
  const reset = () => {
    setImage(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };

  return {
    image,
    preview,
    results,
    loading,
    error,
    handleImageSelect,
    analyzeImage,
    reset
  };
};