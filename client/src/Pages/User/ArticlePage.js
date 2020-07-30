// App
import React from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Article from "../../Catalog/Article";
import ArticleHeader from "../../Catalog/ArticleHeader";
import RequestForm from "../../Partials/RequestForm.js";
import configApi from "../../config/api";
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
  state = {
    article: false,
    isFetching: true,
  };
  componentDidMount() {
    this.getAricle();
  }
  getAricle() {
    fetch(`${configApi.urlApi}/api/article/getArticle`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.match.params.id,
        type: this.props.type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.article) {
          this.setState({
            article: data.article,
            isFetching: false,
          });
        }
      });
  }
  render() {
    if (!this.state.isFetching) {
      if (this.state.article)
        return (
          <div className="article-page">
            <div className="container-fluid">
              <h2 className="title">
                {this.state.article.type ? "Заказ" : "Предложение"} №{" "}
                {this.state.article.articleId}
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
              <ArticleHeader></ArticleHeader>
              <Article
                isManage={this.props.user._id == this.state.article.autor._id}
                onlyOpen={true}
                singlePage={true}
                article={this.state.article}
              />
              <div className="articles-header">
                <div className="container-fluid">
                  <span className="f-16">Заявок по заказу - 9</span>
                </div>
              </div>
              {this.state.article.requests &&
                this.state.article.requests.length && (
                  <>
                    <div className="requests-article-block">
                      <div className="container-fluid">
                        {this.state.article.requests.map((item, index) => {
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
                                  className="col f-14 d-flex align-items-start"
                                  style={{
                                    whiteSpace: "pre-line",
                                    maxWidth: "180px",
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
                                <div className="col-12 col-lg f-14 price-request">
                                  {item.summ} Погрузка: {item.date_pogrooz.date}{" "}
                                  {item.date_pogrooz.time}
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
                              {this.state.article.requests.length !==
                                index + 1 && <hr />}
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
    return "Загрузка";
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(
  withCookies(withRouter(withLastLocation(ArticlePage)))
);
