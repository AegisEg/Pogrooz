// App
import React from "react";
import { withRouter } from "react-router-dom";
import Article from "../../Catalog/Article";
import RequestForm from "../../Partials/RequestForm.js";
import articlestest from "../../config/articlestest.js";
//IMGS
import ImgActiveStar from "../../img/active-star.png";

// Router
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Elements
import Button from "../../Elements/Button";
import NoMatch from "../NoMatch.js";
import { withLastLocation } from "react-router-last-location";

class ArticlePage extends React.Component {
  state = {};
  render() {
    let article = articlestest.find((item) => {
      return item.id == this.props.match.params.id;
    });
    if (article)
      return (
        <div className="article-page">
          <div className="container-fluid">
            <h2 className="title">
              {article.type ? "Заказ" : "Предложение"} №{" "}
              {this.props.match.params.id}
            </h2>
            <Link
              className="href left-angle angle-go mb-2 d-block"
              onClick={() => {
                if (this.props.lastLocation) {
                  this.props.history.push(this.props.lastLocation.pathname);
                } else {
                  this.props.history.push("/search");
                }
              }}
            >
              Назад
            </Link>
          </div>
          <div className="articles-block full">
            <div className="articles-header d-none d-md-block">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6  row">
                    <div className="col-md-2">
                      <span>#</span>
                    </div>
                    <div className="col-md-2">
                      <span>Машина</span>
                    </div>
                    <div className="col-md-4">
                      <span>Откуда</span>
                    </div>
                    <div className="col-md-4">
                      <span>Куда</span>
                    </div>
                  </div>
                  <div className="col-md-6  row">
                    <div className="col-md-4">
                      <span>Груз</span>
                    </div>
                    <div className="col-md-3">
                      <span>Загрузка</span>
                    </div>
                    <div className="col-md-3">
                      <span>Цена</span>
                    </div>
                    <div className="col-md-2">
                      <span>Еще</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Article
              isManage={this.props.user.id == article.user.id}
              onlyOpen={true}
              singlePage={true}
              article={article}
            />
            <div className="articles-header">
              <div className="container-fluid">
                <span className="f-16">Заявок по заказу - 9</span>
              </div>
            </div>
            {article.requests && article.requests.length && (
              <>
                <div className="article-block requests-article-block">
                  <div className="container-fluid">
                    {article.requests.map((item, index) => {
                      return (
                        <div key={index} className="request-article">
                          <div className="row">
                            <div
                              className="col f-14"
                              style={{
                                maxWidth: "115px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#6C6C6C",
                                }}
                              >
                                {item.created_at.date} <br />
                                {item.created_at.time}
                              </span>
                            </div>
                            <div
                              className="col f-14 d-flex align-items-center"
                              style={{
                                whiteSpace: "pre-line",
                                maxWidth: "190px",
                              }}
                            >
                              <img
                                src={item.user.avatar}
                                className="mr-4 user-avatar"
                                alt="avatar"
                              />
                              {item.user.fio}
                            </div>
                            <div
                              className="col f-14"
                              style={{
                                maxWidth: "105px",
                              }}
                            >
                              Рейтинг:
                              <br />
                              {item.user.rating}{" "}
                              <img src={ImgActiveStar} alt="" />
                            </div>
                            <div
                              className="col f-14"
                              style={{
                                maxWidth: "105px",
                              }}
                            >
                              <b>
                                <p className="mt-0">{item.summ}</p>
                                <div>
                                  Погрузка: <br />
                                  {item.date_pogrooz.date}
                                  <br />
                                  {item.date_pogrooz.time}
                                </div>
                              </b>
                            </div>
                            <div className="col-12 col-md f-14 ">
                              {item.comments}
                            </div>
                            <div className="text-right col-12">
                              <Button
                                type="empty"
                                paddingHorizontal="29px"
                                className="input-action mr-3"
                              >
                                Написать
                              </Button>
                              <Button
                                type="fill"
                                paddingHorizontal="36px"
                                className="input-action"
                              >
                                Выбрать
                              </Button>
                            </div>
                          </div>
                          {article.requests.length !== index + 1 && <hr />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <RequestForm />
          </div>
        </div>
      );
    else return <NoMatch />;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(
  withRouter(withLastLocation(ArticlePage))
);
