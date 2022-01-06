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
import { getAllCourses } from "src/redux/actions";
import { connect } from "react-redux";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class ViewCourses extends React.Component {
  constructor() {
    super();
    this.state = {
      showAlert: false,
      details: [-1],
    };
  }

  componentDidMount() {
    this.props.getAllCourses().then(() => {});
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

  deleteSubject = async (id) => {
    const { courses } = this.props;
    const { editIndex } = this.state;

    if (window.confirm("Are you sure you wish to delete this item?")) {
      const { userDetails } = this.props;
      var myHeaders = new Headers();
      myHeaders.append("accessToken", userDetails.token);
      var requestOptions = {
        method: "DELETE",
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(`${URL}/subjects/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            var index = courses[editIndex].Subjects.findIndex(function (o) {
              return o.id === id;
            });
            if (index !== -1) courses[editIndex].Subjects.splice(index, 1);
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
        .catch((error) => console.log("error", error));
    }
  };

  render() {
    const { showAlert, details, editCourseID } = this.state;
    const { courses } = this.props;

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
        key: "courseName",
        label: "Course name",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "description",
        label: "Description",
        _style: { width: "2%" },
        sorter: false,
        filter: false,
      },
      {
        key: "Subjects",
        label: "Subjects",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "show_details",
        label: "Actions",
        _style: { width: "2%" },
        sorter: false,
        filter: false,
      },
    ];

    const subjectFields = [
      {
        key: "id",
        label: "Id",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "subjectName",
        label: "Subject name",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
      {
        key: "description",
        label: "Description",
        _style: { width: "2%" },
        sorter: false,
        filter: false,
      },
      {
        key: "show_details_quiz",
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
                View All Courses{" "}
                <CButton
                  color="success"
                  shape="square"
                  size="sm"
                  className="float-right"
                  onClick={() => {
                    window.location.href = `/#/courses/createcourse`;
                  }}
                >
                  Add New
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={courses}
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
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </CButton>
                          <CButton
                            color="primary"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              window.location.href = `/#/courses/view-course?${item.id}`;
                            }}
                          >
                            <i class="fas fa-edit" aria-hidden="true"></i>
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
                                      var index = courses.findIndex(function (
                                        o
                                      ) {
                                        return o.id === item.id;
                                      });
                                      if (index !== -1)
                                        courses.splice(index, 1);
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
                            <i class="fa fa-trash" aria-hidden="true"></i>
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
                    Subjects: (item, index) => {
                      return (
                        <td className="py-2">
                          {item.Subjects?.length ? item.Subjects?.length : 0}
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <h4>Subjects</h4>
                            <p className="text-muted">
                              Subjects Available:{" "}
                              {item.Subjects?.length
                                ? item.Subjects?.length
                                : 0}
                            </p>

                            <CButton
                              color="success"
                              shape="square"
                              size="sm"
                              className="float-right"
                              onClick={() => {
                                window.location.href = `/#/subjects/createsubjects?${editCourseID}`;
                              }}
                            >
                              Add New Subject
                            </CButton>
                            <CDataTable
                              items={item.Subjects}
                              fields={subjectFields}
                              hover
                              striped
                              bordered
                              size="sm"
                              itemsPerPage={100}
                              scopedSlots={{
                                show_details_quiz: (item, index) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        color="primary"
                                        shape="square"
                                        size="sm"
                                        onClick={() => {
                                          window.location.href = `/#/quiz/createquiz?${item.id}`;
                                        }}
                                      >
                                        Add quiz
                                      </CButton>
                                      <CButton
                                        color="danger"
                                        shape="square"
                                        size="sm"
                                        onClick={() => {
                                          this.deleteSubject(item.id);
                                        }}
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                      >
                                        Delete
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
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
    courses: state.courses,
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  getAllCourses,
})(ViewCourses);
