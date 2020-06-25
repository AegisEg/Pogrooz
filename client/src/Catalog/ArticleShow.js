// App
import React from "react";
import { connect } from "react-redux";
import Article from "./Article";
import ArticleHeader from "./ArticleHeader";
import articlestest from "../config/articlestest.js";

class ArticleShow extends React.Component {
  render() {
    return (
      <>
        <ArticleHeader></ArticleHeader>
        <Article
          isManage={false}
          onlyOpen={true}
          singlePage={true}
          article={articlestest[0]}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ArticleShow);
