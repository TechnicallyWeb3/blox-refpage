import React, { useState, useEffect } from 'react';
import style from "./ReferralProgram.module.css";
import Spline from '@splinetool/react-spline'; // Import Spline directly

export default function Landing() {
 

  return (
    <div className={style.app}>
  
        <div className={style.content}>
          <div className={style.spline}>
            <Spline scene="https://prod.spline.design/OMnkCZ5C5v-pP3n6/scene.splinecode" />
          </div>
        </div>
    </div>
  );
}
