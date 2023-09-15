import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);

    if (userIsLoggedIn) {
      navigate("/todo");
    }
  }, [navigate]);

  const LoginButton = () => {
    return (
      <button
        onClick={() => navigate("/signin")}
        className="signin-btn"
      >
        Sign in
      </button>
    );
  };

  return (
    <>
      <div className="main-box">
        <h1 
          className="title-holder"> 
          My Plans </h1>
        <div className="descriptions">
          <h3> You can manage your todo-list via using this service. </h3>
          <span> Sign in is required for using this website </span>
        </div>
        {!isLoggedIn && <LoginButton />}
      </div>
    </>
  );
};

export default HomePage;
