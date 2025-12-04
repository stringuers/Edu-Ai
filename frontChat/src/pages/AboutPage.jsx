import React from 'react';
import { Sparkles, Target, Users, Rocket, Heart, Github, Mail } from 'lucide-react';
import { GradientCard } from '@components/common/Card';

const AboutPage = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Notre Mission",
      description: "Rendre l'apprentissage de l'IA accessible, ludique et interactif pour tous les jeunes"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Pour qui ?",
      description: "Collégiens, lycéens et étudiants curieux de découvrir l'intelligence artificielle"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Notre Approche",
      description: "Apprentissage par la pratique avec des modules interactifs et des explications simples"
    }
  ];

  const team = [
    {
      name: "Équipe Pédagogique",
      role: "Conception des contenus",
      description: "Experts en IA et pédagogie"
    },
    {
      name: "Équipe Technique",
      role: "Développement de la plateforme",
      description: "Ingénieurs et développeurs"
    },
    {
      name: "Équipe Design",
      role: "Expérience utilisateur",
      description: "Designers UX/UI"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-3 bg-white px-6 py-3 rounded-full shadow-card mb-6 border border-brand-grey">
            <Sparkles className="w-6 h-6 text-brand-slate" />
            <span className="text-lg font-bold text-text-primary">IA Jeunes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">À propos de notre plateforme</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">Une initiative du défi national pour démocratiser l'enseignement de l'intelligence artificielle auprès des jeunes de manière ludique et accessible.</p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-card p-8 text-center border-l-4 border-brand-mint">
              <div className="bg-brand-mint w-16 h-16 rounded-full flex items-center justify-center text-brand-slate mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Histoire du projet */}
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 mb-16 animate-fade-in border-l-4 border-brand-mint">
          <h2 className="text-3xl font-bold text-text-primary mb-6 text-center">
            Notre Histoire
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-text-secondary text-lg">
              <strong className="text-text-primary">IA Jeunes</strong> est née d'un constat simple : 
              l'intelligence artificielle transforme notre monde, mais reste encore trop peu accessible 
              aux jeunes qui souhaitent la comprendre.
            </p>
            
            <p className="text-text-secondary text-lg">
              Dans le cadre du <strong className="text-text-primary">Défi National d'Éducation à l'IA</strong>, 
              nous avons créé cette plateforme pour permettre aux collégiens, lycéens et jeunes étudiants 
              de découvrir l'IA à travers l'expérimentation pratique.
            </p>
            
            <p className="text-text-secondary text-lg">
              Notre approche pédagogique privilégie l'<strong className="text-text-primary">apprentissage par la pratique</strong> : 
              plutôt que de longs cours théoriques, nous proposons des modules interactifs où chacun peut 
              expérimenter directement avec des technologies d'IA réelles.
            </p>
          </div>
        </div>

        {/* L'équipe */}
        <div className="mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            L'Équipe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-card p-8 text-center border-l-4 border-brand-mint">
                <div className="bg-brand-mint w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-slate">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{member.name}</h3>
                <p className="text-text-secondary font-medium mb-2">{member.role}</p>
                <p className="text-text-secondary text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies utilisées */}
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 mb-16 animate-fade-in border-l-4 border-brand-mint">
          <h2 className="text-3xl font-bold mb-6 text-center text-text-primary">
            Technologies Utilisées
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-brand-grey rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-text-primary">Frontend</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• React 18 - Framework JavaScript</li>
                <li>• Tailwind CSS - Styling moderne</li>
                <li>• Vite - Build tool rapide</li>
                <li>• React Router - Navigation</li>
              </ul>
            </div>
            
            <div className="bg-white border border-brand-grey rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-text-primary">Backend & IA</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Python / FastAPI - API Backend</li>
                <li>• TensorFlow / PyTorch - Modèles IA</li>
                <li>• Hugging Face - NLP</li>
                <li>• OpenAI / Claude API - Chatbot</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Contribution */}
        <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
          <div className="bg-white rounded-xl shadow-card p-8 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-brand-mint p-3 rounded-lg text-brand-slate">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Contact</h3>
            </div>
            <p className="text-text-secondary mb-4">
              Tu as des questions ou des suggestions ? N'hésite pas à nous contacter !
            </p>
            <a
              href="mailto:contact@iajeunes.tn"
              className="inline-flex items-center text-brand-accent hover:opacity-90 font-semibold"
            >
              contact@iajeunes.tn
              <Mail className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-card p-8 border-l-4 border-brand-mint">
            <div className="flex items-center space-x-3 mb-4">
                <div className="bg-brand-mint p-3 rounded-lg text-brand-slate">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Open Source</h3>
            </div>
            <p className="text-text-secondary mb-4">
              Ce projet est open source ! Contribue au développement sur GitHub.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand-accent hover:opacity-90 font-semibold"
            >
              Voir sur GitHub
              <Github className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 text-text-secondary">
            <span>Fait avec</span>
            <Heart className="w-5 h-5 text-red-500" />
            <span>pour les jeunes passionnés de technologie</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;