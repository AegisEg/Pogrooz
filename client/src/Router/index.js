// App
import React, { Suspense } from "react";
import { withCookies } from "react-cookie";
import { jivoSite } from "../controllers/FunctionsController";
import SocketController from "../controllers/SocketController";
import Header from "../Partials/Header";
import { Helmet } from "react-helmet";

import SideNav from "../Partials/SideNav";
import Footer from "../Partials/Footer";

// Router
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import routes from "./config";
import NoMatch from "../Pages/NoMatch";
import { ReactComponent as Gps } from "../img/geoPoint.svg";
import { ReactComponent as Error } from "../img/error-red.svg";
// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import * as myArticlesActions from "../redux/actions/myarticles";
import { bindActionCreators } from "redux";
import configApi from "../config/api";
import * as settingsActions from "../redux/actions/settings";
import Preloader from "../Elements/Preloader";

export function setTitle(path, routeArray) {
  let pageTitle;
  for (var i = 0; i < routeArray.length; i++) {
    if (routeArray[i].path === path) {
      pageTitle = routeArray[i].title;
    }
  }
  if (pageTitle) document.title = "Pogrooz | " + pageTitle;
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
            this.props.settingsActions.getSettings().then(() => {
              this.setState({ isRender: true });
            });
          }
        )
        .catch(() => {
          this.props.settingsActions.getSettings().then(() => {
            this.setState({ isRender: true });
          });
        });
    } else {
      this.props.settingsActions.getSettings().then(() => {
        this.setState({ isRender: true });
      });
    }
    jivoSite();
  }
  componentDidUpdate(b) {
    if (this.props.user.needSendLocation && !b.user.needSendLocation) {
      this.props.userActions.startLocationSent(this.props.user.apiToken);
    }
    if (!this.props.user.needSendLocation && b.user.needSendLocation) {
      this.props.userActions.stopLocationSent();
    }
  }
  render() {
    return (
      this.state.isRender && (
        <>
          {this.props.user.needSendLocation &&
            !this.props.user.geolocationsError && (
              <div className="geo-active">
                <Gps />
                <div>Идет передача данных для отслеживания</div>
              </div>
            )}
          {this.props.user.needSendLocation &&
            this.props.user.geolocationsError && (
              <div className="geo-active">
                <Error />
                <div>Ошибка передачи геоданных</div>
              </div>
            )}

          <Suspense
            fallback={
              <div id="preloader" className="background preloader">
                <div className="loader loader-left"></div>
                <div className="loader loader-right"></div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo">
                      <fegaussianblur
                        in="SourceGraphic"
                        stdDeviation="15"
                        result="blur"
                        colorInterpolationFilters="sRGB"
                      ></fegaussianblur>
                      <fecolormatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
                        result="goo"
                        colorInterpolationFilters="sRGB"
                      ></fecolormatrix>
                      <feblend
                        in="SourceGraphic"
                        in2="goo"
                        colorInterpolationFilters="sRGB"
                      ></feblend>
                    </filter>
                  </defs>
                </svg>
              </div>
            }
          >
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
          </Suspense>
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
                <Helmet>
                  <meta name="robots" content="noindex, nofollow" />
                </Helmet>
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
    settingsActions: bindActionCreators(settingsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(withRouter(AppRouter)));
