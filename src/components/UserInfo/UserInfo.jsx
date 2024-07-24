import React from 'react';
import styles from './UserInfo.module.css';

function UserInfo() {
    return (
        <div className={styles.userInfo}>
            <div>
                <p>Chris Hash</p>
                <p>@chrishash</p>
            </div>
            <div className={styles.referralCode}>
                <p>Referral Code:</p>
                <div className={styles.refresh_container}>
                    <p>CLOUD420</p>
                    <button>Refresh code</button>
                    <button>Copy code</button>

                </div>
            </div>
        </div>
    );
}

export default UserInfo;
