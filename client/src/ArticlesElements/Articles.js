// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
import ArticleHeader from "./Partials/ArticleHeader";
import configApi from "../config/api";
import { withCookies } from "react-cookie";
import Loading from "../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
class Articles extends React.Component {
  state = {
    articles: [],
    currentPage: 0,
    pageCount: false,
    isFething: true,
  };
  componentDidMount() {
    this.getAricles(0);
  }
  getAricles(page = 0) {
    this.setState({ isFething: true }, () => {
      fetch(`${configApi.urlApi}/api/article/getArticles`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: this.props.filter,
          sortBy: this.props.sortBy,
          page: page,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.articles) {
            this.setState({
              pageCount: data.pageAll,
              currentPage: page,
              articles: data.articles,
              isFething: false,
            });
          }
        });
    });
  }
  setPage(selected) {
    if (selected !== this.state.currentPage) {
      this.getAricles(selected);
    }
  }
  render() {
    return (
      <div className="articles-block">
        <ArticleHeader
          sortChange={this.props.sortChange}
          sortBy={this.props.sortBy}
        ></ArticleHeader>
        <Loading isLoading={this.state.isFething}></Loading>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {this.state.articles.map((article, i) => {
            return (
              <Article
                IsManage={this.props.isManage || article.status === 2}
                statusHide={this.props.statusHide}
                notControl={this.props.notControl}
                notLink={this.props.onlyPublic && article.status !== 2}
                key={i}
                article={article}
              />
            );
          })}
        </CSSTransitionGroup>
        {!this.state.articles.length && (
          <div className="text-center py-3">Записей не найдено</div>
        )}
        {!!this.state.articles.length && (
          <Pagination
            currentPage={this.state.currentPage}
            pageCount={this.state.pageCount - 1}
            onPageChange={this.setPage.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default withCookies(Articles);
