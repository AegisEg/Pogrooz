// App
import React from "react";
// Elements
import Articles from "../../Catalog/Articles";
import articlestest from "../../config/articlestest.js";
import { connect } from "react-redux";

class MyOrders extends React.Component {
  state = {
    currentStatus: "all",
  };
  renderTabs() {
    return (
      <div className="tab_groups">
        <span
          className={`tab_group ${
            this.state.currentStatus === "all" ? "active" : ""
          }`}
          onClick={() => {
            this.setState({ currentStatus: "all" });
          }}
        >
          Все (3)
        </span>

        {this.props.statusArticle.length > 1 &&
          this.props.statusArticle.map((item, index) => {
            return (
              <span
                key={index}
                className={`tab_group ${
                  this.state.currentStatus === item ? "active" : ""
                }`}
                onClick={() => {
                  this.setState({ currentStatus: item });
                }}
              >
                {item === 1 && "Черновики"}
                {item === 2 && "Открытые"}
                {item === 3 && "Выбран исполнитель"}
                {item === 4 && "В пути"}
                {item === 5 && "Выполненные"}
                {item === 6 && "Отмененные"}
                {item === 7 && "Корзина"}
              </span>
            );
          })}
      </div>
    );
  }
  render() {
    //Ставлю статус(0,1 - открытый, 2,3 - в работе, 3,4 - закрытый) и Тип(Заказ
    //или Предложение) для отображения
    let articlesList = articlestest.filter((item) => {
      if (item.user.id == this.props.user.id)
        if (item.type === this.props.typeArticle) {
          if (this.state.currentStatus === "all") {
            return this.props.statusArticle.find((x) => {
              return x === item.status;
            });
          } else {
            return item.status === this.state.currentStatus;
          }
        } else return false;
    });
    return (
      <div className="lk-order-page">
        <div className="container-fluid">
          <h2 className="title">{this.props.title}</h2>
          {this.renderTabs()}
        </div>
        <Articles articlesList={articlesList} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(MyOrders);
