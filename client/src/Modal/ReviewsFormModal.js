// App
import React from "react";
import RatingInput from "../Elements/RatingInput";
import Button from "../Elements/Button.js";
import { CSSTransitionGroup } from "react-transition-group";
//IMGS
import AngleUp from "../img/angle-up.png";
import AngleDown from "../img/angle-down.png";
import Modal from "react-modal";
import settings from "../config/settings.js";

class ReviewsFormModal extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padingBottom = "37px";
    this.closeForm = this.closeForm.bind(this);
  }
  state = {
    isOpen: false,
    openIndex: 0,
  };
  closeForm() {
    this.setState({ isOpen: false });
  }
  openForm() {
    this.setState({ isOpen: true });
  }
  render() {
    if (this.state.isOpen) {
      let content = (
        <>
          {this.props.reviewsItems.map((item, index) => {
            return (
              <ReviewsItem
                key={index}
                index={index}
                multiple={this.props.reviewsItems.length > 1}
                open={(openIndex) => {
                  this.setState({ openIndex });
                }}
                isOpen={this.state.openIndex === index}
                userReview={item}
              />
            );
          })}
        </>
      );
      if (this.props.onMobile) {
        return (
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeForm}
            className="reviews-modal"
            style={settings.stylesModals}
          >
            {content}
          </Modal>
        );
      } else
        return (
          <div className="pop-block notAngle padding bottom">{content}</div>
        );
    } else return <></>;
  }
}

export default ReviewsFormModal;

class ReviewsItem extends React.Component {
  state = {
    rating: 0,
  };
  render() {
    return (
      <div className="review-item padding">
        <div className="f-14 mb-2 d-flex align-items-center">
          {this.props.userReview.name}

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
              ></textarea>
              <div className="mt-2">Рейтинг:</div>
              <div className="d-flex justify-content-between align-items-center">
                <RatingInput
                  value={this.state.rating}
                  onClick={(val) => {
                    this.setState({ rating: val });
                  }}
                />
                <Button paddingVertical="7px" type="fill">
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
