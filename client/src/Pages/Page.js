// App
import React from "react";
import api from "../config/api";
import { CSSTransitionGroup } from "react-transition-group";
import Loading from "../Elements/Loading";
import { withRouter } from "react-router-dom";
import NoMatch from "./NoMatch";
import Meta from "../Elements/Meta";

class Page extends React.Component {
  state = {
    page: false,
    notFound: false,
    isFetching: true,
  };
  stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  componentDidMount() {
    this.loadPage();
  }
  componentDidUpdate() {
    if (
      !this.state.isFetching &&
      (!this.state.page ||
        (this.state.page &&
          this.state.page.slug !== this.props.match.params.slug))
    ) {
      this.loadPage();
    }
  }
  loadPage = () => {
    this.setState({ isFetching: true }, () => {
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
          }
        });
    });
  };
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
              <div className="container-fluid">
                <Meta
                  keyMeta="page"
                  options={{
                    title: this.state.page.title,
                    content:
                      this.stripHtml(this.state.page.content).slice(0, 150) +
                      "...",
                  }}
                ></Meta>
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
