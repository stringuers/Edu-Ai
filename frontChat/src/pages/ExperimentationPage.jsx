import React, { useState, useEffect } from 'react';
import { Lightbulb, Plus, Trash2, Download, Calendar, MessageSquare, Image, FileText } from 'lucide-react';
import { projectStorage } from '@services/storage/projectStorage';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import { ConfirmModal } from '@components/common/Modal';
import Notification from '@components/common/Notification';

const ExperimentationPage = () => {
  const [projects, setProjects] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = projectStorage.getAllProjects();
    setProjects(allProjects);
  };

  const handleDelete = (projectId) => {
    const success = projectStorage.deleteProject(projectId);
    if (success) {
      loadProjects();
      setNotification({ type: 'success', message: 'Projet supprimé avec succès' });
      setTimeout(() => setNotification(null), 3000);
    }
    setDeleteConfirm(null);
  };

  const handleExport = () => {
    const jsonData = projectStorage.exportProjects();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projets-ia-${new Date().toISOString()}.json`;
    a.click();
    
    setNotification({ type: 'success', message: 'Projets exportés avec succès' });
    setTimeout(() => setNotification(null), 3000);
  };

  const getModuleIcon = (module) => {
    switch (module) {
      case 'chatbot':
        return <MessageSquare className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'text':
        return <FileText className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getModuleColor = (module) => {
    switch (module) {
      case 'chatbot':
        return 'from-blue-500 to-cyan-500';
      case 'image':
        return 'from-purple-500 to-pink-500';
      case 'text':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notification */}
        {notification && (
          <div className="fixed top-20 right-4 z-50">
            <Notification 
              type={notification.type} 
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        {/* En-tête */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Mes Expériences
                </h1>
                <p className="text-gray-600 mt-1">
                  Retrouve tous tes projets et expérimentations IA
                </p>
              </div>
            </div>

            {projects.length > 0 && (
              <Button
                variant="outline"
                onClick={handleExport}
                icon={<Download className="w-5 h-5" />}
              >
                Exporter tout
              </Button>
            )}
          </div>

          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de projets</p>
                  <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Conversations</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {projects.filter(p => p.module === 'chatbot').length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Analyses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {projects.filter(p => p.module === 'image' || p.module === 'text').length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des projets */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slide-up">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun projet pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commence à utiliser nos modules IA pour créer tes premiers projets !
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="primary">
                Découvrir les modules
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tous les projets ({projects.length})
            </h2>
            
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`bg-gradient-to-r ${getModuleColor(project.module)} p-3 rounded-lg text-white`}>
                        {getModuleIcon(project.module)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {project.title || 'Projet sans titre'}
                        </h3>
                        
                        {project.description && (
                          <p className="text-gray-600 mb-3 text-sm">
                            {project.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            {project.module === 'chatbot' ? 'Chatbot' : 
                             project.module === 'image' ? 'Image' : 'Texte'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setDeleteConfirm(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm)}
        title="Supprimer le projet"
        message="Es-tu sûr de vouloir supprimer ce projet ? Cette action est irréversible."
        confirmText="Supprimer"
        variant="danger"
      />
    </div>
  );
};

export default ExperimentationPage;