// App
import React from "react";

import logo from "../img/footer_logo.png";
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
class Footer extends React.Component {
  state = {
    isHovervk: false,
    isHoverfacebook: false,
    isHoverinstagramm: false,
    isHoveriosapp: false,
    isHovergoogleapp: false,
  };
  render() {
    return (
      <footer className="footer container-fluid  py-4">
        <div className="row mx-0">
          <div className="d-none d-md-block col-2 text-left">
            <img src={logo} className="footer-logo-img" alt="Pogrooz" />
          </div>
          <div className="col-presm-8 col-sm-7 col-md-6 footer_menu row align-content-start">
            <div className="footer_list col-min380-12 col-576px-6  col-sm-5">
              <p>
                <span className="text-uppercase title-ul">
                  <Link to="/faq">Грузовладельцам</Link>
                </span>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Договор</Link>
                </li>
                <li>
                  <Link to="/faq">Интсрукция</Link>
                </li>
              </ul>
              <p>
                <span className="text-uppercase title-ul">
                  <Link to="/faq">Перевозчику</Link>
                </span>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Договор с перевозчиком</Link>
                </li>
                <li>
                  <Link to="/faq">Интсрукция</Link>
                </li>
                <li>
                  <Link to="/faq">Тарифы</Link>
                </li>
              </ul>
            </div>
            <div className="footer_list col-min380-12 col-576px-6  col-sm-7">
              <p>
                <span className="text-uppercase title-ul">
                  <Link to="/faq">Услги</Link>
                </span>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Найти предложение на грузоперевозку</Link>
                </li>
                <li>
                  <Link to="/faq">Найти Перевозчика</Link>
                </li>
                <li>
                  <Link to="/faq">Найти заказ</Link>
                </li>
              </ul>
              <p>
                <span className="text-uppercase title-ul">
                  <Link to="/faq">Информация</Link>
                </span>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Вопросы и ответы</Link>
                </li>
                <li>
                  <Link to="/faq">
                    Соглашения о обработке персональных данных
                  </Link>
                </li>
                <li>
                  <Link to="/faq">Положение о защите персональных данных</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-380-12 col-presm-4 col-sm-5 col-md-4 text-right">
            <div className="row">
              <div className="text-lg-left footer_list col-380-6 col-premd-12 col-lg-5 text-380-left text-premd-right">
                <p>Контакты</p>
                <ul>
                  <li>8 (800) 000 00 00</li>
                  <li>
                    <a href="mailto:info@dasdo.ru" className="mail">
                      info@dasdo.ru
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-380-6 col-premd-12 col-lg-7 text-premd text-premd-right">
                <p className="">Мы в социальных сетях</p>
                <div className="social_link">
                  <span className="mx-2">
                    <Link to="/">
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
                    </Link>
                  </span>
                  <span className="mx-2">
                    <Link to="/">
                      <img
                        src={
                          this.state.isHoverfacebook ? facebookhover : facebook
                        }
                        onMouseEnter={() => {
                          this.setState({ isHoverfacebook: true });
                        }}
                        onMouseLeave={() => {
                          this.setState({ isHoverfacebook: false });
                        }}
                        F
                        onhove
                        alt="facebook"
                      />
                    </Link>
                  </span>
                  <span className="ml-2">
                    <Link to="/">
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
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="download_block text-380-center">
              <p>Скачать приложения</p>
              <div className="download_link">
                <Link to="/">
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
                <Link to="/">
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
              © 2017-2020 Pogrooz Попутные грузоперевозки
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
