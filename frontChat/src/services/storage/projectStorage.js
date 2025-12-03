import { storageService } from './localStorage';
import { STORAGE_KEYS } from '@constants/config';

/**
 * Service de gestion des projets utilisateur
 */
export const projectStorage = {
  /**
   * Récupère tous les projets
   * @returns {Array} Liste des projets
   */
  getAllProjects: () => {
    return storageService.getItem(STORAGE_KEYS.PROJECTS) || [];
  },

  /**
   * Récupère un projet par ID
   * @param {string} id - ID du projet
   * @returns {Object|null} Projet ou null
   */
  getProjectById: (id) => {
    const projects = projectStorage.getAllProjects();
    return projects.find(p => p.id === id) || null;
  },

  /**
   * Sauvegarde un nouveau projet
   * @param {Object} project - Données du projet
   * @returns {Object} Projet sauvegardé avec ID
   */
  saveProject: (project) => {
    const projects = projectStorage.getAllProjects();
    const newProject = {
      ...project,
      id: project.id || Date.now().toString(),
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    storageService.setItem(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },

  /**
   * Met à jour un projet existant
   * @param {string} id - ID du projet
   * @param {Object} updates - Données à mettre à jour
   * @returns {Object|null} Projet mis à jour ou null
   */
  updateProject: (id, updates) => {
    const projects = projectStorage.getAllProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    storageService.setItem(STORAGE_KEYS.PROJECTS, projects);
    return projects[index];
  },

  /**
   * Supprime un projet
   * @param {string} id - ID du projet à supprimer
   * @returns {boolean} Succès de la suppression
   */
  deleteProject: (id) => {
    const projects = projectStorage.getAllProjects();
    const filtered = projects.filter(p => p.id !== id);
    
    if (filtered.length === projects.length) return false;
    
    storageService.setItem(STORAGE_KEYS.PROJECTS, filtered);
    return true;
  },

  /**
   * Récupère les projets d'un module spécifique
   * @param {string} module - Nom du module (chatbot, image, text)
   * @returns {Array} Projets du module
   */
  getProjectsByModule: (module) => {
    const projects = projectStorage.getAllProjects();
    return projects.filter(p => p.module === module);
  },

  /**
   * Exporte tous les projets en JSON
   * @returns {string} JSON des projets
   */
  exportProjects: () => {
    const projects = projectStorage.getAllProjects();
    return JSON.stringify(projects, null, 2);
  },

  /**
   * Importe des projets depuis JSON
   * @param {string} jsonData - Données JSON
   * @returns {boolean} Succès de l'import
   */
  importProjects: (jsonData) => {
    try {
      const imported = JSON.parse(jsonData);
      if (!Array.isArray(imported)) return false;
      
      const existing = projectStorage.getAllProjects();
      const merged = [...existing, ...imported];
      
      storageService.setItem(STORAGE_KEYS.PROJECTS, merged);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      return false;
    }
  }
};