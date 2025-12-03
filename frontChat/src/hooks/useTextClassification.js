import { useState } from 'react';
import { textAPI } from '@services/api/textAPI';

/**
 * Hook personnalisé pour la classification de texte
 */
export const useTextClassification = () => {
  const [text, setText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [themeResult, setThemeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Analyse le sentiment du texte
   */
  const analyzeSentiment = async () => {
    setError(null);
    
    // Validation
    const validation = textAPI.validateText(text);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);

    try {
      // Utiliser le mode démo (à remplacer par le vrai API)
      const response = await textAPI.analyzeSentimentDemo(text);
      
      if (response.success) {
        setSentimentResult(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l\'analyse.');
      console.error('Erreur analyse sentiment:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Classifie le texte par thème
   */
  const classifyTheme = async () => {
    setError(null);
    
    // Validation
    const validation = textAPI.validateText(text);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);

    try {
      // Utiliser le mode démo (à remplacer par le vrai API)
      const response = await textAPI.classifyThemeDemo(text);
      
      if (response.success) {
        setThemeResult(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la classification.');
      console.error('Erreur classification:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Analyse complète (sentiment + thème)
   */
  const analyzeComplete = async () => {
    await analyzeSentiment();
    await classifyTheme();
  };

  /**
   * Réinitialise tout
   */
  const reset = () => {
    setText('');
    setSentimentResult(null);
    setThemeResult(null);
    setError(null);
  };

  return {
    text,
    setText,
    sentimentResult,
    themeResult,
    loading,
    error,
    analyzeSentiment,
    classifyTheme,
    analyzeComplete,
    reset
  };
};