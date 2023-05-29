import React from "react";
import ApplicationAnswer from "../ApplicationAnswer/ApplicationAnswer";
import ApplicationCheckboxes from "../ApplicationCheckboxes/ApplicationCheckboxes";
import ApplicationQuestion from "../ApplicationQuestion/ApplicationQuestion";
import styles from "../../../../../../styles/ViewApplicationModal.module.css";

// Application All Questions component
const ApplicationAllQuestions = ({
  isEditable,
  setIsEditable,
  formData,
  setFormData,
  handleEdit,
  handleAccept,
  handleSave,
  handleReject,
  noButtons,
  t,
}) => {
  return (
    <div className={styles.flexColumn}>
      {/* custom question component */}
      <ApplicationQuestion
        question={`1- ${t?.readApplicationModal?.question1}`}
        yesChecked={formData.haveWalkers}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, haveWalkers: true })}
        noChecked={formData.haveWalkers === false}
        setNoChecked={() => setFormData({ ...formData, haveWalkers: false })}
      />

      {formData.haveWalkers && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          1a- {t?.readApplicationModal?.question1A}
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.noOfWalkers}
            name="noOfWalkers"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question={`2- ${t?.readApplicationModal?.question2}`}
        yesChecked={formData.bringingCar}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingCar: true })}
        noChecked={formData.bringingCar === false}
        setNoChecked={() => setFormData({ ...formData, bringingCar: false })}
      />

      {formData.bringingCar && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          2a- {t?.readApplicationModal?.question2A}?
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.noOfCars}
            name="noOfCars"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question={`3- ${t?.readApplicationModal?.question3}`}
        yesChecked={formData.bringingSUV}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingSUV: true })}
        noChecked={formData.bringingSUV === false}
        setNoChecked={() => setFormData({ ...formData, bringingSUV: false })}
      />

      {formData.bringingSUV && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          3a- {t?.readApplicationModal?.question3A}
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.noOfSUV}
            name="noOfSUV"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question={`4- ${t?.readApplicationModal?.question4}`}
        yesChecked={formData.bringingTruck}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingTruck: true })}
        noChecked={formData.bringingTruck === false}
        setNoChecked={() => setFormData({ ...formData, bringingTruck: false })}
      />

      {formData.bringingTruck && (
        <>
          <span className={`${styles.formText} ${styles.marginBottom}`}>
            4a- {t?.readApplicationModal?.question4A}
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              name="noOfTrucks"
              value={formData.noOfTrucks}
              handleChange={handleEdit}
            />
          </span>

          <span className={`${styles.formText} ${styles.marginBottom}`}>
            4b- {t?.readApplicationModal?.question4B}
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              name="brandOfTruck"
              value={formData.brandOfTruck}
              handleChange={handleEdit}
            />
          </span>
        </>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question={`5- ${t?.readApplicationModal?.question5}`}
        yesChecked={formData.trailersAttached}
        isEditable={isEditable}
        setYesChecked={() =>
          setFormData({ ...formData, trailersAttached: true })
        }
        noChecked={formData.trailersAttached === false}
        setNoChecked={() =>
          setFormData({ ...formData, trailersAttached: false })
        }
      />

      {formData.trailersAttached && (
        <span className={`${styles.formText} ${styles.marginBottom}`}>
          5a- {t?.readApplicationModal?.question5A}
          {/* custom answer component */}
          <ApplicationAnswer
            isEditable={isEditable}
            value={formData.trailerLength}
            name="trailerLength"
            handleChange={handleEdit}
          />
        </span>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question={`6- ${t?.readApplicationModal?.question6}`}
        yesChecked={formData.bringingFloats}
        isEditable={isEditable}
        setYesChecked={() => setFormData({ ...formData, bringingFloats: true })}
        noChecked={formData.bringingFloats === false}
        setNoChecked={() => setFormData({ ...formData, bringingFloats: false })}
      />

      {formData.bringingFloats && (
        <>
          <span className={`${styles.formText} ${styles.marginBottom}`}>
            6a- {t?.readApplicationModal?.question6A}
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              value={formData.floatsLength}
              name="floatsLength"
              handleChange={handleEdit}
            />
          </span>

          <span className={`${styles.formText} ${styles.marginBottom}`}>
            6b- {t?.readApplicationModal?.question6B}
            {/* custom answer component */}
            <ApplicationAnswer
              isEditable={isEditable}
              value={formData.isThereFireExtinguisher}
              name="isThereFireExtinguisher"
              handleChange={handleEdit}
            />
          </span>
        </>
      )}
      {/* custom question component */}
      <ApplicationQuestion
        question={`7- ${t?.readApplicationModal?.question7}`}
        yesChecked={formData.bringingAnimals}
        isEditable={isEditable}
        setYesChecked={() =>
          setFormData({ ...formData, bringingAnimals: true })
        }
        noChecked={formData.bringingAnimals === false}
        setNoChecked={() =>
          setFormData({ ...formData, bringingAnimals: false })
        }
      />

      {formData.bringingAnimals && (
        <>
          <div className={styles.flexColumn}>
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7a- {t?.readApplicationModal?.question7A}
            </span>
            {/* custom checkbox component */}
            <ApplicationCheckboxes
              yesChecked={formData.bringingHorses}
              isEditable={isEditable}
              setYesChecked={() =>
                setFormData({ ...formData, bringingHorses: true })
              }
              noChecked={formData.bringingHorses === false}
              setNoChecked={() =>
                setFormData({ ...formData, bringingHorses: false })
              }
            />
          </div>
          {formData.bringingHorses && (
            <>
              <div className={styles.flexColumn}>
                <span className={`${styles.formText}`}>
                  7a-1- {t?.readApplicationModal?.question7A1}
                </span>
                {/* custom checkbox component */}
                <ApplicationCheckboxes
                  yesChecked={formData.areHorsesInsured}
                  isEditable={isEditable}
                  setYesChecked={() =>
                    setFormData({ ...formData, areHorsesInsured: true })
                  }
                  noChecked={formData.areHorsesInsured === false}
                  setNoChecked={() =>
                    setFormData({ ...formData, areHorsesInsured: false })
                  }
                />
              </div>
              <span className={`${styles.formText} ${styles.marginBottom}`}>
                7a-2- {t?.readApplicationModal?.question7A2}
                {/* custom answer component */}
                <ApplicationAnswer
                  isEditable={isEditable}
                  value={formData.noOfHorses}
                  name="noOfHorses"
                  handleChange={handleEdit}
                />
              </span>
            </>
          )}
          <div className={styles.flexColumn}>
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7b- {t?.readApplicationModal?.question7B}
            </span>
            {/* custom checkbox component */}
            <ApplicationCheckboxes
              yesChecked={formData.bringingDogs}
              isEditable={isEditable}
              setYesChecked={() =>
                setFormData({ ...formData, bringingDogs: true })
              }
              noChecked={formData.bringingDogs === false}
              setNoChecked={() =>
                setFormData({ ...formData, bringingDogs: false })
              }
            />
          </div>
          {formData.bringingDogs && (
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7b-1- {t?.readApplicationModal?.question7B1}
              {/* custom answer component */}
              <ApplicationAnswer
                isEditable={isEditable}
                value={formData.noOfDogs}
                name="noOfDogs"
                handleChange={handleEdit}
              />
            </span>
          )}
          <div className={styles.flexColumn}>
            <span className={`${styles.formText} ${styles.marginBottom}`}>
              7c- {t?.readApplicationModal?.question7C}
            </span>
            {/* custom checkbox component */}
            <ApplicationCheckboxes
              yesChecked={formData.anyOtherAnimal}
              isEditable={isEditable}
              setYesChecked={() =>
                setFormData({ ...formData, anyOtherAnimal: true })
              }
              noChecked={formData.anyOtherAnimal === false}
              setNoChecked={() =>
                setFormData({ ...formData, anyOtherAnimal: false })
              }
            />
          </div>
          {/* textarea */}
          {formData.anyOtherAnimal && (
            <div className={styles.flexColumn}>
              <span className={`${styles.formText} ${styles.marginBottom}`}>
                7c-1- {t?.readApplicationModal?.question7C1}
              </span>
              <textarea
                type="text"
                rows={5}
                name="anyOtherAnimalNoAndDescription"
                className={styles.formInput2}
                value={formData.anyOtherAnimalNoAndDescription}
                onChange={
                  isEditable
                    ? (e) => handleEdit(e.target.name, e.target.value)
                    : () => {}
                }
              />
            </div>
          )}
        </>
      )}
      {!noButtons && (
        <div className={styles.applicationButtonsWrapper}>
          <div className={styles.editButtonWrapper}>
            <div
              className={`${styles.modalButton} ${styles.rejectButton}`}
              onClick={handleReject}
            >
              <span>{t?.readApplicationModal?.rejectText}</span>
            </div>
            <div
              className={`${styles.modalButton} ${styles.editButton}`}
              onClick={() => setIsEditable(!isEditable)}
            >
              {/* show canel and edit based on edit state */}
              <span>
                {isEditable
                  ? t?.readApplicationModal?.cancelText
                  : t?.readApplicationModal?.editText}
              </span>
            </div>
          </div>
          <div
            className={`${styles.modalButton}`}
            onClick={
              isEditable
                ? () => {
                    setIsEditable(false);
                    handleSave();
                  }
                : handleAccept
            }
          >
            {/* show Save and Accept based on edit state */}
            <span>
              {isEditable
                ? t?.readApplicationModal?.saveText
                : t?.readApplicationModal?.acceptText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationAllQuestions;
