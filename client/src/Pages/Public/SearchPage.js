// App
import React from "react";

// Router
import { Link } from "react-router-dom";
import Button from "../../Elements/Button";
import Filter from "../../Elements/Filter";
import Articles from "../../Catalog/Articles";
class SearchPage extends React.Component {
  state = {
    searchType: "offer",
  };
  render() {
    return (
      <div className="search-page">
        <div className="row mx-0 search-tabs background-gray tabs pb-lg-0 pb-xl-3 justify-content-center">
          <div
            className={`tab mx-3 text-uppercase ${
              this.state.searchType == "offer" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ searchType: "offer" });
            }}
          >
            Услуги <span className="d-380 d-sm-inline-block">перевозчиков</span>
          </div>
          <div
            className={`tab mx-3 text-uppercase ${
              this.state.searchType == "order" ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ searchType: "order" });
            }}
          >
            Новые заказы{" "}
            <span className="d-380 d-sm-inline-block">на перевозку</span>
          </div>
        </div>
        <Filter className="background-gray filter-main" />
        <Articles />
        <div className="text-center">
          <Link to="/" className="href">
            <Button
              type="empty"
              margin="auto 0 70px auto"
              className="mx-auto bg-gray hover-underline"
              paddingVertical={"13px"}
              paddingHorizontal={"35px"}
            >
              Показать больше
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SearchPage;
