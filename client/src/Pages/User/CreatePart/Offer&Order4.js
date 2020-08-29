// App
import React from "react";
import { withCookies } from "react-cookie";
import * as myArticlesActions from "../../../redux/actions/myarticles";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import configApi from "../../../config/api";

// Elements
import Button from "../../../Elements/Button";
import ArticleHeader from "../../../ArticlesElements/Partials/ArticleHeader";
import Article from "../../../ArticlesElements/Article";
class Create4 extends React.Component {
  state = {
    dataFancybox: {
      images: false,
      index: false,
      article: {},
    },
  };
  createAricle = (status) => {
    let apiToken = this.props.cookies.get("apiToken");
    this.props.myArticlesActions
      .createMyArticle(this.props.article, status, apiToken)
      .then((data) => {
        if (!data.error) {
          if (this.props.article.type === "offer")
            this.props.history.push("/my-offers-open");
          if (this.props.article.type === "order")
            this.props.history.push("/my-orders-open");
        }
      });
  };
  save() {
    let apiToken = this.props.cookies.get("apiToken");
    this.props.myArticlesActions
      .editMyArticle(this.props.article, this.props.editingId, apiToken)
      .then((data) => {
        if (!data.error) {
          if (this.props.article.type === "offer")
            this.props.history.push("/my-offers-open");
          if (this.props.article.type === "order")
            this.props.history.push("/my-orders-open");
        }
      });
  }
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="articles-block full">
          <ArticleHeader></ArticleHeader>
          {this.props.article && (
            <Article
              onlyOpen={true}
              singlePage={true}
              article={this.props.article}
            />
          )}
        </div>
        <div className="container-fluid">
          <div className="row slide-step justify-content-end">
            <Button
              type="empty"
              className=" input-action"
              paddingHorizontal="40px"
              onClick={this.props.prev}
            >
              Назад
            </Button>
            {this.props.isEditing && (
              <>
                <Button
                  type="fill"
                  className=" input-action"
                  paddingHorizontal="40px"
                  onClick={() => {
                    this.save();
                  }}
                >
                  Сохранить
                </Button>
              </>
            )}
            {!this.props.isEditing && (
              <>
                <Button
                  type="empty"
                  className=" input-action"
                  paddingHorizontal="40px"
                  onClick={() => {
                    this.createAricle(1);
                  }}
                >
                  В черновик
                </Button>
                <Button
                  type="fill"
                  className=" input-action"
                  paddingHorizontal="40px"
                  onClick={() => {
                    this.createAricle(2);
                  }}
                >
                  Опубликовать
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}
export default connect(
  null,
  mapDispatchToProps
)(withRouter(withCookies(Create4)));
