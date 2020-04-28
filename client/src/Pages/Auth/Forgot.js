// App
import React from "react";
import configApi from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";
toast.configure();
console.log(Date.now());
class Forgot extends React.Component {
  state = {
    email: "",
    error: false,
    errors: [],
  };

  forggot() {
    this.setState({ isFetching: true });
    fetch(`${configApi.urlApi}/auth/forgot`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: true, errors: data.errors });
        } else {
          if (data.status == "sended") {
            toast(
              "Сообщение со сбросом пароля отправлено на почту " + data.email
            );
          } else if (data.status == "waiting") {
            let time =
              data.time > 60
                ? Math.round(data.time / 3600) + "часов"
                : Math.round(data.time / 60) + "минут";
            toast(
              "Сообщение со сбросом пароля уже отправлено на почту " +
                data.email +
                "; Следующее сообщение будет возможно отправить через " +
                time
            );
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
                type="text"
                error={this.state.errors.find(
                  (value) => value.param === "email"
                )}
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                placeholder="Ваш E-mail"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                onClick={() => {
                  this.forggot();
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

export default Forgot;
