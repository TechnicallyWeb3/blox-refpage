import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Logo</div>
            <button className={styles.loginBtn}>Login/Signup</button>
        </header>
    );
}

export default Header;
