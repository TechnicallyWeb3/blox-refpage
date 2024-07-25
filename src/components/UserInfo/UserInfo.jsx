import React from 'react';
import styles from './UserInfo.module.css';
import copy from '../../assets/copy.png'
import refresh from '../../assets/refresh-arrow.png'
import user from '../../assets/image.png'
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function UserInfo() {
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();

  if (!isAuthenticated || !(user?.email || primaryWallet)) {
    return null; // Return nothing if the user is not authenticated or no email/wallet is present
  }

  return (
    <div className={styles.userdetails}>
      <div className={styles.userInfo}>
        <img src={user} alt="" />
        <div>
          <p className={styles.name}>Hi! {user?.firstName} {user?.lastName}</p>
          <p className={styles.name}>{user?.username}</p>
        </div>
      </div>

            <div className={styles.referralCode}>
                <p>Referral Code:</p>
                <div className={styles.refresh_container}>
                    <p className={styles.refCode}>CLOUD420</p>
                    <button className={styles.neumorphicbtn}><img src={refresh} alt="" /></button>
                    <button className={styles.neumorphicbtn}><img src={copy} alt="" /></button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
