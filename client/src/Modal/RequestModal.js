// App
import React from "react";
import Modal from "react-modal";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import settings from "../config/settings.js";
import { ReactComponent as CloseSVG  } from "../img/close.svg";

class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padingBottom = "37px";
  }
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
        className="request-modal"
        style={settings.stylesModals}
      >
        <div className="mb-2">
          <b className="f-14">Напишите комментарий</b>
        </div>
        <div className="row align-items-center">
          <div className="col-12">
            <textarea
              style={{
                width: "100%",
                height: "100px",
              }}
            ></textarea>
          </div>
          <div className="col-12 row mx-0 px-0 fields align-items-center">
            <div
              className="d-inline-flex col px-3 mt-3"
              style={{
                marginLeft: "0",
                marginRight: "0",
                alignItems: "center",
                flexDirection: "row",
                minWidth: "230px",
                maxWidth: "210px",
              }}
            >
              <span className="filter-input-title mb-0">
                Дата<br></br>погрузки
              </span>
              <Input
                type="date"
                style={{ width: "130px" }}
                placeholder="21.12.2020"
              />
            </div>
            <div
              className="d-inline-flex   px-3 mt-3"
              style={{
                marginLeft: "0",
                marginRight: "0",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <span className="filter-input-title mb-0">
                Время<br></br>погрузки
              </span>
              <Input type="time" placeholder="12:00" />
              <span className="filter-input-title mb-0">&nbsp;&nbsp;-</span>
              <Input type="time" placeholder="12:00" />
            </div>
            <div
              className="d-inline-flex px-3 mt-3 budjet_div"
              style={{
                marginLeft: "0",
                marginRight: "0",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <span className="filter-input-title mb-0">
                Желаемый<br></br>бюджет, руб
              </span>
              <Input type="number" placeholder="0" max="20000" />
            </div>
            <Button
              type="fill"
              paddingVertical="11px"
              paddingHorizontal="36px"
              className="mt-3 ml-auto mr-3 input-action"
            >
              Отправить
            </Button>
          </div>
        </div>
        <CloseSVG className="close-svg" onClick={this.props.onRequestClose} className="close-svg"></CloseSVG>
      </Modal>
    );
  }
}

export default RequestModal;
