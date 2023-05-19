import Image from "next/image";
import React, { useContext, useState } from "react";
import styles from "../../../../../styles/VolunteersList.module.css";
import CheckIcon from "../../../../../public/checkRed.png";
import EditDialog from "../EditDialog/EditDialog";
import EditVolunteerModal from "../../../Modals/VolunteerTabModals/EditVolunteerModal/EditVolunteerModal";
import DeleteModal from "../../../Modals/DeleteModal";
import VolunteerContext from "../../../../../context/VolunteersContext";
// Individual volunteer info card component
const VolunteersCard = ({ data, setData, selected, setSelected }) => {
  //state to check uncheck a card
  const [checked, setChecked] = useState(false);
  //state to  open Edit dialog
  const [openDialog, setOpenDialog] = useState(false);
  // state to open edit modal
  const [openEditModal, setOpenEditModal] = useState(false);
  // state to open delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { handleDeleteVolunteers } = useContext(VolunteerContext);

  return (
    <div className={styles.mailCard}>
      <div className={styles.mailsWrap}>
        <div className={styles.smallCheckContainer}>
          <div
            className={styles.smallCheck}
            onClick={() => {
              setChecked((prev) => {
                let _checked = !prev;
                if (_checked) selected.push(data._id);
                else setSelected(selected.filter((_id) => _id != data._id));
                return _checked;
              });
              // handleCheck();
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
        </div>

        <span className={`${styles.name} ${styles.groupName}`}>
          {data.fullName}
        </span>

        <span className={`${styles.email}`}>{data.email}</span>

        <span className={styles.name}>{data.phoneNumber}</span>
      </div>

      {/* if volunteer is selected show menu */}
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
        <EditVolunteerModal
          data={data}
          setData={setData}
          closeModal={() => setOpenEditModal(false)}
        />
      )}
      {/* if delete is selected in dialog open Delete Modal component */}
      {openDeleteModal && (
        <DeleteModal
          handleDelete={() => handleDeleteVolunteers(selected)}
          closeModal={() => setOpenDeleteModal(false)}
          deleting="volunteers"
        />
      )}
    </div>
  );
};

export default VolunteersCard;
