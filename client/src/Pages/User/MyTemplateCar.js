// App
import React from "react";

// Elements
import Button from "../../Elements/Button";
import settings from "../../config/settings";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import payIco from "../../img/pay-ico.svg";
import dogovor from "../../img/dogovor.png";

class OfferCreate extends React.Component {
  render() {
    return (
      <>
        <div className="myauto-page">
          <div className="container-fluid">
            <h2
              className="title"
              style={{
                padding: "0 28px 15px 28px",
                marginRight: "-28px",
                marginLeft: "-28px",
                borderBottom: "1px solid #DDDDDD",
              }}
            >
              Мои шаблоны авто
            </h2>
            <div>
              <Button
                paddingVertical="11px"
                className="f-14 position-relative "
                type="fill"
              >
                Добавить шаблон авто
                <Link
                  to="/create-template-auto"
                  className="sharected-link"
                ></Link>
              </Button>
              <div className="auto-template mt-4">
                <div className="head-template align-items-center row">
                  <div
                    className="px-3 title-auto mt-2 mt-md-0"
                    style={{
                      maxWidth: "280px",
                    }}
                  >
                    Мерседес Вито для перевозки{" "}
                  </div>
                  <div className="px-3 mt-2 mt-md-0">
                    <Button type="fill" className="f-12 px-3 position-relative">
                      Редактировать
                      <Link
                        to="/edit-template-auto/1"
                        className="sharected-link"
                      ></Link>
                    </Button>
                  </div>
                  <div className="px-3 mt-2 mt-md-0">
                    <Button type="fill" className="bg-gray f-12 ">
                      Удалить
                    </Button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div
                    className="col-xl"
                    style={{
                      maxWidth: "149px",
                    }}
                  >
                    <img className="w-100" src={settings.defaultCar} alt="" />
                  </div>
                  <div
                    className="col-xl f-14"
                    style={{
                      maxWidth: "153px",
                    }}
                  >
                    Еврофура Mercedes Vito 2020 год 86 куб. м тоннаж - 20-22 т
                    Загрузка задняя
                  </div>
                  <div className="row ml-2 mt-2 mt-md-0">
                    <div className="flex-columns">
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                    </div>
                    <div className="flex-columns">
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-xl mt-2 mt-md-0"
                    style={{
                      marginRight: "-10px",
                      marginLeft: "-10px",
                    }}
                  >
                    <span className="px-2 property-user f-12">
                      <img src={dogovor} alt="dogovor" />
                      Договор с ИП, ООО
                    </span>
                    <span className="px-2 property-user f-12">
                      <img src={payIco} alt="payIco" />
                      Оплата наличными, на р/c
                    </span>
                  </div>
                </div>
              </div>
              <div className="auto-template mt-4">
                <div className="head-template align-items-center row">
                  <div
                    className="px-3 title-auto mt-2 mt-md-0"
                    style={{
                      maxWidth: "280px",
                    }}
                  >
                    Мерседес Вито для перевозки{" "}
                  </div>
                  <div className="px-3 mt-2 mt-md-0">
                    <Button type="fill" className="f-12 px-3 position-relative">
                      Редактировать
                      <Link
                        to="/edit-template-auto/2"
                        className="sharected-link"
                      ></Link>
                    </Button>
                  </div>
                  <div className="px-3 mt-2 mt-md-0">
                    <Button type="fill" className="bg-gray f-12 ">
                      Удалить
                    </Button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div
                    className="col-xl"
                    style={{
                      maxWidth: "149px",
                    }}
                  >
                    <img className="w-100" src={settings.defaultCar} alt="" />
                  </div>
                  <div
                    className="col-xl f-14"
                    style={{
                      maxWidth: "153px",
                    }}
                  >
                    Еврофура Mercedes Vito 2020 год 86 куб. м тоннаж - 20-22 т
                    Загрузка задняя
                  </div>
                  <div className="row ml-2 mt-2 mt-md-0">
                    <div className="flex-columns">
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                      <span className="position-relative left-angle">
                        Услуги грузчика
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-xl mt-2 mt-md-0"
                    style={{
                      marginRight: "-10px",
                      marginLeft: "-10px",
                    }}
                  >
                    <span className="px-2 property-user f-12">
                      <img src={dogovor} alt="dogovor" />
                      Договор с ИП, ООО
                    </span>
                    <span className="px-2 property-user f-12">
                      <img src={payIco} alt="payIco" />
                      Оплата наличными, на р/c
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(OfferCreate);
