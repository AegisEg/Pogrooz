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
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
//Configs
import cargoList from "../../config/baseInfo/cargoTypesList";
import {
  extraParams,
  contractParams,
  paymentParams,
} from "../../config/baseInfo/carParams";
import carTypesList from "../../config/baseInfo/carTypesList";
import cargoUnit from "../../config/baseInfo/unitCargo";
import configApi from "../../config/api";
//Configs

class OfferCreate1 extends React.Component {
  state = {
    isExtra: false,
    isContract: false,
    isPayment: false,
    //Step1
    car: {},
    comment: "",
    budget: false,
    errRequired: {},
  };
  getArticlesInfo() {
    let errorArr = {};
    let isError = false;
    if (!this.state.car.typesCar || !this.state.car.typesCar.length) {
      errorArr["type"] = true;
      isError = true;
    }
    if (!this.state.car.name) {
      errorArr["name"] = true;
      isError = true;
    }
    if (!this.state.car.photo) {
      errorArr["photo"] = true;
      isError = true;
    }
    if (isError) {
      this.setState({ errRequired: { ...errorArr } });
      return false;
    } else
      return {
        car: this.state.car,
        comment: this.state.comment,
        budget: this.state.budget,
      };
  }

  componentDidMount() {
    //Инициализация
    let newState = {};
    if (this.props.comment)
      newState = {
        ...newState,
        comment: this.props.comment,
      };
    if (this.props.budget)
      newState = {
        ...newState,
        budget: this.props.budget,
      };
    let car = this.props.car;
    car = { additionally: [], contractParam: {}, paymentInfo: [], ...car };
    newState = {
      ...newState,
      isExtra: !!car.additionally.length,
      isContract:
        !!car.contractParam &&
        Object.keys(car.contractParam).length !== 0 &&
        car.contractParam.constructor !== Object,
      isPayment: !!car.paymentInfo.length,
    };
    this.setState({
      car: car,
      ...newState,
    });
  }
  getIfExit(array, item, prop) {
    let element = false;
    if ((element = array.find((itemX) => itemX.id == item)))
      return element[prop] ? element[prop] : "";
    else return "";
  }
  onChange = (val, prop) => {
    let car = this.state.car;
    switch (prop) {
      case "carType":
        car = { ...car, typesCar: [val] };
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
  };
  onChangeParams = (prop, val, isSingle = false) => {
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
      car[prop] = { id: val };
      this.setState({
        car: car,
      });
    }
  };
  onChangeParamsFiels = (prop, idProp, name, val, isSingle = false) => {
    let car = { ...this.state.car };
    if (!isSingle) {
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
      }
    } else {
      car[prop][name] = val;
    }
    this.setState({
      car: car,
    });
  };
  onChangeComment = (e) => {
    this.setState({ comment: e.target.value });
  };
  onChangeBudget = (e) => {
    this.setState({ budget: e.target.value });
  };
  render() {
    let currentCarType =
      this.state.car.typesCar && !!this.state.car.typesCar.length
        ? carTypesList.find((item) => this.state.car.typesCar[0] === item.id)
        : false;
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
                  className={`${
                    this.state.errRequired.type ? "errRequired" : ""
                  }`}
                  options={carTypesList.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                  value={
                    currentCarType
                      ? {
                          value: currentCarType.id,
                          label: currentCarType.name,
                        }
                      : null
                  }
                  onChange={(val) => {
                    this.setState({
                      errRequired: {
                        ...this.state.errRequired,
                        type: false,
                      },
                    });
                    this.onChange(val.value, "carType");
                  }}
                />
              </div>
              <div className="carName mt-3">
                <Input
                  type="text"
                  value={this.state.car.name || ""}
                  placeholder="Марка, модель"
                  className={`${
                    this.state.errRequired.name ? "errRequired" : ""
                  }`}
                  onChange={(val) => {
                    this.setState({
                      errRequired: {
                        ...this.state.errRequired,
                        name: false,
                      },
                    });
                    this.onChange(val.target.value, "carName");
                  }}
                />
              </div>
            </div>
            <div className="mt-3 col-12 col-md-4 row addPhotoCarBlock">
              <h4
                className="f-16 col-12 text-center"
                style={{
                  marginBottom: "20px",
                  fontWeight: "normal",
                }}
              >
                Добавьте фото машины
              </h4>
              <input
                id="photoCar"
                onChange={(e) => {
                  this.setState({
                    errRequired: {
                      ...this.state.errRequired,
                      photo: false,
                    },
                  });
                  let file = e.target.files[0];
                  this.onChange(
                    { file: file, path: URL.createObjectURL(file) },
                    "carPhoto"
                  );
                }}
                type="file"
                accept="image/jpeg,image/png"
                hidden
              />
              <div
                className={`inputPhoto ${
                  this.state.errRequired.photo ? "errRequired" : ""
                }`}
              >
                <div
                  className="placeholder"
                  onClick={() => {
                    document.getElementById("photoCar").click();
                  }}
                >
                  <span>Загрузить</span>
                </div>
                {this.state.car.photo && (
                  <img
                    src={
                      this.state.car.photo ? this.state.car.photo.path : false
                    }
                    className="carPhoto"
                    alt=""
                  />
                )}
                {!this.state.car.photo && <div className="carPhoto" />}
              </div>
            </div>
          </div>
          <div className="row swicher-wrapper">
            <div className="col-sm-6 col-md-4">
              <div className="CheckBoxSwitcher-wrapper">
                <CheckBoxSwitcher
                  lableClassname="f-16"
                  val={this.state.isExtra}
                  onChange={() => {
                    this.setState({
                      isExtra: !this.state.isExtra,
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
                {this.state.isExtra && (
                  <div className="checkboxGroup">
                    {extraParams.map((item, index) => {
                      return (
                        <div key={index} className="checkboxParam">
                          <CheckBox
                            id={`additionally${item.id}`}
                            name={`additionally${item.id}`}
                            value={this.state.car.additionally.find(
                              (itemX) => itemX.id == item.id
                            )}
                            onChange={() => {
                              this.onChangeParams("additionally", item.id);
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.state.car.additionally.find(
                              (itemX) => itemX.id === item.id
                            ) &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={this.getIfExit(
                                    this.state.car.additionally,
                                    item.id,
                                    itemField.name
                                  )}
                                  onChange={(e) => {
                                    this.onChangeParamsFiels(
                                      "additionally",
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
                  val={this.state.isContract}
                  onChange={() => {
                    this.setState({
                      isContract: !this.state.isContract,
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
                {this.state.isContract && (
                  <div className="checkboxGroup">
                    {contractParams.map((item, index) => {
                      return (
                        <div key={index} className="checkboxParam">
                          <CheckBox
                            id={`contractParams${item.id}`}
                            name={`contractParams`}
                            value={this.state.car.contractParam.id === item.id}
                            onChange={() => {
                              this.onChangeParams(
                                "contractParam",
                                item.id,
                                true
                              );
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.state.car.contractParam.id === item.id &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={
                                    this.state.car.contractParam[
                                      itemField.props.name
                                    ] || ""
                                  }
                                  onChange={(e) => {
                                    this.onChangeParamsFiels(
                                      "contractParam",
                                      item.id,
                                      itemField.props.name,
                                      e.target.value,
                                      true
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
                  val={this.state.isPayment}
                  onChange={() => {
                    this.setState({
                      isPayment: !this.state.isPayment,
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
                {this.state.isPayment && (
                  <div className="checkboxGroup">
                    {paymentParams.map((item, index) => {
                      return (
                        <div key={index} className="checkboxParam">
                          <CheckBox
                            id={`paymentParams${item.id}`}
                            name={`paymentParams${item.id}`}
                            value={
                              this.state.car.paymentInfo.length &&
                              !!this.state.car.paymentInfo.find(
                                (itemX) => itemX.id === item.id
                              )
                            }
                            onChange={() => {
                              this.onChangeParams("paymentInfo", item.id);
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.state.car.paymentInfo.find(
                              (itemX) => itemX === item.id
                            ) &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={
                                    this.state.car.paymentInfo[
                                      itemField.props.name
                                    ]
                                  }
                                  onChange={(e) => {
                                    this.onChangeParamsFiels(
                                      "paymentInfo",
                                      item.id,
                                      itemField.props.name,
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
                onChange={this.onChangeComment}
                style={{
                  height: "70px",
                }}
                value={this.state.comment ? this.state.comment : ""}
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
                  onChange={this.onChangeBudget}
                  value={this.state.budget ? this.state.budget : ""}
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
    startDate: false,
    startTimeFrom: false,
    startTimeTo: false,
    errRequired: {},
  };
  getArticlesInfo() {
    let errorArr = {};
    let isError = false;
    if (
      !this.state.addressFrom ||
      Number(this.state.addressFrom.data.fias_level) !== 8
    ) {
      errorArr["addressFrom"] = true;
      isError = true;
    }
    if (
      !this.state.addressTo ||
      Number(this.state.addressTo.data.fias_level) !== 8
    ) {
      errorArr["addressTo"] = true;
      isError = true;
    }
    if (!this.state.startDate) {
      errorArr["startDate"] = true;
      isError = true;
    }
    if (isError) {
      this.setState({ errRequired: { ...errorArr } });
      return false;
    } else
      return {
        startDate: {
          timeFrom: this.state.startTimeFrom,
          timeTo: this.state.startTimeTo,
          date: this.state.startDate,
        },
        from: this.state.addressFrom,
        to: this.state.addressTo,
      };
  }
  componentDidMount() {
    //Инициализация
    let newState = {};
    if (this.props.addressFrom)
      newState = {
        addressFrom: this.props.addressFrom,
      };
    if (this.props.addressTo)
      newState = {
        ...newState,
        addressTo: this.props.addressTo,
      };
    if (this.props.startDate) {
      if (this.props.startDate.date)
        newState = {
          ...newState,
          startDate: this.props.startDate.date,
        };
      if (this.props.startDate.date)
        newState = {
          ...newState,
          startTimeFrom: this.props.startDate.timeFrom,
        };
      if (this.props.startDate.date)
        newState = {
          ...newState,
          startTimeTo: this.props.startDate.timeTo,
        };
    }
    this.setState({
      ...newState,
    });
  }
  componentDidUpdate() {
    if (this.state.startTimeFrom && !this.state.isTime)
      this.setState({ isTime: true });
    if (this.state.startTimeTo && !this.state.isTimeInterval)
      this.setState({ isTimeInterval: true });
  }
  onChangeAddress = (prop, val, callback) => {
    switch (prop) {
      case "From":
        this.setState({ addressFrom: val }, callback);
        break;
      case "To":
        this.setState({ addressTo: val }, callback);
        break;
    }
  };
  onChangeTimeInfo = (prop, val, callback) => {
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
                  className={`${
                    this.state.errRequired.addressFrom ? "errRequired" : ""
                  }`}
                  value={
                    this.state.addressFrom ? this.state.addressFrom.value : ""
                  }
                  onChange={(val) => {
                    if (Number(val.data.fias_level) === 8)
                      this.setState({
                        errRequired: {
                          ...this.state.errRequired,
                          addressFrom: false,
                        },
                      });

                    this.onChangeAddress("From", val, () => {
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
                    center: this.state.addressFrom
                      ? [
                          this.state.addressFrom.data.geo_lat,
                          this.state.addressFrom.data.geo_lon,
                        ]
                      : [55.684758, 37.738521],
                    zoom: 10,
                  }}
                  style={{
                    marginTop: "21px",
                    height: "220px",
                    width: "100%",
                  }}
                >
                  {this.state.addressFrom &&
                    this.state.addressFrom.data.geo_lat &&
                    this.state.addressFrom.data.geo_lon && (
                      <Placemark
                        geometry={[
                          this.state.addressFrom.data.geo_lat,
                          this.state.addressFrom.data.geo_lon,
                        ]}
                      />
                    )}
                </Map>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <AdressSelect
                  placeholder="Куда"
                  className={`${
                    this.state.errRequired.addressTo ? "errRequired" : ""
                  }`}
                  value={this.state.addressTo ? this.state.addressTo.value : ""}
                  onChange={(val) => {
                    if (Number(val.data.fias_level) === 8)
                      this.setState({
                        errRequired: {
                          ...this.state.errRequired,
                          addressTo: false,
                        },
                      });
                    this.onChangeAddress("To", val, () => {
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
                    center: this.state.addressTo
                      ? [
                          this.state.addressTo.data.geo_lat,
                          this.state.addressTo.data.geo_lon,
                        ]
                      : [55.684758, 37.738521],
                    zoom: 10,
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
                  className={`${
                    this.state.errRequired.startDate ? "errRequired" : ""
                  }`}
                  style={{ width: "130px" }}
                  placeholder="Введите дату"
                  value={this.state.startDate || null}
                  onChange={(val) => {
                    this.setState({
                      errRequired: {
                        ...this.state.startDate,
                        startDate: false,
                      },
                    });
                    this.onChangeTimeInfo("date", val);
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
                    if (this.state.isTime) this.onChangeTimeInfo("From", false);
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
                    {this.state.startTimeFrom && (
                      <CheckBox
                        id="isTimeInterval"
                        onChange={() => {
                          if (this.state.isTimeInterval)
                            this.onChangeTimeInfo("To", false);
                          this.setState({
                            isTimeInterval: !this.state.isTimeInterval,
                          });
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
                      placeholder="Введите время"
                      value={this.state.startTimeFrom || null}
                      onChange={(val) => {
                        this.onChangeTimeInfo("From", val);
                      }}
                    />
                    {this.state.isTimeInterval && (
                      <>
                        <span className="filter-input-title mb-0">
                          &nbsp;&nbsp;-
                        </span>
                        <Input
                          type="time"
                          placeholder="Введите время"
                          value={this.state.startTimeTo || null}
                          onChange={(val) => {
                            this.onChangeTimeInfo("To", val);
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
    isPro: false,
    cargoTypes: [],
    cargoData: [],
    cargoStandartData: [],
    errRequired: [],
  };
  componentDidMount() {
    let currentCargoTypes = cargoList.filter((item) => {
      return (
        !!this.props.cargoTypes &&
        !!this.props.cargoTypes.find((itemX) => {
          return itemX === item.id;
        })
      );
    });
    //Инициализация
    let newState = {};
    if (this.props.cargoTypes)
      newState = {
        cargoTypes: this.props.cargoTypes,
      };
    if (currentCargoTypes.find((item) => item.isPro))
      newState = {
        ...newState,
        isPro: true,
      };
    if (this.props.cargoData)
      newState = {
        ...newState,
        cargoData: this.props.cargoData,
      };
    if (this.props.cargoStandartData)
      newState = {
        ...newState,
        cargoStandartData: this.props.cargoStandartData,
      };
    this.setState({
      ...newState,
    });
  }
  getArticlesInfo() {
    let errorArr = {};
    let isError = false;
    if (!this.state.cargoTypes.length) {
      errorArr["cargoTypes"] = true;
      isError = true;
    }
    if (isError) {
      this.setState({ errRequired: { ...errorArr } });
      return false;
    } else
      return {
        cargoTypes: this.state.cargoTypes,
        cargoData: this.state.cargoData,
        cargoStandartData: this.state.cargoStandartData,
      };
  }
  //Динамические данные не учавствующие  в поиске
  onChangeCargoData = (typeID, prop, val) => {
    let cargoDataX = this.state.cargoData;
    if (!cargoDataX[typeID]) cargoDataX[typeID] = {};
    cargoDataX[typeID][prop] = val;
    this.setState({ cargoData: cargoDataX });
  };
  //Стандартные данные который участвуют в поиске
  onChangeCargoStandartData = (typeID, prop, val) => {
    let cargoStandartDataX = this.state.cargoStandartData;
    if (!cargoStandartDataX[typeID]) cargoStandartDataX[typeID] = {};
    cargoStandartDataX[typeID][prop] = val;
    this.setState({ cargoStandartData: cargoStandartDataX });
  };
  render() {
    let currentCargoTypes = cargoList.filter((item) => {
      return !!this.state.cargoTypes.find((itemX) => {
        return itemX === item.id;
      });
    });
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="container-fluid">
          <div className="box-grooz-wrapper-row align-items-start justify-content-start">
            <h4
              className={`f-16 col-12 mb-1`}
              style={{
                fontWeight: "normal",
              }}
            >
              <span
                className={` ${
                  this.state.errRequired.cargoTypes ? "errRequired" : ""
                }`}
              >
                Тип груза
              </span>
              {!currentCargoTypes.find((item) => item.isPro) && (
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
              )}
            </h4>
            {!this.state.isPro && (
              <>
                {cargoList.map((item, index) => {
                  if (!item.isPro) {
                    //Проверка на отмеченность
                    let isSelect = currentCargoTypes.find((itemX) => {
                      return itemX.id === item.id;
                    });

                    return (
                      <div key={index} className="col box-grooz-wrapper">
                        <div
                          className={`box-grooz ${isSelect ? "active" : ""}`}
                          onClick={() => {
                            this.setState({
                              errRequired: {
                                ...this.state.errRequired,
                                cargoTypes: false,
                              },
                            });
                            if (
                              this.state.cargoTypes.find(
                                (itemX) => itemX === item.id
                              )
                            )
                              this.setState({
                                cargoTypes: this.state.cargoTypes.filter(
                                  (itemX) => itemX !== item.id
                                ),
                              });
                            else
                              this.setState({
                                cargoTypes: [...this.state.cargoTypes, item.id],
                              });
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
                isMulti={true}
                className="selectTypeCargo"
                value={currentCargoTypes.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                onChange={(val) => {
                  this.setState({
                    errRequired: {
                      ...this.state.errRequired,
                      cargoTypes: false,
                    },
                  });
                  if (val)
                    val = val.map((item) => {
                      return item.value;
                    });
                  else val = [];
                  this.setState({
                    cargoTypes: [...val],
                  });
                }}
              />
            )}
          </div>
          <div className="row typeGrooz">
            {!!currentCargoTypes.length &&
              currentCargoTypes.map((item, index) => {
                return (
                  <div key={index} className="rowParams">
                    <h4
                      className="f-16 col-12 mb-1"
                      style={{
                        fontWeight: "normal",
                      }}
                    >
                      <div className="typeName">{item.name}</div>Параметры
                      одного места и количество мест
                    </h4>
                    <div className="moreParams">
                      {item.fields &&
                        item.fields(
                          this.onChangeCargoData,
                          this.state.cargoData[item.id] || []
                        )}
                    </div>
                    {item.isStandart && (
                      <div className="standartParams">
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
                            options={cargoUnit}
                            value={
                              this.state.cargoStandartData[item.id] &&
                              this.state.cargoStandartData[item.id]["unit"]
                                ? {
                                    value: this.state.cargoStandartData[
                                      item.id
                                    ]["unit"],
                                    label: cargoUnit.find(
                                      (itemX) =>
                                        itemX.value ===
                                        this.state.cargoStandartData[item.id][
                                          "unit"
                                        ]
                                    ).label,
                                  }
                                : ""
                            }
                            onChange={(val) => {
                              this.onChangeCargoStandartData(
                                item.id,
                                "unit",
                                val.value
                              );
                            }}
                          />
                        </div>
                        <div
                          className="col"
                          style={{
                            maxWidth: "177px",
                          }}
                        >
                          <Input
                            type="number"
                            style={{ width: "147px" }}
                            placeholder="Вес"
                            value={
                              this.state.cargoStandartData[item.id] &&
                              this.state.cargoStandartData[item.id]["weight"]
                                ? this.state.cargoStandartData[item.id][
                                    "weight"
                                  ]
                                : ""
                            }
                            onChange={(e) => {
                              this.onChangeCargoStandartData(
                                item.id,
                                "weight",
                                e.target.value
                              );
                            }}
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
                            style={{ margin: "0 0 0 0" }}
                            value={
                              this.state.cargoStandartData[item.id] &&
                              this.state.cargoStandartData[item.id]["length"]
                                ? this.state.cargoStandartData[item.id][
                                    "length"
                                  ]
                                : ""
                            }
                            onChange={(e) => {
                              this.setState({ volumeWh: e.target.value });
                              this.onChangeCargoStandartData(
                                item.id,
                                "length",
                                e.target.value
                              );
                            }}
                          />
                          <Input
                            type="number"
                            placeholder="Ширина"
                            className="text-center"
                            value={
                              this.state.cargoStandartData[item.id] &&
                              this.state.cargoStandartData[item.id]["width"]
                                ? this.state.cargoStandartData[item.id]["width"]
                                : ""
                            }
                            onChange={(e) => {
                              this.onChangeCargoStandartData(
                                item.id,
                                "width",
                                e.target.value
                              );
                            }}
                            style={{ margin: "0 0 0 0" }}
                          />
                          <Input
                            type="number"
                            className="text-center"
                            value={
                              this.state.cargoStandartData[item.id] &&
                              this.state.cargoStandartData[item.id]["height"]
                                ? this.state.cargoStandartData[item.id][
                                    "height"
                                  ]
                                : ""
                            }
                            onChange={(e) => {
                              this.onChangeCargoStandartData(
                                item.id,
                                "height",
                                e.target.value
                              );
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
                            <div className="valumeCalculate">
                              {this.state.cargoStandartData[item.id] &&
                                this.state.cargoStandartData[item.id][
                                  "height"
                                ] &&
                                this.state.cargoStandartData[item.id][
                                  "width"
                                ] &&
                                this.state.cargoStandartData[item.id][
                                  "length"
                                ] && (
                                  <>
                                    {this.state.cargoStandartData[item.id][
                                      "length"
                                    ] *
                                      this.state.cargoStandartData[item.id][
                                        "width"
                                      ] *
                                      this.state.cargoStandartData[item.id][
                                        "height"
                                      ]}
                                  </>
                                )}
                              &nbsp;
                            </div>
                            м<sup>3</sup>
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
                            value={
                              this.state.cargoStandartData[item.id] &&
                              this.state.cargoStandartData[item.id]["count"]
                                ? this.state.cargoStandartData[item.id]["count"]
                                : ""
                            }
                            onChange={(e) => {
                              this.onChangeCargoStandartData(
                                item.id,
                                "count",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                        <div
                          className="row col mx-0"
                          style={{
                            maxWidth: "170px",
                            minWidth: "150px",
                            alignItems: "center",
                          }}
                        >
                          <span className="filter-input-title">
                            Общий<br></br>вес
                          </span>
                          <span className="d-inline-block ml-4">
                            =
                            <div
                              className="valumeCalculate"
                              style={{
                                maxWidth: "40px",
                              }}
                            >
                              {this.state.cargoStandartData[item.id] &&
                                this.state.cargoStandartData[item.id][
                                  "weight"
                                ] &&
                                this.state.cargoStandartData[item.id][
                                  "count"
                                ] && (
                                  <>
                                    {this.state.cargoStandartData[item.id][
                                      "weight"
                                    ] *
                                      this.state.cargoStandartData[item.id][
                                        "count"
                                      ]}
                                  </>
                                )}
                            </div>
                            кг
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
  createAricle() {
    let apiToken = this.props.cookies.get("apiToken");
    let formData = new FormData();
    formData.append("article", JSON.stringify(this.props.article));
    if (this.props.article.car.photo.file)
      formData.append("carPhoto", this.props.article.car.photo.file);
    if (apiToken) {
      fetch(`${configApi.urlApi}/api/article/createArticle`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) this.props.history.push("/my-offers-open");
        });
    }
  }
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="articles-block full">
          <ArticleHeader></ArticleHeader>
          {this.props.article && (
            <Article
              isManage={false}
              onlyOpen={true}
              singlePage={true}
              article={this.props.article}
            />
          )}
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
              onClick={() => {
                this.createAricle();
              }}
            >
              Опубликовать
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
let OfferCreate4Cookies = withRouter(withCookies(OfferCreate4));
let defaultArticle = false;

class OfferCreate extends React.Component {
  constructor(props) {
    super(props);
    if (defaultArticle) this.article = defaultArticle;
    else this.article = {};
  }
  state = {
    currentTab: 1,
    article: false,
  };
  getRef(number) {
    switch (number) {
      case 1:
        return this.step1;
      case 2:
        return this.step2;
      case 3:
        return this.step3;
    }
  }

  nexTab(number) {
    let error = false;
    let data;
    let article = { type: "offer", status: 2 };
    Array.from(Array(number - 1), (_, i) => i + 1).map((item) => {
      if ((data = this.getRef(item).getArticlesInfo()))
        article = {
          ...article,
          ...data,
        };
      else error = true;
    });
    if (!error) {
      if (number === 4) {
        this.setState(
          { article: { ...article, autor: this.props.user } },
          () => {
            this.setState({ currentTab: number });
          }
        );
      } else this.setState({ currentTab: number });
    }
  }
  render() {
    return (
      <>
        <div className="create-page create-order-page">
          <div className="container-fluid">
            <h2 className="title">{this.props.title}</h2>
            <HeaderCreate
              changeTub={(setTub) => {
                this.nexTab(setTub);
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
              ref={(ref) => (this.step1 = ref)}
              className={`${this.state.currentTab === 1 ? "active" : ""} 
              ${this.state.currentTab > 1 ? "deactive" : ""}`}
              car={this.article.car}
              next={() => {
                this.nexTab(2);
              }}
              comment={this.article.comment}
              budget={this.article.budget}
            />
            <OfferCreate2
              ref={(ref) => (this.step2 = ref)}
              className={`${this.state.currentTab === 2 ? "active" : ""} ${
                this.state.currentTab > 2 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(3);
              }}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              addressFrom={this.article.from}
              addressTo={this.article.to}
              startDate={this.article.startDate}
            />
            <OfferCreate3
              ref={(ref) => (this.step3 = ref)}
              className={`${this.state.currentTab === 3 ? "active" : ""} ${
                this.state.currentTab > 3 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(4);
              }}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              cargoTypes={this.article.cargoTypes}
              cargoData={this.article.cargoData}
              cargoStandartData={this.article.cargoStandartData}
            />

            <OfferCreate4Cookies
              key="OfferCreate4"
              className={`${this.state.currentTab === 4 ? "active" : ""}`}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              article={this.state.article}
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
