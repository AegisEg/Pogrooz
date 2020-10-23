// App
import React from "react";
import Modal from "react-modal";
import settings from "../config/settings.js";
import { ReactComponent as Otmena } from "../img/otmena.svg";
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
        className="cancels-modal"
      >
        <div className="cancels-executors">
          {this.props.users.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  this.props.onDeleteExecutor(item);
                  this.closeForm();
                }}
              >
                <div className="name">
                  {" "}
                  {item.name.last} {item.name.first}
                </div>
                <Otmena />
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
