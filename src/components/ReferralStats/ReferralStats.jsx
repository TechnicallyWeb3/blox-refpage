import React from 'react';
import styles from './ReferralStats.module.css';
import point from "../../assets/reward.png"

function ReferralStats() {
    return (
        <div className={styles.referralStats}>
            <div className={styles.container}>
                <div className={styles.header}>Referrals</div>

                <div className={styles.box}>
                    <div className={styles.boxItem}>
                        <div>Direct Referrals</div>
                        <div>1</div>
                    </div>
                    <div className={styles.boxItem}>
                        <div>Total Referrals</div>
                        <div>2</div>
                    </div>
                    <div className={styles.boxItem}>
                        <div>Indirect Referrals</div>
                        <div>3</div>
                    </div>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.wrapper}>
                    <p className={styles.point}>Points</p>
                    <div className={styles.points}>
                        <p>1024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferralStats;
