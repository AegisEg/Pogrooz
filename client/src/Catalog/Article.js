// App
import React from "react";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import ReviewsForm from "../Elements/ReviewsForm.js";
import CheckBox from "../Elements/CheckBox.js";
import Fancybox from "../Elements/Fancybox.js";
import { withRouter } from "react-router-dom";
import RequestModal from "../Modal/RequestModal.js";
//IMGS
import ImgActiveStar from "../img/active-star.png";
import ArrowDown from "../img/arrowDownperple.svg";
import payIco from "../img/pay-ico.svg";
import dogovor from "../img/dogovor.png";
import passport from "../img/passport.png";
import yellowAngle from "../img/yellowAngle.png";
import profileOk from "../img/profile-ok.png";
import geolocation from "../img/geolocation.png";
import otmena from "../img/otmena.png";
import reviews from "../img/reviews.png";
import basket from "../img/basket.png";

// Router
import { Link } from "react-router-dom";

// Elements
import Button from "../Elements/Button";
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
    if (this.props.article.user.id == this.props.user.id)
      return (
        <>
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
                <div className="f-12">Предложение укомплектовано</div>
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
        </>
      );
  };
  renderInput = () => {
    if (this.props.article.user.id == this.props.user.id)
      return (
        <>
          {/* Если Черновик или опубликовано */}
          {(this.props.article.status === 1 ||
            this.props.article.status === 2) && (
            <>
              <Button type="empty" className="input-action mx-3">
                Удалить
              </Button>
            </>
          )}
          {/* Если статус черновик */}
          {this.props.article.status === 1 && (
            <>
              <Button type="fill" className="input-action mx-3">
                Опубликовать
              </Button>
            </>
          )}
          {/* Если статус опубликовано */}
          {this.props.article.status === 2 && (
            <>
              <Button type="empty" className="input-action mx-3">
                Отменить
              </Button>
            </>
          )}
          {/* Если статус Выбран исполнитель и это заказ */}
          {this.props.article.type === 0 && this.props.article.status === 3 && (
            <>
              <Button type="empty" className="input-action mx-3">
                Отказаться от исполнителя
              </Button>
              <Button type="empty" className="input-action mx-3">
                Запросить отмену заказа
              </Button>
            </>
          )}
          {/* Если статус Выбран исполнитель и это предложение */}
          {this.props.article.type === 1 && this.props.article.status === 3 && (
            <>
              <Button type="empty" className="input-action mx-3">
                Отказаться от грузовладельца
              </Button>
              <Button type="empty" className="input-action mx-3">
                Запросить отмену
              </Button>
              <span className="pop-wrapper position-relative">
                <Button
                  type="empty"
                  className="border-yellow input-action mx-3"
                >
                  В пути
                </Button>
                <div className="pop-block on-my-way padding notAngle">
                  <div className="padding pop-block-item-simple noborder f-14 nohref">
                    Статус заказа сменится на “В&nbsp;пути”.
                    <br /> Клиент сможет отслеживать местоположение груза.
                  </div>
                </div>
              </span>
            </>
          )}

          {this.props.article.status === 4 && (
            <>
              <Button type="empty" className="input-action mx-3">
                Завершить
              </Button>
            </>
          )}
          {this.props.article.type === 0 && this.props.article.status === 4 && (
            <>
              <Button type="empty" className="input-action mx-3 border-yellow">
                Отследить
              </Button>
            </>
          )}
          {this.props.article.status >= 5 && (
            <span className="reviews-pop input-action pop-wrapper">
              <img src={reviews} alt="reviews" />
              <div className="ml-2">Смотреть отзыв</div>
              <div className="pop-block padding left">
                <div className="padding pop-block-item-simple pb-0 noborder nohref">
                  Текст отзыва при наведении на пункт “Смотреть отзыв”
                </div>
                <div className="padding pop-block-item-simple text-left noborder">
                  Рейтинг:
                  <div className="d-flex ">
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                  </div>
                </div>
              </div>
            </span>
          )}
          {(this.props.article.status === 5 ||
            this.props.article.status === 6) && (
            <>
              <span className="position-relative">
                <Button
                  type="empty"
                  className="input-action mx-3"
                  onClick={() => {
                    this.setState({
                      isOpenPopReviews: !this.state.isOpenPopReviews,
                    });
                  }}
                >
                  Оставить отзыв
                </Button>
                {this.state.isOpenPopReviews && (
                  <div className="pop-block notAngle padding bottom">
                    <ReviewsForm
                      reviewsItems={[
                        { id: 1, name: "Иванов Иван Иванович" },
                        { id: 2, name: "Иванов Иван Иванович" },
                      ]}
                    />
                  </div>
                )}
              </span>
              <Button type="empty" className="input-action mx-3">
                Копировать
              </Button>
            </>
          )}
          <Link to={`/order/${this.props.article.id}`}>
            <Button type="empty" className="input-action mx-3">
              Смотреть
            </Button>
          </Link>
          {(this.props.article.status === 3 ||
            this.props.article.status === 4 ||
            this.props.article.status === 5 ||
            this.props.article.status === 6) && (
            <>
              <Button type="fill" className="input-action mx-3">
                Написать
              </Button>
            </>
          )}
          {/* Если статус опубликовано и черновик */}
          {(this.props.article.status === 1 ||
            this.props.article.status === 2) && (
            <>
              <Button type="fill" className="input-action mx-3">
                Редактировать
              </Button>
            </>
          )}
          {this.props.article.status === 7 && (
            <>
              <Button type="empty" className="input-action mx-3">
                Восстановить
              </Button>
            </>
          )}
        </>
      );
    else
      return (
        <>
          <Button
            type="fill"
            className="get-article"
            paddingVertical={"13px"}
            paddingHorizontal={"35px"}
            fontSize={"14px"}
            onClick={() => {
              if (this.props.user.isAuth) {
                this.setState({
                  isOpenModalRequest: !this.state.isOpenModalRequest,
                });
              } else this.props.history.push("/login");
            }}
          >
            ВЗЯТЬ
          </Button>
          <RequestModal
            isOpen={this.state.isOpenModalRequest}
            onRequestClose={() => {
              this.setState({ isOpenModalRequest: false });
            }}
          />
        </>
      );
  };
  updateDimensions = () => {
    if (window.innerWidth < 768) this.setState({ onMobile: true });
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
                <div className="col-md-6 row">
                  <div className="col-2">{this.props.article.id}</div>
                  <div className="col-2">
                    <span>{this.props.article.carName}</span>
                    <CSSTransitionGroup
                      transitionName="height-animation-item"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      style={{
                        display: "contents",
                      }}
                    >
                      {this.state.showMore && (
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
                      )}
                    </CSSTransitionGroup>
                  </div>
                  <div className="col-4">
                    <span>{this.props.article.fromLocation}</span>

                    <CSSTransitionGroup
                      transitionName="height-animation-item"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      style={{
                        display: "contents",
                      }}
                    >
                      {this.state.showMore && (
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
                    </CSSTransitionGroup>
                  </div>
                  <div className="col-4">
                    <span>{this.props.article.toLocation}</span>
                    <CSSTransitionGroup
                      transitionName="height-animation-item"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                      style={{
                        display: "contents",
                      }}
                    >
                      {this.state.showMore && (
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
                    </CSSTransitionGroup>
                  </div>
                </div>
                <div className="col-6 row">
                  <div className="col-md-4">
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
                  <div className="col-md-3">
                    <span>
                      {this.props.article.date.date}
                      <br />
                      <br />
                      {this.props.article.date.time}
                    </span>
                  </div>
                  <div className="col-md-3">
                    <span>{this.props.article.price}</span>
                  </div>
                  <div className="col-md-2">
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
                    <div className="col-5 mx-0 row">
                      <img
                        src={this.props.article.user.avatar}
                        className="user-avatar"
                        alt="avatar"
                      />
                      <div className="col">
                        <div className="fio">
                          <Link
                            to="/user/1"
                            style={{
                              color: "#000",
                            }}
                          >
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
                  <div className="row px-0 row-input-controls mt-4">
                    {this.renderStatus()}
                    <div className="col-12 col-md row  row-input-controls">
                      {this.renderInput()}
                    </div>
                  </div>
                  {!this.props.onlyOpen && (
                    <Link
                      to="/"
                      className="mr-3 d-640-none f-12 href"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ showMore: !this.state.showMore });
                      }}
                    >
                      {!this.state.showMore ? (
                        <>Подробнее</>
                      ) : (
                        <>Скрыть подробности</>
                      )}
                      <img
                        className="ml-2"
                        src={ArrowDown}
                        width="10"
                        height="7"
                        alt="ArrowDown"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-12 ">
                <span>#{this.props.article.id}</span>
                <span className="ml-3">{this.props.article.carName}</span>
              </div>
              <div className="col-6 col-sm-4 ">
                <h3 className="title-column">Откуда</h3>
                <span>{this.props.article.fromLocation}</span>
              </div>
              <div className="col-6 col-sm-4 pr-0 pr-sm-2">
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

            <div className="row px-0 row-input-controls mt-4">
              {this.renderStatus()}
              <div className="col-12 col-md row row-input-controls">
                {this.renderInput()}
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

export default connect(mapStateToProps)(withRouter(Article));
