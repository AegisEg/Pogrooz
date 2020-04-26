// App
import React from "react";
import Input from "../Elements/Input";
// Elements
import Button from "../Elements/Button";
import Select from "../Elements/Select";
// Router
import { Link } from "react-router-dom";

const options = [
  { value: "4", label: "Америка" },
  { value: "2", label: "Китай" },
  { value: "3", label: "Австралия" },
];

class Register extends React.Component {
  state = {
    role: 0,
    city: 1,
  };
  render() {
    return (
      <div className="register-page">
        <h1 className="register-title">Регистрация</h1>
        <div className="register-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-3 mb-4 mx-auto">
          <div className="row tabs ">
            <div
              className={`tab f-16 col-6 ${!this.state.role ? "active" : ""}`}
              onClick={() => {
                this.setState({ role: 0 });
              }}
            >
              Я Перевозчик
            </div>
            <div
              className={`tab col-6 f-16 text-right ${
                this.state.role ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ role: 1 });
              }}
            >
              Я Владелец груза
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 d-flex align-items-center">
              Страна:
              <span
                className={`simple_select_city f-17-only col text-center ${
                  this.state.city == 1 ? `active` : ``
                } ml-3`}
                onClick={(val) => {
                  this.setState({ city: 1 });
                  this.select.select.commonProps.setValue(null);
                }}
              >
                Россия
              </span>
            </div>
            <div className="col-12 col-sm-6">
              <Select
                options={options}
                placeholder="Другая"
                onChange={(val) => {
                  if (val) this.setState({ city: val.value });
                }}
                getRef={(ref) => (this.select = ref)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-8">
              <Input type="phone" placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _" />
            </div>
            <div className="col-12 col-sm-4 align-item-center text-center text-sm-right">
              <Link to={false}>
                <Button type="empty" className="w-100" paddingVertical={"8px"}>
                  Полчить код
                </Button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input type="text" className="col-12" placeholder="Фамилия" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <Input type="text" placeholder="Имя" />
            </div>
            <div className="col-12 col-sm-6">
              <Input type="text" placeholder="Отчество" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input type="text" className="isHover" placeholder="Пароль" />
            </div>
          </div>
          <p className="text-right f-12">
            Регистрируясь, Вы соглашаетесь с&nbsp;
            <Link to="/" className="href f-12">
              политикой конфиденциальности и соглашением об обработке
              персональных данных
            </Link>
            .
          </p>
          <div className="text-right">
            <Link to={false}>
              <Button
                type="fill"
                margin={"0 0 0 auto"}
                paddingHorizontal={"15px"}
                paddingVertical={"8px"}
              >
                Отправить
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
