// App
import React from "react";

import Notification from "../../Elements/Notification";

// Redux
import { connect } from "react-redux";
var notifications = [
  {
    id: 1,
    idItem: "",
    type: "system",
    date:"10.05.2020 12:36",
    readble:1
  },
  {
    id: 2,
    idItem: "",
    type: "system",
    date:"10.05.2020 12:36",
    readble:1
  },
];
class Notifications extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h2 className="title">Уведомления</h2>        
          {notifications.map((item) => {
            return <Notification notification={item} />;
          })}
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

export default connect(mapStateToProps)(Notifications);
