import React, { useState } from "react";
import { useNavigate } from "react-router";

import "../styles/home.css"

const HomePage = () => {
  const navigate = useNavigate();

  const LoginButton = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="main-box">
        <h1 className="title-holder">My Todo List</h1>
        <di className="descriptions">
          <h3> This is a service for managing your todo list. </h3>
          <span> you have to log in to this website if you want to use it. </span>
        </di>
        <button 
          onClick={LoginButton}
          className="signin-btn">
             <strong>Sign in</strong> 
        </button>
      </div>
    </>
  );
};

export default HomePage;
