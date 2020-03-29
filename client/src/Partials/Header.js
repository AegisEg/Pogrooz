// App
import React from 'react'
import logo from '../logo.svg'
// Router
import {
    Link
} from "react-router-dom"

// Elements
import Button from '../Elements/Button'
import MenuNav from './MenuNav'

class Header extends React.Component {
    onResize(size){
        console.log(size);
    }
    render() {
        return (
            <header className="header container-fluid">
                <div className="header-content row">
                    <div className="header-logo">
                        <Link to="/"><img src={logo} className="header-logo-img" alt="Pogrooz" /></Link>
                    </div>
                    <MenuNav/>
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