// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
import ArticleHeader from "./Partials/ArticleHeader";
import { withCookies } from "react-cookie";
import Loading from "../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
class ArticlesOuterLoading extends React.Component {
  render() {
    return (
      <div className="articles-block">
        <ArticleHeader></ArticleHeader>
        <Loading isLoading={this.props.isFething}></Loading>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {this.props.articles &&
            this.props.articles.map((article, i) => {
              return (
                <Article
                  IsManage={this.props.IsManage}
                  key={i}
                  article={article}
                />
              );
            })}
        </CSSTransitionGroup>
        {this.props.articles && !this.props.articles.length && (
          <div className="text-center py-3">Записей не найдено</div>
        )}
        {!!this.props.articles.length && (
          <Pagination
            currentPage={this.props.currentPage}
            pageCount={this.props.pageCount - 1}
            onPageChange={this.props.setPage}
          />
        )}
      </div>
    );
  }
}

export default withCookies(ArticlesOuterLoading);
