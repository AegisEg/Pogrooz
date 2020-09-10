// App
import React from "react";
// Elements
import ArticlesMy from "../../ArticlesElements/ArticlesMy.js";
// import ArticlesOuterLoading from "../../ArticlesElements/ArticlesOuterLoading";
import { connect } from "react-redux";
import * as myArticlesActions from "../../redux/actions/myarticles";
import { bindActionCreators } from "redux";
import settings from "../../config/settings";
class MyArticles extends React.Component {
  constructor(props) {
    super(props);
    this.articles = React.createRef();
    this.prestatus = 2;
  }
  state = {
    currentStatus: "all",
    articles: false,
    currentPage: 0,
    isFething: true,
    pageCount: 0,
  };
  componentDidMount() {
    if (this.props.statusArticle.length === 1)
      this.setState({ currentStatus: this.props.statusArticle[0] }, () => {
        this.props.myArticlesActions.articlesTakingLoad(
          this.state.currentStatus,
          0,
          this.props.user.apiToken
        );
      });
  }
  renderTabs() {
    let reduxArticles = this.props.myarticles.taking;
    return (
      <div className="tab_groups">
        {this.props.statusArticle.length > 1 && (
          <span
            className={`tab_group ${
              this.state.currentStatus === "all" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ currentStatus: "all", currentPage: 0 });
            }}
          >
            Все &nbsp;
            {reduxArticles
              .filter((item, index) => {
                let status = index + this.prestatus;
                return this.props.statusArticle.find((item) => item === status);
              })
              .reduce((accumulator, a) => {
                return accumulator + a.countAll;
              }, 0)}
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
                this.setState({ currentStatus: item, currentPage: 0 }, () => {
                  if (
                    !reduxArticles[this.state.currentStatus - this.prestatus]
                      .isGetted &&
                    reduxArticles[this.state.currentStatus - this.prestatus]
                      .page === 0
                  ) {
                    this.props.myArticlesActions.articlesTakingLoad(
                      this.state.currentStatus,
                      0,
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
              &nbsp;
              {this.props.myarticles.taking[item - this.prestatus].countAll}
            </span>
          );
        })}
      </div>
    );
  }
  render() {
    let reduxArticles = this.props.myarticles.taking;
    return (
      <></>
      // <div className="lk-order-page">
      //   <div className="container-fluid">
      //     <h2 className="title">{this.props.title}</h2>
      //     {this.renderTabs()}
      //   </div>
      //   {this.state.currentStatus === "all" && (
      //     <ArticlesMy
      //       isReload={this.props.myarticles.isReloadTakingAll}
      //       reloadEnd={this.props.myArticlesActions.TakingAllLoadEnd}
      //       user={this.props.user}
      //       isTaking={true}
      //       countAll={reduxArticles
      //         .filter((item, index) => {
      //           let status = index + this.prestatus;
      //           return this.props.statusArticle.find((item) => item === status);
      //         })
      //         .reduce((accumulator, a) => {
      //           return accumulator + a.countAll;
      //         }, 0)}
      //       statuses={this.props.statusArticle}
      //     />
      //   )}
      //   {this.state.currentStatus !== "all" && (
      //     <ArticlesOuterLoading
      //       IsManage={true}
      //       currentPage={
      //         reduxArticles[this.state.currentStatus - this.prestatus].page
      //       }
      //       setPage={(page) => {
      //         this.props.myArticlesActions.articlesMyLoad(
      //           this.state.currentStatus,
      //           page,
      //           this.props.user.apiToken
      //         );
      //       }}
      //       isFething={
      //         reduxArticles[this.state.currentStatus - this.prestatus]
      //           .isFetching
      //       }
      //       pageCount={
      //         reduxArticles[this.state.currentStatus - this.prestatus]
      //           .countAll / settings.countArticleOnPage
      //       }
      //       articles={
      //         reduxArticles[this.state.currentStatus - this.prestatus].articles
      //       }
      //     />
      //   )}
      // </div>
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
