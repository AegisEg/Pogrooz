// App
import React from "react";
import { withCookies } from "react-cookie";

import Header from "../Partials/Header";

import SideNav from "../Partials/SideNav";
import Footer from "../Partials/Footer";

// Router
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import routes from "./config";
import NoMatch from "../Pages/NoMatch";

// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";
import configApi from "../config/api";

function setTitle(path, routeArray) {
  var pageTitle;
  for (var i = 0; i < routeArray.length; i++) {
    if (routeArray[i].path === path) {
      pageTitle = "Pogrooz | " + routeArray[i].title;
    }
  }
  document.title = pageTitle ? pageTitle : "Pogrooz";
}

class AppRouter extends React.Component {
  state = {
    isRender: false,
  };
  componentWillMount() {
    this.props.history.listen(() => {
      setTitle(this.props.history.location.pathname, routes);
    });
  }
  componentDidMount() {
    setTitle(this.props.history.location.pathname, routes);
    const { cookies } = this.props;
    let apiToken = cookies.get("apiToken");

    if (apiToken) {
      fetch(`${configApi.urlApi}/api/user`, {
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
        <>
          <Header />
          <Switch>
            {routes.map((route, index) => {
              switch (route.type) {
                case "auth":
                  return (
                    <this.AuthRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.component title={route.title} />
                    </this.AuthRoute>
                  );
                case "public":
                  return (
                    <this.PublicRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.component title={route.title} />
                    </this.PublicRoute>
                  );
                case "private":
                  return (
                    <this.PrivateRoute
                      key={index}
                      path={route.path}
                      role={route.role}
                      exact={route.exact}
                    >
                      <route.component
                        title={route.title}
                        statusArticle={route.statusArticle}
                        typeArticle={route.typeArticle}
                      />
                    </this.PrivateRoute>
                  );

                default:
                  return false;
              }
            })}

            <this.PublicRoute>
              <NoMatch />
            </this.PublicRoute>
          </Switch>
        </>
      )
    );
  }

  PrivateRoute = ({ children, role, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          this.props.user.isAuth ? (
            !role || this.props.user.type == role ? (
              <div className="row mx-0">
                <SideNav />
                <div className="content col">
                  <div className="lk-page  row">
                    <div className="col">{children}</div>
                  </div>
                  <Footer />
                </div>
              </div>
            ) : (
              <NoMatch />
            )
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
)(withCookies(withRouter(AppRouter)));
