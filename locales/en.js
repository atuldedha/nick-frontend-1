/* eslint-disable import/no-anonymous-default-export */
import { paradeYear } from "../components/untilLib/ParadeYear";
export default {
  nav: {
    home: "Home",
    information: "Information",
    group: "Group/Volunteer",
    history: "History",
    contact: "Contact Us",
    signIn: "Sign In",
    dashboard: "Dashboard",
  },
  hero: {
    title: "Montreal Canada Day Parade",
    subtitle: "For the people, not for profit",
    btn: "Donate Now",
  },
  aboutEvent: {
    title1: "About the ",
    title2: "Montreal Canada Day Parade ",
    title3: " Event",
    options: [
      {
        title: "Family Friendly",
        description:
          "Bring your whole family to celebrate our great country's birthday!",
      },
      {
        title: "Multicultural",
        description:
          "Our country’s diversity is one of its main strength, come see the world colors",
      },
      {
        title: "Free Activities",
        description: "Free activities and shows for whole family",
      },
    ],
  },
  footer: {
    title: "We look forward to see you all",
    followText: "Follow Us for more updates",
    date: "July 1st ",
    copyright: `Copyright © ${new Date().getFullYear()} Montreal Canada Day Parade - All rights reserved`,
  },
  // INFORMATION PAGE CONTENT STARTS HERE
  information: {
    title: "Information",
    subtitle: "Montreal Canada Day Parade ",
    subtitle2: " Route",
    section1: {
      title: "How to get there ?",
      options: [
        "The STM is the most effective way to get to the downtown core of Montreal. Get off at the Peel or Guy-Concordia stations on the Green Line OR the Bonaventure station on the Orange Line.",
        `July 1st ${paradeYear()}  11:00AM, Starting at St.Catherine O. and du Fort and finishes at Place Du Canada`,
      ],
    },
    section2: {
      title: "Activities",
      options: [
        "Between 1:30PM and 3:30PM , there are cultural events in Place du Canada and a huge cake measuring 1.22 metres by 2.44 metres (4' by 8' ) is served. It is expected to feed 2,500 people",
        "Face painting and charicatures for kids on site",
        "Dance With Canada Day Ribbon Wands.",
      ],
    },
    downloadSection: {
      title: "Road Closures",
      subtitle: `Please click below to see the road closures for the ${paradeYear()} parade`,
      file: "Canada Day Street close pdf",
      btn: "Download",
    },
  },
  // GROUP PAGE CONTENT STARTS HERE
  group: {
    title: "Volunteers & Groups",
    subtitle: "A special opportunity awaits you",
    section1: {
      title:
        "Are you interested in strengthening your leadership skills, building new Friendships or simply having fun while serving your community and country?",
      subtitle:
        "We aim to incorporate “your” needs to help make the parade a success",
    },
    section2: {
      title: "Opportunities for Volunteers",
      options: [
        "Distribution of small flags and pins to public",
        "Park and Route helper",
        "Parade Line-Controller",
      ],
      text: "To assist the “Supervising Parade Line Controller”... to ensure that the parade moves at a good pace and helps avoid gaps between entries.",
      note: "There are 2 Parade Line Controllers per section and a training session is given each June",
      btn: "Register as Volunteer",
    },
    section3: {
      title: "Participate in the parade as a group",
      options: [
        "A group can consit of walkers, cars or trucks (maximum length of 28 ft) in the parade",
        "Showcase your traditional culture by music, dress, dance, laughter and your Canadian flags.",
        "If you would like to participate in the parade to celebrate Canada Day with all of us, click the button below to register.",
      ],
      btn: "Register your group",
    },
  },
  // HISTORY PAGE CONTENT STARTS HERE
  history: {
    title: "History",
    subtitle: "The history of Montreal’s Canada Day Parade",
    text: "The Canada Day Parade in Montreal was born on July 1st , 1977. The founder, cardiologist Dr. Roopnarine Singh, with the help of dedicated people and the participation of the generous public, contributed to the growth of this beautiful parade. The constant expansion of the parade continues thanks to the tireless enthusiasm and pride of many ethnic communities and organizations in and around the Montreal area.",
  },
  // CONTACT PAGE CONTENT STARTS HERE
  contact: {
    title: "Contact",
    subtitle: "If need more info Contact Us",
    form: {
      heading: "For detailed Information Fill out the form",
      name: "Full Name",
      email: "Email",
      message: "Message",
      btn: "Submit",
    },
    options: [
      {
        title: "Partner",
        description:
          "You would like to become a partner? Contact the Main Organizer, Nicholas Cowen, by ",
      },
      {
        title: "Press",
        description:
          "Are you part of the press and want additional information about the event? Contact managing director, Caroline Polcsak, by ",
      },
    ],
  },
  // DONATE PAGE CONTENT STARTS HERE
  donate: {
    title: "Donate",
    subtitle: "Parade Donations",
    form: {
      title1: "Donate for the Montreal ",
      title2: "Canada Day ",
      title3: "Parade",
      subtitle: "Tell us about yourself, are you a business or an individual?",
      company: "Company",
      individual: "Individual",
      companyNote:
        "If you donate 100$ or more, then you can upload your company logo to be shown in sponsors section",
      name: "Name on Card",
      company: "Company Name",
      email: "Email",
      address: "Address",
      city: "City",
      // Province needs to be added
      province: "Province/State",
      // Province was added
      zip: "Zip Code",
      anon: "Make the donation anonymous?",
      custom: "Other",
      cardInformation: "Card Information",
      cardNumber: "Card Number",
      btn: "Donate",
    },
  },
  // Thank you page content starts here
  thankYou: {
    title: "Thank You",
    form: {
      title: "Donation done successfully",
      subtitle: "Upload your company logo",
      dimensions: "Dimension",
      btn: "Save",
      //upload btn and save btn in thank you page
      uploadBtn: "Upload",
      skipBtn: "Skip",
    },
  },
  state: {
    title: "State / Province",
  },
  //message shown when email has sent
  thankYouContact: {
    title:
      "Thank you, your inquiry has been sent and will be responded to shortly",
  },

  login: {
    loginText: "Login",
    emailText: "Email",
    passwordText: "Password",
    signInText: "Sign In",
    loadingText: "Loading...",
  },

  //signup modals
  signupModal: {
    volunteerSignupTitle: "Register as Volunteer",
    groupSignupTitle: "Register as Group",
    contact1: "Contact 1",
    contact2: "Contact 2",
    form: {
      groupName: "Name of the Group",
      firstName: "First Name",
      lastName: "lastName",
      phoneNumber: "Phone",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      role: "Role",
      countryRepresentation: "Country Representation",
    },
    countryRepresentative: "Country Representative",
    loading: "Loading",
    register: "Register",
  },

  // for admin dashboard
  adminDashboard: {
    // sidebar
    sidebar: [
      {
        text: "Email",
      },
      {
        text: "Walkie Talkie System",
      },
      {
        text: "Received Applications",
      },
      {
        text: "Group List",
      },
      {
        text: "Volunteers List",
      },
    ],
    // email section
    emailSection: {
      createEmailButtonText: "Create Email",
      backButtonText: "Back",
      goButtonText: "Go",
      creatingMailText1: "I wan to send a",
      creatingMailText2: "email to",
      individual: "Individual",
      mass: "Mass",
      sentEmailText: "Sent Emails",
      receivedEmailText: "Received Emails",
      individualOptions: {
        individualOption1: "To someone not on any current list",
        individualOption2: "A specific group",
        individualOption3: "A specific volunteer",
      },
      massOptions: {
        massOption1: "Everyone on the group list",
        massOption2: "Everyone on the volunteer list",
        massOption3: "Groups registered coming to this year’s parade",
        massOption4: "Volunteers registered coming to this year’s parade",
      },
    },
    // walkie talkie
    walkieTalkie: {
      sidebarText: "Walkie Talkie System",
      usersText: "Users",
      walkieTalkieText: "Walkie Talkie",
      containerInactiveButtonText: "Press / Hold to talk",
      containerActiveButtonText: "Talking",
      membersText: "Members",
      statusText: "Status",
    },
    // received applications
    receivedApplications: {
      headerText: "Applictions",
      applicationFilterText1: "I want to see the group applications for",
      applicationFilterText2: "that are",
      applicationFilterOptions: {
        applicationFilterOption1: "to be accepted",
        applicationFilterOption2: "Accepted",
      },
    },
    // group list
    groupList: {
      headerText: "Group List",
      addGroupText: "Add group",
    },
    // volunteers list
    volunteersList: {
      headerText: "Volunteers List",
      addVolunteerText: "Add volunteer",
    },
    // search bar
    searchBar: {
      searchButtonText: "Search",
      groupPlaceholderText: "Search by group name, person name, email, phone",
      volunteerPlaceholderText: "Search by volunteer name, email, phone",
      receivedApplicationsPlaceholderText:
        "Search by approved, rejected or need approval applications",
    },
    // table header texts
    tableHeader: {
      personHeaderText: "Person",
      groupNameHeaderText: "Group Name",
      emailHeaderText: "Email",
      countryHeaderText: "Country",
      titleHeaderText: "Title",
      statusHeaderText: "Status",
      volunteerNameHeaderText: "Volunteer Name",
      phoneHeaderText: "Phone",
    },
  },

  // logout text
  logoutText: "Logout",

  // for group president dashboard
  groupPresidentDashboard: {
    sidebar: [{ text: "Dashboard" }, { text: "UserSettings" }],
    dashboard: {
      previousApplicationsText: "Previous Applications",
      filterText: "I want to see the group applications for",
      goButtonText: "Go",
      contactInformationText: "Contact Information",
      contactSecretaryButtonText: "Contact Sectretary",
      applicationStatusText: "Application Status",
      currentApplicationStatusText: "Current Application Status",
      secretaryDetailsText: "Secretary Details",
    },
    noApplicationFoundText: "No Application Found for this year.",
    userSettings: {
      primaryContactHeaderText: "Primary Contact",
      secondaryContactHeaderText: "Secondary Contact",
      button1Text: "Change Your Information",
      button2Text: "Make secondary contact primary contact",
      button3Text: "Delete Your Account",
    },
  },

  // delete modal
  deleteModal: {
    text: "Are you sure you want to delete",
    boldText: "ALL",
    selectedText: "selected",
    deletingText: "Deleting...",
    noButtonText: "No",
    yesButtonText: "Yes",
  },
  // read mail modal
  readMailModal: {
    headerText: "Read Message",
    subjectText: "Subject",
    forwardText: "Forward",
    replyText: "Reply",
    deleteText: "Delete",
  },
  // send mail modal
  sendMailModal: {
    newMessageText: "New Message",
    replyText: "Reply",
    forwardText: "Forward",
    subjectText: "Subject",
    toText: "To",
    attachFileText: "Attach a file",
    sendText: "Send",
    sendingText: "Sending...",
    errorText: "Error",
  },

  // read group application modal
  readApplicationModal: {
    headerText: "Received Application Form",
    organizationNameText: "Name of organization",
    groupPresidentText: "Group President",
    emailText: "Email",
    phoneText: "Phone",
    representCountryText: "Represent any country",
    whichCountryText: "Which Country",
    question1: " Will your group have walkers",
    question1A: "How many people will be walking in your group?",
    question2: "Are you going to bring any cars?",
    question2A:
      "How many cars (All cars must be decorated and any undecorated car will be remoe from parade)?",
    question3: "Are you going to bring any SUVs?",
    question3A: "How many SUVs",
    question4: "Are you going to bring any Pick-Up Trucks?",
    question4A: "How many?",
    question4B: "What brand / type?",
    question5:
      "Are you going to bring any trailers attached to your SUV, Car or Pickup Truck?",
    question5A:
      "How long is the total length from the front of the car to the end of the trailer in feet(Round up to the nearest foot, Please note we have a maximum limit of 28 ft in length)?",
    question6: "Are you bringing any floats?",
    question6A:
      "What is the length of the float in feet (maximum limit of 28 ft in length)?",
    question6B: "Do you have a fire extinguisher on the float (mandatory)?",
    question7: "Are you bringing any animals?",
    question7A: "Will you be bringing horses?",
    question7A1:
      "You will need to provide the parade with a certificate of insurance papers Are they insured?",
    question7A2: "How many you will be bringing?",
    question7B: "Will you be bringing any dogs?",
    question7B1: "How many dogs?",
    question7C: "Are you bringing any other animals?",
    question7C1: "Specify number and type of each?",
    rejectText: "Reject",
    cancelText: "Cancel",
    editText: "Edit",
    acceptText: "Accept",
    saveText: "Save",
  },

  // edit group application modal
  // used same for edit volunteer
  editGroupModal: {
    // for group
    headerText: "Edit Group",
    selectContactText: "Please select primary contact",
    contact1Text: "Contact 1",
    contact2Text: "Contact 2",
    changeText: "change",
    cancelText: "cancel",
    resetPasswordText: "Reset Password",
    representingCountryText: "Are you representing any country?",
    saveText: "Save",
    savingText: "Saving...",
    // for volunteer
    volunteerHeaderText: "Edit Volunteer",
  },

  // change volunteer info modal
  changeVolunteerInformationModal: {
    headerText: "Change Information",
    changeText: "change",
    cancelText: "cancel",
    resetPasswordText: "Reset Password",
    saveText: "Save",
    savingText: "Saving...",
  },

  // delete volunteer modal
  deleteVolunteerModal: {
    text: " In order to delete your account please contact your secreatary",
  },

  // vip page
  vipInvite: {
    montrealParadeText: "Canada Day Parade 2023",
    vipInviteText: "VIP Invitation",
    vipForm: {
      vipNameText: "VIP Name",
      phoneText: "Phone Number",
      emailText: "Email",
      organizationNameText: "Organization Name",
      roleInOrganizationText: "Your Role in Organiztion",
      bringSomeoneText: "Do you want to bring someone else with you?",
      submitText: "Submit",
      mailSentText: "VIP Request Sent",
    },
  },

  // volunteer position modal
  volunteerPositionModal: {
    headerText: "Which Postition you would like to be in?",
    positions: [
      "Senior line controller",
      "Junior line controller",
      "Parade route volunteer",
      "Cake area volunteer",
      "Water area volunteer",
      "General volunteers",
      "VIP stage volunteers",
    ],
    mailSentText: "Welcome to this year's parade. You will be contacted soon.",
    cancelText: "Cancel",
    applyText: "Apply",
  },

  // add volunteer modal
  addVolunteer: {
    addVolunteerText: "Add Volunteer",
    firstNameText: "First Name",
    lastNameText: "Last Name",
    emailText: "Email",
    phoneNumberText: "Phone",
    addingText: "Adding...",
    addText: "Add",
  },

  // change contact modal
  changeContactModal: {
    headerText1: "Are you Sure you want to make Contact",
    headerText2: "Number 2 as Contact Number 1?",
    personText: "Person",
    emailText: "Email",
    phoneText: "Phone",
    yesText: "Yes",
    noText: "No",
  },
};
