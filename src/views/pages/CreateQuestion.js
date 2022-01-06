import React, { lazy, useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { URL } from "src/Utills.js";
import { getAllCourses } from "src/redux/actions/action.js";
import { connect } from "react-redux";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

function CreateQuestion(props) {
  useEffect(() => {
    var pathArray = window.location.hash;
    var QuizIds = pathArray.replace("#/question/createquestion?", "");
    setQuizId(QuizIds);
    const list = [...inputList];
    list[0].QuizeId = QuizIds;
    setInputList(list);
    console.log("wpwww", list);
  }, []);

  const [quizId, setQuizId] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [inputList, setInputList] = useState([
    {
      question: "",
      QuizeId: "",
      options: [""],
      awnser: "",
      description: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index, optionIndex) => {
    const { name, value } = e.target;
    if (name == "options") {
      console.log("testing the options", value);
      const list = [...inputList];
      list[index].options[optionIndex] = value;
      setInputList(list);
    } else {
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleRemoveClickOption = (i, index) => {
    const list = [...inputList];
    list[i].options.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClickOption = (i) => {
    const list = [...inputList];
    list[i].options.push("");

    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        question: "",
        QuizeId: quizId,
        options: [""],
        awnser: "",
        description: "",
      },
    ]);
  };

  const createQuestion = async () => {
    const { courses, userDetails } = props;
    setLoadingButton(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(inputList);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${URL}/questions/createQuestion`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Create Suces");
          window.location.href = `/#/courses/viewcourses`;
        }
        setLoadingButton(false);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>Create Question {i + 1}</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Question</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="question"
                      placeholder="Enter question"
                      value={x.question}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Awnser</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="awnser"
                      placeholder="Enter awnser"
                      value={x.awnser}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="description"
                      placeholder="Enter description"
                      value={x.description}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  {x.options.map((option, optionIndex) => (
                    <>
                      <CCol md="3">
                        <CLabel htmlFor="hf-email">
                          Option {optionIndex + 1}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="4">
                        <CInput
                          name="options"
                          placeholder="Enter option"
                          value={option}
                          onChange={(e) => handleInputChange(e, i, optionIndex)}
                        />
                      </CCol>
                      <CCol xs="12" md="5">
                        {x.options.length - 1 === optionIndex && (
                          <CButton
                            onClick={() => handleAddClickOption(i)}
                            type="submit"
                            size="sm"
                            color="primary"
                          >
                            Add option
                          </CButton>
                        )}
                        {x.options.length !== 1 && (
                          <CButton
                            onClick={() =>
                              handleRemoveClickOption(i, optionIndex)
                            }
                            type="submit"
                            size="sm"
                            color="danger"
                          >
                            Remove option
                          </CButton>
                        )}
                      </CCol>
                    </>
                  ))}
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="12">
                    {inputList.length - 1 === i && (
                      <CButton
                        onClick={handleAddClick}
                        type="submit"
                        size="sm"
                        color="primary"
                      >
                        Add question
                      </CButton>
                    )}
                    {inputList.length !== 1 && (
                      <CButton
                        onClick={() => handleRemoveClick(i)}
                        type="submit"
                        size="sm"
                        color="danger"
                      >
                        Remove question
                      </CButton>
                    )}
                  </CCol>
                </CFormGroup>
              </CCardBody>
              {inputList.length - 1 === i && (
                <CCardFooter>
                  {loadingButton == false ? (
                    <CButton
                      onClick={() => {
                        createQuestion();
                      }}
                      type="submit"
                      size="sm"
                      color="primary"
                    >
                      <CIcon name="cil-scrubber" /> Submit
                    </CButton>
                  ) : (
                    <CButton type="submit" size="sm" color="primary">
                      <div
                        className="spinner-border text-secondary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </CButton>
                  )}
                </CCardFooter>
              )}
            </CCard>
          </CCol>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  getAllCourses,
})(CreateQuestion);
