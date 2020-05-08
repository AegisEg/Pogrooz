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
import CheckBox from "../../Elements/CheckBox";
import Select from "../../Elements/Select";

class Profile extends React.Component {
  state = {
    firstName: this.props.user.firstName,
    middleName: this.props.user.middleName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    phone: this.props.user.phone,
    password: ''
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

            <div className="col-md-6">
              <h4 className="subtitle">Контактные данные *</h4>
              <Input type="text" placeholder="Телефон *" style={{marginBottom: 12}} value={this.state.phone} onChange={(e) => {this.setState({firstName: e.target.value})}} />
              <Input type="text" placeholder="Email *" value={this.state.email} onChange={(e) => {this.setState({firstName: e.target.value})}} />
            </div>

            <div className="col-md-6">
              <h4 className="subtitle">Фотография</h4>
            </div>

            <div className="col-md-6">
              <h4 className="subtitle">Адрес *</h4>
              <Select
                  type="text"
                  placeholder="Откуда"
                  getRef={() => {}}
              />
              <Select
                  type="text"
                  placeholder="Откуда"
                  getRef={() => {}}
              />
              <Input type="text" placeholder="Россия *" value={this.state.email} onChange={(e) => {this.setState({firstName: e.target.value})}} />
            </div>

            <div className="col-md-3">
              <h4 className="subtitle">Безопасность</h4>
              <Input type="password" placeholder="Старый пароль" value={this.state.password} style={{paddingRight: 50, marginBottom: 12}} onChange={(e) => {this.setState({password: e.target.value})}} />
              <Input type="password" placeholder="Новый пароль" value={this.state.password} style={{paddingRight: 50, marginBottom: 12}} onChange={(e) => {this.setState({password: e.target.value})}} />
              <Input type="password" placeholder="Подтверждение пароля" value={this.state.password} style={{paddingRight: 50}} onChange={(e) => {this.setState({password: e.target.value})}} />
            </div>

            <div className="col-md-3">
              <h4 className="subtitle">Заключение договора</h4>
              <div style={{marginBottom: 8}}>
                  <CheckBox id="phyz" text="Физ лицо"></CheckBox>
              </div>
              <div style={{marginBottom: 8}}>
                  <CheckBox id="ooo" text="ООО"></CheckBox>
              </div>
              <div style={{marginBottom: 8}}>
                  <CheckBox id="ip" text="ИП"></CheckBox>
              </div>
              <div style={{marginBottom: 8}}>
                  <CheckBox id="single" text="Самозанятый"></CheckBox>
              </div>
            </div>
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
