import React from 'react';
import styles from './UserInfo.module.css';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function UserInfo() {
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();

  if (!isAuthenticated || !(user?.email || primaryWallet)) {
    return null; // Return nothing if the user is not authenticated or no email/wallet is present
  }

  return (
    <div>
      <div className={styles.userInfo}>
        <div>
          <p className="text-lg font-bold mb-2">Hi! {user?.firstName} {user?.lastName}</p>
          <p className="text-lg font-bold mb-2">{user?.username}</p>
        </div>
      </div>

      <div className={styles.referralCode}>
        <p>Referral Code:</p>
        <div className={styles.refresh_container}>
          <p>CLOUD420</p>
          <button>Refresh code</button>
          <button>Copy code</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
