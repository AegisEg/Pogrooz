// App
import React from "react";
import ImagePreview from "../../img/main-preview.png";
import ImageCheck from "../../img/check.png";
import ImageRub from "../../img/rub.png";
import ImgMainCities from "../../img/main-cities.png";
import ImgPreviewTimer from "../../img/preview-timer.png";
import ImgPreviewGeo from "../../img/preview-geo.png";
import ImgPreviewRub from "../../img/preview-rub.png";
import logoName from "../../img/logoName.png";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../../Elements/Button";
import Filter from "../../Elements/Filter";

// Main elements
import Questions from "../../MainElements/Questions";
import Cities from "../../MainElements/Cities";
import Articles from "../../Catalog/Articles";

class Main extends React.Component {
  state = {
    searchType: "offer",
  };
  render() {
    return (
      <div className="main-page">
        <div className="main-preview row">
          <div className="row col-12">
            <div className="main-text-block  col-md-8 col-xl-6">
              <h1 className="main-title">
                <img src={logoName} alt="logoName" />{" "}
              </h1>
              <h2 className="main-subtitle">Куда угодно. Что угодно.</h2>

              <h3 className="main-description-title">
                Поисковик попутных перевозок для ваших грузов
              </h3>
              <p className="main-description-subtitle">
                Срочные объявления по грузоперевозкам от владельцев по России и
                СНГ
              </p>

              <div className="main-preview-register">
                <Link to="/register">
                  <Button
                    type="fill"
                    margin={"0 5% 0 0"}
                    paddingVertical={"15px"}
                    paddingHorizontal={"0px"}
                  >
                    <span style={{ lineHeight: "14px" }}>Я владелец груза</span>
                    <div
                      className="text-uppercase"
                      style={{ fontSize: "22px", marginTop: "3px" }}
                    >
                      Заказать
                    </div>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    type="empty"
                    paddingVertical={"15px"}
                    paddingHorizontal={"0px"}
                  >
                    <span style={{ lineHeight: "14px" }}>Я перевозчик</span>
                    <div
                      className="text-uppercase"
                      style={{ fontSize: "22px", marginTop: "3px" }}
                    >
                      Найти груз
                    </div>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="main-image-block col-0 col-sm-5 col-md-4 col-xl-6">
              <img
                src={ImagePreview}
                className="main-previewimage"
                alt="Pogrooz"
              />
            </div>
          </div>

          <div className="main-advantages row col-12">
            <div className="main-advantage col-4">
              <h4 className="main-advantage-title">
                <img src={ImgPreviewTimer} alt="Fasted working" /> Быстро
              </h4>
              <p className="main-advantage-label">
                Быстро и просто, никаких звонков. <br></br>Вся организация
                перевозки онлайн.
              </p>
            </div>
            <div className="main-advantage col-4">
              <h4 className="main-advantage-title">
                <img src={ImgPreviewGeo} alt="Usebillity" /> Удобно
              </h4>
              <p className="main-advantage-label">
                Отслеживание местонахождения <br></br>груза он-лайн.
              </p>
            </div>
            <div className="main-advantage col-4">
              <h4 className="main-advantage-title">
                <img src={ImgPreviewRub} alt="Free" /> Выгодно
              </h4>
              <p className="main-advantage-label">
                Никаких процентов и комиссий. <br></br>Только прямая работа с
                исполнителем
              </p>
            </div>
          </div>
        </div>
        <div className="row mx-0 search-tabs background-gray-768 tabs mb-lg-0 mb-xl-3 justify-content-center">
          <div
            className={`tab mx-3 text-uppercase ${
              this.state.searchType == "offer" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ searchType: "offer" });
            }}
          >
            Услуги <span className="d-380 d-sm-inline-block">перевозчиков</span>
          </div>
          <div
            className={`tab mx-3 text-uppercase ${
              this.state.searchType == "order" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ searchType: "order" });
            }}
          >
            Заказы <span className="d-380 d-sm-inline-block">на перевозку</span>
          </div>
        </div>
        <Filter className="background-gray-768 filter-main" />
        <Articles />
        <div className="text-center">
          <Link to="/" className="href">
            <Button
              type="empty"
              margin="auto 0 70px auto"
              className="mx-auto bg-gray hover-underline"
              paddingVertical={"13px"}
              paddingHorizontal={"35px"}
            >
              Перейти на страницу поиска
            </Button>
          </Link>
        </div>
        <div className="main-profitably d-none d-md-block">
          <hr></hr>

          <h3>Почему с нами выгодно?</h3>

          <div className="row">
            <div className="main-profitably-block col-md-6">
              <h5>
                <img
                  src={ImageCheck}
                  alt="Почему с нами выгодно?"
                  className="main-profitably-image"
                />
                Владельцам грузов
              </h5>
              <p>
                Самый быстрый способ перевезти груз: <br></br>оставьте он-лайн
                заказ и получите заявкии от перевозчиков, готовых его выполнить.{" "}
                <br></br>Выбираете наиболее комфортное предложение. <br></br>
                Никаких звонков.{" "}
              </p>
              <Link to="/register">
                <Button
                  type="fill"
                  paddingVertical={"13px"}
                  paddingHorizontal={"25px"}
                  className="f-17"
                >
                  Регистрация
                </Button>
              </Link>
            </div>
            <div className="main-profitably-block col-md-6">
              <h5>
                <img
                  src={ImageRub}
                  alt="Почему с нами выгодно?"
                  className="main-profitably-image"
                />
                Владельцам грузов
              </h5>
              <p>
                Самый быстрый способ перевезти груз: <br></br>оставьте он-лайн
                заказ и получите заявкии от перевозчиков, готовых его выполнить.{" "}
                <br></br>Выбираете наиболее комфортное предложение. <br></br>
                Никаких звонков.{" "}
              </p>
              <Link to="/register">
                <Button
                  type="fill"
                  paddingVertical={"13px"}
                  paddingHorizontal={"25px"}
                  className="f-17"
                >
                  Регистрация
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Questions />

        <div className="main-cities">
          <h3>Мы работаем по всей России</h3>

          <img
            className="main-cities-background"
            src={ImgMainCities}
            alt="ImgMainCities"
          />

          <Cities />
        </div>
      </div>
    );
  }
}

export default Main;
