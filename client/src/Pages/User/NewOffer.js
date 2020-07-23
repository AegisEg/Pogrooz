// App
import React from "react";
// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import Select from "../../Elements/Select";
import { Link } from "react-router-dom";
import CheckBoxSwitcher from "../../Elements/CheckBoxSwitcher";
import CheckBox from "../../Elements/CheckBox";
import ArticleHeader from "../../Catalog/ArticleHeader";
import Article from "../../Catalog/Article";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import AdressSelect from "../../Elements/AdressSelect";
import HeaderCreate from "../../Partials/CreateElements/HeaderCreate";
import { Map, Placemark } from "react-yandex-maps";
//Configs
import carList from "../../config/baseInfo/carTypesList";
import cargoList from "../../config/baseInfo/cargoTypesList";
import {
  extraParams,
  contractParams,
  paymentParams,
} from "../../config/baseInfo/carParams";
import articlestest from "../../config/articlestest.js";

class OfferCreate1 extends React.Component {
  state = {
    extraParams: false,
    contractParams: false,
    paymentParams: false,
  };
  getIfExit(array, item, prop) {
    let element = false;
    if ((element = array.find((itemX) => itemX.id == item)))
      return element[prop] ? element[prop] : "";
    else return "";
  }

  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="mt-3 col-12 col-md-8 mx-0 px-0 row carInfo">
              <h4
                className="f-16 col-12 mb-1"
                style={{
                  fontWeight: "normal",
                }}
              >
                Тип авто
              </h4>
              <div className="mt-3 carType">
                <Select
                  placeholder="Тип  машины"
                  options={carList.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                  value={this.props.car.type}
                  onChange={(val) => {
                    this.props.onChange(val, "carType");
                  }}
                />
              </div>
              <div className="carName mt-3">
                <Input
                  type="text"
                  value={this.props.car.name || ""}
                  placeholder="Марка, модель"
                  onChange={(val) => {
                    this.props.onChange(val.target.value, "carName");
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
                    onClick={() => {
                      document.getElementById("photoCar").click();
                    }}
                  >
                    Загрузить
                  </Button>
                  <input
                    id="photoCar"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      this.props.onChange(
                        { ...file, path: URL.createObjectURL(file) },
                        "carPhoto"
                      );
                    }}
                    type="file"
                    accept="image/jpeg,image/png"
                    hidden
                  />
                </div>
                {this.props.car.photo && (
                  <img
                    src={
                      this.props.car.photo ? this.props.car.photo.path : false
                    }
                    className="carPhoto"
                    alt=""
                  />
                )}
                {!this.props.car.photo && <div className="carPhoto" />}
              </div>
            </div>
          </div>
          <div className="row swicher-wrapper">
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  lableClassname="f-16"
                  val={this.state.extraParams}
                  onChange={() => {
                    this.setState({
                      extraParams: !this.state.extraParams,
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
                {this.state.extraParams && (
                  <div className="checkboxGroup">
                    {extraParams.map((item, index) => {
                      return (
                        <div key={index} className="checkboxParam">
                          <CheckBox
                            id={`extraParams${item.id}`}
                            name={`extraParams${item.id}`}
                            value={this.props.car.extraParams.find(
                              (itemX) => itemX.id == item.id
                            )}
                            onChange={() => {
                              this.props.onChangeParams("extraParams", item.id);
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.props.car.extraParams.find(
                              (itemX) => itemX.id === item.id
                            ) &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={this.getIfExit(
                                    this.props.car.extraParams,
                                    item.id,
                                    itemField.name
                                  )}
                                  onChange={(e) => {
                                    this.props.onChangeParamsFiels(
                                      "extraParams",
                                      item.id,
                                      itemField.name,
                                      e.target.value
                                    );
                                  }}
                                ></itemField.field>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  val={this.state.contractParams}
                  onChange={() => {
                    this.setState({
                      contractParams: !this.state.contractParams,
                    });
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
                {this.state.contractParams && (
                  <div className="checkboxGroup">
                    {contractParams.map((item, index) => {
                      return (
                        <div key={index} className="checkboxParam">
                          <CheckBox
                            id={`contractParams${item.id}`}
                            name={`contractParams`}
                            value={this.props.car.contractParams.find(
                              (itemX) => itemX.id == item.id
                            )}
                            onChange={() => {
                              this.props.onChangeParams(
                                "contractParams",
                                item.id,
                                true
                              );
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.props.car.contractParams.find(
                              (itemX) => itemX.id === item.id
                            ) &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={this.getIfExit(
                                    this.props.car.contractParams,
                                    item.id,
                                    itemField.name
                                  )}
                                  onChange={(e) => {
                                    this.props.onChangeParamsFiels(
                                      "contractParams",
                                      item.id,
                                      itemField.name,
                                      e.target.value
                                    );
                                  }}
                                ></itemField.field>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CSSTransitionGroup>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  val={this.state.paymentParams}
                  onChange={() => {
                    this.setState({
                      paymentParams: !this.state.paymentParams,
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
                {this.state.paymentParams && (
                  <div className="checkboxGroup">
                    {paymentParams.map((item, index) => {
                      return (
                        <div key={index} className="checkboxParam">
                          <CheckBox
                            id={`paymentParams${item.id}`}
                            name={`paymentParams${item.id}`}
                            value={this.props.car.paymentParams.find(
                              (itemX) => itemX.id == item.id
                            )}
                            onChange={() => {
                              this.props.onChangeParams(
                                "paymentParams",
                                item.id
                              );
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.props.car.paymentParams.find(
                              (itemX) => itemX.id === item.id
                            ) &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={this.getIfExit(
                                    this.props.car.paymentParams,
                                    item.id,
                                    itemField.name
                                  )}
                                  onChange={(e) => {
                                    this.props.onChangeParamsFiels(
                                      "paymentParams",
                                      item.id,
                                      itemField.name,
                                      e.target.value
                                    );
                                  }}
                                ></itemField.field>
                              );
                            })}
                        </div>
                      );
                    })}
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
                onChange={this.props.onChangeComment}
                style={{
                  height: "70px",
                }}
                value={this.props.comment ? this.props.comment : ""}
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
                  onChange={this.props.onChangeBudget}
                  value={this.props.budget ? this.props.budget : ""}
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
                    this.props.onChangeAddress("From", val, () => {
                      if (val.data.geo_lat && val.data.geo_lon) {
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
                    zoom: 10,
                  }}
                  style={{
                    marginTop: "21px",
                    height: "220px",
                    width: "100%",
                  }}
                >
                  {this.props.addressInfo.addressFrom &&
                    this.props.addressInfo.addressFrom.data.geo_lat &&
                    this.props.addressInfo.addressFrom.data.geo_lon && (
                      <Placemark
                        geometry={[
                          this.props.addressInfo.addressFrom.data.geo_lat,
                          this.props.addressInfo.addressFrom.data.geo_lon,
                        ]}
                      />
                    )}
                </Map>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <AdressSelect
                  placeholder="Куда"
                  onChange={(val) => {
                    this.props.onChangeAddress("To", val, () => {
                      if (val.data.geo_lat && val.data.geo_lon) {
                        this.mapTo.panTo(
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
                    this.mapTo = ref;
                  }}
                  defaultState={{
                    center: [55.684758, 37.738521],
                    zoom: 10,
                  }}
                  style={{
                    marginTop: "21px",
                    height: "220px",
                    width: "100%",
                  }}
                >
                  {this.props.addressInfo.addressTo &&
                    this.props.addressInfo.addressTo.data.geo_lat &&
                    this.props.addressInfo.addressTo.data.geo_lon && (
                      <Placemark
                        geometry={[
                          this.props.addressInfo.addressTo.data.geo_lat,
                          this.props.addressInfo.addressTo.data.geo_lon,
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
                  value={this.props.addressInfo.startDate || new Date()}
                  onChange={(val) => {
                    this.props.onChangeTimeInfo("date", val);
                  }}
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
                  value={this.state.isTime}
                  onChange={() => {
                    this.setState({ isTime: !this.state.isTime }, () => {
                      if (this.state.isTime)
                        this.props.onChangeTimeInfo("From", new Date());
                      else this.props.onChangeTimeInfo("From", false);
                    });
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
                    {this.props.addressInfo.startTimeFrom && (
                      <CheckBox
                        id="isTimeInterval"
                        onChange={() => {
                          this.setState(
                            {
                              isTimeInterval: !this.state.isTimeInterval,
                            },
                            () => {
                              if (this.state.isTimeInterval)
                                this.props.onChangeTimeInfo("To", new Date());
                              else this.props.onChangeTimeInfo("To", false);
                            }
                          );
                        }}
                        value={this.state.isTimeInterval}
                        text="Добавить интервал"
                      />
                    )}
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
                    <Input
                      type="time"
                      placeholder="12:00"
                      value={this.props.addressInfo.startTimeFrom || new Date()}
                      onChange={(val) => {
                        if (new Date() <= val)
                          this.props.onChangeTimeInfo("From", val);
                      }}
                    />
                    {this.state.isTimeInterval && (
                      <>
                        <span className="filter-input-title mb-0">
                          &nbsp;&nbsp;-
                        </span>
                        <Input
                          type="time"
                          placeholder="12:00"
                          value={
                            this.props.addressInfo.startTimeTo || new Date()
                          }
                          onChange={(val) => {
                            if (this.props.addressInfo.startTimeTo < val)
                              this.props.onChangeTimeInfo("To", val);
                          }}
                        />
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
    isPro: false,
  };
  render() {
    let currentCargoType = cargoList.find(
      (item) => this.props.cargoInfo.cargoType === item.id
    );
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
              <Link
                to="/"
                className="href f-14 ml-4"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ isPro: !this.state.isPro });
                }}
              >
                {!this.state.isPro && <>Открыть</>}
                {this.state.isPro && <>Закрыть</>} Pro список
              </Link>
            </h4>
            {!this.state.isPro && (
              <>
                {cargoList.map((item, index) => {
                  if (!item.isPro) {
                    //Проверка на отмеченность
                    let isSelect = this.props.cargoInfo.cargoType === item.id;
                    return (
                      <div key={index} className="col box-grooz-wrapper">
                        <div
                          className={`box-grooz ${isSelect ? "active" : ""}`}
                          onClick={() => {
                            this.props.onChangeCargoType(item.id);
                          }}
                        >
                          <div className="text-center">
                            <img src={item.img} alt="box" />
                            <span className="d-block">{item.name}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </>
            )}
            {this.state.isPro && (
              <Select
                placeholder="Тип Груза"
                options={cargoList.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                value={this.props.cargoInfo.cargoType}
                onChange={(val) => {
                  this.props.onChangeCargoType(val.value);
                }}
              />
            )}
          </div>
          <div className="row typeGrooz">
            {currentCargoType && (
              <>
                <div className="moreParams">
                  {currentCargoType.fields &&
                    currentCargoType.fields(
                      this.props.onChangeCargoData,
                      this.props.cargoInfo.cargoData
                    )}
                </div>
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
                  <Input
                    type="text"
                    style={{ width: "147px" }}
                    placeholder="Вес"
                  />
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
                    {this.state.volumeH *
                      this.state.volumeW *
                      this.state.volumeW}
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
              </>
            )}
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
    currentTab: 1,
    type: "offer",
    //Step1
    car: {
      extraParams: [],
      contractParams: [],
      paymentParams: [],
    },
    comment: false,
    budget: false,
    //Step2
    addressFrom: false,
    addressTo: false,
    startDate: false,
    startTimeFrom: false,
    startTimeTo: false,
    //Step3
    cargoType: false,
    cargoData: [],
  };
  componentDidMount() {}
  render() {
    console.log(this.state);
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
              key="OfferCreate1"
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
              onChange={(val, prop) => {
                let car = this.state.car;
                switch (prop) {
                  case "carType":
                    car = { ...car, type: val };
                    break;
                  case "carName":
                    car = { ...car, name: val };
                    break;
                  case "carPhoto":
                    car = { ...car, photo: val };
                    break;
                }
                this.setState({
                  car: car,
                });
              }}
              onChangeParams={(prop, val, isSingle = false) => {
                let car = { ...this.state.car };
                if (!isSingle) {
                  if (
                    car[prop].find((item) => {
                      return item.id === val;
                    })
                  ) {
                    car[prop] = car[prop].filter((item, index) => {
                      return item.id !== val;
                    });
                  } else {
                    car[prop].push({ id: val });
                  }
                  this.setState({
                    car: car,
                  });
                } else {
                  if (
                    !car[prop].find((item) => {
                      return item.id === val;
                    })
                  ) {
                    car[prop] = [{ id: val }];
                    this.setState({
                      car: car,
                    });
                  }
                }
              }}
              onChangeParamsFiels={(prop, idProp, name, val) => {
                let car = { ...this.state.car };
                if (
                  car[prop].find((item) => {
                    return item.id === idProp;
                  })
                ) {
                  car[prop] = car[prop].map((item) => {
                    if (item.id === idProp) {
                      item[name] = val;
                      return item;
                    } else return item;
                  });
                  this.setState({
                    car: car,
                  });
                }
              }}
              onChangeComment={(e) => {
                this.setState({ comment: e.target.value });
              }}
              onChangeBudget={(e) => {
                this.setState({ budget: e.target.value });
              }}
              car={this.state.car}
              comment={this.state.comment}
              budget={this.state.budget}
            />
            <OfferCreate2
              key="OfferCreate2"
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
              onChangeAddress={(prop, val, callback) => {
                switch (prop) {
                  case "From":
                    this.setState({ addressFrom: val }, callback);
                    break;
                  case "To":
                    this.setState({ addressTo: val }, callback);
                    break;
                }
              }}
              onChangeTimeInfo={(prop, val, callback) => {
                switch (prop) {
                  case "date":
                    this.setState({ startDate: val }, callback);
                    break;
                  case "From":
                    this.setState({ startTimeFrom: val }, callback);
                    break;
                  case "To":
                    this.setState({ startTimeTo: val }, callback);
                    break;
                }
              }}
              addressInfo={{
                addressFrom: this.state.addressFrom,
                addressTo: this.state.addressTo,
                startDate: this.state.startDate,
                startTimeFrom: this.state.startTimeFrom,
                startTimeTo: this.state.startTimeTo,
              }}
            />
            <OfferCreate3
              key="OfferCreate3"
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
              cargoInfo={{
                cargoType: this.state.cargoType,
                cargoData: this.state.cargoData,
              }}
              onChangeCargoType={(val) => {
                this.setState({ cargoType: val });
              }}
              onChangeCargoData={(prop, val) => {
                let cargoDataX = this.state.cargoData;
                cargoDataX[prop] = val;
                this.setState({ cargoData: cargoDataX });
              }}
            />

            <OfferCreate4
             key="OfferCreate4"
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
