// App
import React from 'react'
import ImagePreview from '../img/main-preview.png'

// Router
import {
    Link
} from "react-router-dom"

// Elements
import Button from '../Elements/Button'

class Main extends React.Component {
    render() {
        return (
            <div className="main-page">
                 <div className="main-preview">
                    <div className="row col-12">
                        <div className="main-text-block">
                            <h1 className="main-title">Pogrooz</h1>
                            <h2 className="main-subtitle">Куда угодно. Что угодно.</h2>

                            <h3 className="main-description-title">Поисковик попутных перевозок для ваших грузов</h3>
                            <p className="main-description-subtitle">Срочные объявления по грузоперевозкам от владельцев по России и СНГ</p>

                            <div className="main-preview-register">
                                <Link to="/register"><Button type="fill" margin={"0 35px 0 0"} paddingVertical={"15px"}>Я владелец груза</Button></Link>
                                <Link to="/register"><Button type="empty" paddingVertical={"15px"}>Я перевозчик</Button></Link>
                            </div>
                        </div>

                        <div className="main-image-block">
                            <img src={ImagePreview} className="main-previewimage" alt="Pogrooz" />
                        </div>
                    </div>

                    <div className="main-advantages row col-12">
                        <div className="main-advantage">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main