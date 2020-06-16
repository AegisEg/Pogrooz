// App
import React from "react";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../../Elements/Button";
import Tarrifs from "../../Partials/Tarrifs";
import Filter from "../../Elements/Filter";

// Images
import Imgtophone from "../../img/tophone.svg";
import ImgChat from "../../img/chatico.svg";
import ImgHistory from "../../img/history.svg";
import ImgPhone from "../../img/phone.svg";
import Imgtamplate from "../../img/tamplate.svg";
import payIco from "../../img/pay-ico.svg";

import questions from "../../config/questions";

class Carrier extends React.Component {
  render() {
    return (
      <div className="carrier-page standart-page">
        <h1>Перевозчикам</h1>
        <Filter />
        <div className="carrier-pros row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={Imgtophone}
                alt="Прямые заказы"
              />
            </div>
            <p className="carrier-pros-label">Прямые заказы</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={ImgChat}
                alt="Удобный чат с клиентом"
              />
            </div>
            <p className="carrier-pros-label">Удобный чат с клиентом</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={ImgPhone}
                alt="Вся информация у вас в телефоне"
              />
            </div>
            <p className="carrier-pros-label">
              Вся информация у вас в телефоне
            </p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={ImgHistory}
                alt="История заказов"
              />
            </div>
            <p className="carrier-pros-label">История заказов</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={Imgtamplate}
                alt="Возможность добавления шаблона"
              />
            </div>
            <p className="carrier-pros-label">Возможность добавления шаблона</p>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="carrier-pros-image-block">
              <img
                className="carrier-pros-image"
                src={payIco}
                style={{
                  width: "20px",
                }}
                alt="Без комиссий за заказ и доплат"
              />
            </div>
            <p className="carrier-pros-label">Без комиссий за заказ и доплат</p>
          </div>
        </div>

        <div className="carrier-steps">
          <h3>Как это работает?</h3>

          <div className="carrier-steps-block row">
            <div className="carrier-step">
              <div className="carrier-step-number">
                <span>1</span>
              </div>

              <p className="carrier-step-label">Пройдите регистрацию</p>
            </div>
            <div className="carrier-step">
              <div className="carrier-step-number">
                <span>2</span>
              </div>

              <p className="carrier-step-label">Добавляйте предложения</p>
            </div>
            <div className="carrier-step">
              <div className="carrier-step-number">
                <span>3</span>
              </div>

              <p className="carrier-step-label">Смотрите заказы</p>
            </div>
            <div className="carrier-step">
              <div className="carrier-step-number">
                <span>4</span>
              </div>

              <p className="carrier-step-label">Откликайтесь на заказы</p>
            </div>
            <div className="carrier-step">
              <div className="carrier-step-number">
                <span>5</span>
              </div>
              <p className="carrier-step-label">Заключайте договор</p>
            </div>
          </div>
          <hr />
        </div>

        <div className="carrier-div">
          <h3 className="font-weight-normal f-20">
            Тариф для подключения перевозчиков к порталу PoGrooz
          </h3>
          <div className="row">
            <div className="row px-0 mx-0 col-12 col-lg-6">
              <div className="px-3 d-flex mt-3 fixed760">
                <span className="w-85px f-16">Стоимость:</span>
                <div className="pl-3">
                  <span className="yellow-text">от 16</span>
                  <p className="m-0 f-16">руб в день*</p>
                </div>
              </div>
              <div className="mt-3 px-3 d-flex d-md-none justify-content-end">
                <span className="f-16">Демо режим:</span>
                <div className="pl-3">
                  <span className="yellow-text">7 дней</span>
                  <p className="m-0 f-16">после регистрации</p>
                </div>
              </div>
              <div className="col-xl col-lg col-md col-sm-12 col-12 d-flex mt-3">
                <div className="f-12">
                  <b>Понедельная тарификация.</b> После оплаты тарифа профиль и
                  предложения перевозчика становятся доступны всем
                  пользователям. Полные условия читайте в разделе Тарифы&nbsp;
                  <Link to="/" className="href">
                    Тарифы
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mx-0 col-12 col-lg-6">
              <div className="fixed760 ml-md-0 ml-lg-auto pr-lg-0 d-none d-md-flex pr-xl-3 mt-3 justify-content-end">
                <span className="f-16">Демо режим:</span>
                <div className="pl-3">
                  <span className="yellow-text">7 дней</span>
                  <p className="m-0 f-16">после регистрации</p>
                </div>
              </div>
              <div className="px-2 pl-custom mx-auto mx-md-0 mt-3">
                <Button
                  type="fill"
                  margin={"0 0 0 auto"}
                  paddingHorizontal={"25px"}
                  paddingVertical={"15px"}
                  className="f-17"
                >
                  Попробовать
                  <br />
                  БЕСПЛАТНО
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="carrier-div tarrif-block">
          <h3 className="font-weight-normal f-16 mb-4">Пакеты для оплаты</h3>
          <Tarrifs />
          <div className="f-12 mt-4">
            *Расчет стоимости дня произведен из расчета 30 дней а месяц,
            указывается в ознакомительных целях.
          </div>
        </div>
        <div className="faq-questions">
          <hr />
          <div className="row">
            {questions.map((question) => {
              if (
                question.questions.filter((item) => {
                  return item.type === "carrier" || item.type === "all";
                }).length
              )
                return (
                  <div
                    className="faq-question col-12 col-sm-6 col-md-4 col-lg-3 text-center text-md-left"
                    key={question.id}
                  >
                    <h4>{question.title}</h4>
                    <ul>
                      {question.questions
                        .filter((item) => {
                          return item.type === "carrier" || item.type === "all";
                        })
                        .map((question) => {
                          return (
                            <li key={question.id}>
                              <Link to="/">{question.title}</Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                );
              else return <></>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Carrier;
