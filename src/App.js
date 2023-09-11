import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// 페이지
import Signup from "./pages/signup.js";
import HomePage from "./pages/home.js";
import Login from "./pages/login.js";
import TodoPage from "./pages/todo.js";

function App() {
  const isLoggedIn = false; // 로그인 상태를 나타내는 변수 (임시 값)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<TodoPage />} /> {/* sLoggedIn ? <TodoPage /> : <Navigate to="/home" /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;



// const HeaderWrapper = () => (
//   <>
//     <Outlet />
//   </>
// );
// // eslint-disable-next-line import/no-anonymous-default-export
// export default () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HeaderWrapper />}>
//           {/* 회원 O */}
          
//           {/* 회원 X */}
//           {/* <Route path="inquiry/id" element={auth(Findid, false)} />
//           <Route path="inquiry/pw" element={auth(FindPw, false)} /> */}
//           <Route path="signup" element={auth(Signup, false)} />
//           {/* <Route path="login" element={auth(Login, false)} /> */}
//           {/* anybody */}

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };