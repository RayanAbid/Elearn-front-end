import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div id="contact">
        <div className="bg-two footer-container">
          <div className="container py-5">
            <div className="row text-center">
              <div className="col text-center mb-5 ">
                <h3 className="font-weight-bold mb-4">E Knowledge hunt</h3>
                <p className="semi-bold"> The best way to Practice. </p>
              </div>
            </div>
          </div>
          <section className="footer-subscription">
            <p className="footer-subscription-heading">
              Join the course newsletter to receive our best course deals
            </p>
            {/* <p className="footer-subscription-text">
            You can unsubscribe at any time.
          </p> */}
            <div className="input-areas">
              <form>
                <input
                  className="footer-input"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                />
                <button className="btns1">Subscribe</button>
              </form>
            </div>
          </section>
          <div className="container custom-color mt-5">
            <p className="m-0 text-center small medium-500">
              Copyright &copy; Your Website Name 2020. Made by{" "}
              <a href="#">Rayan Tech</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
