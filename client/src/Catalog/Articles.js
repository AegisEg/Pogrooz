// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";

class Articles extends React.Component {
  render() {
    return (
      <div className="articles-block">
        <div className="articles-header d-none d-md-block">
          <div className="row">
            <div className="col-md-6   mx-0 row">
              <div className="col-md-1">
                <span>#</span>
              </div>
              <div className="col-md-3">
                <span>Машина</span>
              </div>
              <div className="col-md-4">
                <span>Откуда</span>
              </div>
              <div className="col-md-4">
                <span>Куда</span>
              </div>
            </div>
            <div className="col-md-6  mx-0 row">
              <div className="col-md-4">
                <span>Груз</span>
              </div>
              <div className="col-md-3">
                <span>Загрузка</span>
              </div>
              <div className="col-md-2">
                <span>Цена</span>
              </div>
              <div className="col-md-3">
                <span>Еще</span>
              </div>
            </div>
          </div>
        </div>
        {this.props.articlesList.map((article, i) => {          
            return <Article key={i} article={article} />;
        })}
        <div className="container-fluid">
          <Pagination pageCount={10} perPage="1" />
        </div>
      </div>
    );
  }
}

export default Articles;
