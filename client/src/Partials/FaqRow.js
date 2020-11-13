import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Elements/Loading";
import { connect } from "react-redux";
import { rus_to_latin } from "../controllers/FunctionsController";
import api from "../config/api";

class FaqRow extends React.Component {
  state = {
    sections: [],
    isFething: true,
  };
  componentDidMount() {
    this.setState({ isFething: true }, () => {
      fetch(`${api.urlApi}/api/page/questions`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: this.props.type ? this.props.type : "all",
        }),
      })
        .then((response) => response.json())
        .then(({ sections }) => {
          if (sections)
            this.setState({
              sections: sections,
              isFething: false,
            });
        });
    });
  }
  render() {
    return (
      <div className="faq-questions row">
        <Loading isLoading={this.state.isFething} />
        {!this.state.isFething &&
          this.state.sections.map((section, index) => {
            let view = false;

            let q = this.props.q.split(" ");

            if (
              section.questions.find((x) => {
                for (let i = 0; i < q.length; i++) {
                  if (
                    !(
                      ~x.title.toLowerCase().indexOf(q[i].toLowerCase()) ||
                      q[i] === 0
                    ) &&
                    !(
                      ~x.content.toLowerCase().indexOf(q[i].toLowerCase()) ||
                      q[i] === 0
                    )
                  )
                    return false;
                }
                return true;
              })
            )
              view = true;
            else view = false;
            if (this.props.q.length === 0) {
              view = true;
            }

            return (
              view && (
                <div
                  className="faq-question col-12 col-sm-6 col-md-4 col-lg-3"
                  key={index}
                >
                  <h4>{section.title}</h4>
                  <ul>
                    {section.questions.map((question, index) => {
                      let view = false;
                      let q = this.props.q.split(" ");

                      for (let i = 0; i < q.length; i++) {
                        if (
                          ~question.title
                            .toLowerCase()
                            .indexOf(q[i].toLowerCase() || q[i]) ||
                          ~question.content
                            .toLowerCase()
                            .indexOf(q[i].toLowerCase() || q[i])
                        ) {
                          view = true;
                        } else {
                          view = false;
                          break;
                        }
                      }

                      if (this.props.q.length === 0) {
                        view = true;
                      }

                      return (
                        view && (
                          <li key={index}>
                            <Link
                              to={`${
                                this.props.user.isAuth && this.props.type
                                  ? "/lk"
                                  : ""
                              }/questions/${section.slug}#${rus_to_latin(question.title)}`}
                            >
                              {question.title}
                            </Link>
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              )
            );
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
export default connect(mapStateToProps)(FaqRow);
