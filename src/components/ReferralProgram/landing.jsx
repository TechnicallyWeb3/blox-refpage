import React, { useState, useEffect } from 'react';
import style from "./ReferralProgram.module.css";
import Spline from '@splinetool/react-spline';
import img from '../../assets/reed.png'
export default function Landing() {

  function onLoad(spline) {
    console.log("LOADed");
  }

  return (
    <div className={style.app}>
  
        <div className={style.content}>
          <div className={style.spline}>
            <img src={img}></img>
            {/* <Spline scene="https://prod.spline.design/OMnkCZ5C5v-pP3n6/scene.splinecode" onLoad={onLoad} /> */}
          </div>
        </div>
    </div>
  );
}
