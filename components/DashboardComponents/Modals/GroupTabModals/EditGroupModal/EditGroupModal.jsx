import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import GroupContext from "../../../../../context/GroupContext";
import styles from "../../../../../styles/EditGroupModal.module.css";
import EditInput from "../../VolunteerTabModals/EditVolunteerModal/EditInput/EditInput";
import ContactInfo from "./ContactInfo/ContactInfo";
import CountryRep from "./CountryRep/CountryRep";
import { useRouter } from "next/router";
import fr from "../../../../../locales/fr";
import en from "../../../../../locales/en";

// Edit Group Modal Component
const EditGroupModal = ({ data, closeModal, setData, setSuccess }) => {
  data = JSON.parse(JSON.stringify(data));
  // router for language selection
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;
  // primary contact state
  const [mainContact, setMainContact] = useState(data.mainContact);
  // data state
  const [newData, setNewData] = useState(data);
  // editable state
  const [groupNameEditable, setGroupNameEditable] = useState(false);

  const [error, setError] = useState("");
  const errorTimeout = 4;

  const { loading } = useContext(GroupContext);

  const { handleEditGroup, refetchGroups } = useContext(GroupContext);

  // input change handler
  const handleChange = (target, value) => {
    setNewData({ ...newData, [target]: value });
  };
  // button click handler
  const handleButtonClick = () => {
    setData((prev) =>
      prev?.map((item) => {
        if (item.id === data.id) {
          return { ...newData };
        } else {
          return item;
        }
      })
    );
  };

  function handleSubmit(event) {
    console.log(event.target.querySelectorAll("input"));
    handleEditGroup(event, newData._id).then(function (response) {
      if (!response.error)
        refetchGroups().then(function () {
          closeModal();
        });
      else setError(response.error);
    });
  }

  useEffect(
    function () {
      if (error) setTimeout(setError, errorTimeout * 1000);
    },
    [error]
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.modalContainer}>
        <div className={styles.closeDeleteModalImage}>
          <Image
            src="/closeRed.png"
            alt="cross"
            height="28px"
            width="28px"
            objectFit="contain"
            onClick={closeModal}
          />
        </div>
        <div className={styles.flexRow}>
          <div className={styles.flexCol}>
            <div className={`${styles.flexCol} ${styles.marginLeftLarge}`}>
              <span className={styles.headerText}>
                {t?.editGroupModal?.headerText}
              </span>

              <span className={styles.modalText}>
                {t?.editGroupModal?.selectContactText}
              </span>
              {/* checkboxes to select primary comtact */}
              <div className={styles.contactOptionContainer}>
                <div
                  className={`${
                    mainContact === "groupPresident"
                      ? styles.outerCircleSelected
                      : ""
                  } ${styles.outerCircle}`}
                  onClick={() => setMainContact("groupPresident")}
                >
                  <div className={styles.innerCircle} />
                </div>

                <span className={`${styles.modalText} ${styles.marginRight}`}>
                  {t?.editGroupModal?.contact1Text}
                </span>

                <div
                  className={`${
                    mainContact === "groupVicePresident"
                      ? styles.outerCircleSelected
                      : ""
                  } ${styles.outerCircle}`}
                  onClick={() => setMainContact("groupVicePresident")}
                >
                  <div className={styles.innerCircle} />
                </div>

                <span className={styles.modalText}>
                  {t?.editGroupModal?.contact2Text}
                </span>
              </div>
            </div>
            <input
              readOnly={true}
              hidden={true}
              name="mainContact"
              value={mainContact}
            />
            <div className={styles.flexRow}>
              {/* show cancel if editing state active */}
              <span
                className={styles.changeText}
                onClick={() => setGroupNameEditable(!groupNameEditable)}
              >
                {groupNameEditable
                  ? t?.editGroupModal?.cancelText
                  : t?.editGroupModal?.changeText}
              </span>
              <div className={styles.inputCont}>
                {/* custom input component */}
                <EditInput
                  isEditable={groupNameEditable}
                  name="groupName"
                  handleChange={handleChange}
                  defaultValue={newData?.name}
                  handleButtonClick={() => setGroupNameEditable(false)}
                />
              </div>
            </div>
          </div>
          <span className={styles.hide}>Reset Password</span>
        </div>
        <div className={styles.divider} />
        {/* custom component to show contact info */}
        <ContactInfo
          title={t?.editGroupModal?.contact1Text}
          name="groupPresident"
          handleButtonClick={handleButtonClick}
          handleChange={handleChange}
          newData={newData}
          setSuccess={setSuccess ? setSuccess : () => {}}
          t={t}
        />

        <div className={styles.divider} />
        {/* custom component to show contact info */}
        <ContactInfo
          title={t?.editGroupModal?.contact2Text}
          name="groupVicePresident"
          handleButtonClick={handleButtonClick}
          handleChange={handleChange}
          newData={newData}
          setSuccess={setSuccess ? setSuccess : () => {}}
          t={t}
        />

        <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>

        <div
          className={`${styles.flexRow} ${styles.marginLeft} ${styles.alignCenter}`}
        >
          <span className={styles.hide}>change</span>
          <div className={styles.flexCol}>
            {/* custom component to show contact country rep */}
            <CountryRep newData={newData} setNewData={setNewData} />

            <button className={`${styles.addButton}`}>
              {loading
                ? t?.editGroupModal?.savingText
                : t?.editGroupModal?.saveText}
            </button>
          </div>

          <span className={styles.hide}>Reset Password</span>
        </div>
      </form>
    </div>
  );
};

export default EditGroupModal;
