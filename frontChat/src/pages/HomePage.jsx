import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, Image, FileText, BookOpen, Lightbulb, ArrowRight, PenTool, StickyNote } from 'lucide-react';
import { ROUTES } from '@constants/routes';
import { InteractiveCard } from '@components/common/Card';
import Button from '@components/common/Button';
import ProgressBar from '@components/common/ProgressBar';
import Badge from '@components/common/Badge';
import { useUserProgress } from '@context/UserProgressContext';
import KMeansPage from '@pages/KMeansPage';

const HomePage = () => {
  const navigate = useNavigate();
  const { progress } = useUserProgress();
  const completionAvg = Math.round(((progress.chatbotCompleted || 0) + (progress.imageRecognitionCompleted || 0) + (progress.textClassificationCompleted || 0)) / 3);

  const modules = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Chatbot Intelligent",
      description: "Discute avec une IA et découvre comment elle comprend tes questions",
      color: "from-blue-500 to-cyan-500",
      route: ROUTES.CHATBOT
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Clustering K-Means",
      description: "Visualise comment K-Means regroupe les données en clusters",
      color: "from-orange-500 to-yellow-500",
      route: ROUTES.KMeansPage
    },

    {
      icon: <Image className="w-8 h-8" />,
      title: "Reconnaissance d'Image",
      description: "Télécharge des images et vois comment l'IA les identifie",
      color: "from-purple-500 to-pink-500",
      route: ROUTES.IMAGE_RECOGNITION
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Classification de Texte",
      description: "Analyse des textes et comprends comment l'IA les classe",
      color: "from-green-500 to-teal-500",
      route: ROUTES.TEXT_CLASSIFICATION
    }
  ];

  const features = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Apprentissage Ludique",
      description: "Des exercices interactifs et amusants pour comprendre l'IA en s'amusant"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Documentation Claire",
      description: "Des explications simples et détaillées pour chaque concept"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Expérimentation",
      description: "Teste et modifie les paramètres pour voir l'impact en temps réel"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Suivi de Progression",
      description: "Sauvegarde tes expériences et observe tes progrès"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Student Notebook Theme */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* floating doodles and sticky notes */}
          <div className="absolute -top-6 left-8 rotate-[-6deg] bg-brand-mint/70 text-brand-slate px-3 py-2 rounded-lg shadow-card inline-flex items-center gap-2 animate-fade-in">
            <StickyNote className="w-4 h-4" />
            <span className="text-sm font-semibold">Study plan</span>
          </div>
          <div className="absolute top-10 right-10 rotate-[4deg] bg-white border border-brand-grey px-3 py-2 rounded-lg shadow-card inline-flex items-center gap-2 animate-fade-in" style={{animationDelay:'120ms'}}>
            <PenTool className="w-4 h-4 text-brand-slate" />
            <span className="text-sm text-text-secondary">Quick notes</span>
          </div>
          <div className="absolute bottom-4 left-10 rotate-[2deg] bg-white border-l-4 border-brand-mint px-4 py-3 rounded-lg shadow-card hidden md:block" style={{animationDelay:'220ms'}}>
            <p className="text-sm text-text-secondary">Tip: Small steps, steady progress.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-card mb-6 border border-brand-grey">
                <Sparkles className="w-5 h-5 text-brand-slate" />
                <span className="text-sm font-semibold text-text-secondary">Student-first learning platform</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 leading-tight">
                Learn Smarter. <span className="text-brand-slate">Understand Algorithms Clearly.</span>
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-xl">
                A calm, friendly notebook-inspired space to explore AI concepts through clear explanations and interactive visualizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(ROUTES.CHATBOT)}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Learning
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate(ROUTES.DOCUMENTATION)}
                >
                  Explore Docs
                </Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative h-72 md:h-96 animate-fade-in">
              <div className="absolute inset-0 bg-white rounded-2xl border border-brand-grey shadow-card" />
              {/* simple student silhouette */}
              <svg className="absolute inset-0 m-auto w-64 h-64 text-brand-slate/80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Student silhouette">
                <circle cx="100" cy="70" r="26" fill="#BBD5D0" />
                <rect x="60" y="108" width="80" height="60" rx="12" fill="#2F4F4F" opacity="0.15" />
                <path d="M60 130 C90 110, 110 110, 140 130" stroke="#2F4F4F" strokeWidth="2" opacity="0.3" />
                <rect x="40" y="150" width="120" height="10" rx="5" fill="#BBD5D0" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Progress / Gamification */}
      <section className="max-w-7xl mx-auto px-4 pb-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-card p-5 border border-brand-grey flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge>Streak: {progress.streak || 1} day{(progress.streak || 1) > 1 ? 's' : ''}</Badge>
          </div>
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-text-primary">Your overall progress</p>
              <span className="text-sm text-text-secondary">{isNaN(completionAvg) ? 0 : completionAvg}%</span>
            </div>
            <ProgressBar value={isNaN(completionAvg) ? 0 : completionAvg} />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Modules</h2>
          <p className="text-lg text-text-secondary">Choisis un module pour commencer ton apprentissage</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <InteractiveCard
                icon={module.icon}
                title={module.title}
                description={module.description}
                buttonText="Découvrir"
                onButtonClick={() => navigate(module.route)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 border-l-4 border-brand-mint animate-fade-in">
          <h3 className="text-3xl font-bold text-center text-text-primary mb-12">Pourquoi apprendre avec nous ?</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-brand-mint p-3 rounded-lg text-brand-slate">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 text-center border border-brand-grey">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Prêt à explorer l'IA ?</h3>
          <p className="text-xl mb-8 text-text-secondary">Commence dès maintenant ton aventure dans le monde de l'intelligence artificielle</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(ROUTES.CHATBOT)}
            icon={<Sparkles className="w-5 h-5" />}
          >
            Démarrer maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;