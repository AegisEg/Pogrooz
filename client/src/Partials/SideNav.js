// App
import React from 'react'

// Images
import profile from "../img/profile.png";
import myOrders from "../img/my-orders.png";
import acceptedOrders from "../img/accepted-orders.png";
import geoDetect from "../img/geo-detect.png";
import messages from "../img/messages.png";
import raiting from "../img/raiting.png";
import notifications from "../img/notifications.png";

import { NavLink } from 'react-router-dom';

class SideNav extends React.Component {
    state = {
        show: false
    }

    render() {
        return (
            <div className="side-nav">
                <NavLink to="/my-orders" activeClassName="active"><div className='side-nav-item'><img src={myOrders} alt="Мои заказы" />Мои заказы</div></NavLink>
                <NavLink to="/taken-orders" activeClassName="active"><div className='side-nav-item'><img src={acceptedOrders} alt="Взятые  предложения" />Взятые  предложения</div></NavLink>
                <NavLink to="/geo-detect" activeClassName="active"><div className='side-nav-item'><img src={geoDetect} alt="Отслеживание" />Отслеживание</div></NavLink>
                <NavLink to="/messages" activeClassName="active"><div className='side-nav-item'><img src={messages} alt="Сообщения" />Сообщения</div></NavLink>
                <NavLink to="/reviews" activeClassName="active"><div className='side-nav-item'><img src={raiting} alt="Отзывы" />Отзывы</div></NavLink>
                <NavLink to="/profile" activeClassName="active"><div className='side-nav-item'><img src={profile} alt="Профиль" />Профиль</div></NavLink>
                <NavLink to="/notifications" activeClassName="active"><div className='side-nav-item'><img src={notifications} alt="Уведомления" />Уведомления</div></NavLink>
            </div>
        )
    }
}

export default SideNav