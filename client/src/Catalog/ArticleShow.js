// App
import React from "react";
import Fancybox from "../Elements/Fancybox.js";
import { connect } from "react-redux";
import Button from "../Elements/Button";
//IMGS
import ImgActiveStar from "../img/active-star.png";
import yellowAngle from "../img/yellowAngle.png";
import payIco from "../img/pay-ico.svg";
import dogovor from "../img/dogovor.png";
import passport from "../img/passport.png";

// Router
import { Link } from "react-router-dom";

// Elements
import { Map } from "react-yandex-maps";

class ArticleShow extends React.Component {
  state = {
    onMobile: false,
    dataFancybox: {
      images: false,
      index: false,
    },
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
      <>
        {!this.state.onMobile && (
          <div className="articles-header d-none d-md-block">
            <div className="row">
              <div className="col-md-6 mx-0 row">
                <div className="col-md-1">
                  <span>#</span>
                </div>
                <div className="col-md-3">
                  <span>Машина</span>
                </div>
                <div className="col-md-4">
                  <span>Откуда</span>
                </div>
                <div className="col-md-4">
                  <span>Куда</span>
                </div>
              </div>
              <div className="col-md-6  mx-0 row">
                <div className="col-md-4">
                  <span>Груз</span>
                </div>
                <div className="col-md-3">
                  <span>Загрузка</span>
                </div>
                <div className="col-md-2">
                  <span>Цена</span>
                </div>
                <div className="col-md-3">
                  <span>Еще</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="article-block" style={{ minHeight: "430px" }}>
          {!this.state.onMobile && (
            <div className="row">
              <div className="col-md-6 row  mx-0">
                <div className="col-md-1">{this.props.article.id}</div>
                <div className="col-md-3">
                  <span>{this.props.article.carName}</span>

                  <div>
                    <img
                      className="w-100  moreinfo"
                      src={this.props.article.carImg}
                      style={{ height: "100%" }}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <span>{this.props.article.fromLocation}</span>

                  <div className="moreinfo" style={{ height: "100px" }}>
                    <Map
                      defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                      width="100%"
                      height="100px"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <span>{this.props.article.toLocation}</span>

                  <div className="moreinfo" style={{ height: "100px" }}>
                    <Map
                      defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                      width="100%"
                      height="100px"
                    />
                  </div>
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
          )}
          {this.state.onMobile && (
            <div className="row">
              <div className="col-12 ">
                <span>#{this.props.article.id}</span>
                <span className="ml-3">{this.props.article.carName}</span>
              </div>
              <div className="col-12 col-sm-4 ">
                <h3 className="title-column">Откуда</h3>
                <span>{this.props.article.fromLocation}</span>
                <div className="moreinfo" style={{ height: "100px" }}>
                  <Map
                    defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                    width="100%"
                    height="100px"
                    instanceRef={(ref) => {
                   
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 pr-sm-2">
                <h3 className="title-column">Куда</h3>
                <span>{this.props.article.toLocation}</span>
                <div className="moreinfo" style={{ height: "100px" }}>
                  <Map
                    defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                    width="100%"
                    height="100px"
                    instanceRef={(ref) => {
                    
                    }}
                  />
                </div>
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
          )}
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
            <div className="col-12 col-md-5 mx-0 mt-2 row">
              <img
                src={this.props.article.user.avatar}
                width="50px"
                className="mr-3"
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
            <div className="col-12 col-md-7 mt-2 content">
              <div className="f-14">
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
          {this.props.isManage && this.renderInput()}
        </div>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ArticleShow);
