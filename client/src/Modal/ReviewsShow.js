import React from "react";
import Modal from "react-modal";
import settings from "../config/settings.js";
import { ReactComponent as CloseSVG } from "../img/close.svg";
import ReviewItemShow from "./items/ReviewItemShow";
class ReviewsShow extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padding = "10px";
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
    let content = (
      <>
        {this.props.reviews.map((item, index) => {
          return (
            <ReviewItemShow
              key={index}
              index={index}
              open={(openIndex) => { 
                this.setState({ openIndex });
              }}
              multiple={this.props.reviews.length > 1}
              isOpen={this.state.openIndex === index}
              review={item}
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
    } else return <div id="review-show" className="pop-block padding left">{content}</div>;
  }
}

export default ReviewsShow;
