// App
import React from "react";
import Modal from "react-modal";
//IMG
import logo from "../logo.svg";
import minilogo from "../img/minilogo.png";
// Router
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Elements
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import MenuNav from "./MenuNav";
import MobileMenu from "./MobileMenu";

const customStyles = {
  content: {
    top: "0",
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
    height: "max-content",
    background: "#FFFFFF",
    border: "1px solid #DDDDDD",
    boxSizing: "border-box",
    boxShadow: "3px 2px 15px rgba(0, 0, 0, 0.13)",
    borderRadius: "10px",
    padding: "20px",
  },
};

class Header extends React.Component {
  state = {
    showModal: false,
    menu: [
      {
        id: 1,
        name: "Грузовладельцам",
        href: "/cargo",
        type: "menu",
      },
      {
        id: 2,
        name: "Перевозчикам",
        href: "/carrier",
      },
      {
        id: 3,
        name: "FAQ",
        href: "/faq",
      },
      {
        id: 4,
        name: "О портале",
        href: "/about",
      },
      {
        id: 5,
        name: "Тарифы",
        href: "/tariffs",
      },
      {
        id: 6,
        name: "Скачать приложение",
        href: "/download-app",
      },
    ],
  };
  render() {
    let menu = this.state.menu
    return (
      <header className="header container-fluid">
        <div className="header-content row">
          <div className="header-logo d-none d-md-block">
            <Link to="/">
              <img src={logo} className="header-logo-img" alt="Pogrooz" />
            </Link>
          </div>
          <div className="header-logo d-flex d-md-none">
            <Link to="/" className="m-auto">
              <img src={minilogo} className="header-logo-img" alt="Pogrooz" />
            </Link>
          </div>
          <MenuNav />
          <div className="d-premd-block col d-postmd-none"></div>
          <div
            className="header-feedback d-640-none"
            onClick={() => {
              this.setState({ showModal: true });
            }}
          >
            <span className="header-feedback-number">8 800 000 00 00</span>
            <span className="header-feedback-label">
              Заказать обратный звонок
            </span>
          </div>
          <div className="header-sign-up">
            <div className="header-sign-up-btn">
              <Link to="/register" className="register">
                <Button type="fill" paddingVertical={"8px"} paddingHorizontal={'27px'}>
                  Регистрация
                </Button>
              </Link>
              <Link to="/login" className="login">
                <Button type="empty" paddingVertical={"8px"} paddingHorizontal={'27px'}>
                  Вход
                </Button>
              </Link>
            </div>
          </div>
          <div className="toogle-burger">
            <MobileMenu>
              {menu.map((item) => {
                return (
                  <NavLink to={item.href} activeClassName="active">
                    {item.name}
                  </NavLink>
                );
              })}
            </MobileMenu>
          </div>
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => {
            this.setState({ showModal: false });
          }}
          className="col-10 col-md-6 col-lg-4 col-xl-3 col-md-6"
          style={customStyles}
        >
          <h3 className="m-0 font-weight-normal text-center">
            Заказать звонок
          </h3>
          <Input
            type="text"
            className="my-2"
            placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
          />
          <Input type="text" className="my-2" placeholder="Имя" />
          <p className="text-right">
            <Button type="fill" paddingVertical={"6px"}>
              Отправить
            </Button>
          </p>
        </Modal>
      </header>
    );
  }
}

export default Header;
