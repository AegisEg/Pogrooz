// App
import React from "react";
import { connect } from "react-redux";
import HeaderCreate from "./CreatePart/HeaderCreate";
import OfferCreate1 from "./CreatePart/Offer1";
import OfferCreate2 from "./CreatePart/Offer2";
import OfferCreate3 from "./CreatePart/Offer3";
import OfferCreate4 from "./CreatePart/Offer&Order4";
let defaultArticle = false;
class OfferCreate extends React.Component {
  constructor(props) {
    super(props);
    if (defaultArticle) {
      this.article = defaultArticle;
      this.state.typesCar = this.article.car.typesCar;
    } else {
      this.article = {};
    }

    if (!this.state.typesCar) this.state.typesCar = [];
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
    let article = { type: "offer" };
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
        if (article.car && article.car.typesCar) {
          state = { ...state, typesCar: article.car.typesCar };
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
                "Описание авто",
                "Мартшрут",
                "Описание груза",
                "Публикация товара",
              ]}
            />
          </div>
          <div className="steps-create">
            <OfferCreate1
              ref={(ref) => (this.step1 = ref)}
              className={`${this.state.currentTab === 1 ? "active" : ""} 
              ${this.state.currentTab > 1 ? "deactive" : ""}`}
              car={this.article.car}
              next={() => {
                this.nexTab(2);
              }}
              comment={this.article.comment}
              budget={this.article.budget}
            />
            <OfferCreate2
              ref={(ref) => (this.step2 = ref)}
              className={`${this.state.currentTab === 2 ? "active" : ""} ${
                this.state.currentTab > 2 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(3);
              }}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              addressFrom={this.article.from}
              addressTo={this.article.to}
              startDate={this.article.startDate}
            />
            <OfferCreate3
              ref={(ref) => (this.step3 = ref)}
              className={`${this.state.currentTab === 3 ? "active" : ""} ${
                this.state.currentTab > 3 ? "deactive" : ""
              }`}
              typesCar={this.state.typesCar}
              next={() => {
                this.nexTab(4);
              }}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              cargoTypes={this.article.cargoTypes}
              cargoData={this.article.cargoData}
              cargoStandartData={this.article.cargoStandartData}
            />

            <OfferCreate4
              key="OfferCreate4"
              className={`${this.state.currentTab === 4 ? "active" : ""}`}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
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

export default connect(mapStateToProps)(OfferCreate);
