// HomePage.js

import React from 'react';
import './Home.css'; // Import CSS for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="navbar">
        <div className="logo">Logo Placeholder</div>
        <div className="nav-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
      <div className="contents">
        <header>
          <h1>Blox Referral Program</h1>
        </header>
        <p>Signup, refer friends</p>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="grid username">User Name</div>
            </div>
            <div className="column">
              <div className="grid referral-code">Referral Code</div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="grid points">
                <div className="">Grid 1</div>
                <div className="">Grid 2</div>
                <div className="">Grid 3</div>
                <div className="">Grid 4</div>
              </div>
            </div>
            <div className="column">
              <div className="grid user-points">Points</div>
            </div>
          </div>
          <div className="row progress-bar">
            <div className="grid">Progress Bar</div>
          </div>
          <div className="row chart">
            <div className="grid">Chart</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
