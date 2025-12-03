import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Mail, Heart } from 'lucide-react';
import { ROUTES } from '@constants/routes';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">IA Jeunes</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Une plateforme pédagogique pour découvrir l'intelligence artificielle 
              de manière ludique et interactive. Conçue pour les jeunes curieux de technologie.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@iajeunes.tn"
                className="text-gray-400 hover:text-white transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES.HOME}
                  className="text-gray-400 hover:text-white transition"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.DOCUMENTATION}
                  className="text-gray-400 hover:text-white transition"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.EXPERIMENTATION}
                  className="text-gray-400 hover:text-white transition"
                >
                  Mes Projets
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.ABOUT}
                  className="text-gray-400 hover:text-white transition"
                >
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Modules IA</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES.CHATBOT}
                  className="text-gray-400 hover:text-white transition"
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.IMAGE_RECOGNITION}
                  className="text-gray-400 hover:text-white transition"
                >
                  Reconnaissance d'Image
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.TEXT_CLASSIFICATION}
                  className="text-gray-400 hover:text-white transition"
                >
                  Classification de Texte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            © {currentYear} IA Jeunes - Défi National d'Éducation à l'IA
          </p>
          <p className="text-gray-500 text-sm mt-2 flex items-center justify-center">
            Fait avec <Heart className="w-4 h-4 mx-1 text-red-500" /> pour les jeunes passionnés de technologie
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;