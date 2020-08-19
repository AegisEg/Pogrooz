// App
import React from "react";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";
import Select from "../Elements/Select";
import AdressSelect from "./AdressSelect";
import CheckBox from "./CheckBox";
import cargoList from "../config/baseInfo/cargoTypesList";
import StandartParams from "../Pages/User/CreatePart/StandartParams";
import ImgActiveStar from "../img/active-star.png";
import closePng from "../img/close.png";
import angle from "../img/angle-up.png";
import { ReactComponent as FilterImg } from "../img/filter.svg";
import carTypesList from "../config/baseInfo/carTypesList";
import {
  extraParams,
  paymentParams,
  contractParams,
} from "../config/baseInfo/carParams";
class Filter extends React.Component {
  state = {
    show: false,
    searchType: this.props.type,
    showPop1: false,
    showPop2: false,
    volumeH: 0,
    volumeW: 0,
    volumeWh: 0,
  };
  //Динамические данные не учавствующие  в поиске
  onChangeCargoData = (typeID, prop, val) => {
    let cargoDataX = this.props.options.cargoData;
    if (cargoDataX.find((item) => item.typeID === typeID)) {
      cargoDataX = cargoDataX.map((item) => {
        if (item.typeID === typeID) {
          item[prop] = val;
          return item;
        } else return item;
      });
    } else {
      cargoDataX.push({ typeID: typeID });
      cargoDataX[cargoDataX.length - 1][prop] = val;
    }
    this.props.onChange({ cargoData: cargoDataX });
  };
  //Стандартные данные который участвуют в поиске
  onChangeCargoStandartData = (prop, val) => {
    let cargoStandartDataX = this.props.options.cargoStandartData;
    cargoStandartDataX[prop] = val;
    this.props.onChange({ cargoStandartData: cargoStandartDataX });
  };
  componentDidMount() {
    document.querySelectorAll(".pop-hints").forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        item.children.forEach((item) => {
          if (item.classList.value === "pop-block")
            item.style.display = "block";
        });
      });
    });
    document.querySelectorAll(".pop-hints").forEach((item) => {
      item.addEventListener("mouseleave", (e) => {
        item.children.forEach((item) => {
          if (item.classList.value === "pop-block") item.style.display = "none";
        });
      });
    });
  }
  render() {
    let options = this.props.options;
    let currentCargoType = options.cargoType
      ? cargoList.find((item) => item.id === options.cargoType)
      : false;
    let currentCarType = options.carType
      ? carTypesList.find((item) => item.id === options.carType)
      : false;
    return (
      <>
        {!this.props.notType && (
          <>
            <div
              className={`row search-tabs background-gray-768 tabs justify-content-center ${
                this.state.show ? "background-gray" : ""
              }`}
            >
              <div
                className={`tab mx-3 text-uppercase ${
                  options.type === "offer" ? "active" : ""
                }`}
                onClick={() => {
                  this.props.onChange({ type: "offer" });
                }}
              >
                Услуги{" "}
                <span className="d-380 d-sm-inline-block">перевозчиков</span>
              </div>
              <div
                className={`tab mx-3 text-uppercase ${
                  options.type === "order" ? "active" : ""
                }`}
                onClick={() => {
                  this.props.onChange({ type: "order" });
                }}
              >
                Заказы{" "}
                <span className="d-380 d-sm-inline-block">на перевозку</span>
              </div>
            </div>
          </>
        )}
        <div
          className={`filter  ${
            this.state.show ? "background-gray" : ""
          } background-gray-768`}
        >
          <div className="container-fluid">
            {this.state.show && (
              <Link
                to="/"
                className="f-14 mb-2 go-to-pro mr-4 d-inline d-lg-none"
              >
                Перейти в режим PRO
              </Link>
            )}
            <div className="row filter-line">
              <div
                className={`pop-hints col-480-6 ${
                  this.state.show ? `col-md-4` : `col-md-3`
                } col-lg-3 col-xl-3 col-sm-6`}
              >
                <AdressSelect
                  placeholder="Откуда"
                  onChange={(val) => {
                    val.coordinates = [val.data.geo_lat, val.data.geo_lon];
                    this.props.onChange({ from: val });
                  }}
                  value={options.from ? options.from.value : ""}
                />
                <div className="pop-block">Начните вводить адрес с области</div>
              </div>

              <div
                className={`pop-hints col-480-6 ${
                  this.state.show ? `col-md-4` : `col-md-3`
                } col-lg-3 col-xl-3 col-sm-6`}
              >
                <AdressSelect
                  placeholder="Куда"
                  onChange={(val) => {
                    val.coordinates = [val.data.geo_lat, val.data.geo_lon];
                    this.props.onChange({ to: val });
                  }}
                  value={options.to ? options.to.value : ""}
                />
                <div className="pop-block">Начните вводить адрес с области</div>
              </div>

              <div
                className={`col-480-6 ${
                  this.state.scargoTypehow ? `col-md-4` : `col-md-3`
                } col-lg-3 col-xl-3 col-sm-6`}
              >
                <Select
                  type="text"
                  options={cargoList.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                  className="selectTypeCargo"
                  onChange={(val) => {
                    this.props.onChange({
                      cargoType: val.value,
                      cargoStandartData: {},
                      cargoData: [],
                    });
                  }}
                  value={
                    currentCargoType
                      ? {
                          value: currentCargoType.id,
                          label: currentCargoType.name,
                        }
                      : false
                  }
                  placeholder="Тип груза"
                  getRef={() => {}}
                />
              </div>
              <div
                className={`col-480-6 col-md-3 col-lg-3 col-xl-3 col-sm-6 row mx-0 align-items-center justify-content-center ${
                  this.state.show ? `d-none d-lg-flex` : ``
                }`}
              >
                <a className="col px-0 ">
                  <Button
                    width={"100%"}
                    type="fill"
                    className="lh-20 search-button"
                    paddingVertical={"10px"}
                    margin={"0 15px 0 0"}
                    onClick={this.props.onSearch}
                  >
                    Найти
                  </Button>
                </a>
                <FilterImg
                  className={`settingsSvg ml-3 ${
                    this.state.show ? "active" : ""
                  }`}
                  onClick={() => {
                    this.setState({ show: !this.state.show });
                  }}
                />
              </div>
              {this.state.show && (
                <>
                  <div className="col-md-4 col-lg-3 col-xl-3  col-sm-6">
                    <Select
                      type="text"
                      placeholder="Тип машины"
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
                        this.props.onChange({ carType: val.value });
                      }}
                    />
                  </div>
                  <div
                    className="row px-3"
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
                      placeholder="Введите дату"
                      value={options.startDate.date || null}
                      onChange={(val) => {
                        this.props.onChange({
                          startDate: { ...options.startDate, date: val },
                        });
                      }}
                    />
                  </div>

                  <div
                    className="row px-3"
                    style={{
                      marginLeft: "0",
                      marginRight: "0",
                      alignItems: "center",
                    }}
                  >
                    <span className="filter-input-title">
                      Время<br></br>погрузки
                    </span>
                    <Input
                      type="time"
                      placeholder="От"
                      value={options.startDate.timeFrom || null}
                      onChange={(val) => {
                        this.props.onChange({
                          startDate: { ...options.startDate, timeFrom: val },
                        });
                      }}
                    />
                    <span className="filter-input-title">&nbsp;&nbsp;-</span>
                    <Input
                      type="time"
                      placeholder="До"
                      value={options.startDate.timeTo || null}
                      onChange={(val) => {
                        this.props.onChange({
                          startDate: { ...options.startDate, timeTo: val },
                        });
                      }}
                    />
                  </div>

                  <div
                    className="row px-3"
                    style={{
                      marginLeft: "0",
                      marginRight: "0",
                      alignItems: "center",
                    }}
                  >
                    <span className="filter-input-title">
                      Рейтинг
                      <br />
                      (0-5):
                    </span>
                    <Input
                      type="number"
                      className="single-char"
                      max="5"
                      min="0"
                      value={options.rating || ""}
                      onChange={(val) => {
                        this.props.onChange({
                          rating: val,
                        });
                      }}
                    />
                    <img
                      src={ImgActiveStar}
                      style={{ marginLeft: "7px" }}
                      alt="Рейтинг"
                    />
                  </div>
                  <div className="row mx-0 typeGrooz">
                    {currentCargoType && (
                      <div className="rowParams">
                        {(currentCargoType.fields ||
                          currentCargoType.isStandart) && (
                          <h4
                            className="f-16 col-12 mb-1"
                            style={{
                              fontWeight: "normal",
                            }}
                          >
                            <div className="typeName">
                              {currentCargoType.name}
                            </div>
                            Параметры одного места и количество мест
                          </h4>
                        )}
                        <div className="moreParams">
                          {currentCargoType.fields &&
                            currentCargoType.fields(
                              this.onChangeCargoData,
                              options.cargoData.find(
                                (itemX) => itemX.typeID === currentCargoType.id
                              ) || [],
                              false,
                              true
                            )}
                        </div>
                        {(currentCargoType.isStandart ||
                          (options.cargoData.find(
                            (itemX) => itemX.typeID === 4
                          ) &&
                            options.cargoData.find(
                              (itemX) => itemX.typeID === 4
                            )["type"] === "Обычные") ||
                          (options.cargoData.find(
                            (itemX) => itemX.typeID === 13
                          ) &&
                            options.cargoData.find(
                              (itemX) => itemX.typeID === 13
                            )["type"] === "Обычные") ||
                          (options.cargoData.find(
                            (itemX) => itemX.typeID === 3
                          ) &&
                            options.cargoData.find(
                              (itemX) => itemX.typeID === 3
                            )["type"] === "Обычные")) && (
                          <StandartParams
                            cargoStandartData={options.cargoStandartData}
                            onChangeCargoStandartData={
                              this.onChangeCargoStandartData
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <h5 className="col-md-12">Дополнительно</h5>
                  <div className="col-12 row mx-0 check-list">
                    {extraParams.map((item, index) => {
                      return (
                        <div key={index}>
                          <CheckBox
                            id={`carData${item.id}`}
                            text={item.name}
                            value={options.additionally.find(
                              (itemX) => itemX === item.id
                            )}
                            onChange={() => {
                              if (
                                options.additionally.find(
                                  (itemX) => itemX === item.id
                                )
                              )
                                this.props.onChange({
                                  additionally: options.additionally.filter(
                                    (itemX) => itemX !== item.id
                                  ),
                                });
                              else
                                this.props.onChange({
                                  additionally: [
                                    ...options.additionally,
                                    item.id,
                                  ],
                                });
                            }}
                          ></CheckBox>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="d-flex col-md-5 col-lg-4 col-xl-3 col-12 col-sm-6"
                    style={{
                      marginLeft: "0",
                      marginRight: "0",
                      alignItems: "center",
                    }}
                  >
                    <span className="filter-input-title">
                      Заключение<br></br>договора
                    </span>
                    <Select
                      type="text"
                      placeholder=""
                      isMulti={true}
                      options={contractParams.map((item) => {
                        return { value: item.id, label: item.name };
                      })}
                      value={contractParams
                        .filter((item) => {
                          return options.contractInfo.find(
                            (itemX) => item.id === itemX
                          );
                        })
                        .map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                      onChange={(val) => {
                        this.props.onChange({
                          contractInfo: val.map((item) => item.value),
                        });
                      }}
                    />
                  </div>
                  <div
                    className="d-flex col-md-6 col-lg-4 col-xl-3 col-12  col-sm-6"
                    style={{
                      marginLeft: "0",
                      marginRight: "0",
                      alignItems: "center",
                    }}
                  >
                    <span className="filter-input-title">
                      Способ оплаты<br></br>водителю
                    </span>
                    <Select
                      type="text"
                      placeholder=""
                      className="select-filter-payment"
                      isMulti={true}
                      options={paymentParams.map((item) => {
                        return { value: item.id, label: item.name };
                      })}
                      value={paymentParams
                        .filter((item) => {
                          return options.paymentInfo.find(
                            (itemX) => item.id === itemX
                          );
                        })
                        .map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                      onChange={(val) => {
                        this.props.onChange({
                          paymentInfo: val.map((item) => item.value),
                        });
                      }}
                    />
                  </div>
                  <div
                    className="d-flex col-md-5 col-lg-4 col-12 budjet_div col-sm-6"
                    style={{
                      marginLeft: "0",
                      marginRight: "0",
                      alignItems: "center",
                    }}
                  >
                    <span className="filter-input-title">
                      Желаемый<br></br>бюджет, руб
                    </span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={options.budget}
                      onChange={(e) => {
                        this.props.onChange({ budget: e.target.value });
                      }}
                    />
                  </div>
                </>
              )}
              <div className="filter-actions mx-0 w-100 row mb-3">
                {this.state.show ? (
                  <>
                    <Link
                      to="/"
                      className="f-14 go-to-pro mr-4"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Сбросить фильтр
                    </Link>
                    <span className="col px-0 d-block d-lg-none mobile filter-button">
                      <Button
                        width={"100%"}
                        type="fill"
                        paddingVertical={"8px"}
                        margin={"0 15px 0 0"}
                        onClick={this.props.onSearch}
                      >
                        Найти
                      </Button>
                    </span>

                    <Link
                      to="/"
                      className="f-14 go-to-pro mr-4 d-none d-lg-inline"
                    >
                      Перейти в режим PRO
                    </Link>
                    <a
                      onClick={() => {
                        this.setState({ show: !this.state.show });
                      }}
                      className="filter-open"
                    >
                      Скрыть параметры поиска
                      <img src={angle} className="ml-2" alt="angle" />
                    </a>
                    <a
                      onClick={() => {
                        this.setState({ show: !this.state.show });
                      }}
                      className="filter-close mr-3 f-14"
                    >
                      <img src={closePng} alt="closePng" />
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
