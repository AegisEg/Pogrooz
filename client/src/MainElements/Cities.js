// App
import React from 'react'

class Cities extends React.Component {
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-6 col-sm-3 col-md-2">
                        <ul>
                            <li>Казань</li>
                            <li>Волгоград</li>
                            <li>Нижний Новгород</li>
                            <li>Новосибирск</li>
                            <li>Екатеринбург</li>
                            <li>Красноярск</li>
                            <li>Челябинск</li>
                            <li>Уфа</li>
                            <li>Владивосток</li>
                            <li>Саратов</li>
                            <li>МО, Долгопрудный</li>
                        </ul>
                    </div>
                    <div className="col-6 col-sm-3 col-md-2">
                        <ul>
                            <li>Барнаул</li>
                            <li>Смоленск</li>
                            <li>Тула</li>
                            <li>Владимир</li>
                            <li>Ярославль</li>
                            <li>Белгород</li>
                            <li>Курск</li>
                            <li>Ижевск</li>
                            <li>Новгород</li>
                            <li>Орел</li>
                        </ul>
                    </div>
                    <div className="col-6 col-sm-3 col-md-2 offset-md-4 offset-sm-0">
                        <ul>
                            <li>Краснодар</li>
                            <li>Самара</li>
                            <li>Санкт-Петербург</li>
                            <li>Ростов-на-Дону</li>
                            <li>Ставрополь</li>
                            <li>Воронеж</li>
                            <li>Иркутск</li>
                            <li>Тюмень</li>
                            <li>Омск</li>
                            <li>Пермь</li>
                            <li>МО, Домодедово</li>
                            <li>МО, Дубна</li>

                        </ul>
                    </div>
                    <div className="col-6 col-sm-3 col-md-2">
                        <ul>
                            <li>Калуга</li>
                            <li>Рязань</li>
                            <li>Иваново</li>
                            <li>Тверь</li>
                            <li>Брянск</li>
                            <li>Липецк</li>
                            <li>Тольятти</li>
                            <li>Псков</li>
                            <li>Кострома</li>
                            <li><br></br></li>
                            <li>и другие</li>
                        </ul>
                    </div>
                </div>
            </>
        );
   }
}

export default Cities