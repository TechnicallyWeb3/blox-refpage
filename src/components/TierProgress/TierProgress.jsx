import React from 'react';
import styles from './TierProgress.module.css';

function TierProgress() {
    return (
        <div className={styles.tierProgress}>
            <p style={{fontSize:"30px",fontWeight:"700",marginBottom:"10px"}}>Tier 1</p>
            <div className={styles.neumorphicprogressbar}>
                <div className={styles.progressfill} style={{ width: '20%' }}></div>
            </div>
            <p className={styles.point}>1024/5000 (20% points to Tier 2)</p>
        </div>
    );
}

export default TierProgress;
