import React from 'react';
import styles from './PointHistory.module.css';
import chartImage from '../../assets/chart.png'; // Import the image file

function PointHistory() {
    return (
        <div className={styles.pointHistory}>
            <p style={{ marginBottom: "25px", fontWeight: "700", fontSize: "20px" }}>Point History</p>
            <div className={styles.chart}>
                {/* <img src={chartImage} alt="Chart" className={styles.chartImage} /> */}
                <div className={styles.overlay}>
                    <p className={styles.overlayText}>COMING SOON</p>
                </div>
            </div>
        </div>
    );
}

export default PointHistory;