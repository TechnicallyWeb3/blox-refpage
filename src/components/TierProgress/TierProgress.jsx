import React, { useEffect, useState } from 'react';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import styles from './TierProgress.module.css';

function TierProgress() {
    const { isAuthenticated, user } = useDynamicContext(); // Get authentication and user data
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user?.userId) {
            fetchUserData();
        }
    }, [isAuthenticated, user?.userId]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userData?id=${user.userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setUserData(result);
        } catch (error) {
            console.error('Error fetching points data:', error);
        }
    };

    if (!isAuthenticated || !user?.userId) {
        return <p>Please log in to access the referral program.</p>; // Message when not authenticated
    }

    // Define the points required for each tier
    const pointsPerTier = 5000;

    if (!userData) {
        return <p>Loading...</p>;
    }

    // Get current points from user data
    const currentPoints = userData.total_points || 0;

    // Calculate the current tier based on points
    const currentTier = Math.floor(currentPoints / pointsPerTier) + 1;

    // Calculate the points required for the next tier
    const pointsToNextTier = pointsPerTier * currentTier;

    // Calculate the points required for the current tier
    const pointsForCurrentTier = pointsPerTier * (currentTier - 1);

    // Calculate progress percentage within the current tier
    const progressInCurrentTier = Math.min(
        ((currentPoints - pointsForCurrentTier) / pointsPerTier) * 100,
        100
    );

    // Display the progress for each tier
    return (
        <div className={styles.tierProgress}>
            <p style={{ fontWeight: "700", marginBottom: "10px" }}>Tier {currentTier}</p>
            <div className={styles.neumorphicprogressbar}>
                <div
                    className={styles.progressfill}
                    style={{ width: `${progressInCurrentTier}%` }}
                ></div>
            </div>
            <p className={styles.point}>
                {currentPoints - pointsForCurrentTier}/{pointsPerTier} ({Math.round(progressInCurrentTier)}% points to Tier {currentTier + 1})
            </p>
        </div>
    );
}

export default TierProgress;