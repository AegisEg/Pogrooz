// App
import React from "react";
import Modal from "react-modal";
import Button from "../Elements/Button";
import settings from "../config/settings.js";
import { ReactComponent as CloseSVG } from "../img/close.svg";

class CompleteModal extends React.Component {
  constructor(props) {
    super(props);
    settings.stylesModals.content.padding = "25px 30px 20px";
  }
  state = {
    isOpen: false,
  };
  closeForm = () => {
    this.setState({ isOpen: false });
  };
  openForm = () => {
    this.setState({ isOpen: true });
  };
  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={this.closeForm}
        className="complete-modal"
      >
        <div className="row align-items-center">
          <div className="col-12">
            <Button
              type="fill"
              paddingVertical="9px"
              paddingHorizontal="15px"
              className="ml-auto mr-1 input-action"
              onClick={this.props.onComplete}
            >
              Выполнен
            </Button>
            <Button
              type="fill"
              paddingVertical="9px"
              paddingHorizontal="15px"
              className="ml-1 mr-auto input-action"
              onClick={this.props.onCancel}
            >
              Отменен
            </Button>
          </div>
        </div>
        <CloseSVG
          className="close-svg"
          onClick={this.closeForm}
          className="close-svg"
        ></CloseSVG>
      </Modal>
    );
  }
}

export default CompleteModal;
