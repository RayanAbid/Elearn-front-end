import React from "react";
import "./pages/App.css";
import "./HeroSection.css";
import { scroller } from "react-scroll";

function HeroSection() {
  return (
    <>
      <div className="hero-container" id="hero_section">
        <div className="caption">
          <h1>Learning Awaits</h1>
          <p>What are you waiting for?</p>
          <div className="hero-btns">
            <button
              onClick={() => {
                scroller.scrollTo("about", {
                  duration: 100,
                  delay: 0,
                  smooth: "easeInOutQuart",
                });
              }}
              className="btns"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
