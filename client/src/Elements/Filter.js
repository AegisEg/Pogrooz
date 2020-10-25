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
import { CSSTransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";
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
    cargoDataX = cargoDataX.filter((item) => {
      Object.keys(item).map((itemX) => {
        if (!item[itemX]) delete item[itemX];
      });
      return Object.keys(item).length > 1;
    });
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
    let cargoListPossible = cargoList;
    if (currentCarType)
      cargoListPossible = cargoList.filter((item) => {
        return !!currentCarType.cargoTypes.find((itemX) => item.id === itemX);
      });
    let carListPossible = carTypesList;
    if (currentCargoType)
      carListPossible = carTypesList.filter((item) => {
        return !!item.cargoTypes.find((itemX) => currentCargoType.id === itemX);
      });
    return (
      <>
        {!this.props.onlyType && (
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
                  // this.props.onChange({ type: "offer" });
                  // this.props.onSearch();
                }}
              >
                <Link to="/search-offer">
                  Предложения{" "}
                  <span className="d-380 d-sm-inline-block">на перевозку</span>
                </Link>
              </div>
              <div
                className={`tab mx-3 text-uppercase ${
                  options.type === "order" ? "active" : ""
                }`}
                onClick={() => {
                  // this.props.onChange({ type: "order" });
                  // this.props.onSearch();
                }}
              >
                <Link to="/search-order">
                  Заказы{" "}
                  <span className="d-380 d-sm-inline-block">на перевозку</span>
                </Link>
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
            <div className="row filter-line">
              <div
                className={`pop-hints col-480-6 ${
                  this.state.show ? `col-md-4` : `col-md-3`
                } col-lg-3 col-xl-3 col-sm-6`}
              >
                <AdressSelect
                  placeholder="Откуда"
                  defaultCity={this.props.defaultCity}
                  onChange={(val) => {
                    if (val)
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
                    if (val)
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
                  isClearable={true}
                  options={cargoListPossible.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                  className="selectTypeCargo"
                  onChange={(val) => {
                    if (val)
                      this.props.onChange({
                        cargoType: val.value,
                        cargoStandartData: {},
                        cargoData: [],
                      });
                    else
                      this.props.onChange({
                        cargoType: false,
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
                    paddingVertical={"8px"}
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
              <CSSTransitionGroup
                transitionName="height-animation-item"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                style={{
                  display: "contents",
                }}
              >
                {this.state.show && (
                  <div className="row filter-line mx-0">
                    <div className="col-md-4 col-lg-3 col-xl-3  col-sm-6">
                      <Select
                        type="text"
                        placeholder="Тип машины"
                        isClearable={true}
                        options={carListPossible.map((item) => {
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
                          if (val) this.props.onChange({ carType: val.value });
                          else this.props.onChange({ carType: false });
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
                        value={options.startDate.date || null}
                        onChange={(val) => {
                          let state = {
                            date: val,
                          };
                          if (!val) {
                            state.timeFrom = false;
                            state.timeTo = false;
                          } else {
                            if (options.startDate.timeFrom)
                              state.timeFrom = new Date(
                                val.getFullYear(),
                                val.getMonth(),
                                val.getDate(),
                                options.startDate.timeFrom.getHours(),
                                options.startDate.timeFrom.getMinutes(),
                                options.startDate.timeFrom.getSeconds()
                              );
                            if (options.startDate.timeTo)
                              state.timeTo = new Date(
                                val.getFullYear(),
                                val.getMonth(),
                                val.getDate(),
                                options.startDate.timeTo.getHours(),
                                options.startDate.timeTo.getMinutes(),
                                options.startDate.timeTo.getSeconds()
                              );
                          }
                          this.props.onChange({
                            startDate: { ...options.startDate, ...state },
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
                        date={options.startDate.date}
                        placeholder="От"
                        value={options.startDate.timeFrom || null}
                        onChange={(val) => {
                          let state;
                          if (!val) {
                            state = { timeFrom: false, еimeTo: false };
                          } else if (options.startDate.timeTo < val)
                            state = { timeFrom: val, timeTo: false };
                          else state = { timeFrom: val };
                          this.props.onChange({
                            startDate: { ...options.startDate, ...state },
                          });
                        }}
                      />
                      <span className="filter-input-title">&nbsp;&nbsp;-</span>
                      <Input
                        type="time"
                        date={options.startDate.date}
                        placeholder="До"
                        disabled={!options.startDate.timeFrom}
                        value={options.startDate.timeTo || null}
                        onChange={(val) => {
                          if (options.startDate.timeFrom > val && val)
                            toast.error(
                              `Время "До" должно быть больше времени "От" `,
                              {
                                position: toast.POSITION.TOP_CENTER,
                              }
                            );
                          else
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
                        onChange={(e) => {
                          if (e.target.value <= 5)
                            this.props.onChange({
                              rating: e.target.value,
                            });
                        }}
                      />
                      <img
                        src={ImgActiveStar}
                        style={{ marginLeft: "7px" }}
                        alt="Рейтинг"
                      />
                    </div>
                    {currentCarType && (
                      <div className="moreInfoCheckBox px-3">
                        <div className="f-14 mb-3">Свойство:</div>
                        <div
                          style={{
                            display: "inline-block",
                          }}
                        >
                          <CheckBox
                            id="property1"
                            name="property"
                            value={options.property === "Манипулятор" || ""}
                            onChange={() => {
                              if (options.property === "Манипулятор")
                                this.props.onChange({ property: false });
                              else
                                this.props.onChange({
                                  property: "Манипулятор",
                                });
                            }}
                            text={"Манипулятор"}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                          }}
                        >
                          <CheckBox
                            id="property2"
                            name="property"
                            value={options.property === "Рефрижератор" || ""}
                            onChange={() => {
                              if (options.property === "Рефрижератор")
                                this.props.onChange({ property: false });
                              else
                                this.props.onChange({
                                  property: "Рефрижератор",
                                });
                            }}
                            text={"Рефрижератор"}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                          }}
                        >
                          <CheckBox
                            id="property3"
                            name="property"
                            value={options.property === "Изотерм" || ""}
                            onChange={() => {
                              if (options.property === "Изотерм")
                                this.props.onChange({ property: false });
                              else
                                this.props.onChange({
                                  property: "Изотерм",
                                });
                            }}
                            text={"Изотерм"}
                          />
                        </div>
                      </div>
                    )}
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
                                  (itemX) =>
                                    itemX.typeID === currentCargoType.id
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
                        value={options.budget || ""}
                        onChange={(e) => {
                          this.props.onChange({ budget: e.target.value });
                        }}
                      />
                    </div>
                    <div className="filter-actions mx-0 w-100 row mb-3">
                      <Link
                        to="/"
                        className="f-14 link-unhover mr-4"
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.onResetFilter();
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
                    </div>
                  </div>
                )}
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
