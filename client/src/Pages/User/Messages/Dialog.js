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
import Meta from "../../../Elements/Meta";
import Loading from "../../../Elements/Loading";
class Messages extends React.Component {
  state = {
    isFetching: true,
  };
  componentDidMount() {
    let dialogs = this.props.dialogs.dialogsUser;

    if (
      !dialogs.dialogs.find(
        (dialog) => dialog.user._id === this.props.match.params.id
      )
    ) {
      this.props.dialogsActions
        .dialogGet(this.props.match.params.id, this.props.user.apiToken)
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
          (dialog) => dialog.user._id === this.props.match.params.id
        ).isGetted
      )
        this.props.dialogsActions.dialogLoad(
          this.props.match.params.id,
          this.props.user.apiToken
        );
      this.setState({ isFetching: false });
    }
  }
  render() {
    let dialog = this.props.dialogs.dialogsUser.dialogs.find((dialog) => {
      return dialog.user._id === this.props.match.params.id;
    });

    return (
      <>
        <Loading isLoading={this.state.isFetching} />
        {dialog && !dialog.isNotFound && (
          <div className="article-page">
            <Meta
              keyMeta="dialog"
              options={{
                userName: dialog.user.name.last + " " + dialog.user.name.first,
              }}
            ></Meta>
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
                    <Link
                      to={`/user/${dialog.user._id}`}
                      className="username-dialog"
                    >
                      {dialog.user.name.last} {dialog.user.name.first}{" "}
                      {dialog.user.name.middle}
                    </Link>
                  </span>
                  <span className="online">
                    {!dialog.user.online && (
                      <>{OnlineDate(dialog.user.onlineAt)}</>
                    )}
                    {dialog.user.online && <>online</>}
                  </span>
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
