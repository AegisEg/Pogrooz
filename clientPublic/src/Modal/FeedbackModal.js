// App
import React from "react";
import Modal from "react-modal";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import Loading from "../Elements/Loading";
import settings from "../config/settings.js";
import api from "../config/api.js";
import { ReactComponent as CloseSVG } from "../img/close.svg";
import { toast } from "react-toastify";
class FeedbackModal extends React.Component {
  state = {
    isMailSend: false,
    isFetching: false,
    name: "",
    phone: "",
  };
  send() {
    if (this.state.phone.length !== 11) {
      toast.error("Введите номер телефона");
      return 0;
    }
    if (!this.state.name) {
      toast.error("Введите имя");
      return 0;
    }

    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/page/sendMailCall`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: this.state.phone,
          name: this.state.name,
        }),
      })
        .then((response) => response.json())
        .then(({ error }) => {
          if (!error) {
            this.setState({ isFetching: false });
            this.props.onRequestClose();
            toast.success("Заказ звонка совершен успешно.Ожидайте звонка.");
          }
        });
    });
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
          onChange={(val) => {
            this.setState({ phone: val });
          }}
          value={this.state.phone}
          placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
        />
        <Input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          className="my-2"
          placeholder="Имя"
        />
        <p className="text-right">
          <span
            className={`d-block text-center f-14 mb-2 
            ${this.state.isMailSend ? `visible` : `invisible`}`}
          >
            Сообщение отправлено
          </span>
          {this.state.isFetching && (
            <div className="small-loading">
              <Loading isLoading={this.state.isFetching} />
            </div>
          )}
          {!this.state.isFetching && (
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
          )}
        </p>
        <CloseSVG
          className="close-svg"
          onClick={this.props.onRequestClose}
        ></CloseSVG>
      </Modal>
    );
  }
}

export default FeedbackModal;
