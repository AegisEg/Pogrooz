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
      <div className="standart-page">
        <h2 className="title">Техподдержка</h2>
        <p
          className="f-14"
          style={{
            maxWidth: "651px",
          }}
        >
          Если у Вас есть вопросы и предложения, можете позвонить нам по
          телефону +7 (927) 000 - 00 - 00 или написать на почту info@pogrooz.ru.
        </p>
        <p className="f-14">
          Также вы можете написать нашим специалистам в
          <Link to="/" className="href">
            online чат
          </Link>
          .{" "}
        </p>
        <FAQ noPadding={true} />
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
