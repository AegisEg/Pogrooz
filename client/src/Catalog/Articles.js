// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
import ArticleHeader from "./ArticleHeader";
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
  onChangeArticle = (articles) => {
    this.setState({ articles: articles });
  };
  setPage(selected) {
    if (selected !== this.state.currentPage) {
      const element = document.querySelector(".articles-header");
      const intersectionObserver = new IntersectionObserver((entries) => {
        let [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => this.getAricles(selected), 100);
          intersectionObserver.unobserve(element);
        }
      });
      intersectionObserver.observe(element);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  render() {
    console.log("dasdas");
    return (
      <div className="articles-block">
        <ArticleHeader></ArticleHeader>
        <Loading isLoading={this.state.isFething}></Loading>
        <CSSTransitionGroup
          transitionName="loading-height-animation-item"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          style={{
            display: "contents",
          }}
        >
          {this.state.articles.map((article, i) => {
            return (
              <Article
                onChangeArticle={this.onChangeArticle}
                articles={this.state.articles}
                key={i}
                article={article}
              />
            );
          })}
          {!this.state.articles.length && (
            <div className="text-center py-3">Записей не найдено</div>
          )}
          {!!this.state.articles.length && (
            <Pagination
              currentPage={this.state.currentPage}
              pageCount={this.state.pageCount}
              onPageChange={this.setPage.bind(this)}
            />
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default withCookies(Articles);
