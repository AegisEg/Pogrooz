// App
import React from "react";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import CheckBox from "../Elements/CheckBox.js";
import Fancybox from "../Elements/Fancybox.js";
import Avatar from "../Elements/Avatar.js";
import InputRow from "./Partials/InputRow";

//IMGS
import ImgActiveStar from "../img/active-star.png";
import { ReactComponent as PayIco } from "../img/pay-ico.svg";
import { ReactComponent as Dogovor } from "../img/dogovor.svg";
import { ReactComponent as Passport } from "../img/passport.svg";
import { ReactComponent as YellowAngle } from "../img/yellowAngle.svg";
import { ReactComponent as ProfileOk } from "../img/profile-ok.svg";
import { ReactComponent as Geolocation } from "../img/geolocation.svg";
import { ReactComponent as GeolocationYellow } from "../img/geolocationYellow.svg";
import { ReactComponent as Otmena } from "../img/otmena.svg";
import basket from "../img/basket.png";
import logo from "../img/logo.svg";
// Router
import { Link } from "react-router-dom";
//Configs
import CargoTypeList from "../config/baseInfo/cargoTypesList";
import unitCargo from "../config/baseInfo/unitCargo";
import {
  extraParams,
  paymentParams,
  contractParams,
} from "../config/baseInfo/carParams";
import { Map, Placemark } from "react-yandex-maps";
import carTypesList from "../config/baseInfo/carTypesList.js";

