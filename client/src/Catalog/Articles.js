// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
import ArticleHeader from "./ArticleHeader";
import settings from "../config/settings";
import configApi from "../config/api";
import { withCookies } from "react-cookie";
import LoadGif from "../img/load.gif";
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
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.filter) !== JSON.stringify(prevProps.filter) ||
      this.state.currentPage !== prevState.currentPage
    )
      this.getAricles(this.state.currentPage);
  }
  getAricles(page) {
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
    return (
      <div className="articles-block">
        <ArticleHeader></ArticleHeader>
        {this.state.isFething && (
          <div className="text-center">
            <img src={LoadGif} alt="LoadGif" />
          </div>
        )}
        {!this.state.isFething && (
          <>
            {this.state.articles.map((article, i) => {
              return <Article key={i} article={article} />;
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
          </>
        )}
      </div>
    );
  }
}

export default withCookies(Articles);
