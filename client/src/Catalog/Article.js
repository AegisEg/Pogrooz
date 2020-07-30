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
  contractParams,
  paymentParams,
} from "../config/baseInfo/carParams";
import { Map } from "react-yandex-maps";
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
    if (this.props.article.autor.id == this.props.user.id)
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
                    {this.props.article.car.typesCar.map(
                      (item, index, items) => {
                        let type = carTypesList.find(
                          (itemX) => item === itemX.id
                        );
                        return (
                          type.name + (items.length - 1 === index ? "." : ", ")
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
                    {this.state.showMore ||
                      (this.props.onlyOpen && (
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
                      ))}
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
                    {this.state.showMore ||
                      (this.props.onlyOpen && (
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
                      ))}
                  </CSSTransitionGroup>
                </div>
                <div className="Grooz-col">
                  <span>
                    {this.props.article.cargoTypes.map((item, index) => {
                      return (
                        <span key={index} className="d-block">
                          {CargoTypeList.find((itemX) => itemX.id == item).name}
                          {CargoTypeList.find((itemX) => itemX.id == item)
                            .isStandart &&
                            this.props.article.cargoStandartData[item] && (
                              <div className="property-cargo">
                                {
                                  this.props.article.cargoStandartData[item]
                                    .weight
                                }
                                кг/
                                {this.props.article.cargoStandartData[item]
                                  .length *
                                  this.props.article.cargoStandartData[item]
                                    .width *
                                  this.props.article.cargoStandartData[item]
                                    .height}
                                <span>
                                  м<sup>3</sup>
                                </span>
                                <div>
                                  {
                                    this.props.article.cargoStandartData[item]
                                      .count
                                  }
                                  шт
                                </div>
                              </div>
                            )}
                          {this.props.article.cargoData[item] && (
                            <div className="property-cargo">
                              {Object.entries(
                                this.props.article.cargoData[item]
                              ).map((item) => {
                                return (
                                  <div>
                                    {item[0]}:{item[1]}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </span>
                      );
                    })}
                  </span>
                </div>
                <div className="Date-col">
                  <span>
                    {new Date(this.props.article.startDate.date).toDateR()}
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
                  </span>
                </div>
                <div className="Price-col">
                  <span>{this.props.article.budget} руб</span>
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
                    {new Date(this.props.article.startDate.date).toDateR()}
                  </span>
                </div>
                <div className="col d-none d-sm-block">
                  <h3 className="title-column">Время</h3>
                  <span>
                    {new Date(
                      this.props.article.startDate.timeFrom
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    до{" "}
                    {new Date(
                      this.props.article.startDate.timeTo
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
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
                      <Link to="/user/1">
                        {this.props.article.autor.name.last}{" "}
                        {this.props.article.autor.name.first}{" "}
                        {this.props.article.autor.name.middle}
                      </Link>
                    </div>
                    <div className="mt-2">
                      {/* this.props.article.autor.passport  */}
                      {true && (
                        <span className="property-user d-block">
                          <img src={passport} alt="passport" />
                          Пасспорт загружен
                        </span>
                      )}
                      {this.props.article.car.contractParam &&
                        !!this.props.article.car.contractParam &&
                        Object.keys(this.props.article.car.contractParam)
                          .length !== 0 &&
                        this.props.article.car.contractParam.constructor !==
                          Object && (
                          <span className="property-user">
                            <img src={dogovor} alt="dogovor" />
                            {
                              contractParams.find(
                                (item) =>
                                  item.id ===
                                  this.props.article.car.contractParam.id
                              ).label
                            }
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
                isManage={this.props.article.autor.id == this.props.user.id}
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
