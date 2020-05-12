// App
import React from "react";
import avatar from "../img/avatar.png";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
// Elements
import Button from "../Elements/Button";

let articles = [
  {
    id: 0,
    carName: "Nissan skylake",
    fromLocation:
      "Россия, Московская область, Лобня, улица Лейтенанта Бойко, 104",
    toLocation: "Россия, Ленинградская  область, г Пушкин, улица  Бойко, 123",
    cargo: "10 кг / 2 м 3 шт Мебель Коммерческие грузы",
    price: "20 000 руб",
    rating: 3.1,
    date: {
      date: "22.10.2020",
      time: " 21:00",
    },
    carImg:
      "https://media.wired.com/photos/5d09594a62bcb0c9752779d9/master/w_2560%2Cc_limit/Transpo_G70_TA-518126.jpg",
    tags: ["Услуги грузчика", "Мед. книжка"],
    user: {
      avatar: avatar,
      fio: `Максимов 
        Максим 
        Максимович`,
      passport: true,
      dogovor: true,
      paynal: true,
    },
    comments:
      "Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час.  Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час. Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час. Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час. ",
  },
  {
    id: 1,
    carName: "Nissan skylake",
    fromLocation:
      "Россия, Московская область, Лобня, улица Лейтенанта Бойко, 104",
    toLocation: "Россия, Ленинградская  область, г Пушкин, улица  Бойко, 123",
    cargo: "10 кг / 2 м 3 шт Мебель Коммерческие грузы",
    price: "20 000 руб",
    rating: 3.1,
    date: {
      date: "22.10.2020",
      time: " 21:00",
    },
    carImg:
      "https://media.wired.com/photos/5d09594a62bcb0c9752779d9/master/w_2560%2Cc_limit/Transpo_G70_TA-518126.jpg",
    tags: ["Услуги грузчика", "Мед. книжка"],
    user: {
      avatar: avatar,
      fio: `Максимов 
        Максим 
        Максимович`,
    },
    comments:
      "Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час.  Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час. Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час. Аккцратный водитель, по пути заеду еще в одно место, поэтому время доставки увеличится на 1 час. ",
  },
];

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
        {articles.map((article, i) => {
          return <Article key={i} article={article} key={article.id} />;
        })}
        <Pagination pageCount="10" perPage="1" />
        <Button
          type="empty"
          margin="auto 0 70px auto"
          className="mx-auto d-block"
          paddingVertical={"13px"}
          paddingHorizontal={"35px"}
        >
          Перейти на страницу поиска
        </Button>
      </div>
    );
  }
}

export default Articles;
