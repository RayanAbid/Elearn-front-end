const initialState = {
  sidebarShow: "responsive",
  courses: null,
  coursesQuiz: null,
  questions: null,
  quizes: null,
  allUsers: null,
  singleDetail: null,
  userDetails: null,
  singleSubjectDetail: null,
  singleQuizDetail: null,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    case "getAllCourses":
      return { ...state, courses: rest.data };
    case "getAllQuestions":
      return { ...state, questions: rest.data };
    case "getAllQuizes":
      return { ...state, quizes: rest.data };
    case "getAllUsers":
      return { ...state, allUsers: rest.data };
    case "getSingleCourse":
      return { ...state, singleDetail: rest.data };
    case "getSingleQuiz":
      return { ...state, singleQuizDetail: rest.data };
    case "getSingleSubject":
      return { ...state, singleSubjectDetail: rest.data };
    case "signUp":
      return { ...state, userDetails: rest.data };
    case "Login":
      return { ...state, userDetails: rest.data };
    case "setUserLocaDetails":
      return { ...state, userDetails: rest.data };

    default:
      return state;
  }
};

export default changeState;
