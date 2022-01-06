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
import { getSingleSubject } from "src/redux/actions";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class ViewSubject extends React.Component {
  constructor() {
    super();
    this.state = {
      subjectName: "",
      description: "",
      loading: false,
      subjects: null,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    var pathArray = window.location.hash;
    var SubjectId = pathArray.replace("#/subjects/view-subject?", "");
    await this.props.getSingleSubject(SubjectId);
    console.log(
      "this.props.singleSubjectDetail.subjectName",
      this.props.singleSubjectDetail
    );
    this.setState({
      loading: false,
      SubjectId,
      subjectName: this.props.singleSubjectDetail.subjectName,
      description: this.props.singleSubjectDetail.description,
      quizes: this.props.singleSubjectDetail.Quizes,
    });
  }

  createCourse = async () => {
    const { subjectName, description, loading } = this.state;
    const { userDetails } = this.props;
    console.log("testing ", subjectName, description);
    this.setState({
      loading: true,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("accessToken", userDetails.token);

    var raw = JSON.stringify({
      subjectName: subjectName,
      description: description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${URL}/courses/createCourse`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          loading: false,
        });
        if (result.success) {
          alert("Create Sucess");
          window.location.href = `/#/subjects/createsubjects?${result.data.id}`;
        }
        console.log(result);
      })
      .catch((error) => {
        this.setState({
          loadingButton: false,
        });
        console.log("error", error);
      });
  };

  render() {
    const { subjectName, description, loading, quizes, SubjectId } = this.state;
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
                            subjectName: e.target.value,
                          },
                          () => {
                            console.log("testing", subjectName);
                          }
                        );
                      }}
                      type="text"
                      placeholder="Enter Subject Name..."
                      value={subjectName}
                    />
                    <CFormText className="help-block">
                      Please enter subject name
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-password">Subject description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      onChange={(e) => {
                        this.setState(
                          {
                            description: e.target.value,
                          },
                          () => {
                            console.log("testing", description);
                          }
                        );
                      }}
                      name="textarea-input"
                      id="textarea-input"
                      rows="5"
                      placeholder="Content..."
                      value={description}
                    />
                    <CFormText className="help-block">
                      Please enter your subject description
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
                <h3>Quizes</h3>
              </CCol>
              <CCol md="6" sm="12">
                <CButton
                  color="success"
                  shape="square"
                  size="sm"
                  className="float-right"
                  onClick={() => {
                    window.location.href = `/#/quiz/createquiz?${SubjectId}`;
                  }}
                >
                  Add New Quiz
                </CButton>
              </CCol>
            </CRow>

            <CRow>
              {!loading &&
                quizes?.length > 0 &&
                quizes != null &&
                quizes.map((quiz) => {
                  return (
                    <CCol xs="12" md="3">
                      <CCard
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.href = `/#/quiz/view-quiz?${quiz.id}`;
                        }}
                      >
                        <CCardHeader>
                          {quiz.title}
                          <div className="card-header-actions"></div>
                        </CCardHeader>
                        <CCardBody>
                          <p>time allowed</p>
                          {quiz.quizTime}
                        </CCardBody>
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
    singleSubjectDetail: state.singleSubjectDetail,
  };
};
export default connect(mapStateToProps, { getSingleSubject })(ViewSubject);
