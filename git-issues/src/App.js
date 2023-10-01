import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

// pages
import MainPage from './pages/index.js'

// components
import Header from './components/header.js'
import Footer from './components/footer.js'

const App = () => {
  const [isValid, setIsValid] = useState("");

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        {/* <Route path="" element={}/> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};
export default App;
