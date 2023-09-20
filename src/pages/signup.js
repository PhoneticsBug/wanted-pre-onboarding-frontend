import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 패스워드
  const [passwordCheck, setPasswordCheck] = useState(""); // 패스워드 확인
  const [name, setName] = useState(""); // 이름

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  /**
   * 이메일 유효성 검사 함수
   * @param {string} email - 검사할 이메일 주소
   * @returns {boolean} - 유효한 형식인 경우 true 반환
   */
  function validateEmail(email) {
    const pattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(String(email).toLowerCase());
  }

  function onClickSubmit() {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => {
        if (response.status === 400) { 
          alert("이메일이 이미 존재합니다.");
          throw new Error("Email already exists.");
        }
      })
      .then(() => {
        setLoading(false);

        navigate("/");
        setMsg("Signup successful!");

        alert("가입이 완료되었습니다.");
      })
      .catch((error) => {
        setLoading(false);

        console.error(error);

        if (error.message === "Email already exists.") { 
          setMsg(error.message);
        } else if (error instanceof SyntaxError && error.message.includes("JSON")) {
          setMsg("Invalid JSON response from the server.");
        } else {
          setMsg("Signup failed.");
        }
      });
  }

  function validateForm() {
    if (!email || !password || !name || !passwordCheck) {
      alert("Please input every requirement.");
      return false;
    }

    if (!validateEmail(email)) {
      alert("Please provide a valid email address.");
      return false;
    }

    if (password !== passwordCheck) {
      alert("Please make sure your password is right.");
      return false;
    }

    return true;
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePasswordCheckChange(e) {
    setPasswordCheck(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <div className="signup-page">
      <h1 className="signup-title"> Sign Up </h1>
      <div className="signup-form">
        <input
          data-testid="email-input"
          type="text"
          placeholder="이메일(아이디)"
          value={email}
          onChange={handleEmailChange}
          className="signup-box"
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          className="signup-box"
        />
        <input
          data-testid="password-check-input"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          className="signup-box"
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          className="signup-box"
        />
      </div>
      <button
        data-testid="signup-button"
        onClick={onClickSubmit}
        className="signup-confirm-btn"
      >
        회원가입
      </button>
    </div>
  );
}

export default Signup;
