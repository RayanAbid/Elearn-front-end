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
  CDataTable,
  CAlert,
} from "@coreui/react";

import usersData from "../users/UsersData";
import { URL } from "src/Utills.js";

import MainChartExample from "../charts/MainChartExample.js";
import { getAllUsers } from "src/redux/actions";
import { connect } from "react-redux";
import CIcon from "@coreui/icons-react";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class ViewUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      showAlert: false,
      details: [-1],
      userName: "",
      password: "",
      email: "",
      newPassword: "",
      isPremium: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.props.getAllUsers().then(() => {
      console.log("tesing", this.props.allUsers);
    });
  }

  toggleDetails = (index) => {
    const { details } = this.state;
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    this.setState({
      details: newDetails,
    });
  };

  render() {
    const {
      showAlert,
      details,
      editCourseID,
      userName,
      password,
      email,
      newPassword,
      loading,
      isPremium,
    } = this.state;
    const { allUsers } = this.props;

    const getBadge = (status) => {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          return "primary";
      }
    };
    const fields = [
      {
        key: "id",
        label: "Id",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "username",
        label: "User name",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "isStudent",
        label: "isStudent",
        _style: { width: "2%" },
        sorter: false,
        filter: false,
      },
      {
        key: "isPremium",
        label: "isPremium",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "isAdmin",
        label: "isAdmin",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "show_details",
        label: "Actions",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
    ];

    return (
      <>
        {showAlert && (
          <CAlert color="danger">Course deleted Successfully</CAlert>
        )}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                View All Users{" "}
                {/* <CButton
                  color="success"
                  shape="square"
                  size="sm"
                  className="float-right"
                  onClick={() => {
                    window.location.href = `/#/courses/createcourse`;
                  }}
                >
                  Add New
                </CButton> */}
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={allUsers}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.toggleDetails(index);
                              this.setState({
                                editIndex: index,
                                editCourseID: item.id,
                              });
                            }}
                          >
                            Edit
                          </CButton>
                          <CButton
                            color="danger"
                            shape="square"
                            size="sm"
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?"
                                )
                              ) {
                                const { userDetails } = this.props;
                                var myHeaders = new Headers();
                                myHeaders.append(
                                  "accessToken",
                                  userDetails.token
                                );
                                var requestOptions = {
                                  method: "DELETE",
                                  redirect: "follow",
                                  headers: myHeaders,
                                };

                                await fetch(
                                  `${URL}/courses/${item.id}`,
                                  requestOptions
                                )
                                  .then((response) => response.json())
                                  .then((result) => {
                                    console.log(result);

                                    if (result.success) {
                                      var index = allUsers.findIndex(function (
                                        o
                                      ) {
                                        return o.id === item.id;
                                      });
                                      if (index !== -1)
                                        allUsers.splice(index, 1);
                                      this.setState({
                                        showAlert: true,
                                      });
                                      setTimeout(
                                        () =>
                                          this.setState({
                                            showAlert: false,
                                          }),
                                        1000
                                      );
                                    }
                                  })
                                  .catch((error) =>
                                    console.log("error", error)
                                  );
                              }
                            }}
                          >
                            Delete
                          </CButton>
                        </td>
                      );
                    },
                    description: (item, index) => {
                      return (
                        <td className="py-2">
                          {item.description.substring(0, 20)}...
                        </td>
                      );
                    },
                    Quizes: (item, index) => {
                      return <td className="py-2">{item.Quizes.length}</td>;
                    },
                    details: (item, index) => {
                      return (
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <h4>User</h4>
                            <p className="text-muted">User info</p>

                            <CCardBody className="p-4">
                              <CForm>
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
                                      this.setState({
                                        userName: val.target.value,
                                      });
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
                                      this.setState({
                                        email: val.target.value,
                                      });
                                    }}
                                  />
                                </CInputGroup>

                                <CInputGroup className="mb-3">
                                  <CSelect
                                    val={isPremium}
                                    onChange={(val) => {
                                      console.log("testing the va", val);
                                      this.setState(
                                        {
                                          isPremium: val.target.value,
                                        },
                                        () => {
                                          console.log("testin kjk", isPremium);
                                        }
                                      );
                                    }}
                                    custom
                                    size="sm"
                                    name="selectSm"
                                    id="SelectLm"
                                  >
                                    <option>Set is Premium</option>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                  </CSelect>
                                </CInputGroup>
                                {loading == false ? (
                                  <CButton
                                    color="success"
                                    block
                                    onClick={() => {
                                      console.log("tes");
                                    }}
                                  >
                                    Update Account
                                  </CButton>
                                ) : (
                                  <CButton color="success" block>
                                    <div
                                      className="spinner-border text-secondary"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </CButton>
                                )}
                              </CForm>
                            </CCardBody>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  getAllUsers,
})(ViewUsers);
