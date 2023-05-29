/* eslint-disable import/no-anonymous-default-export */
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
    dashboard: "Tableau de bord",
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

  // login page
  login: {
    loginText: "Se Connecter",
    emailText: "Courriel",
    passwordText: "Mot de Passe",
    signInText: "Se Connecter",
    loadingText: "En Cours de Chargement",
  },

  signupModal: {
    volunteerSignupTitle: "S’inscrire comme Bénévole",
    groupSignupTitle: "S’inscrire comme Groupe",
    contact1: "Contact 1",
    contact2: "Contact 2",
    form: {
      groupName: "Nom du Groupe",
      firstName: "Prénom",
      lastName: "Nom de Famille",
      phoneNumber: "Téléphone",
      email: "Courriel",
      password: "Mot de Passe",
      confirmPassword: "Confirmer Mot de Passe",
      role: "Rôle",
      countryRepresentation: "Pays de Représentation",
    },
    countryRepresentative: "Représentant de Pays",
    loading: "En Cours de Chargement",
    register: "S’inscrire",
  },
  // for admin dashboard
  adminDashboard: {
    // sidebar
    sidebar: [
      {
        text: "Courriel",
      },
      {
        text: "Système de Talkie-walkie",
      },
      {
        text: "Demandes Reçues",
      },
      {
        text: "Liste de Groupes",
      },
      {
        text: "Liste de Bénévoles",
      },
    ],
    // email section
    emailSection: {
      createEmailButtonText: "Créer un courriel",
      backButtonText: "Retour",
      goButtonText: "Aller",
      creatingMailText1: "Je veux envoyer un",
      creatingMailText2: "courriel à",
      individual: "Individuel",
      mass: "Masse",
      sentEmailText: "Courriels Envoyés",
      receivedEmailText: "Courriels Reçus",
      individualOptions: {
        individualOption1: "À quelqu’un ne figurant sur aucune liste actuelle",
        individualOption2: "Un groupe spécifique",
        individualOption3: "Un volontaire spécifique",
      },
      massOptions: {
        massOption1: "Tout le monde sur la liste du groupe",
        massOption2: "Tout le monde sur la liste des bénévoles",
        massOption3: "Groupes inscrits présents au défilé de cette année",
        massOption4: "Bénévoles inscrits présents au défilé de cette année",
      },
    },
    // walkie talkie
    walkieTalkie: {
      sidebarText: "Système de Talkie-walkie",
      usersText: "Utilisateurs",
      walkieTalkieText: "Talkie-walkie",
      containerInactiveButtonText: "Appuyer / Maintenir pour parler",
      containerActiveButtonText: "Parle",
      membersText: "Membres",
      statusText: "Statut",
    },
    // received applications
    receivedApplications: {
      headerText: "Demandes",
      applicationFilterText1: "Je veux voir les demandes de groupes pour",
      applicationFilterText2: "qui sont",
      applicationFilterOptions: {
        applicationFilterOption1: "à être accepté",
        applicationFilterOption2: "Accepté",
      },
    },
    // group list
    groupList: {
      headerText: "Liste de Groupes",
      addGroupText: "Ajouter un Groupe",
    },
    // volunteers list
    volunteersList: {
      headerText: "Liste de Bénévoles",
      addVolunteerText: "Ajouter un Bénévole",
    },
    // search bar
    searchBar: {
      searchButtonText: "Rechercher",
      groupPlaceholderText:
        "Rechercher par nom du groupe, nom de la personne, courriel, téléphone",
      volunteerPlaceholderText:
        "Rechercher par nom du bénévole, courriel, téléphone",
      receivedApplicationsPlaceholderText:
        "Rechercher par demandes acceptées, rejetées, ou besoin d’approbation",
    },
    // table header texts
    tableHeader: {
      personHeaderText: "Personne",
      groupNameHeaderText: "Nom du Groupe",
      emailHeaderText: "Courriel",
      countryHeaderText: "Pays",
      titleHeaderText: "Titre",
      statusHeaderText: "Statut",
      volunteerNameHeaderText: "Nom du Bénévole",
      phoneHeaderText: "Téléphone",
    },
  },
  // logout text
  logoutText: "Se Déconnecter",
  // for group president dashboard
  groupPresidentDashboard: {
    sidebar: [{ text: "Tableau de Bord" }, { text: "Paramètres Utilisateur" }],
    dashboard: {
      previousApplicationsText: "Demandes Précédantes",
      filterText: "Je veux voir les demandes de groupes pour",
      goButtonText: "Aller",
      contactInformationText: "Coordonnées",
      contactSecretaryButtonText: "Contacter le Secrétariat",
      applicationStatusText: "Statut de la Demande",
      currentApplicationStatusText: "Statut de la Demande Actuelle",
      secretaryDetailsText: "Coordonnées du Secrétariat",
    },
    noApplicationFoundText: "Aucune Demande Trouvée pour cette année.",
    userSettings: {
      primaryContactHeaderText: "Premier Contact",
      secondaryContactHeaderText: "Contact Secondaire",
      button1Text: "Modifier Vos Informations",
      button2Text: "Rendre le contact secondaire le premier",
      button3Text: "Supprimer Votre Compte",
    },
  },
  // delete modal
  deleteModal: {
    text: "Êtes-vous sûrs de vouloir supprimer",
    boldText: "TOUT",
    selectedText: "sélectionné",
    deletingText: "En train de supprimer…",
    noButtonText: "Non",
    yesButtonText: "Oui",
  },
  // read mail modal
  readMailModal: {
    headerText: "Lire le Message",
    subjectText: "Sujet",
    forwardText: "Transmettre",
    replyText: "Répondre",
    deleteText: "Supprimer",
  },
  // send mail modal
  sendMailModal: {
    newMessageText: "Nouveau Message",
    replyText: "Répondre",
    forwardText: "Transmettre",
    subjectText: "Sujet",
    toText: "À",
    attachFileText: "Attacher un Fichier",
    sendText: "Envoyer",
    sendingText: "En cours d’envoi…",
    errorText: "Erreur",
  },
  // read group application modal
  readApplicationModal: {
    headerText: "Formulaire de Demande Reçu",
    organizationNameText: "Nom de l’Organisation",
    groupPresidentText: "Président du Groupe",
    emailText: "Courriel",
    phoneText: "Téléphone",
    representCountryText: "Représenter n’importe quel pays",
    whichCountryText: "Quel Pays",
    question1: " Votre groupe aura-t-il des marcheurs?",
    question1A: "Combien de personnes marcheront dans votre groupe?",
    question2: "Amènerez-vous des voitures?",
    question2A:
      "Combien de voitures (Toute voiture doit être décorée et toute voiture non décorée sera retirée du défilé)?",
    question3: "Amènerez-vous des VUS?",
    question3A: "Combien de VUS?",
    question4: "Amènerez-vous des Pick-up?",
    question4A: "Combien?",
    question4B: "Quelle marque / modèle?",
    question5:
      "Amènerez-vous des remorques attachées à votre VUS, Voiture ou Pick-up?",
    question5A: `Quelle est la longueur totale en pieds de l’avant de la voiture à l’extrémité de la remorques (Arrondir au pied le plus proche, Veuillez noter que nous avons une limite maximale de 28 pieds)?`,
    question6: "Amènerez-vous des flotteurs?",
    question6A:
      "Quelle est la longueur du flotteur en pieds (limite maximale de la longueur de 28 pieds)?",
    question6B: "Avez-vous un extincteur dans le flotteur (obligatoire)?",
    question7: "Amènerez-vous des animaux?",
    question7A: "Amènerez-vous des chevaux?",
    question7A1:
      "Vous devrez fournir un certificat d’assurance au défilé Sont-ils assurés?",
    question7A2: "Combien allez-vous en amener?",
    question7B: "Amènerez-vous des chiens?",
    question7B1: "Combien de chiens?",
    question7C: "Amènerez-vous d’autres animaux?",
    question7C1: "Indiquer le nombre et l’espèce?",
    rejectText: "Rejeter",
    cancelText: "Annuler",
    editText: "Modifier",
    acceptText: "Accepter",
    saveText: "Sauvegarder",
  },
  // edit group application modal
  // used same for edit volunteer
  editGroupModal: {
    // for group
    headerText: "Modifier Groupe",
    selectContactText: "Veuillez sélectionner le premier contact",
    contact1Text: "Contact 1",
    contact2Text: "Contact 2",
    changeText: "changer",
    cancelText: "annuler",
    resetPasswordText: "Modifier le Mot de Passe",
    representingCountryText: "Représentez-vous un pays?",
    saveText: "Sauvegarder",
    savingText: "En cours de sauvegarde…",
    // for volunteer
    volunteerHeaderText: "Modifier le Bénévole",
  },
  // change volunteer info modal
  changeVolunteerInformationModal: {
    headerText: "Modifier l’Information",
    changeText: "modifier",
    cancelText: "annuler",
    resetPasswordText: "Modifier le Mot de Passe",
    saveText: "Sauvegarder",
    savingText: "En cours de sauvegarde…",
  },
  // delete volunteer modal
  deleteVolunteerModal: {
    text: " Veuillez contacter votre secrétariat pour supprimer votre compte",
  },
  // vip page
  vipInvite: {
    montrealParadeText: "Défilé de la Fête du Canada 2023",
    vipInviteText: "Invitation VIP",
    vipForm: {
      vipNameText: "Nom du VIP",
      phoneText: "Numéro de Téléphone",
      emailText: "Courriel",
      organizationNameText: "Nom de l’Organisation",
      roleInOrganizationText: "Votre Rôle dans l’Organisation",
      bringSomeoneText: "Souhaitez-vous emmener quelqu’un d’autre avec vous?",
      submitText: "Soumettre",
      mailSentText: "Demande VIP Envoyée",
    },
  },
  // volunteer position modal
  volunteerPositionModal: {
    headerText:
      "Veuillez sélectionner la/les position(s) que vous souhaiteriez?",
    positions: [
      "Contrôleur de ligne sénior",
      "Contrôleur de ligne junior",
      "Bénévole route du défilé",
      "Bénévole de l’espace gâteau",
      "Bénévole de l’espace eau",
      "Bénévole général",
      "Bénévole scène VIP",
    ],
    mailSentText:
      "Bienvenu au défilé de cette année. Vous serez contactés bientôt.",
    cancelText: "Annuler",
    applyText: "Postuler",
  },

  // add volunteer modal
  addVolunteer: {
    addVolunteerText: "Ajouter un bénévole",
    firstNameText: "Prénom",
    lastNameText: "Nom de Famille",
    emailText: "Courriel",
    phoneNumberText: "Téléphone",
    addingText: "Ajouter...",
    addText: "Ajouter",
  },

  // change contact modal
  changeContactModal: {
    headerText1: "Voulez-vous vraiment définir le numéro de",
    headerText2: "Contact 2 comme contact principal?",
    personText: "Personne",
    emailText: "Courriel",
    phoneText: "Téléphone",
    yesText: "Yes",
    noText: "No",
  },
};
