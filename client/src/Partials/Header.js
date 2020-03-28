// App
import React from 'react'
import logo from '../logo.svg'

// Router
import {
    NavLink,
    Link
} from "react-router-dom"

// Elements
import Button from '../Elements/Button'

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
                                    <NavLink to="/faq" activeClassName="active-header-link">Грузовладельцам</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/faq" activeClassName="active-header-link">Перевозчикам</NavLink>
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
                            <Link to="/register"><Button type="fill" margin={"0 15px 0 0"} paddingVertical={"6px"}>Регистрация</Button></Link>
                            <Link to="/login"><Button type="empty" paddingVertical={"6px"}>Вход</Button></Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header