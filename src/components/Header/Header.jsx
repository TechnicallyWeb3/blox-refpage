import React from 'react';
import styles from './Header.module.css';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/blox400.jpg" alt="Logo" className={styles.logoImage} />
            </div>
            <DynamicWidget />
        </header>
    );
}

export default Header;