class Article extends React.Component {
  state = {
    showMore: false,
    onMobile: false,
    isOpenPopReviews: false,
    dataFancybox: false,
    isOpenModalRequest: false,
    isHoverHref: false,
  };
  renderStatus = () => {
    if (
      this.props.article.author.id == this.props.user.id &&
      this.props.IsManage
    ) {
      let isDelivered =
        this.props.article.delivered &&
        this.props.article.delivered.find(
          (item) => item === this.props.user._id
        );
      return (
        <div className="status-area">
          {this.props.article.status === 1 && (
            <>
              <div className="status-label">
                <YellowAngle
                  style={{
                    filter: "grayscale(1)",
                  }}
                />
                <div className="ml-2 f-12">Черновик</div>

                {this.props.article.startDate &&
                  this.props.article.startDate.date &&
                  new Date(this.props.article.startDate.date).getTime() +
                    1000 * 60 * 60 * 24 <
                    new Date().getTime() && (
                    <div className="ml-2 f-12" style={{ color: "red" }}>
                      Просрочено
                    </div>
                  )}
              </div>
            </>
          )}
          {this.props.article.status === 2 && (
            <>
              <div className="status-label">
                <YellowAngle />
                <div className="ml-2 f-12">Опубликован</div>
              </div>
            </>
          )}
          {this.props.article.status === 3 &&
            this.props.article.type === "order" && (
              <div className="status-label">
                <ProfileOk />
                <div className="ml-2 f-12">Выбран исполнитель</div>
              </div>
            )}
          {this.props.article.status === 3 &&
            this.props.article.type === "offer" && (
              <>
                <div className="status-label">
                  <ProfileOk />
                  <div className="ml-2 f-12">Выбран грузовладелец</div>
                </div>
                <div className="status-label">
                  <CheckBox value="1" />
                  <div
                    className="f-12"
                    style={{
                      color: "#6C6C6C",
                    }}
                  >
                    Предложение укомплектовано
                  </div>
                </div>
              </>
            )}
          {this.props.article.status === 4 && (
            <>
              <div
                className={`status-label ${isDelivered ? "more-width" : ""}`}
              >
                {isDelivered && <GeolocationYellow />}
                {!isDelivered && <Geolocation />}
                <div className="f-12 ml-2">В пути</div>
                {isDelivered && <div className="f-12 ml-2">Вам доставлено</div>}
              </div>
            </>
          )}
          {this.props.article.status === 5 && (
            <>
              <div className="status-label">
                <span
                  className="left-angle left-angle-margin position-relative"
                  style={{ maxWidth: "120px" }}
                >
                  <div className="d-inline-block f-12">Выполнен</div>
                </span>
              </div>
            </>
          )}
          {this.props.article.status === 6 && (
            <>
              <div className="status-label">
                <Otmena />
                <div className="ml-2 d-inline-block f-12">Отменен</div>
              </div>
            </>
          )}
          {this.props.article.status === 7 && (
            <>
              <div className="status-label">
                <img src={basket} alt="basket" />
                <div className="ml-2 d-inline-block f-12">В корзине</div>
              </div>
            </>
          )}
        </div>
      );
    }
  };
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  updateDimensions = () => {
    if (window.innerWidth <= 992) this.setState({ onMobile: true });
    else this.setState({ onMobile: false });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    console.log(this.props.article);
    return (
      <div
        className={`article-block ${
          !this.props.notLink && this.state.isHoverHref ? "hover" : ""
        }`}
        itemScope={true}
        itemType="https://schema.org/Article"
      >
        {/* "Микроразметка" */}
        <link
          itemProp="mainEntityOfPage"
          itemScope
          href={
            window.location.origin + "/order/" + this.props.article.articleId
          }
        />
        <link
          itemProp="image"
          href={
            (!!this.props.article.car.photo &&
              this.props.article.car.photo.path) ||
            "https://pogrooz.ru" + logo
          }
        ></link>
        <meta
          itemProp="headline name"
          content={
            (this.props.article.type === "offer" ? "Предложение" : "Заказ") +
            " №" +
            this.props.article.articleId
          }
        ></meta>
        <meta
          itemProp="description"
          content={`${
            this.props.article.type === "offer"
              ? "Поиск водителя на перевозку"
              : "Поиск груза для перевозки"
          } № ${this.props.article.articleId}: От ${
            this.props.article.from.value
          }  до  ${this.props.article.to.value}`}
        ></meta>
        <meta
          itemProp="author"
          content={`${this.props.article.author.name.last} ${this.props.article.author.name.first} ${this.props.article.author.name.middle}`}
        ></meta>
        <meta
          itemProp="datePublished"
          dateTime={this.formatDate(this.props.article.createdAt)}
          content={this.formatDate(this.props.article.createdAt)}
        ></meta>
        <meta
          itemProp="dateModified"
          dateTime={this.formatDate(this.props.article.updatedAt)}
          content={this.formatDate(this.props.article.updatedAt)}
        ></meta>
        <div
          itemProp="publisher"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div
            itemScope
            className="d-none"
            itemProp="logo"
            itemType="https://schema.org/ImageObject"
          >
            <img itemProp="url" src={"https://pogrooz.ru" + logo} />
            <img itemProp="image" src={"https://pogrooz.ru" + logo} />
          </div>
          <meta itemProp="name" content="Pogrooz.ru"></meta>
          <meta itemProp="telephone" content={this.props.settings.phone}></meta>
        </div>
        {/* "Микроразметка" */}
        <div className="container-fluid">
          {!this.state.onMobile ? (
            <>
              <div className="row position-relative">
                <div className="ID-col">
                  {this.props.article.articleId || ""}
                </div>
                <div className="car-col">
                  <span>{this.props.article.car.name}</span>
                  <div className="car-description">
                    {this.props.article.car.typesCar.length ===
                      carTypesList.length && "Любая"}
                    {this.props.article.car.typesCar.length !==
                      carTypesList.length &&
                      this.props.article.car.typesCar.map(
                        (item, index, items) => {
                          let type = carTypesList.find(
                            (itemX) => item === itemX.id
                          );
                          return (
                            <div key={index}>
                              <div>
                                <b>{type.name}</b>
                              </div>
                              {this.props.article.car.property &&
                                this.props.article.car.typesCar.length === 1 &&
                                this.props.article.car.property !== "false" && (
                                  <div>{this.props.article.car.property}</div>
                                )}
                              {this.props.article.car.info &&
                                this.props.article.car.info.find(
                                  (itemX) => itemX.carId === item
                                ) &&
                                Object.entries(
                                  this.props.article.car.info.find(
                                    (itemX) => itemX.carId === item
                                  )
                                ).map((itemY, index) => {
                                  if (itemY[0] !== "carId") {
                                    let name;
                                    if (itemY[0] === "capacity")
                                      name = "Грузоподъемность";
                                    if (itemY[0] === "awning")
                                      name = "Тентовый";
                                    if (itemY[0] === "typeGazel")
                                      name = "Тип Газели";
                                    if (name && itemY[1]) {
                                      return (
                                        <div key={index}>
                                          {name}: {itemY[1]}
                                        </div>
                                      );
                                    }
                                  }
                                })}
                            </div>
                          );
                        }
                      )}
                    {this.props.article.car.property &&
                      this.props.article.car.typesCar.length > 1 &&
                      this.props.article.car.property !== "false" && (
                        <div> {this.props.article.car.property}</div>
                      )}
                  </div>

                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    style={{
                      display: "contents",
                    }}
                  >
                    {(this.state.showMore || this.props.onlyOpen) &&
                      this.props.article.car.photo && (
                        <div
                          className="w-100 car-image  moreinfo"
                          onClick={() => {
                            this.setState({
                              dataFancybox: {
                                images: [
                                  { path: this.props.article.car.photo.path },
                                ],
                                index: 0,
                              },
                            });
                          }}
                          style={{
                            backgroundImage: `url(${this.props.article.car.photo.path})`,
                          }}
                          alt=""
                        ></div>
                      )}
                  </CSSTransitionGroup>
                </div>
                <div className="FromL-col">
                  <span>{this.props.article.from.value}</span>
                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    style={{
                      display: "contents",
                    }}
                  >
                    {(this.state.showMore || this.props.onlyOpen) && (
                      <div
                        className="moreinfo"
                        style={{
                          height: "100px",
                        }}
                      >
                        <Map
                          defaultState={{
                            center:
                              this.props.article.from.data.geo_lat &&
                              this.props.article.from.data.geo_lon
                                ? [
                                    this.props.article.from.data.geo_lat,
                                    this.props.article.from.data.geo_lon,
                                  ]
                                : [55.684758, 37.738521],
                            zoom: 10,
                          }}
                          style={{
                            marginTop: "21px",
                            height: "100px",
                            width: "100%",
                          }}
                        >
                          {this.props.article.from.data.geo_lat &&
                            this.props.article.from.data.geo_lon && (
                              <Placemark
                                geometry={[
                                  this.props.article.from.data.geo_lat,
                                  this.props.article.from.data.geo_lon,
                                ]}
                              />
                            )}
                        </Map>
                      </div>
                    )}
                  </CSSTransitionGroup>
                </div>
                <div className="ToLoc-col">
                  <span>{this.props.article.to.value}</span>
                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    style={{
                      display: "contents",
                    }}
                  >
                    {(this.state.showMore || this.props.onlyOpen) && (
                      <div
                        className="moreinfo"
                        style={{
                          height: "100px",
                        }}
                      >
                        <Map
                          defaultState={{
                            center:
                              this.props.article.to.data.geo_lat &&
                              this.props.article.to.data.geo_lon
                                ? [
                                    this.props.article.to.data.geo_lat,
                                    this.props.article.to.data.geo_lon,
                                  ]
                                : [55.684758, 37.738521],
                            zoom: 10,
                          }}
                          style={{
                            marginTop: "21px",
                            height: "100px",
                            width: "100%",
                          }}
                        >
                          {this.props.article.to.data.geo_lat &&
                            this.props.article.to.data.geo_lon && (
                              <Placemark
                                geometry={[
                                  this.props.article.to.data.geo_lat,
                                  this.props.article.to.data.geo_lon,
                                ]}
                              />
                            )}
                        </Map>
                      </div>
                    )}
                  </CSSTransitionGroup>
                </div>
                <div className="Grooz-col">
                  <span>
                    {this.props.article.cargoStandartData && (
                      <div className="property-cargo">
                        {this.props.article.cargoStandartData.weight && (
                          <>
                            {this.props.article.cargoStandartData.weight *
                              this.props.article.cargoStandartData.count}
                            {
                              unitCargo.find(
                                (item) =>
                                  item.value ===
                                  this.props.article.cargoStandartData.unit
                              ).shortLabel
                            }
                          </>
                        )}
                        {!!this.props.article.cargoStandartData.weight &&
                          !!this.props.article.cargoStandartData.length &&
                          !!this.props.article.cargoStandartData.width &&
                          !!this.props.article.cargoStandartData.height && (
                            <span>/</span>
                          )}
                        {this.props.article.cargoStandartData.length &&
                          this.props.article.cargoStandartData.width &&
                          this.props.article.cargoStandartData.height && (
                            <>
                              {this.props.article.cargoStandartData.length *
                                this.props.article.cargoStandartData.width *
                                this.props.article.cargoStandartData.count *
                                this.props.article.cargoStandartData.height}
                              <span>
                                м<sup>3</sup>
                              </span>
                            </>
                          )}
                        {this.props.article.cargoStandartData.count && (
                          <div>
                            {this.props.article.cargoStandartData.count}&nbsp;
                            мест(а)
                          </div>
                        )}

                        {(!!this.props.article.cargoStandartData.weight ||
                          (!!this.props.article.cargoStandartData.length &&
                            !!this.props.article.cargoStandartData.width &&
                            !!this.props.article.cargoStandartData.height)) && (
                          <span>(</span>
                        )}
                        {!!this.props.article.cargoStandartData.weight && (
                          <>
                            {this.props.article.cargoStandartData.weight}
                            {
                              unitCargo.find(
                                (item) =>
                                  item.value ===
                                  this.props.article.cargoStandartData.unit
                              ).shortLabel
                            }
                          </>
                        )}
                        {!!this.props.article.cargoStandartData.weight &&
                          !!this.props.article.cargoStandartData.length &&
                          !!this.props.article.cargoStandartData.width &&
                          !!this.props.article.cargoStandartData.height && (
                            <span>/</span>
                          )}
                        {!!this.props.article.cargoStandartData.length &&
                          !!this.props.article.cargoStandartData.width &&
                          !!this.props.article.cargoStandartData.height && (
                            <>
                              {this.props.article.cargoStandartData.length *
                                this.props.article.cargoStandartData.width *
                                this.props.article.cargoStandartData.height}
                              <span>
                                м<sup>3</sup>
                              </span>
                            </>
                          )}
                        {(!!this.props.article.cargoStandartData.weight ||
                          (!!this.props.article.cargoStandartData.length &&
                            !!this.props.article.cargoStandartData.width &&
                            !!this.props.article.cargoStandartData.height)) && (
                          <span>)</span>
                        )}
                      </div>
                    )}
                    {this.props.article.cargoTypes.map((item, index) => {
                      return (
                        <span key={index} className="d-block">
                          <b>
                            {
                              CargoTypeList.find((itemX) => itemX.id == item)
                                .name
                            }
                          </b>
                        </span>
                      );
                    })}
                  </span>
                </div>
                <div className="Date-col">
                  <span>
                    {this.props.article.startDate &&
                      this.props.article.startDate.date && (
                        <>
                          {new Date(
                            this.props.article.startDate.date
                          ).toDateR()}
                          {this.props.article.startDate.timeFrom && (
                            <>
                              <br />
                              <br />
                              {new Date(
                                this.props.article.startDate.timeFrom
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                            </>
                          )}
                          {this.props.article.startDate.timeTo && (
                            <>
                              до
                              <br />
                              {new Date(
                                this.props.article.startDate.timeTo
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </>
                          )}
                        </>
                      )}
                    {(!this.props.article.startDate ||
                      !this.props.article.startDate.date) && (
                      <>Дата не указана</>
                    )}
                  </span>
                </div>
                <div className="Price-col">
                  <span>
                    {!!this.props.article.budget && (
                      <>{this.props.article.budget} руб</>
                    )}
                    {!this.props.article.budget && <>Цена не указана</>}
                  </span>
                </div>
                <div className="More-col">
                  <span>
                    Рейтинг: &nbsp;
                    <span className="d-inline-block">
                      {this.props.article.author.rating || 0}
                      <img
                        src={ImgActiveStar}
                        style={{
                          position: "relative",
                          top: "1px",
                        }}
                        className="ml-1"
                        alt="ImgActiveStar"
                      />
                    </span>
                  </span>
                </div>
                {!this.state.showMore &&
                  !this.props.notLink &&
                  !this.props.singlePage && (
                    <Link
                      className="order-link"
                      onMouseEnter={() => {
                        this.setState({ isHoverHref: true });
                      }}
                      onMouseLeave={() => {
                        this.setState({ isHoverHref: false });
                      }}
                      to={`/${this.props.article.type}/${this.props.article.articleId}`}
                    ></Link>
                  )}
              </div>
            </>
          ) : (
            <>
              <div className="row mobile-row-article">
                <div className="col-12 ">
                  <span>#{this.props.article.articleId}</span>
                  <span className="ml-3">{this.props.article.car.name}</span>
                  {this.props.onlyOpen && this.props.article.car.photo && (
                    <img
                      className="moreinfo"
                      onClick={() => {
                        this.setState({
                          dataFancybox: {
                            images: [
                              { path: this.props.article.car.photo.path },
                            ],
                            index: 0,
                          },
                        });
                      }}
                      src={this.props.article.car.photo.path}
                      alt=""
                    />
                  )}
                </div>
                <div className="col-12 col-sm-4 ">
                  <h3 className="title-column">Откуда</h3>
                  <span>{this.props.article.from.value}</span>
                  {this.props.onlyOpen && (
                    <div
                      className="moreinfo"
                      style={{
                        height: "100px",
                      }}
                    >
                      <Map
                        defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                        width="100%"
                        height="100px"
                      />
                    </div>
                  )}
                </div>
                <div className="col-12 col-sm-4 pr-sm-2">
                  <h3 className="title-column">Куда</h3>
                  <span>{this.props.article.to.value}</span>
                  {this.props.onlyOpen && (
                    <div
                      className="moreinfo"
                      style={{
                        height: "100px",
                      }}
                    >
                      <Map
                        defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                        width="100%"
                        height="100px"
                      />
                    </div>
                  )}
                </div>
                <div className="col-6 col-sm-4  pl-sm-2">
                  <h3 className="title-column">Груз</h3>
                  {this.props.article.cargoTypes.map((item, index) => {
                    return (
                      <span key={index} className="d-block">
                        {CargoTypeList.find((itemX) => itemX.id == item).name}
                      </span>
                    );
                  })}
                </div>
                <div className="col-6 col-sm ">
                  <h3 className="title-column">Параметры</h3>
                  {!this.props.article.cargoStandartData && (
                    <span>Не заданы</span>
                  )}
                  {this.props.article.cargoStandartData && (
                    <>
                      {this.props.article.cargoStandartData.weight && (
                        <>
                          {this.props.article.cargoStandartData.weight *
                            this.props.article.cargoStandartData.count}
                          {
                            unitCargo.find(
                              (item) =>
                                item.value ===
                                this.props.article.cargoStandartData.unit
                            ).shortLabel
                          }
                          /
                        </>
                      )}
                      {this.props.article.cargoStandartData.length &&
                        this.props.article.cargoStandartData.width &&
                        this.props.article.cargoStandartData.height && (
                          <>
                            {this.props.article.cargoStandartData.length *
                              this.props.article.cargoStandartData.width *
                              this.props.article.cargoStandartData.count *
                              this.props.article.cargoStandartData.height}
                            <span>
                              м<sup>3</sup>
                            </span>
                          </>
                        )}
                      {this.props.article.cargoStandartData.count && (
                        <div>
                          {this.props.article.cargoStandartData.count}&nbsp;
                          мест(а)
                        </div>
                      )}
                      <span>(</span>
                      {this.props.article.cargoStandartData.weight && (
                        <>
                          {this.props.article.cargoStandartData.weight}
                          {
                            unitCargo.find(
                              (item) =>
                                item.value ===
                                this.props.article.cargoStandartData.unit
                            ).shortLabel
                          }
                          /
                        </>
                      )}
                      {this.props.article.cargoStandartData.length &&
                        this.props.article.cargoStandartData.width &&
                        this.props.article.cargoStandartData.height && (
                          <>
                            {this.props.article.cargoStandartData.length *
                              this.props.article.cargoStandartData.width *
                              this.props.article.cargoStandartData.height}
                            <span>
                              м<sup>3</sup>
                            </span>
                          </>
                        )}
                      <span>)</span>
                    </>
                  )}
                </div>
                <div className="col  pl-sm-3">
                  <h3 className="title-column">Дата</h3>
                  <span>
                    {this.props.article.startDate &&
                      this.props.article.startDate.date && (
                        <>
                          {new Date(
                            this.props.article.startDate.date
                          ).toDateR()}
                        </>
                      )}
                    {(!this.props.article.startDate ||
                      !this.props.article.startDate.date) && (
                      <>Дата не указана</>
                    )}
                  </span>
                </div>
                {this.props.article.startDate &&
                  this.props.article.startDate.timeFrom && (
                    <div className="col d-none d-sm-block">
                      <h3 className="title-column">Время</h3>
                      <span>
                        {new Date(
                          this.props.article.startDate.timeFrom
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        {this.props.article.startDate.timeTo && (
                          <>
                            до{" "}
                            {new Date(
                              this.props.article.startDate.timeTo
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </>
                        )}
                      </span>
                    </div>
                  )}
                <div className="col">
                  <h3 className="title-column">Цена</h3>
                  <span>{this.props.article.budget}</span>
                </div>
                <div className="col pr-0">
                  <h3 className="title-column">Рейтинг</h3>
                  <span>
                    <span className="d-inline-block">
                      {this.props.article.author.rating || 0}
                      <img src={ImgActiveStar} alt="ImgActiveStar" />
                    </span>
                  </span>
                </div>
              </div>
            </>
          )}
          <CSSTransitionGroup
            transitionName="height-animation"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {(this.state.showMore || this.props.onlyOpen) && (
              <div className="row moreinfo_block">
                <div className="col-12 mb-3">
                  {this.props.article.car.additionally &&
                    this.props.article.car.additionally.map((item, i) => {
                      return (
                        <span
                          key={i}
                          className="d-inline-block position-relative left-angle"
                        >
                          {
                            extraParams.find((itemX) => item.id === itemX.id)
                              .name
                          }
                        </span>
                      );
                    })}
                </div>
                <div className="col-12 col-sm row">
                  <div className="d-none d-sm-block col-12 col-sm user-avatar-wrapper">
                    <Link to={`/user/${this.props.article.author._id}`}>
                      <Avatar avatar={this.props.article.author.avatar} />
                    </Link>
                  </div>
                  <div className="col pl-0 text-left ">
                    <div className="fio">
                      <Link to={`/user/${this.props.article.author._id}`}>
                        {this.props.article.author.name.last}{" "}
                        {this.props.article.author.name.first}{" "}
                        {this.props.article.author.name.middle}
                      </Link>
                    </div>
                    <div className="mt-2">
                      {this.props.article.author.isPassportVerified && (
                        <span className="property-user d-block">
                          <Passport></Passport>
                          <span className="ml-2"> Паспорт загружен</span>
                        </span>
                      )}
                      {this.props.article.car.contractInfo &&
                        !!this.props.article.car.contractInfo.length && (
                          <span className="property-user">
                            <Dogovor />
                            &nbsp;
                            {this.props.article.car.contractInfo.map(
                              (item, index, items) => {
                                let string = contractParams.find(
                                  (itemX) => itemX.id === item.id
                                ).label;
                                if (this.props.article.type === "offer")
                                  if (item.id === 3 || item.id === 2)
                                    string += "(" + item.org.value + ")";
                                return (
                                  string +
                                  (items.length - 1 === index ? "." : ", ")
                                );
                              }
                            )}
                          </span>
                        )}

                      {this.props.article.car.paymentInfo &&
                        !!this.props.article.car.paymentInfo.length && (
                          <span className="property-user">
                            <PayIco />
                            &nbsp;Оплата&nbsp;
                            {this.props.article.car.paymentInfo.map(
                              (item, index, items) => {
                                return (
                                  paymentParams.find(
                                    (itemX) => itemX.id === item.id
                                  ).label +
                                  (items.length - 1 === index ? "." : ", ")
                                );
                              }
                            )}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm row content">
                  <div>
                    <b>Комментарий:</b> {this.props.article.comment}
                    {this.props.article.cargoStandartData &&
                      this.props.article.cargoStandartData.length &&
                      this.props.article.cargoStandartData.width &&
                      this.props.article.cargoStandartData.height && (
                        <span className="d-block">
                          <b>
                            Параметры:&nbsp;
                            {this.props.article.cargoStandartData.length}
                            &nbsp;x&nbsp;
                            {this.props.article.cargoStandartData.width}
                            &nbsp;x&nbsp;
                            {this.props.article.cargoStandartData.height}
                          </b>
                        </span>
                      )}
                    {this.props.article.cargoTypes.map((item, index) => {
                      let data = this.props.article.cargoData.find(
                        (itemX) => itemX.typeID == item
                      );
                      return (
                        data && (
                          <span key={index} className="d-block">
                            <b>
                              {
                                CargoTypeList.find((itemX) => itemX.id == item)
                                  .name
                              }
                            </b>

                            <div className="property-cargo">
                              {Object.entries(data).map((itemY, index) => {
                                if (itemY[0] !== "typeID")
                                  return (
                                    <>
                                      {item !== 4 ||
                                        (itemY[0] != "length" &&
                                          itemY[0] != "width" &&
                                          itemY[0] != "height" && (
                                            <div key={index}>
                                              <span
                                                dangerouslySetInnerHTML={{
                                                  __html: CargoTypeList.find(
                                                    (itemX) => itemX.id === item
                                                  ).fieldsLabel[itemY[0]],
                                                }}
                                              />
                                              : {itemY[1]}
                                            </div>
                                          ))}
                                    </>
                                  );
                              })}
                              {item === 4 &&
                                (!!data.length ||
                                  !!data.width ||
                                  !!data.height) && (
                                  <div>
                                    <span>Параметры</span>: :{" "}
                                    {data.length || "*"}х{data.width || "*"}х
                                    {data.height || "*"}
                                  </div>
                                )}
                            </div>
                          </span>
                        )
                      );
                    })}
                    {this.props.article.type === "order" && (
                      <div className="imgs-content">
                        {this.props.article.cargoPhoto.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{ backgroundImage: `url(${item.path})` }}
                              onClick={() => {
                                this.setState({
                                  dataFancybox: {
                                    images: this.props.article.cargoPhoto,
                                    index: index,
                                  },
                                });
                              }}
                            ></div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="imgs-content">
                    {this.props.article.images &&
                      this.props.article.images.map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={item.path}
                            onClick={() => {
                              this.setState({
                                dataFancybox: {
                                  images: this.props.article.images,
                                  index: index,
                                },
                              });
                            }}
                            alt={index}
                            style={{
                              width: "75px",
                              height: "57px",
                              objectFit: "cover",
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </CSSTransitionGroup>
          <div className="row mt-2">
            {this.renderStatus()}
            {this.props.IsManage && (
              <div className="row-input-controls">
                <InputRow
                  article={this.props.article}
                  notControl={this.props.notControl}
                  onMobile={this.state.onMobile}
                  updateArticle={this.props.updateArticle}
                  onlyOpen={this.props.onlyOpen}
                  user={this.props.user}
                  articleOpen={this.state.showMore}
                  eOpen={(e) => {
                    e.preventDefault();
                    this.setState({ showMore: !this.state.showMore });
                  }}
                />
              </div>
            )}
          </div>
          <CSSTransitionGroup
            transitionName="fancybox-animation"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.state.dataFancybox.images && (
              <Fancybox
                close={() => {
                  this.setState({
                    dataFancybox: { images: false, index: false },
                  });
                }}
                images={this.state.dataFancybox.images}
                index={this.state.dataFancybox.index}
              />
            )}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings: state.settings.settings,
  };
};

export default connect(mapStateToProps)(Article);
