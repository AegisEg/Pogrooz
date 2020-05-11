// App
import React from "react";
import CheckBox from "../../Elements/CheckBox";

// Redux
import { connect } from "react-redux";
var settingsField = [
  {
    lable: "Новая заявка",
    role: "carrier",
    key: "offer_new_request",
    type: "offer",
  },
  {
    lable: "Вашу заявку подтвердили",
    role: "cargo",
    key: "offer_you_request_moderation",
    type: "offer",
  },
  {
    lable: "Смена статуса предложения",
    role: "all",
    key: "offer_status",
    type: "offer",
  },
  {
    lable: "Новый отзыв",
    role: "all",
    key: "offer_new_review",
    type: "offer",
  },
  {
    lable: "Сообщение по предложению",
    role: "all",
    key: "offer_new_message",
    type: "offer",
  },
];
class NotificationsSettings extends React.Component {
  render() {
    return (
      <div>
        <h2 className="title">Настроить уведомления</h2>
        <div className="row">
          <div className="col-6">
            <p>По предложениям</p>
            <div className="row user-settings">
              {settingsField.map((item) => {
                if (
                  item.type == "offer" &&
                  (this.props.user.role == item.role || item.role == "all")
                ) {
                  return (
                    <>
                      <div className="col-6 filed-label">{item.lable}</div>
                      <div className="col-6 fields-checkbox">
                        <span>
                          <CheckBox
                            id={`${item.key}-mail`}
                            name={`${item.key}-mail`}
                            text="На почту"
                            labelClass="ml-2"
                          />
                        </span>
                        <span>
                          <CheckBox
                            id={`${item.key}-push`}
                            name={`${item.key}-push`}
                            text="Push-уведомления"
                            labelClass="ml-2"
                          />
                        </span>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    // userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps)(NotificationsSettings);
