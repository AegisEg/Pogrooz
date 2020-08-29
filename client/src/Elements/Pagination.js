// App
import React from "react";
import ReactPaginate from "react-paginate";

//imgs
import prevQuest from "../img/prevQuest.png";
import prevQuestEnable from "../img/prevQuestEnable.png";
import nextQuest from "../img/nextQuest.png";
import nextQuestEnable from "../img/nextQuestEnable.png";

class Pagination extends React.Component {
  handlePageClick = (data) => {
    let selected = data.selected;
    this.props.onPageChange(selected);
  };
  render() {
    return (
      <div className="container-fluid">
        <ReactPaginate
          previousLabel={
            this.props.currentPage === 0 ? (
              <img src={prevQuest} alt="nextQuest" />
            ) : (
              <img src={prevQuestEnable} alt="nextQuestEnable" />
            )
          }
          nextLabel={
            this.props.currentPage === this.props.pageCount ? (
              <img src={nextQuest} alt="nextQuest" />
            ) : (
              <img src={nextQuestEnable} alt="nextQuestEnable" />
            )
          }
          pageCount={this.props.pageCount + 1}
          forcePage={this.props.currentPage}
          breakLabel={"..."}
          onPageChange={this.handlePageClick}
          breakClassName={"break-me"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          containerClassName={`pagination ${this.props.className}`}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default Pagination;
