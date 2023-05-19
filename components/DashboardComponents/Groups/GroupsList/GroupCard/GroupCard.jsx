import Image from "next/image";
import React, { useContext, useState } from "react";
import styles from "../../../../../styles/GroupCard.module.css";
import CheckIcon from "../../../../../public/checkRed.png";
import EditDialog from "../../../Volunteers/VolunteersList/EditDialog/EditDialog";
import DeleteModal from "../../../Modals/DeleteModal";
import EditGroupModal from "../../../Modals/GroupTabModals/EditGroupModal/EditGroupModal";
import GroupContext from "../../../../../context/GroupContext";

const GroupCard = ({ data, setData, selected, setSelected }) => {
  const [checked, setChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { handleDeleteGroups } = useContext(GroupContext);
  // delete volunteer function
  const handleDelete = () => {
    setData((prev) => prev.filter((item) => item.id !== data.id));
  };
  return (
    <div className={styles.mailCard}>
      <div className={styles.mailsWrap}>
        <div className={styles.groupNameContainer}>
          <div
            className={styles.smallCheck}
            onClick={() => {
              setChecked((prev) => {
                let _checked = !prev;
                if (_checked) selected.push(data._id);
                else setSelected(selected.filter((_id) => _id != data._id));
                return _checked;
              });
              //   handleCheck();
            }}
          >
            {checked && (
              <Image
                src={CheckIcon}
                alt="check"
                height=""
                width=""
                objectFit="contain"
              />
            )}
          </div>

          <span className={`${styles.name} ${styles.groupEmail}`}>
            {data.name}
          </span>
        </div>
        <span className={`${styles.name} ${styles.groupName}`}>
          {data.contact?.fullName}
        </span>

        <span className={`${styles.email} ${styles.groupEmail}`}>
          {data.contact?.email}
        </span>
        <span
          className={`${styles.name} ${styles.groupName} ${styles.smallWidth}`}
        >
          {data.contact?.phoneNumber}
        </span>
        <span className={`${styles.name} ${styles.groupCountry}`}>
          {data.country}
        </span>
      </div>
      {checked && (
        <div className={styles.menuCont}>
          <Image
            src="/vertDots.png"
            alt="dots"
            height="20px"
            width="6px"
            objectFit="contain"
            className={styles.menuImage}
            onClick={() => setOpenDialog((prev) => !prev)}
          />
          {/* if menu icon click open dialog */}
          {openDialog && (
            <EditDialog
              openModal={() => {
                setOpenEditModal(true);
                setOpenDialog(false);
              }}
              openDeleteModal={() => {
                setOpenDeleteModal(true);
                setOpenDialog(false);
              }}
            />
          )}
        </div>
      )}
      {/* if edit is selected in dialog open Edit Modal component */}
      {openEditModal && (
        <EditGroupModal
          data={data}
          setData={setData}
          closeModal={() => setOpenEditModal(false)}
        />
      )}
      {/* if delete is selected in dialog open Delete Modal component */}
      {openDeleteModal && (
        <DeleteModal
          handleDelete={() => handleDeleteGroups(selected)}
          closeModal={() => setOpenDeleteModal(false)}
          deleting="group"
        />
      )}
    </div>
  );
};

export default GroupCard;
