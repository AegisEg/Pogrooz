// App
import React from "react";
import logo from "../img/footer_logo.png";
import vk from "../img/vk.png";
import facebook from "../img/facebook.png";
import instagramm from "../img/instagramm.png";
import iosapp from "../img/iosapp.png";
import googleapp from "../img/google.png";

// Router
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer container-fluid  py-4">
        <div className="row mx-0">
          <div className="d-none d-md-block col-2 text-left">
            <img src={logo} className="footer-logo-img" alt="Pogrooz" />
          </div>
          <div className="col-presm-8 col-sm-6 col-md-6 footer_menu row align-content-start">
            <div className="footer_list col-min380-12 col-576px-6  col-sm-6">
              <p>
                <Link to="/faq">Грузовладельцам</Link>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Договор</Link>
                </li>
                <li>
                  <Link to="/faq">Интсрукция</Link>
                </li>
              </ul>
            </div>
            <div className="footer_list col-min380-12 col-576px-6  col-sm-6">
              <p>
                <Link to="/faq">Грузовладельцам</Link>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Договор</Link>
                </li>
                <li>
                  <Link to="/faq">Интсрукция</Link>
                </li>
              </ul>
            </div>
            <div className="footer_list col-min380-12 col-576px-6  col-sm-6">
              <p>
                <Link to="/faq">Грузовладельцам</Link>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Договор</Link>
                </li>
                <li>
                  <Link to="/faq">Интсрукция</Link>
                </li>
              </ul>
            </div>
            <div className="footer_list col-min380-12 col-576px-6  col-sm-6">
              <p>
                <Link to="/faq">Грузовладельцам</Link>
              </p>
              <ul>
                <li>
                  <Link to="/faq">Договор</Link>
                </li>
                <li>
                  <Link to="/faq">Интсрукция</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-380-12 col-presm-4 col-sm-6 col-md-4 text-right">
            <div className="row">
              <div className="text-lg-left footer_list col-380-6 col-premd-12 col-lg-6 text-380-left text-premd-right">
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
              <div className="col-380-6 col-premd-12 col-lg-6 text-premd text-premd-right">
                <p className="">Мы в социальных сетях</p>
                <div className="social_link">
                  <span className="mx-2">
                    <img  src={vk} alt="vk" />
                  </span>
                  <span className="mx-2">
                    <img  src={facebook} alt="facebook" />
                  </span>
                  <span className="mx-2">
                    <img  src={instagramm} alt="instagramm" />
                  </span>
                </div>
              </div>
            </div>
            <div className="download_block text-380-center">
              <p>Скачать приложения</p>
              <div className="download_link">
                <img className="px-1" src={iosapp} alt="iosapp" />
                <img className="px-1" src={googleapp} alt="googleapp" />
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
