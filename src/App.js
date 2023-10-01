// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup.js";
import HomePage from "./pages/home.js";
import Signin from "./pages/signin.js";
import TodoPage from "./pages/todo.js";
import Header from "./components/header.js";
import NotFound from "./components/notfound.js"; // Import the NotFound component

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedIsSignedIn = localStorage.getItem("isSignedIn");
    if (storedIsSignedIn === "true") {
      setIsSignedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true");
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    localStorage.removeItem("isSignedIn");
  };

  return (
    <BrowserRouter>
      <Header isSignedIn={isSignedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setIsSignedIn={handleLogin} />} />
        <Route
          path="/"
          element={isSignedIn ? <TodoPage handleLogout={handleLogout} /> : <HomePage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
