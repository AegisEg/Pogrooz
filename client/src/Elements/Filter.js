// App
import React from "react";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";
import Select from "../Elements/Select";

import ImgActiveStar from "../img/active-star.png";
import closePng from "../img/close.png";
import angle from "../img/angle-up.png";
import { ReactComponent as FilterImg } from "../img/filter.svg";
import CheckBox from "./CheckBox";

class Filter extends React.Component {
  state = {
    show: false,
    searchType: this.props.type,
    volumeH: 0,
    volumeW: 0,
    volumeWh: 0,
  };
  render() {
    return (
      <div
        className={`filter ${this.state.show ? "background-gray" : ""} ${
          this.props.className
        }`}
      >
        {this.state.show && (
          <Link to="/" className="f-14 mb-2 go-to-pro mr-4 d-inline d-lg-none">
            Перейти в режим PRO
          </Link>
        )}
        <div className="row filter-line">
          <div
            className={`col-480-6 ${
              this.state.show ? `col-md-4` : `col-md-3`
            } col-lg-3 col-xl-3 col-sm-6`}
          >
            <Input type="text" placeholder="Откуда" />
          </div>

          <div
            className={`col-480-6 ${
              this.state.show ? `col-md-4` : `col-md-3`
            } col-lg-3 col-xl-3 col-sm-6`}
          >
            <Input type="text" placeholder="Куда" />
          </div>

          <div
            className={`col-480-6 ${
              this.state.show ? `col-md-4` : `col-md-3`
            } col-lg-3 col-xl-3 col-sm-6`}
          >
            <Select type="text" placeholder="Тип груза" getRef={() => {}} />
          </div>
          <div
            className={`col-480-6 col-md-3 col-lg-3 col-xl-3 col-sm-6 row mx-0 align-items-center justify-content-center ${
              this.state.show ? `d-none d-lg-flex` : ``
            }`}
          >
            <Link to="/" className="col px-0 ">
              <Button
                width={"100%"}
                type="fill"
                className="lh-20 search-button"
                paddingVertical={"10px"}
                margin={"0 15px 0 0"}
              >
                Найти
              </Button>
            </Link>
            <FilterImg
              className={`settingsSvg ml-3 ${this.state.show ? "active" : ""}`}
              onClick={() => {
                this.setState({ show: true });
              }}
            />
          </div>
          {this.state.show && (
            <>
              <div className="col-md-4 col-lg-3 col-xl-3  col-sm-6">
                <Select
                  type="text"
                  placeholder="Тип машины"
                  getRef={() => {}}
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
                  placeholder="21.12.2020"
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
                <Input type="time" placeholder="12:00" />
                <span className="filter-input-title">&nbsp;&nbsp;-</span>
                <Input type="time" placeholder="12:00" />
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
                  placeholder=""
                />
                <img
                  src={ImgActiveStar}
                  style={{ marginLeft: "7px" }}
                  alt="Рейтинг"
                />
              </div>
              <h5 className="col-md-12">Параметры 1 места и количество мест</h5>
              <div className="col-md-4 col-lg-3 col-xl-3 col-7  col-sm-6">
                <Select
                  type="text"
                  placeholder="Ед. измерения"
                  getRef={() => {}}
                />
              </div>
              <div
                className="row col-md-4 col-lg-2 col-xl-2 col-4  col-sm-2"
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                  alignItems: "center",
                }}
              >
                <Input
                  type="text"
                  style={{ width: "130px" }}
                  placeholder="Вес"
                />
              </div>
              <div
                className="row colspan-input px-3"
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                  alignItems: "center",
                }}
              >
                <Input
                  type="text"
                  placeholder="Длина"
                  className="text-center"
                  onChange={(e) => {
                    this.setState({ volumeWh: e.target.value });
                  }}
                  style={{ margin: "0 0 0 0" }}
                />
                <Input
                  type="text"
                  placeholder="Ширина"
                  className="text-center"
                  onChange={(e) => {
                    this.setState({ volumeW: e.target.value });
                  }}
                  style={{ margin: "0 0 0 0" }}
                />
                <Input
                  type="text"
                  className="text-center"
                  onChange={(e) => {
                    this.setState({ volumeH: e.target.value });
                  }}
                  placeholder="Высота"
                />
                <span className="filter-input-title">
                  &nbsp;&nbsp;=&nbsp;
                  {this.state.volumeH * this.state.volumeW * this.state.volumeW}
                  &nbsp;м<sup>3</sup>
                </span>
              </div>
              <div
                className="row col-md-4 col-lg-4 col-xl-3  col-sm-6"
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                  alignItems: "center",
                }}
              >
                <span className="filter-input-title">
                  Кол-во<br></br>мест
                </span>
                <Input
                  type="number"
                  min="0"
                  className="single-char"
                  placeholder="1"
                />
              </div>
              <h5 className="col-md-12">Дополнительно</h5>
              <div className="col-12 row mx-0 check-list">
                <div>
                  <CheckBox id="cargo" text="Услуги грузчика"></CheckBox>
                </div>

                <div>
                  <CheckBox
                    id="backup"
                    text="Страхование груза водителем"
                  ></CheckBox>
                </div>
                <div>
                  <CheckBox id="medBook" text="Мед. книжка"></CheckBox>
                </div>

                <div>
                  <CheckBox id="Podd" text="Необходимы поддоны"></CheckBox>
                </div>

                <div>
                  <CheckBox id="plomb" text="Пломбирование"></CheckBox>
                </div>

                <div>
                  <CheckBox id="run" text="Сопровождение"></CheckBox>
                </div>
              </div>
              <div
                className="row col-md-5 col-lg-4 col-xl-3 col-12 col-sm-6"
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
                  placeholder="Можественный"
                  getRef={() => {}}
                />
              </div>
              <div
                className="row col-md-6 col-lg-4 col-xl-3 col-12  col-sm-6"
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
                  placeholder="Можественный"
                  getRef={() => {}}
                />
              </div>
              <div
                className="row col-md-5 col-lg-4 col-12 budjet_div col-sm-6"
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                  alignItems: "center",
                }}
              >
                <span className="filter-input-title">
                  Желаемый<br></br>бюджет, руб
                </span>
                <Input type="number" placeholder="0" max="20000" />
              </div>
            </>
          )}
          <div className="filter-actions w-100 row justify-content-end mb-3">
            {this.state.show ? (
              <>
                <Link
                  to="/"
                  className="col px-0 d-block d-lg-none mobile filter-button"
                >
                  <Button
                    width={"100%"}
                    type="fill"
                    paddingVertical={"8px"}
                    margin={"0 15px 0 0"}
                  >
                    Найти
                  </Button>
                </Link>
                <Link to="/" className="f-14 go-to-pro mr-4 d-none d-lg-inline">
                  Перейти в режим PRO
                </Link>
                <Link
                  to={false}
                  onClick={() => {
                    this.setState({ show: !this.state.show });
                  }}
                  className="filter-open"
                >
                  Скрыть параметры поиска
                  <img src={angle} className="ml-2" alt="angle" />
                </Link>
                <Link
                  to={false}
                  onClick={() => {
                    this.setState({ show: !this.state.show });
                  }}
                  className="filter-close mr-3 f-14"
                >
                  <img src={closePng} alt="closePng" />
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
