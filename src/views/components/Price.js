import React from "react";
import PStyle from "./price.module.css";
import { Link } from "react-router-dom";

function Price() {
  return (
    <>
      <div id="pricing" style={{ marginTop: 0 }}></div>

      <div className={PStyle.pageWrapper}>
        <div className={PStyle.heading}>
          <h1 className={PStyle.headingText}>Pricing</h1>
          <p className={PStyle.headingPara}>
            This page proviedes you the best prices for quizes
          </p>
        </div>
        <div className={PStyle.contentWrape}>
          <div className={PStyle.cards}>
            <div className={PStyle.card}>
              <div className={PStyle.cardHead}>
                <h3 className={PStyle.cardHeadText}>Free Plan</h3>
                <p className={PStyle.cardHeadDesc}>
                  this is free plan enjoy this offer
                </p>
              </div>
              <div className={PStyle.cardFeatures}>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: "green",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>

                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
              </div>
              <Link to="/register" className={PStyle.cardBtn}>
                Enroll Now
              </Link>
            </div>
            <div className={PStyle.large}>
              <div className={PStyle.cardHead}>
                <h3 className={PStyle.cardHeadText}>Free Plan</h3>
                <p className={PStyle.cardHeadDesc}>
                  this is free plan enjoy this offer
                </p>
              </div>
              <div className={PStyle.cardFeatures}>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: "green",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: "green",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: "green",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
              </div>
              <Link to="/register" className={PStyle.cardBtn}>
                Enroll Now
              </Link>
            </div>
            <div className={PStyle.card}>
              <div className={PStyle.cardHead}>
                <h3 className={PStyle.cardHeadText}>Free Plan</h3>
                <p className={PStyle.cardHeadDesc}>
                  this is free plan enjoy this offer
                </p>
              </div>
              <div className={PStyle.cardFeatures}>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: "green",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
                <span className={PStyle.cardFeature}>
                  <i
                    className="fas fa-times-circle"
                    style={{
                      color: "red",
                    }}
                  ></i>{" "}
                  Free or paid courses
                </span>
              </div>
              <Link to="/register" className={PStyle.cardBtn}>
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
}

export default Price;
