import React, { useState, useContext } from "react";
import Event from "../components/Event";
import Hero from "../components/Hero";
import styles from "../styles/Contact.module.css";
import { BsArrowLeft } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";
import Head from "next/head";
import { useWindowSize } from "../utils/WindowResizeHook";
import Image from "next/image";
import SendMailModal from "../components/DashboardComponents/Modals/SendMailModal";
import { useMail } from "../context/MailContext";
function Contact() {
  const router = useRouter();
  const { locale } = router;

  const [width, height] = useWindowSize();

  const t = locale === "en-US" ? en : fr;
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageDelivered, setMessageDelivered] = useState(false);
  const [disable, setDisable] = useState(false);
  function onChange(value) {
    setValue(value);
  }

  const { sendEmail } = useMail();

  function sendContactEmail(event) {
    setDisable(true);
    const templateParams = {
      name: name,
      email: email,
      message: message,
    };
    sendEmail("CONTACT", templateParams, event).then(function (success) {
      if (success) {
        setMessageDelivered(true);
        setName("");
        setEmail("");
        setMessage("");
        setDisable(false);
      } else {
        //setDisable(false);
      }
    });
  }

  return (
    <div>
      <Head>
        <title>{t.contact.title}</title>
      </Head>
      <Hero
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        image="/contact.png"
        alt={t.contact.title}
      />
      <Event />

      <div className={styles.container}>
        {messageDelivered ? (
          <div className={styles.emailSendContainer}>
            <div className={styles.doneImage}>
              <Image
                src="/done.svg"
                alt="doneIcon"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </div>
            <span className={styles.emailSentText}>
              {t.thankYouContact.title}
            </span>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <h4 className={styles.heading}>{t.contact.form.heading}</h4>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={`${t.contact.form.name} *`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={`${t.contact.form.email} *`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  placeholder={`${t.contact.form.message} *`}
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                  size={width < parseFloat("380") ? "compact" : "normal"}
                />
              </div>
              <button
                disabled={!name || !email || !message || !value || disable}
                className={styles.submitBtn}
                onClick={sendContactEmail}
              >
                {t.contact.form.btn}
              </button>
            </form>
          </div>
        )}
        {/* removed as per requirement date: 10APR 2023 */}
        {/* <div className={styles.contentContainer}>
          {t.contact.options.map((item, index) => (
            <div key={index}>
              <h4 className={styles.contactHeading}>{item.title}</h4>
              <p className={styles.contactText}>
                {item.description}
                <button
                  className={styles.mailtoButton}
                  onClick={() =>
                    (window.location =
                      index === 1
                        ? "mailto:kully2005@yahoo.ca"
                        : "mailto:MontrealCanadaDayParade@gmail.com")
                  }
                >
                  Email
                </button>
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Contact;
