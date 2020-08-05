// App
import React from "react";
// Elements
import Button from "../../../Elements/Button";
import ArticleHeader from "../../../Catalog/ArticleHeader";
import Article from "../../../Catalog/Article";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import configApi from "../../../config/api";
class Create4 extends React.Component {
  state = {
    dataFancybox: {
      images: false,
      index: false,
      article: {},
    },
  };
  createAricle(status) {
    let apiToken = this.props.cookies.get("apiToken");
    let formData = new FormData();
    formData.append(
      "article",
      JSON.stringify({ ...this.props.article, status: status })
    );

    if (
      this.props.article.type === "order" &&
      this.props.article.cargoPhoto &&
      !!this.props.article.cargoPhoto.length
    ) {
      let files = [];
      this.props.article.cargoPhoto.map((item, index) => {
        formData.append("cargoPhoto" + index, item.file);
      });
    }
    if (
      this.props.article.type === "offer" &&
      this.props.article.car.photo.file
    )
      formData.append("carPhoto", this.props.article.car.photo.file);
    if (apiToken) {
      fetch(`${configApi.urlApi}/api/article/createArticle`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            if (this.props.article.type === "offer")
              this.props.history.push("/my-offers-open");
            if (this.props.article.type === "order")
              this.props.history.push("/my-orders-open");
          }
        });
    }
  }
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="articles-block full">
          <ArticleHeader></ArticleHeader>
          {this.props.article && (
            <Article
              isManage={false}
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
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(withCookies(Create4));
