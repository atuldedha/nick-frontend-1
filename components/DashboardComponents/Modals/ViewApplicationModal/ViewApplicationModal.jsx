import Image from "next/image";
import React, { useRef, useContext } from "react";
import styles from "../../../../styles/ViewApplicationModal.module.css";
import ApplicationForm from "./ApplicationForm/ApplicationForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/router";
import fr from "../../../../locales/fr";
import en from "../../../../locales/en";

//View Application Modal component
const ViewApplicationModal = ({
  data,
  closeModal,
  setAllData,
  openAcceptModal,
  noButtons,
}) => {
  // router for language
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const applicationRef = useRef();

  const handleExportPdf = () => {
    const input = applicationRef.current;
    input.style.height = "fit-content";

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(data?.orgName.replace(/ /g, "-") + "-application.pdf");
    });

    input.style.height = "55rem";
  };

  return (
    <div className={styles.container} id="print-content">
      <div className={styles.modalContainer} ref={applicationRef}>
        <div className={styles.modalHeader}>
          {/* close image */}
          {/* <div
            className={`${styles.closeDeleteModalImage} ${styles.paddingLeft}`}
          > */}
          {/* <img
              src="/download.png"
              alt="cross"
              height="34px"
              width="34px"
              objectFit="contain"
              style={{
                cursor: "pointer"
              }}
            /> */}
          {/* </div> */}
          <div className={styles.downloadImage}>
            <Image
              src="/download.png"
              alt="cross"
              height="100%"
              width="100%"
              objectFit="contain"
              style={{
                cursor: "pointer",
              }}
              onClick={handleExportPdf}
            />
          </div>
          <span className={styles.modalHeaderText}>
            {t?.readApplicationModal?.headetText}
          </span>
          <div className={styles.closeDeleteModalImage}>
            <Image
              src="/closeRed.png"
              alt="cross"
              height="100%"
              width="100%"
              objectFit="contain"
              onClick={closeModal}
            />
          </div>
        </div>
        {/* custom component to show the application form */}
        <div className={styles.modalFormContainer}>
          <ApplicationForm
            data={data}
            setAllData={setAllData}
            openAcceptModal={openAcceptModal}
            closeModal={closeModal}
            noButtons={noButtons}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationModal;
