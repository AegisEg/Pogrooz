// App
import React from 'react'

// Article
import Article from './Article'

let articles = [
    {
        id: 0,
        carName: 'Nissan skylake',
        fromLocation: 'Россия, Московская область, Лобня, улица Лейтенанта Бойко, 104',
        toLocation: 'Россия, Ленинградская  область, г Пушкин, улица  Бойко, 123',
        cargo: '10 кг / 2 м 3 шт Мебель Коммерческие грузы',
        price: '20 000 руб',
        rating: 3.1,
        created_at: '211212'
    }
]

class Articles extends React.Component {
    render() {
        return (
            <div className="articles-block">
                <div className="articles-header">
                    <div className="row">
                        <div className="col-md-6 row">
                            <div className="col-md-1">
                                <span>#</span>
                            </div>
                            <div className="col-md-3">
                                <span>Машина</span>
                            </div>
                            <div className="col-md-4">
                                <span>Откуда</span>
                            </div>
                            <div className="col-md-4">
                                <span>Куда</span>
                            </div>
                        </div>
                        <div className="col-md-6 row">
                            <div className="col-md-3">
                                <span>Груз</span>
                            </div>
                            <div className="col-md-3">
                                <span>Загрузка</span>
                            </div>
                            <div className="col-md-3">
                                <span>Цена</span>
                            </div>
                            <div className="col-md-3">
                                <span>Еще</span>
                            </div>
                        </div>
                    </div>
                </div>

                {articles.map((article) => {
                    return (
                        <Article article={article} />
                    )
                })}
            </div>
        )
    }
}

export default Articles