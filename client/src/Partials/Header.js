import addIcon from "../img/add-icon.svg"; // App
import React from "react";
import FeedbackModal from "../Modal/FeedbackModal";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
//IMG
import logo from "../logo.svg";
import minilogo from "../img/logoMobile.svg";
import smallminilogo from "../img/mini-logo.svg";
import notificationsFill from "../img/notifications-fill.png";
import { ReactComponent as Support } from "../img/support.svg";
import ImgActiveStar from "../img/active-star.png";
import Notification from "../Elements/Notification";
// Elements
import Button from "../Elements/Button";
import MenuNav from "./MenuNav";
import MobileMenu from "./MobileMenu";

// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import menu from "../config/sideMenu";
import ArrowDown from "../img/arrowDown.png";

class Header extends React.Component {
  constructor() {
    super();
    this.showProfileMenu = this.showProfileMenu.bind(this);
    this.hideProfileMenu = this.hideProfileMenu.bind(this);
    this.showNotificationsPop = this.showNotificationsPop.bind(this);
    this.hideNotificationsPop = this.hideNotificationsPop.bind(this);
    this.showTarrifPop = this.showTarrifPop.bind(this);
    this.hideTarrifPop = this.hideTarrifPop.bind(this);
  }

  state = {
    showModal: false,
    showMobile: false,
    showProfileMenu: false,
    showNotificationsPop: false,
    showMessagesPop: false,
    showTarrifPop: false,
  };

  showProfileMenu() {
    this.setState({ showProfileMenu: true });
    document.addEventListener("click", this.hideProfileMenu);
  }
  showTarrifPop() {
    this.setState({ showTarrifPop: true });
    document.addEventListener("click", this.hideTarrifPop);
  }
  hideTarrifPop() {
    this.setState({ showTarrifPop: false });
    document.removeEventListener("click", this.hideTarrifPop);
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
  logout() {
    const { cookies } = this.props;
    cookies.remove("apiToken", { path: "/" });
    this.props.userActions.logoutUser();
    window.location.reload();
  }

  render() {
    return (
      <header className={`header container-fluid`}>
        <div className="header-content d-flex">
          <div className="header-logo d-none d-md-flex align-items-center">
            <Link to="/">
              <img src={logo} className="header-logo-img" alt="Pogrooz" />
            </Link>
          </div>
          <div className="header-logo d-flex d-md-none">
            <Link
              to="/"
              className={`m-auto ${
                this.props.user.isAuth ? "d-none d-sm-block" : ""
              }`}
            >
              <img src={minilogo} className="header-logo-img" alt="Pogrooz" />
            </Link>
            {this.props.user.isAuth && (
              <Link to="/" className="m-auto d-block d-sm-none">
                <img
                  src={smallminilogo}
                  className="header-logo-img"
                  alt="Pogrooz"
                />
              </Link>
            )}
          </div>
          <MenuNav isAuth={this.props.user.isAuth} />
          <div className="col header-stub"></div>
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
                      paddingVertical={"8px"}
                      paddingHorizontal={"27px"}
                    >
                      Регистрация
                    </Button>
                  </Link>
                  <Link to="/login" className="login">
                    <Button
                      type="empty"
                      paddingVertical={"8px"}
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
                className={`fast-access-btn  notifications ${
                  !!this.props.notifications.all.noRead && "not-empty"
                }`}
                onMouseEnter={() => {
                  this.showNotificationsPop();
                }}
                onMouseLeave={() => {
                  this.hideNotificationsPop();
                }}
              >
                <img src={notificationsFill} alt="Уведомления" />
                {!!this.props.notifications.all.noRead && (
                  <div className="action-counter">
                    <span>{this.props.notifications.all.noRead}</span>
                  </div>
                )}
                {this.state.showNotificationsPop && (
                  <div className="pop-block">
                    <Link to="/notifications">
                      {this.props.notifications.all.onlyNoread.slice(0,4).map(
                        (item, index) => {
                          return (
                            <div key={index} className="pop-block-item">
                              <Notification
                                notification={item}
                                onlyText={true}
                              />
                            </div>
                          );
                        }
                      )}
                    </Link>
                    {!this.props.notifications.all.onlyNoread.length && (
                      <div className="pop-block-item text-center">Пусто</div>
                    )}
                    <div className="pop-block-additionally">Скрыть</div>
                  </div>
                )}
              </div>
              <div
                className={`fast-access-btn messages ${
                  (!!this.props.dialogs.dialogsUser.noReadCount ||
                    !!this.props.dialogs.dialogsOrder.noReadCount) &&
                  "not-empty"
                }`}
              >
                <Link to="/messages">
                  <Support />
                  {(!!this.props.dialogs.dialogsUser.noReadCount ||
                    !!this.props.dialogs.dialogsOrder.noReadCount) && (
                    <div className="action-counter">
                      <span>
                        {this.props.dialogs.dialogsUser.noReadCount +
                          this.props.dialogs.dialogsOrder.noReadCount}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            </div>
          )}

          {this.props.user.isAuth && (
            <div className="header-additionals d-md-block d-none">
              <Link
                to={`/${
                  this.props.user.type === "cargo"
                    ? "offer-create"
                    : "order-create"
                }`}
                className="register"
              >
                <Button
                  type="fill"
                  className="d-none d-lg-block"
                  paddingVertical={"8px"}
                  paddingHorizontal={"20px"}
                >
                  Добавить{" "}
                  {this.props.user.type === "cargo" ? "заказ" : "предложение"}
                </Button>
                <Button
                  type="fill"
                  className="d-block d-lg-none"
                  paddingVertical={"8px"}
                  paddingHorizontal={"13px"}
                >
                  <img
                    src={addIcon}
                    style={{
                      verticalAlign: "middle",
                    }}
                    alt="addIcon"
                  />
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
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: "16px",
                    minWidth: "123px",
                  }}
                >{`${this.props.user.name.last} ${this.props.user.name.first}`}</p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: "14px" }}>
                  Физ лицо
                </p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: "14px" }}>
                  <span
                    className="rating-head"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.history.push("/reviews");
                    }}
                  >
                    <span>4,6</span>
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                  </span>
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
                  {menu.map((item, index) => {
                    if (
                      (!item.role || item.role === this.props.user.type) &&
                      (item.mobile || item.onlyMobile)
                    )
                      return (
                        <Link key={index} to={item.to}>
                          <div className="profile-menu-item">
                            <img src={item.icon} alt="Профиль" />
                            {item.name}
                          </div>
                        </Link>
                      );
                    else return null;
                  })}
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
          {this.props.user.isAuth && (
            <div
              style={{ cursor: "pointer", width: "75px", marginRight: "5px" }}
              className="header-profile tarrif-pop text-center f-12"
              onClick={() => {
                this.showTarrifPop();
              }}
            >
              <span>Тариф ДЕМО активен до 20.12.2025</span>
              {this.state.showTarrifPop && (
                <div className="pop-block">
                  <p>До окончания тарифа осталось 2 дня.</p>
                  <p>
                    Если его не продлить - ваш профиль и предлжения будут скрыты
                    для других пользователей.
                    <b>Вы не сможете брать заказы.</b>
                  </p>
                  <Link to="/mytarif">
                    <Button type="fill" className="mt-2">
                      Пополнить
                    </Button>
                  </Link>
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
    dialogs: state.dialogs,
    notifications: state.notifications,
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
)(withRouter(withCookies(Header)));
