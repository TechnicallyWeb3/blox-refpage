import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/BLOXlogo.svg'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logos}><img src={logo} alt="" /></div>
            <button className={styles.loginBtn}>Login/Signup</button>
        </header>
    );
}

export default Header;
