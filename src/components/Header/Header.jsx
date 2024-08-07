import React from 'react';
import styles from './Header.module.css';

import {
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import logo from '../../assets/BLOXlogo.svg'


function Header() {
    return (
        <header className={styles.header}>
            <a href="https://bloxsolutions.app">
                <button className="appBtn">
                    Go To App
                </button>
            </a>
            <DynamicWidget />
        </header>
    );
}

export default Header;