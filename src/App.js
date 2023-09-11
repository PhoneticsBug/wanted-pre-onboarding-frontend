import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// 페이지
import Signup from "./pages/signup.js";
import HomePage from "./pages/home.js";
import Signin from "./pages/signin.js";
import TodoPage from "./pages/todo.js";

function App() {
  const isLoggedIn = false; // 로그인 상태를 나타내는 변수 (임시 값)
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 관련 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* 사용자 페이지 */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<TodoPage />} /> {/* sLoggedIn ? <TodoPage /> : <Navigate to="/home" /> */}
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
