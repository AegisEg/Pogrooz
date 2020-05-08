// App
import React from "react";
import { withCookies } from "react-cookie";

import SideNav from '../Partials/SideNav'

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
import Profile from '../Pages/User/Profile'
import MyOrders from '../Pages/User/MyOrders'
import Notifications from '../Pages/User/Notifications'

// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";

class AppRouter extends React.Component {
  state = {
    isRender: false
  }

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
          this.setState({isRender: true})
        });
    } else {
      this.setState({isRender: true})
    }
  }

  render() {
    return this.state.isRender && (
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
        <this.AuthRoute exact path="/reset/:token" component={Reset}/>
        {/* Auth routes end */}

        {/* Public routes */}
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/faq">
          <FAQ />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cargo">
          <Cargo />
        </Route>
        <Route exact path="/carrier">
          <Carrier />
        </Route>
        {/* Public routes end */}

        {/* Private routes */}
        <this.PrivateRoute exact path="/profile">
          <Profile />
        </this.PrivateRoute>
        <this.PrivateRoute exact path="/notifications">
          <Notifications />
        </this.PrivateRoute>
        <this.PrivateRoute exact path="/my-orders">
          <MyOrders />
        </this.PrivateRoute>
        {/* Private routes end */}
      </Switch>
    );
  }

  PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          this.props.user.isAuth ? (
            <div className="lk-page row">
              <SideNav />
              <div className="col">
                {children}
              </div>
            </div>
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
            children
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
