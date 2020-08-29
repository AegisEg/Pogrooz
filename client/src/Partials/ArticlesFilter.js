import React from "react";
import Filter from "../Elements/Filter";
import Articles from "../ArticlesElements/Articles";
class ArticlesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.articles = React.createRef();
  }
  state = {
    status: 2,
    type: "offer",
    carType: false,
    additionally: [],
    contractInfo: [],
    paymentInfo: [],
    from: false,
    to: false,
    cargoType: false,
    cargoStandartData: {},
    cargoData: [],
    startDate: {
      date: false,
      timeFrom: false,
      timeTo: false,
    },
    budget: false,
    rating: false,
  };
  onSearch = () => {
    this.articles.current.getAricles();
  };
  render() {
    return (
      <>
        <Filter
          onChange={(state) => {
            this.setState({ ...state });
          }}
          onSearch={this.onSearch}
          options={this.state}
          className="background-gray-768 filter-main"
        />
        <Articles ref={this.articles} filter={{ ...this.state }} />
      </>
    );
  }
}
export default ArticlesFilter;
