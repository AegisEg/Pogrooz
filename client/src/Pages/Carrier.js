// App
import React from "react";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../Elements/Button";
import Filter from "../Elements/Filter";

// Images
import Imgtophone from "../img/tophone.png";
import ImgLk from "../img/lk.png";
import ImgChat from "../img/chat.png";
import ImgHistory from "../img/history.png";
import ImgPhone from "../img/phone.png";
import Imgtamplate from "../img/tamplate.png";

class Carrier extends React.Component {
  render() {
    return (
      <div className="carrier-page">
        <h1>Перевозчикам</h1>
        <Filter />
        <div className="carrier-pros row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={Imgtophone}
                alt="Imgtophone"
              />
            </div>
            <p className="carrier-pros-label">Прямые заказы</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img className="carrier-pros-image" src={ImgChat} />
            </div>
            <p className="carrier-pros-label">Удобная коммуникация</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img className="carrier-pros-image" src={ImgPhone} />
            </div>
            <p className="carrier-pros-label">
              Вся информация у вас в телефоне
            </p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img className="carrier-pros-image" src={ImgHistory} />
            </div>
            <p className="carrier-pros-label">История заказов</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img className="carrier-pros-image" src={Imgtamplate} />
            </div>
            <p className="carrier-pros-label">Возможность добавления шаблона</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img className="carrier-pros-image" src={ImgLk} />
            </div>
            <p className="carrier-pros-label">
              Простой и удобный личный кабинет
            </p>
          </div>
        </div>

        <div className="carrier-steps">
          <h3>Как это работает?</h3>

          <div className="carrier-steps-block row">
            <div className="carrier-step col">
              <div className="carrier-step-number">
                <span>1</span>
              </div>

              <p className="carrier-step-label">Пройдите регистрацию</p>
            </div>
            <div className="carrier-step col">
              <div className="carrier-step-number">
                <span>2</span>
              </div>

              <p className="carrier-step-label">Добавляйте предложения</p>
            </div>
            <div className="carrier-step col">
              <div className="carrier-step-number">
                <span>3</span>
              </div>

              <p className="carrier-step-label">Смотрите заказы</p>
            </div>
            <div className="carrier-step col">
              <div className="carrier-step-number">
                <span>4</span>
              </div>

              <p className="carrier-step-label">Откликайтесь на заказы</p>
            </div>
            <div className="carrier-step col">
              <div className="carrier-step-number">
                <span>5</span>
              </div>
              <p className="carrier-step-label">Заключайте договор</p>
            </div>
          </div>
        </div>
        <div className="carrier-div">
          <hr />
          <h3 className="font-weight-normal">
            Тариф для подключения перевозчиков к порталу PoGrooz
          </h3>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3 order-0 col-xl-2 d-flex">
              <span className="w-85px">Стоимость:</span>
              <div className="pl-3">
                <span className="yellow-text">200</span>
                <p className="m-0">руб в неделю</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mt-2 order-md-2 order-lg-0 order-xl-2-1 col-xl-2 d-flex">
              <span className="w-85px">Демо режим:</span>
              <div className="pl-3">
                <span className="yellow-text">7 дней</span>
                <p className="m-0">после регистрации</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-2 order-md-1 order-lg-1 order-xl-2-2 col-xl-6 d-flex">
              <span>Условия:</span>
              <div className="pl-3">
                Понедельная тарификация, при отключении тарифа анкета и
                предложения перевозчика скрываются из общаего поиска. Полные
                условия читайте в разделе&nbsp;
                <Link to="/">Тарифы</Link>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pl-custom col-xl-2 mt-2 order-md-3 order-lg-2 order-xl-2-3 text-md-left text-xl-right">
              <Button
                type="fill"
                margin={"0 0 0 auto"}
                paddingHorizontal={"15px"}
                paddingVertical={"8px"}
              >
                Попробовать
                <br />
                БЕСПЛАТНО
              </Button>
            </div>
          </div>
        </div>
        <div className="carrier-div d-none d-sm-block">
          <hr />
          <div className="row list_href">
            <div className="col-sm-6 col-md-5 col-lg-6">
              <h4 className=" my-2  font-weight-normal">
                Часто задаваемые вопросы
              </h4>
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                </div>
                <div className="col-md-12 col-lg-6">
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-7 col-lg-6">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6">
                  <h4 className=" my-2  font-weight-normal">
                    Сообщения и уведомления
                  </h4>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                  <p className="m-0">
                    <Link to="/">Шаблон данных об автомобиле</Link>
                  </p>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-6">
                  <h4 className=" my-2  font-weight-normal">Отзывы</h4>
                  <p className="m-0">
                    <Link to="/">Переводчик</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carrier;
