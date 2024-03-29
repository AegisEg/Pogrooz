// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
// Images
import sidebarOpen from "../img/sidebarOpen.png";
import sidebarAngleOpen from "../img/sidebarAngleOpen.png";
// Images END
import menu from "../config/sideMenu";
import download from "../img/sideMenu/download.svg";
// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { bindActionCreators } from "redux";

class MenuItem1 extends React.Component {
  state = {
    isOpen:
      this.props.childlist &&
      this.props.childlist.length &&
      this.props.childlist.find((item) => {
        return item.to === this.props.match.path;
      }),
  };
  render() {
    if (this.props.childlist && !!this.props.childlist.length) {
      return (
        <span className={`parent-item ${this.props.className}`}>
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
        <NavLink to={this.props.to}>
          <div className={`side-nav-item ${this.props.className}`}>
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
  };
  // updateDimensions = () => {
  //   let height = document.getElementsByClassName("content")[0].offsetHeight;
  //   if (window.innerWidth <= 1024)
  //     this.setState({
  //       height: height,
  //     });
  //   else this.setState({ height: "auto" });
  // };
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }
  // componentDidMount() {
  //     this.updateDimensions();
  //   window.addEventListener("resize", this.updateDimensions);
  // }
  render() {
    return (
      <div
        className={`side-nav ${this.state.isOpen ? "open" : ""}`}
        onClick={() => {
          if (window.innerWidth <= 800 && !this.state.isOpen)
            this.setState({ isOpen: true });
        }}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={(props) => (
            <div className="d-none track-vertical" />
          )}
        >
          {menu.map((item, index) => {
            if (
              (!item.role || item.role === this.props.user.type) &&
              !item.onlyMobile
            )
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
          <a href={this.props.settings.settings.dogovor || "/"}>
            <div className={`side-nav-item download-order`}>
              <img
                src={download}
                alt={"Шаблон договора между Перевозчиком и Грузовладельцем"}
              />
              <span>Шаблон договора между Перевозчиком и Грузовладельцем</span>
            </div>
          </a>
        </Scrollbars>
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
    settings: state.settings,
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
