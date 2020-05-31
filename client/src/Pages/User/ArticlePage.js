// App
import React from "react";
import configApi from "../../config/api";
import { toast } from "react-toastify";
// Elements
import Articles from "../../Catalog/Articles";
import articlestest from "../../config/articlestest.js";

class ArticlePage extends React.Component {
  render() {
    return (
      <div className="articles-block">
        <div className="articles-header d-none d-md-block">
          <div className="row">
            <div className="col-md-6 row">
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
            <div className="col-md-6 row">
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
      </div>
    );
  }
}

export default ArticlePage;
