// App
import React from "react";
import FAQ from "../Public/FAQ";

// Router
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Elements

class Support extends React.Component {
  state = {};
  render() {
    return (
      <div className="standart-page ">
        <div className="container-fluid">
          <h2 className="title">Техподдержка</h2>
          <p className="f-14">
            Если у Вас есть вопросы и предложения, можете позвонить нам по
            телефону {this.props.settings.phone} или написать на почту &nbsp;
            {this.props.settings.email}.
          </p>
          <p className="f-14 mt-4">
            Также вы можете написать нашим специалистам в&nbsp;
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.jivo_api.open();
              }}
              className="href"
            >
              online чат
            </Link>
            .
          </p>
        </div>
        <FAQ noPadding={true} type={this.props.user.type} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings: state.settings.settings,
  };
};

export default connect(mapStateToProps)(Support);
