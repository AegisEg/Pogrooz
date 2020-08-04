// App
import React from "react";
// Elements
import Button from "../../../Elements/Button";
import Input from "../../../Elements/Input";
import Select from "../../../Elements/Select";
import CheckBoxSwitcher from "../../../Elements/CheckBoxSwitcher";
import CheckBox from "../../../Elements/CheckBox";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CSSTransitionGroup } from "react-transition-group";
import {
  extraParams,
  contractParams,
  paymentParams,
} from "../../../config/baseInfo/carParams";
import carTypesList from "../../../config/baseInfo/carTypesList";
class OrderCreate3 extends React.Component {
  state = {
    isExtra: false,
    isContract: false,
    isPayment: false,
    //Step1
    car: {},
    isPro: false,
    budget: false,
    carListPossible: [],
  };
  componentDidUpdate(prevProps) {
    if (prevProps.cargoTypes || this.props.cargoTypes) {
      let prevTypes = prevProps.cargoTypes || [];
      let currentTypes = this.props.cargoTypes || [];
      prevTypes.sort((a, b) => b - a);
      currentTypes.sort((a, b) => b - a);

      if (
        JSON.stringify(prevTypes) !== JSON.stringify(currentTypes) ||
        JSON.stringify(prevProps.cargoData) !==
          JSON.stringify(this.props.cargoData)
      ) {
        //Получение позможных относителдьно машины грузов
        this.updateTypes();
      }
    }
    // let isProNeedOpen =
    //   this.state.car.typesCar &&
    //   !!carTypesList.filter((item) => {
    //     return (
    //       !!this.state.car.typesCar.find((itemX) => item.id === itemX) &&
    //       item.isPro
    //     );
    //   }).length;
    // if (!this.state.isPro && isProNeedOpen) this.setState({ isPro: true });
  }
  updateTypes() {
    let carListPossible = [];
    carListPossible = carTypesList.filter((item) => {
      return item.cargoTypes.find(
        (itemX) => itemX === this.props.cargoTypes[0]
      );
    });
    //Получение позможных относителдьно машины грузов
    let newCurentCarType = this.state.car.typesCar
      ? this.state.car.typesCar.filter((item) => {
          return carListPossible.find((itemX) => itemX.id === item);
        })
      : [];
    let isPro = this.state.isPro;
    if (
      newCurentCarType.find((item) => item.isPro) ||
      !carListPossible.find((item) => !item.isPro)
    )
      isPro = true;
    this.setState({
      carListPossible,
      isPro,
      car: { ...this.state.car, typesCar: newCurentCarType },
    });
  }
  getArticlesInfo() {
    let errorArr = {};
    let isError = false;
    if (!this.state.car.typesCar || !this.state.car.typesCar.length) {
      toast.error("Выберите тип машины", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (isError) {
      return false;
    } else
      return {
        car: this.state.car,
        budget: this.state.budget,
      };
  }

  componentDidMount() {
    //Инициализация
    let newState = {};
    if (this.props.budget)
      newState = {
        ...newState,
        budget: this.props.budget,
      };
    if (this.props.car) {
      let isPro =
        this.props.car.typesCar && !!this.props.car.typesCar.length
          ? !!carTypesList.find((item) => {
              return (
                item.isPro &&
                this.props.car.typesCar.find((itemX) => item.id === itemX)
              );
            })
          : false;
      newState = {
        ...newState,
        isExtra: !!this.props.car.additionally.length,
        isContract: !!this.props.car.contractParam.length,
        isPayment: !!this.props.car.paymentInfo.length,
        isPro,
      };
    }
    this.setState(
      {
        car: {
          additionally: [],
          contractParam: [],
          paymentInfo: [],
          ...this.props.car,
        },
        ...newState,
      },
      () => {
        this.updateTypes();
      }
    );
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

  render() {
    let currentCarTypes =
      this.state.car.typesCar && !!this.state.car.typesCar.length
        ? carTypesList.filter((item) => {
            return this.state.car.typesCar.find((itemX) => item.id === itemX);
          })
        : false;
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="list-type-auto-wrapper col-12 col-md-8">
              <h4
                className="f-16 mb-1 w-auto "
                style={{
                  fontWeight: "normal",
                }}
              >
                <span>Тип авто</span>

                {this.state.carListPossible.find((item) => item.isPro) && (
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
              <div className="list-type-auto">
                {!this.state.isPro && (
                  <>
                    {this.state.carListPossible.map((item, index) => {
                      if (!item.isPro)
                        return (
                          <div key={index}>
                            <CheckBox
                              id={`carType${item.id}`}
                              text={item.name}
                              value={
                                currentCarTypes &&
                                currentCarTypes.find(
                                  (itemX) => itemX.id === item.id
                                )
                              }
                              onChange={() => {
                                let car = this.state.car;
                                if (!car.typesCar) car.typesCar = [];
                                if (
                                  currentCarTypes &&
                                  currentCarTypes.find(
                                    (itemX) => itemX.id === item.id
                                  )
                                ) {
                                  car.typesCar = car.typesCar.filter(
                                    (itemX) => itemX !== item.id
                                  );
                                } else
                                  car.typesCar = [...car.typesCar, item.id];

                                this.setState({
                                  car: car,
                                });
                              }}
                            ></CheckBox>
                          </div>
                        );
                      else return false;
                    })}
                    <div>
                      <CheckBox
                        id={`carTypeall`}
                        value={currentCarTypes.length === carTypesList.length}
                        onChange={() => {
                          let car = this.state.car;
                          car.typesCar = carTypesList.map((item) => item.id);

                          this.setState({
                            car: car,
                          });
                        }}
                        text="Любой"
                      ></CheckBox>
                    </div>
                  </>
                )}
                {this.state.isPro && (
                  <Select
                    placeholder="Тип Груза"
                    options={this.state.carListPossible.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    isMulti={true}
                    className="selectTypeCar"
                    value={
                      currentCarTypes &&
                      currentCarTypes.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                        };
                      })
                    }
                    onChange={(val) => {
                      let car = this.state.car;
                      if (val)
                        val = val.map((item) => {
                          return item.value;
                        });
                      else val = [];
                      car.typesCar = val;
                      this.setState({
                        car: car,
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="align-items-center col-12 col-md-4">
              <h4
                className="f-16 "
                style={{
                  marginBottom: "20px",
                  fontWeight: "normal",
                }}
              >
                Желаемый бюджет
              </h4>
              <div className="d-flex align-items-center">
                <Input
                  style={{
                    maxWidth: "113px",
                    marginRight: "7px",
                  }}
                  type="number"
                  placeholder="0"
                  value={this.state.budget || ""}
                  onChange={(e) => {
                    this.setState({ budget: e.target.value });
                  }}
                />
                <span>руб</span>
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
                            id={`extraParams${item.id}`}
                            name={`extraParams${item.id}`}
                            value={
                              this.state.car.additionally &&
                              this.state.car.additionally.find(
                                (itemX) => itemX.id == item.id
                              )
                            }
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
                                  value={this.getIfExit(
                                    this.state.car.contractParam,
                                    item.id,
                                    itemField.name
                                  )}
                                  onChange={(e) => {
                                    this.onChangeParamsFiels(
                                      "contractParam",
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
                              this.state.car.paymentInfo &&
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
export default OrderCreate3;
