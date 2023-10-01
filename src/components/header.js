import React from "react";
import { Link } from "react-router-dom";

import "../styles/header.css"

const Header = ({ isSignedIn, handleLogout }) => {
  return (
    <div className="header-wrapper">
        <Link to="/" className="logo">
        <button
          className="logo">
            My Plans</button>
        </Link>
      {isSignedIn ? (
        <button 
          onClick={handleLogout}
          className="sign-out">Sign Out</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
