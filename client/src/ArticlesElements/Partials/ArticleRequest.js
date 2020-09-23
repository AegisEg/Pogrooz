// App
import React from "react";
import Button from "../../Elements/Button";
import Avatar from "../../Elements/Avatar";
//IMGS
import ImgActiveStar from "../../img/active-star.png";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";

import LoadingFixed from "../../Elements/LoadingFixed";

class ArticleRequest extends React.Component {
  state = {
    isFetching: false,
  };
  deleteRequest = () => {
    this.props.myArticlesActions
      .deleteRequest(this.props.request._id, this.props.article)
      .then(() => {
        this.setState({
          isFetching: false,
        });
      });
  };
  deleteExecutor = () => {
    this.setState({ isFetching: true }, () => {
      this.props.myArticlesActions
        .deleteExecutor(this.props.article, this.props.request.author)
        .then((data) => {
          this.setState({ isFetching: false });
        });
    });
  };
  setExecutor = () => {
    this.setState({ isFetching: true }, () => {
      this.props.myArticlesActions
        .setExecutor(this.props.article, this.props.request.author)
        .then((data) => {
          this.setState({ isFetching: false });
        });
    });
  };
  render() {
    let myArticle = this.props.user._id === this.props.article.author._id;
    let isExecutor = this.props.article.executors.find(
      (item) => item._id === this.props.request.author._id
    );
    let isDelivered =
      this.props.article.delivered &&
      this.props.article.delivered.find(
        (item) => item === this.props.request.author._id
      );
    return (
      <div className="request-article">
        <LoadingFixed isLoading={this.state.isFetching} />
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
              {new Date(this.props.request.createdAt).toDateR()} <br />
              {new Date(this.props.request.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div
            className="col f-14 d-flex align-items-start user-avatar-image-block"
            style={{
              whiteSpace: "pre-line",
              maxWidth: "220px",
            }}
          >
            <Avatar avatar={this.props.request.author.avatar} />
            {this.props.request.author.name.last}
            <br />
            {this.props.request.author.name.first}
            <br />
            {this.props.request.author.name.middle}
            <Link
              to={`/user/${this.props.request.author._id}`}
              className="sharected-link"
            ></Link>
          </div>
          <div
            className="col f-14"
            style={{
              maxWidth: "105px",
            }}
          >
            Рейтинг:
            <br />
            {this.props.request.author.rating || 0}{" "}
            <img src={ImgActiveStar} alt="" />
          </div>
          <div className="col-12 col-lg f-14 price-request">
            {this.props.request.budget && (
              <>
                {this.props.request.budget + "руб."}
                <br />
              </>
            )}
            Погрузка: {new Date(this.props.request.date).toDateR()}{" "}
            {this.props.request.timeFrom && (
              <>
                с{" "}
                {new Date(this.props.request.timeFrom).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            )}
            {this.props.request.timeTo && (
              <>
                {" "}
                до{" "}
                {new Date(this.props.request.timeFrom).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            )}
          </div>
          <div className="col-12 col-md f-14 ">
            {this.props.request.comment}
            {!this.props.request.comment && <>Нет комментария</>}
          </div>
          {this.props.user.type === "carrier" &&
            this.props.article.status > 3 &&
            isDelivered && <div className="text-left col-12">Доставлено</div>}
          {isExecutor &&
            (this.props.article.status == 3 ||
              this.props.article.status == 2) &&
            myArticle && (
              <div className="text-right col-12">
                Выбран исполнителем
                <Button
                  type="fill"
                  paddingHorizontal="36px"
                  className="input-action"
                  onClick={this.deleteExecutor}
                >
                  Убрать из исполнителей
                </Button>
                {this.props.article.status == 2 && (
                  <Link to={`/dialog/${this.props.request.author._id}`}>
                    <Button
                      type="empty"
                      paddingHorizontal="29px"
                      className="input-action mr-3"
                    >
                      Написать
                    </Button>
                  </Link>
                )}
              </div>
            )}
          {this.props.article.type === "offer" &&
            this.props.article.status >= 3 &&
            myArticle &&
            isExecutor && (
              <div className="text-right col-12">
                <Link
                  to={`/dialog-order/${this.props.article._id}/${this.props.request.author._id}`}
                >
                  <Button
                    type="empty"
                    paddingHorizontal="29px"
                    className="input-action mr-3"
                  >
                    Написать
                  </Button>
                </Link>
              </div>
            )}
          {this.props.article.status === 2 && (
            <div className="text-right col-12">
              {myArticle && !isExecutor && (
                <>
                  <Link to={`/dialog/${this.props.request.author._id}`}>
                    <Button
                      type="empty"
                      paddingHorizontal="29px"
                      className="input-action mr-3"
                    >
                      Написать
                    </Button>
                  </Link>
                  <Button
                    type="fill"
                    paddingHorizontal="36px"
                    className="input-action"
                    onClick={this.setExecutor}
                  >
                    Выбрать
                  </Button>
                </>
              )}
              {!myArticle &&
                !isExecutor &&
                this.props.user._id === this.props.request.author._id && (
                  <>
                    <Button
                      type="empty"
                      paddingHorizontal="29px"
                      className="input-action mr-3"
                      onClick={() => {
                        this.deleteRequest();
                      }}
                    >
                      Отозвать
                    </Button>
                    <Button
                      type="fill"
                      paddingHorizontal="36px"
                      className="input-action"
                      onClick={() => {
                        this.props.setChangeRequest(this.props.request._id);
                      }}
                    >
                      Редактировать
                    </Button>
                  </>
                )}
            </div>
          )}
        </div>
        {this.props.isLast && <hr />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}
export default connect(null, mapDispatchToProps)(ArticleRequest);
