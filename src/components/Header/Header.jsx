import React from 'react';
import styles from './Header.module.css';

import {
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import logo from '../../assets/BLOXlogo.svg'


function Header() {
    return (
        <header className={styles.header}>

            <div className={styles.logos}><img src={logo} alt="" /></div>
            <DynamicWidget />


        </header>
    );
}

export default Header;