import React from "react";
import Button from "../../../Elements/Button";
import LoadingFixed from "../../../Elements/LoadingFixed";
import Loading from "../../../Elements/Loading";
import Input from "../../../Elements/Input";
import Select from "../../../Elements/Select";
import CheckBox from "../../../Elements/CheckBox";
import { withRouter } from "react-router-dom";
import CheckBoxSwitcher from "../../../Elements/CheckBoxSwitcher";
import CarSelect from "../../../Elements/CarSelect";
import { setForceTitle } from "../../../functions/functions";
import { CSSTransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";
import { connect } from "react-redux";
//Configs
import {
  extraParams,
  contractParams,
  paymentParams,
} from "../../../config/baseInfo/carParams";
import carTypesList from "../../../config/baseInfo/carTypesList";
import api from "../../../config/api";
import NoMatch from "../../NoMatch";
//Configs
class OfferCreate1 extends React.Component {
  state = {
    isExtra: false,
    isContract: false,
    isPayment: false,
    //Step1
    notFound: false,
    isEditing: false,
    car: {},
    isFetching: true,
    isFetchingAction: false,
  };
  editTemplate = () => {
    let car = this.getArticlesInfo();
    if (car) {
      let formData = new FormData();
      formData.append("car", JSON.stringify(car));
      formData.append("templateId", this.editingId);
      if (car.photo.file) formData.append("carPhoto", car.photo.file);
      this.setState({ isFetchingAction: true }, () => {
        fetch(`${api.urlApi}/api/car/updateCarTemplate`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${this.props.user.apiToken}`,
          },
          body: formData,
        })
          .then((data) => data.json())
          .then((data) => {
            if (data.error)
              data.errors.map((item) => {
                toast.error(item.msg, { position: toast.POSITION.TOP_CENTER });
              });
            else {
              this.props.history.push("/mytemplate-auto");
            }
          });
      });
    }
  };
  saveTemplate = () => {
    let car = this.getArticlesInfo();
    if (car) {
      let formData = new FormData();
      formData.append("car", JSON.stringify(car));
      formData.append("carPhoto", car.photo.file);
      fetch(`${api.urlApi}/api/car/createCarTemplate`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: formData,
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg, { position: toast.POSITION.TOP_CENTER });
            });
          else {
            this.props.history.push("/mytemplate-auto");
          }
        });
    }
  };
  getArticlesInfo = () => {
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
    if (
      this.state.car.contractInfo.find((item) => {
        return (item.id === 2 || item.id === 3) && !item.org;
      })
    ) {
      toast.error("Выберете организацию", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (isError) {
      return false;
    } else return this.state.car;
  };

  componentDidMount() {
    if (this.props.match.params.id)
      fetch(`${api.urlApi}/api/car/getCarTemplate`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          templateId: this.props.match.params.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            if (data.Template) {
              this.editingId = data.Template._id;
              this.defaultInitializate(data.Template.car, () => {
                this.setState(
                  {
                    isFetching: false,
                    isEditing: true,
                  },
                  () => {
                    setForceTitle(
                      "Редактирование шаблона №" + data.Template.car.name
                    );
                  }
                );
              });
            }
          } else this.setState({ notFound: true, isFetching: false });
        });
    else {
      this.defaultInitializate({}, () => {
        this.setState({
          isFetching: false,
        });
      });
    }
  }
  defaultInitializate(car, callback) {
    let newState = {};
    car = {
      additionally: [],
      contractInfo: [],
      info: [],
      property: "",
      paymentInfo: [],
      ...car,
    };
    newState = {
      ...newState,
      isExtra: !!car.additionally.length,
      isContract: !!car.contractInfo && car.contractInfo.length,
      isPayment: !!car.paymentInfo.length,
    };
    this.setState(
      {
        car: car,
        ...newState,
      },
      callback
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
        car = { ...car, typesCar: [val], info: [] };
        break;
      case "carProperty":
        car = { ...car, property: val };
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
      <div className="create-page create-order-page">
        <LoadingFixed isLoading={this.state.isFetchingAction} />
        <Loading isLoading={this.state.isFetching} />
        {!this.state.isFetching && !this.state.notFound && (
          <div className="container-fluid">
            <h2 className="title">{this.props.title}</h2>
            <div className={`step-create ${this.props.className}`}>
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
                    <CarSelect
                      value={this.state.car.name}
                      apiToken={this.props.user.apiToken}
                      onChange={(val) => {
                        this.onChange(val.value, "carName");
                      }}
                    />
                  </div>
                  {currentCarType && (
                    <div className="carMoreInfo carInfo row w-100">
                      {currentCarType.id !== 1 && (
                        <div className="carType">
                          <div className="f-14 mb-2">
                            Грузоподъемность в тоннах
                          </div>
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
                          <div className="f-14 mb-3">Тентовый</div>
                          <div
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <CheckBox
                              id="awning1"
                              name="awning"
                              value={
                                (currentInfo &&
                                  currentInfo.awning === "Жесткий борт") ||
                                ""
                              }
                              onChange={() => {
                                if (
                                  currentInfo &&
                                  currentInfo.awning === "Жесткий борт"
                                )
                                  this.onChangeCarData(
                                    currentCarType.id,
                                    "awning",
                                    false
                                  );
                                else
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
                                (currentInfo &&
                                  currentInfo.awning ===
                                    "Съемная верхняя балка") ||
                                ""
                              }
                              onChange={() => {
                                if (
                                  currentInfo &&
                                  currentInfo.awning === "Съемная верхняя балка"
                                )
                                  this.onChangeCarData(
                                    currentCarType.id,
                                    "awning",
                                    false
                                  );
                                else
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
                                  currentInfo.awning ===
                                    "Съемная боковая стойка") ||
                                ""
                              }
                              onChange={() => {
                                if (
                                  currentInfo &&
                                  currentInfo.awning ===
                                    "Съемная боковая стойка"
                                )
                                  this.onChangeCarData(
                                    currentCarType.id,
                                    "awning",
                                    false
                                  );
                                else
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
                          <div className="f-14 mb-3">Тип</div>
                          <div
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <CheckBox
                              id="typeGazel1"
                              name="typeGazel"
                              value={
                                currentInfo.typeGazel ===
                                  "Цельнометаллическая" || ""
                              }
                              onChange={() => {
                                if (
                                  currentInfo.typeGazel ===
                                  "Цельнометаллическая"
                                )
                                  this.onChangeCarData(
                                    currentCarType.id,
                                    "typeGazel",
                                    false
                                  );
                                else
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
                                if (currentInfo.typeGazel === "С тентом")
                                  this.onChangeCarData(
                                    currentCarType.id,
                                    "typeGazel",
                                    false
                                  );
                                else
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
                      <div className="moreInfoCheckBox">
                        <div className="f-14 mb-3">Свойство:</div>
                        <div
                          style={{
                            display: "inline-block",
                          }}
                        >
                          <CheckBox
                            id="property1"
                            name="property"
                            value={
                              (this.state.car &&
                                this.state.car.property === "Манипулятор") ||
                              ""
                            }
                            onChange={() => {
                              if (
                                this.state.car &&
                                this.state.car.property === "Манипулятор"
                              )
                                this.onChange(false, "carProperty");
                              else this.onChange("Манипулятор", "carProperty");
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
                            value={
                              (this.state.car &&
                                this.state.car.property === "Рефрижератор") ||
                              ""
                            }
                            onChange={() => {
                              if (
                                this.state.car &&
                                this.state.car.property === "Рефрижератор"
                              )
                                this.onChange(false, "carProperty");
                              else this.onChange("Рефрижератор", "carProperty");
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
                            value={
                              (this.state.car &&
                                this.state.car.property === "Изотерм") ||
                              ""
                            }
                            onChange={() => {
                              if (
                                this.state.car &&
                                this.state.car.property === "Изотерм"
                              )
                                this.onChange(false, "carProperty");
                              else this.onChange("Изотерм", "carProperty");
                            }}
                            text={"Изотерм"}
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
                      if (file.size / 1000 > 10000)
                        toast.error("Изображение больше 10 мб!", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      else
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
                          this.state.car.photo
                            ? this.state.car.photo.path
                            : false
                        }
                        className="carPhoto"
                        alt="carPhoto"
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
                      <div className="checkboxGroup contract">
                        {contractParams.map((item, index) => {
                          return (
                            <div key={index} className="checkboxParam">
                              <CheckBox
                                id={`contractParams${item.id}`}
                                name={`contractParams`}
                                value={this.state.car.contractInfo.find(
                                  (itemX) => itemX.id === item.id
                                )}
                                onChange={() => {
                                  this.onChangeParams("contractInfo", item.id);
                                }}
                                text={item.name}
                              />
                              {item.additionFields &&
                                this.state.car.contractInfo.find(
                                  (itemX) => itemX.id === item.id
                                ) &&
                                item.additionFields.map((itemField, index) => {
                                  return (
                                    <itemField.field
                                      key={index}
                                      {...itemField.props}
                                      value={
                                        this.getIfExit(
                                          this.state.car.contractInfo,
                                          item.id,
                                          itemField.props.name
                                        ).value
                                      }
                                      onChange={(val) => {
                                        this.onChangeParamsFiels(
                                          "contractInfo",
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

              <div className="row slide-step justify-content-end">
                <Button
                  type="fill"
                  className=" input-action"
                  paddingHorizontal="40px"
                  onClick={
                    this.state.isEditing ? this.editTemplate : this.saveTemplate
                  }
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        )}
        {!this.state.isFething && this.state.notFound && <NoMatch />}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(OfferCreate1));
