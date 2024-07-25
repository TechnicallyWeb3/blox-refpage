import React from 'react';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import styles from './ReferralProgram.module.css';
import UserInfo from '../UserInfo/UserInfo';
import ReferralStats from '../ReferralStats/ReferralStats';
import TierProgress from '../TierProgress/TierProgress';
import PointHistory from '../PointHistory/PointHistory';

function ReferralProgram() {
    const { isAuthenticated, user } = useDynamicContext();

    if (!isAuthenticated || !user?.userId) {
        return <p>Please log in to access the referral program.</p>; // Optional: Provide a message or redirect
    }

    return (
        <div className={styles.container}>
            <h2>Blox Referral Program</h2>
            <p>Sign up, Refer Friends, Earn Points!</p>
            <p style={{ marginTop: "25px", fontWeight: "600" }}>
                Hi {user?.firstName}, Check Out All Your Rewards!
            </p>
            <UserInfo />
            <ReferralStats />
            <TierProgress />
            <PointHistory />
        </div>
    );
}

export default ReferralProgram;
