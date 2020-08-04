// App
import React from "react";
// Elements
import Button from "../../../Elements/Button";
import Input from "../../../Elements/Input";
import CheckBox from "../../../Elements/CheckBox";
import AdressSelect from "../../../Elements/AdressSelect";
import { Map, Placemark } from "react-yandex-maps";
import { toast } from "react-toastify";
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
      toast.error("Введите адрес отправления", {
        position: toast.POSITION.TOP_CENTER,
      });
      isError = true;
    }
    if (
      !this.state.addressTo ||
      Number(this.state.addressTo.data.fias_level) !== 8
    ) {
      toast.error("Введите адрес доставки", {
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
export default OfferCreate2;