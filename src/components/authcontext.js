import React, { createContext, useContext, useState } from "react";

// AuthContext를 생성합니다.
const AuthContext = createContext();

// AuthProvider를 생성합니다.
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅을 생성하여 AuthContext를 사용할 수 있게 합니다.
export const useAuth = () => {
  return useContext(AuthContext);
};
