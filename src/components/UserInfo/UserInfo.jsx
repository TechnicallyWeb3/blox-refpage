import React from 'react';
import styles from './UserInfo.module.css';
import copy from '../../assets/copy.png'
import refresh from '../../assets/refresh-arrow.png'
import user from '../../assets/image.png'
function UserInfo() {
    return (
        <div className={styles.userbox}>
            
            <div className={styles.userInfo}>
                <div className={styles.userdetails}>
                    <img src={user} alt="" />
                    <p className={styles.name}>Chris Hash</p>
                    <p>@chrishash</p>
                </div>
                <div className={styles.referralCode}>
                    <p>Referral Code:</p>
                    <div className={styles.refresh_container}>
                        <p className={styles.refCode}>CLOUD420</p>
                        <button className={styles.neumorphicbtn}><img src={refresh} alt="" /></button>
                        <button className={styles.neumorphicbtn}><img src={copy} alt="" /></button>

                    </div>
                </div>
            </div>



        </div>
    );
}

export default UserInfo;
