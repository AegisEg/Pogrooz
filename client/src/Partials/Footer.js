// App
import React from "react";
import { connect } from "react-redux";

import logo from "../img/footer_logo.svg";
//Иконки соцсетей
import vk from "../img/vk.png";
import facebook from "../img/facebook.png";
import instagramm from "../img/instagramm.png";
import vkhover from "../img/vk-hover.png";
import facebookhover from "../img/facebook-hover.png";
import instagrammhover from "../img/instagramm-hover.png";
//Картинкип приложений
import iosapp from "../img/iosapp.png";
import googleapp from "../img/google.png";
import iosapphover from "../img/iosapp-hover.png";
import googleapphover from "../img/google-hover.png";
// Router
import { Link } from "react-router-dom";
let pat = /^https?:\/\//i;
class Footer extends React.Component {
  state = {
    isHovervk: false,
    isHoverfacebook: false,
    isHoverinstagramm: false,
    isHoveriosapp: false,
    isHovergoogleapp: false,
  };
  isExternal(url) {
    let tempLink = document.createElement("a");
    tempLink.href = url;
    return tempLink.hostname === window.location.hostname;
  }
  render() {
    return (
      <footer className="footer глаза  py-4">
        <div className="container-fluid">
          <div className="row ">
            <div className="d-none d-md-block col-2 text-left">
              <img src={logo} className="footer-logo-img" alt="Pogrooz" />
            </div>
            <div className="footer_menu footer_list  col-presm-8 col-sm-7 col-md-6  row align-content-start">
              {this.props.settings.isGetted &&
                this.props.settings.menu.map((item, index) => {
                  let items = item.items.filter(
                    (item) => !this.props.user.isAuth || !item.onlyNoAuth
                  );
                  if (!!items.length)
                    return (
                      <div key={index} className="col">
                        <p>
                          <span className="text-uppercase title-ul">
                            {item.partition.link &&
                              this.isExternal(item.partition.link) && (
                                <Link to={item.partition.link}>
                                  {item.partition.name}
                                </Link>
                              )}
                            {item.partition.link &&
                              !this.isExternal(item.partition.link) && (
                                <a href={item.partition.link}>
                                  {item.partition.name}
                                </a>
                              )}
                            {!item.partition.link && item.partition.name}
                          </span>
                        </p>
                        <ul>
                          {items.map((item, index) => {
                            return (
                              <li key={index}>
                                {item.link &&
                                  !pat.test(item.link) &&
                                  this.isExternal(item.link) && (
                                    <Link to={item.link}>{item.name}</Link>
                                  )}
                                {item.link &&
                                  pat.test(item.link) &&
                                  !this.isExternal(item.link) && (
                                    <a href={item.link}>{item.name}</a>
                                  )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                })}
            </div>
            <div className="col-380-12 col text-right">
              <div className="row">
                <div className="text-lg-left footer_list col-380-6 col-premd-12 col-lg-5 text-380-left text-premd-right">
                  <p>Контакты</p>
                  <ul>
                    <li>{this.props.settings.settings.phone}</li>
                    <li>
                      <a
                        href={`mailto:${this.props.settings.settings.email}`}
                        className="mail"
                      >
                        {this.props.settings.settings.email}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-380-6 col-premd-12 col-lg-7 text-premd text-premd-right">
                  <p
                    style={{
                      color: "#00000",
                    }}
                  >
                    Мы в социальных сетях
                  </p>
                  <div className="social_link">
                    <span>
                      <a target="_blank" href={this.props.settings.settings.vk}>
                        <img
                          src={this.state.isHovervk ? vkhover : vk}
                          onMouseEnter={() => {
                            this.setState({ isHovervk: true });
                          }}
                          onMouseLeave={() => {
                            this.setState({ isHovervk: false });
                          }}
                          alt="vk"
                        />
                      </a>
                    </span>
                    <span>
                      <a
                        target="_blank"
                        href={this.props.settings.settings.facebook}
                      >
                        <img
                          src={
                            this.state.isHoverfacebook
                              ? facebookhover
                              : facebook
                          }
                          onMouseEnter={() => {
                            this.setState({ isHoverfacebook: true });
                          }}
                          onMouseLeave={() => {
                            this.setState({ isHoverfacebook: false });
                          }}
                          alt="facebook"
                        />
                      </a>
                    </span>
                    <span>
                      <a
                        target="_blank"
                        href={this.props.settings.settings.instagram}
                      >
                        <img
                          src={
                            this.state.isHoverinstagramm
                              ? instagrammhover
                              : instagramm
                          }
                          onMouseEnter={() => {
                            this.setState({ isHoverinstagramm: true });
                          }}
                          onMouseLeave={() => {
                            this.setState({ isHoverinstagramm: false });
                          }}
                          alt="instagramm"
                        />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="download_block text-380-center">
                <p
                  style={{
                    color: "#00000",
                  }}
                >
                  Скачать приложения
                </p>
                <div className="download_link">
                  <Link to="/download-app">
                    <img
                      className="pr-1"
                      width="107"
                      src={this.state.isHoveriosapp ? iosapphover : iosapp}
                      onMouseEnter={() => {
                        this.setState({ isHoveriosapp: true });
                      }}
                      onMouseLeave={() => {
                        this.setState({ isHoveriosapp: false });
                      }}
                      alt="iosapp"
                    />
                  </Link>
                  <Link to="/download-app">
                    <img
                      className="pl-1"
                      width="107"
                      src={
                        this.state.isHovergoogleapp ? googleapphover : googleapp
                      }
                      onMouseEnter={() => {
                        this.setState({ isHovergoogleapp: true });
                      }}
                      onMouseLeave={() => {
                        this.setState({ isHovergoogleapp: false });
                      }}
                      alt="googleapp"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 text-640-center text-md-left my-4">
              <span className="postscript">
                © 2017 - {new Date().getFullYear()}{" "}
                {this.props.settings.settings.copyright}
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings: state.settings,
  };
};

export default connect(mapStateToProps)(Footer);
