// App
import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
// Router
import Meta from "../../Elements/Meta";
import ArticlesFilter from "../../Partials/ArticlesFilter";
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    let getParams;
    if (this.props.location.search) {
      getParams = queryString.parse(this.props.location.search);
      this.defaultStateF = getParams.params;
    }
  } 
  render() {
    return (
      <div className="search-page">
        {this.props.type && (
          <Meta
            keyMeta={
              this.props.type === "offer" ? "offerSearch" : "orderSearch"
            }
            options={{}}
          />
        )}
        <ArticlesFilter
          defaultStateF={this.defaultStateF}
          ref={this.filter}
          type={this.props.type}
        />
        {/* <div className="text-center">
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
        </div> */}
      </div>
    );
  }
}

export default withRouter(SearchPage);
