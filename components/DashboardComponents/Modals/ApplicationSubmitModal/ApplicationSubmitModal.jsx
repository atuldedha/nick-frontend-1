import React from 'react'
import styles from '../../../../styles/ApplicationForm.module.css'
import Link from 'next/link'
const ApplicationSubmitModal = ({closeModal}) => {
  return (
    <div className={styles.container}>
    <div className={styles.modalContainer}>
      <div className={styles.imgContainer}>
        <img src='/done.png'/>
      </div>
        <div className={styles.modalHeadingContainer}>
        <span className={styles.modalHeading}>Your Application </span>
<span className={styles.modalHeading}>has been Submitted</span>
</div>
        <h3 className={styles.heading}>Waiting for approval</h3>
        <Link href='/dashboard'>
        <a>
      <button className={styles.submitButton} onClick={closeModal}>Done</button>
      </a>
      </Link>
    </div>
  </div>
  )
}

export default ApplicationSubmitModal