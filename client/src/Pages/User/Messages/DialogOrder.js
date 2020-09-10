// App
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Chat from "../../../Partials/Chat/Dialog";
import NoMatch from "../../NoMatch";
import { withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import * as dialogsActions from "../../../redux/actions/dialogs";
import { bindActionCreators } from "redux";
import { OnlineDate } from "../../../controllers/TimeController";
import ArrowDown from "../../../img/arrowDownperple.svg";
import Loading from "../../../Elements/Loading";
class Messages extends React.Component {
  state = {
    isFetching: true,
  };
  componentDidMount() {
    let dialogs = this.props.dialogs.dialogsOrder;
    if (
      !dialogs.dialogs.find(
        (dialog) =>
          dialog.user._id === this.props.match.params.id &&
          dialog.orderId._id === this.props.match.params.order
      )
    ) {
      this.props.dialogsActions
        .dialogOrderGet(
          this.props.match.params.id,
          this.props.match.params.order,
          this.props.user.apiToken
        )
        .then(() => {
          this.setState({ isFetching: false });
        });
    } else {
      this.props.dialogsActions.updateOnline(
        this.props.match.params.id,
        this.props.user.apiToken
      );
      if (
        !dialogs.dialogs.find(
          (dialog) =>
            dialog.user._id === this.props.match.params.id &&
            dialog.orderId._id === this.props.match.params.order
        ).isGetted
      )
        this.props.dialogsActions.dialogOrderLoad(
          this.props.match.params.id,
          this.props.match.params.order,
          this.props.user.apiToken
        );
      this.setState({ isFetching: false });
    }
  }
  render() {
    let dialog = this.props.dialogs.dialogsOrder.dialogs.find(
      (dialog) => dialog.user._id === this.props.match.params.id
    );
    return (
      <>
        <Loading isLoading={this.state.isFetching} />
        {dialog && !dialog.isNotFound && (
          <div className="article-page">
            <div className="container-fluid">
              <h2 className="title">Сообщения</h2>
              <div className="chat-header mt-3">
                <div className="mb-1">
                  <Link
                    className="href hover left-angle f-14 angle-go"
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
                  <span className="d-inline-block f-18 text-left mr-3">
                    {dialog.user.name.last} {dialog.user.name.first}{" "}
                    {dialog.user.name.middle}
                  </span>
                  <span className="online">
                    {!dialog.user.online && (
                      <>{OnlineDate(dialog.user.onlineAt)}</>
                    )}
                    {dialog.user.online && <>online</>}
                  </span>
                </div>
                <div className="row description-chat">
                  <div
                    className="col f-14"
                    style={{
                      maxWidth: "135px",
                    }}
                  >
                    {dialog.orderId.type === "offer" ? "Предложение" : "Заказ"}№
                    {dialog.orderId.articleId}
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
                </div>
                <hr />
              </div>
            </div>
            <Chat
              unRead={dialog.messages.filter(
                (x) => !x.isRead && x.user._id !== this.props.user._id
              )}
              loading={dialog && !dialog.isGetted}
              dialog={dialog}
            />
          </div>
        )}
        {!this.state.isFetching && (!dialog || dialog.isNotFound) && (
          <NoMatch />
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
