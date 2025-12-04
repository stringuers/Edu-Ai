import React, { useState } from 'react';
import { BookOpen, Brain, Network, MessageCircle, Eye, FolderTree, ChevronRight } from 'lucide-react';
import { AI_CONCEPTS } from '@constants/aiConcepts';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';

const DocumentationPage = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);

  const iconMap = {
    Brain: Brain,
    Network: Network,
    MessageCircle: MessageCircle,
    Eye: Eye,
    FolderTree: FolderTree
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'débutant':
        return 'bg-brand-mint/60 text-brand-slate';
      case 'intermédiaire':
        return 'bg-brand-grey text-text-primary';
      case 'avancé':
        return 'bg-brand-surface text-text-primary border border-brand-grey';
      default:
        return 'bg-brand-grey text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-brand-mint p-3 rounded-xl shadow-card">
              <BookOpen className="w-8 h-8 text-brand-slate" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Documentation IA
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Apprends les concepts fondamentaux de l'intelligence artificielle à travers des explications simples et illustrées
          </p>
        </div>

        {/* Section Introduction */}
        <div className="bg-white rounded-2xl shadow-card border-l-4 border-brand-mint p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            🚀 Qu'est-ce que l'Intelligence Artificielle ?
          </h2>
          <p className="text-text-secondary mb-4">
            L'Intelligence Artificielle (IA) est la capacité d'une machine à imiter l'intelligence humaine. 
            Elle permet aux ordinateurs d'apprendre, de raisonner, de résoudre des problèmes et de prendre des décisions.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-brand-mint/40 p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Apprentissage</h3>
              <p className="text-sm text-text-secondary">L'IA peut apprendre à partir de données et d'expériences</p>
            </div>
            <div className="bg-brand-mint/30 p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Adaptation</h3>
              <p className="text-sm text-text-secondary">Elle s'améliore avec le temps et s'adapte à de nouvelles situations</p>
            </div>
            <div className="bg-brand-mint/20 p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Autonomie</h3>
              <p className="text-sm text-text-secondary">Elle peut prendre des décisions sans intervention humaine constante</p>
            </div>
          </div>
        </div>

        {/* Concepts IA */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-6 animate-fade-in">
            📚 Concepts Clés
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_CONCEPTS.map((concept, index) => {
              const IconComponent = iconMap[concept.icon];
              
              return (
                <div
                  key={concept.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card
                    className="h-full cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedConcept(concept)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-brand-mint p-3 rounded-lg text-brand-slate shadow-card">
                        {IconComponent && <IconComponent className="w-6 h-6" />}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(concept.level)}`}>
                        {concept.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {concept.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-4 text-sm">
                      {concept.description}
                    </p>
                    
                    <div className="flex items-center text-brand-accent font-semibold text-sm">
                      En savoir plus
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ressources supplémentaires */}
        <div className="bg-white rounded-2xl shadow-card border-l-4 border-brand-mint p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">
            🎓 Ressources d'apprentissage
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-brand-grey rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-text-primary">Tutoriels interactifs</h3>
              <p className="text-sm text-text-secondary">
                Des guides pas à pas pour chaque module avec des exemples concrets
              </p>
            </div>
            <div className="bg-white border border-brand-grey rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-text-primary">Vidéos explicatives</h3>
              <p className="text-sm text-text-secondary">
                Des vidéos courtes qui expliquent les concepts complexes simplement
              </p>
            </div>
            <div className="bg-white border border-brand-grey rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-text-primary">Exercices pratiques</h3>
              <p className="text-sm text-text-secondary">
                Mets en pratique ce que tu as appris avec nos modules interactifs
              </p>
            </div>
            <div className="bg-white border border-brand-grey rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-text-primary">Quiz et évaluations</h3>
              <p className="text-sm text-text-secondary">
                Teste tes connaissances et suis ta progression (bientôt disponible)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détail du concept */}
      {selectedConcept && (
        <Modal
          isOpen={!!selectedConcept}
          onClose={() => setSelectedConcept(null)}
          title={selectedConcept.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(selectedConcept.level)}`}>
                Niveau: {selectedConcept.level}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Description
              </h3>
              <p className="text-text-secondary">
                {selectedConcept.content}
              </p>
            </div>

            <div className="bg-brand-mint/40 border-l-4 border-brand-mint p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">
                💡 En pratique
              </h4>
              <p className="text-sm text-text-secondary">
                Tu peux voir ce concept en action dans nos modules interactifs. 
                Essaie-les pour mieux comprendre !
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                🔗 Liens utiles
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-brand-accent hover:opacity-90 text-sm">
                    → Tutoriel vidéo sur {selectedConcept.title}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-brand-accent hover:opacity-90 text-sm">
                    → Exercices pratiques
                  </a>
                </li>
                <li>
                  <a href="#" className="text-brand-accent hover:opacity-90 text-sm">
                    → Ressources externes recommandées
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DocumentationPage;