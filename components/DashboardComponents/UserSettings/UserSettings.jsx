import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import ChangeInformationModal from "../Modals/GroupPresidentDashboardModals/UserSettingsModals/ChangeInformationModal/ChangeInformationModal";
import DeleteAccountModal from "../Modals/GroupPresidentDashboardModals/UserSettingsModals/DeleteAccountModal/DeleteAccountModal";
import ChangeContactModal from "../Modals/GroupPresidentDashboardModals/UserSettingsModals/ChangeContactModal/ChangeContactModal";
import ChangeSucessfullModal from "../Modals/GroupPresidentDashboardModals/UserSettingsModals/ChangeSucessfullModal/ChangeSucessfullModal";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

const UserSettings = ({ isPresident }) => {
  const [openChangeInfoModal, setOpenChangeInfoModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const [openChangeContactModal, setOpenChangeContactModal] = useState(false);
  const [changeSucessfullModal, setChangeSucessfullModal] = useState(false);
  const [contactChanged, setContactChanged] = useState(false);
  const [secretary, setSecretary] = useState(null);

  useEffect(function fetchSecretaryInfo() {
    (async function () {
      try {
        const response = await axios.get("/api/secretary");
        setSecretary(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={styles.UserSettingsContainer}>
        <h1 className={styles.headerTitle}>
          {contactChanged ? "Secondary Contact" : "Primary Contact"}
        </h1>
        {/* button container */}
        {isPresident ? (
          <div className={styles.ButtonContainer}>
            <button
              className={styles.UserSettingsButton}
              onClick={() => setOpenChangeInfoModal(true)}
            >
              Change Your Information
            </button>
            <button
              className={`${
                contactChanged
                  ? styles.ContactChangedButton
                  : styles.UserSettingsButton
              }`}
              onClick={() => setOpenChangeContactModal(true)}
            >
              Make secondary contact primary contact
            </button>
            <button
              className={styles.UserSettingsButton}
              onClick={() => setOpenDeleteAccountModal(true)}
            >
              Delete Your Account
            </button>
          </div>
        ) : (
          <div className={styles.volunteerButtonContainer}>
            <button
              className={styles.UserSettingsButton}
              onClick={() => setOpenChangeInfoModal(true)}
            >
              Change Your Information
            </button>
            <button
              className={styles.UserSettingsButton}
              onClick={() => setOpenDeleteAccountModal(true)}
            >
              Delete Your Account
            </button>
          </div>
        )}
      </div>
      {/* Change Info Modal */}
      {openChangeInfoModal && (
        <ChangeInformationModal
          closeModal={() => setOpenChangeInfoModal(false)}
          data={{
            Name: user && user.firstName + " " + user.lastName,
            email: user && user.email,
            phone: user && user.phoneNumber,
          }}
        />
      )}
      {/* Delete Account Modal */}
      {openDeleteAccountModal && (
        <DeleteAccountModal
          closeModal={() => setOpenDeleteAccountModal(false)}
          formData={{
            Name: secretary?.firstName + " " + secretary?.lastName,
            email: secretary?.email,
            phone: secretary?.phoneNumber,
          }}
        />
      )}
      {/* Change Contact Modal */}
      {openChangeContactModal && (
        <ChangeContactModal
          closeModal={() => setOpenChangeContactModal(false)}
          changeSucessfull={() => {
            setOpenChangeContactModal(false);
            setChangeSucessfullModal(true);
            setContactChanged(true);
          }}
          formData={{
            Name: "John Davis",
            email: "JohnDav12@gmail.com",
            phone: "12354493033030",
          }}
        />
      )}
      {/* Change Sucessfull Modal */}
      {changeSucessfullModal && (
        <ChangeSucessfullModal
          closeModal={() => setChangeSucessfullModal(false)}
        />
      )}
    </>
  );
};

export default UserSettings;
