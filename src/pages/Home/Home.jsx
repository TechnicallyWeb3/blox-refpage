import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ReferralProgram from '../../components/ReferralProgram/ReferralProgram';
import styles from "./Home.module.css";
import Landing from './landing';

function Home() {

  return (
    <>
    <div className={styles.Home}>
    <Header />
    <Landing/>
    <ReferralProgram />
    </div>
  </>
  );
}

export default Home;
