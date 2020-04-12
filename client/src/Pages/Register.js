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
        <div className="register-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-4 mb-4 mx-auto">
          <div className="row tabs ">
            <div
              className={`tab col-6 ${!this.state.role ? "active" : ""}`}
              onClick={() => {
                this.setState({ role: 0 });
              }}
            >
              Я Перевозчик
            </div>
            <div
              className={`tab col-6 text-right ${
                this.state.role ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ role: 1 });
              }}
            >
              Я Владелец груза
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 col-sm-6 mt-2 d-flex align-items-center">
              Страна:
              <span
                className={`simple_select_city ${
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
            <div className="col-12 mt-2 col-sm-6">
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
              <Input
                type="text"
                className="my-2"
                placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
              />
            </div>
            <div className="col-12 col-sm-4 align-item-center text-center text-sm-right">
              <Button type="empty" className="mt-2">
                Отправить
              </Button>
            </div>
          </div>
          <Input type="text" className="my-2" placeholder="Фамилия" />
          <div className="row">
            <div className="col-12 col-sm-6">
              <Input type="text" className="my-2" placeholder="Имя" />
            </div>
            <div className="col-12 col-sm-6">
              <Input type="text" className="my-2" placeholder="Отчество" />
            </div>
          </div>
          <Input type="text" className="my-2" placeholder="Пароль" />
          <p className="text-right">
            Регистрируясь, Вы соглашаетесь с&nbsp;
            <Link to="/" className="href">
              политикой конфиденциальности и соглашением об обработке
              персональных данных
            </Link>
            .
          </p>
          <div className="text-right">
            <Button type="fill" margin={"0 0 0 auto"} paddingHorizontal={"15px"} paddingVertical={"8px"}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
