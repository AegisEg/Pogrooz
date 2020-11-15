// App
import React from "react";
import { ReactComponent as ArrowUp } from "../../img/arrowUp.svg";
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
                <span>
                  Загрузка
                  {this.props.sortChange && (
                    <ArrowUp
                      className={`${
                        (!!this.props.sortBy &&
                          !!this.props.sortBy["startDate.date"] &&
                          this.props.sortBy["startDate.date"] > 0 &&
                          "up") ||
                        ""
                      }
                      ${
                        (!!this.props.sortBy &&
                          !!this.props.sortBy["startDate.date"] &&
                          this.props.sortBy["startDate.date"] < 0 &&
                          "down") ||
                        ""
                      }`}
                      onClick={() => {
                        this.props.sortChange("startDate.date");
                      }}
                    ></ArrowUp>
                  )}
                </span>
              </div>
              <div className="Price-col">
                <span>
                  Цена
                  {this.props.sortChange && (
                    <ArrowUp
                      className={`${
                        (!!this.props.sortBy &&
                          !!this.props.sortBy["budget"] &&
                          this.props.sortBy["budget"] > 0 &&
                          "up") ||
                        ""
                      }
                    ${
                      (!!this.props.sortBy &&
                        !!this.props.sortBy["budget"] &&
                        this.props.sortBy["budget"] < 0 &&
                        "down") ||
                      ""
                    }`}
                      onClick={() => {
                        this.props.sortChange("budget");
                      }}
                    ></ArrowUp>
                  )}
                </span>
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
