import React, { useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { signUp } from "src/redux/actions";
import { connect } from "react-redux";
import "./register.css";
import Footer from "src/views/components/Footer";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //alerts
  const [userNameAlert, setUserNameAlert] = useState(false);
  const [matchPassAlert, setMatchPassAlert] = useState(false);
  const [emailAlert, setemailAlert] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [passAlert, setPassAlert] = useState(false);
  const [newPassAlert, setNewPassAlert] = useState(false);

  // loader
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    setMatchPassAlert(false);
    setemailAlert(false);
    setUserExist(false);
    setPassAlert(false);
    setNewPassAlert(false);
    setUserNameAlert(false);
    setLoading(true);
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
    if (!newPassword) {
      setNewPassAlert(true);
      setLoading(false);
      return;
    }
    if (!userName) {
      setUserNameAlert(true);
      setLoading(false);
      return;
    }
    if (newPassword !== password) {
      setMatchPassAlert(true);
      setLoading(false);
      // setInterval(() => { setPassAlert(false); }, 10000)
      return;
    }
    await props.signUp(userName, email, password).then(() => {
      console.log("props", props.userDetails);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center register-personal">
        <div className="my-shape"></div>
        <div className="my-shapes"></div>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1 className="mb-2">Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={userName}
                        onChange={(val) => {
                          setUserName(val.target.value);
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(val) => {
                          setEmail(val.target.value);
                        }}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(val) => {
                          setPassword(val.target.value);
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
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(val) => {
                          setNewPassword(val.target.value);
                        }}
                      />
                    </CInputGroup>
                    {/*alerts */}
                    {matchPassAlert && (
                      <CAlert color="danger">Passwords not matched</CAlert>
                    )}
                    {emailAlert && (
                      <CAlert color="danger">
                        Try with correct Email Address
                      </CAlert>
                    )}
                    {userExist && (
                      <CAlert color="danger">User Already Exist</CAlert>
                    )}
                    {passAlert && (
                      <CAlert color="danger">Please fill Password</CAlert>
                    )}
                    {newPassAlert && (
                      <CAlert color="danger">Please retype password</CAlert>
                    )}
                    {userNameAlert && (
                      <CAlert color="danger">Please type username</CAlert>
                    )}

                    {loading == false ? (
                      <CButton color="success" block onClick={registerUser}>
                        Create Account
                      </CButton>
                    ) : (
                      <CButton color="success" block>
                        <div
                          className="spinner-border text-secondary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </CButton>
                    )}

                    <CCol xs="12" className="text-right personal-card">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                    <CCol
                      xs="12"
                      className=" personal-card"
                      style={{ textAlign: "center" }}
                    >
                      <Link to="/login">
                        <CButton color="" className="mt-3" active tabIndex={-1}>
                          Already have an account
                        </CButton>
                      </Link>
                    </CCol>
                    <CCol xs="12" className="text-right personal-card">
                      <Link to="/">
                        <CButton color="" className="mt-3" active tabIndex={-1}>
                          Go Back!
                        </CButton>
                      </Link>
                    </CCol>
                  </CForm>
                </CCardBody>
                {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  signUp,
})(Register);
