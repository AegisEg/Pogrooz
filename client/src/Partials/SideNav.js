// App
import React from "react";

// Images
import profile from "../img/profile.png";
import myOrders from "../img/my-orders.png";
import acceptedOrders from "../img/accepted-orders.png";
import geoDetect from "../img/geo-detect.png";
import messages from "../img/messages.png";
import raiting from "../img/raiting.png";
import gear from "../img/gear.png";
import notifications from "../img/notifications.png";
import sidebarOpen from "../img/sidebarOpen.png";
import sidebarAngleOpen from "../img/sidebarAngleOpen.png";

import { NavLink } from "react-router-dom";

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
  componentDidUpdate() {
    console.log(
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      )
    );
  }
  render() {
    return (
      <div
        className={`side-nav ${this.state.isOpen ? "open" : ""}`}
        style={{
          height: this.state.height,
        }}
      >
        <NavLink to="/my-orders" activeClassName="active">
          <div className="side-nav-item">
            <img src={myOrders} alt="Мои заказы" />
            <span>Мои заказы</span>
          </div>
        </NavLink>
        <NavLink to="/taken-orders" activeClassName="active">
          <div className="side-nav-item">
            <img src={acceptedOrders} alt="Взятые  предложения" />
            <span>Взятые предложения</span>
          </div>
        </NavLink>
        <NavLink to="/geo-detect" activeClassName="active">
          <div className="side-nav-item">
            <img src={geoDetect} alt="Отслеживание" />
            <span>Отслеживание</span>
          </div>
        </NavLink>
        <NavLink to="/messages" activeClassName="active">
          <div className="side-nav-item">
            <img src={messages} alt="Сообщения" />
            <span>Сообщения</span>
          </div>
        </NavLink>
        <NavLink to="/reviews" activeClassName="active">
          <div className="side-nav-item">
            <img src={raiting} alt="Отзывы" />
            <span>Отзывы</span>
          </div>
        </NavLink>
        <NavLink to="/profile" activeClassName="active">
          <div className="side-nav-item">
            <img src={profile} alt="Профиль" />
            <span>Профиль</span>
          </div>
        </NavLink>
        <NavLink to="/notifications" activeClassName="active">
          <div className="side-nav-item">
            <img src={notifications} alt="Уведомления" />
            <span>Уведомления</span>
          </div>
        </NavLink>
        <NavLink to="/notifications-settings" activeClassName="active">
          <div className="side-nav-item">
            <img src={gear} alt="Настройки уведомлений" />
            <span>Настройки уведомлений</span>
          </div>
        </NavLink>
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

export default SideNav;
