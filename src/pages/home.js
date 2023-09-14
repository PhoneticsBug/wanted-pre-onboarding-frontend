import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 여기서 로그인 정보를 확인하고 로그인되어 있는지 여부를 업데이트합니다.
    // 예를 들어, 로컬 스토리지 또는 쿠키를 사용하여 로그인 상태를 확인할 수 있습니다.
    // 이 예제에서는 간단하게 true 또는 false 값을 사용하겠습니다.
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);

    // 만약 로그인되어 있다면, /todo 페이지로 리다이렉트합니다.
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
        <h1 className="title-holder">My Todo List</h1>
        <div className="descriptions">
          <h3> This is a service for managing your todo list. </h3>
          <span> you have to log in to this website if you want to use it. </span>
        </div>
        {!isLoggedIn && <LoginButton />}
      </div>
    </>
  );
};

export default HomePage;
