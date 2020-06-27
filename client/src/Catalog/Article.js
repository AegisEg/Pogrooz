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
import yellowAngle from "../img/yellowAngle.png";
import profileOk from "../img/profile-ok.png";
import geolocation from "../img/geolocation.png";
import otmena from "../img/otmena.png";

import basket from "../img/basket.png";

// Router
import { Link } from "react-router-dom";

import { Map } from "react-yandex-maps";

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
    if (this.props.isManage && this.props.article.user.id == this.props.user.id)
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
        {!this.state.onMobile ? (
          <>
            <div className="container-fluid">
              <div className="row position-relative">
                <div className="ID-col">{this.props.article.id}</div>
                <div className="car-col">
                  <span>{this.props.article.carName}</span>
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
                        <img
                          className="w-100  moreinfo"
                          onClick={() => {
                            this.setState({
                              dataFancybox: {
                                images: [{ path: this.props.article.carImg }],
                                index: 0,
                              },
                            });
                          }}
                          src={this.props.article.carImg}
                          alt=""
                        />
                      ))}
                  </CSSTransitionGroup>
                </div>
                <div className="FromL-col">
                  <span>{this.props.article.fromLocation}</span>

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
                  <span>{this.props.article.toLocation}</span>
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
                    <span className="d-block">
                      {this.props.article.parametrs}
                      <br />
                      {this.props.article.count}
                    </span>
                    <br />
                    {this.props.article.cargo.map((item, index) => {
                      return (
                        <span key={index} className="d-block">
                          {item}
                        </span>
                      );
                    })}
                  </span>
                </div>
                <div className="Date-col">
                  <span>
                    {this.props.article.date.date}
                    <br />
                    <br />
                    {this.props.article.date.time}
                  </span>
                </div>
                <div className="Price-col">
                  <span>{this.props.article.price}</span>
                </div>
                <div className="More-col">
                  <span>
                    Рейтинг: &nbsp;
                    <span className="d-inline-block">
                      {this.props.article.rating}
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
                    to={`/order/${this.props.article.id}`}
                  ></Link>
                )}
              </div>
              <CSSTransitionGroup
                transitionName="height-animation"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {(this.state.showMore || this.props.onlyOpen) && (
                  <div className="row moreinfo_block">
                    <div className="col-12 mb-3">
                      {this.props.article.tags.map((item, i) => {
                        return (
                          <span
                            key={i}
                            className="position-relative left-angle"
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                    <div
                      className="col mx-0 row"
                      style={{
                        maxWidth: "350px",
                      }}
                    >
                      <img
                        src={this.props.article.user.avatar}
                        className="user-avatar"
                        alt="avatar"
                      />
                      <div className="col">
                        <div className="fio">
                          <Link to="/user/1">
                            {this.props.article.user.fio}
                          </Link>
                        </div>
                        <div className="mt-2">
                          {this.props.article.user.passport && (
                            <span className="property-user d-block">
                              <img src={passport} alt="passport" />
                              Пасспорт загружен
                            </span>
                          )}
                          {this.props.article.user.dogovor && (
                            <span className="property-user">
                              <img src={dogovor} alt="dogovor" />
                              Договор с ИП, ООО
                            </span>
                          )}
                          {this.props.article.user.paynal && (
                            <span className="property-user">
                              <img src={payIco} alt="payIco" />
                              Оплата наличными, на р/c
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-7 content">
                      <div>
                        <b>Комментарий:</b> {this.props.article.comments}
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
              <div className="row mx-0">
                <div className="col-md-12 article-actions">
                  <div className="row px-0">
                    {this.renderStatus()}
                    <div className="row-input-controls">
                      <InputRow
                        article={this.props.article}
                        isManage={this.props.isManage}
                        onlyOpen={this.props.onlyOpen}
                        user={this.props.user}
                        eOpen={(e) => {
                          e.preventDefault();
                          this.setState({ showMore: !this.state.showMore });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid">
              <div className="row mobile-row-article">
                <div className="col-12 ">
                  <span>#{this.props.article.id}</span>
                  <span className="ml-3">{this.props.article.carName}</span>
                </div>
                <div className="col-12 col-sm-4 ">
                  <h3 className="title-column">Откуда</h3>
                  <span>{this.props.article.fromLocation}</span>
                </div>
                <div className="col-12 col-sm-4 pr-0 pr-sm-2">
                  <h3 className="title-column">Куда</h3>
                  <span>{this.props.article.toLocation}</span>
                </div>
                <div className="col-6 col-sm-4  pl-sm-2">
                  <h3 className="title-column">Груз</h3>
                  {this.props.article.cargo.map((item, i) => {
                    return (
                      <span key={i} className="d-block">
                        {item}
                      </span>
                    );
                  })}
                </div>
                <div className="col-6 col-sm ">
                  <h3 className="title-column">Параметры</h3>
                  <span>{this.props.article.parametrs}</span>
                </div>
                <div className="col  pl-sm-3">
                  <h3 className="title-column">Дата</h3>
                  <span>{this.props.article.date.date}</span>
                </div>
                <div className="col d-none d-sm-block">
                  <h3 className="title-column">Время</h3>
                  <span>{this.props.article.date.time}</span>
                </div>
                <div className="col">
                  <h3 className="title-column">Цена</h3>
                  <span>{this.props.article.price}</span>
                </div>
                <div className="col pr-0">
                  <h3 className="title-column">Рейтинг</h3>
                  <span>
                    <span className="d-inline-block">
                      {this.props.article.rating}
                      <img src={ImgActiveStar} alt="ImgActiveStar" />
                    </span>
                  </span>
                </div>
              </div>

              <div className="row mt-4">
                {this.renderStatus()}
                <div className="row-input-controls">
                  <InputRow
                    article={this.props.article}
                    onMobile={true}
                    isManage={this.props.isManage}
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
            </div>
          </>
        )}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Article);
