import React, { useState } from 'react';
import { Image as ImageIcon, Info, Eye, Cpu, Layers } from 'lucide-react';
import ImageUploader from '@components/modules/imageRecognition/ImageUploader';
import ResultDisplay from '@components/modules/imageRecognition/ResultDisplay';
import { useImageRecognition } from '@hooks/useImageRecognition';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import Notification from '@components/common/Notification';

const ImageRecognitionPage = () => {
  const {
    image,
    preview,
    results,
    loading,
    error,
    handleImageSelect,
    analyzeImage,
    reset
  } = useImageRecognition();

  const [showInfo, setShowInfo] = useState(false);

  const onImageSelect = (file) => {
    const success = handleImageSelect(file);
    if (!success && error) {
      // L'erreur sera affichée via le hook
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-mint p-3 rounded-xl shadow-card">
                <ImageIcon className="w-8 h-8 text-brand-slate" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                  Reconnaissance d'Image
                </h1>
                <p className="text-text-secondary mt-1">
                  Télécharge une image et découvre comment l'IA l'analyse
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowInfo(true)}
              icon={<Info className="w-5 h-5" />}
            >
              Comment ça marche ?
            </Button>
          </div>
        </div>

        {/* Notification d'erreur */}
        {error && (
          <div className="mb-6">
            <Notification type="error" message={error} />
          </div>
        )}

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Upload */}
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Sélectionne une image
              </h2>
              
              <ImageUploader
                onImageSelect={onImageSelect}
                preview={preview}
                onClear={reset}
              />

              {preview && !results && (
                <div className="mt-6">
                  <Button
                    variant="primary"
                    onClick={analyzeImage}
                    loading={loading}
                    className="w-full"
                  >
                    Analyser l'image
                  </Button>
                </div>
              )}

              {results && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="w-full"
                  >
                    Analyser une autre image
                  </Button>
                </div>
              )}
            </div>

            {/* Info rapide */}
            <div className="bg-brand-mint/40 border-l-4 border-brand-mint p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">
                💡 Astuce
              </h3>
              <p className="text-sm text-text-secondary">
                Pour de meilleurs résultats, utilise des images claires avec un sujet bien visible. 
                L'IA fonctionne mieux avec des photos bien éclairées et nettes.
              </p>
            </div>
          </div>

          {/* Colonne droite - Résultats */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            {loading && (
              <div className="bg-white rounded-xl shadow-card p-12 text-center border border-brand-grey">
                <div className="inline-block bg-brand-mint p-4 rounded-full mb-4">
                  <Eye className="w-12 h-12 text-brand-slate" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Analyse en cours...
                </h3>
                <p className="text-text-secondary">
                  L'IA examine ton image
                </p>
              </div>
            )}

            {!loading && !results && !preview && (
              <div className="bg-white rounded-xl shadow-card p-12 text-center border border-brand-grey">
                <ImageIcon className="w-16 h-16 text-text-secondary/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Aucune image sélectionnée
                </h3>
                <p className="text-text-secondary">
                  Télécharge une image pour commencer l'analyse
                </p>
              </div>
            )}

            {results && (
              <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
                <ResultDisplay results={results} />
              </div>
            )}
          </div>
        </div>

        {/* Cartes d'information en bas */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 animate-fade-in">
          <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-brand-mint p-2 rounded-lg text-brand-slate">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Vision par ordinateur</h3>
            </div>
            <p className="text-sm text-text-secondary">
              L'IA analyse les pixels de l'image pour identifier des patterns visuels et reconnaître des objets.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-brand-mint p-2 rounded-lg text-brand-slate">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Réseaux de neurones</h3>
            </div>
            <p className="text-sm text-text-secondary">
              Des réseaux convolutifs (CNN) entraînés sur des millions d'images permettent la reconnaissance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-brand-mint p-2 rounded-lg text-brand-slate">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Couches de traitement</h3>
            </div>
            <p className="text-sm text-text-secondary">
              Chaque couche du réseau détecte des caractéristiques de plus en plus complexes de l'image.
            </p>
          </div>
        </div>
      </div>

      {/* Modal d'information */}
      <Modal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Comment fonctionne la reconnaissance d'image ?"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              👁️ Vision par ordinateur
            </h3>
            <p className="text-text-secondary">
              La vision par ordinateur permet aux machines de "voir" et d'interpréter des images comme le ferait un humain. 
              L'IA analyse les pixels, détecte des formes, des couleurs et des textures pour identifier les objets.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              🔄 Processus d'analyse
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li>L'image est convertie en données numériques (pixels)</li>
              <li>Le réseau de neurones analyse l'image couche par couche</li>
              <li>Chaque couche détecte des caractéristiques (contours, formes, objets)</li>
              <li>L'IA compare avec ce qu'elle a appris pour faire une prédiction</li>
              <li>Un score de confiance est calculé pour chaque prédiction</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              🧠 Réseaux de Neurones Convolutifs (CNN)
            </h3>
            <p className="text-text-secondary mb-2">
              Les CNN sont spécialement conçus pour traiter des images. Ils utilisent :
            </p>
            <ul className="space-y-1 text-text-secondary ml-4">
              <li>• <strong>Convolution</strong> : Détecte les caractéristiques locales</li>
              <li>• <strong>Pooling</strong> : Réduit la taille tout en gardant l'information importante</li>
              <li>• <strong>Couches fully-connected</strong> : Prend la décision finale</li>
            </ul>
          </div>

          <div className="bg-brand-mint/40 p-4 rounded-lg">
            <p className="text-sm text-text-secondary">
              <strong>Note :</strong> Les modèles de reconnaissance d'image sont entraînés sur des millions d'images 
              pour apprendre à reconnaître des milliers de catégories d'objets différents.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageRecognitionPage;