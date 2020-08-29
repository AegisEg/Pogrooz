// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Picker } from "emoji-mart";
import { ReactComponent as AddDocuments } from "../../../img/addDocuments.svg";
import { ReactComponent as Send } from "../../../img/send.svg";
import { ReactComponent as Smiles } from "../../../img/smiles.svg";
import { ReactComponent as Microphone } from "../../../img/microphone.svg";
import settings from "../../../config/settings";
class PanelStandart extends React.Component {
  constructor() {
    super();
    this.showEmoji = this.showEmoji.bind(this);
    this.hideEmoji = this.hideEmoji.bind(this);
  }
  state = {
    text: "",
    showEmoji: false,
  };
  setText(text) {
    this.setState({ text });
  }
  showEmoji() {
    this.setState({ showEmoji: true });
    document.addEventListener("click", this.hideEmoji);
  }
  hideEmoji(e) {
    if (!e.target.closest(".emoji-mart")) {
      this.setState({ showEmoji: false });
      document.removeEventListener("click", this.hideEmoji);
    }
  }
  render() {
    return (
      <>
        <AddDocuments
          className="addMoreAttach"
          onClick={() => {
            document.getElementById("uploadFile").click();
          }}
        />

        <input
          type="file"
          multiple
          hidden
          onChange={(e) => {
            this.props.loadFiles(e);
          }}
          id="uploadFile"
          style={{ display: "none" }}
          accept="image/jpeg,image/gif,image/jpeg,image/png,application/pdf,text/plain,application/x-zip-compressed,application/zip,application/msword,audio/mpeg"
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
          <Smiles onClick={this.showEmoji} className="smiles" />
          <CSSTransitionGroup
            transitionName="emoji-animation-item"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
            style={{
              display: "contents",
            }}
          >
            {this.state.showEmoji && (
              <Picker
                showPreview={false}
                onClick={(emoji, event) => {
                  this.setState({
                    text: this.state.text + emoji.native,
                  });
                }}
                native={true}
                showSearch={false}
                showSkinTones={false}
                i18n={settings.localizateEmoji}
              />
            )}
          </CSSTransitionGroup>
        </div>
        <div className="sendAndMicro">
          <CSSTransitionGroup
            transitionName="erase-animation-item"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
            style={{
              display: "contents",
            }}
          >
            {!this.state.text && !this.props.isContent && (
              <Microphone onClick={this.props.recordStart} />
            )}
            {(this.state.text || this.props.isContent) && (
              <Send
                onClick={() => {
                  let inputMessage = document.getElementById("input-message");
                  inputMessage.style.maxHeight = "48px";
                  this.props.sendMessage(this.state.text);
                }}
              />
            )}
          </CSSTransitionGroup>
        </div>
      </>
    );
  }
}

export default PanelStandart;
