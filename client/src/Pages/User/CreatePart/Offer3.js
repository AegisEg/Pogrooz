// App
import React from "react";
// Elements
import Button from "../../../Elements/Button";
import Select from "../../../Elements/Select";
import { Link } from "react-router-dom";
//Configs
import { toast } from "react-toastify";
import carTypesList from "../../../config/baseInfo/carTypesList";
import cargoTypesList from "../../../config/baseInfo/cargoTypesList";
//Configs
import StandartParams from "./StandartParams";

class OfferCreate3 extends React.Component {
  state = {
    isPro: false,
    cargoTypes: [],
    cargoData: [],
    cargoStandartData: {},
    cargoListPossible: [],
  };
  componentDidMount() {
    let currentCargoTypes = cargoTypesList.filter((item) => {
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
    this.setState(
      {
        ...newState,
      },
      this.updateTypes()
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.typesCar || this.props.typesCar) {
      let prevTypes = prevProps.typesCar || [];
      let currentTypes = this.props.typesCar || [];
      prevTypes.sort((a, b) => b - a);
      currentTypes.sort((a, b) => b - a);
      if (JSON.stringify(prevTypes) !== JSON.stringify(currentTypes)) {
        //Получение позможных относителдьно машины грузов
        this.updateTypes();
      }
    }
  }
  updateTypes() {
    let cargoListPossible = [];

    cargoListPossible = this.props.typesCar.map((item) => {
      return carTypesList.find((itemX) => itemX.id == item).cargoTypes;
    });

    cargoListPossible = cargoListPossible
      .flat()
      .filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    cargoListPossible = cargoListPossible.map((item) => {
      return cargoTypesList.find((itemX) => itemX.id === item);
    });

    //Получение позможных относителдьно машины грузов
    let newCurentCargoType = this.state.cargoTypes.filter((item) => {
      return cargoListPossible.find((itemX) => itemX.id === item);
    });
    let isPro = false;
    if (
      newCurentCargoType.find((item) => item.isPro) ||
      !cargoListPossible.find((item) => !item.isPro)
    )
      isPro = true;
    this.setState({
      cargoListPossible: cargoListPossible,
      cargoTypes: newCurentCargoType,
      cargoData: [],
      isPro: isPro,
    });
  }
  getArticlesInfo() {
    let errorArr = {};
    let isError = false;
    if (!this.state.cargoTypes.length) {
      toast.error("Выберите тип груза", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (isError) {
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
    this.setState({ cargoData: cargoDataX });
  };
  //Стандартные данные который участвуют в поиске
  onChangeCargoStandartData = (prop, val) => {
    let cargoStandartDataX = this.state.cargoStandartData;
    cargoStandartDataX[prop] = val;
    this.setState({ cargoStandartData: cargoStandartDataX });
  };
  onChangeTypesByOne = (item) => {
    if (this.state.cargoTypes.find((itemX) => itemX === item.id)) {
      this.setState({
        cargoTypes: this.state.cargoTypes.filter((itemX) => itemX !== item.id),
        //Удаление старых параметров
        cargoData: this.state.cargoData.filter(
          (itemX, index) => itemX.typeID !== item.id
        ),
      });
    } else {
      this.setState({
        cargoTypes: [...this.state.cargoTypes, item.id],
      });
    }
  };
  onChangeTypesByMore = (val) => {
    if (val)
      val = val.map((item) => {
        return item.value;
      });
    else val = [];
    let cargoData = false;
    if (val.length < this.state.cargoTypes) {
      cargoData = this.state.cargoData.filter((item, index) =>
        val.find((itemX) => itemX === item.typeID)
      );
    }
    this.setState({
      cargoTypes: [...val],
      cargoData: cargoData || this.state.cargoData,
    });
  };
  render() {
    let currentCargoTypes = cargoTypesList.filter((item) => {
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
              <span>Тип груза</span>

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
                {this.state.cargoListPossible.map((item, index) => {
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
                            this.onChangeTypesByOne(item);
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
                options={this.state.cargoListPossible.map((item) => {
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
                  this.onChangeTypesByMore(val);
                }}
              />
            )}
          </div>
          <div className="row typeGrooz">
            {(currentCargoTypes.find((item) => item.isStandart) ||
              (this.state.cargoData.find((itemX) => itemX.typeID === 4) &&
                this.state.cargoData.find((itemX) => itemX.typeID === 4)[
                  "type"
                ] === "Обычные") ||
              (this.state.cargoData.find((itemX) => itemX.typeID === 13) &&
                this.state.cargoData.find((itemX) => itemX.typeID === 13)[
                  "type"
                ] === "Обычные") ||
              (this.state.cargoData.find((itemX) => itemX.typeID === 3) &&
                this.state.cargoData.find((itemX) => itemX.typeID === 3)[
                  "type"
                ] === "Обычные")) && (
              <StandartParams
                cargoStandartData={this.state.cargoStandartData}
                needCube={false}
                onChangeCargoStandartData={this.onChangeCargoStandartData}
              />
            )}
            {!!currentCargoTypes.length &&
              currentCargoTypes.map((item, index) => {
                if (item.fields)
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
                        {item.fields(
                          this.onChangeCargoData,
                          this.state.cargoData.find(
                            (itemX) => itemX.typeID === item.id
                          ) || [],
                          this.props.typesCar
                        )}
                      </div>
                    </div>
                  );
                else return false;
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
export default OfferCreate3;
