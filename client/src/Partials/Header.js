// App imports
import React from 'react'
import logo from '../logo.svg'

class Header extends React.Component {
    render() {
        return (
            <header className="header container-fluid">
                <div className="row header-content">
                    <div className="header-logo">
                        <img src={logo} alt="Pogrooz" />
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
                                    <a>FAQ</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header-sign-up">
                        <div className="header-sign-up-btn">
                            <a className="fill-btn">Регистрация</a>
                            <a className="empty-btn">Вход</a>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header