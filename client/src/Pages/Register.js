// App
import React from "react";
import Input from "../Elements/Input";
import Select, { components } from "react-select";
//SVG
import svgIcon from "../img/icon_angle.svg";
// Elements
import Button from "../Elements/Button";
// Router
import { Link } from "react-router-dom";

const options = [
  { value: "01", label: "Америка" },
  { value: "2", label: "Китай" },
  { value: "3", label: "Австралия" },
];

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={svgIcon} className="mr-2" alt="svgIcon" />
    </components.DropdownIndicator>
  );
};
const colourStyles = {
  placeholder: (base) => {
    return {
      color: "#909090",
    };
  },
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  control: (base) => ({
    ...base,
    borderColor: "#B9B9B9",
    boxShadow: "0 0 0 0px #B9B9B9",
    "&:hover": {
      borderColor: "#FFDC1C",
      boxShadow: "0 0 0 1px #FFDC1C",
    },
  }),
};
class Register extends React.Component {
  state = {
    role: 0,
  };
  render() {
    return (
      <div className="register-page">
        <h1 className="register-title">Регистрация</h1>
        <div className="register-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-5 mx-auto">
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
              <span className="simple_select_city ml-3">Россия</span>
            </div>
            <div className="col-12 mt-2 col-sm-6">
              <Select
                theme={{ borderRadius: 20 }}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
                className="select"
                placeholder={"Другая"}
                styles={colourStyles}
                options={options}
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
            </Link>.
          </p>
          <div className="text-right">
          <Button type="fill" margin={"0 0 0 auto"} paddingVertical={"15px"}>Я владелец груза</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
