import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Main from "./Main";
import Profile from "./Profile";
import Detect from "./Detect";

function Remoter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes element={<NavBar />}>
        <Route path="/Footer" element={<Footer />} />
        <Route path="/" element={<Main />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Remoter;
