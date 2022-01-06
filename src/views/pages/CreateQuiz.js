import React, { lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CCallout,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";
import { URL } from "src/Utills.js";
import { connect } from "react-redux";
import { useLocation } from "react-router";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class CreateQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      quizTime: "",
      courses: null,
      loading: true,
      loadingButton: false,
      SubjectId: "",
    };
  }

  componentDidMount() {
    var pathArray = window.location.hash;
    var SubjectId = pathArray.replace("#/quiz/createquiz?", "");
    this.setState({
      SubjectId,
    });

    console.log("pathArray", SubjectId);
  }

  createQuiz = async () => {
    const { courses, title, quizTime, loadingButton, SubjectId } = this.state;
    const { userDetails } = this.props;

    if (userDetails.isAdmin) {
      this.setState({
        loadingButton: true,
      });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("accessToken", userDetails.token);
      var raw = JSON.stringify({
        courses,
        title,
        quizTime,
        SubjectId,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${URL}/quizes/createQuizes`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            loadingButton: false,
          });
          if (result.success) {
            alert("Create Suces");
            window.location.href = `/#/question/createquestion?${result.data.id}`;
          }
          console.log(result);
        })
        .catch((error) => {
          this.setState({
            loadingButton: false,
          });
          console.log("error", error);
        });
    }
  };

  render() {
    const { courses, title, quizTime, loading, loadingButton } = this.state;
    return (
      <>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>Create Quiz</CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={(e) => {
                      this.setState(
                        {
                          title: e.target.value,
                        },
                        () => {
                          console.log("tesing", title);
                        }
                      );
                    }}
                    placeholder="Enter title..."
                  />
                  <CFormText className="help-block">
                    Please enter your quiz title
                  </CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-password">Quiz time</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="number"
                    onChange={(e) => {
                      this.setState(
                        {
                          quizTime: e.target.value,
                        },
                        () => {
                          console.log("tesing", quizTime);
                        }
                      );
                    }}
                    placeholder="Enter quiz time..."
                  />
                  <CFormText className="help-block">
                    Please enter quiz time in minutes
                  </CFormText>
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              {loadingButton == false ? (
                <CButton
                  onClick={() => {
                    this.createQuiz();
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
              )}
            </CCardFooter>
          </CCard>
        </CCol>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps)(CreateQuiz);
