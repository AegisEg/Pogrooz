// App
import React from "react";
import Avatar from "../Elements/Avatar";
import { Link } from "react-router-dom";
// Elements
import RatingInput from "../Elements/RatingInput";
import Button from "../Elements/Button";
//IMGS
import ImgActiveStar from "../img/active-star.png";

class ReviewItem extends React.Component {
  state = { isEdit: false, comment: "", reting: 0 };
  componentDidMount() {
    this.setState({
      comment: this.props.review.comment,
      rating: this.props.review.rating,
    });
  }
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
              {!this.props.isMy && (
                <>
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
                </>
              )}
              {this.props.isMy && (
                <>
                  <Link
                    to={`/user/${this.props.review.user._id}`}
                    style={{
                      color: "#000",
                    }}
                  >
                    <Avatar
                      name={this.props.review.user.name.first}
                      avatar={this.props.review.user.avatar}
                    />
                  </Link>
                  <Link
                    to={`/user/${this.props.review.user._id}`}
                    style={{
                      color: "#000",
                    }}
                  >
                    <span style={{ lineHeight: "16px" }}>
                      {this.props.review.user.name.last}
                      <br />
                      {this.props.review.user.name.first}
                      <br />
                      {this.props.review.user.name.middle}
                    </span>
                  </Link>
                </>
              )}
            </div>
            <div
              className="col f-14"
              style={{
                maxWidth: "105px",
              }}
            >
              Рейтинг:
              <br />
              {this.state.isEdit && (
                <RatingInput
                  onClick={(val) => {
                    this.setState({ rating: val });
                  }}
                  value={this.state.rating}
                />
              )}
              {!this.state.isEdit && (
                <>
                  {this.props.review.rating || 0}{" "}
                  <img src={ImgActiveStar} alt="" />
                </>
              )}
            </div>
            <div className="col-12 col-md f-14 ">
              {this.state.isEdit && (
                <>
                  <textarea
                    value={this.state.comment}
                    onChange={(e) => {
                      this.setState({ comment: e.target.value });
                    }}
                  >
                    {this.state.comment}
                  </textarea>
                </>
              )}
              {!this.state.isEdit && this.props.review.comment}
            </div>
            {this.props.isMy && this.props.notEdit && !this.state.isEdit && (
              <div
                className="col text-center"
                style={{
                  maxWidth: "155px",
                }}
              >
                <Button
                  type="fill"
                  paddingHorizontal="25px"
                  onClick={() => {
                    this.setState({
                      isEdit: true,
                    });
                  }}
                >
                  Изменить
                </Button>
              </div>
            )}
            {this.props.isMy && this.state.isEdit && (
              <div
                className="col text-center"
                style={{
                  maxWidth: "155px",
                }}
              >
                <Button
                  type="fill"
                  paddingHorizontal="25px"
                  onClick={() => {
                    this.props.onChange(this.state.rating, this.state.comment);
                    this.setState({ isEdit: false });
                  }}
                >
                  Сохранить
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
export default ReviewItem;
