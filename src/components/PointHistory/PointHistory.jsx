import React from 'react';
import styles from './PointHistory.module.css';

function PointHistory() {
    return (
        <div className={styles.pointHistory}>
            <p style={{ marginBottom: "25px", fontWeight: "700",fontSize:"30px" }}>Point History</p>
            <div className={styles.chart}>Chart</div>
        </div>
    );
}

export default PointHistory;
