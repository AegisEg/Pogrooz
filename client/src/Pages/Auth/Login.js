// App
import React from "react";
import { withCookies } from "react-cookie";
import configApi from "../../config/api";

// Elements
import Button from "../../Elements/Button";
import CheckBox from "../../Elements/CheckBox";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import SocketController from "../../controllers/SocketController";

class Login extends React.Component {
  state = {
    phone: "",
    password: "",
    remeberMe: false,
    error: false,
    errors: [],
  };

  login() {
    this.setState({ isFetching: true });
    fetch(`${configApi.urlApi}/auth/login`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: this.state.phone,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: true, errors: data.errors });
        } else {
          const { cookies } = this.props;
          cookies.set("apiToken", data.token, {
            path: "/",
            maxAge: this.state.remeberMe ? 60 * 60 * 24 * 360 : 60 * 60,
          });
          SocketController.init(data.token);
          this.props.userActions.loginUser(
            data.user,
            data.token,
            data.myCountsArticles,
            data.takeCountsArticles,
            data.onlyNoRead,
            data.notificationCounts,
            data.dialogsCount
          );
          if (data.user.needSendLocation)
            this.props.userActions.startLocationSent(data.token);
          if (data.user.type == "carrier")
            this.props.history.push("/taken-orders");
          else this.props.history.push("/taken-offers");
        }

        this.setState({ isFetching: false });
      });
  }

  render() {
    return (
      <div className="login-page">
        <h1 className="login-title">Вход</h1>
        <form
          className="login-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-3 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            this.login();
          }}
        >
          <div className="row">
            <div className="col-12">
              <Input
                type="phone"
                error={this.state.errors.find(
                  (value) => value.param === "phone"
                )}
                value={this.state.phone}
                onChange={(phone) => {
                  this.setState({ phone });
                }}
                placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input
                type="password"
                error={
                  this.state.errors.find(
                    (value) => value.param === "password"
                  ) || this.state.errors.find((value) => value.param === "all")
                }
                value={this.state.password}
                style={{ paddingRight: 50 }}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                placeholder="Пароль"
              />
            </div>
          </div>
          <div className="row mx-0 bottom pb-3">
            <div className="col-12 col-sm-6 px-0">
              <CheckBox
                id="remember"
                value={this.state.remeberMe}
                onChange={() => {
                  this.setState({ remeberMe: !this.state.remeberMe });
                }}
                text="Запомнить меня"
              ></CheckBox>
              <div className="d-block" style={{ marginLeft: "35px" }}>
                <Link to="/forgot" className="href f-12">
                  Забыли пароль?
                </Link>
              </div>
            </div>
            <div className="col-12 col-sm-6 px-0 text-center text-sm-right">
              <Button
                onClick={() => {
                  this.login();
                }}
                type="fill"
                paddingVertical={"8px"}
                fontSize={"17px"}
                paddingHorizontal={"35px"}
              >
                Войти
              </Button>
            </div>
          </div>
          <p className="text-center mb-0 f-12">Еще не зарегистрированы?</p>
          <p className="text-center my-0 pb-4 f-12">
            Перейти&nbsp;
            <Link to="/register" className="href">
              страницу регистрации
            </Link>
          </p>
          <input type="submit" className="d-none" />
        </form>
      </div>
    );
  }
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
)(withRouter(withCookies(Login)));
