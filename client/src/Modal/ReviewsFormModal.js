// App
import React from "react";
import Modal from "react-modal";
import settings from "../config/settings.js";
import { ReactComponent as CloseSVG } from "../img/close.svg";
import ReviewItem from "./items/ReviewItem.js";
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
  closeForm(e) {
    if (
      e &&
      document.getElementById("review-form") &&
      !document.getElementById("review-form").contains(e.target)
    ) {
      this.setState({ isOpen: false });
      document.removeEventListener("click", this.closeForm);
    }
  }
  closePurgeForm = () => {
    this.setState({ isOpen: false });
    document.removeEventListener("click", this.closeForm);
  };
  toogleform(e) {
    if (!this.state.isOpen) document.addEventListener("click", this.closeForm);
    else document.removeEventListener("click", this.closeForm);
    this.setState({ isOpen: !this.state.isOpen });
  }
  openForm() {
    this.setState({ isOpen: true });
    document.addEventListener("click", this.closeForm);
  }
  render() {
    if (this.state.isOpen) {
      let content = (
        <>
          {this.props.reviewsItems.map((item, index) => {
            return (
              <ReviewItem
                key={index}
                index={index}
                close={this.closePurgeForm}
                review={this.props.reviews.find(
                  (itemX) => itemX.user._id === item._id
                )}
                article={this.props.article}
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
            <CloseSVG className="close-svg" onClick={this.closeForm}></CloseSVG>
          </Modal>
        );
      } else
        return (
          <div
            id="review-form"
            className="pop-block reviewsForm notAngle padding bottom"
          >
            {content}
          </div>
        );
    } else return <></>;
  }
}

export default ReviewsFormModal;
