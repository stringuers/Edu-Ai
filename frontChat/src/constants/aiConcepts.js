export const AI_CONCEPTS = [
  {
    id: 'machine-learning',
    title: 'Apprentissage Automatique',
    description: 'Comment les machines apprennent à partir de données',
    level: 'débutant',
    icon: 'Brain',
    content: `L'apprentissage automatique permet aux ordinateurs d'apprendre sans être explicitement programmés. Ils trouvent des patterns dans les données et améliorent leurs performances avec l'expérience.`
  },
  {
    id: 'neural-networks',
    title: 'Réseaux de Neurones',
    description: 'Des systèmes inspirés du cerveau humain',
    level: 'intermédiaire',
    icon: 'Network',
    content: `Les réseaux de neurones artificiels sont inspirés du fonctionnement du cerveau. Ils sont composés de couches de neurones interconnectés qui traitent l'information.`
  },
  {
    id: 'nlp',
    title: 'Traitement du Langage Naturel',
    description: 'Comment l\'IA comprend le langage humain',
    level: 'débutant',
    icon: 'MessageCircle',
    content: `Le NLP permet aux machines de comprendre, interpréter et générer du langage humain. C'est ce qui permet aux chatbots de converser avec nous.`
  },
  {
    id: 'computer-vision',
    title: 'Vision par Ordinateur',
    description: 'Donner la vue aux machines',
    level: 'intermédiaire',
    icon: 'Eye',
    content: `La vision par ordinateur permet aux machines de "voir" et d'interpréter des images et vidéos, comme reconnaître des objets ou des visages.`
  },
  {
    id: 'classification',
    title: 'Classification',
    description: 'Catégoriser automatiquement des données',
    level: 'débutant',
    icon: 'FolderTree',
    content: `La classification consiste à entraîner un modèle à assigner des catégories à des données. Par exemple, classifier des emails comme spam ou non-spam.`
  }
];

export const TUTORIALS = [
  {
    id: 'chatbot-intro',
    title: 'Introduction aux Chatbots',
    module: 'chatbot',
    duration: '10 min',
    steps: [
      {
        title: 'Qu\'est-ce qu\'un chatbot?',
        content: 'Un chatbot est un programme qui peut converser avec toi comme un humain.'
      },
      {
        title: 'Comment ça fonctionne?',
        content: 'Le chatbot analyse ton message, comprend l\'intention et génère une réponse appropriée.'
      },
      {
        title: 'À toi d\'essayer!',
        content: 'Pose-lui des questions et observe comment il répond.'
      }
    ]
  },
  {
    id: 'image-recognition-intro',
    title: 'Reconnaissance d\'Images',
    module: 'image',
    duration: '15 min',
    steps: [
      {
        title: 'La vision par ordinateur',
        content: 'Les machines peuvent apprendre à reconnaître ce qu\'il y a dans une image.'
      },
      {
        title: 'Upload une image',
        content: 'Télécharge une photo et vois comment l\'IA l\'analyse.'
      },
      {
        title: 'Comprendre les résultats',
        content: 'L\'IA te donne ses prédictions avec un niveau de confiance.'
      }
    ]
  }
];