import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const referrerCode = "ABCDE"

  // const location = useLocation();

  const handleAddUser = async (id, code) => {
    fetch('http://localhost:4001/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ id: id, referralCode: code })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleSetCode = async (id, newCode, oldCode) => {
    fetch('http://localhost:4001/api/setReferralCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ id: id, oldReferralCode: oldCode, newReferralCode: newCode })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleRegister = () => {
    if (isAuthenticated && user?.userId) {
      handleAddUser(user.userId, referrerCode)
    }

    setReferralCode(newCode);
    return newCode;
  };

  const handleRefresh = () => {
    const newCode = generateReferralCode();
    const oldCode = referralCode;
    if (isAuthenticated && user?.userId) {
      handleSetCode(user.userId, newCode, oldCode)
    }

    setReferralCode(newCode);
    return newCode;
  };

  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    // const urlReferralCode = searchParams.get('referralCode');
    // const referralCode = urlReferralCode ? urlReferralCode : "";

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
        } else {
          handleRefresh();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        handleRefresh();
      }
    };

    if (isAuthenticated && user?.userId && !isLoggedIn) {
      setIsLoggedIn(true);
      fetchUserData();
      fetchReferralCodeData();
      console.log("Logged In");
    }
  }, [isAuthenticated, user, isLoggedIn]);

  // useEffect(() => {
  //   if (isAuthenticated && user?.userId && !isLoggedIn) {
  //     setIsLoggedIn(true);

  //     axios.get(`http://localhost:4001/api/getUserData?id=${user?.userId}`)
  //       .then(response => {
  //         if (!response.error) {
  //           console.log("User data found.")
  //         } else {
  //           handleRegister();
  //           console.log("User registered.")
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //       });

  //     axios.get(`http://localhost:4001/api/getReferralCodeData?id=${user?.userId}`)
  //       .then(response => {
  //         if (!response.error) {
  //           console.log(response.referral_code);
  //           setReferralCode(response.referral_code);
  //         } else {
  //           handleRefresh();
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //       });

  //     console.log("Logged In")
  //   }
  // }, []);

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