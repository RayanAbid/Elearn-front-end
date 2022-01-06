import { URL } from "src/Utills";

export const setUserLocaDetails = (data) => async (dispatch) => {
  dispatch({
    type: "setUserLocaDetails",
    data: data,
  });
};

export const signUp = (username, email, password) => async (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username,
    password,
    email,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(`${URL}/auth/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success === true) {
        localStorage.setItem("userDetails", JSON.stringify(result.data.token));

        dispatch({
          type: "signUp",
          data: result.data,
        });
        window.location.href = `/#/admin`;
      } else if (result.success === false) {
        // setUserExist(true);
        alert("User already exists");
      }
    })
    .catch((error) => {
      // setLoading(false);
      console.log("error", error);
    });
};
export const LoginUser = (email, password) => async (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    password: password, //"asad1",
    email: email, //"asadbukhari1@gmail.com",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(`${URL}/auth/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("test shj", result);
      if (result.success) {
        localStorage.setItem("userDetails", JSON.stringify(result.data.token));
        dispatch({
          type: "Login",
          data: result.data,
        });
        if (result.data.isAdmin) {
          window.location.href = `/#/viewUsers`;
        } else {
          window.location.href = `/#/home`;
        }
      } else {
        alert("User not found");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const checkAuth = (token) => async (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("accessToken", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${URL}/auth/auth`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("test auth", result);
      if (result.success) {
        dispatch({
          type: "Login",
          data: result.data,
        });
        if (result.data.isAdmin) {
          window.location.href = `/#/viewUsers`;
        } else {
          window.location.href = `/#/home`;
        }
      } else {
        localStorage.clear();
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getAllCourses = () => async (dispatch) => {
  console.log("redux start get");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${URL}/courses/getAllCourses`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch({
          type: "getAllCourses",
          data: result.data,
        });
      }

      console.log("yahoo11", result);
    })
    .catch((error) => console.log("error", error));
};

export const getAllQuizes = (CourseId) => async (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${URL}/quizes/getAllQuizes/${CourseId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        dispatch({
          type: "getAllQuizes",
          data: result.data,
        });
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getAllUsers = () => async (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${URL}/auth/getAllUsers`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        dispatch({
          type: "getAllUsers",
          data: result.data,
        });
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getSingleCourse = (courseId) => async (dispatch) => {
  var Id = courseId.replace("?", "");
  console.log("woow", Id);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${URL}/courses/getSingleCourse/${Id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("data git", result);
      if (result.success) {
        dispatch({
          type: "getSingleCourse",
          data: result.data,
        });
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => console.log("error", error));
};

export const getSingleSubject = (courseId) => async (dispatch) => {
  var Id = courseId.replace("?", "");
  console.log("woow", Id);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${URL}/subjects/getSingleSubject/${Id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("data git", result);
      if (result.success) {
        dispatch({
          type: "getSingleSubject",
          data: result.data,
        });
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => console.log("error", error));
};

export const getSingleQuiz = (courseId) => async (dispatch) => {
  var Id = courseId.replace("?", "");
  console.log("woow", Id);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${URL}/quizes/getSingleQuiz/${Id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("data git", result);
      if (result.success) {
        dispatch({
          type: "getSingleQuiz",
          data: result.data,
        });
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => console.log("error", error));
};

export const getAllQuestions = (QuizeId) => async (dispatch) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(
    `${URL}/questions/getAllQuestions?QuizeId=${QuizeId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        dispatch({
          type: "getAllQuestions",
          data: result.data,
        });
      }
    })
    .catch((error) => console.log("error", error));
};
