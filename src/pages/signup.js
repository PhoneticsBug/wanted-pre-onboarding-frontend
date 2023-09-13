import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  }

  const onClickSubmit = () => {
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    fetch('https://www.pre-onboarding-selection-task.shop/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        
        // 응답에 따른 로직 추가
        if (data.success) { // success 필드가 있다고 가정
          navigate("/home");
          setMsg("Signup successful!");
        } else {
          throw new Error(data.message || "Signup failed.");
        }
        
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setMsg("Signup failed.");
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

 const handleEmailChange = (e) => {
       setEmail(e.target.value);
 }

 const handlePasswordChange = (e) => {
       setPassword(e.target.value);
}

const handlePasswordCheckChange = (e) => {
       setPasswordCheck(e.target.value);
}

const handleNameChange = (e) => {
       setName(e.target.value);
}


   
return (
  
 <div className="signup-page">
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
   <input 
      data-testid="password-check-input"
      type="password"
      placeholder="비밀번호 확인"
      value={passwordCheck}
      onChange={handlePasswordCheckChange}
   />
<input 
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
/>

{/* 버튼 클릭 시 onClickSubmit 함수 실행 */}
<button 
        data-testid="signup-button" 
        onClick={onClickSubmit}
>
회원가입
</button>
</div>
 );
};

export default Signup;

