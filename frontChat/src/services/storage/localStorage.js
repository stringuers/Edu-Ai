import { STORAGE_KEYS } from '@constants/config';

/**
 * Service de gestion du localStorage
 */
export const storageService = {
  /**
   * Sauvegarde des données dans le localStorage
   * @param {string} key - Clé de stockage
   * @param {any} value - Valeur à stocker
   */
  setItem: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  },

  /**
   * Récupère des données du localStorage
   * @param {string} key - Clé de stockage
   * @returns {any} Valeur stockée ou null
   */
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
      return null;
    }
  },

  /**
   * Supprime une entrée du localStorage
   * @param {string} key - Clé à supprimer
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  },

  /**
   * Vide complètement le localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
      return false;
    }
  },

  /**
   * Vérifie si une clé existe
   * @param {string} key - Clé à vérifier
   * @returns {boolean}
   */
  hasItem: (key) => {
    return localStorage.getItem(key) !== null;
  }
};