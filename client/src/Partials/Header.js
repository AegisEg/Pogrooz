// App
import React from 'react'
import logo from '../logo.svg'

// Router
import {
    NavLink,
    Link
} from "react-router-dom"

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="header-content">
                    <div className="header-logo">
                        <Link to="/"><img src={logo} className="header-logo-img" alt="Pogrooz" /></Link>
                    </div>

                    <div className="header-navigation">
                        <nav>
                            <ul>
                                <li>
                                    <a>Грузовладельцам</a>
                                </li>
                                <li>
                                    <a>Перевозчикам</a>
                                </li>
                                <li>
                                    <NavLink to="/faq" activeClassName="active-header-link">FAQ</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header-feedback">
                        <span className="header-feedback-number">8 800 000 00 00</span>
                        <span className="header-feedback-label">Заказать обратный звонок</span>
                    </div>

                    <div className="header-sign-up">
                        <div className="header-sign-up-btn">
                            <Link to="/register" className="header-register">Регистрация</Link>
                            <Link to="/login" className="header-login">Вход</Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header