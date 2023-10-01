import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

// pages
import MainPage from './pages/index.js'

// components
import Header from './components/header.js'
import Footer from './components/footer.js'
import { ThemeProvider } from "./context/themeProvider";
import { GlobalStyle } from "./theme/GlobalStyle";
// theme이 작동하지 않으므로 현재는 사용 X

const App = () => {

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
