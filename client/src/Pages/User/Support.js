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
            телефону +7 (927) 000 - 00 - 00 или написать на почту
            info@pogrooz.ru.
          </p>
          <p className="f-14 mt-4">
            Также вы можете написать нашим специалистам в&nbsp;
            <Link to="/" className="href">
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
  };
};

export default connect(mapStateToProps)(Support);
