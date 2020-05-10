// App
import React from "react";
import configApi from "../../config/api";
import { toast } from "react-toastify";

// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";
import SideNav from "../../Partials/SideNav";

// Redux
import { connect } from "react-redux";
import CheckBox from "../../Elements/CheckBox";
import Select from "../../Elements/Select";

class Notifications extends React.Component {
  state = {
   
  };

  render() {
    return (
      <div>
        <h2 className="title">Уведомления</h2>
        <div className="row">
          фывфыв
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

export default connect(mapStateToProps)(Notifications);
