// App
import React from "react";
import reviews from "../../../config/reviewstest.js";
import { LastMessageDate } from "../../../controllers/TimeController";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as dialogsActions from "../../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import Avatar from "../../../Elements/Avatar";
class Dialog extends React.Component {
  render() {
    // if (this.props.dialog.type === 1)
    //   return (
    //     <div className="dialog">
    //       <div className="row">
    //         <div className="col-12 col-sm with-article">
    //           <div className="f-14">заказ №{this.props.dialog.article}</div>
    //           <div className="f-12">{this.props.dialog.city}</div>
    //         </div>
    //         <div
    //           className="px-3 f-14 d-flex"
    //           style={{
    //             whiteSpace: "pre-line",
    //             maxWidth: "90px",
    //           }}
    //         >
    //           <img
    //             src={reviews[0].user.avatar}
    //             className="user-avatar"
    //             alt="avatar"
    //           />
    //         </div>
    //         <div className="col f-14 pl-0 row dialog-content">
    //           <div className="head">
    //             <div className="px-3 dialog-user-name">
    //               {this.props.dialog.name}
    //             </div>
    //             <div
    //               className="px-3 text-right f-14"
    //               style={{
    //                 color: "#6C6C6C",
    //               }}
    //             >
    //               {this.props.dialog.time}
    //             </div>
    //           </div>
    //           <div
    //             className={`col-12 mt-2 last-message ${
    //               this.props.dialog.last_message.isread ? "" : "unread"
    //             }`}
    //           >
    //             <div className="text">
    //               <span className="col f-14">
    //                 <Link to="/dialog/1">
    //                   {!this.props.dialog.last_message.user && <> Вы:&nbsp;</>}
    //                   {this.props.dialog.last_message.text}
    //                 </Link>
    //                 {this.props.dialog.last_message.user &&
    //                   !this.props.dialog.last_message.isread && (
    //                     <span className="counter">123</span>
    //                   )}
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <hr />
    //     </div>
    //   );
    // if (this.props.dialog.type === 2)
    return (
      <div
        className={`dialog  ${
          this.props.dialog.lastMessage.user._id === this.props.user._id
            ? "your"
            : "other"
        } ${!this.props.dialog.lastMessage.isRead ? "unread" : ""}`}
      >
        <div className="row">
          <div
            className="pl-3 pr-1 f-14 d-flex"
            style={{
              whiteSpace: "pre-line",
              maxWidth: "90px",
            }}
          >
            <Avatar />
          </div>
          <div className="col f-14 dialog-content">
            <div className="head">
              <div className="f-14 dialog-user-name">
                {this.props.dialog.user.name.last}{" "}
                {this.props.dialog.user.name.first}
              </div>
              <div
                className="f-14"
                style={{
                  color: "#6C6C6C",
                }}
              >
                {LastMessageDate(this.props.dialog.lastMessage.createdAt)}
              </div>
            </div>
            <div className="last-message">
              {!this.props.dialog.typing &&
                this.props.dialog.lastMessage.user._id ===
                  this.props.user._id && <> Вы:&nbsp;</>}
              {!this.props.dialog.typing && (
                <>{this.props.dialog.lastMessage.text}</>
              )}
              {this.props.dialog.typing && (
                <div className="reading-status">печатает</div>
              )}
              {this.props.dialog.lastMessage.user._id !== this.props.user._id &&
                !!this.props.dialog.noRead && (
                  <span className="counter">{this.props.dialog.noRead}</span>
                )}
              <Link
                className="sharected-link"
                to={`/dialog/${this.props.dialog.user._id}`}
              ></Link>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
    return <></>;
  }
}

class Messages extends React.Component {
  state = {
    currentStatus: "",
  };
  componentDidMount() {
    this.setState({ currentStatus: this.props.tab ? this.props.tab : "all" });
    if (!this.props.dialogs.getted)
      this.props.dialogsActions.dialogsGet(this.props.user.apiToken);
  }

  render() {
    return (
      <div className="article-page">
        <div className="container-fluid">
          <h2 className="title">
            {this.state.currentStatus === 2 ||
            this.state.currentStatus === "all"
              ? "Сообщения"
              : "Сообщения по заказам/предложениям"}
          </h2>
          <div className="tab_groups">
            <span
              className={`tab_group ${
                this.state.currentStatus === "all" ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ currentStatus: "all" });
              }}
            >
              Все
              {!!this.props.dialogs.noReadCount && (
                <div className="action-counter">
                  <span>{this.props.dialogs.noReadCount}</span>
                </div>
              )}
            </span>
            <span
              className={`tab_group ${
                this.state.currentStatus === 1 ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ currentStatus: 1 });
              }}
            >
              По заказам /предложениям
            </span>
            <span
              className={`tab_group ${
                this.state.currentStatus === 2 ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ currentStatus: 2 });
              }}
            >
              От пользователей
            </span>
          </div>
        </div>

        {!!this.props.dialogs.getted && (
          <div className="articles-block full">
            <div className="dialogs-block">
              <div className="container-fluid">
                {this.props.dialogs.dialogs.map((dialog, index) => {
                  // if (
                  //   item.type === this.state.currentStatus ||
                  //   this.state.currentStatus === "all"
                  // )
                  return !!dialog.lastMessage ? (
                    <Dialog
                      key={index}
                      user={this.props.user}
                      dialog={dialog}
                    />
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
