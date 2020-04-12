// App
import React from 'react'
import Button from './Button'
import Input from './Input'
import { Link } from 'react-router-dom'
import Select from "../Elements/Select"

class Filter extends React.Component {
    state = {
        show: true
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
                        />
                    </div>

                    <Link to="/" className={'col-md-3'}><Button width={'100%'} type="fill" margin={'0 15px 0 0'}>Найти</Button></Link>
                </div>

                {this.state.show && <div className="row filter-line">
                    <div className="col-3">
                        <Select
                            type="text"
                            placeholder="Откуда"
                        />
                    </div>

                    <div className="row" style={{marginLeft: '0', marginRight: '0'}}>
                        <span className="filter-input-title">Дата<br></br>погрузки</span>
                        <Input
                            type="text"
                            style={{width: '130px'}}
                            placeholder="21.12.2020"
                        />
                    </div>

                    <div className="row" style={{marginLeft: '15px', marginRight: '0'}}>
                        <span className="filter-input-title">Время<br></br>погрузки</span>
                        <Input
                            type="text"
                            style={{width: '88px'}}
                            placeholder="12:00"
                        />
                    </div>

                    <div className="row" style={{marginLeft: '15px', marginRight: '0'}}>
                        <span className="filter-input-title">-&nbsp;</span>
                        <Input
                            type="text"
                            style={{width: '88px'}}
                            placeholder="12:00"
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