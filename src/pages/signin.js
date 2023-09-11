import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/signin.css";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 패스워드

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  /**
   * 이메일 유효성 검사 함수
   * @param {string} email - 검사할 이메일 주소
   * @returns {boolean} - 유효한 형식인 경우 true 반환
   */
  const validateEmail = (email) => {
    const pattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(String(email).toLowerCase());
  }

// 비밀번호 유효성 검사
const validatePassword = (password) => {
    return password.length >= 8;
};

const onClickSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    axios.post("/api/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        setLoading(false);
        navigate("/dashboard");
        setMsg("Login successful!");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setMsg("Login failed.");
      });
};

const validateForm = () => {
     if (!email || !password) {
         alert("Please input every requirement.");
         return false;
     }

     if (!validateEmail(email)) {
         alert("Please provide a valid email address.");
         return false;
     }
     if (!validatePassword(password)) {
       alert("Password must be equal or longer than 8 characters.");
       return false;
   }
     
     return true;
};

const handleEmailChange = (e) => {
       setEmail(e.target.value);
}

const handlePasswordChange = (e) => {

setPassword(e.target.value);

}

const SignUp = () => {
  navigate("/signup")
}

return (
    <div className="signin-page">
      <div className="input-box">
        <h1 className="signin-title"> Sign in </h1>
          <input 
              data-testid="email-input"
              type="text"
              placeholder="이메일(아이디)"
              value={email}
              className="input-box"
              onChange={handleEmailChange}
          />
          <input 
              data-testid="password-input"
              type="password"
              placeholder="비밀번호"
              value={password}
              className="input-box"
              onChange={handlePasswordChange}
          />
      </div>

      {/* 버튼 클릭 시 onClickSubmit 함수 실행 */}
        <div className="btn-group">
          <button 
          data-testid="login-button" 
          onClick={onClickSubmit}
          disabled={!validateEmail(email)||!validatePassword(password)}
          className="signin-btn"
          >
          로그인
          </button>
          <button
            className="signin-btn"
            onClick={SignUp}>
            회원가입
          </button>
        </div>
      </div>
 );
};

export default Signin;

