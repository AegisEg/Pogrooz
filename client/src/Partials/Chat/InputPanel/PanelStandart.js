// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import ReactResizeDetector from "react-resize-detector";

import addDocuments from "../../../img/addDocuments.svg";
import send from "../../../img/send.svg";
import smiles from "../../../img/smiles.svg";
import photo from "../../../img/photo.svg";
import microphone from "../../../img/microphone.svg";

class PanelStandart extends React.Component {
  state = {
    text: "",
  };
  setText(text) {
    this.setState({ text });
  }
  render() {
    return (
      <>
        <img
          className="addMoreAttach"
          style={{
            width: "24px",
          }}
          src={addDocuments}
          alt="addDocuments"
        />
        <div className="input-chat">
          <textarea
            className="input-message"
            id="input-message"
            onKeyDown={(e) => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                let inputMessage = document.getElementById("input-message");
                inputMessage.style.maxHeight = "48px";
                this.props.sendMessage(this.state.text);
              }
            }}
            onInput={() => {
              let inputMessage = document.getElementById("input-message");
              inputMessage.style.height = "5px";
              inputMessage.style.height = inputMessage.scrollHeight + "px";
              if (inputMessage.scrollHeight > 178) {
                inputMessage.style.maxHeight = "178px";
              } else {
                inputMessage.style.maxHeight = inputMessage.scrollHeight + "px";
              }
            }}
            onChange={(e) => {
              this.props.typing(e.target.value, this.state.text);
              this.setState({ text: e.target.value });
            }}
            value={this.state.text}
          ></textarea>
          {!this.state.text && <span className="placeholder">Сообщение</span>}
          <img src={photo} className="photo d-md-block d-none" alt="photo" />
          <img src={smiles} className="smiles" alt="smiles" />
        </div>
        <div
          className="sendAndMicro"
          style={{
            width: "26px",
            height: "26px",
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
            {this.state.text && (
              <img
                src={send}
                onClick={() => {
                  this.props.sendMessage(this.state.text);
                }}
                alt="microphone"
              />
            )}
          </CSSTransitionGroup>
        </div>
      </>
    );
  }
}

export default PanelStandart;
