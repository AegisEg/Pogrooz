// App
import React from "react";
import { withRouter } from "react-router-dom";
import ArticleShow from "../../Catalog/ArticleShow";
import RequestForm from "../../Partials/RequestForm.js";
import articlestest from "../../config/articlestest.js";
//IMGS
import ImgActiveStar from "../../img/active-star.png";

// Router
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Elements
import Button from "../../Elements/Button";
import { Map } from "react-yandex-maps";
import NoMatch from "../NoMatch.js";

class ArticlePage extends React.Component {
  state = {};

  render() {
    let article = articlestest.find((item) => {
      return item.id == this.props.match.params.id;
    });
    if (article)
      return (
        <div className="article-page">
          <h2 className="title">
            {article.type ? "Заказ" : "Предложение"} №{" "}
            {this.props.match.params.id}
          </h2>
          <Link
            className="href left-angle angle-go mb-2 d-block"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Назад
          </Link>
          <div className="articles-block full">
            <ArticleShow article={article} />
            <div className="articles-header">
              <span className="f-16">Заявок по заказу - 9</span>
            </div>
            {article.requests && article.requests.length && (
              <>
                <div className="article-block requests-article-block">
                  {article.requests.map((item) => {
                    return (
                      <div className="request-article">
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
                            className="col f-14 d-flex"
                            style={{
                              whiteSpace: "pre-line",
                              maxWidth: "190px",
                            }}
                          >
                            <img
                              src={item.user.avatar}
                              className="mr-4"
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
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <RequestForm />
            <div
              className="row mx-0 mt-4 justify-content-center"
              style={{ minHeight: "218px" }}
            >
              <div
                className="f-18 text-center px-3 mt-2"
                style={{
                  maxWidth: "480px",
                }}
              >
                Чтобы отправить заявку войдите в личный кабинет. или
                зарегистрируйтесь на сайте и получите Тариф ДЕМО на 7 дней!
              </div>
              <div className="px-3 mt-2">
                <Button
                  type="fill"
                  margin={"0 0 0 auto"}
                  paddingHorizontal={"25px"}
                  paddingVertical={"12px"}
                  className="input-action"
                >
                  Попробовать
                  <br />
                  БЕСПЛАТНО
                </Button>
              </div>
            </div>
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

export default connect(mapStateToProps)(withRouter(ArticlePage));
