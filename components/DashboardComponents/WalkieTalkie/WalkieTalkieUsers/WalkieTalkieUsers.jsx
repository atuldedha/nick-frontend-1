import React from "react";
import styles from "../../../../styles/WalkieTalkie.module.css";
import data from "./staticData";

const WalkieTalkieUsers = () => {
  return (
    <div className={styles.usersSection}>
      <div className={styles.usersContainer}>
        <div className={styles.usersSectionHeader}>
          <span className={styles.headerText}>Members</span>
          <span className={styles.headerText}>Status</span>
        </div>
        <div className={styles.parent}>
          {data?.map((user) => (
            <div key={user.id} className={styles.usersRow}>
              <span className={styles.usersText}>{user.username}</span>
              <div className={styles.availabilityWrapper}>
                <div className={styles.online} />
                <span className={styles.availabilityText}>
                  {user.availability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalkieTalkieUsers;
