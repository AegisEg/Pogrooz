// App
import React from "react";
import configApi from "../../config/api";
import { toast } from "react-toastify";

// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";
import SideNav from '../../Partials/SideNav'

// Redux
import { connect } from 'react-redux'

class Profile extends React.Component {
  state = {
    firstName: this.props.user.firstName,
    middleName: this.props.user.middleName,
    lastName: this.props.user.lastName
  };

  render() {
    return (
        <div>
          <h2 className="title">Профиль (
              {this.props.user.type === 'cargo' && 'Грузовладелец'}
              {this.props.user.type === 'carrier' && 'Перевозчик'}
            )
          </h2>

          <div className="row">
            <div className="col-md-4"><Input type="text" placeholder="Имя *" value={this.state.firstName} onChange={(e) => {this.setState({firstName: e.target.value})}} /></div>
            <div className="col-md-4"><Input type="text" placeholder="Фамилия *" value={this.state.middleName} onChange={(e) => {this.setState({middleName: e.target.value})}} /></div>
            <div className="col-md-4"><Input type="text" placeholder="Отчество *" value={this.state.lastName} onChange={(e) => {this.setState({lastName: e.target.value})}} /></div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
      // userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps)(Profile)
