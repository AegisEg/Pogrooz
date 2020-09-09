// App
import React from "react";
import api from "../config/api";
import { CSSTransitionGroup } from "react-transition-group";
import Loading from "../Elements/Loading";
import { withRouter } from "react-router-dom";
import NoMatch from "./NoMatch";
import { setForceTitle } from "../functions/functions";

class Page extends React.Component {
  state = {
    page: {},
    notFound: false,
    isFetching: true,
  };
  componentDidMount() {
    fetch(`${api.urlApi}/api/page`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: this.props.match.params.slug,
        isPrivate: !!this.props.isPrivate,
      }),
    })
      .then((response) => response.json())
      .then(({ error, page }) => {
        if (error) {
          this.setState({
            isFetching: false,
            notFound: true,
          });
        }
        if (!error && page) {
          this.setState({
            isFetching: false,
            page: page,
          });
          setForceTitle(page.title);
        }
      });
  }
  render() {
    console.log(this.state);
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
              <div className="container-fluid">
                <h1 className="title">{this.state.page.title}</h1>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: this.state.page.content }}
                ></div>
              </div>
            )}
          </CSSTransitionGroup>
          {!this.state.isFetching && this.state.notFound && <NoMatch />}
        </div>
      </>
    );
  }
}

export default withRouter(Page);
