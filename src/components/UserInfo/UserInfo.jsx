import React, { useState } from 'react';
import styles from './UserInfo.module.css';
import copy from '../../assets/copy.png';
import refresh from '../../assets/refresh-arrow.png';
import userImage from '../../assets/image.png'; // Import the image file
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { uniqueNamesGenerator, adjectives, NumberDictionary } from 'unique-names-generator';

// Function to generate a referral code
const generateReferralCode = () => {
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
  const customConfig = {
    dictionaries: [adjectives, numberDictionary],
    separator: '',
    length: 2,
  };

  return uniqueNamesGenerator(customConfig);
};

function UserInfo() {
  const { isAuthenticated, user } = useDynamicContext();
  const [referralCode, setReferralCode] = useState(generateReferralCode());

  const handleRefresh = () => {
    setReferralCode(generateReferralCode());
  };

  if (!isAuthenticated || !user.userId) {
    return null; // Return nothing if the user is not authenticated or no email/wallet is present
  }

  return (
    <div className={styles.userInfo}>
      <div className={styles.userdetails}>
        <img src={userImage} alt="User" /> {/* Use the imported image here */}
        <p className={styles.name}>{user.firstName} {user.lastName}</p>
        <p>@{user.username}</p>
        <p>{user.email}</p>
      </div>
      <div className={styles.referralCode}>
        <p>Referral Code:</p>
        <div className={styles.refresh_container}>
          <p className={styles.refCode}>{referralCode}</p>
          <button className={styles.neumorphicbtn} onClick={handleRefresh}>
            <img src={refresh} alt="Refresh" />
          </button>
          <button className={styles.neumorphicbtn}>
            <img src={copy} alt="Copy" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;