// App
import React from "react";
import Modal from "react-modal";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import settings from "../config/settings.js";

class FeedbackModal extends React.Component {
  state = {
    isMailSend: false,
  };
  send() {
    this.setState({ isMailSend: true });
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="col-10 col-md-6 col-lg-4 col-xl-3 col-md-6"
        style={settings.stylesModals}
      >
        <h3 className="m-0 font-weight-normal text-center">Заказать звонок</h3>
        <Input
          type="phone"
          className="my-2"
          onChange={() => {}}
          placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
        />
        <Input type="text" className="my-2" placeholder="Имя" />
        <p className="text-right">
          <span
            className={`d-block text-center f-14 
            ${this.state.isMailSend ? `visible` : `invisible`}`}
          >
            Сообщение отправлено
          </span>
          <Button
            type="fill"
            paddingVertical={"11px"}
            paddingHorizontal={"25px"}
            onClick={() => {
              this.send();
            }}
          >
            Отправить
          </Button>
        </p>
      </Modal>
    );
  }
}

export default FeedbackModal;
