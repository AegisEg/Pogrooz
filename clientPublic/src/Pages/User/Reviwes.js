// App
import React from "react";
// Router
import { connect } from "react-redux";
import * as reviewsAction from "../../redux/actions/reviews";
import { bindActionCreators } from "redux";
// Elements
import Loading from "../../Elements/Loading";
import LoadingFixed from "../../Elements/LoadingFixed";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransitionGroup } from "react-transition-group";
import ReviewItem from "../../Partials/ReviewsItem";
class Reviews extends React.Component {
  state = {
    currentStatus: 0,
  };
  //my Я автор
  //me Мне написали
  componentDidMount() {
    if (!this.props.reviews.reviewsMe.isGetted)
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
                    if (!this.props.reviews.reviewsMe.isGetted)
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
                    if (!this.props.reviews.reviewsMy.isGetted)
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
          isLoading={!reviewsObj.isGetted && reviewsObj.isFetching}
        ></Loading>
        <LoadingFixed
          isLoading={reviewsObj.isGetted && reviewsObj.isFetching}
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
              {(reviewsObj.isGetted || !reviewsObj.isFetching) &&
                !!reviewsObj.reviews.length && (
                  <>
                    <div className="article-block requests-article-block">
                      {reviewsObj.reviews.map((item, index) => {
                        return (
                          <ReviewItem
                            key={index}
                            onChange={(rating, comment) => {
                              this.props.reviewsAction.saveReview(
                                {
                                  _id: item._id,
                                  rating,
                                  comment,
                                },
                                item.order,
                                item.user._id,
                                this.props.user.apiToken
                              );
                            }}
                            isLast={reviewsObj.reviews.length === index + 1}
                            review={item}
                            isMy={this.state.currentStatus === 1}
                          />
                        );
                      })}
                    </div>
                  </>
                )}

              {reviewsObj.isGetted && !reviewsObj.reviews.length && (
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
