import React from "react";
import Message from "./Message";
import { Scrollbars } from "react-custom-scrollbars";
import SocketController from "../../controllers/SocketController";
import PanelRecord from "../../Partials/Chat/InputPanel/PanelRecord";
import PanelStandart from "../../Partials/Chat/InputPanel/PanelStandart";
import RecentMessage from "./RecentMessage";
//Redux
import { connect } from "react-redux";
import * as dialogsActions from "../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import ArrowDown from "../../img/arrowDownperple.svg";
import LoadGif from "../../img/load.gif";

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;
let waitActiveUser = false;
let waitFastRead = false;
let viktoryInterval = 0;
class ScrollBottom extends React.Component {
  render() {
    return (
      <div
        className={`scroll-to-bottom ${
          this.props.showFabToBottom ? "active" : ""
        }`}
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
  }
  state = {
    showFabToBottom: false,
    activePage: false,
    scrollTop: 0,
    canTyping: true,
    recentMessage: false,
    sounds: [],
    files: [],
    images: [],
    isRecord: false,
    setCordMessageScroll: false,
  };
  onScroll() {
    this.setState({
      scrollTop:
        this.messagesBlock.getScrollHeight() -
        this.messagesBlock.getScrollTop(),
    });
    if (
      this.messagesBlock.getScrollTop() + this.messagesBlock.getClientHeight() <
      this.messagesBlock.getScrollHeight() - 100
    ) {
      if (!this.state.showFabToBottom) this.setState({ showFabToBottom: true });
    } else {
      if (this.state.showFabToBottom) {
        this.setState({ showFabToBottom: false });
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
    this.loadMessages();
    viktoryInterval = setInterval(() => {
      if (!this.props.dialogs.isLoading) {
        clearInterval(viktoryInterval);
        this.scrollTo(top);
      }
    }, 1000);
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
      }
    } else this.loadToVictory(top);
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
    if (!this.state.activePage && active && !!this.props.unRead.length) {
      if (waitActiveUser) clearTimeout(waitActiveUser);

      this.readMessages();
      this.setState({ activePage: true });

      waitActiveUser = setTimeout(() => {
        this.setState({ activePage: false });
      }, 3000);
    }
  }
  blurPage() {
    this.setState({ activePage: false });
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
      if (this.state.activePage) {
        this.readMessages();
      }

      this.scrollToBottom();

      if (this.state.showFabToBottom) this.setState({ showFabToBottom: false });
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
  loadMessages() {
    this.props.dialogsActions.loadMessages(
      { dialogId: this.props.dialog._id },
      this.props.user.apiToken
    );
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
    if (
      /\S/.test(text) ||
      !!this.state.images.length ||
      !!this.state.files.length ||
      !!this.state.sounds.length
    ) {
      let drafts = { ...JSON.parse(localStorage.getItem("drafts")) };
      delete drafts["draft-" + this.props.dialog._id];
      localStorage.setItem("drafts", JSON.stringify(drafts));
      this.props.dialogsActions.sendMessage(
        {
          text: text,
          userId: this.props.dialog.user._id,
          images: this.state.images,
          files: this.state.files,
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
        recentMessage: false,
      });
      this.inputPanel.current.setText("");
    }
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
              className={`load-message ${
                this.props.dialog.isLoading ? "active" : ""
              }`}
              alt=""
            />
            <div className="mt-auto"></div>

            {!!this.props.dialog.messages.length &&
              this.props.dialog.messages.map((message, index, messages) => {
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
                    messages={messages}
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
            showFabToBottom={this.state.showFabToBottom}
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
                  sendMessage={(text) => {
                    this.sendMessage(text);
                  }}
                  typing={(newText, prevText) => {
                    this.typing(newText, prevText);
                  }}
                />
              )}
              {this.state.isRecord && (
                <>
                  <PanelRecord
                    stopRec={() => {
                      this.setState({ isRecord: false });
                    }}
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
