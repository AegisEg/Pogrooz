// App
import React from 'react'
import Button from './Button'
import Input from './Input'
import { Link } from 'react-router-dom'
import Select from "../Elements/Select"

import ImgActiveStar from '../img/active-star.png'
import CheckBox from './CheckBox'

class Filter extends React.Component {
    state = {
        show: false
    }

    render() {
        return (
            <div className="filter">
                <div className="row">
                    <div className='col-md-3'>
                        <Input
                            type="text"
                            placeholder="Откуда"
                        />
                    </div>
                    
                    <div className='col-md-3'>
                        <Input
                            type="text"
                            placeholder="Куда"
                        />
                    </div>

                    <div className='col-md-3'>
                        <Select
                            type="text"
                            placeholder="Откуда"
                            getRef={() => {}}
                        />
                    </div>

                    <Link to="/" className={'col-md-3'}><Button width={'100%'} type="fill" paddingVertical={'8px'} margin={'0 15px 0 0'}>Найти</Button></Link>
                </div>

                {this.state.show && <div className="row filter-line">
                    <div className="col-md-3 col-sm-4">
                        <Select
                            type="text"
                            placeholder="Откуда"
                            getRef={() => {}}
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Дата<br></br>погрузки</span>
                        <Input
                            type="text"
                            style={{width: '130px'}}
                            placeholder="21.12.2020"
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Время<br></br>погрузки</span>
                        <Input
                            type="text"
                            placeholder="12:00"
                        />
                        <span className="filter-input-title">&nbsp;&nbsp;-</span>
                        <Input
                            type="text"
                            placeholder="12:00"
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Рейтинг (0-5): </span>
                        <Input
                            type="text"
                            placeholder=""
                        />
                        <img src={ImgActiveStar} style={{marginLeft: '7px'}} />
                    </div>
                </div>}

                {this.state.show && <div className="row filter-line">
                    <h5 className="col-md-12">Параметры 1 места и количество мест</h5>
                    <div className="col-md-3 col-sm-4">
                        <Select
                            type="text"
                            placeholder="Ед. измерения"
                            getRef={() => {}}
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <Input
                            type="text"
                            style={{width: '130px'}}
                            placeholder="Вес"
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <Input
                            type="text"
                            placeholder="Длина"
                            style={{margin: '0 10px 0 0'}}
                        />
                        <Input
                            type="text"
                            placeholder="Ширина"
                            style={{margin: '0 10px 0 0'}}
                        />
                        <Input
                            type="text"
                            placeholder="Высота"
                        />
                        <span className="filter-input-title">&nbsp;&nbsp;= 0 м<sup>3</sup></span>
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Кол-во<br></br>мест</span>
                        <Input
                            type="text"
                            placeholder="1"
                        />
                    </div>
                </div>}

                {this.state.show && <div className="row filter-line">
                    <h5 className="col-md-12">Дополнительно</h5>
                    <div className="col-md-12">
                        <CheckBox id="cargo" text="Услуги грузчика"></CheckBox>&nbsp;&nbsp;&nbsp;&nbsp;
                        <CheckBox id="backup" text="Страхование груза водителем"></CheckBox>&nbsp;&nbsp;&nbsp;&nbsp;
                        <CheckBox id="medBook" text="Мед. книжка"></CheckBox>&nbsp;&nbsp;&nbsp;&nbsp;
                        <CheckBox id="Podd" text="Необходимы поддоны"></CheckBox>&nbsp;&nbsp;&nbsp;&nbsp;
                        <CheckBox id="plomb" text="Пломбирование"></CheckBox>&nbsp;&nbsp;&nbsp;&nbsp;
                        <CheckBox id="run" text="Сопровождение"></CheckBox>
                    </div>
                </div>}

                {this.state.show && <div className="row filter-line">
                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Заключение<br></br>договора</span>
                        <Select
                            type="text"
                            placeholder="Можественный"
                            getRef={() => {}}
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Способ оплаты<br></br>водителю</span>
                        <Select
                            type="text"
                            placeholder="Можественный"
                            getRef={() => {}}
                        />
                    </div>

                    <div className="row col-md-3 col-sm-4" style={{marginLeft: '0', marginRight: '0', alignItems: 'center'}}>
                        <span className="filter-input-title">Желаемый<br></br>бюджет, руб</span>
                        <Input
                            type="text"
                            placeholder="до 20 000"
                        />
                    </div>
                </div>}

                <div className="filter-actions">
                    <Link to={false} onClick={() => {this.setState({show: !this.state.show})}} className="filter-open">{this.state.show ? 'Скрыть' : 'Открыть'} параметры поиска</Link>
                </div>
            </div>
        )
    }
}

export default Filter