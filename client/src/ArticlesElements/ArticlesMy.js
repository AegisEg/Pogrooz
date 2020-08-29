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
import settings from "../config/settings";
class ArticlesMy extends React.Component {
  state = {
    articles: [],
    currentPage: 0,
    pageCount: false,
    isFething: true,
  };
  componentDidMount() {
    this.getAricles(0);
  }
  componentDidUpdate(props) {
    if (this.props.isReload && !this.state.isFething) {
      this.getAricles(0);
    }
  }
  getAricles(page = 0) {
    this.setState({ isFething: true }, () => {
      fetch(`${configApi.urlApi}/api/article/getMyArticles`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          status: this.props.statuses,
          page: page,
          type: this.props.isTaking ? "taking" : "my",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.articles) {
            this.setState(
              {
                currentPage: page,
                articles: data.articles,
                isFething: false,
              },
              () => {
                this.props.reloadEnd();
              }
            );
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
        <ArticleHeader></ArticleHeader>
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
                IsManage={true}
                updateArticle={(articleId, change) => {
                  this.setState({
                    articles: this.state.articles.map((item) => {
                      if (item._id === articleId) return { ...item, ...change };
                      else return item;
                    }),
                  });
                }}
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
            pageCount={
              Math.ceil(this.props.countAll / settings.countArticleOnPage) - 1
            }
            onPageChange={this.setPage.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default withCookies(ArticlesMy);
