import Image from "next/image";
import React, { useState, useContext } from "react";
import ApplicationInput from "../../ViewApplicationModal/ApplicationForm/ApplicationInput/ApplicationInput";
import styles from "../../../../../styles/AddVolunteerModal.module.css";
import AuthContext from "../../../../../context/AuthContext";
import GroupContext from "../../../../../context/GroupContext";
// Add Group Modal component
const AddGroupModal = ({ closeModal, setGroupData }) => {
  const [formData, setFormData] = useState({});

  const { error, loading, registerGroup } = useContext(AuthContext);
  const { refetchGroups } = useContext(GroupContext);
  // input change handler function
  const handleChange = (target, value) => {
    setFormData({ ...formData, [target]: value });
  };

  // click handler function to add a new volunteer
  const handleClick = () => {
    const group = {
      name: formData.groupName,
      country: formData.country,
      mainContact: "groupPresident",
      members: [
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          role: "groupPresident",
        },
      ],
    };

    registerGroup(null, group, false).then(function (response) {
      if (!response.error)
        refetchGroups().then(function (groups) {
          closeModal();
        });
    });

    return;
  };
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
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
        <span className={styles.headerText}>Add Group</span>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="groupName"
              placeholder="Name of group"
              handleChange={handleChange}
              value={formData?.groupName || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="firstName"
              placeholder="First Name"
              handleChange={handleChange}
              value={formData?.firstName || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="lastName"
              placeholder="Last Name"
              handleChange={handleChange}
              value={formData?.lastName || ""}
            />
            {/* custom input component */}
            <ApplicationInput
              isEditable={true}
              name="email"
              placeholder="Email"
              handleChange={handleChange}
              value={formData?.email || ""}
            />
            <ApplicationInput
              isEditable={true}
              name="phoneNumber"
              placeholder="Phone #"
              handleChange={handleChange}
              value={formData?.phoneNumber || ""}
            />
            <ApplicationInput
              isEditable={true}
              name="country"
              placeholder="Country"
              handleChange={handleChange}
              value={formData?.country || ""}
            />
          </div>
          <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>
          {/* button to add new volunteer */}
          <button className={styles.addButton} onClick={handleClick}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
