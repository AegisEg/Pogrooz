// App
import React from "react";
import NoMatchPng from "../img/NoMatch.png";
class NoMatch extends React.Component {
  render() {
    return (
      <div className="nomatch-page standart-page">
        <h1>Страница не найдена</h1>
        <div className="nomatch-div">
          <div className="row mx-0">
            <div className="col-12 justify-content-center">
              <div className="position-relative NoMatchPng-wrapper">
                <div className="row-4">
                  <div>Извините,&nbsp;</div>
                  <div>маршрут от&nbsp;</div>
                  <div>запрашиваемой&nbsp;</div>
                  <div>страницы</div>
                </div>
                <img src={NoMatchPng} className="NoMatchPng" alt="" />
                <div className="row-3">
                  <div>До&nbsp;</div>
                  <div>сервера&nbsp;</div>
                  <div>не найден!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoMatch;
