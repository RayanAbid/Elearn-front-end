import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

// Student landing page
import HomeLayout from "./containers/HomeLayout";
import ServicesLayout from "./containers/ServicesLayout";
import DetailLayout from "./containers/DetailLayout";
import ProductsLayout from "./containers/ProductsLayout";
import QuizPageLayout from "./containers/QuizPageLayout";
import PriceLayout from "./containers/PriceLayout";
import { connect } from "react-redux";
import { signUp, checkAuth } from "./redux/actions";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    console.log("test", this.props.userDetails);
    const isAuthenticated = JSON.parse(localStorage.getItem("userDetails"));
    console.log("testing toe", isAuthenticated);

    this.props.checkAuth(isAuthenticated);
    this.setState({
      loading: false,
    });
    console.log("test", this.props.userDetails);
  }

  render() {
    const { userDetails } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <p>Loaidng...</p>;
    } else {
      return (
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route path="/home" name="Home" exact component={HomeLayout} />
              <Route path="/detail" component={DetailLayout} />
              {/* <Route path="/courses" component={ServicesLayout} /> */}
              {/* <Route path="/products" component={ProductsLayout} />*/}
              <Route path="/quizpage" component={QuizPageLayout} />
              {/* <Route path="/pricing" component={PriceLayout} /> */}

              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <Route
                path="/"
                render={(props) =>
                  userDetails?.isAdmin ? (
                    <TheLayout {...props} />
                  ) : (
                    <HomeLayout {...props} />
                  )
                }
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
export default connect(mapStateToProps, {
  signUp,
  checkAuth,
})(App);
