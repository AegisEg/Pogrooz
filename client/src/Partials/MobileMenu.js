// App
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";
import { withCookies } from "react-cookie";
import burger from "../img/burger.png";
var menu = [
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
  {
    id: 7,
    name: "Вход",
    href: "/login",
    notIsAuth: true,
  },
  {
    id: 8,
    name: "Регистрация",
    href: "/register",
    notIsAuth: true,
  },
];
var styles = {
  bmBurgerButton: {
    position: "relative",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    top: 0,
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "20px 10px",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    padding: "0.8em",
  },
  bmItem: {
    display: "block",
    color: "#fff",
    textAlign: "center",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: "0",
    right: "0",
  },
};
class MobileMenu extends React.Component {
  state = {
    showMobile: false,
  };
  handleStateChange(state) {
    this.setState({ showMobile: state.isOpen });
  }
  render() {
    return (
      <>
        <Menu
          styles={styles}
          isOpen={this.state.showMobile}
          onStateChange={(state) => this.handleStateChange(state)}
          customBurgerIcon={<img src={burger} alt="Мобильное меню" />}
          right
        >
          {menu.map((item, index) => {
            if ((item.notIsAuth && !this.props.user.isAuth) || !item.notIsAuth)
              return (
                <div key={index}>
                  <NavLink
                    to={item.href}
                    key={index}
                    activeClassName="active"
                    onClick={() => {
                      this.setState({ showMobile: false });
                    }}
                  >
                    {item.name}
                  </NavLink>
                  {index + 1 !== menu.length && (
                    <div className="seperator"></div>
                  )}
                </div>
              );
          })}
        </Menu>
      </>
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
)(withCookies(MobileMenu));
