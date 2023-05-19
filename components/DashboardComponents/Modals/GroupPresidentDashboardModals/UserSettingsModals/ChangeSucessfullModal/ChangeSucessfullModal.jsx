import React from 'react'
import Image from 'next/image'
import styles from '../../../../../../styles/ReadEmailModal.module.css'

const ChangeSucessfullModal = ({closeModal}) => {
  return (
    <div className={styles.container}>
    <div className={styles.modalContainer}>
      <div className={styles.closeDeleteModalImage}>
        <Image
          src="/closeBlack.png"
          alt="cross"
          height="21px"
          width="19px"
          objectFit="contain"
          onClick={closeModal}
        />
      </div>
      <div className={styles.deleteTextContainer}>
        <span className={styles.deleteText}>
        Congratulations, You’re now secondary contact of<br/> group number 1
        </span>
      </div>
    </div>
  </div>
  )
}

export default ChangeSucessfullModal