import React from "react";
import Button from "../../../Elements/Button";
import Input from "../../../Elements/Input";
import Select from "../../../Elements/Select";
import CheckBoxSwitcher from "../../../Elements/CheckBoxSwitcher";
import CheckBox from "../../../Elements/CheckBox";
import { CSSTransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";
//Configs
import {
  extraParams,
  contractParams,
  paymentParams,
} from "../../../config/baseInfo/carParams";
import carTypesList from "../../../config/baseInfo/carTypesList";
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
  };
  getArticlesInfo() {
    let errorArr = {};
    let isError = false;
    if (!this.state.car.typesCar || !this.state.car.typesCar.length) {
      toast.error("Выберите тип машины", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (!this.state.car.name) {
      toast.error("Выберите марку и модель машины", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (!this.state.car.photo) {
      toast.error("Выберите Фото машины", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (isError) {
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
    car = {
      additionally: [],
      contractParam: [],
      info: [],
      paymentInfo: [],
      ...car,
    };
    newState = {
      ...newState,
      isExtra: !!car.additionally.length,
      isContract: !!car.contractParam && car.contractParam.length,
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
        car = { ...car, typesCar: [val], info: [] };
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
  onChangeCarData = (carId, prop, val) => {
    let carDataX = this.state.car.info;
    if (carDataX.find((item) => item.carId === carId)) {
      carDataX = carDataX.map((item) => {
        if (item.carId === carId) {
          item[prop] = val;
          return item;
        } else return item;
      });
    } else {
      carDataX.push({ carId: carId });
      carDataX[carDataX.length - 1][prop] = val;
    }
    this.setState({ car: { ...this.state.car, info: carDataX } });
  };
  render() {
    let currentCarType =
      this.state.car.typesCar && !!this.state.car.typesCar.length
        ? carTypesList.find((item) => this.state.car.typesCar[0] === item.id)
        : false;
    let currentInfo = {};
    if (this.state.car.info)
      currentInfo =
        this.state.car.info.find((item) => item.carId === currentCarType.id) ||
        {};
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
                    this.onChange(val.value, "carType");
                  }}
                />
              </div>
              <div className="carName mt-3">
                <Input
                  type="text"
                  value={this.state.car.name || ""}
                  placeholder="Марка, модель"
                  onChange={(val) => {
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
                  !this.state.car.photo ? "unload" : ""
                } `}
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
                    alt="carPhoto"
                  />
                )}
                {!this.state.car.photo && <div className="carPhoto" />}
              </div>
            </div>
          </div>
          {currentCarType && (
            <div className="carMoreInfo carInfo row">
              {currentCarType.id !== 1 && (
                <div className="carType">
                  <div className="f-14">Грузоподъемность в тоннах</div>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Грузоподьемность"
                    value={currentInfo.capacity || ""}
                    onChange={(e) => {
                      this.onChangeCarData(
                        currentCarType.id,
                        "capacity",
                        e.target.value
                      );
                    }}
                  />
                </div>
              )}
              {currentCarType.id === 12 && (
                <div className="moreInfoCheckBox">
                  <div>Тентовый</div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <CheckBox
                      id="awning1"
                      name="awning"
                      value={currentInfo.awning === "Жесткий борт" || ""}
                      onChange={() => {
                        this.onChangeCarData(
                          currentCarType.id,
                          "awning",
                          "Жесткий борт"
                        );
                      }}
                      text={"Жесткий борт"}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <CheckBox
                      id="awning2"
                      name="awning"
                      value={
                        currentInfo.awning === "Съемная верхняя балка" || ""
                      }
                      onChange={() => {
                        this.onChangeCarData(
                          currentCarType.id,
                          "awning",
                          "Съемная верхняя балка"
                        );
                      }}
                      text={"Съемная верхняя балка"}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <CheckBox
                      id="awning3"
                      name="awning"
                      value={
                        (currentInfo &&
                          currentInfo.awning === "Съемная боковая стойка") ||
                        ""
                      }
                      onChange={() => {
                        this.onChangeCarData(
                          currentCarType.id,
                          "awning",
                          "Съемная боковая стойка"
                        );
                      }}
                      text={"Съемная боковая стойка"}
                    />
                  </div>
                </div>
              )}
              {currentCarType.id === 9 && (
                <div className="moreInfoCheckBox">
                  <div>Тип</div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <CheckBox
                      id="typeGazel1"
                      name="typeGazel"
                      value={
                        currentInfo.typeGazel === "Цельнометаллическая" || ""
                      }
                      onChange={() => {
                        this.onChangeCarData(
                          currentCarType.id,
                          "typeGazel",
                          "Цельнометаллическая"
                        );
                      }}
                      text={"Цельнометаллическая"}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <CheckBox
                      id="typeGazel2"
                      name="typeGazel"
                      value={currentInfo.typeGazel === "С тентом" || ""}
                      onChange={() => {
                        this.onChangeCarData(
                          currentCarType.id,
                          "typeGazel",
                          "С тентом"
                        );
                      }}
                      text={"С тентом"}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
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
                            value={this.state.car.contractParam.find(
                              (itemX) => itemX.id === item.id
                            )}
                            onChange={() => {
                              this.onChangeParams("contractParam", item.id);
                            }}
                            text={item.name}
                          />
                          {item.additionFields &&
                            this.state.car.contractParam.find(
                              (itemX) => itemX.id === item.id
                            ) &&
                            item.additionFields.map((itemField, index) => {
                              return (
                                <itemField.field
                                  key={index}
                                  {...itemField.props}
                                  value={
                                    this.getIfExit(
                                      this.state.car.contractParam,
                                      item.id,
                                      itemField.props.name
                                    ).value
                                  }
                                  onChange={(val) => {
                                    this.onChangeParamsFiels(
                                      "contractParam",
                                      item.id,
                                      itemField.props.name,
                                      val
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
export default OfferCreate1;
