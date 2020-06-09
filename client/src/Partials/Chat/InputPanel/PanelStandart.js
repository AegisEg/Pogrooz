// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import addDocuments from "../../../img/addDocuments.svg";
import send from "../../../img/send.svg";
import smiles from "../../../img/smiles.svg";
import photo from "../../../img/photo.svg";
import microphone from "../../../img/microphone.svg";

class PanelStandart extends React.Component {
  state = {
    text: "",
  };
  render() {
    return (
      <>
        <img
          class="mr-3"
          style={{
            width: "24px",
          }}
          src={addDocuments}
          alt="addDocuments"
        />
        <div className="col input-chat">
          <textarea
            className=""
            onChange={(e) => {
              this.setState({ text: e.target.value });
            }}
          >
            {this.state.text}
          </textarea>
          {!this.state.text && <span className="placeholder">Сообщение</span>}
          <img src={photo} className="photo d-md-block d-none" alt="photo" />
          <img src={smiles} className="smiles" alt="smiles" />
        </div>
        <div
          className="text-center position-relative left-tools"
          style={{
            width: "26px",
          }}
        >
          <CSSTransitionGroup
            transitionName="erase-animation-item"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
            style={{
              display: "contents",
            }}
          >
            {!this.state.text && (
              <img
                src={microphone}
                alt="microphone"
                onClick={this.props.recordStart}
              />
            )}
            {this.state.text && <img src={send} alt="microphone" />}
          </CSSTransitionGroup>
        </div>
      </>
    );
  }
}

export default PanelStandart;
