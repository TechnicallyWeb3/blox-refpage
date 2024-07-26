import React, { useState, useEffect } from 'react';
import style from "./landing.module.css";
import Spline from '@splinetool/react-spline';
import img from '../../assets/reed1.png';
import img1 from '../../assets/reed-mob1.png';

export default function Landing() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={style.app}>
      <div className={style.content}>
        <div className={style.spline}>
          {isMobile ? (
            <img src={img1} alt="Mobile Image" />
          ) : (
            // <Spline scene="https://prod.spline.design/OMnkCZ5C5v-pP3n6/scene.splinecode" />
            <img src={img} alt="Mobile Image" />

          )}
        </div>
      </div>
    </div>
  );
}
