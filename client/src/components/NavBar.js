import React from "react";
import { useEffect, useState } from "react";
import "./NavBar.css";
import metadata from "../data/metadata.json";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="app-header">{metadata.appName}</div>
      </div>

      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/Footer" className="nav-links" onClick={closeMobileMenu}>
            DEPLOY FACE DESCRIPTORS
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Profile" className="nav-links" onClick={closeMobileMenu}>
            FACE RECOGNITION
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Detect" className="nav-links" onClick={closeMobileMenu}>
            DETECTED CRIMINAL
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
