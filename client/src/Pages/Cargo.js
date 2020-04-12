// App
import React from 'react'

// Router
import {
    Link
} from "react-router-dom"

// Elements
import Button from '../Elements/Button'

// Images
import ImgFree from '../img/free.png'
import ImgLk from '../img/lk.png'
import ImgChat from '../img/chat.png'
import ImgGeo from '../img/geo.png'
import ImgPhone from '../img/phone.png'
import ImgBigStar from '../img/big-star.png'
import Filter from '../Elements/Filter'

class Cargo extends React.Component {
    render() {
        return (
            <div className="cargo-page">
                <h1>Владельцам груза</h1>
                
                <Filter />
                <div className="cargo-pros row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="cargo-pros-image-block">
                            <img className="cargo-pros-image" src={ImgFree} />
                        </div>

                        <p className="cargo-pros-label">Беcплатно. Без процентов и комиссий</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="cargo-pros-image-block">
                            <img className="cargo-pros-image" src={ImgLk} />
                        </div>

                        <p className="cargo-pros-label">Простой и удобный личный кабинет</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="cargo-pros-image-block">
                            <img className="cargo-pros-image" src={ImgChat} />
                        </div>

                        <p className="cargo-pros-label">Система оповещений и сообщений</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="cargo-pros-image-block">
                            <img className="cargo-pros-image" src={ImgGeo} />
                        </div>

                        <p className="cargo-pros-label">Отслеживание груза в пути</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="cargo-pros-image-block">
                            <img className="cargo-pros-image" src={ImgPhone} />
                        </div>

                        <p className="cargo-pros-label">Прямое общение с перевозчиком</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="cargo-pros-image-block">
                            <img className="cargo-pros-image" src={ImgBigStar} />
                        </div>

                        <p className="cargo-pros-label">Честная система рейтинга</p>
                    </div>
                </div>

                <div className="cargo-steps">
                    <h3>Как это работает?</h3>

                    <div className="cargo-steps-block row">
                        <div className="cargo-step col">
                            <div className="cargo-step-number">
                                <span>1</span>
                            </div>

                            <p className="cargo-step-label">Создайте заказ</p>
                        </div>
                        <div className="cargo-step col">
                            <div className="cargo-step-number">
                                <span>2</span>
                            </div>

                            <p className="cargo-step-label">Создайте заказ</p>
                        </div>
                        <div className="cargo-step col">
                            <div className="cargo-step-number">
                                <span>3</span>
                            </div>

                            <p className="cargo-step-label">Выберите исполнителя по рейтингу и цене</p>
                        </div>
                        <div className="cargo-step col">
                            <div className="cargo-step-number">
                                <span>4</span>
                            </div>

                            <p className="cargo-step-label">Создайте заказ</p>
                        </div>

                        <Link to="/register"><Button type="fill" paddingVertical={'11px'} paddingHorizontal={'20px'} margin={'0 0 0 35px'} lineHeight={'18px'}>Поробовать<br></br>БЕСПЛАТНО</Button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cargo