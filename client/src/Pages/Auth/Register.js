// App
import React from "react";
import Input from "../../Elements/Input";
import configApi from '../../config/api'

// Elements
import Button from "../../Elements/Button";
import Select from "../../Elements/Select";
// Router
import { Link } from "react-router-dom";

const options = [
  { value: 4, label: "Америка" },
  { value: 2, label: "Китай" },
  { value: 3, label: "Австралия" },
];

class Register extends React.Component {
  state = {
    type: 'cargo',
    country: 0,
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    password: '',
    error: false,
    errors: []
  }

  register() {
    this.setState({isFetching: true})
    fetch(`${configApi.urlApi}/auth/register`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email,
            phone: this.state.phone,
            country: this.state.country,
            type: this.state.type,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            password: this.state.password
        })
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        this.setState({error: true, errors: data.errors})
      } else {
        console.log(data)
      }

      this.setState({isFetching: false})
    })
  }

  render() {
    return (
      <div className="register-page">
        <h1 className="register-title">Регистрация</h1>
        <div className="register-form col-12 col-sm-9 col-md-6 col-lg-5 col-xl-4 mx-auto">
          <div className="row tabs ">
            <div
              className={`tab f-16 col-6 ${this.state.type === 'carrier' ? "active" : ""}`}
              onClick={() => {
                this.setState({ type: 'carrier' });
              }}
            >Я Перевозчик</div>
            <div
              className={`tab f-16 col-6 text-right ${
                this.state.type === 'cargo' ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ type: 'cargo' });
              }}
            >Я Владелец груза</div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 d-flex mb-custom align-items-center">
              Страна:
              <span
                className={`simple_select_city f-17-only col text-center ${
                  this.state.country === 1 ? `active` : ``
                } ml-3`}
                onClick={(val) => {
                  this.setState({ country: 1 });
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
                  if (val) this.setState({ country: val.value });
                }}
                getRef={(ref) => (this.select = ref)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12">
              <Input type="phone" error={this.state.errors.find(value => value.param === 'phone')} value={this.state.phone} onChange={(e) => {this.setState({phone: e.target.value})}} placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input type="text" error={this.state.errors.find(value => value.param === 'email')} value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} className="col-12" placeholder="Email" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input type="text" error={this.state.errors.find(value => value.param === 'lastName')} value={this.state.lastName} onChange={(e) => {this.setState({lastName: e.target.value})}} className="col-12" placeholder="Фамилия" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <Input type="text" error={this.state.errors.find(value => value.param === 'firstName')} value={this.state.firstName} onChange={(e) => {this.setState({firstName: e.target.value})}} placeholder="Имя" />
            </div>
            <div className="col-12 col-sm-6">
              <Input type="text" error={this.state.errors.find(value => value.param === 'middleName')} value={this.state.middleName} onChange={(e) => {this.setState({middleName: e.target.value})}} placeholder="Отчество" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input type="password" style={{paddingRight: 50}} error={this.state.errors.find(value => value.param === 'password')} value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} className="isHover" placeholder="Пароль" />
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
              <Button
                type="fill"
                margin={"0 0 0 auto"}
                paddingHorizontal={"15px"}
                paddingVertical={"8px"}
                onClick={() => {this.register()}}
              >
                Регистрация
              </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
