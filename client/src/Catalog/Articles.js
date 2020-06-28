// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
import ArticleHeader from "./ArticleHeader";
class Articles extends React.Component {
  render() {
    return (
      <div className="articles-block">
        <ArticleHeader></ArticleHeader>
        {this.props.articlesList.map((article, i) => {
          return <Article  key={i} article={article} />;
        })}
        <Pagination pageCount={10} perPage="1" />
      </div>
    );
  }
}

export default Articles;
