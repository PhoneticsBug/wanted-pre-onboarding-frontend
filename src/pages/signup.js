import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/signup.css"

const Signup = () => {
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
  const validateEmail = (email) => {
    // 간단한 이메일 정규식 패턴 사용
    const pattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(String(email).toLowerCase());
  };

  const onClickSubmit = () => {
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
        if (response.status === 400) { // Bad Request (이미 존재하는 이메일)
          alert("이메일이 이미 존재합니다.");
          throw new Error("Email already exists.");
        }
        
        // return response.json();
      })
      .then(() => {
        setLoading(false);
        
        navigate("/home");
        setMsg("Signup successful!");
        
        alert("가입이 완료되었습니다.");
      })
      .catch((error) => {
        setLoading(false);
        
        console.error(error);
        
         if (error.message === "Email already exists.") { // 이미 존재하는 이메일인 경우
           setMsg(error.message);
         } else if (error instanceof SyntaxError && error.message.includes("JSON")) {
           setMsg("Invalid JSON response from the server.");
         } else {
           setMsg("Signup failed.");
         }
       });
   };
  
  
  

  const validateForm = () => {
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
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  
const handlePasswordChange=(e)=>setPassword(e.target.value);

const handlePasswordCheckChange=(e)=>setPasswordCheck(e.target.value);

const handleNameChange=(e)=>setName(e.target.value);


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

{/* 버튼 클릭 시 onClickSubmit 함수 실행 */}
<button 
         data-testid="signup-button" 
         onClick={onClickSubmit}
         className="signup-confirm-btn">
회원가입
</button>
</div>
 );
};

export default Signup;

