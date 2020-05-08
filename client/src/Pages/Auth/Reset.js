// App
import React from "react";
import configApi from "../../config/api";
import { toast } from "react-toastify";

// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";

class Reset extends React.Component {
  state = {
    token: "",
    password: "",
    passwordConfirm: "",
    error: false,
    errors: [],
  };
  reset() {
    this.setState({ isFetching: true });
    fetch(`${configApi.urlApi}/auth/reset`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
        token: this.props.match.params.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: true, errors: data.errors });
          if(data.errors[0].param === "all") {
            toast.error("Ссылка для сброса пароля устарела");
          }
        } else {
          if (data.status === "success") {
            toast.success("Пароль успешно сброшен");
          }
        }
        this.setState({ isFetching: false });
      });
  }

  render() {
    return (
      <div className="login-page">
        <h1 className="login-title">Вход</h1>
        <div className="login-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-3 mx-auto">
          <div className="row">
            <div className="col-12">
              <Input
                type="password"
                error={this.state.errors.find(
                  (value) => value.param === "password"
                )}
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                style={{paddingRight: 50}}
                placeholder="Новый пароль"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input
                type="password"
                error={this.state.errors.find(
                  (value) => value.param === "passwordConfirm"
                )}
                value={this.state.passwordConfirm}
                onChange={(e) => {
                  this.setState({ passwordConfirm: e.target.value });
                }}
                style={{paddingRight: 50}}
                placeholder="Подтверждение пароля"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                onClick={() => {
                  this.reset();
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
            Перейти{" "}
            <Link to="/register" className="href">
              страницу регистрации
            </Link>
          </p>
          <p className="text-center my-0 pb-4 f-12">
            Перейти{" "}
            <Link to="/login" className="href">
              страницу входа
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Reset;
