import React, { lazy, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { URL } from "../../Utills";

import MainChartExample from "../charts/MainChartExample.js";
import { connect } from "react-redux";
import { getSingleQuiz } from "src/redux/actions";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class ViewQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      quizTime: "",
      loading: false,
      Questions: null,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    var pathArray = window.location.hash;
    var QuizId = pathArray.replace("#/quiz/view-quiz?", "");
    await this.props.getSingleQuiz(QuizId);
    console.log(
      "this.props.singleQuizDetail.title",
      this.props.singleQuizDetail
    );
    this.setState({
      loading: false,
      QuizId,
      title: this.props.singleQuizDetail.title,
      quizTime: this.props.singleQuizDetail.quizTime,
      Questions: this.props.singleQuizDetail.Questions,
    });
  }

  render() {
    const { title, quizTime, loading, Questions, QuizId } = this.state;
    if (loading) {
      return (
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else {
      return (
        <>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>Edit subject</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Subject name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={(e) => {
                        this.setState(
                          {
                            title: e.target.value,
                          },
                          () => {
                            console.log("testing", title);
                          }
                        );
                      }}
                      type="text"
                      placeholder="Enter Subject Name..."
                      value={title}
                    />
                    <CFormText className="help-block">
                      Please enter subject name
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-password">Subject quizTime</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      onChange={(e) => {
                        this.setState(
                          {
                            quizTime: e.target.value,
                          },
                          () => {
                            console.log("testing", quizTime);
                          }
                        );
                      }}
                      name="textarea-input"
                      id="textarea-input"
                      rows="5"
                      placeholder="Content..."
                      value={quizTime}
                    />
                    <CFormText className="help-block">
                      Please enter your subject quizTime
                    </CFormText>
                  </CCol>
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                {/* {loading == false ? (
                      <CButton
                        onClick={() => {
                          this.createCourse();
                        }}
                        type="submit"
                        size="sm"
                        color="primary"
                      >
                        <CIcon name="cil-scrubber" /> Submit
                      </CButton>
                    ) : (
                      <CButton type="submit" size="sm" color="primary">
                        <div className="spinner-border text-secondary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </CButton>
                    )} */}
              </CCardFooter>
            </CCard>

            <CRow>
              <CCol md="6" sm="12">
                <h3>Questions</h3>
              </CCol>
              <CCol md="6" sm="12">
                <CButton
                  color="success"
                  shape="square"
                  size="sm"
                  className="float-right"
                  onClick={() => {
                    window.location.href = `/#/question/createquestion?${QuizId}`;
                  }}
                >
                  Add New question
                </CButton>
              </CCol>
            </CRow>

            <CRow>
              {!loading &&
                Questions?.length > 0 &&
                Questions != null &&
                Questions.map((quiz) => {
                  return (
                    <CCol xs="12" md="3">
                      <CCard
                      // style={{
                      //   cursor: "pointer",
                      // }}
                      // onClick={() => {
                      //   window.location.href = `/#/questions/view-subject?${quiz.id}`;
                      // }}
                      >
                        <CCardHeader>
                          {quiz.question}
                          <div className="card-header-actions"></div>
                        </CCardHeader>
                      </CCard>
                    </CCol>
                  );
                })}
            </CRow>
          </CCol>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    singleQuizDetail: state.singleQuizDetail,
  };
};
export default connect(mapStateToProps, { getSingleQuiz })(ViewQuiz);
