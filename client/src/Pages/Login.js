// App
import React from "react";

// Elements
import Button from "../Elements/Button";
import CheckBox from "../Elements/CheckBox";
import Input from "../Elements/Input";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <h1 className="login-title">Вход</h1>
        <div className="login-form col-12 col-sm-9 col-md-6 col-lg-6 col-xl-3 mx-auto">
          <Input
            type="text"
            placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
          />
          <Input type="text"  placeholder="Пароль" />
          <div className="row mx-0 bottom pb-3">
            <div className="col-12 col-sm-6 px-0">
              <CheckBox id="remember" text="Запомнить меня"></CheckBox>
              <div className="d-block" style={{ marginLeft: "35px" }}>
                <Link to="/" className="href f-12">Забыли пароль?</Link>
              </div>
            </div>
            <div className="col-12 col-sm-6 px-0 text-center text-sm-right">
              <Link to={false}>
                <Button
                  type="fill"
                  paddingVertical={"8px"}
                  fontSize={"17px"}
                  paddingHorizontal={"35px"}
                >
                  Войти
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-center mb-0 f-12">Еще не зарегистрированы?</p>
          <p className="text-center my-0 pb-4 f-12">
            Перейти <Link to="/register" className="href">страницу регистрации</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
