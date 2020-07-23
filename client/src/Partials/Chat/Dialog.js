import React from "react";
import Message from "./Message";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransitionGroup } from "react-transition-group";
import SocketController from "../../controllers/SocketController";
import PanelRecord from "../../Partials/Chat/InputPanel/PanelRecord";
import PanelStandart from "../../Partials/Chat/InputPanel/PanelStandart";
import RecentMessage from "./RecentMessage";
import ProgressBar from "../../Elements/ProgressBar";
import Fancybox from "../../Elements/Fancybox.js";
import { toast } from "react-toastify";
import api from "../../config/api";
//Redux
import { connect } from "react-redux";
import * as dialogsActions from "../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import ArrowDown from "../../img/arrowDownperple.svg";
import LoadGif from "../../img/load.gif";
import { getAudioBufferData } from "../../controllers/FunctionsController";
import documentSvg from "../../img/document.svg";
import musicSvg from "../../img/music.svg";
import attachDelete from "../../img/attachDelete.svg";
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
    this.canLoadAttach = true;
  }
  state = {
    scrollTop: 0,
    canTyping: true,
    voiceSound: false,
    isRecord: false,
    setCordMessageScroll: false,
    //Отвеченные сообщения
    recentMessage: false,
    sounds: [],
    files: [],
    images: [],
    loadingFiles: [],
    dataFancybox: {
      images: false,
      index: false,
    },
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
      voiceSound = {
        path: URL.createObjectURL(data),
        file: data,
        name: "Аудиозапись",
        duration: duration,
        recordLine: recordLine,
        type: "mp3",
        size: data.size,
      };
    }
    this.setState({ voiceSound });
    return Promise.resolve();
  }
  recursiveLoad() {
    let file = false;
    if (this.state.loadingFiles.length) file = this.state.loadingFiles[0].file;
    if (file) {
      this.canLoadAttach = false;
      let xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.upload.onprogress = (event) => {
        this.setState({
          loadingFiles: this.state.loadingFiles.map((item, index) => {
            if (item.file.name == file.name) {
              item.percentage = (event.loaded / event.total) * 100;
              return item;
            } else return item;
          }),
        });
      };
      xhr.onerror = xhr.onabort = (e) => {
        this.setState({
          loadingFiles: this.state.loadingFiles.filter(
            (item) => {
              return item.file.name !== file.name;
            },
            () => {
              this.canLoadAttach = true;
            }
          ),
        });
      };
      xhr.onload = (e) => {
        this.setState(
          {
            loadingFiles: this.state.loadingFiles.filter((item) => {
              return item.file.name !== file.name;
            }),
          },
          async () => {
            await this.addFile(e.target.response, file);
            this.canLoadAttach = true;
            this.recursiveLoad();
          }
        );
      };

      xhr.open("POST", `${api.urlApi}/api/dialog/load-file`, true);
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${this.props.user.apiToken}`
      );
      var formData = new FormData();
      formData.append("file", file);
      xhr.send(formData);
    }
  }
  loadFiles(e) {
    let sounds = [...this.state.sounds];
    let files = [...this.state.files];
    let images = [...this.state.images];
    let InputFile = e.target;
    let counter = sounds.length + files.length + images.length;
    let newFiles = [];
    for (let i = 0; i < InputFile.files.length; i++) {
      if (counter > 9) {
        toast.error("Max upload 10 attachments!", {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      }
      newFiles.push({
        file: InputFile.files[i],
        percentage: 0,
      });
      counter++;
      this.setState(
        {
          loadingFiles: [...this.state.loadingFiles, ...newFiles],
        },
        () => {
          if (this.canLoadAttach) this.recursiveLoad();
        }
      );
    }
  }
  async addFile(fileUrl, fileBlob) {
    let sounds = [...this.state.sounds];
    let files = [...this.state.files];
    let images = [...this.state.images];
    fileUrl.type = fileBlob.name.split(".").pop();
    if (
      fileUrl.type === "png" ||
      fileUrl.type === "jpg" ||
      fileUrl.type === "jpeg" ||
      fileUrl.type === "gif"
    ) {
      fileUrl.id = images.length;
      images.push(fileUrl);
    }

    if (
      fileUrl.type === "txt" ||
      fileUrl.type === "pdf" ||
      fileUrl.type === "docx" ||
      fileUrl.type === "zip" ||
      fileUrl.type === "doc"
    ) {
      fileUrl.id = files.length;
      files.push(fileUrl);
    }

    if (fileUrl.type === "mp3") {
      fileUrl.id = sounds.length;
      let audioData = await getAudioBufferData(
        (window.URL || window.webkitURL).createObjectURL(
          new Blob([fileBlob], { type: fileBlob.type })
        )
      );
      let duration = audioData.duration;
      let recordLine = audioData.recordLine;
      sounds.push({ ...fileUrl, duration, recordLine });
    }
    this.setState({ sounds, files, images }, () => {
      return Promise.resolve();
    });
  }
  addImageToFancyBox(images, index) {
    this.setState({
      dataFancybox: {
        images,
        index,
      },
    });
  }
  render() {
    return (
      <>
        <div className="message-container">
          <div className="dialog-wrap">
            <Scrollbars
              onScroll={() => {
                this.onScroll();
              }}
              ref={(ref) => {
                this.messagesBlock = ref;
              }}
              renderTrackVertical={(props) => (
                <div className="track-vertical" />
              )}
              renderThumbVertical={(props) => (
                <div className="thumb-vertical" />
              )}
              className="dialog scroll"
              autoHide
            >
              <img
                src={LoadGif}
                id="load-message-gif"
                className="load-message"
                alt=""
              />

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
                      addImageToFancyBox={this.addImageToFancyBox.bind(this)}
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

              <div className="dialog-typers">
                <div
                  className="messages-block"
                  style={{
                    height: "21px",
                  }}
                >
                  {this.props.dialog.typing && (
                    <>
                      <div className="avatar-message d-flex"></div>
                      <div className="col dialog-content">
                        <div className="message-content">
                          <div className="reading-status">
                            {this.props.dialog.user.name.last}&#8194;
                            {this.props.dialog.user.name.first} печатает
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Scrollbars>
          </div>
          <ScrollBottom
            scrollToBottom={() => {
              this.scrollToBottom();
            }}
          />
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
                  isContent={
                    !!this.state.sounds.length ||
                    !!this.state.images.length ||
                    !!this.state.files.length
                  }
                  loadFiles={this.loadFiles.bind(this)}
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
            <div
              className="filesAttach"
              style={{
                height:
                  !!this.state.images.length ||
                  !!this.state.files.length ||
                  !!this.state.sounds.length ||
                  !!this.state.loadingFiles.length
                    ? "250px"
                    : "",
              }}
            >
              <Scrollbars
                renderTrackVertical={(props) => (
                  <div className="track-vertical" />
                )}
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical" />
                )}
                renderTrackHorizontal={(props) => (
                  <div
                    {...props}
                    className="track-horizontal"
                    style={{ display: "none" }}
                  />
                )}
                renderThumbHorizontal={(props) => (
                  <div
                    {...props}
                    className="thumb-horizontal"
                    style={{ display: "none" }}
                  />
                )}
                autoHide
              >
                <div className="loading-area">
                  {this.state.loadingFiles.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="attach-item">
                          <ProgressBar percent={item.percentage} />
                          <span className="file-name">{item.file.name}</span>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="images-area attath-area">
                  {this.state.images.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="attach-item">
                          <img
                            src={item.path}
                            className="image-message"
                            alt=""
                          />
                          <img
                            className="attachDelete"
                            onClick={() => {
                              this.setState({
                                images: this.state.images.filter(
                                  (item, indexR) => {
                                    return indexR != index;
                                  }
                                ),
                              });
                            }}
                            src={attachDelete}
                            alt="attachDelete"
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="sounds-area attath-area">
                  {this.state.sounds.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="attach-item">
                          <img
                            className="typeImg"
                            src={musicSvg}
                            alt="musicSvg"
                          />
                          <span className="file-name">{item.name}</span>
                          <img
                            className="attachDelete"
                            onClick={() => {
                              this.setState({
                                sounds: this.state.sounds.filter(
                                  (item, indexR) => {
                                    return indexR != index;
                                  }
                                ),
                              });
                            }}
                            src={attachDelete}
                            alt="attachDelete"
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="files-area attath-area">
                  {this.state.files.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="attach-item">
                          <img className="typeImg" src={documentSvg} alt="" />
                          <div>
                            <div className="file-name">{item.name}</div>
                            <div className="file-size">
                              {item.size > 1048576
                                ? Math.floor(item.size / 1048576) + "Мб."
                                : Math.floor(item.size / 1024) + "Кб."}
                            </div>
                          </div>
                          <img
                            className="attachDelete"
                            src={attachDelete}
                            onClick={() => {
                              this.setState({
                                files: this.state.files.filter(
                                  (item, indexR) => {
                                    return indexR != index;
                                  }
                                ),
                              });
                            }}
                            alt="attachDelete"
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </Scrollbars>
            </div>
          </div>
        </div>
        <CSSTransitionGroup
          transitionName="fancybox-animation"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.state.dataFancybox.images && (
            <Fancybox
              close={() => {
                this.setState({
                  dataFancybox: { images: false, index: false },
                });
              }}
              images={this.state.dataFancybox.images}
              index={this.state.dataFancybox.index}
            />
          )}
        </CSSTransitionGroup>
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
