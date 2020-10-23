// App
import React from "react";
import RatingInput from "../../Elements/RatingInput";
import Button from "../../Elements/Button.js";
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";
import { CSSTransitionGroup } from "react-transition-group";
//IMGS
import AngleUp from "../../img/angle-up.png";
import AngleDown from "../../img/angle-down.png";
import LoadingFixed from "../../Elements/LoadingFixed";
class ReviewItem extends React.Component {
  state = {
    reviewId: false,
    comment: "",
    rating: 0,
    isFetching: false,
  };
  saveReview = () => {
    this.setState({ isFetching: true }, () => {
      this.props.myArticlesActions
        .saveReview(
          {
            _id: this.state.reviewId,
            comment: this.state.comment,
            rating: this.state.rating,
          },
          this.props.article,
          this.props.userReview._id,
          this.props.user.apiToken
        )
        .then((data) => {
          this.setState({ isFetching: false });
          this.props.close();
        });
    });
  };
  componentDidMount() {
    if (!!this.props.review)
      this.setState({
        reviewId: this.props.review._id,
        comment: this.props.review.comment,
        rating: this.props.review.rating,
      });
  }
  componentDidUpdate(a) {
    if (JSON.stringify(this.props.review) !== JSON.stringify(a.review))
      this.setState({
        reviewId: this.props.review._id,
        comment: this.props.review.comment,
        rating: this.props.review.rating,
      });
  }
  render() {
    return (
      <div className="review-item padding">
        <LoadingFixed isLoading={this.state.isFetching} />
        <div className="f-14 mb-2 d-flex align-items-center">
          {this.props.userReview.name.last} {this.props.userReview.name.first}{" "}
          {this.props.userReview.name.middle}
          {this.props.multiple && (
            <img
              onClick={() => {
                if (this.props.isOpen) this.props.open(false);
                else this.props.open(this.props.index);
              }}
              className="ml-2"
              src={this.state.isOpen ? AngleUp : AngleDown}
              style={{
                cursor: "pointer",
              }}
              alt="AngleUp"
            />
          )}
        </div>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          style={{
            display: "contents",
          }}
        >
          {this.props.isOpen && (
            <div>
              <textarea
                className="mx-auto d-block"
                style={{
                  height: "164px",
                }}
                value={this.state.comment}
                onChange={(e) => {
                  this.setState({ comment: e.target.value });
                }}
              ></textarea>
              <div className="mt-2">Рейтинг:</div>
              <div className="d-flex justify-content-between align-items-center">
                <RatingInput
                  value={this.state.rating}
                  onClick={(val) => {
                    this.setState({ rating: val });
                  }}
                />
                <Button
                  paddingVertical="7px"
                  type="fill"
                  onClick={this.saveReview}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
