// App
import React from "react";
// Elements

import { connect } from "react-redux";
import HeaderCreate from "./CreatePart/HeaderCreate";
import OrderCreate1 from "./CreatePart/Order1";
import OrderCreate2 from "./CreatePart/Order2";
import OrderCreate3 from "./CreatePart/Order3";
import OrderCreate4 from "./CreatePart/Offer&Order4";
import { withRouter } from "react-router-dom";
import api from "../../config/api";
import { setForceTitle } from "../../functions/functions";
import Loading from "../../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
import NoMatch from "../NoMatch";

class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    this.article = {};
  }
  state = {
    isFetching: true,
    notFound: false,
    currentTab: 1,
    typesCar: [],
    article: false,
    isEditing: false,
  };
  componentDidMount() {
    if (this.props.match.params.id)
      fetch(`${api.urlApi}/api/article/getUserArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          id: this.props.match.params.id,
          type: "order",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            if (data.article) {
              this.article = data.article;
              this.editingId = data.article._id;
              this.setState(
                {
                  cargoTypes: data.article.cargoTypes,
                  isFetching: false,
                  isEditing: true,
                },
                () => {
                  setForceTitle(
                    (this.state.article.type === "offer"
                      ? "Редактирование предложения"
                      : "Редактирование заказа") +
                      " №" +
                      this.article.articleId
                  );
                }
              );
            }
          } else this.setState({ notFound: true, isFetching: false });
        });
    else
      this.setState({
        isFetching: false,
      });
  }
  getRef(number) {
    switch (number) {
      case 1:
        return this.step1;
      case 2:
        return this.step2;
      case 3:
        return this.step3;
    }
  }

  nexTab(number) {
    let error = false;
    let data;
    let article = { type: "order" };
    Array.from(Array(number - 1), (_, i) => i + 1).map((item, index) => {
      if (!error)
        if ((data = this.getRef(item).getArticlesInfo()))
          article = {
            ...article,
            ...data,
          };
        else error = index + 1;
    });
    if (!error) {
      if (number === 4) {
        this.setState(
          { article: { ...article, author: this.props.user } },
          () => {
            this.setState({ currentTab: number });
          }
        );
      } else {
        this.setState({ currentTab: number });
      }
    } else if (this.state.currentTab !== error)
      this.setState({ currentTab: error });
  }
  render() {
    return (
      <>
        <Loading isLoading={this.state.isFetching}></Loading>
        <div className="create-page create-order-page">
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
                <div className="container-fluid">
                  <h2 className="title">{this.props.title}</h2>
                  <HeaderCreate
                    changeTub={(setTub) => {
                      this.nexTab(setTub);
                    }}
                    currentTab={this.state.currentTab}
                    tabs={[
                      "Описание груза",
                      "Мартшрут",
                      "Пожелания к перевозчику",
                      "Публикация товара",
                    ]}
                  />
                </div>
                <div className="steps-create">
                  <OrderCreate1
                    ref={(ref) => (this.step1 = ref)}
                    className={`${this.state.currentTab === 1 ? "active" : ""} 
              ${this.state.currentTab > 1 ? "deactive" : ""}`}
                    next={() => {
                      this.nexTab(2);
                    }}
                    prev={() => {
                      if (this.state.currentTab > 1) {
                        this.setState({
                          currentTab: this.state.currentTab - 1,
                        });
                      }
                    }}
                    onChange={(state) => {
                      this.setState(state);
                    }}
                    cargoTypes={this.article.cargoTypes}
                    cargoData={this.article.cargoData}
                    cargoStandartData={this.article.cargoStandartData}
                    cargoPhoto={this.article.cargoPhoto}
                    comment={this.article.comment}
                  />
                  <OrderCreate2
                    ref={(ref) => (this.step2 = ref)}
                    className={`${
                      this.state.currentTab === 2 ? "active" : ""
                    } ${this.state.currentTab > 2 ? "deactive" : ""}`}
                    next={() => {
                      this.nexTab(3);
                    }}
                    prev={() => {
                      if (this.state.currentTab > 1) {
                        this.setState({
                          currentTab: this.state.currentTab - 1,
                        });
                      }
                    }}
                    addressFrom={this.article.from}
                    addressTo={this.article.to}
                    startDate={this.article.startDate}
                  />
                  <OrderCreate3
                    ref={(ref) => (this.step3 = ref)}
                    className={`${
                      this.state.currentTab === 3 ? "active" : ""
                    } ${this.state.currentTab > 3 ? "deactive" : ""}`}
                    next={() => {
                      this.nexTab(4);
                    }}
                    prev={() => {
                      if (this.state.currentTab > 1) {
                        this.setState({
                          currentTab: this.state.currentTab - 1,
                        });
                      }
                    }}
                    cargoTypes={this.state.cargoTypes}
                    cargoData={this.state.cargoData}
                    car={this.article.car}
                    budget={this.article.budget}
                  />
                  <OrderCreate4
                    className={`${this.state.currentTab === 4 ? "active" : ""}`}
                    prev={() => {
                      if (this.state.currentTab > 1) {
                        this.setState({
                          currentTab: this.state.currentTab - 1,
                        });
                      }
                    }}
                    isEditing={this.state.isEditing}
                    editingId={this.editingId}
                    article={this.state.article}
                  />
                </div>
              </>
            )}
          </CSSTransitionGroup>
          {!this.state.isFething && this.state.notFound && <NoMatch />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(OrderCreate));
