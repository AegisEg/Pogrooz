import React from "react";
import Modal from "react-modal";
import settings from "../config/settings.js";
import ImgActiveStar from "../img/active-star.png";
import { ReactComponent as CloseSVG } from "../img/close.svg";

class ReviewsShow extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padding = "10px";
    this.closeForm = this.closeForm.bind(this);
  }
  state = {
    isOpen: false,
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
        <div className="padding pop-block-item-simple pb-0 noborder nohref">
          Текст отзыва при наведении на пункт “Смотреть отзыв”Текст отзыва при
          наведении на пункт “Смотреть отзыв”Текст отзыва при наведении на пункт
          “Смотреть отзыв”Текст отзыва при наведении на пункт “Смотреть
          отзыв”Текст отзыва при наведении на пункт “Смотреть отзыв”Текст отзыва
          при наведении на пункт “Смотреть отзыв”
        </div>
        <div className="padding pop-block-item-simple text-left noborder">
          Рейтинг:
          <div className="d-flex">
            <img src={ImgActiveStar} alt="ImgActiveStar" />
            <img src={ImgActiveStar} alt="ImgActiveStar" />
            <img src={ImgActiveStar} alt="ImgActiveStar" />
            <img src={ImgActiveStar} alt="ImgActiveStar" />
            <img src={ImgActiveStar} alt="ImgActiveStar" />
          </div>
        </div>
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
    } else return <div className="pop-block padding left">{content}</div>;
  }
}

export default ReviewsShow;
