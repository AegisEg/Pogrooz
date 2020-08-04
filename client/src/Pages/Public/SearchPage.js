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
        <Filter className="background-gray filter-main" />
        <Articles />
        <div className="text-center">
          <Link to="/" className="href">
            <Button
              type="empty"
              margin="20px 0 70px auto"
              className="mx-auto  bg-gray hover-underline"
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
