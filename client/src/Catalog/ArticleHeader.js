// App
import React from "react";

class ArticleHeader extends React.Component {
  render() {
    return (
      <>
        <div className="articles-header">
          <div className="container-fluid">
            <div className="row">
              <div className="ID-col">
                <span>#</span>
              </div>
              <div className="car-col">
                <span>Машина</span>
              </div>
              <div className="FromL-col">
                <span>Откуда</span>
              </div>
              <div className="ToLoc-col">
                <span>Куда</span>
              </div>
              <div className="Grooz-col">
                <span>Груз</span>
              </div>
              <div className="Date-col">
                <span>Загрузка</span>
              </div>
              <div className="Price-col">
                <span>Цена</span>
              </div>
              <div className="More-col">
                <span>Еще</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ArticleHeader;
