import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import { setUserLocaDetails } from "src/redux/actions";
import { scroller } from "react-scroll";

function Navbar(props) {
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
    console.log("I cry just a litte", props.userDetails != null);
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar-personal">
        <div className="navbar-container">
          <div className="logo">
            <a href="#" className="navbar-logo" onClick={closeMobileMenu}>
              E Knowledge Hunt
              <i className="fab fa-typo3" />
            </a>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
          </div>
          <div className="links">
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <p
                  className="nav-links-desktop pointer nav-links"
                  onClick={() => {
                    closeMobileMenu();
                    scroller.scrollTo("about", {
                      duration: 100,
                      delay: 0,
                      smooth: "easeInOutQuart",
                    });
                  }}
                >
                  About
                </p>
              </li>
              <li className="nav-item">
                <p
                  className="nav-links-desktop pointer nav-links"
                  onClick={() => {
                    closeMobileMenu();
                    scroller.scrollTo("cards", {
                      duration: 100,
                      delay: 0,
                      smooth: "easeInOutQuart",
                    });
                  }}
                >
                  Courses
                </p>
              </li>
              <li className="nav-item">
                <p
                  className="nav-links-desktop pointer nav-links"
                  onClick={() => {
                    closeMobileMenu();
                    scroller.scrollTo("pricing", {
                      duration: 100,
                      delay: 0,
                      smooth: "easeInOutQuart",
                    });
                  }}
                >
                  Pricing
                </p>
              </li>

              <li className="nav-item">
                <p
                  className="nav-links-desktop pointer nav-links"
                  onClick={() => {
                    closeMobileMenu();
                    scroller.scrollTo("contact", {
                      duration: 100,
                      delay: 0,
                      smooth: "easeInOutQuart",
                    });
                  }}
                >
                  Contact
                </p>
              </li>

              {props.userDetails == null ? (
                <li>
                  <Link
                    to="/login"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    LOG IN
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="nav-links-mobile"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to Logout"))
                        localStorage.clear();
                      closeMobileMenu();
                      props.setUserLocaDetails(null);
                    }}
                  >
                    LOG OUT
                  </Link>
                </li>
              )}
              {props.userDetails == null ? (
                <Link
                  to="/login"
                  style={{ marginTop: "-11px" }}
                  className="nav-links-desktop pointer btn--outline hero-btn"
                >
                  LOG IN
                </Link>
              ) : (
                <button
                  style={{ marginTop: "-11px" }}
                  className="nav-links-desktop pointer btn--outline hero-btn"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to Logout"))
                      localStorage.clear();
                    closeMobileMenu();
                    props.setUserLocaDetails(null);
                  }}
                >
                  LOG OUT
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  setUserLocaDetails,
})(Navbar);
