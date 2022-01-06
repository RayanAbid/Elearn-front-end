import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { URL } from "src/Utills";
import "./login.css";
import { connect } from "react-redux";
import { LoginUser } from "src/redux/actions";

const Login = (props) => {
  const [password, setPassword] = useState("test1234");
  const [email, setEmail] = useState("admin@eknowledgehunt.com");
  const [errorAlert, setErrorAlert] = useState(false);
  const [emailAlert, setemailAlert] = useState(false);
  const [passAlert, setPassAlert] = useState(false);

  // loader
  const [loading, setLoading] = useState(false);

  // login user

  const loginUser = async () => {
    setLoading(true);
    setemailAlert(false);
    setPassAlert(false);
    setErrorAlert(false);
    if (!email) {
      setemailAlert(true);
      setLoading(false);
      return;
    }
    if (!password) {
      setPassAlert(true);
      setLoading(false);
      return;
    }
    await props.LoginUser(email, password).then(() => {
      setLoading(false);
    });
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center login-personal">
      <div className="design"></div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 style={{ padding: "22px" }}>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(val) => {
                          setEmail(val.target.value);
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(val) => {
                          setPassword(val.target.value);
                        }}
                      />
                    </CInputGroup>
                    {errorAlert && (
                      <CAlert color="danger">
                        Wrong Password and Email combination
                      </CAlert>
                    )}
                    {emailAlert && (
                      <CAlert color="danger">
                        Try with correct Email Address
                      </CAlert>
                    )}
                    {passAlert && (
                      <CAlert color="danger">Please fill Password</CAlert>
                    )}
                    <CRow>
                      <CCol xs="12">
                        {loading == false ? (
                          <CButton
                            onClick={() => {
                              loginUser();
                            }}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        ) : (
                          <CButton color="primary" className="px-4">
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs="12" className="text-right personal-card">
                        <Link to="/register">
                          <CButton
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs="12" className="text-right personal-card">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>

                      <CCol xs="12" className="text-right personal-card">
                        <Link to="/">
                          <CButton
                            color=""
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Go Back!
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none "
                style={{ width: "100%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  LoginUser,
})(Login);
