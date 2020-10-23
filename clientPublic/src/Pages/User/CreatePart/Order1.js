// App
import React from "react";
// Elements
import Button from "../../../Elements/Button";
import Select from "../../../Elements/Select";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//Configs
import cargoList from "../../../config/baseInfo/cargoTypesList";
import StandartParams from "./StandartParams";
import attachDelete from "../../../img/attachDelete.svg";
class OrderCreate1 extends React.Component {
  state = {
    isPro: false,
    cargoTypes: [],
    cargoData: [],
    cargoStandartData: {},
    comment: "",
    cargoPhoto: [],
  };
  componentDidMount() {
    let currentCargoType =
      this.props.cargoTypes && this.props.cargoTypes.length
        ? cargoList.find((item) => item.id === this.props.cargoTypes[0])
        : false;
    //Инициализация
    let newState = {};
    if (this.props.cargoTypes)
      newState = {
        cargoTypes: this.props.cargoTypes,
      };
    if (currentCargoType.isPro)
      newState = {
        ...newState,
        isPro: true,
      };
    if (this.props.cargoData)
      newState = {
        ...newState,
        cargoData: this.props.cargoData,
      };
    if (this.props.comment)
      newState = {
        ...newState,
        comment: this.props.comment,
      };
    if (this.props.cargoPhoto)
      newState = {
        ...newState,
        cargoPhoto: this.props.cargoPhoto,
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
      toast.error("Выберите тип Груза", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (isError) {
      return false;
    } else {
      return {
        cargoTypes: this.state.cargoTypes,
        cargoData: this.state.cargoData,
        cargoStandartData: this.state.cargoStandartData,
        cargoPhoto: this.state.cargoPhoto,
        comment: this.state.comment,
      };
    }
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
    this.props.onChange({ cargoData: cargoDataX });
  };
  //Стандартные данные который участвуют в поиске
  onChangeCargoStandartData = (prop, val) => {
    let cargoStandartDataX = this.state.cargoStandartData;
    cargoStandartDataX[prop] = val;
    this.setState({ cargoStandartData: cargoStandartDataX });
  };
  onChangeTypesByOne = (id) => {
    this.setState({
      cargoTypes: [id],
      cargoData: [],
      cargoStandartData: {},
    });
    this.props.onChange({ cargoTypes: [id], cargoData: [] });
  };
  render() {
    let currentCargoType = !!this.state.cargoTypes.length
      ? cargoList.find((item) => item.id === this.state.cargoTypes[0])
      : false;
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
                {cargoList.map((item, index) => {
                  if (!item.isPro) {
                    //Проверка на отмеченность
                    let isSelect = currentCargoType.id === item.id;
                    return (
                      <div key={index} className="col box-grooz-wrapper">
                        <div
                          className={`box-grooz ${isSelect ? "active" : ""}`}
                          onClick={() => {
                            this.onChangeTypesByOne(item.id);
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
                className="selectTypeCargo"
                value={
                  currentCargoType
                    ? {
                        value: currentCargoType.id,
                        label: currentCargoType.name,
                      }
                    : false
                }
                onChange={(val) => {
                  this.onChangeTypesByOne(val.value);
                }}
              />
            )}
          </div>
          <div className="row typeGrooz">
            {[currentCargoType].map((item, index) => {
              return (
                <div key={index} className="rowParams">
                  {(item.fields || item.isStandart) && (
                    <h4
                      className="f-16 col-12 mb-1"
                      style={{
                        fontWeight: "normal",
                      }}
                    >
                      <div className="typeName">{item.name}</div>Параметры
                      одного места и количество мест
                    </h4>
                  )}
                  <div className="moreParams">
                    {item.fields &&
                      item.fields(
                        this.onChangeCargoData,
                        this.state.cargoData.find(
                          (itemX) => itemX.typeID === item.id
                        ) || []
                      )}
                  </div>
                  {(item.isStandart ||
                    (this.state.cargoData.find((itemX) => itemX.typeID === 4) &&
                      this.state.cargoData.find((itemX) => itemX.typeID === 4)[
                        "type"
                      ] === "Обычные") ||
                    (this.state.cargoData.find(
                      (itemX) => itemX.typeID === 13
                    ) &&
                      this.state.cargoData.find((itemX) => itemX.typeID === 13)[
                        "type"
                      ] === "Обычные") ||
                    (this.state.cargoData.find((itemX) => itemX.typeID === 3) &&
                      this.state.cargoData.find((itemX) => itemX.typeID === 3)[
                        "type"
                      ] === "Обычные")) && (
                    <StandartParams
                      cargoStandartData={this.state.cargoStandartData}
                      onChangeCargoStandartData={this.onChangeCargoStandartData}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 mt-4">
              <h4
                className="f-16  mb-1"
                style={{
                  fontWeight: "normal",
                }}
              >
                Добавьте фото груза
              </h4>
              <Button
                type="fill"
                className="f-17"
                paddingHorizontal="30px"
                paddingVertical="7px"
                onClick={() => {
                  document.getElementById("cargoPhoto").click();
                }}
              >
                Загрузить
              </Button>
              <input
                id="cargoPhoto"
                onChange={(e) => {
                  let files = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    if (e.target.files[i].size / 1000 > 10000) {
                      toast.error("Изображение больше 10 мб!", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      continue;
                    }
                    if (this.state.cargoPhoto.length + files.length < 9)
                      files.push({
                        file: e.target.files[i],
                        path: URL.createObjectURL(e.target.files[i]),
                      });
                    else {
                      toast.error("Максимум 9 фото!", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      break;
                    }
                  }
                  if (!!files.length)
                    this.setState({
                      cargoPhoto: [...this.state.cargoPhoto, ...files],
                    });
                }}
                type="file"
                accept="image/jpeg,image/png"
                hidden
                multiple
              />
              <div className="cargoPhotos">
                {!!this.state.cargoPhoto.length &&
                  this.state.cargoPhoto.map((item, index) => {
                    return (
                      <div key={index}>
                        <img
                          className="attachDelete"
                          onClick={() => {
                            this.setState({
                              cargoPhoto: this.state.cargoPhoto.filter(
                                (item, indexR) => {
                                  return indexR != index;
                                }
                              ),
                            });
                          }}
                          src={attachDelete}
                          alt="attachDelete"
                        />
                        <img src={item.path} alt="" />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-4">
              <h4
                className="f-16  mb-1"
                style={{
                  fontWeight: "normal",
                }}
              >
                Комментарий
              </h4>
              <textarea
                name=""
                className="w-100"
                style={{
                  height: "102px",
                }}
                value={this.state.comment}
                onChange={(e) => {
                  this.setState({ comment: e.target.value });
                }}
              >
                {this.state.comment}
              </textarea>
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
export default OrderCreate1;
