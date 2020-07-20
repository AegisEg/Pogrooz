// App
import React from "react";
import ConfigSettings from "../../config/settings";
// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import Select from "../../Elements/Select";
import { Link } from "react-router-dom";
import CheckBoxSwitcher from "../../Elements/CheckBoxSwitcher";
import CheckBox from "../../Elements/CheckBox";
import ArticleHeader from "../../Catalog/ArticleHeader";
import Article from "../../Catalog/Article";
import articlestest from "../../config/articlestest.js";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import AdressSelect from "../../Elements/AdressSelect";
import HeaderCreate from "../../Partials/CreateElements/HeaderCreate";
import { Map, Placemark } from "react-yandex-maps";

class OfferCreate1 extends React.Component {
  state = {
    extraOptions: false,
    doContract: false,
    paymentMethods: false,
  };
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="mt-3 col-12 col-md-8 mx-0 px-0 row carType">
              <h4
                className="f-16 col-12 mb-1"
                style={{
                  fontWeight: "normal",
                }}
              >
                Тип авто
              </h4>
              <div className="mt-3">
                <Select
                  options={[{ value: 4, label: "Машина" }]}
                  placeholder="Тип  машины"
                  onChange={(val) => {
                    if (val) this.setState({ carType: val.value });
                  }}
                />
              </div>
              <div className=" mt-3">
                <Select
                  options={[{ value: 4, label: "Машина" }]}
                  placeholder="Тип  машины"
                  onChange={(val) => {
                    if (val) this.setState({ carType: val.value });
                  }}
                />
              </div>
              <div className="mt-3">
                <Select
                  options={[{ value: 4, label: "Машина" }]}
                  placeholder="Тип  машины"
                  onChange={(val) => {
                    if (val) this.setState({ carType: val.value });
                  }}
                />
              </div>
              <div className="mt-3">
                <Select
                  options={[{ value: 4, label: "Машина" }]}
                  placeholder="Тип  машины"
                  onChange={(val) => {
                    if (val) this.setState({ carType: val.value });
                  }}
                />
              </div>
            </div>
            <div className="mt-3 col-12 col-md-4 row  align-items-center">
              <h4
                className="f-16 col-12 pr"
                style={{
                  marginBottom: "20px",
                  fontWeight: "normal",
                }}
              >
                Добавьте фото машины
              </h4>
              <div className="col-12 d-inline-block align-self-center ">
                <div className="d-inline-block mr-4 mt-2">
                  <Button
                    type="fill"
                    className="f-17"
                    paddingHorizontal="30px"
                    paddingVertical="7px"
                  >
                    Загрузить
                  </Button>
                </div>
                <img
                  src={ConfigSettings.defaultCar}
                  style={{
                    verticalAlign: "top",
                    marginTop: "10px",
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row order-swicher-wrapper">
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  lableClassname="f-16"
                  val={this.state.extraOptions}
                  onChange={() => {
                    this.setState({
                      extraOptions: !this.state.extraOptions,
                    });
                  }}
                  lable="Дополнительные параметры"
                />
              </div>
              <CSSTransitionGroup
                transitionName="height-animation-item"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                style={{
                  display: "contents",
                }}
              >
                {this.state.extraOptions && (
                  <div className="pt-2">
                    <div className="mt-2">
                      <CheckBox id="cargo" text="Услуги грузчика" />
                    </div>
                    <div className="mt-2">
                      <CheckBox
                        id="cargo2"
                        text="Страхование груза водителем"
                      />
                    </div>
                    <div className="mt-2">
                      <CheckBox id="cargo3" text="Пломбирование" />
                    </div>
                    <div className="mt-2">
                      <CheckBox id="cargo4" text="Мед. книжка" />
                    </div>
                  </div>
                )}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  val={this.state.doContract}
                  onChange={() => {
                    this.setState({ doContract: !this.state.doContract });
                  }}
                  lable="Заключение договора"
                />
              </div>
              <CSSTransitionGroup
                transitionName="height-animation-item"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                style={{
                  display: "contents",
                }}
              >
                {this.state.doContract && (
                  <div className="pt-2">
                    <div className="mt-2">
                      <CheckBox id="cargo5" text="Услуги грузчика" />
                    </div>
                    <div className="mt-2">
                      <CheckBox
                        id="cargo52"
                        text="Страхование груза водителем"
                      />
                    </div>
                    <div className="mt-2">
                      <CheckBox id="cargo53" text="Пломбирование" />
                    </div>
                    <div className="mt-2">
                      <CheckBox id="cargo54" text="Мед. книжка" />
                    </div>
                  </div>
                )}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  val={this.state.paymentMethods}
                  onChange={() => {
                    this.setState({
                      paymentMethods: !this.state.paymentMethods,
                    });
                  }}
                  lable="Способы оплаты водителю"
                />
              </div>
              <CSSTransitionGroup
                transitionName="height-animation-item"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                style={{
                  display: "contents",
                }}
              >
                {this.state.paymentMethods && (
                  <div className="pt-2">
                    <div className="mt-2">
                      <CheckBox id="cargo6" text="Услуги грузчика" />
                    </div>
                    <div className="mt-2">
                      <CheckBox
                        id="cargo62"
                        text="Страхование груза водителем"
                      />
                    </div>
                    <div className="mt-2">
                      <CheckBox id="cargo63" text="Пломбирование" />
                    </div>
                    <div className="mt-2">
                      <CheckBox id="cargo64" text="Мед. книжка" />
                    </div>
                    <div className="mt-2">
                      <Select
                        options={[{ value: 4, label: "Машина" }]}
                        placeholder="Тип  машины"
                      />
                    </div>
                  </div>
                )}
              </CSSTransitionGroup>
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-sm-8 mt-4">
              <div className="mb-2 f-16">Комментарий</div>
              <textarea
                className="w-100"
                style={{
                  height: "70px",
                }}
              ></textarea>
            </div>
            <div className="col-12 col-sm-4 mt-4">
              <div className="mb-2 f-16">Желаемый бюджет</div>
              <div className="d-flex align-items-center">
                <Input
                  style={{
                    maxWidth: "113px",
                    marginRight: "7px",
                  }}
                  type="number"
                  placeholder="0"
                />
                <span>руб</span>
              </div>
            </div>
          </div>

          <div className="row slide-step justify-content-end">
            <Button
              type="fill"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.next}
            >
              Вперед
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
class OfferCreate2 extends React.Component {
  state = {
    isTime: false,
    isTimeInterval: false,
    addressFrom: false,
    addressTo: false,
  };
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row align-items-start">
            <div className="col-xl-8 mt-2 col-12 row">
              <h4
                className="f-16 col-12 mb-1"
                style={{
                  fontWeight: "normal",
                }}
              >
                Маршрут
              </h4>
              <div className="col-12 col-sm-6 mt-2">
                <AdressSelect
                  placeholder="Откуда"
                  onChange={(val) => {
                    this.setState({ addressTo: val }, () => {
                      if (val.data.geo_lat && val.data.geo_lon) {
                        console.log(val.data.geo_lat + "  " + val.data.geo_lon);
                        this.mapFrom.panTo(
                          [Number(val.data.geo_lat), Number(val.data.geo_lon)],
                          {
                            delay: 1500,
                          }
                        );
                      }
                    });
                  }}
                />
                <Map
                  instanceRef={(ref) => {
                    this.mapFrom = ref;
                  }}
                  defaultState={{
                    center: [55.684758, 37.738521],
                    zoom: 4,
                  }}
                  style={{
                    marginTop: "21px",
                    height: "220px",
                    width: "100%",
                  }}
                >
                  {this.state.addressTo &&
                    this.state.addressTo.data.geo_lat &&
                    this.state.addressTo.data.geo_lon && (
                      <Placemark
                        geometry={[
                          this.state.addressTo.data.geo_lat,
                          this.state.addressTo.data.geo_lon,
                        ]}
                      />
                    )}
                </Map>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <AdressSelect placeholder="Куда" />
                <Map
                  instanceRef={(ref) => {
                    this.mapTo = ref;
                  }}
                  defaultState={{
                    center: [55.684758, 37.738521],
                    zoom: 15,
                  }}
                  style={{
                    marginTop: "21px",
                    height: "220px",
                    width: "100%",
                  }}
                >
                  {this.state.addressTo &&
                    this.state.addressTo.data.geo_lat &&
                    this.state.addressTo.data.geo_lon && (
                      <Placemark
                        geometry={[
                          this.state.addressTo.data.geo_lat,
                          this.state.addressTo.data.geo_lon,
                        ]}
                      />
                    )}
                </Map>
              </div>
            </div>
            <div className="col-xl-4 mt-2 col-12 row">
              <h4
                className="f-16 col-12"
                style={{
                  marginBottom: "12px",
                  fontWeight: "normal",
                }}
              >
                Дата и время
              </h4>
              <div
                className="col-12 row mx-0"
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                  alignItems: "center",
                }}
              >
                <span className="filter-input-title">
                  Дата<br></br>погрузки
                </span>
                <Input
                  type="date"
                  style={{ width: "130px" }}
                  placeholder="21.12.2020"
                />
              </div>
              <div
                className="col d-flex align-items-center"
                style={{
                  marginTop: "21px",
                  maxWidth: "146px",
                }}
              >
                <CheckBox
                  id="isTime"
                  onChange={() => {
                    this.setState({ isTime: !this.state.isTime });
                  }}
                  text="Указать время"
                />
              </div>
              {this.state.isTime && (
                <>
                  <div
                    className="col d-flex align-items-center"
                    style={{
                      marginTop: "21px",
                      maxWidth: "172px",
                    }}
                  >
                    <CheckBox
                      id="isTimeInterval"
                      onChange={() => {
                        this.setState({
                          isTimeInterval: !this.state.isTimeInterval,
                        });
                      }}
                      text="Добавить интервал"
                    />
                  </div>
                  <div
                    className="d-inline-flex  col-12 mt-3"
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <span className="filter-input-title mb-0">
                      Время<br></br>погрузки
                    </span>
                    <Input type="time" placeholder="12:00" />
                    {this.state.isTimeInterval && (
                      <>
                        <span className="filter-input-title mb-0">
                          &nbsp;&nbsp;-
                        </span>
                        <Input type="time" placeholder="12:00" />
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="row slide-step justify-content-end">
            <Button
              type="empty"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.prev}
            >
              Назад
            </Button>
            <Button
              type="fill"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.next}
            >
              Вперед
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
class OfferCreate3 extends React.Component {
  state = {
    volumeWh: 0,
    volumeW: 0,
    volumeH: 0,
    cargoTypes: [],
  };
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="container-fluid">
          <div className="box-grooz-wrapper-row align-items-start justify-content-start">
            <h4
              className="f-16 col-12 mb-1"
              style={{
                fontWeight: "normal",
              }}
            >
              Тип груза
              <Link to="/" className="href f-14 ml-4">
                Открыть Pro список
              </Link>
            </h4>
            {ConfigSettings.cargoTypes.map((item, index) => {
              //Проверка на отмеченность
              let isSelect =
                !!this.state.cargoTypes.find((itemY, indexY) => {
                  return itemY === item.id;
                }) !== false;
              return (
                <div key={index} className="col box-grooz-wrapper">
                  <div
                    className={`box-grooz ${isSelect ? "active" : ""}`}
                    onClick={
                      !isSelect
                        ? () => {
                            this.setState({
                              cargoTypes: [...this.state.cargoTypes, item.id],
                            });
                          }
                        : () => {
                            this.setState({
                              cargoTypes: this.state.cargoTypes.filter(
                                (itemX, index) => {
                                  if (itemX === item.id) return false;
                                  else return true;
                                }
                              ),
                            });
                          }
                    }
                  >
                    <div className="text-center">
                      <img src={item.img} alt="box" />
                      <span className="d-block">{item.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row typeGrooz">
            <h4
              className="f-16 col-12 mb-1"
              style={{
                fontWeight: "normal",
              }}
            >
              Параметры одного места и количество мест
            </h4>
            <div
              className="col"
              style={{
                maxWidth: "217px",
                minWidth: "217px",
              }}
            >
              <Select
                type="text"
                placeholder="Ед. измерения"
                getRef={() => {}}
              />
            </div>
            <div
              className="col"
              style={{
                maxWidth: "177px",
              }}
            >
              <Input type="text" style={{ width: "147px" }} placeholder="Вес" />
            </div>
            <div
              className="row colspan-input px-3"
              style={{
                marginLeft: "0",
                alignItems: "center",
              }}
            >
              <Input
                type="number"
                placeholder="Длина"
                className="text-center"
                onChange={(e) => {
                  this.setState({ volumeWh: e.target.value });
                }}
                style={{ margin: "0 0 0 0" }}
              />
              <Input
                type="number"
                placeholder="Ширина"
                className="text-center"
                onChange={(e) => {
                  this.setState({ volumeW: e.target.value });
                }}
                style={{ margin: "0 0 0 0" }}
              />
              <Input
                type="number"
                className="text-center"
                onChange={(e) => {
                  this.setState({ volumeH: e.target.value });
                }}
                placeholder="Высота"
              />
              <span
                className="filter-input-title"
                style={{
                  minWidth: "90px",
                }}
              >
                &nbsp;&nbsp;=&nbsp;
                {this.state.volumeH * this.state.volumeW * this.state.volumeW}
                &nbsp;м<sup>3</sup>
              </span>
            </div>
            <div
              className="row col mx-0"
              style={{
                marginLeft: "0",
                marginRight: "0",
                maxWidth: "159px",
                minWidth: "159px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Кол-во<br></br>мест
              </span>
              <Input
                type="number"
                min="0"
                style={{
                  width: "79px",
                }}
                placeholder="1"
              />
            </div>
            <div
              className="row col mx-0"
              style={{
                maxWidth: "150px",
                minWidth: "150px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Общий<br></br>вес
              </span>
              <span className="d-inline-block ml-4">= 0 кг</span>
            </div>
          </div>
          <div className="row slide-step justify-content-end">
            <Button
              type="empty"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.prev}
            >
              Назад
            </Button>

            <Button
              type="fill"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.next}
            >
              Вперед
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
class OfferCreate4 extends React.Component {
  state = {
    dataFancybox: {
      images: false,
      index: false,
      article: {},
    },
  };
  render() {
    let article = articlestest[0];
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="articles-block full">
          <ArticleHeader></ArticleHeader>
          <Article
            isManage={false}
            onlyOpen={true}
            singlePage={true}
            article={article}
          />
        </div>
        <div className="container-fluid">
          <div className="row slide-step justify-content-end">
            <Button
              type="empty"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.prev}
            >
              Назад
            </Button>
            <Button
              type="fill"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={() => {}}
            >
              Опубликовать
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
class OfferCreate extends React.Component {
  state = {
    currentTab: 2,
  };
  render() {
    return (
      <>
        <div className="create-page create-order-page">
          <div className="container-fluid">
            <h2 className="title">{this.props.title}</h2>
            <HeaderCreate
              changeTub={(setTub) => {
                this.setState({ currentTab: setTub });
              }}
              currentTab={this.state.currentTab}
              tabs={[
                "Описание авто",
                "Мартшрут",
                "Описание груза",
                "Публикация товара",
              ]}
            />
          </div>
          <div className="steps-create">
            <OfferCreate1
              key="1"
              className={`${this.state.currentTab === 1 ? "active" : ""} 
              ${this.state.currentTab > 1 ? "deactive" : ""}`}
              next={() => {
                if (this.state.currentTab < 4) {
                  this.setState({ currentTab: this.state.currentTab + 1 });
                }
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
            />
            <OfferCreate2
              key="2"
              className={`${this.state.currentTab === 2 ? "active" : ""} ${
                this.state.currentTab > 2 ? "deactive" : ""
              }`}
              next={() => {
                if (this.state.currentTab < 4) {
                  this.setState({ currentTab: this.state.currentTab + 1 });
                }
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
            />
            <OfferCreate3
              className={`${this.state.currentTab === 3 ? "active" : ""} ${
                this.state.currentTab > 3 ? "deactive" : ""
              }`}
              next={() => {
                if (this.state.currentTab < 4) {
                  this.setState({ currentTab: this.state.currentTab + 1 });
                }
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
            />

            <OfferCreate4
              className={`${this.state.currentTab === 4 ? "active" : ""}`}
              next={() => {
                if (this.state.currentTab < 4) {
                  this.setState({ currentTab: this.state.currentTab + 1 });
                }
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
            />
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
