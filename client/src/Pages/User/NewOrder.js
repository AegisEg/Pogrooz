// App
import React from "react";
// Elements

import { connect } from "react-redux";
import HeaderCreate from "./CreatePart/HeaderCreate";
import OrderCreate1 from "./CreatePart/Order1";
import OrderCreate2 from "./CreatePart/Order2";
import OrderCreate3 from "./CreatePart/Order3";
import OrderCreate4 from "./CreatePart/Offer&Order4";

let defaultArticle = false;
class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    if (defaultArticle) {
      this.article = defaultArticle;
      this.state.cargoTypes = this.article.cargoTypes;
      this.state.cargoData = this.article.cargoData;
    } else {
      this.article = {};
    }

    if (!this.state.cargoTypes) {
      this.state.cargoType = [];
    }
    if (!this.state.cargoData) {
      this.state.cargoData = [];
    }
  }
  state = {
    currentTab: 1,
    article: false,
  };
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
    Array.from(Array(number - 1), (_, i) => i + 1).map((item) => {
      if ((data = this.getRef(item).getArticlesInfo()))
        article = {
          ...article,
          ...data,
        };
      else error = true;
    });
    if (!error) {
      if (number === 4) {
        this.setState(
          { article: { ...article, autor: this.props.user } },
          () => {
            this.setState({ currentTab: number });
          }
        );
      } else {
        let state = { currentTab: number };
        if (article.cargoTypes) {
          state = { ...state, cargoTypes: article.cargoTypes };
        }
        if (article.cargoData) {
          state = { ...state, cargoData: article.cargoData };
        }
        this.setState({ ...state });
      }
    }
  }
  render() {
    return (
      <>
        <div className="create-page create-order-page">
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
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
              cargoTypes={this.article.cargoTypes}
              cargoData={this.article.cargoData}
              cargoStandartData={this.article.cargoStandartData}
              comment={this.article.comment}
            />
            <OrderCreate2
              ref={(ref) => (this.step2 = ref)}
              className={`${this.state.currentTab === 2 ? "active" : ""} ${
                this.state.currentTab > 2 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(3);
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
              addressFrom={this.article.from}
              addressTo={this.article.to}
              startDate={this.article.startDate}
            />
            <OrderCreate3
              ref={(ref) => (this.step3 = ref)}
              className={`${this.state.currentTab === 3 ? "active" : ""} ${
                this.state.currentTab > 3 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(4);
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
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
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
              article={this.state.article}
            />
          </div>
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

export default connect(mapStateToProps)(OrderCreate);
