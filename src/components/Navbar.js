import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            SAHADEVA
            <i className="fab fa-speakap" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
                Admin
              </Link>
            </li>
            <li>
              {/* <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
								Admin Login
							</Link> */}
              <div className="navbar-dropdown">
                <li className="nav-item">
                  <span className="nav-links">Login</span>
                  <ul className="navbar-dropdown-content">
                    <li>
                      <Link to="/admin-signUp" className="navbar-links">
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin-signIn" className="navbar-links">
                        Sign In
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
