// App
import React from "react";
// Elements
import Articles from "../../Catalog/Articles";
import { connect } from "react-redux";

class MyArticles extends React.Component {
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
    let filter = {
      author: this.props.user,
      type: this.props.typeArticle,
      allStatus: this.props.statusArticle,
      status: this.state.currentStatus,
    };
    if (filter.status === "all") delete filter.status;
    else delete filter.allStatus;
    return (
      <div className="lk-order-page">
        <div className="container-fluid">
          <h2 className="title">{this.props.title}</h2>
          {this.renderTabs()}
        </div>
        <Articles filter={filter} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(MyArticles);
