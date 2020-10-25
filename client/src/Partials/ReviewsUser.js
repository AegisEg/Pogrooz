// App
import React from "react";

// Article
import Pagination from "../Elements/Pagination";
import settings from "../config/settings";
import configApi from "../config/api";
import { withCookies } from "react-cookie";
import Loading from "../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
import ReviewItem from "./ReviewsItem";
class ReviewsUser extends React.Component {
  state = {
    reviews: [],
    currentPage: 0,
    pageCount: false,
    isFetching: true,
  };
  componentDidMount() {
    this.setState({ pageCount: this.props.countAll / settings.reviewsOnPage });
    this.getReviews(0);
  }
  getReviews(page = 0) {
    this.setState({ isFetching: true }, () => {
      fetch(`${configApi.urlApi}/api/article/getUserReviews`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: this.props.userId,
          page: page,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.reviews) {
            this.setState({
              currentPage: page,
              reviews: data.reviews,
              isFetching: false,
            });
          }
        });
    });
  }
  setPage(selected) {
    if (selected !== this.state.currentPage) {
      this.getReviews(selected);
    }
  }
  render() {
    return (
      <div className="articles-block">
        <Loading isLoading={this.state.isFetching}></Loading>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {this.state.reviews.map((review, index, reviews) => {
            return (
              <ReviewItem
                key={index}
                isLast={reviews.length === index + 1}
                review={review}
                notEdit={true}
              />
            );
          })}
        </CSSTransitionGroup>
        {!this.state.reviews.length && (
          <div className="text-center py-3">Записей не найдено</div>
        )}
        {!!this.state.reviews.length && this.state.pageCount > 1 && (
          <Pagination
            currentPage={this.state.currentPage}
            pageCount={this.state.pageCount - 1}
            onPageChange={this.setPage.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default withCookies(ReviewsUser);
