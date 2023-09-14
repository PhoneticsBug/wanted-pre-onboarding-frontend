import React from "react";

const Header = ({ isSignedIn, handleLogout }) => {
  return (
    <div>
        <p> logo here</p>
      {isSignedIn ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button>Sign In</button>
      )}
    </div>
  );
};

export default Header;
