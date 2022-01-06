import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "../Footer";
import "./details.css";
import { useLocation, useParams, Link } from "react-router-dom";
import { URL } from "src/Utills";
import Loader from "react-loader-spinner";
import svg from "../../../assets/nodata.svg";
import { getAllQuizes, getSingleCourse } from "src/redux/actions";
import { connect } from "react-redux";

function Detail(props) {
  const [details, setdetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  console.log("yooo", location.state);
  console.log("poo", props);
  useEffect(async () => {
    if (location.state == null) {
      await props.getSingleCourse(location.search.replace("?", ""));
      await props.getAllQuizes(location.search.replace("?", ""));
    }
    // else {
    //   console.log("else");
    //   await props.getSingleCourse(location.search);
    //   await props.getAllQuizes(location.state.props.id).then(() => {
    //     setdetails(location.state.props);
    setLoading(false);
    //   });
    // }
  }, []);

  if (loading == true) {
    return (
      <div className="loader" style={{ margin: "0 auto" }}>
        <Loader type="Rings" color="#00BFFF" height={100} width={100} />
      </div>
    );
  } else {
    return (
      <>
        <div className="detail-container">
          <div className="container mt-5">
            {/* <div className="hero-shape"></div> */}
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="course-img">
                    <img
                      className="card-img-top"
                      src={props.singleDetail.imageUrl}
                      alt="image"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {props.singleDetail.courseName}
                    </h5>

                    <p className="card-text">
                      {props.singleDetail.description}
                    </p>
                    <Link to="/register" className=" btn btn-primary w-100">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="quiz-list">
              {!loading ? (
                props.quizes != null && props.quizes.length > 0 ? (
                  <div className="container">
                    {props.quizes.map((quiz, index) => {
                      if (index >= 2) {
                        return (
                          <Link
                            to={{
                              pathname: "/register",
                            }}
                            className="blackText"
                          >
                            <div
                              style={{ position: "relative" }}
                              className="row quiz-details"
                            >
                              <i
                                style={{
                                  fontSize: 22,
                                  color: "black",
                                }}
                                className="fas fa-stopwatch arrow"
                              ></i>
                              <h4 className="quiz-title">{quiz.title}</h4>
                              <i
                                style={{
                                  position: "absolute",
                                  right: 12,
                                  fontSize: 22,
                                  color: "black",
                                }}
                                className="fas fa-lock"
                              ></i>
                            </div>
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            to={{
                              pathname: "/quizPage",
                              search: `?${quiz.id}`,
                            }}
                            className="blackText"
                          >
                            <div
                              style={{ position: "relative" }}
                              className="row quiz-details"
                            >
                              <i
                                style={{
                                  fontSize: 22,
                                  color: "black",
                                }}
                                className="fas fa-stopwatch arrow"
                              ></i>
                              <h4 className="quiz-title">{quiz.title}</h4>
                              <i
                                style={{
                                  position: "absolute",
                                  right: 12,
                                  fontSize: 22,
                                  color: "black",
                                }}
                                className="fas fa-lock-open"
                              ></i>
                            </div>
                          </Link>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <object data={svg} width="200" height="200"></object>

                    <p>No Quiz available</p>
                  </div>
                )
              ) : (
                <div style={{ margin: "0 auto" }}>
                  <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quizes,
    singleDetail: state.singleDetail,
  };
};

export default connect(mapStateToProps, {
  getAllQuizes,
  getSingleCourse,
})(Detail);
