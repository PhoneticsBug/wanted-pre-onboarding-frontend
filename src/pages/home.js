import React, { useState } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <>
      <head>
        <title>Home</title>
      </head>
      <div>
        <h1>Welcome to the Home Page</h1>
        <button onClick={handleClick}>Try me!</button>
      </div>
    </>
  );
};

export default HomePage;
