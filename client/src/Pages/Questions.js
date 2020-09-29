// App
import React from "react";
import api from "../config/api";
import { CSSTransitionGroup } from "react-transition-group";
import Loading from "../Elements/Loading";
import { withRouter } from "react-router-dom";
import NoMatch from "./NoMatch";
import { setForceTitle } from "../functions/functions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
const scrollToAnswer = (ref) => {
  ref.current.scrollIntoView({
    behavior: "smooth",
  });
};
class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.questionsRef = [];
  }
  state = {
    partial: {},
    notFound: false,
    isFetching: true,
  };
  componentDidMount() {
    fetch(`${api.urlApi}/api/page/question`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: this.props.match.params.slug,
        type: this.props.user.isAuth ? this.props.user.type : "all",
      }),
    })
      .then((response) => response.json())
      .then(({ error, partial }) => {
        if (error) {
          this.setState({
            isFetching: false,
            notFound: true,
          });
        }
        if (!error && partial) {
          partial.questions = partial.questions.map((item) => {
            return { ...item, ref: React.createRef() };
          });
          this.setState(
            {
              isFetching: false,
              partial: partial,
            },
            () => {
              let element = document.getElementById(
                this.props.location.hash.slice(1)
              );
              if (element)
                element.scrollIntoView({
                  behavior: "smooth",
                });
            }
          );
          setForceTitle(partial.title);
        }
      });
  }

  render() {
    return (
      <>
        <div className="static-page">
          <Loading isLoading={this.state.isFetching} />
          <CSSTransitionGroup
            transitionName="height-animation-item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1}
            style={{
              display: "contents",
            }}
          >
            {!this.state.isFetching && !this.state.notFound && (
              <div className="about-page">
                <div className="container-fluid">
                  <a
                    className="href hover left-angle  angle-go d-block"
                    style={{
                      maxWidth: "50px",
                    }}
                    onClick={() => {
                      if (this.props.user.isAuth)
                        this.props.history.push("/support");
                      else this.props.history.push("/faq");
                    }}
                  >
                    Назад
                  </a>
                  <h1>{this.state.partial.title}</h1>
                  <ul>
                    {this.state.partial.questions.map((question, index) => {
                      return (
                        <li key={index}>
                          <Link
                            to={""}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToAnswer(question.ref);
                            }}
                          >
                            {question.title} »
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {this.state.partial.questions.map((question, index) => {
                    return (
                      <div id={question._id} key={index}>
                        <h3 ref={question.ref}>{question.title}</h3>
                        <div
                          className="content"
                          dangerouslySetInnerHTML={{ __html: question.content }}
                        ></div>
                        <hr></hr>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CSSTransitionGroup>
          {!this.state.isFetching && this.state.notFound && <NoMatch />}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(Questions));
