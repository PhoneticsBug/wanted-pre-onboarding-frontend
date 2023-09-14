import React from "react";

const Header = ({ isSignedIn, handleLogout }) => {
  return (
    <div>
      {isSignedIn ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <button>Log In</button>
      )}
    </div>
  );
};

export default Header;
