// App
import React from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Article from "../../ArticlesElements/Article";
import ArticleHeader from "../../ArticlesElements/Partials/ArticleHeader";
import ArticleRequest from "../../ArticlesElements/Partials/ArticleRequest";
import RequestForm from "../../ArticlesElements/Partials/RequestForm.js";
import queryString from "query-string";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";
// Router
import { setForceTitle } from "../../functions/functions";
import { connect } from "react-redux";
// Elements
import NoMatch from "../NoMatch.js";
import { withLastLocation } from "react-router-last-location";
import Loading from "../../Elements/Loading";
import Meta from "../../Elements/Meta";
import { CSSTransitionGroup } from "react-transition-group";
class ArticlePage extends React.Component {
  state = {
    isFetching: true,
    notFound: false,
    editRequestId: false,
  };
  componentDidMount() {
    this.setState({ isFetching: true }, () => {
      this.props.myArticlesActions
        .currentLoad(this.props.match.params.id, this.props.type)
        .then((data) => {
          if (data.error) {
            this.setState({
              isFetching: false,
              notFound: true,
            });
          }
          if (data.article) {
            let url = this.props.location.search;

            let params = queryString.parse(url);
            if (Object.prototype.hasOwnProperty.call(params, "executors")) {
              document.getElementById("request-header").scrollIntoView({
                behavior: "smooth",
              });
            }
            setForceTitle(
              (data.article.type === "offer" ? "Предложение" : "Заказ") +
                " №" +
                data.article.articleId
            );
            this.setState({
              isFetching: false,
            });
          }
        });
    });
  }
  render() {
    return (
      <>
        <Loading isLoading={this.state.isFetching}></Loading>
        <CSSTransitionGroup
          transitionName="loading-height-animation-item"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          style={{
            display: "contents",
          }}
        >
          {!this.state.isFetching && !this.state.notFound && (
            <>
              <div className="article-page">
                <Meta
                  keyMeta={this.props.myarticles.currentArticle.type}
                  options={{
                    start: this.props.myarticles.currentArticle.from.value,
                    tags: this.props.myarticles.currentArticle.car.additionally,
                    finish: this.props.myarticles.currentArticle.to.value,
                    date: this.props.myarticles.currentArticle.startDate.date,
                    comment: this.props.myarticles.currentArticle.comment,
                  }}
                />
                <div className="container-fluid">
                  <h2 className="title">
                    {this.props.myarticles.currentArticle.type == "order"
                      ? "Заказ"
                      : "Предложение"}{" "}
                    № {this.props.myarticles.currentArticle.articleId}
                  </h2>
                  <a
                    className="href hover left-angle angle-go mb-2"
                    onClick={() => {
                      if (this.props.lastLocation) {
                        this.props.history.push(
                          this.props.lastLocation.pathname
                        );
                      } else {
                        this.props.history.push("/search");
                      }
                    }}
                  >
                    Назад
                  </a>
                </div>
                <div className="articles-block full">
                  <ArticleHeader></ArticleHeader>
                  <Article
                    IsManage={true}
                    onlyOpen={true}
                    singlePage={true}
                    article={this.props.myarticles.currentArticle}
                  />
                  <div className="articles-header" id="request-header">
                    <div className="container-fluid">
                      <span className="f-16">
                        Заявок по заказу -{" "}
                        {this.props.myarticles.currentArticle.requests.length}
                      </span>
                    </div>
                  </div>

                  <div className="requests-article-block">
                    <div className="container-fluid">
                      {this.props.myarticles.currentArticle.requests &&
                        !!this.props.myarticles.currentArticle.requests
                          .length &&
                        this.props.myarticles.currentArticle.requests.map(
                          (item, index) => {
                            if (this.state.editRequestId === item._id) {
                              return (
                                <RequestForm
                                  key={index}
                                  request={item}
                                  isEditing={true}
                                  endEdit={() => {
                                    this.setState({ editRequestId: false });
                                  }}
                                  user={this.props.user}
                                  article={this.props.myarticles.currentArticle}
                                />
                              );
                            } else
                              return (
                                <ArticleRequest
                                  key={index}
                                  user={this.props.user}
                                  article={this.props.myarticles.currentArticle}
                                  setChangeRequest={(editRequestId) => {
                                    this.setState({
                                      editRequestId: editRequestId,
                                    });
                                  }}
                                  request={item}
                                  isLast={
                                    this.props.myarticles.currentArticle
                                      .requests.length !==
                                    index + 1
                                  }
                                />
                              );
                          }
                        )}
                      {this.props.myarticles.currentArticle.requests &&
                        !this.props.myarticles.currentArticle.requests
                          .length && (
                          <div className="text-center mt-2">Заявок еще нет</div>
                        )}
                    </div>
                  </div>

                  {this.props.user &&
                    (this.props.user.tariff ||
                      this.props.user.type === "cargo") &&
                    this.props.myarticles.currentArticle && (
                      <RequestForm
                        user={this.props.user}
                        article={this.props.myarticles.currentArticle}
                      />
                    )}
                </div>
              </div>
            </>
          )}
        </CSSTransitionGroup>
        {!this.state.isFething && this.state.notFound && <NoMatch />}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    myarticles: state.myarticles,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(withRouter(withLastLocation(ArticlePage))));
