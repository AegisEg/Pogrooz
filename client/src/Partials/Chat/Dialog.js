import React from "react";
import Message from "./Message";
import { Scrollbars } from "react-custom-scrollbars";
import SocketController from "../../controllers/SocketController";
import PanelRecord from "../../Partials/Chat/InputPanel/PanelRecord";
import PanelStandart from "../../Partials/Chat/InputPanel/PanelStandart";
import RecentMessage from "./RecentMessage";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import * as dialogsActions from "../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import ArrowDown from "../../img/arrowDownperple.svg";
import LoadGif from "../../img/load.gif";
import { getAudioBufferData } from "../../controllers/FunctionsController";

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;
let waitActiveUser = false;
let waitFastRead = false;
class ScrollBottom extends React.Component {
  render() {
    return (
      <div
        id="scroll-to-bottom"
        className={`scroll-to-bottom`}
        onClick={() => {
          this.props.scrollToBottom();
        }}
      >
        <img src={ArrowDown} alt="ArrowDown" />
      </div>
    );
  }
}
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.inputPanel = React.createRef();
    this.activePage = false;
  }
  state = {
    scrollTop: 0,
    canTyping: true,
    recentMessage: false,
    sounds: [],
    files: [],
    images: [],
    voiceSound: false,
    isRecord: false,
    setCordMessageScroll: false,
  };
  onScroll() {
    let scroll =
      this.messagesBlock.getScrollHeight() - this.messagesBlock.getScrollTop();
    this.setState({
      scrollTop: scroll,
    });
    document.getElementById("load-message-gif").style.top =
      this.messagesBlock.getScrollTop() + "px";

    if (
      this.messagesBlock.getScrollTop() + this.messagesBlock.getClientHeight() <
      this.messagesBlock.getScrollHeight() - 100
    ) {
      if (
        !document
          .getElementById("scroll-to-bottom")
          .classList.contains("active")
      ) {
        document.getElementById("scroll-to-bottom").classList.add("active");
      }
    } else {
      if (
        document.getElementById("scroll-to-bottom").classList.contains("active")
      ) {
        document.getElementById("scroll-to-bottom").classList.remove("active");
        if (!!this.props.unRead) {
          this.readMessages();
        }
      }
    }

    if (this.props.dialog.canLoad && this.messagesBlock.getScrollTop() < 100) {
      this.loadMessages();
    }
  }
  scrollToBottom() {
    if (this.messagesBlock) {
      if (isEdge || isIE) this.messagesBlock.view.scrollTop = 100000;
      else {
        this.messagesBlock.view.scroll({
          top: 100000,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }
  loadToVictory(top) {
    this.loadMessages(false).then(() => {
      this.scrollTo(top);
    });
  }
  scrollTo(top) {
    let messageBlock = document.getElementById("message" + top);
    if (messageBlock) {
      let topCord = messageBlock.offsetTop;
      this.setState({ setCordMessageScroll: top });
      setTimeout(() => {
        this.setState({ setCordMessageScroll: false });
      }, 5000);
      if (this.messagesBlock) {
        if (isEdge || isIE) this.messagesBlock.view.scrollTop = topCord;
        else {
          this.messagesBlock.view.scroll({
            top: topCord,
            left: 0,
            behavior: "smooth",
          });
        }
        document.getElementById("load-message-gif").classList.remove("active");
      }
    } else {
      if (
        !document
          .getElementById("load-message-gif")
          .classList.contains("active")
      )
        document.getElementById("load-message-gif").classList.add("active");
      this.loadToVictory(top);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.scrollTop !== this.state.scrollTop) {
      return false;
    }

    return true;
  }
  focusPage() {
    let active;
    if (
      this.messagesBlock &&
      this.messagesBlock.getScrollTop() + this.messagesBlock.getClientHeight() <
        this.messagesBlock.getScrollHeight()
    ) {
      active = false;
    } else {
      active = true;
    }
    if (!this.activePage && active && !!this.props.unRead.length) {
      if (waitActiveUser) clearTimeout(waitActiveUser);

      this.readMessages();
      this.activePage = true;

      waitActiveUser = setTimeout(() => {
        this.activePage = false;
      }, 3000);
    }
  }
  blurPage() {
    this.activePage = false;
  }
  componentDidMount() {
    window.addEventListener("blur", this.blurPage.bind(this));
    window.addEventListener("mousemove", this.focusPage.bind(this));

    if (this.messagesBlock) {
      this.messagesBlock.view.scrollTop = 100000;
    }
    let drafts = { ...JSON.parse(localStorage.getItem("drafts")) };

    if (drafts["draft-" + this.props.dialog._id])
      this.inputPanel.current.setText(drafts["draft-" + this.props.dialog._id]);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.dialog.messages.length < this.props.dialog.messages.length &&
      JSON.stringify(prevProps.dialog.messages[0]) ===
        JSON.stringify(this.props.dialog.messages[0]) &&
      (this.messagesBlock.getScrollHeight() -
        this.messagesBlock.getScrollTop() <
        this.messagesBlock.getClientHeight() + 200 ||
        prevProps.dialog.messages[prevProps.dialog.messages.length - 1].user
          ._id === this.props.user._id)
    ) {
      if (this.activePage) {
        this.readMessages();
      }

      this.scrollToBottom();

      if (
        document.getElementById("scroll-to-bottom").classList.contains("active")
      )
        document.getElementById("scroll-to-bottom").classList.remove("active");
    }

    if (
      JSON.stringify(prevProps.dialog.messages[0]) !==
      JSON.stringify(this.props.dialog.messages[0])
    ) {
      if (!this.state.setCordMessageScroll)
        this.messagesBlock.scrollTop(
          this.messagesBlock.getScrollHeight() - this.state.scrollTop
        );
      else this.scrollToBottom();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("blur", this.blurPage.bind(this));
    window.removeEventListener("mousemove", this.focusPage.bind(this));
  }
  loadMessages(controlGif = true) {
    if (controlGif) {
      document.getElementById("load-message-gif").classList.add("active");
    }
    return new Promise((resolve, reject) => {
      this.props.dialogsActions
        .loadMessages(
          { dialogId: this.props.dialog._id },
          this.props.user.apiToken
        )
        .then(() => {
          if (controlGif)
            document
              .getElementById("load-message-gif")
              .classList.remove("active");
          resolve();
        });
    });
  }
  //Отправка ввода
  typing(newText, prevText) {
    if (newText > prevText) {
      if (this.state.canTyping) {
        this.setState({ canTyping: false });
        SocketController.typingDialog(
          this.props.dialog.user._id,
          this.props.user._id
        );
      }

      setTimeout(() => {
        this.setState({ canTyping: true });
      }, 2500);
    }
    let drafts = { ...JSON.parse(localStorage.getItem("drafts")) };
    drafts["draft-" + this.props.dialogId] = newText;
    if (
      !drafts["draft-" + this.props.dialogId] ||
      !/\S/.test(drafts["draft-" + this.props.dialogId])
    )
      delete drafts["draft-" + this.props.dialogId];
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }
  //Отправка сообщения
  sendMessage(text) {
    return new Promise((resolve, reject) => {
      if (
        /\S/.test(text) ||
        !!this.state.images.length ||
        !!this.state.files.length ||
        !!this.state.sounds.length ||
        !!this.state.voiceSound
      ) {
        let drafts = { ...JSON.parse(localStorage.getItem("drafts")) };
        delete drafts["draft-" + this.props.dialog._id];
        localStorage.setItem("drafts", JSON.stringify(drafts));
        this.props.dialogsActions.sendMessage(
          {
            text: !this.state.isRecord ? text : "",
            userId: this.props.dialog.user._id,
            images: this.state.images,
            files: this.state.files,
            voiceSound: this.state.voiceSound,
            sounds: this.state.sounds,
            recentMessage: this.state.recentMessage,
            dialogId: this.props.dialog._id,
          },
          this.props.user.apiToken
        );

        this.setState({
          images: [],
          sounds: [],
          files: [],
          voiceSound: false,
          isRecord: false,
          recentMessage: false,
        });
        if (!this.state.isRecord) this.inputPanel.current.setText("");
      }
      resolve();
    });
  }
  //Повторная отправка ошибочного сообщения
  retrySendMessage(message) {
    message.userId = this.props.dialog.user._id;
    message.dialogId = this.props.dialog._id;
    this.props.dialogsActions.retrySendMessage(
      message,
      this.props.user.apiToken
    );
  }
  //Удаление локального сообщения
  deleteLocalMessage(_id) {
    this.props.dialogsActions.deleteLocalMessage(_id, this.props.dialog._id);
  }
  setRecentMessage(message) {
    this.setState({ recentMessage: message });
  }
  readMessages() {
    if (waitFastRead) clearTimeout(waitFastRead);
    waitFastRead = setTimeout(() => {
      this.props.dialogsActions.readMessages(
        {
          dialogId: this.props.dialog._id,
          otherId: this.props.dialog.user._id,
          userId: this.props.user._id,
        },
        this.props.user.apiToken
      );
    }, 100);
  }
  async addVoiceSound(data, duration, recordLine) {
    let voiceSound = false;

    if (data) {
      let audioUrl = URL.createObjectURL(data),
        audioData = await getAudioBufferData(audioUrl);
      voiceSound = {
        path: URL.createObjectURL(data),
        file: data,
        name: "Аудиозапись",
        duration: audioData.duration,
        recordLine: audioData.recordLine,
        type: "mp3",
        size: data.size,
      };
    }
    this.setState({ voiceSound });
    return Promise.resolve();
  }
  async addFile(e, paste = false, drag = false) {
    let sounds = [...this.state.sounds];
    let files = [...this.state.files];
    let images = [...this.state.images];
    let InputFile = document.getElementById("uploadFile");
    let counter = sounds.length + files.length + images.length;
    if (!paste && !drag) {
      for (let i = 0; i < InputFile.files.length; i++) {
        if (counter > 9) {
          toast.error("Max upload 10 attachments!", {
            position: toast.POSITION.TOP_CENTER,
          });
          break;
        }

        let file = {
          path: (window.URL || window.webkitURL).createObjectURL(
            new Blob([InputFile.files[i]], { type: InputFile.files[i].type })
          ),
          file: InputFile.files[i],
          name: InputFile.files[i].name,
          type: InputFile.files[i].name.split(".").pop(),
          size: InputFile.files[i].size / 1000,
        };

        if (
          file.type === "png" ||
          file.type === "jpg" ||
          file.type === "jpeg" ||
          file.type === "gif"
        ) {
          file.id = images.length;
          images.push(file);
        }

        if (
          file.type === "txt" ||
          file.type === "pdf" ||
          file.type === "docx" ||
          file.type === "zip" ||
          file.type === "doc"
        ) {
          file.id = files.length;
          files.push(file);
        }

        if (file.type === "mp3") {
          file.id = sounds.length;
          let audioData = await getAudioBufferData(file.path);
          let duration = audioData.duration;
          let recordLine = audioData.recordLine;
          sounds.push({ ...file, duration, recordLine });
        }

        counter++;
      }

      InputFile.value = null;
    }

    if (paste) {
      if (counter > 9) {
        toast.error("Max upload 10 attachment!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        let file = {
          id: images.length,
          path: (window.URL || window.webkitURL).createObjectURL(
            new Blob([e], { type: e.type })
          ),
          file: e,
          name: e.name,
          type: e.name.split(".").pop(),
        };

        images.push(file);
      }
    }

    if (drag) {
      for (let i = 0; i < e.length; i++) {
        if (counter > 9) {
          toast.error("Max upload 10 attachment!", {
            position: toast.POSITION.TOP_CENTER,
          });
          break;
        }

        let file = {
          path: (window.URL || window.webkitURL).createObjectURL(
            new Blob([e[i]], { type: e[i].type })
          ),
          file: e[i],
          name: e[i].name,
          type: e[i].name.split(".").pop(),
          size: e[i].size / 1000,
        };

        if (
          file.type === "png" ||
          file.type === "jpg" ||
          file.type === "jpeg" ||
          file.type === "gif"
        ) {
          file.id = images.length;
          images.push(file);
        }

        if (
          file.type === "txt" ||
          file.type === "pdf" ||
          file.type === "docx" ||
          file.type === "zip" ||
          file.type === "doc"
        ) {
          file.id = files.length;
          files.push(file);
        }

        if (file.type === "mp3") {
          file.id = sounds.length;
          sounds.push(file);
        }

        counter++;
      }
    }

    this.setState({ sounds, files, images });
  }
  render() {
    return (
      <>
        <div className="message-container  container-fluid">
          <Scrollbars
            onScroll={() => {
              this.onScroll();
            }}
            ref={(ref) => {
              this.messagesBlock = ref;
            }}
            renderTrackVertical={(props) => <div className="track-vertical" />}
            renderThumbVertical={(props) => <div className="thumb-vertical" />}
            className="dialog-wrap scroll"
            autoHide
          >
            <img
              src={LoadGif}
              id="load-message-gif"
              className="load-message"
              alt=""
            />
            <div className="mt-auto"></div>

            {!!this.props.dialog.messages.length &&
              this.props.dialog.messages.map((message, index, messages) => {
                let prevMessage = messages[index - 1]
                  ? messages[index - 1]
                  : false;
                return (
                  <Message
                    key={message._id}
                    index={index}
                    scrollingMessage={this.state.setCordMessageScroll}
                    user={this.props.user}
                    scrollTo={(top) => {
                      this.scrollTo(top);
                    }}
                    retrySendMessage={this.retrySendMessage.bind(this)}
                    setRecentMessage={this.setRecentMessage.bind(this)}
                    deleteLocalMessage={this.deleteLocalMessage.bind(this)}
                    prevMessage={prevMessage}
                    message={message}
                  ></Message>
                );
              })}
            {!this.props.dialog.messages.length && (
              <div className="messages-block">
                <div className="col pl-0 avatar-message"></div>
                <div className="col row pl-0">
                  <div className="col-12">Сообщений еще небыло</div>
                </div>
              </div>
            )}
            {this.props.dialog.typing && (
              <div className="messages-block">
                <div className="col pl-0 avatar-message"></div>
                <div className="col row pl-0">
                  <div className="col-12 reading-status">
                    {this.props.dialog.user.name.last}&#8194;
                    {this.props.dialog.user.name.first} печатает
                  </div>
                </div>
              </div>
            )}
          </Scrollbars>
          <ScrollBottom
            scrollToBottom={() => {
              this.scrollToBottom();
            }}
          />
        </div>
        <div className="container-fluid">
          <div className="message-panel ">
            {this.state.recentMessage && (
              <RecentMessage message={this.state.recentMessage} />
            )}
            <div className="panel">
              {!this.state.isRecord && (
                <PanelStandart
                  ref={this.inputPanel}
                  recordStart={() => {
                    this.setState({ isRecord: true });
                  }}
                  addFile={this.addFile.bind(this)}
                  sendMessage={this.sendMessage.bind(this)}
                  typing={this.typing.bind(this)}
                />
              )}
              {this.state.isRecord && (
                <>
                  <PanelRecord
                    addVoiceSound={this.addVoiceSound.bind(this)}
                    stopRec={() => {
                      this.setState({ isRecord: false });
                    }}
                    sendMessage={this.sendMessage.bind(this)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    dialogs: state.dialogs,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dialogsActions: bindActionCreators(dialogsActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
