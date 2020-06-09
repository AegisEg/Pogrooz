import React from "react";
import Message from "./Message";
import InputPanel from "./InputPanel/InputPanel";
import TimeTag from "./TimeTag";
import ArrowDown from "../../img/arrowDownperple.svg";
import { Scrollbars } from "react-custom-scrollbars";

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;
let waitActiveUser = false;

class Dialog extends React.Component {
  state = {
    showFabToBottom: false,
    activePage: false,
    scrollTop: 0,
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
        // if (!!this.props.unRead.length) {
        //   this.props.readMessages();
        // }
      }
    }

    if (
      this.props.type === "room" &&
      this.props.rooms.activeRoom.canLoad &&
      this.messagesBlock.getScrollTop() < 100
    ) {
      this.props.loadMessages();
    }

    if (
      this.props.type === "dialog" &&
      this.props.dialog.canLoad &&
      this.messagesBlock.getScrollTop() < 100
    ) {
      this.props.loadMessages();
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
    //&& !!this.props.unRead.length
    if (!this.state.activePage && active) {
      if (waitActiveUser) clearTimeout(waitActiveUser);

      // this.props.readMessages();
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
  }
  componentWillUnmount() {
    window.removeEventListener("blur", this.blurPage.bind(this));
    window.removeEventListener("mousemove", this.focusPage.bind(this));
  }
  render() {
    return (
      <>
        <div className="message-container">
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
            <div className="mt-auto"></div>
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <TimeTag  />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <TimeTag />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <Message
              isAva={true}
              isHead={true}
              message={{
                text: `Текст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и коТекст отзыва Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Давно выяснено, что при оценке дизайна и ко`,
                time: "12.02",
                user: {
                  name: "Максим Максимов",
                },
              }}
            />
            <div className="messages-block">
              <div className="col pl-0 avatar-message"></div>
              <div className="col row pl-0">
                <div className="col-12 reading-status">
                  Максим Максимов печатает
                </div>
              </div>
            </div>
          </Scrollbars>
          <div
            className={`scroll-to-bottom ${
              this.state.showFabToBottom ? "active" : ""
            }`}
            onClick={() => {
              this.scrollToBottom();
            }}
          >
            <img src={ArrowDown} alt="ArrowDown" />
          </div>
        </div>
        <InputPanel />
      </>
    );
  }
}

export default Dialog;
