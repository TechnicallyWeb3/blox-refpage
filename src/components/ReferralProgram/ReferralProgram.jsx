import React from 'react';
import styles from './ReferralProgram.module.css';
import UserInfo from '../UserInfo/UserInfo';
import ReferralStats from '../ReferralStats/ReferralStats';
import TierProgress from '../TierProgress/TierProgress';
import PointHistory from '../PointHistory/PointHistory';

function ReferralProgram() {
    return (
        <div className={styles.container}>
            <h2>Blox Referral Program</h2>
            <p >Sign up, refer friends, earn points!</p>
            <p style={{ marginTop: "25px",fontWeight:"600" }}>Hi Chris, check out all your rewards!</p>
            <UserInfo />
            <ReferralStats />
            <TierProgress />
            <PointHistory />
        </div>
    );
}

export default ReferralProgram;
