// App
import React from "react";
import Input from "../../Elements/Input";
import configApi from "../../config/api";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
// Elements
import { CSSTransitionGroup } from "react-transition-group";
import Button from "../../Elements/Button";
import InputPhone from "../../Elements/InputPhone";
// Router
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    type: "cargo",
    country: 1,
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    password: "",
    error: false,
    errors: [],
    isVerified: false,
  };

  register() {
    if (this.state.isVerified === "success") {
      this.setState({ isFetching: true });
      fetch(`${configApi.urlApi}/auth/register`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          phone: this.state.phone,
          country: this.state.country,
          type: this.state.type,
          firstName: this.state.firstName,
          middleName: this.state.middleName,
          lastName: this.state.lastName,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            if (data.error)
              // data.errors.map((item) => {
              //   toast.error(item.msg);
              // });
              this.setState({ error: true, errors: data.errors });
          } else {
            toast.success("Регистрация прошла успешно");
            this.props.cookies.set("apiToken", data.token, {
              path: "/",
            });
            this.props.history.push("/profile/info");
          }
          this.setState({ isFetching: false });
        });
    } else toast.error("Подтвердите номер телефона");
  }

  render() {
    // let selectCountry = countryList.filter((item) => item.value !== 1);
    return (
      <div className="register-page">
        <h1 className="register-title">Регистрация</h1>
        <div className="register-form col-12 col-sm-9 col-md-6 col-lg-5 col-xl-4 mx-auto">
          <div className="row tabs justify-content-between">
            <div
              className={`tab f-16 left-angle ${
                this.state.type === "carrier" ? "active " : "gray"
              }`}
              onClick={() => {
                this.setState({ type: "carrier" });
              }}
            >
              Я Перевозчик
            </div>
            <div
              className={`tab f-16 left-angle ${
                this.state.type === "cargo" ? "active" : "gray"
              }`}
              onClick={() => {
                this.setState({ type: "cargo" });
              }}
            >
              Я Владелец груза
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12 col-sm-6 d-flex  align-items-center">
              Страна:
              <span
                className={`simple_select_city f-17-only col text-center ${
                  this.state.country === 1 ? `active` : ``
                } ml-3`}
                onClick={(val) => {
                  this.setState({ country: 1 });
                }}
              >
                Россия
              </span>
            </div>
            <div className="col-12 col-sm-6">
              <Select
                options={selectCountry}
                placeholder="Другая"
                className="f-17-only"
                onChange={(val) => {
                  this.setState({ country: val.value });
                }}
                value={
                  selectCountry.find(
                    (item) => item.value === this.state.country
                  ) || null
                }
              />
            </div>
          </div> */}
          <InputPhone
            error={this.state.errors.find((value) => value.param === "phone")}
            value={this.state.phone}
            isVerified={this.state.isVerified}
            phone={this.state.phone}
            setVerified={(val) => {
              this.setState({ isVerified: val });
            }}
            onChange={(phone) => {
              this.setState({ phone });
            }}
            placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
          />
          <CSSTransitionGroup
            transitionName="height-animation-item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1}
            className="wrapper-animation"
            style={{
              display: "contents",
            }}
          >
            {this.state.isVerified === "success" && (
              <>
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
                      className="col-12"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Input
                      type="text"
                      error={this.state.errors.find(
                        (value) => value.param === "lastName"
                      )}
                      value={this.state.lastName}
                      onChange={(e) => {
                        this.setState({ lastName: e.target.value });
                      }}
                      className="col-12"
                      placeholder="Фамилия"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 mb-custom">
                    <Input
                      type="text"
                      error={this.state.errors.find(
                        (value) => value.param === "firstName"
                      )}
                      value={this.state.firstName}
                      onChange={(e) => {
                        this.setState({ firstName: e.target.value });
                      }}
                      placeholder="Имя"
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <Input
                      type="text"
                      error={this.state.errors.find(
                        (value) => value.param === "middleName"
                      )}
                      value={this.state.middleName}
                      onChange={(e) => {
                        this.setState({ middleName: e.target.value });
                      }}
                      placeholder="Отчество"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Input
                      type="password"
                      style={{ paddingRight: 50 }}
                      error={this.state.errors.find(
                        (value) => value.param === "password"
                      )}
                      value={this.state.password}
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      className="isHover"
                      placeholder="Пароль"
                    />
                  </div>
                </div>
                <p className="text-right f-12">
                  Регистрируясь, Вы соглашаетесь с&nbsp;
                  <Link
                    to={this.props.settings.politicsPage}
                    className="href f-12"
                  >
                    политикой конфиденциальности
                  </Link>{" "}
                  и{" "}
                  <Link
                    to={this.props.settings.agreementPage}
                    className="href f-12"
                  >
                    соглашением об обработке персональных данных .
                  </Link>
                </p>
                <div className="text-right">
                  <Button
                    type="fill"
                    margin={"0 0 0 auto"}
                    paddingHorizontal={"15px"}
                    paddingVertical={"8px"}
                    onClick={() => {
                      this.register();
                    }}
                  >
                    Регистрация
                  </Button>
                </div>
              </>
            )}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings.settings,
  };
};
export default connect(mapStateToProps)(withRouter(Register));
