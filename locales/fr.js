// French translation for public site

import { paradeYear } from "../components/untilLib/ParadeYear";

export default {
  nav: {
    home: "Accueil",
    information: "Information",
    group: "Groupe/Bénévole",
    history: "Histoire",
    contact: "Contactez-Nous",
    signIn: "Se Connecter",
    dashboard: "Tableau de bord"
  },
  hero: {
    title: "Défilé de la Fête du Canada à Montréal",
    subtitle: "Pour le peuple, pas pour le profit",
    btn: "Faire Un Don",
  },
  aboutEvent: {
    title1: "À propos de ",
    title2: "Défilé de la Fête du Canada à Montréal ",
    title3: " Événement",
    options: [
      {
        title: "Familial",
        description:
          "Amenez toute votre famille pour célébrer l’anniversaire de notre pays incroyable!",
      },
      {
        title: "Multiculturel",
        description:
          "La diversité de notre pays est l’une de ses forces principales, venez voir les couleurs du monde",
      },
      {
        title: "Activités Gratuites",
        description: "Activités et spectacles gratuits pour toute la famille",
      },
    ],
  },
  footer: {
    title: "Nous avons hâte de vous voir",
    followText: "Suivez-Nous pour plus d’informations",
    date: "1er juillet ",
    copyright: `Copyright © ${new Date().getFullYear()} Défilé de la Fête du Canada à Montréal`,
  },
  // INFORMATION PAGE CONTENT STARTS HERE
  information: {
    title: "Information",
    subtitle: "Route ",
    subtitle2: " du Défilé de la Fête du Canada à Montréal",
    section1: {
      title: "Comment s’y rendre?",
      options: [
        "La STM est le moyen le plus efficace pour se rendre au centre-ville de Montréal. Descendez aux stations Peel ou Guy-Concordia sur la ligne verte OU la station Bonaventure sur la ligne orange.",
        `1er Juillet ${paradeYear()} 11:00, Départ à Ste Catherine O. et du Fort and arrivée à la Place du Canada`,
      ],
    },
    section2: {
      title: "Activités",
      options: [
        "Entre 13:30 et 15:30, il y aura des événements culturels à la Place du Canada et un énorme gâteau mesurant 1.22 mètres par 2.44 mètres (4’ par 8’) sera servi. Il devrait nourrir 2500 personnes.",
        "Peinture de visages et caricatures pour les enfants sur place",
        "Dansez Avec Les Baguettes de la Fête du Canada",
      ],
    },
    downloadSection: {
      title: "Fermetures Des Routes",
      subtitle: `Veuillez cliquer ci-dessous pour voir les fermetures des routes pour le défilé ${paradeYear()}`,
      file: "Fête du Canada Fermetures des Routes pdf",
      btn: "Télécharger",
    },
  },
  // GROUP PAGE CONTENT STARTS HERE
  group: {
    title: "Bénévoles & Groupes",
    subtitle: "Une opportunité spéciale vous attend",
    section1: {
      title:
        "Êtes-vous intéressé à renforcer vos compétences en leadership, à construire de nouvelles Amitiés ou simplement à vous amuser tout en servant votre communauté et votre pays?",
      subtitle:
        "Nous visons à intégrer “vos” besoins pour aider à faire du défilé un succès",
    },
    section2: {
      title: "Opportunités pour Bénévoles",
      options: [
        "Distribution au public de petits drapeaux et d’épinglettes",
        "Aide au Parc et à la Route du Défilé",
        "Contrôleur de Ligne du Défilé",
      ],
      text: "Aider le “Contrôleur de Ligne du Défilé Surveillant”... à s’assurer que le défilé avance à un rythme efficace et à éviter des écarts entre les participants du défilé",
      note: "Il y a 2 Contrôleurs de Ligne du Défilé par section et une séance d’entraînement est offerte chaque mois de juin",
      btn: "S’inscrire en tant que bénévole",
    },
    section3: {
      title: "Participer au défilé en tant que groupe",
      options: [
        "Un groupe peut se composer de marcheurs, de voitures ou de camions (longueur maximale de 29 pieds) dans le défilé",
        "Présentez votre culture traditionnelle par la musique, les vêtements, la danse, le rire et vos drapeaux canadiens.",
        "Si vous souhaitez participer au défilé pour célébrer la Fête du Canada avec nous, cliquez sur le bouton ci-dessous pour vous inscrire.",
      ],
      btn: "Inscrire votre Groupe",
    },
  },
  // HISTORY PAGE CONTENT STARTS HERE
  history: {
    title: "Histoire",
    subtitle: "L’histoire de la Fête du Canada à Montréal",
    text: "La Fête du Canada à Montréal est née le 1er Juillet 1977. Le fondateur, cardiologue Docteur Roopnarine Singh, avec l’aide de personnes dédiées et de la participation du public généreux, a contribué à l’évolution de ce magnifique défilé. L’expansion constante du défilé se poursuit grâce à l’enthousiasme et à la fierté inlassables de nombreuses communautés et d’organisations ethniques dans et autour de la région de Montréal.",
  },
  // CONTACT PAGE CONTENT STARTS HERE
  contact: {
    title: "Contactez-Nous",
    subtitle: "Pour toute question supplémentaire, contactez-nous",
    form: {
      heading: "Veuillez remplir le formulaire pour soumettre votre question",
      name: "Nom & Prénom",
      email: "Courriel",
      message: "Message",
      btn: "Envoyer",
    },
    options: [
      {
        title: "Partenaire",
        description:
          "Souhaitez-vous offrir vos services au public en devenant un partenaire? Contactez l’Organisateur Principal, Nicholas Cowen. ",
      },
      {
        title: "Presse",
        description:
          "Faites-vous partie de la presse et souhaitez-vous recevoir plus d’informations concernant l’événement? Contactez la directrice générale, Caroline Polcsak. ",
      },
    ],
  },
  //Donate Page Content Starts Here

  donate: {
    title: "Faire un don",
    subtitle: "Dons du défilé",
    form: {
      title1: "Faire un don pour le défilé de la ",
      title2: "Fête du Canada ",
      title3: "à Montréal",
      subtitle:
        "Parlez-nous de vous, êtes-vous une entreprise ou un particulier?",
      company: "Entreprise",
      individual: "Personne Individuelle",
      companyNote:
        "Si vous faites un don de 100 $ ou plus, vous pouvez télécharger le logo de votre entreprise pour qu'il apparaisse dans la section des sponsors",
      name: "Nom sur la carte",
      company: "Nom de l'entreprise",
      email: "Courriel",
      address: "Adresse",
      city: "Ville",
      // province needs to be added
      province: "Province/État",
      // Province was added
      zip: "Code Postal",
      anon: "Rendre le don anonyme?",
      custom: "Autre",
      cardInformation: "Information de la carte",
      cardNumber: "Numéro de la carte",
      btn: "Faire un don",
    },
  },
  // Thank you page content starts here

  thankYou: {
    title: "Merci",
    form: {
      title: "Don fait avec succès",
      subtitle: "Télécharger votre logo d’entreprise",
      dimensions: "Dimension",
      btn: "Sauvegarder",
      //upload btn and save btn in thank you page
      uploadBtn: "Télécharger",
      skipBtn: "Sauter",
    },
  },
  state: {
    title: "Etat / Province",
  },
  //message shown when email has sent
  thankYouContact: {
    title: "Votre Email a été envoyé.",
  },
};
