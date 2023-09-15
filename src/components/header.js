import React from "react";

import "../styles/header.css"

const Header = ({ isSignedIn, handleLogout }) => {
  return (
    <div className="header-wrapper">
        <h1
          className="logo"> My Plans </h1>
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
