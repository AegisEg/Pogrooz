// App
import React from "react";
import { withCookies } from "react-cookie";

import SideNav from "../Partials/SideNav";
import Footer from "../Partials/Footer";

// Router
import { Switch, Route, Redirect } from "react-router-dom";

// Pages
import Main from "../Pages/Public/Main";
import FAQ from "../Pages/Public/FAQ";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Forgot from "../Pages/Auth/Forgot";
import Reset from "../Pages/Auth/Reset";
import About from "../Pages/Public/About";
import Cargo from "../Pages/Public/Cargo";
import Carrier from "../Pages/Public/Carrier";
import Profile from "../Pages/User/Profile";
import MyOrders from "../Pages/User/MyOrders";
import Notifications from "../Pages/User/Notifications";
import NotificationsSettings from "../Pages/User/NotificationsSettings";

// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";

class AppRouter extends React.Component {
  state = {
    isRender: false,
  };

  componentDidMount() {
    const { cookies } = this.props;
    let apiToken = cookies.get("apiToken");

    if (apiToken) {
      fetch(`http://localhost:8000/api/user`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          this.props.userActions.loginUser(user);
          this.setState({ isRender: true });
        });
    } else {
      this.setState({ isRender: true });
    }
  }

  render() {
    return (
      this.state.isRender && (
        <Switch>
          {/* Auth routes */}
          <this.AuthRoute exact path="/login">
            <Login />
          </this.AuthRoute>
          <this.AuthRoute exact path="/register">
            <Register />
          </this.AuthRoute>
          <this.AuthRoute exact path="/forgot">
            <Forgot />
          </this.AuthRoute>
          <this.AuthRoute exact path="/reset/:token" component={Reset} />
          {/* Auth routes end */}

          {/* Public routes */}
          <this.PublicRoute exact path="/">
            <Main />
          </this.PublicRoute>
          <this.PublicRoute exact path="/faq">
            <FAQ />
          </this.PublicRoute>
          <this.PublicRoute exact path="/about">
            <About />
          </this.PublicRoute>
          <this.PublicRoute exact path="/cargo">
            <Cargo />
          </this.PublicRoute>
          <this.PublicRoute exact path="/carrier">
            <Carrier />
          </this.PublicRoute>
          {/* Public routes end */}

          {/* Private routes */}
          <this.PrivateRoute exact path="/profile">
            <Profile />
          </this.PrivateRoute>
          <this.PrivateRoute exact path="/notifications">
            <Notifications />
          </this.PrivateRoute>
          <this.PrivateRoute exact path="/notifications-settings">
            <NotificationsSettings />
          </this.PrivateRoute>
          <this.PrivateRoute exact path="/my-orders">
            <MyOrders />
          </this.PrivateRoute>
          {/* Private routes end */}
        </Switch>
      )
    );
  }

  PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          this.props.user.isAuth ? (
            <>
              <div className="row mx-0">
                <SideNav />
                <div className="content px-0 col">
                  <div className="lk-page  row">
                    <div className="col">{children}</div>
                  </div>
                  <Footer />
                </div>
              </div>
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  };

  AuthRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          !this.props.user.isAuth ? (
            <>
              {children}
              <Footer />
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  };
  PublicRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => (
          <>
            {children}
            <Footer />
          </>
        )}
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(AppRouter));
