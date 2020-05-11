// App
import React from "react";
import Modal from "react-modal";
import { withCookies } from 'react-cookie'
//IMG
import logo from "../logo.svg";
import minilogo from "../img/minilogo.png";
import profile from "../img/profile.png";
import myOrders from "../img/my-orders.png";
import add from "../img/add.png";
import acceptedOrders from "../img/accepted-orders.png";
import geoDetect from "../img/geo-detect.png";
import notificationsFill from "../img/notifications-fill.png";
import support from "../img/support.png";

// Router
import { NavLink, Link } from "react-router-dom";

// Elements
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import MenuNav from "./MenuNav";
import MobileMenu from "./MobileMenu";

// Redux
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/user'
import { bindActionCreators } from 'redux'

import ArrowDown from '../img/arrowDown.png'

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
  constructor() {
    super() 

    this.showProfileMenu = this.showProfileMenu.bind(this);
    this.hideProfileMenu = this.hideProfileMenu.bind(this);
  }

  state = {
    showModal: false,
    showProfileMenu: false,
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
      {
        id: 7,
        name: "Вход",
        href: "/login",
        notIsAuth:true
      },
      {
        id: 8,
        name: "Регистрация",
        href: "/register",
        notIsAuth:true
      },
    ],
  };
  
  showProfileMenu() {
    this.setState({showProfileMenu: true})
    document.addEventListener('click', this.hideProfileMenu)
  }

  hideProfileMenu() {
    this.setState({showProfileMenu: false})
    document.removeEventListener('click', this.hideProfileMenu)
  }

  logout() {
    const { cookies } = this.props
    cookies.remove('apiToken', { path: '/' })

    this.props.userActions.logoutUser()
  }

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
          {!this.props.user.isAuth && <><div
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
          </div></>}
          
          {this.props.user.isAuth && <div className="header-fast-access">
            <div className="fast-access-btn"><img src={notificationsFill} alt="Уведомления" /><div className="action-counter"><span>3</span></div></div>
            <div className="fast-access-btn"><img src={support} alt="Тех. Поддержка" /><div className="action-counter"><span>3</span></div></div>
          </div>}

          {this.props.user.isAuth && <div className="header-additionals">
            <Link to="/register" className="register">
              <Button type="fill" paddingVertical={"8px"} paddingHorizontal={'27px'}>
                Добавить предложение
              </Button>
            </Link>
          </div>}

          {this.props.user.isAuth && <div className="header-profile" onClick={() => {this.showProfileMenu()}}>
            <div style={{cursor: 'pointer'}} className="header-profile-name">
              <p style={{margin: 0, fontSize: 14, lineHeight: '16px'}}>{`${this.props.user.lastName} ${this.props.user.firstName}`}</p>
              <p style={{margin: 0, fontSize: 12, lineHeight: '15px'}}>Физ лицо</p>
              <p style={{margin: 0, fontSize: 12, lineHeight: '15px'}}>
                {this.props.user.type === 'cargo' && 'Грузовладелец'}
                {this.props.user.type === 'carrier' && 'Перевозчик'}
              </p>
            </div>
            <div style={{cursor: 'pointer'}} className="header-profile-arrow-down">
              <img src={ArrowDown} alt="Профиль" style={{filter: this.state.showProfileMenu ? 'invert(22%) sepia(99%) saturate(7342%) hue-rotate(277deg) brightness(93%) contrast(111%)' : ''}} />
            </div>

            {this.state.showProfileMenu && <div className='profile-menu'>
              <Link to="/profile"><div className='profile-menu-item'><img src={profile} alt="Профиль" />Профиль</div></Link>
              <div className='profile-menu-item'><img src={myOrders} alt="Мои заказы" />Мои заказы</div>
              <div className='profile-menu-item'><img src={add} alt="Добавить заказ" />Добавить заказ</div>
              <div className='profile-menu-item'><img src={acceptedOrders} alt="Взятые предложения" />Взятые предложения</div>
              <div className='profile-menu-item'><img src={geoDetect} alt="Отслеживание" />Отслеживание</div>
              <div className='profile-menu-additionally' onClick={() => {this.logout()}}>Выйти</div>
            </div>}
          </div>}
          <div className="toogle-burger">
            <MobileMenu>
              {menu.map((item, i) => {
                if((item.notIsAuth && !this.props.user.isAuth) || !item.notIsAuth)
                return (
                  <div key={item.id}>
                    <NavLink to={item.href} key={item.id} activeClassName="active">
                      {item.name}
                    </NavLink>
                    {i+1 !== menu.length && <div className="seperator"></div>}
                  </div>
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

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Header))