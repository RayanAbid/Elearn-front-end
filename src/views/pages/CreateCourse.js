import React, { lazy, useState } from "react";
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

import { URL } from "../../Utills";

import MainChartExample from "../charts/MainChartExample.js";
import { connect } from "react-redux";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class CreateCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      courseName: "",
      description: "",
      loading: false,
    };
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
    const { courseName, description, loading } = this.state;
    return (
      <>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>Create course</CCardHeader>
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
                  />
                  <CFormText className="help-block">
                    Please enter your course description
                  </CFormText>
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              {loading == false ? (
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
export default connect(mapStateToProps)(CreateCourse);
