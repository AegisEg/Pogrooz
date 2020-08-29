// App
import React from "react";
// Elements
import Button from "../../../Elements/Button";
import Input from "../../../Elements/Input";
import AdressSelect from "../../../Elements/AdressSelect";
import CheckBox from "../../../Elements/CheckBox";
import { toast } from "react-toastify";
import { Map, Placemark } from "react-yandex-maps";

class OrderCreate2 extends React.Component {
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
    if (this.state.startDate && new Date(this.state.startDate) <= new Date()) {
      toast.error("Дата должна быть больше текущей", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (
      !this.state.addressFrom ||
      Number(this.state.addressFrom.data.fias_level) !== 8
    ) {
      toast.error("Введите адрес отправления до дома", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (
      !this.state.addressTo ||
      Number(this.state.addressTo.data.fias_level) !== 8
    ) {
      toast.error("Введите адрес доставки до дома", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (isError) {
      return false;
    } else
      return {
        startDate: this.state.startDate
          ? {
              timeFrom: this.state.startTimeFrom,
              timeTo: this.state.startTimeTo,
              date: this.state.startDate,
            }
          : false,
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
    let startTimeFrom = new Date(this.state.startTimeFrom);
    let startTimeTo = new Date(this.state.startTimeTo);
    switch (prop) {
      case "date":
        {
          let state = { startDate: val };
          if (this.state.startTimeFrom) {
            state.startTimeFrom = new Date(
              val.getFullYear(),
              val.getMonth(),
              val.getDate(),
              startTimeFrom.getHours(),
              startTimeFrom.getMinutes(),
              startTimeFrom.getSeconds()
            );
          }
          if (this.state.startTimeTo) {
            state.startTimeTo = new Date(
              val.getFullYear(),
              val.getMonth(),
              val.getDate(),
              startTimeTo.getHours(),
              startTimeTo.getMinutes(),
              startTimeTo.getSeconds()
            );
          }
          this.setState(state, callback);
        }
        break;
      case "From":
        let state;
        if (!val) {
          state = { startTimeFrom: false, startTimeTo: false };
        } else if (startTimeTo < val)
          state = { startTimeFrom: val, startTimeTo: false };
        else state = { startTimeFrom: val };
        this.setState(state, callback);
        break;
      case "To":
        if (startTimeFrom > val && val)
          toast.error(`Время "До" должно быть больше времени "От" `, {
            position: toast.POSITION.TOP_CENTER,
          });
        else this.setState({ startTimeTo: val }, callback);
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
                      if (val && val.data.geo_lat && val.data.geo_lon) {
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
                      if (val && val.data.geo_lat && val.data.geo_lon) {
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
              {this.state.startDate && (
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
                      if (this.state.isTime)
                        this.onChangeTimeInfo("From", false);
                      this.setState({ isTime: !this.state.isTime });
                    }}
                    text="Указать время"
                  />
                </div>
              )}
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
                      date={this.state.startDate}
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
                          date={this.state.startDate}
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
export default OrderCreate2;
