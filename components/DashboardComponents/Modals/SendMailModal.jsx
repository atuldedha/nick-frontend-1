import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../../../styles/SendMailModal.module.css";
import FileIcon from "../../../public/fileWhite.png";
import { useMail } from "../../../context/MailContext";
import VolunteersContext from "../../../context/VolunteersContext";
import GroupContext from "../../../context/GroupContext";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import fr from "../../../locales/fr";
import en from "../../../locales/en";
// send mail modal
const SendMailModal = ({
  closeModal,
  inReplyTo,
  to,
  threadId,
  replySubject,
  messageType,
  messageBodyHTML,
  messageBody,
  isForwarding = false,
  forwardSubject,
}) => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  // global state to check whom to send mail
  const {
    senderOption,
    audienceOption,
    audienceMassOption,
    sendEmail,
    setSentEmails,
    fetchMails,
  } = useMail();
  const { getToken } = useContext(AuthContext);

  const { volunteers } = useContext(VolunteersContext);
  const { groups } = useContext(GroupContext);
  const [mailTo, setMailTo] = useState(to ? [to] : []);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(t?.sendMailModal?.sendText);

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    if (!newFile) return;
    setFiles([...files, newFile]);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  useEffect(
    function () {
      let _mailTo = [];
      if (senderOption == "Individual") {
        if (audienceOption == "A specific group")
          _mailTo = groups
            .filter((group) => group.checked)
            .map((group) => group.contact.email);

        if (audienceOption == "A specific volunteer")
          _mailTo = volunteers
            .filter((volunteer) => volunteer.checked)
            .map((volunteer) => volunteer.email);
      }

      if (senderOption == "Mass") {
        if (audienceMassOption == "Everyone on the group list")
          _mailTo = groups.map((group) => group.contact.email);

        if (audienceMassOption == "Everyone on the volunteer list")
          _mailTo = volunteers.map((volunteer) => volunteer.email);
      }
      setMailTo(_mailTo);
    },
    [senderOption, audienceOption]
  );

  function handleFileRemove(index) {
    setFiles((prevFiles) => {
      let updatedFiles = prevFiles.filter((file, i) => i != index);
      return updatedFiles;
    });
  }

  async function sendMail() {
    setStatus(t?.sendMailModal?.sendingText);

    const formData = new FormData();
    formData.append("inReplyTo", inReplyTo);
    formData.append("isFrowarding", isForwarding);
    formData.append("threadId", threadId);
    formData.append("to", to ? to : mailTo.join(","));
    formData.append(
      "subject",
      inReplyTo ? replySubject : isForwarding ? forwardSubject : subject
    );
    formData.append(
      "message",
      isForwarding
        ? messageType == "TEXT"
          ? messageBody
          : messageBodyHTML
        : message
    );

    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const response = await axios.post("/api/mails/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getToken(),
        },
      });
      setSentEmails(function (prevEmails) {
        let updatedMails = [response.data, ...prevEmails];
        return updatedMails;
      });
      setStatus(t?.sendMailModal?.sendText);
      closeModal();
    } catch (error) {
      console.log(error);
      setStatus(`${t?.sendMailModal?.errorText}: ${error.response.data.error}`);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <span className={styles.headerText}>
            {inReplyTo
              ? t?.sendMailModal?.replyText
              : isForwarding
              ? t?.sendMailModal?.forwardText
              : t?.sendMailModal?.newMessageText}
          </span>
          <span
            className={`${styles.headerText} ${styles.closeImage}`}
            onClick={closeModal}
          >
            X
          </span>
        </div>
        <div className={styles.flexContainer}>
          {/* change layout based on whom we are sending mail */}
          {(senderOption === "Individual" || isForwarding) && !inReplyTo && (
            <span className={styles.subjectText}>
              {t?.sendMailModal?.toText}:{" "}
            </span>
          )}
          {senderOption === "Individual" ? (
            audienceOption === "A specific group" ? (
              <div className={styles.recipientsContainer}>
                {/* loading the emails of the selected user */}
                <pre style={{ fontSize: "1.5rem" }}>
                  {groups.map((group) =>
                    group.checked ? group.contact.email + "\n" : null
                  )}
                </pre>
              </div>
            ) : audienceOption === "To someone not on any current list" &&
              !inReplyTo ? (
              <input
                className={styles.mailInput}
                value={mailTo || to}
                onChange={(e) => setMailTo([e.target.value])}
              />
            ) : (
              <div className={styles.recipientsContainer}>
                {/* loading the emails of the selected user */}
                <pre style={{ fontSize: "1.5rem" }}>
                  {volunteers.map((volunteer) =>
                    volunteer.checked ? volunteer.email + "\n" : null
                  )}
                </pre>
              </div>
            )
          ) : (
            ""
          )}
        </div>

        {senderOption === "Individual" && <div className={styles.divider} />}

        {!inReplyTo && !isForwarding && (
          <div className={styles.flexContainer}>
            <span className={styles.subjectText}>
              {t?.sendMailModal?.subjectText}:{" "}
            </span>
            <input
              className={styles.mailInput}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        )}

        <div className={styles.divider} />

        {/* take message */}
        {isForwarding ? (
          <>
            {messageType == "HTML" && (
              <div
                className={styles.messageContainer}
                dangerouslySetInnerHTML={{ __html: messageBodyHTML }}
              ></div>
            )}

            {messageType == "TEXT" && (
              <div className={styles.messageContainer}>
                <span>{messageBody}</span>
              </div>
            )}
          </>
        ) : (
          <textarea
            className={styles.messageContainer}
            rows={8}
            onChange={(e) => setMessage(e.target.value)}
          />
        )}
        <ol
          style={{
            width: "95%",
          }}
        >
          {files.map((file, index) => (
            <li key={index}>
              <div style={{ padding: "1rem 0" }}>
                <strong>Name:</strong> {file.name}, &nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Type:</strong> {file.type}
                <strong
                  style={{
                    float: "right",
                    fontSize: "1.5rem",
                    height: "2rem",
                    width: "2rem",
                    textAlign: "center",
                    paddingBottom: ".2rem",
                    cursor: "pointer",
                    background: "var(--primary)",
                    borderRadius: "50%",
                    color: "white",
                    lineHeight: "1.95rem",
                  }}
                  onClick={() => handleFileRemove(index)}
                >
                  X
                </strong>
              </div>
            </li>
          ))}
        </ol>

        {/* buttons */}
        <div className={styles.buttonContainer}>
          <div className={`${styles.modalButton} ${styles.attachButton}`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <span onClick={openFileDialog}>
              {t?.sendMailModal?.attachFileText}
            </span>
            <div className={styles.attachImage}>
              <Image
                src={FileIcon}
                alt="file"
                width="15px"
                height="20px"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={`${styles.modalButton} ${styles.sendButton}`}>
            <span onClick={sendMail}>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMailModal;
