// App
import React from "react";
import Modal from "react-modal";
import settings from "../config/settings.js";
import { Link } from "react-router-dom";
import { ReactComponent as Chat } from "../img/chat.svg";
import { ReactComponent as CloseSVG } from "../img/close.svg";

class DialogsModal extends React.Component {
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
        className="dialogs-modal"
      >
        <div className="dialogs-executors">
          {this.props.dialogs.map((item, index) => {
            return (
              <div key={index}>
                <div className="name">
                  {" "}
                  {item.name.last} {item.name.first}
                </div>
                <Chat />
                <Link
                  className="sharected-link"
                  to={`/dialog-order/${this.props.article._id}/${item._id}`}
                ></Link>
              </div>
            );
          })}
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

export default DialogsModal;
