import React from 'react';
import styles from './Header.module.css';
import {
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Logo</div>
            <DynamicWidget />
        </header>
    );
}

export default Header;
