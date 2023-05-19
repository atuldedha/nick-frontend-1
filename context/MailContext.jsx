import { createContext, useContext, useEffect, useState, useRef } from "react";
import allEmails from "../utils/staticEmailList";
import axios from "axios";
import jwt_decode from "jwt-decode";
import emailjs from "@emailjs/browser";
import { io } from "socket.io-client";
import AuthContext from "./AuthContext";

const MailContext = createContext({});
export const useMail = () => useContext(MailContext);

const INBOX = "INBOX";
const SENT_BOX = "SENT";

export const MailContextProvider = ({ children }) => {
  // state for checking if we are creating a mail
  const [isCreatingMail, setIsCreatingMail] = useState();
  // state to check if all mails are selected or not
  const [allMailsCheck, setAllMailsCheck] = useState(false);
  // state for sender option default is individual
  const [senderOption, setSenderOption] = useState("Individual");
  // all mails state
  const [allMails, setAllMails] = useState(allEmails);
  // mail button text state which changes on each dropdown changes
  const [mailButtonText, setMailButtonText] = useState("Sent Emails");
  // audience option for individual sender
  const [audienceOption, setAudienceOption] = useState(
    "To someone not on any current list"
  );
  // audience option for mass sender
  const [audienceMassOption, setAudienceMassOption] = useState(
    "Everyone on the group list"
  );

  const [receivedEmails, setReceivedEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const receivedEmailsRef = useRef(receivedEmails);
  const sentEmailsRef = useRef(sentEmails);

  const [loading, setLoading] = useState("");

  const [inboxPage, setInboxPage] = useState(1);
  const [sentPage, setSentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const getUser = () => {
    return localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null;
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const { token } = useContext(AuthContext);

  async function fetchMails(pageNum = 1, append = true, box = "INBOX") {
    var options = {
      method: "GET",
      url: "/api/mails",
      params: { box, page: pageNum, perPage },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    setLoading(box);
    return axios
      .request(options)
      .then(function (response) {
        setLoading(false);

        if (box === "INBOX") {
          if (append) {
            setReceivedEmails((prevReceivedEmails) => {
              const newEmails = response.data.filter((newEmail) => {
                if (box === "INBOX") {
                  return !prevReceivedEmails.some(
                    (existingEmail) => existingEmail.id === newEmail.id
                  );
                }
              });

              let updatedMails = [...prevReceivedEmails, ...newEmails];
              updatedMails.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Sort in descending order (latest emails first)
                return dateB - dateA;
              });
              return updatedMails;
            });
          } else {
            setReceivedEmails(
              response.data.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Sort in descending order (latest emails first)
                return dateB - dateA;
              })
            );
          }
        }

        if (box === "SENT") {
          if (append) {
            setSentEmails((prevSentEmails) => {
              const newEmails = response.data.filter((newEmail) => {
                if (box === "SENT") {
                  return !prevSentEmails.some(
                    (existingEmail) => existingEmail.id === newEmail.id
                  );
                }
              });
              let updatedMails = [...prevSentEmails, ...newEmails];
              updatedMails.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Sort in descending order (latest emails first)
                return dateB - dateA;
              });
              return updatedMails;
            });
          } else {
            setSentEmails(
              response.data.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Sort in descending order (latest emails first)
                return dateB - dateA;
              })
            );
          }
        }
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  }

  const sendEmail = async (templateName, templateParams, event) => {
    if (event) event.preventDefault();

    let templateId = "";

    if (templateName == "CONTACT")
      templateId = process.env.NEXT_PUBLIC_EMAIL_CONTACT_TEMPLATE_ID;
    else if (templateName == "SIMPLE")
      templateId = process.env.NEXT_PUBLIC_EMAIL_SIMPLE_TEMPLATE_ID;
    return emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        templateId,
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          return true;
        },
        (error) => {
          console.log(error.text);
          return false;
        }
      );
  };

  async function deleteEmails(ids) {
    setLoading(true);

    var options = {
      method: "POST",
      url: "/api/mails/delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      data: {
        ids,
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        setReceivedEmails((prevState) =>
          prevState.filter((email) => !ids.includes(email.id))
        );
        setSentEmails((prevState) =>
          prevState.filter((email) => !ids.includes(email.id))
        );
        setLoading(false);
        return true;
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        return false;
      });
  }

  // handle selection on individual options selection
  const handleIndividualSenderSelection = (value) => {
    setAudienceOption(value);
    if (value === "To someone not on any current list") {
      setMailButtonText("Sent Emails");
    } else {
      setMailButtonText(value);
    }
  };

  // handle selection for mass selection options
  const handleMassSenderSelection = (value) => {
    setAudienceMassOption(value);
    setMailButtonText(value);
  };

  // handle for change in sender option i.e, individual or mass
  const handleSenderOptionChange = (value) => {
    setSenderOption(value);
    setAudienceOption("To someone not on any current list");
    setAudienceMassOption("Everyone on the group list");
    if (value === "Individual") {
      setMailButtonText("Sent Emails");
    } else {
      setMailButtonText("Everyone on the group list");
    }
  };

  // if back button pressed reset the states to default
  useEffect(() => {
    if (!isCreatingMail) {
      setSenderOption("Individual");
      setMailButtonText("Sent Emails");
      setAudienceOption("To someone not on any current list");
      setAudienceMassOption("Everyone on the group list");
    }
  }, [isCreatingMail]);

  useEffect(() => {
    fetchMails().then(function (response) {
      fetchMails(1, true, SENT_BOX);
    });

    const socket = io();
    socket.on("new-email", (email) => {
      setReceivedEmails((prevReceivedEmails) => {
        let updatedMails = [email, ...prevReceivedEmails];
        return updatedMails;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <MailContext.Provider
      value={{
        deleteEmails,
        sendEmail,
        inboxPage,
        setInboxPage,
        sentPage,
        setSentPage,
        loading,
        setLoading,
        fetchMails,
        receivedEmails,
        receivedEmailsRef,
        setReceivedEmails,
        sentEmails,
        sentEmailsRef,
        setSentEmails,
        senderOption,
        handleSenderOptionChange,
        allMailsCheck,
        setAllMailsCheck,
        allMails,
        setAllMails,
        audienceOption,
        audienceMassOption,
        handleIndividualSenderSelection,
        handleMassSenderSelection,
        isCreatingMail,
        setIsCreatingMail,
        mailButtonText,
        setMailButtonText,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
