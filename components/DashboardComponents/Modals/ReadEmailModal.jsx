import Image from "next/image";
import { React, useState } from "react";
import styles from "../../../styles/ReadEmailModal.module.css";
import FileIcon from "../../../public/fileWhite.png";
import ForwardIcon from "../../../public/forwardWhite.png";
import DeleteIcon from "../../../public/deleteWhite.png";
import SendMailModal from "./SendMailModal";
import { useMail } from "../../../context/MailContext";
import en from "../../../locales/en";
import fr from "../../../locales/fr";
import { useRouter } from "next/router";
// modal for reading mail
const ReadEmailModal = ({ data, closeModal, mailType }) => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const { deleteEmails } = useMail();

  const [messageType, setMessageType] = useState("TEXT");
  const [openSendModal, setOpenSendModal] = useState(false);
  const [status, setStatus] = useState("");

  // forward state
  const [isForwarding, setIsForwarding] = useState(false);

  function handleEmailReply() {
    setOpenSendModal(true);
  }

  function handleEmailDelete() {
    setStatus("Deleting..");
    deleteEmails([data.id]).then(function () {
      setStatus();
      closeModal();
    });
  }

  return (
    <>
      {!openSendModal && (
        <div className={styles.container}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <span className={styles.headerText}>
                {t?.readMailModal?.headerText}
              </span>
              <span
                className={`${styles.headerText} ${styles.closeImage}`}
                onClick={closeModal}
              >
                X
              </span>
            </div>
            {/* subject */}
            <span className={styles.subjectText}>
              {t?.readMailModal?.subjectText}: {data?.subject}{" "}
            </span>
            <div className={styles.divider} />

            {/* message */}
            {messageType == "HTML" && (
              <div
                className={styles.messageContainer}
                dangerouslySetInnerHTML={{ __html: data?.messageBodyHTML }}
              ></div>
            )}

            {messageType == "TEXT" && (
              <div className={styles.messageContainer}>
                <span>{data?.messageBody}</span>
              </div>
            )}
            {/* buttons */}

            <div
              style={{
                padding: "0 4rem",
                marginBottom: "2rem",
              }}
            >
              {data.attachments && data.attachments.length != 0 && (
                <h4>Attachments</h4>
              )}
              {data.attachments &&
                data.attachments.map(function (attachment, index) {
                  return (
                    <a
                      key={index}
                      style={{
                        color: "var(--primary)",
                        cursor: "pointer",
                      }}
                      target="_blank"
                      href={attachment.url}
                      rel="noreferrer"
                    >
                      {attachment.filename}
                    </a>
                  );
                })}
            </div>
            <div className={styles.buttonContainer}>
              {/* <div className={`${styles.modalButton} ${styles.attachButton}`}>
            <span>Attach a file</span>
            <div className={styles.attachImage}>
              <Image
                src={FileIcon}
                alt="file"
                width="15px"
                height="20px"
                objectFit="contain"
              />
            </div>
          </div> */}
              <div
                className={`${styles.modalButton} ${styles.forwardButton}`}
                onClick={() => {
                  setIsForwarding(true);
                  setOpenSendModal(true);
                }}
              >
                <span>{t?.readMailModal?.forwardText}</span>
                <div className={styles.forwardImage}>
                  <Image
                    src={ForwardIcon}
                    alt="file"
                    width="15px"
                    height="20px"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={`${styles.modalButton} ${styles.deleteButton}`}>
                <span
                  onClick={() => {
                    if (mailType == "RECEIVED") handleEmailReply();
                    else handleEmailDelete();
                  }}
                  style={{
                    padding: ".25rem",
                  }}
                >
                  {mailType == "RECEIVED"
                    ? t?.readMailModal?.replyText
                    : status
                    ? status
                    : t?.readMailModal?.deleteText}
                </span>
                {mailType != "RECEIVED" && (
                  <div className={styles.deleteImage}>
                    <Image
                      src={DeleteIcon}
                      alt="file"
                      width="15px"
                      height="20px"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {openSendModal && (
        <SendMailModal
          closeModal={() => {
            setOpenSendModal(false);
            setIsForwarding(false);
          }}
          inReplyTo={!isForwarding ? data.replyId : ""}
          to={!isForwarding ? data.from : ""}
          threadId={data.threadId}
          replySubject={data.subject}
          forwardSubject={data.subject}
          isForwarding={isForwarding}
          messageType={messageType}
          messageBody={data?.messageBody}
          messageHtml={data?.messageBodyHTML}
        />
      )}
    </>
  );
};

export default ReadEmailModal;
