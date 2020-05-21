// App
import React from "react";
import FeedbackModal from "../Elements/FeedbackModal";
import { withCookies } from "react-cookie";
//IMG
import logo from "../logo.svg";
import minilogo from "../img/logoMobile.svg";
import profile from "../img/profile.png";
import myOrders from "../img/my-orders.png";
import add from "../img/add.png";
import acceptedOrders from "../img/accepted-orders.png";
import geoDetect from "../img/geo-detect.png";
import notificationsFill from "../img/notifications-fill.png";
import support from "../img/support.png";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../Elements/Button";
import MenuNav from "./MenuNav";
import MobileMenu from "./MobileMenu";

// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";

import ArrowDown from "../img/arrowDown.png";

class Header extends React.Component {
  constructor() {
    super();
    this.showProfileMenu = this.showProfileMenu.bind(this);
    this.hideProfileMenu = this.hideProfileMenu.bind(this);
    this.showNotificationsPop = this.showNotificationsPop.bind(this);
    this.hideNotificationsPop = this.hideNotificationsPop.bind(this);
    this.showMessagesPop = this.showMessagesPop.bind(this);
    this.hideMessagesPop = this.hideMessagesPop.bind(this);
  }

  state = {
    showModal: false,
    showMobile: false,
    showProfileMenu: false,
    showNotificationsPop: false,
    showMessagesPop: false,
  };

  showProfileMenu() {
    this.setState({ showProfileMenu: true });
    document.addEventListener("click", this.hideProfileMenu);
  }

  hideProfileMenu() {
    this.setState({ showProfileMenu: false });
    document.removeEventListener("click", this.hideProfileMenu);
  }
  showNotificationsPop() {
    this.setState({ showNotificationsPop: true });
    document.addEventListener("click", this.hideNotificationsPop);
  }

  hideNotificationsPop() {
    this.setState({ showNotificationsPop: false });
    document.removeEventListener("click", this.hideNotificationsPop);
  }
  showMessagesPop() {
    this.setState({ showMessagesPop: true });
    document.addEventListener("click", this.hideMessagesPop);
  }

  hideMessagesPop() {
    this.setState({ showMessagesPop: false });
    document.removeEventListener("click", this.hideMessagesPop);
  }

  logout() {
    const { cookies } = this.props;
    cookies.remove("apiToken", { path: "/" });

    this.props.userActions.logoutUser();
  }

  render() {
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
          {!this.props.user.isAuth && (
            <>
              <div
                className="header-feedback d-640-none"
                onClick={() => {
                  this.setState({ showModal: true });
                }}
              >
                <p className="header-feedback-number">8 800 000 00 00</p>
                <p className="header-feedback-label">
                  Заказать обратный звонок
                </p>
              </div>
              <div className="header-sign-up">
                <div className="header-sign-up-btn">
                  <Link to="/register" className="register">
                    <Button
                      type="fill"
                      paddingVertical={"13px"}
                      paddingHorizontal={"27px"}
                    >
                      Регистрация
                    </Button>
                  </Link>
                  <Link to="/login" className="login">
                    <Button
                      type="empty"
                      paddingVertical={"13px"}
                      paddingHorizontal={"27px"}
                    >
                      Вход
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          {this.props.user.isAuth && (
            <div className="header-fast-access">
              <div
                className="fast-access-btn  notifications not-empty"
                onClick={() => {
                  this.showNotificationsPop();
                }}
              >
                <img src={notificationsFill} alt="Уведомления" />
                <div className="action-counter">
                  <span>3</span>
                </div>
                {this.state.showNotificationsPop && (
                  <div className="pop-block">
                    <div className="pop-block-item">
                      В личном кабинете произошли изменения
                    </div>
                    <div className="pop-block-item">
                      В личном кабинете произошли изменения
                    </div>
                    <div className="pop-block-additionally">Скрыть</div>
                  </div>
                )}
              </div>
              <div
                className="fast-access-btn messages not-empty"
                onClick={() => {
                  this.showMessagesPop();
                }}
              >
                <img src={support} alt="Тех. Поддержка" />
                <div className="action-counter">
                  <span>3</span>
                </div>
                {this.state.showMessagesPop && (
                  <div className="pop-block">
                    <div className="pop-block-item">
                      В личном кабинете произошли изменения
                    </div>
                    <div className="pop-block-item">
                      В личном кабинете произошли изменения
                    </div>
                    <div className="pop-block-additionally">Скрыть</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {this.props.user.isAuth && (
            <div className="header-additionals">
              <Link to="/register" className="register">
                <Button
                  type="fill"
                  paddingVertical={"8px"}
                  paddingHorizontal={"27px"}
                >
                  Добавить предложение
                </Button>
              </Link>
            </div>
          )}

          {this.props.user.isAuth && (
            <div
              className="header-profile"
              onClick={() => {
                this.showProfileMenu();
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                className="header-profile-name"
              >
                <p
                  style={{ margin: 0, fontSize: 14, lineHeight: "16px" }}
                >{`${this.props.user.lastName} ${this.props.user.firstName}`}</p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: "15px" }}>
                  Физ лицо
                </p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: "15px" }}>
                  {this.props.user.type === "cargo" && "Грузовладелец"}
                  {this.props.user.type === "carrier" && "Перевозчик"}
                </p>
              </div>
              <div
                style={{ cursor: "pointer" }}
                className="header-profile-arrow-down"
              >
                <img
                  src={ArrowDown}
                  alt="Профиль"
                  style={{
                    filter: this.state.showProfileMenu
                      ? "invert(22%) sepia(99%) saturate(7342%) hue-rotate(277deg) brightness(93%) contrast(111%)"
                      : "",
                  }}
                />
              </div>

              {this.state.showProfileMenu && (
                <div className="profile-menu">
                  <Link to="/profile">
                    <div className="profile-menu-item">
                      <img src={profile} alt="Профиль" />
                      Профиль
                    </div>
                  </Link>
                  <div className="profile-menu-item">
                    <img src={myOrders} alt="Мои заказы" />
                    Мои заказы
                  </div>
                  <div className="profile-menu-item">
                    <img src={add} alt="Добавить заказ" />
                    Добавить заказ
                  </div>
                  <div className="profile-menu-item">
                    <img src={acceptedOrders} alt="Взятые предложения" />
                    Взятые предложения
                  </div>
                  <div className="profile-menu-item">
                    <img src={geoDetect} alt="Отслеживание" />
                    Отслеживание
                  </div>
                  <div
                    className="profile-menu-additionally"
                    onClick={() => {
                      this.logout();
                    }}
                  >
                    Выйти
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="toogle-burger">
            <MobileMenu />
          </div>
        </div>
        <FeedbackModal
          isOpen={this.state.showModal}
          onRequestClose={() => {
            this.setState({ showModal: false });
          }}
        />
      </header>
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
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(Header));
