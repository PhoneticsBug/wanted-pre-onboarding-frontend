import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup.js";
import HomePage from "./pages/home.js";
import Signin from "./pages/signin.js";
import TodoPage from "./pages/todo.js";
import Header from "./components/header.js"; // Import the Header component

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 로그인 상태를 확인하고 설정합니다.
    const storedIsSignedIn = localStorage.getItem("isSignedIn");
    if (storedIsSignedIn === "true") {
      setIsSignedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsSignedIn(true);
    // 로그인 상태를 로컬 스토리지에 저장합니다.
    localStorage.setItem("isSignedIn", "true");
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    // 로그아웃 시 로컬 스토리지에서 로그인 상태를 제거합니다.
    localStorage.removeItem("isSignedIn");
  };

  return (
    <BrowserRouter>
      <Header isSignedIn={isSignedIn} handleLogout={handleLogout} />
      <Routes>
        {/* 로그인 관련 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setIsSignedIn={handleLogin} />} />
        {/* 사용자 페이지 */}
        <Route
          path="/"
          element={isSignedIn ? <TodoPage handleLogout={handleLogout} /> : <HomePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
