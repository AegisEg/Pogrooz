// App
import React from "react";
// Elements
import Article from "../../ArticlesElements/Article";
import ArticleHeader from "../../ArticlesElements/Partials/ArticleHeader";
import Loading from "../../Elements/Loading";
import LoadingFixed from "../../Elements/LoadingFixed";
import { Scrollbars } from "react-custom-scrollbars";

import { CSSTransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";

class MyArticles extends React.Component {
  constructor(props) {
    super(props);
    this.prestatus = 1;
  }
  state = {
    currentStatus: "all",
  };
  componentDidMount() {
    if (this.props.statusArticle.length === 1)
      this.setState({ currentStatus: this.props.statusArticle[0] }, () => {
        this.props.myArticlesActions.articlesMyLoad(
          this.state.currentStatus,
          this.props.user.apiToken
        );
      });
    else
      this.props.myArticlesActions.articlesAllMyGet(this.props.user.apiToken);
  }
  renderTabs() {
    let reduxArticles = this.props.myarticles.my;
    return (
      <div className="tab_groups">
        {this.props.statusArticle.length > 1 && (
          <span
            className={`tab_group ${
              this.state.currentStatus === "all" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: "all" });
            }}
          >
            Все &nbsp;
            {this.props.myarticles.myAll.countAll}
          </span>
        )}
        {this.props.statusArticle.map((item, index) => {
          return (
            <span
              key={index}
              className={`tab_group ${
                this.state.currentStatus === item ? "active" : ""
              }`}
              onClick={() => {
                this.setState({ currentStatus: item }, () => {
                  if (
                    !reduxArticles[this.state.currentStatus - this.prestatus]
                      .isGetted
                  ) {
                    this.props.myArticlesActions.articlesMyGet(
                      this.state.currentStatus,
                      this.props.user.apiToken
                    );
                  }
                });
              }}
            >
              {item === 1 && "Черновики"}
              {item === 2 && "Открытые"}
              {item === 3 && "Выбран исполнитель"}
              {item === 4 && "В пути"}
              {item === 5 && "Выполненные"}
              {item === 6 && "Отмененные"}
              {item === 7 && "Корзина"}
              &nbsp;{this.props.myarticles.my[item - 1].countAll}
            </span>
          );
        })}
      </div>
    );
  }
  onScroll() {
    if (
      this.articlesBlock.getScrollHeight() -
        this.articlesBlock.getScrollTop() <=
      200 + this.articlesBlock.getClientHeight()
    )
      if (this.state.currentStatus !== "all") {
        let reduxArticles = this.props.myarticles.my;
        if (
          reduxArticles[this.state.currentStatus - this.prestatus].canLoad &&
          !reduxArticles[this.state.currentStatus - this.prestatus].isFetching
        ) {
          this.props.myArticlesActions.articlesMyLoad(
            this.state.currentStatus,
            this.props.user.apiToken
          );
        }
      } else {
        if (
          this.props.myarticles.myAll.canLoad &&
          !this.props.myarticles.myAll.isFetching
        )
          this.props.myArticlesActions.articlesAllMyLoad(
            this.props.user.apiToken
          );
      }
  }
  render() {
    let reduxArticles;
    if (this.state.currentStatus === "all")
      reduxArticles = this.props.myarticles.myAll;
    else reduxArticles = this.props.myarticles.my[this.state.currentStatus - 1];
    return (
      <div className="lk-order-page">
        <div className="container-fluid">
          <h2 className="title">{this.props.title}</h2>
          {this.renderTabs()}
        </div>
        <div className="articles-block">
          <ArticleHeader></ArticleHeader>
          <LoadingFixed isLoading={reduxArticles.isFetching}></LoadingFixed>
          <CSSTransitionGroup
            transitionName="height-animation-item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1}
            style={{
              display: "contents",
            }}
          >
            <Scrollbars
              onScroll={() => {
                this.onScroll();
              }}
              ref={(ref) => {
                this.articlesBlock = ref;
              }}
              renderTrackVertical={(props) => (
                <div className="track-vertical" />
              )}
              renderThumbVertical={(props) => (
                <div className="thumb-vertical" />
              )}
              className="load-content scroll"
              autoHide
            >
              {(!reduxArticles.isFetching || reduxArticles.isGetted) && (
                <>
                  {reduxArticles.articles &&
                    reduxArticles.articles.map((article, i) => {
                      return (
                        <Article IsManage={true} key={i} article={article} />
                      );
                    })}
                  {(!reduxArticles.isFetching || reduxArticles.isGetted) &&
                    reduxArticles.articles &&
                    !reduxArticles.articles.length && (
                      <div className="text-center py-3">Записей не найдено</div>
                    )}
                </>
              )}
            </Scrollbars>
          </CSSTransitionGroup>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);
