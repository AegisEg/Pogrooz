// App
import React from 'react'
import logo from '../logo.svg'
import burger from '../img/burger.png'
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
                    <div className="d-premd-block col d-postmd-none"></div>               
                    <div className="header-feedback d-640-none">

                        <span className="header-feedback-number">8 800 000 00 00</span>
                        <span className="header-feedback-label">Заказать обратный звонок</span>
                    </div>
                    <div className="header-sign-up">
                        <div className="header-sign-up-btn">
                            <Link to="/register" className="register"><Button type="fill" paddingVertical={"6px"}>Регистрация</Button></Link>
                            <Link to="/login" className="login"><Button type="empty" paddingVertical={"6px"}>Вход</Button></Link>
                        </div>
                    </div>
                    <div className="toogle-burger">
                        <img src={burger}/>
                    </div>                    
                </div>
            </header>
        )
    }
}

export default Header