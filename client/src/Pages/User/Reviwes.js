// App
import React from "react";
import { withRouter } from "react-router-dom";
import articlestest from "../../config/articlestest.js";
import reviews from "../../config/reviewstest.js";
//IMGS
import ImgActiveStar from "../../img/active-star.png";

// Router
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Elements
import Button from "../../Elements/Button";
import { Map } from "react-yandex-maps";
import NoMatch from "../NoMatch.js";
import { withLastLocation } from "react-router-last-location";

class Reviews extends React.Component {
  state = {
    currentStatus: 0,
  };
  render() {
    return (
      <div className="article-page">
        <h2 className="title">Отзывы</h2>
        <div className="tab_groups">
          <span
            className={`tab_group ${
              this.state.currentStatus === "0" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: "0" });
            }}
          >
            Все
          </span>
          <span
            className={`tab_group ${
              this.state.currentStatus === "1" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: "1" });
            }}
          >
            От меня
          </span>
        </div>
        <div className="articles-block full">
          {reviews && reviews.length && (
            <>
              <div className="article-block requests-article-block">
                {reviews.map((item, index) => {
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
                            {item.created_at}
                          </span>
                        </div>
                        <div
                          className="col f-14 d-flex"
                          style={{
                            whiteSpace: "pre-line",
                            maxWidth: "90px",
                            color: "#322F2F",
                          }}
                        >
                          заказ №{item.articleWith}
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
                          {item.user.rating} <img src={ImgActiveStar} alt="" />
                        </div>
                        <div className="col-12 col-md f-14 ">
                          {item.comments}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </>
          )}
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

export default connect(mapStateToProps)(Reviews);
