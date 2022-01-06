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
import { getSingleCourse } from "src/redux/actions";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class ViewCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      courseName: "",
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
    var CourseId = pathArray.replace("#/courses/view-course?", "");
    await this.props.getSingleCourse(CourseId);
    this.setState({
      loading: false,
      CourseId,
      courseName: this.props.singleDetail.courseName,
      description: this.props.singleDetail.description,
      subjects: this.props.singleDetail.Subjects,
    });
  }

  createCourse = async () => {
    const { courseName, description, loading } = this.state;
    const { userDetails } = this.props;
    console.log("testing ", courseName, description);
    this.setState({
      loading: true,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("accessToken", userDetails.token);

    var raw = JSON.stringify({
      courseName: courseName,
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
    const { courseName, description, loading, subjects, CourseId } = this.state;
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
              <CCardHeader>Edit course</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Course name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={(e) => {
                        this.setState(
                          {
                            courseName: e.target.value,
                          },
                          () => {
                            console.log("testing", courseName);
                          }
                        );
                      }}
                      type="text"
                      placeholder="Enter Course Name..."
                      value={courseName}
                    />
                    <CFormText className="help-block">
                      Please enter course name
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-password">Course description</CLabel>
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
                      Please enter your course description
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

            <h3>Subjects</h3>
            <CButton
              color="success"
              shape="square"
              size="sm"
              className="float-right"
              onClick={() => {
                window.location.href = `/#/subjects/createsubjects?${CourseId}`;
              }}
            >
              Add New Subject
            </CButton>

            <CRow>
              {!loading &&
                subjects?.length > 0 &&
                subjects != null &&
                subjects.map((subject) => {
                  console.log("hdjek", subjects);
                  return (
                    <CCol xs="12" md="3">
                      <CCard
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.href = `/#/subjects/view-subject?${subject.id}`;
                        }}
                      >
                        <CCardHeader>
                          {subject.subjectName}
                          <div className="card-header-actions"></div>
                        </CCardHeader>
                        <CCardBody>{subject.description}</CCardBody>
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
    singleDetail: state.singleDetail,
  };
};
export default connect(mapStateToProps, { getSingleCourse })(ViewCourse);
