import React, { useEffect, useState } from 'react';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import styles from './ReferralStats.module.css';
import point from "../../assets/reward.png"

function ReferralStats() {
    const { isAuthenticated, user } = useDynamicContext(); // Get authentication and user data
    const [referralData, setReferralData] = useState(null);
    const [referralCodeData, setReferralCodeData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user?.userId) {
            fetchReferralData();
            fetchReferralCodeData();
            fetchUserData(); // Fetch points data
        }
    }, [isAuthenticated, user?.userId]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/userData?id=${user.userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setUserData(result);
        } catch (error) {
            console.error('Error fetching points data:', error);
        }
    };

    const fetchReferralData = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/referralData?id=${user.userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setReferralData(result);
        } catch (error) {
            console.error('Error fetching referral data:', error);
        }
    };

    const fetchReferralCodeData = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/referralCodeData?id=${user.userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setReferralCodeData(result);
        } catch (error) {
            console.error('Error fetching referral code data:', error);
        }
    };

    if (!isAuthenticated || !user?.userId) {
        return <p>Please log in to access the referral program.</p>; // Message when not authenticated
    }

    // Calculate total referrals by summing direct and indirect referrals
    const directReferrals = referralData?.direct_referrals || 0;
    const indirectReferrals = referralData?.indirect_referrals || 0;
    const totalReferrals = directReferrals + indirectReferrals;

    return (
        <div className={styles.referralStats}>
            {!referralData || !referralCodeData || !userData ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.statsContainer}>
                    <div className={styles.container}>
                        <div className={styles.box}>
                            <div className={styles.header}>Referrals</div>
                            <div className={styles.boxItem}>
                                <div>Direct Referrals</div>
                                <div>{directReferrals}</div>
                            </div>
                            <div className={styles.boxItem}>
                                <div>Indirect Referrals</div>
                                <div>{indirectReferrals}</div>
                            </div>
                            <div className={styles.boxItem}>
                                <div>Total Referrals</div>
                                <div>{totalReferrals}</div>
                            </div>
                        </div>
                    </div>

            <div className={styles.stats}>
                <div className={styles.wrapper}>
                    <p className={styles.point}>Points</p>
                    <div className={styles.points}>
                    <p>{userData.total_points || 0}</p> {/* Display points here */}
                    <img src={point} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferralStats;