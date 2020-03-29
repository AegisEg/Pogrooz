// App
import React from 'react'
import logo from '../img/footer_logo.png'
import vk from '../img/vk.png'
import facebook from '../img/facebook.png'
import instagramm from '../img/instagramm.png'
import iosapp from '../img/iosapp.png'
import googleapp from '../img/google.png'

// Router
import {
    Link
} from "react-router-dom"


class Footer extends React.Component {
    render() {
        return (
            <footer className="footer   py-4">
              <div className="row mx-0">
                  <div className="d-none d-md-block col-2 text-left">
                    <img src={logo} className="footer-logo-img" alt="Pogrooz" />
                  </div>
                  <div className="col-lg-6 footer_menu">
                    <div className="footer_list">
                        <p><Link to="/faq" >Грузовладельцам</Link></p>
                        <ul>
                            <li>
                                <Link to="/faq" >Договор</Link>
                            </li>
                            <li>
                                <Link to="/faq" >Интсрукция</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_list">
                        <p><Link to="/faq" >Грузовладельцам</Link></p>
                        <ul>
                            <li>
                                <Link to="/faq" >Договор</Link>
                            </li>
                            <li>
                                <Link to="/faq" >Интсрукция</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_list">
                        <p><Link to="/faq" >Грузовладельцам</Link></p>
                        <ul>
                            <li>
                                <Link to="/faq" >Договор</Link>
                            </li>
                            <li>
                                <Link to="/faq" >Интсрукция</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_list">
                        <p><Link to="/faq" >Грузовладельцам</Link></p>
                        <ul>
                            <li>
                                <Link to="/faq" >Договор</Link>
                            </li>
                            <li>
                                <Link to="/faq" >Интсрукция</Link>
                            </li>
                        </ul>
                    </div>                    
                  </div>
                  <div className="col-lg-4 text-right">
                    <div className="row">
                        <div className="text-left footer_list col-6">
                            <p>Контакты</p>
                            <ul>
                                <li>
                                    8 (800) 000 00 00
                                </li>
                                <li>
                                    <a href="mailto:info@dasdo.ru" className="mail">info@dasdo.ru</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <p className="">Мы в социальных сетях</p>
                            <div>
                                <img className="mx-2" src={vk}/>
                                <img className="mx-2" src={facebook}/>
                                <img className="mx-2" src={instagramm}/>
                            </div>
                        </div>
                    </div>                    
                    <div className="download_block">
                        <p>Скачать приложения</p>
                        <div className="d-flex download_link">
                            <img className="px-1 w-50" src={iosapp}/>
                            <img className="px-1 w-50" src={googleapp}/>
                        </div>
                    </div>                    
                  </div>   
                  <div className="col-12">         
                    <span className="postscript">
                        © 2017-2020 Pogrooz Попутные грузоперевозки
                    </span>
                  </div>
              </div>
            </footer>
        )
    }
}

export default Footer