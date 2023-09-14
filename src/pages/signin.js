import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/signin.css";

const Signin = ({ setIsSignedIn }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 패스워드

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // 이메일 유효성 검사
  const isPasswordValid = password.length >= 8; // 비밀번호 유효성 검사

  const onClickSubmit = () => {
    if (!isEmailValid || !isPasswordValid) {
      alert("Please enter a valid email and password.");
      return;
    }
  
    axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        // 액세스 토큰을 받은 후 로컬 스토리지에 저장
        const access_token = response.data.access_token;
        localStorage.setItem("access_token", access_token); // 액세스 토큰을 로컬 스토리지에 저장
  
        setIsSignedIn(true); // 로그인 상태 업데이트
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Please check your email or password");
      });
  };
  

  const SignUp = () => navigate("/signup");

  return (
    <div className="signin-page">
      <div className="input-box">
        <h1 className="signin-title"> Sign in </h1>
        <input
          data-testid="email-input"
          type="text"
          placeholder="이메일(아이디)"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
         />
       </div>

       {/* 버튼 클릭 시 onClickSubmit 함수 실행 */}
       <div className="btn-group">
         <button
           data-testid="signin-button"
           onClick={onClickSubmit}
           disabled={!isEmailValid || !isPasswordValid} // 유효성 검사 결과에 따라 버튼 비활성화 처리
         >
           로그인
         </button>
         <button data-testid="signup-button" onClick={SignUp}>
           회원가입
         </button>
       </div>
     </div>
   );
};

export default Signin;
