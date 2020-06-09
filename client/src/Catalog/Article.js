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
import payIco from "../img/pay-ico.png";
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
  };
  renderInput = () => {
    if (this.props.article.user.id === this.props.user.id)
      return (
        <>
          {/* Если статус черновик */}
          {this.props.article.status === 1 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="px-3 d-flex">
                <span className="d-flex align-items-center">
                  <img
                    src={yellowAngle}
                    className="mr-2"
                    style={{
                      filter: "grayscale(1)",
                    }}
                    alt=""
                  />
                  <div className="f-12">Черновик</div>
                </span>
              </div>
              <div className="col-12 col-md row mx-0  px-0  row-input-controls">
                <Button type="empty" className="input-action mx-3">
                  Удалить
                </Button>
                <Button type="fill" className="input-action mx-3">
                  Опубликовать
                </Button>
                <Button type="fill" className="input-action mx-3">
                  Редактировать
                </Button>
              </div>
            </div>
          )}
          {/* Если статус Опубликовано */}
          {this.props.article.status === 2 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="px-3">
                <span className="d-flex align-items-center">
                  <img src={yellowAngle} className="mr-2" alt="" />
                  <div className="f-12">Опубликован</div>
                </span>
              </div>
              <div className="col-12 col-md row mx-0  px-0  row-input-controls">
                <Button type="empty" className="input-action mx-3">
                  Удалить
                </Button>
                <Button type="empty" className="input-action mx-3">
                  Отменить
                </Button>
                <Button type="fill" className="input-action mx-3">
                  Редактировать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.type === 0 && this.props.article.status === 3 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="px-3 d-flex">
                <span className="d-flex align-items-center">
                  <img src={profileOk} className="mr-2" alt="" />
                  <div className="f-12">
                    Выбран
                    <br />
                    исполнитель
                  </div>
                </span>
              </div>
              <div className="col-12 col-md row mx-0  px-0  row-input-controls">
                <Button type="empty" className="input-action mx-3">
                  Отказаться от исполнителя
                </Button>
                <Button type="empty" className="input-action mx-3">
                  Запросить отмену заказа
                </Button>
                <Button type="fill" className="input-action mx-3">
                  Написать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.type === 0 && this.props.article.status === 4 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="d-flex px-3 ">
                <span className="d-flex align-items-center">
                  <img src={geolocation} className="mr-2" alt="" />
                  <div className="f-12">В пути</div>
                </span>
              </div>
              <div className="col-12 col-sm row row-input-controls mx-0 buttons">
                <Button type="empty" className="input-action mx-3">
                  Завершить
                </Button>
                <Button
                  type="empty"
                  className="input-action mx-3 border-yellow"
                >
                  Отследить
                </Button>
                <Button type="fill" className="input-action mx-3">
                  Написать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.type === 1 && this.props.article.status === 3 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="px-3 d-flex">
                <span className="d-flex align-items-center">
                  <img src={profileOk} className="mr-2" alt="" />
                  <div className="f-12">
                    Выбран
                    <br />
                    грузовладелец
                  </div>
                </span>
                <span className="d-flex ml-2 align-items-center">
                  <CheckBox value="1" />
                  <div className="f-12">
                    Предложение
                    <br />
                    укомплектовано
                  </div>
                </span>
              </div>
              <div className="col-12 col-md row mx-0 px-0 row-input-controls">
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
                  <div
                    className="pop-block padding notAngle"
                    style={{ top: "100%", left: "0", width: "240px" }}
                  >
                    <div className="padding pop-block-item-simple noborder f-14 nohref">
                      Статус заказа сменится на “В&nbsp;пути”.
                      <br /> Клиент сможет отслеживать местоположение груза.
                    </div>
                  </div>
                </span>
                <Button type="fill" className="input-action mx-3">
                  Написать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.type === 1 && this.props.article.status === 4 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="d-flex px-3 ">
                <span className="d-flex align-items-center">
                  <img src={geolocation} className="mr-2" alt="" />
                  <div className="f-12">В пути</div>
                </span>
              </div>
              <div className="col-12 col-sm row row-input-controls mx-0 buttons">
                <Button type="empty" className="input-action mx-3">
                  Завершить
                </Button>
                <Button type="fill" className="input-action mx-3">
                  Написать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.status === 5 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="d-flex px-3 ">
                <span
                  className="left-angle left-angle-margin position-relative"
                  style={{ maxWidth: "120px" }}
                >
                  <div className="d-inline-block f-12">Выполнен</div>
                </span>
              </div>
              <div className="col-12 col-sm row row-input-controls mx-0 buttons">
                <span className="d-flex align-items-center mx-3 input-action pop-wrapper position-relative">
                  <img src={reviews} alt="reviews" />
                  <div className="ml-2">Смотреть отзыв</div>
                  <div className="pop-block padding left">
                    <div className="padding pop-block-item-simple pb-0 noborder nohref">
                      Текст отзыва при наведении на пункт “Смотреть отзыв”
                    </div>
                    <div className="padding pop-block-item-simple noborder">
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
                <Button type="fill" className="input-action mx-3">
                  Написать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.status === 6 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="d-flex px-3 ">
                <span className="d-flex align-items-center">
                  <img src={otmena} alt="otmena" />
                  <div className="ml-2 d-inline-block f-12">Отменен</div>
                </span>
              </div>
              <div className="col-12 col-sm row row-input-controls mx-0 buttons">
                <span className="d-flex align-items-center mx-3 input-action pop-wrapper">
                  <img src={reviews} alt="reviews" />
                  <div className="ml-2">Смотреть отзыв</div>
                  <div className="pop-block padding left">
                    <div className="padding pop-block-item-simple pb-0 noborder nohref">
                      Текст отзыва при наведении на пункт “Смотреть отзыв”
                    </div>
                    <div className="padding pop-block-item-simple noborder">
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
                <Button type="fill" className="input-action mx-3">
                  Написать
                </Button>
              </div>
            </div>
          )}
          {this.props.article.status === 7 && (
            <div className="row px-0 row-input-controls mt-4">
              <div className="d-flex px-3 ">
                <span className="d-flex align-items-center">
                  <img src={basket} alt="basket" />
                  <div className="ml-2 d-inline-block f-12">В корзине</div>
                </span>
              </div>
              <div className="col-12 col-sm row row-input-controls mx-0 buttons">
                <span className="d-flex align-items-center mx-3 input-action pop-wrapper">
                  <img src={reviews} alt="reviews" />
                  <div className="ml-2">Смотреть отзыв</div>
                  <div className="pop-block padding left">
                    <div className="padding pop-block-item-simple pb-0 noborder nohref">
                      Текст отзыва при наведении на пункт “Смотреть отзыв”
                    </div>
                    <div className="padding pop-block-item-simple noborder">
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
                <Button type="empty" className="input-action mx-3">
                  Восстановить
                </Button>
              </div>
            </div>
          )}
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
      <div className="article-block">
        {!this.state.onMobile ? (
          <>
            <div className="row">
              <div className="col-md-6  mx-0 row">
                <div className="col-md-1">
                  <Link to={`/order/${this.props.article.id}`}>
                    {this.props.article.id}
                  </Link>
                </div>
                <div className="col-md-3">
                  <span>{this.props.article.carName}</span>
                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    style={{
                      display: "contents",
                    }}
                  >
                    {this.state.showMore && (
                      <div>
                        <img
                          className="w-100  moreinfo"
                          src={this.props.article.carImg}
                          style={{ height: "100%" }}
                          alt=""
                        />
                      </div>
                    )}
                  </CSSTransitionGroup>
                </div>
                <div className="col-md-4">
                  <span>{this.props.article.fromLocation}</span>

                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    style={{
                      display: "contents",
                    }}
                  >
                    {this.state.showMore && (
                      <div className="moreinfo" style={{ height: "100px" }}>
                        <Map
                          defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                          width="100%"
                          height="100px"
                          instanceRef={(ref) => {                          
                          }}
                        />
                      </div>
                    )}
                  </CSSTransitionGroup>
                </div>
                <div className="col-md-4">
                  <span>{this.props.article.toLocation}</span>
                  <CSSTransitionGroup
                    transitionName="height-animation-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    style={{
                      display: "contents",
                    }}
                  >
                    {this.state.showMore && (
                      <div className="moreinfo" style={{ height: "100px" }}>
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
              <div className="col-md-6  mx-0 row">
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
                <div className="col-md-2">
                  <span>{this.props.article.price}</span>
                </div>
                <div className="col-md-3">
                  <span>
                    Рейтинг: &nbsp;
                    <span className="d-inline-block">
                      {this.props.article.rating}
                      <img src={ImgActiveStar} alt="ImgActiveStar" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <CSSTransitionGroup
              transitionName="height-animation"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              {this.state.showMore && (
                <div className="row moreinfo_block">
                  <div className="col-12 mb-3">
                    {this.props.article.tags.map((item, i) => {
                      return (
                        <span key={i} className="position-relative left-angle">
                          {item}
                        </span>
                      );
                    })}
                  </div>
                  <div className="col-5 mx-0 row">
                    <img
                      src={this.props.article.user.avatar}
                      width="50px"
                      height="50px"
                      alt="avatar"
                    />
                    <div className="col">
                      <div className="fio">{this.props.article.user.fio}</div>
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
            <div className="row">
              <div className="col-md-12 article-actions">
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

                {this.props.article.user.id === this.props.user.id &&
                  this.renderInput()}
                {this.props.article.user.id !== this.props.user.id && (
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
                )}
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
            {this.props.article.user.id === this.props.user.id &&
                  this.renderInput()}
                {this.props.article.user.id !== this.props.user.id && (
                  <>
                    <Button
                      type="fill"
                      className="get-article"
                      paddingVertical={"15px"}
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
                )}
          </>
        )}
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
