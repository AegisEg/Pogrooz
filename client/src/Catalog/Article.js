// App
import React from "react";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import CheckBox from "../Elements/CheckBox.js";
import Fancybox from "../Elements/Fancybox.js";
import InputRow from "./InputRow";

//IMGS
import ImgActiveStar from "../img/active-star.png";
import payIco from "../img/pay-ico.svg";
import dogovor from "../img/dogovor.png";
import passport from "../img/passport.png";
import yellowAngle from "../img/yellowAngle.svg";
import profileOk from "../img/profile-ok.png";
import geolocation from "../img/geolocation.png";
import otmena from "../img/otmena.svg";
import basket from "../img/basket.png";
// Router
import { Link } from "react-router-dom";
//Configs
import CargoTypeList from "../config/baseInfo/cargoTypesList";
import {
  extraParams,
  paymentParams,
  contractParams,
} from "../config/baseInfo/carParams";
import { Map, Placemark } from "react-yandex-maps";
import carTypesList from "../config/baseInfo/carTypesList.js";
import settings from "../config/settings";

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
    if (this.props.article.author.id == this.props.user.id)
      return (
        <div className="status-area">
          {this.props.article.status === 1 && (
            <>
              <div className="status-label">
                <img
                  src={yellowAngle}
                  className="mr-2"
                  style={{
                    filter: "grayscale(1)",
                  }}
                  alt=""
                />
                <div className="f-12">Черновик</div>
              </div>
            </>
          )}
          {this.props.article.status === 2 && (
            <>
              <div className="status-label">
                <img src={yellowAngle} className="mr-2" alt="" />
                <div className="f-12">Опубликован</div>
              </div>
            </>
          )}

          {this.props.article.status === 3 && this.props.article.type === 1 && (
            <div className="status-label">
              <img src={profileOk} className="mr-2" alt="" />
              <div className="f-12">Выбран исполнитель</div>
            </div>
          )}
          {this.props.article.status === 3 && this.props.article.type === 0 && (
            <>
              <div className="status-label">
                <img src={profileOk} className="mr-2" alt="" />
                <div className="f-12">Выбран грузовладелец</div>
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
              <div className="status-label">
                <img src={geolocation} className="mr-2" alt="" />
                <div className="f-12">В пути</div>
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
                <img src={otmena} alt="otmena" />
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
  };

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
    return (
      <div className={`article-block ${this.state.isHoverHref ? "hover" : ""}`}>
        <div className="container-fluid">
          {!this.state.onMobile ? (
            <>
              <div className="row position-relative">
                <div className="ID-col">
                  {this.props.article.articleId || ""}
                </div>
                <div className="car-col">
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
                                    if (name) {
                                      return (
                                        <div key={index}>
                                          {name}: {itemY[1]}
                                        </div>
                                      );
                                    }
                                  }
                                })}
                              {this.props.article.car.property && (
                                <div key={index}>
                                  Свойство: {this.props.article.car.property}
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>
                  <span>{this.props.article.car.name}</span>
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
                        <img
                          className="w-100  moreinfo"
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
                          <>{this.props.article.cargoStandartData.weight}кг/</>
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
                        {this.props.article.cargoStandartData.count && (
                          <div>
                            {this.props.article.cargoStandartData.count}
                            шт
                          </div>
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
                      2
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
                {!this.state.showMore && !this.props.singlePage && (
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
                  <span>#{this.props.article.numberID}</span>
                  <span className="ml-3">{this.props.article.car.name}</span>
                  {this.props.onlyOpen && (
                    <img
                      className="moreinfo"
                      onClick={() => {
                        this.setState({
                          dataFancybox: {
                            images: [{ path: this.props.article.car.photo }],
                            index: 0,
                          },
                        });
                      }}
                      src={this.props.article.car.photo}
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
                <div className="col-12 col-sm-4 pr-0 pr-sm-2">
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
                      3
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
                <div className="col row">
                  <div className="col-12 col-sm user-avatar-wrapper">
                    <img
                      src={settings.defaultAvatar}
                      className="user-avatar"
                      alt="avatar"
                    />
                  </div>
                  <div className="col text-left ">
                    <div className="fio">
                      <Link to={`/user/${this.props.article.author._id}`}>
                        {this.props.article.author.name.last}{" "}
                        {this.props.article.author.name.first}{" "}
                        {this.props.article.author.name.middle}
                      </Link>
                    </div>
                    <div className="mt-2">
                      {/* this.props.article.author.passport  */}
                      {true && (
                        <span className="property-user d-block">
                          <img src={passport} alt="passport" />
                          Пасспорт загружен
                        </span>
                      )}
                      {this.props.article.car.contractInfo &&
                        !!this.props.article.car.contractInfo.length && (
                          <span className="property-user">
                            <img src={dogovor} alt="dogovor" />
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
                      {this.props.article.car.contractParam &&
                        !!this.props.article.car.contractParam.length && (
                          <span className="property-user">
                            <img src={dogovor} alt="dogovor" />
                            {this.props.article.car.contractParam.map(
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
                            <img src={payIco} alt="dogovor" />
                            Оплата{" "}
                            {this.props.article.car.paymentInfo.map(
                              (item, index, items) => {
                                return (
                                  paymentParams.find(
                                    (itemX) => itemX.id === item.id
                                  ).label +
                                  (items.length - 1 === index ? "." : ",")
                                );
                              }
                            )}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm content">
                  <div>
                    <b>Комментарий:</b> {this.props.article.comment}
                    {this.props.article.cargoTypes.map((item, index) => {
                      return (
                        this.props.article.cargoData.find(
                          (itemX) => itemX.typeID == item
                        ) && (
                          <span key={index} className="d-block">
                            <b>
                              {
                                CargoTypeList.find((itemX) => itemX.id == item)
                                  .name
                              }
                            </b>

                            <div className="property-cargo">
                              {Object.entries(
                                this.props.article.cargoData.find(
                                  (itemX) => itemX.typeID == item
                                )
                              ).map((itemY, index) => {
                                if (itemY[0] !== "typeID")
                                  return (
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
                                  );
                              })}
                            </div>
                          </span>
                        )
                      );
                    })}
                    {this.props.article.type === "order" && (
                      <div className="imgs-content">
                        {this.props.article.cargoPhoto.map((item, index) => {
                          return (
                            <img
                              key={index}
                              src={item.path}
                              onClick={() => {
                                this.setState({
                                  dataFancybox: {
                                    images: this.props.article.cargoPhoto,
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
            <div className="row-input-controls">
              <InputRow
                article={this.props.article}
                onMobile={this.state.onMobile}
                notIsManage={
                  !(
                    this.props.notIsManage &&
                    this.props.article.author.id == this.props.user.id
                  )
                }
                onChangeArticle={this.props.onChangeArticle}
                articles={this.props.articles}
                onlyOpen={this.props.onlyOpen}
                user={this.props.user}
                articleOpen={this.state.showMore}
                eOpen={(e) => {
                  e.preventDefault();
                  this.setState({ showMore: !this.state.showMore });
                }}
              />
            </div>
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
  };
};

export default connect(mapStateToProps)(Article);
