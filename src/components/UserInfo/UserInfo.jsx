import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserInfo.module.css';
import copy from '../../assets/copy.png';
import refresh from '../../assets/refresh-arrow.png';
import userImage from '../../assets/image.png';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");

  // Function to generate a new referral code and link
  const generateNewReferralCode = () => {
    const newCode = generateReferralCode();
    setReferralCode(newCode);
    setReferralLink(`http://localhost:5173/?referralCode=${newCode}`);
    return newCode;
  };

  const handleAddUser = async (id, code) => {
    try {
      const response = await fetch('http://localhost:4001/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({ id, referralCode: code })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSetCode = async (id, newCode, oldCode) => {
    try {
      const response = await fetch('http://localhost:4001/api/setReferralCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({ id, oldReferralCode: oldCode, newReferralCode: newCode })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async () => {
    if (isAuthenticated && user?.userId) {
      const newCode = generateNewReferralCode();
      await handleAddUser(user.userId, newCode);
    }
  };

  const handleRefresh = async () => {
    const newCode = generateNewReferralCode();
    const oldCode = referralCode;
    if (isAuthenticated && user?.userId) {
      await handleSetCode(user.userId, newCode, oldCode);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Copied to clipboard'))
      .catch(err => console.error('Failed to copy:', err));
  };

    const fetchUserData = async () => {
      try {
        console.log(`Fetching data for ${user?.userId}`)
        const response = await axios.get(`http://localhost:4001/api/userData?id=${user?.userId}`);
        if (response.data && !response.data.error) {
          console.log("User data found.");
        } else {
          handleRegister();
          console.log("User registered.");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        handleRegister();
      }
    };

  const fetchReferralCodeData = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/referralCodeData?id=${user?.userId}`);
      if (response.data && !response.data.error) {
        console.log(response.data.referral_code);
        setReferralCode(response.data.referral_code);
        setReferralLink(`http://localhost:5173/?referralCode=${response.data.referral_code}`);
      } else {
        await handleRefresh();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      await handleRefresh();
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.userId && !isLoggedIn) {
      setIsLoggedIn(true);
      fetchUserData();
      fetchReferralCodeData();
      console.log("Logged In");
    }
  }, [isAuthenticated, user, isLoggedIn]);

  if (!isAuthenticated || !user.userId) {
    return null; // Return nothing if the user is not authenticated or no email/wallet is present
  }

  return (
      <div className={styles.userbox}>
    <div className={styles.userInfo}>
      <div className={styles.userdetails}>
        <img src={userImage} alt="User" />
        <p className={styles.name}>{user.firstName} {user.lastName}</p>
        <p>@{user.username}</p>
        <p>{user.email}</p>
      </div>
      <div className={styles.referralCode}>
        <p>User Info</p>
        <div className={styles.refresh_container}>
          <p className={styles.refCode}>{referralCode}</p>
          <button className={styles.neumorphicbtn} onClick={handleRefresh}>
            <img src={refresh} alt="Refresh" />
          </button>
          <button className={styles.neumorphicbtn} onClick={() => copyToClipboard(referralLink)}>
            <img src={copy} alt="Copy" />
          </button>
        </div>
        {referralLink && <p className={styles.referralLink}>Referral Link: <a href={referralLink}  className={styles.referralLink}>{referralLink}</a></p>}
      </div>
    </div>
</div>
  );
}

export default UserInfo;
