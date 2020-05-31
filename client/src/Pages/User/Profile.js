// App
import React from "react";
import configApi from "../../config/api";
import { toast } from "react-toastify";
import ConfigSettings from "../../config/settings";
// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import CheckBox from "../../Elements/CheckBox";
import Select from "../../Elements/Select";
//IMGS
import passport from "../../img/passport.png";
import upload from "../../img/upload.svg";

class Profile extends React.Component {
  state = {
    firstName: this.props.user.firstName,
    middleName: this.props.user.middleName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    phone: this.props.user.phone,
    lastPassword: "",
    newPassword: "",
    confirmPassword: "",
    isOOO: this.props.user.isOOO,
    isIP: this.props.user.isIP,
  };

  render() {
    return (
      <div className="profile-page">
        <h2 className="title">
          Профиль ({this.props.user.type === "cargo" && "Грузовладелец"}
          {this.props.user.type === "carrier" && "Перевозчик"})
        </h2>

        <div className="row d-block d-md-flex profile-input-fixed">
          <div className="col">
            <Input
              type="text"
              style={{
                marginBottom: 12,
              }}
              placeholder="Имя *"
              value={this.state.firstName}
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <Input
              type="text"
              style={{
                marginBottom: 12,
              }}
              placeholder="Фамилия *"
              value={this.state.middleName}
              onChange={(e) => {
                this.setState({ middleName: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <Input
              type="text"
              style={{
                marginBottom: 12,
              }}
              placeholder="Отчество *"
              value={this.state.lastName}
              onChange={(e) => {
                this.setState({ lastName: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="subtitle">Контактные данные *</h4>
            <span className="d-block">
              <Input
                type="text"
                placeholder="Телефон *"
                className=""
                style={{
                  marginBottom: 12,
                  marginRight: "4px",
                  maxWidth: "265px",
                }}
                value={this.state.phone}
                onChange={(e) => {
                  this.setState({ firstName: e.target.value });
                }}
              />
              <Button type="empty" margin="0 0 12px 0">
                Получить код
              </Button>
            </span>
            <Input
              type="text"
              placeholder="Email *"
              style={{ marginBottom: 12, maxWidth: "265px" }}
              value={this.state.email}
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
              }}
            />
          </div>

          <div className="col-md-6">
            <h4 className="subtitle">Фотография</h4>
            <Button
              type="fill"
              paddingVertical={"13px"}
              className="mr-2 f-17"
              paddingHorizontal={"26px"}
            >
              Загрузить
            </Button>
            <img
              className="avatar-img"
              src={ConfigSettings.defaultAvatar}
              alt=""
            />
            <span
              className="d-block mt-2"
              style={{
                maxWidth: "381px",
                fontSize: "12px",
                lineHeight: "14px",
              }}
            >
              На фото должны быть только Вы. Лицо не должны закрывать
              посторонние предметы или люди.{" "}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 col-xl-6 adress-input">
            <h4 className="subtitle mb-1 pb-0">Адрес *</h4>
            <div className="row mx-0 align-items-center">
              <span className>Страна:</span>
              <div className="col" style={{ maxWidth: "320px" }}>
                <Select type="text" placeholder="Россия" getRef={() => {}} />
              </div>
            </div>
            <div className="row mx-0 align-items-center">
              <span className>Область:</span>
              <div className="col" style={{ maxWidth: "320px" }}>
                <Select type="text" placeholder="Выбрать" getRef={() => {}} />
              </div>
            </div>
            <div className="row mx-0 align-items-center">
              <span className>Область:</span>
              <div className="col" style={{ maxWidth: "320px" }}>
                <Input
                  type="text"
                  placeholder="Введите город"
                  value={this.state.country}
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-7 col-lg-4 col-xl-3">
            <h4 className="subtitle mb-1 pb-2">Безопасность</h4>
            <div className="position-relative" style={{ maxWidth: "320px" }}>
              <Input
                type="password"
                placeholder="Старый пароль"
                value={this.state.lastPassword}
                style={{ paddingRight: 50, marginBottom: 10 }}
                onChange={(e) => {
                  this.setState({ lastPassword: e.target.value });
                }}
              />
            </div>
            <div className="position-relative" style={{ maxWidth: "320px" }}>
              <Input
                type="password"
                placeholder="Новый пароль"
                value={this.state.newPassword}
                style={{ paddingRight: 50, marginBottom: 10 }}
                onChange={(e) => {
                  this.setState({ newPassword: e.target.value });
                }}
              />
            </div>
            <div className="position-relative" style={{ maxWidth: "320px" }}>
              <Input
                type="password"
                placeholder="Подтверждение пароля"
                value={this.state.confirmPassword}
                style={{ paddingRight: 50, marginBottom: 10 }}
                onChange={(e) => {
                  this.setState({ confirmPassword: e.target.value });
                }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Button type="empty bg-gray ">Сохранить пароль</Button>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
            <h4 className="subtitle pb-2">Заключение договора</h4>
            <div
              style={{ marginTop: "4px", marginBottom: 8, lineHeight: "16px" }}
            >
              <CheckBox id="phyz" text="Физ лицо"></CheckBox>
            </div>
            <div style={{ marginBottom: 8, lineHeight: "16px" }}>
              <CheckBox
                id="ooo"
                onChange={() => {
                  this.setState({ isOOO: !this.state.isOOO });
                }}
                text="ООО"
              ></CheckBox>
              {this.state.isOOO && (
                <Input
                  type="text"
                  placeholder="Введите ОГРН"
                  className="d-block"
                  style={{ marginTop: "8px", maxWidth: "320px" }}
                  value={this.state.country}
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                />
              )}
            </div>
            <div style={{ marginBottom: 8, lineHeight: "16px" }}>
              <CheckBox
                id="ip"
                text="ИП"
                onChange={() => {
                  this.setState({ isIP: !this.state.isIP });
                }}
              ></CheckBox>
              {this.state.isIP && (
                <Input
                  type="text"
                  placeholder="Введите ИНН"
                  className="d-block"
                  style={{ marginTop: "8px", maxWidth: "320px" }}
                  value={this.state.country}
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                />
              )}
            </div>
            <div style={{ marginBottom: 8, lineHeight: "16px" }}>
              <CheckBox id="single" text="Самозанятый"></CheckBox>
            </div>
          </div>
        </div>
        {this.props.user.type == "carrier" && (
          <div className="row">
            <h4 className=" col-12 subtitle py-0 mb-3 px-3">Паспорт</h4>
            <div className="col-12 col-lg-6  mb-4">
              <div className="d-block d-lg-flex">
                <span
                  className="d-block d-md-inline-block mr-2 foto-lable-passport"
                  style={{
                    lineHeight: "16px",
                    marginBottom: "12px",
                  }}
                >
                  Фото с паспортом в руках
                </span>
                <div>
                  <Input
                    type="text"
                    placeholder="Выбрать"
                    style={{
                      maxWidth: "156px",
                      marginBottom: "12px",
                    }}
                    className="mr-2"
                    value={this.state.country}
                    onChange={(e) => {
                      this.setState({ firstName: e.target.value });
                    }}
                  />
                  <Button
                    type="fill"
                    paddingVertical={"13px"}
                    className="mr-2 f-17"
                    margin="0 0 12px 0"
                    paddingHorizontal={"26px"}
                  >
                    <span className="d-none d-md-block">Загрузить</span>
                    <img
                      className="d-block d-md-none"
                      style={{
                        width: "20px",
                      }}
                      src={upload}
                      alt=""
                    />
                  </Button>
                  <span className="d-block">
                    Возьмите паспорт в руки разверните парспорт и разместите
                    так, чтобы он не закрывал Ваше лицо, но был четким и
                    читабельным. Ваше лицо на этой фотографии оператор будет
                    сравнивать с лоцом на аватаре.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 row mx-0 mb-4 ">
              <Link to="/" className="href">
                <span
                  className="d-inline-block f-14 text-center"
                  style={{
                    maxWidth: "65px",
                    lineHeight: "16px",
                    margin: 0,
                    marginTop: "5px",
                    marginRight: "10px",
                  }}
                >
                  Открыть пример фото
                </span>
              </Link>
              <img
                className="defaultPassport mb-3"
                src={ConfigSettings.defaultPassport}
                alt="defaultPassport"
              />
              <div className="col-12 mb-3 col-sm status-passport">
                <p className="left-angle left-angle-margin position-relative active">
                  Фото на провекре (первый статус)
                </p>
                <p className="d-flex align-items-center">
                  <img src={passport} alt="" />
                  Паспорт загружен (после подтверждения админом)
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex mt-2">
          <Button
            type="fill"
            paddingVertical={"13px"}
            className="ml-auto f-17"
            paddingHorizontal={"26px"}
          >
            Сохранить все
          </Button>
        </div>
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
    // userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps)(Profile);
