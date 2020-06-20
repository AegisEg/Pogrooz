// App
import React from "react";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../../Elements/Button";

// Images
import ImgFree from "../../img/free.svg";
import ImgLk from "../../img/lk.svg";
import ImgChat from "../../img/chatico.svg";
import ImgGeo from "../../img/geo.svg";
import ImgPhone from "../../img/phone.svg";
import ImgBigStar from "../../img/big-star.svg";
import Filter from "../../Elements/Filter";

import questions from "../../config/questions";

class Cargo extends React.Component {
  render() {
    return (
      <div className="cargo-page standart-page">
        <div className="container-fluid">
          <h1>Владельцам груза</h1>
        </div>
        <Filter />
        <div className="cargo-pros">
          <div className="container-fluid row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="cargo-pros-image-block">
                <img
                  className="cargo-pros-image"
                  src={ImgFree}
                  alt="Беcплатно. Без процентов и комиссий"
                />
              </div>

              <p className="cargo-pros-label">
                Беcплатно. Без процентов и комиссий
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="cargo-pros-image-block">
                <img
                  className="cargo-pros-image"
                  src={ImgLk}
                  alt="Простой и удобный личный кабинет"
                />
              </div>

              <p className="cargo-pros-label">
                Простой и удобный личный кабинет
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="cargo-pros-image-block">
                <img
                  className="cargo-pros-image"
                  src={ImgChat}
                  alt="Система оповещений и сообщений"
                />
              </div>
              <p className="cargo-pros-label">Система оповещений и сообщений</p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="cargo-pros-image-block">
                <img
                  className="cargo-pros-image"
                  src={ImgGeo}
                  alt="Отслеживание груза в пути"
                />
              </div>
              <p className="cargo-pros-label">Отслеживание груза в пути</p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="cargo-pros-image-block">
                <img
                  className="cargo-pros-image"
                  src={ImgPhone}
                  alt="Прямое общение с перевозчиком"
                />
              </div>

              <p className="cargo-pros-label">Прямое общение с перевозчиком</p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <div className="cargo-pros-image-block">
                <img
                  className="cargo-pros-image"
                  src={ImgBigStar}
                  alt="Честная система рейтинга"
                />
              </div>

              <p className="cargo-pros-label">Честная система рейтинга</p>
            </div>
          </div>
        </div>
        <div className="cargo-steps">
          <div className="container-fluid">
            <h3>Как это работает?</h3>

            <div className="cargo-steps-block row mx-0">
              <div className="cargo-step">
                <div className="cargo-step-number">
                  <span>1</span>
                </div>

                <p className="cargo-step-label">Создайте заказ</p>
              </div>
              <div className="cargo-step">
                <div className="cargo-step-number">
                  <span>2</span>
                </div>

                <p className="cargo-step-label">Создайте заказ</p>
              </div>
              <div className="cargo-step">
                <div className="cargo-step-number">
                  <span>3</span>
                </div>

                <p className="cargo-step-label">
                  Выберите исполнителя по рейтингу и цене
                </p>
              </div>
              <div className="cargo-step">
                <div className="cargo-step-number">
                  <span>4</span>
                </div>

                <p className="cargo-step-label">Создайте заказ</p>
              </div>

              <div style={{ textAlign: "center" }}>
                <Link to="/register">
                  <Button
                    type="fill"
                    paddingVertical={"11px"}
                    paddingHorizontal={"20px"}
                    margin={"0 0 0 35px"}
                    lineHeight={"18px"}
                  >
                    Поробовать<br></br>БЕСПЛАТНО
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="container-fluid ">
          <div className="faq-questions row">
            {questions.map((question) => {
              if (
                question.questions.filter((item) => {
                  return item.type === "cargo" || item.type === "all";
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
                          return item.type === "cargo" || item.type === "all";
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

export default Cargo;
