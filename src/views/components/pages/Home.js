import React from "react";
import "./App.css";

import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import About from "../About";
import Price from "../Price";

function Home() {
  return (
    <>
      <div>
        <HeroSection />
        <About />
        <Cards />
        <Price />
        <Footer />
      </div>
    </>
  );
}

export default Home;
