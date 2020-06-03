// App
import React from "react";
import ReactPaginate from "react-paginate";

//imgs
import prevQuest from "../img/prevQuest.png";
import prevQuestEnable from "../img/prevQuestEnable.png";
import nextQuest from "../img/nextQuest.png";
import nextQuestEnable from "../img/nextQuestEnable.png";

class Pagination extends React.Component {
  state = {
    currentpage: 1,
    offset: 0,
  };
  handlePageClick = (data) => {
    let selected = data.selected + 1;
    let offset = Math.ceil(selected * this.props.perPage);
    this.setState({ currentpage: selected, offset: offset });
  };
  render() {
    return (
      <ReactPaginate
        previousLabel={
          this.state.currentpage === 1 ? (
            <img src={prevQuest} alt="nextQuest" />
          ) : (
            <img src={prevQuestEnable} alt="nextQuestEnable" />
          )
        }
        nextLabel={
          this.state.currentpage === this.props.pageCount ? (
            <img src={nextQuest} alt="nextQuest" />
          ) : (
            <img src={nextQuestEnable} alt="nextQuestEnable" />
          )
        }
        pageCount={this.props.pageCount}
        breakLabel={"..."}
        onPageChange={this.handlePageClick}
        breakClassName={"break-me"}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    );
  }
}

export default Pagination;
