import React from 'react';
import styles from './Header.module.css';

import {
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import logo from '../../assets/BLOXlogo.svg'


function Header() {
    return (
        <header className={styles.header}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://bloxsolutions.app">
                    <button className="appBtn">
                        Go To App
                    </button>
                </a>
                <a href="https://buy.stripe.com/cN2g20gbXfyZdKE3cc">
                    <button className="appBtn">
                        Blox Presale
                    </button>
                </a>
            </div>

            <DynamicWidget />
        </header>
    );
}

export default Header;