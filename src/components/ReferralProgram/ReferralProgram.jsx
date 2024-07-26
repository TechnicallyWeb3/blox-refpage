import React from 'react';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import styles from './ReferralProgram.module.css';
import UserInfo from '../UserInfo/UserInfo';
import ReferralStats from '../ReferralStats/ReferralStats';
import TierProgress from '../TierProgress/TierProgress';
import PointHistory from '../PointHistory/PointHistory';
import blob from '../../assets/blob.jpg'
function ReferralProgram() {
    const { isAuthenticated, user } = useDynamicContext();

    if (!isAuthenticated || !user?.userId) {
        return <p>Please log in to access the referral program.</p>; // Optional: Provide a message or redirect
    }

    return (
        <div className={styles.container}>
            {/* <h2>Blox Referral Program</h2>
            <p >Sign up, refer friends, earn points!</p> */}
            {/* isSplineLoaded={isSplineLoaded} setIsSplineLoaded={setIsSplineLoaded} */}
            <div style={{ textAlign: "center" }}>
                <p style={{ marginTop: "25px", fontWeight: "600", fontSize: "24px" }}>
                    Hi {user?.firstName}, check out all your rewards!
                </p>
            </div>
            <UserInfo />
            <ReferralStats />
            <TierProgress />
            <PointHistory />
        </div>
    );
}

export default ReferralProgram;
