import React from 'react';
import styles from './ReferralProgram.module.css';
import UserInfo from '../UserInfo/UserInfo';
import ReferralStats from '../ReferralStats/ReferralStats';
import TierProgress from '../TierProgress/TierProgress';
import PointHistory from '../PointHistory/PointHistory';
import blob from '../../assets/blob.jpg'
import Landing from './landing';
function ReferralProgram() {
    return (
        <div className={styles.container}>
            {/* <h2>Blox Referral Program</h2>
            <p >Sign up, refer friends, earn points!</p> */}
            <Landing />
            <div className={styles.content}>
            <UserInfo />
            <ReferralStats />
            <TierProgress />
            <PointHistory />
            </div>
           
        </div>
    );
}

export default ReferralProgram;
