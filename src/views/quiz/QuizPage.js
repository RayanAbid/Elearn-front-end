import React, { useEffect, useRef, useState } from "react";
import "./quizPage.css";
// import questions from "./quizData";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { getAllQuestions } from "src/redux/actions";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { useLocation } from "react-router";

function QuizPage(props) {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  console.log("yoooquiz", location.search.replace("?", ""));

  useEffect(async () => {
    console.log("props", props.questions);
    await props.getAllQuestions(location.search.replace("?", "")).then(() => {
      setLoading(false);
    });
  }, []);

  // const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [displayDescription, setDisplayDescription] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [questions1, setQuestions1] = useState("");
  const [Awns, setAwns] = useState("");

  const handleNextButton = (currentQuestion, event, clicked) => {
    const question = props.questions[currentQuestion];
    const answer = question.Options[0].awnser;
    question.Options[0].selected = event;
    setQuestions1(currentQuestion);

    console.log("wow this wok", question.Options[0]);
    question.Options[0].color = "rgb(125, 192, 223)";

    if (clicked == "next") {
      question.Options[0].disabled = true;
      setAwns("");
      if (answer === question.Options[0].selected) {
        const newScore = score + 1;
        // alert("Correct Awnser selected");
        question.Options[0].color = "green";

        setScore(newScore);
      } else {
        // alert("Wrong Awnser selected");
        question.Options[0].color = "red";
      }
    }
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const goBack = () => {
    window.location.href = "/#/home";
  };
  return (
    <>
      {!loading ? (
        <div className="quiz-container">
          {/* <div className="quizpage-shape"></div> */}
          <div className="quiz-wrapper">
            {showScore ? (
              <div className="score-section">
                You scored {score} out of {props.questions.length}
                <button
                  className="btn mt-5 font-3xl btn-personal"
                  onClick={() => {
                    goBack();
                  }}
                >
                  Go back
                </button>
                <div className="divider"></div>
                <div className="answer-display-container">
                  {props.questions.map((question, index) => (
                    <div className="answer-display-wrapper">
                      <p className="display-question">
                        Q{index + 1}: {question.question}
                      </p>
                      <p className="display-answer">
                        Ans:{" "}
                        <sapn className="display-answer-text">
                          {question.Options[0].awnser}
                        </sapn>
                      </p>
                      <p className="display-desc">
                        Description:{" "}
                        <span className="display-desc-text">
                          {question.Options[0].description}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="quiz-heading">
                  <h2 className="heading-text">
                    🧠 Question # of {props.questions.length}
                  </h2>
                </div>
                <div className="seperator"></div>
                {props.questions.map((item, index) => (
                  <>
                    <div className="quiz-question">
                      <h3 className="question-text">{item.question}</h3>
                    </div>
                    <div className="row quiz-answers">
                      {item.Options[0].options
                        .split(",.,")
                        .map((answerOption) => {
                          return (
                            <span
                              className="answer-btn col-md-6 col-sm-12"
                              style={
                                item.Options[0].selected == answerOption
                                  ? {
                                    backgroundColor: item.Options[0].color,
                                    color: "white",
                                    transition: "0.2s",
                                  }
                                  : {
                                    className: "lightblue"
                                  }
                              }
                              key={index}
                              onClick={(e) => {
                                handleNextButton(index, answerOption);
                                setAwns(answerOption);
                              }}
                            >
                              {answerOption}
                            </span>
                          );
                        })}
                    </div>
                    {item.Options[0].disabled && (
                      <div className="answer-display-wrapper">
                        <p className="display-answer">
                          Ans:{" "}
                          <sapn className="display-answer-text">
                            {item.Options[0].awnser}
                          </sapn>
                        </p>
                        <p className="display-desc">
                          Description:{" "}
                          <span className="display-desc-text">
                            {item.Options[0].description}
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="quiz-buttons">
                      <button
                        disabled={
                          item.Options[0].disabled == true ? true : false
                        }
                        className={
                          item.Options[0].disabled == true
                            ? "disabledBtn"
                            : "next-btn"
                        }
                        onClick={() => {
                          console.log("testing desf", index);
                          handleNextButton(index, Awns, "next");
                        }}
                      >
                        Submit Answer
                      </button>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="loader" style={{ margin: "0 auto" }}>
          <Loader type="Rings" color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div className="quiz-buttons">
        <button
          className="next-btn"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit Quiz
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};

export default connect(mapStateToProps, {
  getAllQuestions,
})(QuizPage);
