// App
import React from "react";
import Avatar from "../../Elements/Avatar";
import Pagination from "../../Elements/Pagination";
import { Link } from "react-router-dom";
// Router
import { connect } from "react-redux";
import * as reviewsAction from "../../redux/actions/reviews";
import { bindActionCreators } from "redux";
// Elements
import Button from "../../Elements/Button";
import Loading from "../../Elements/Loading";
import LoadingFixed from "../../Elements/LoadingFixed";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransitionGroup } from "react-transition-group";
//IMGS
import ImgActiveStar from "../../img/active-star.png";
class ReviewItem extends React.Component {
  render() {
    return (
      <div className="review-article">
        <div className="container-fluid">
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
                {new Date(this.props.review.createdAt).toDateR()}
              </span>
            </div>
            {this.props.isMy && (
              <div
                className="col f-14 d-flex align-items-start"
                style={{
                  whiteSpace: "pre-line",
                  maxWidth: "150px",
                  color: "#322F2F",
                }}
              >
                {this.props.review.order.type === "offer"
                  ? "предложение"
                  : "заказ"}{" "}
                №{this.props.review.order.articleId}
              </div>
            )}
            <div
              className="col f-14 d-flex align-items-start"
              style={{
                whiteSpace: "pre-line",
                maxWidth: "190px",
              }}
            >
              <Link
                to={`/user/${this.props.review.author._id}`}
                style={{
                  color: "#000",
                }}
              >
                <Avatar
                  name={this.props.review.author.name.first}
                  avatar={this.props.review.author.avatar}
                />
              </Link>
              <Link
                to={`/user/${this.props.review.author._id}`}
                style={{
                  color: "#000",
                }}
              >
                <span style={{ lineHeight: "16px" }}>
                  {this.props.review.author.name.last}
                  <br />
                  {this.props.review.author.name.first}
                  <br />
                  {this.props.review.author.name.middle}
                </span>
              </Link>
            </div>
            <div
              className="col f-14"
              style={{
                maxWidth: "105px",
              }}
            >
              Рейтинг:
              <br />
              {this.props.review.rating || 0} <img src={ImgActiveStar} alt="" />
            </div>
            <div className="col-12 col-md f-14 ">
              {this.props.review.comment}
            </div>
            {this.props.isMy && (
              <div
                className="col text-center"
                style={{
                  maxWidth: "155px",
                }}
              >
                <Button type="fill" paddingHorizontal="25px">
                  Изменить
                </Button>
              </div>
            )}
          </div>
          {!this.props.isLast && <hr />}
        </div>
      </div>
    );
  }
}
class Reviews extends React.Component {
  state = {
    currentStatus: 0,
  };
  //my Я автор
  //me Мне написали
  componentDidMount() {
    if (!this.props.reviews.reviewsMe.getted)
      this.props.reviewsAction.reviewsGet("me", this.props.user.apiToken);
  }
  onScroll() {
    if (
      this.state.currentStatus === 0 &&
      this.props.reviews.reviewsMe.canLoad &&
      !this.props.reviews.reviewsMe.isFetching &&
      this.reviewsBlock.getScrollHeight() - this.reviewsBlock.getScrollTop() <=
        200 + this.reviewsBlock.getClientHeight()
    ) {
      this.props.reviewsAction.reviewsLoad("me", this.props.user.apiToken);
    }
    if (
      this.state.currentStatus === 1 &&
      this.props.reviews.reviewsMy.canLoad &&
      !this.props.reviews.reviewsMy.isFetching &&
      this.reviewsBlock.getScrollHeight() - this.reviewsBlock.getScrollTop() <=
        200 + this.reviewsBlock.getClientHeight()
    ) {
      this.props.reviewsAction.reviewsLoad("my", this.props.user.apiToken);
    }
  }
  render() {
    let reviewsObj =
      this.state.currentStatus === 0
        ? this.props.reviews.reviewsMe
        : this.props.reviews.reviewsMy;
    return (
      <div className="loads-page reviews-page">
        <div className="container-fluid">
          <h2 className="title">Отзывы</h2>
          <div className="tab_groups">
            <span
              className={`tab_group ${
                this.state.currentStatus === 0 ? "active" : ""
              }`}
              onClick={() => {
                if (!this.props.reviews.reviewsMe.isFetching)
                  this.setState({ currentStatus: 0 }, () => {
                    if (!this.props.reviews.reviewsMe.getted)
                      this.props.reviewsAction.reviewsGet(
                        "me",
                        this.props.user.apiToken
                      );
                  });
              }}
            >
              Обо мне
            </span>
            <span
              className={`tab_group ${
                this.state.currentStatus === 1 ? "active" : ""
              }`}
              onClick={() => {
                if (!this.props.reviews.reviewsMy.isFetching)
                  this.setState({ currentStatus: 1 }, () => {
                    if (!this.props.reviews.reviewsMy.getted)
                      this.props.reviewsAction.reviewsGet(
                        "my",
                        this.props.user.apiToken
                      );
                  });
              }}
            >
              От меня
            </span>
          </div>
        </div>
        <Loading
          isLoading={!reviewsObj.getted && reviewsObj.isFetching}
        ></Loading>
        <LoadingFixed
          isLoading={reviewsObj.getted && reviewsObj.isFetching}
        ></LoadingFixed>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          <div className="articles-block full">
            <Scrollbars
              onScroll={() => {
                this.onScroll();
              }}
              ref={(ref) => {
                this.reviewsBlock = ref;
              }}
              renderTrackVertical={(props) => (
                <div className="track-vertical" />
              )}
              renderThumbVertical={(props) => (
                <div className="thumb-vertical" />
              )}
              className="load-content scroll"
              autoHide
            >
              {(reviewsObj.getted || !reviewsObj.isFetching) &&
                !!reviewsObj.reviews.length && (
                  <>
                    <div className="article-block requests-article-block">
                      {reviewsObj.reviews.map((item, index) => {
                        return (
                          <ReviewItem
                            key={index}
                            isLast={reviewsObj.reviews.length === index + 1}
                            review={item}
                            isMy={this.state.currentStatus === 1}
                          />
                        );
                      })}
                    </div>
                  </>
                )}

              {reviewsObj.getted && !reviewsObj.reviews.length && (
                <div className="text-center">Отзывов пока нет</div>
              )}
            </Scrollbars>
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    reviews: state.reviews,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    reviewsAction: bindActionCreators(reviewsAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
