// App
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Chat from "../../../Partials/Chat/Dialog";
import { withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import * as dialogsActions from "../../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import { OnlineDate } from "../../../controllers/TimeController";
class Messages extends React.Component {
  componentDidMount() {
    if (
      !this.props.dialogs.dialogs.find(
        (dialog) => dialog.user._id === this.props.match.params.id
      )
    ) {
      this.props.dialogsActions.dialogGet(
        this.props.match.params.id,
        this.props.user.apiToken
      );
    } else {
      this.props.dialogsActions.updateOnline(
        this.props.match.params.id,
        this.props.user.apiToken
      );
      if (
        !this.props.dialogs.dialogs.find(
          (dialog) => dialog.user._id === this.props.match.params.id
        ).getted
      )
        this.props.dialogsActions.dialogLoad(
          this.props.match.params.id,
          this.props.user.apiToken
        );
    }
  }
  render() {
    let dialog = this.props.dialogs.dialogs.find(
      (dialog) => dialog.user._id === this.props.match.params.id
    );
    return (
      <>
        {dialog && !dialog.isNotFound && (
          <div className="article-page">
            <div className="container-fluid">
              <h2 className="title">Сообщения</h2>
              <div className="chat-header mt-3">
                <div className="mb-1">
                  <Link
                    className="href left-angle f-14 angle-go"
                    to="/"
                    style={{
                      maxWidth: "50px",
                      marginLeft: "20px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (this.props.lastLocation) {
                        this.props.history.push(
                          this.props.lastLocation.pathname
                        );
                      } else {
                        this.props.history.push("/messages");
                      }
                    }}
                  >
                    Назад
                  </Link>
                  <span className="f-18 text-left mr-3">
                    {dialog.user.name.last} {dialog.user.name.first}{" "}
                    {dialog.user.name.middle}
                  </span>
                  <span className="online">
                    {!dialog.user.online && (
                      <p className="last-message">
                        {OnlineDate(dialog.user.onlineAt)}
                      </p>
                    )}
                    {dialog.user.online && (
                      <p className="last-message" style={{ color: "#35E551" }}>
                        online
                      </p>
                    )}
                  </span>
                </div>
                {/* <div className="row description-chat">
                  <div
                    className="col f-14"
                    style={{
                      maxWidth: "135px",
                    }}
                  >
                    заказ №12134
                  </div>
                  <div className="col-12 col-sm f-14">
                    Россия, Ленинградская область, г Пушкин, улица Бойко, 123
                  </div>
                  <div
                    className="col"
                    style={{
                      maxWidth: "128px",
                    }}
                  >
                    <Link className="f-12 href" to="/">
                      Подробнее
                      <img
                        className="ml-2"
                        src={ArrowDown}
                        width="10"
                        height="7"
                        alt="ArrowDown"
                      />
                    </Link>
                  </div>
                </div> */}
                <hr />
              </div>
            </div>
            <Chat
              unRead={dialog.messages.filter(
                (x) => !x.isRead && x.user._id !== this.props.user._id
              )}
              loading={dialog && !dialog.getted}
              dialog={dialog}
            />
          </div>
        )}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withLastLocation(Messages)));
