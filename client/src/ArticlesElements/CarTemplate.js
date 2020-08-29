// App
import React from "react";

// Elements
import Button from "../Elements/Button";
import LoadingFixed from "../Elements/LoadingFixed";
import settings from "../config/settings";
import { Link } from "react-router-dom";
import payIco from "../img/pay-ico.svg";
import dogovor from "../img/dogovor.png";
import api from "../config/api";
import carTypesList from "../config/baseInfo/carTypesList";
import { toast } from "react-toastify";
import {
  extraParams,
  contractParams,
  paymentParams,
} from "../config/baseInfo/carParams";

class CarTemplate extends React.Component {
  state = {
    isFetching: false,
  };
  delete = () => {
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/car/deleteCarTemplate`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          templateId: this.props.template._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            data.errors.map((item) => {
              toast.error(item.msg);
            });
            this.setState({
              isFetching: false,
            });
          }
          if (!data.error) {
            this.setState(
              {
                isFetching: false,
              },
              () => {
                this.props.reload();
              }
            );
          }
        });
    });
  };
  splitArr = (arr, chunks) =>
    [...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));
  render() {
    return (
      <div className="auto-template mt-4">
        <LoadingFixed isLoading={this.state.isFetching} />
        <div className="head-template align-items-center row">
          <div
            className="px-3 title-auto"
            style={{
              minWidth: "280px",
            }}
          >
            {this.props.template.car.name}
          </div>
          <div className="row mx-0 templateAction">
            <div className="px-3">
              <Button
                type="fill"
                paddingVertical="6px"
                className="f-12 position-relative"
              >
                Редактировать
                <Link
                  to={`/edit-template-auto/${this.props.template._id}`}
                  className="sharected-link"
                ></Link>
              </Button>
            </div>
            <div className="px-3">
              <Button
                type="fill"
                paddingVertical="6px"
                className="bg-gray f-12 "
                onClick={this.delete}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
        <div className="row mt-4 template-content">
          <div className="templatePhoto">
            <img className="w-100" src={this.props.template.car.photo.path} alt="" />
          </div>
          <div className="px-3 f-14 carDescription">
            {this.props.template.car.typesCar.length === carTypesList.length &&
              "Любая"}
            {this.props.template.car.typesCar.length !== carTypesList.length &&
              this.props.template.car.typesCar.map((itemY, index, items) => {
                let type = carTypesList.find((itemX) => itemY === itemX.id);
                return (
                  <div key={index}>
                    <div>
                      <b>{type.name}</b>
                    </div>
                    {this.props.template.car.info &&
                      this.props.template.car.info.find(
                        (itemX) => itemX.carId === itemY
                      ) &&
                      Object.entries(
                        this.props.template.car.info.find(
                          (itemX) => itemX.carId === itemY
                        )
                      ).map((itemY, index) => {
                        if (itemY[0] !== "carId") {
                          let name;
                          if (itemY[0] === "capacity")
                            name = "Грузоподъемность";
                          if (itemY[0] === "awning") name = "Тентовый";
                          if (itemY[0] === "typeGazel") name = "Тип Газели";
                          if (name) {
                            return (
                              <div key={index}>
                                {name}: {itemY[1]}
                              </div>
                            );
                          }
                        }
                      })}
                    {this.props.template.car.property && (
                      <div key={index}>
                        Свойство: {this.props.template.car.property}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="row px-3">
            {this.props.template.car.additionally &&
              this.splitArr(
                this.props.template.car.additionally,
                this.props.template.car.additionally.length > 4 ? 2 : 1
              ).map((itemY, i) => {
                {
                  return (
                    <div className="additionally">
                      {itemY.map((itemZ, index) => {
                        return (
                          <span className="position-relative left-angle f-12">
                            {
                              extraParams.find((itemX) => itemZ.id === itemX.id)
                                .name
                            }
                          </span>
                        );
                      })}
                    </div>
                  );
                }
              })}
          </div>
          <div className="col contractInfoTemplate">
            {this.props.template.car.contractInfo &&
              !!this.props.template.car.contractInfo.length && (
                <span className="property-user f-12">
                  <img src={dogovor} alt="dogovor" />
                  Договор с &nbsp;
                  {this.props.template.car.contractInfo.map(
                    (item, index, items) => {
                      let string = contractParams.find(
                        (itemX) => itemX.id === item.id
                      ).label;
                      if (item.id === 3 || item.id === 2)
                        string += "(" + item.org.value + ")";
                      return string + (items.length - 1 === index ? "." : ", ");
                    }
                  )}
                </span>
              )}

            {this.props.template.car.paymentInfo &&
              !!this.props.template.car.paymentInfo.length && (
                <span className="property-user f-12">
                  <img src={payIco} alt="dogovor" />
                  Оплата{" "}
                  {this.props.template.car.paymentInfo.map(
                    (item, index, items) => {
                      return (
                        paymentParams.find((itemX) => itemX.id === item.id)
                          .label + (items.length - 1 === index ? "." : ",")
                      );
                    }
                  )}
                </span>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default CarTemplate;
