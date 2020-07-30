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
    pageCount: false,
    isFething: true,
  };
  componentDidMount() {
    this.getAricles();
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.filter) !== JSON.stringify(prevProps.filter))
      this.getAricles();
  }
  getAricles() {
    fetch(`${configApi.urlApi}/api/article/getArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: this.props.filter,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          this.setState({
            pageCount: data.articles.length / settings.countArticleOnPage,
            articles: data.articles,
            isFething: false,
          });
        }
      });
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
              <Pagination pageCount={this.state.pageCount} perPage="1" />
            )}
          </>
        )}
      </div>
    );
  }
}

export default withCookies(Articles);
