// App
import React from "react";
import { withCookies } from "react-cookie";
import SocketController from "../controllers/SocketController";
import Header from "../Partials/Header";

import SideNav from "../Partials/SideNav";
import Footer from "../Partials/Footer";

// Router
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import routes from "./config";
import NoMatch from "../Pages/NoMatch";
import { ReactComponent as Gps } from "../img/gps.svg";
import { ReactComponent as Error } from "../img/error-red.svg";
// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import * as myArticlesActions from "../redux/actions/myarticles";
import { bindActionCreators } from "redux";
import configApi from "../config/api";

export function setTitle(path, routeArray) {
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
    isPublic: false,
  };
  componentDidMount() {
    this.props.history.listen(() => {
      setTitle(this.props.history.location.pathname, routes);
    });
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
        .then(
          ({
            user,
            myCountsArticles,
            takeCountsArticles,
            onlyNoRead,
            notificationCounts,
            dialogsCount,
          }) => {
            SocketController.init(apiToken);
            this.props.userActions.loginUser(
              user,
              apiToken,
              myCountsArticles,
              takeCountsArticles,
              onlyNoRead,
              notificationCounts,
              dialogsCount
            );
            if (!!user.needSendLocation)
              this.props.userActions.startLocationSent(
                this.props.user.apiToken
              );
            this.setState({ isRender: true });
          }
        )
        .catch(() => {
          this.setState({ isRender: true });
        });
    } else {
      this.setState({ isRender: true });
    }
  }
  componentDidUpdate(b) {}
  render() {
    return (
      this.state.isRender && (
        <>
          {" "}
          {this.props.user.needSendLocation &&
            !this.props.user.geolocationsError && <Gps className="gps-icon" />}
          {this.props.user.needSendLocation &&
            this.props.user.geolocationsError && <Error className="gps-icon" />}
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
                case "common":
                  return (
                    <this.CommonRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.component title={route.title} />
                    </this.CommonRoute>
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
                      isChat={route.lkHeight}
                    >
                      <route.component
                        title={route.title}
                        statusArticle={route.statusArticle}
                        typeArticle={route.typeArticle}
                        tab={route.tab}
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
          <Header />
        </>
      )
    );
  }

  PrivateRoute = ({ children, role, isChat, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          this.props.user.isAuth ? (
            !role || this.props.user.type === role ? (
              <>
                <div className="row mx-0">
                  <SideNav />
                  <div className="content col">
                    <div className={`lk-page ${isChat ? "messages" : ""}`}>
                      {children}
                    </div>
                    <Footer />
                  </div>
                </div>
              </>
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

  AuthRoute = ({ children, ref, ...rest }) => {
    return (
      <div className="public-page">
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
      </div>
    );
  };
  PublicRoute = ({ children, ...rest }) => {
    return (
      <div className="public-page">
        <Route
          {...rest}
          render={() => (
            <>
              {children}
              <Footer />
            </>
          )}
        />
      </div>
    );
  };
  CommonRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          this.props.user.isAuth ? (
            <>
              <div className="row mx-0">
                <SideNav />
                <div className="content col">
                  <div className="lk-page">{children}</div>
                  <Footer />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="page-common">
                {children}
                <Footer />
              </div>
            </>
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
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(withRouter(AppRouter)));
