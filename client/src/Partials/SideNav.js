// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { NavLink, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

// Images
import profile from "../img/profile.png";
import myOrders from "../img/my-orders.png";
import acceptedOrders from "../img/accepted-orders.png";
import chatOrder from "../img/chat-order.png";
import chatUser from "../img/chatUser.png";
import geoDetect from "../img/geo-detect.png";
import messages from "../img/messages.png";
import raiting from "../img/raiting.png";
import gear from "../img/gear.png";
import notifications from "../img/notifications.png";
import sidebarOpen from "../img/sidebarOpen.png";
import sidebarAngleOpen from "../img/sidebarAngleOpen.png";
// Images END

// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";

var menu = [
  {
    name: "Мои заказ",
    icon: myOrders,
    // role: "cargo",
    childlist: [
      {
        name: "Открытые",
        to: "/my-orders-open",
        icon: chatOrder,
      },
      {
        name: "В работе",
        to: "/my-orders-working",
        icon: chatUser,
      },
      {
        name: "Завершенные",
        to: "/my-orders-completed",
        icon: chatUser,
      },
    ],
  },
  {
    name: "Мои предложения",
    icon: acceptedOrders,
    // role: "carrier",
    childlist: [
      {
        name: "Открытые",
        to: "/my-offers-open",
        icon: chatOrder,
      },
      {
        name: "В работе",
        to: "/my-offers-working",
        icon: chatUser,
      },
      {
        name: "Завершенные",
        to: "/my-offers-completed",
        icon: chatUser,
      },
    ],
  },
  {
    name: "Отслеживание",
    to: "/geo-detect",
    icon: geoDetect,
  },
  {
    name: "Сообщения",
    to: "",
    icon: messages,
    childlist: [
      {
        name: "Сообщения по заказам, предложениям",
        to: "/messages",
        icon: chatOrder,
      },
      {
        name: "Сообщения пользователей",
        to: "/profile",
        icon: chatUser,
      },
    ],
  },
  {
    name: "Отзывы",
    to: "/reviews",
    icon: raiting,
  },
  {
    name: "Профиль",
    to: "/profile",
    icon: profile,
  },
  {
    name: "Уведомления",
    to: "/notifications",
    icon: notifications,
  },
  {
    name: "Настройки уведомлений",
    to: "/notifications-settings",
    icon: gear,
  },
];

class MenuItem1 extends React.Component {
  state = {
    isOpen: false,
  };
  componentDidMount() {
    if (
      this.props.childlist &&
      this.props.childlist.length &&
      this.props.childlist.find((item) => {
        return item.to === this.props.match.path;
      }) &&
      !this.state.active
    )
      this.setState({ isOpen: true });
  }
  render() {
    if (this.props.childlist && this.props.childlist.length) {
      return (
        <span className="parent-item">
          <div
            className={`side-nav-item label`}
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            <img src={this.props.icon} alt="{this.props.name} " />
            <span>{this.props.name} </span>
          </div>
          <CSSTransitionGroup
            transitionName="height-animation-item"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            style={{
              display: "contents",
            }}
            className="children-list"
          >
            {this.state.isOpen &&
              this.props.childlist.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    to={item.to}
                    icon={item.icon}
                    className={item.className}
                    name={item.name}
                    childlist={item.childlist}
                  />
                );
              })}
          </CSSTransitionGroup>
        </span>
      );
    } else
      return (
        <NavLink to={this.props.to} activeClassName="active">
          <div className="side-nav-item">
            <img src={this.props.icon} alt={this.props.name} />
            <span>{this.props.name}</span>
          </div>
        </NavLink>
      );
  }
}
let MenuItem = withRouter(MenuItem1);
class SideNav extends React.Component {
  state = {
    isOpen: false,
    height: "auto",
  };
  updateDimensions = () => {
    let height = document.getElementsByClassName("content")[0].offsetHeight;
    if (window.innerWidth <= 1024)
      this.setState({
        height: height,
      });
    else this.setState({ height: "auto" });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <div
        className={`side-nav ${this.state.isOpen ? "open" : ""}`}
        style={{
          height: this.state.height,
        }}
      >
        {menu.map((item, index) => {
          if (!item.role || item.role == this.props.user.type)
            return (
              <MenuItem
                key={index}
                to={item.to}
                icon={item.icon}
                className={item.className}
                name={item.name}
                childlist={item.childlist}
              />
            );
        })}

        <span
          className="toogle-sideBar"
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
        >
          <img src={sidebarOpen} alt="sidebarOpen" />
          <img
            src={sidebarAngleOpen}
            className="angle"
            alt="sidebarAngleOpen"
          />
        </span>
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
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(SideNav));
