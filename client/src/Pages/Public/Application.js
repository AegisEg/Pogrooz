// App
import React from "react";
import appsImg from "../../img/application.png";
class Application extends React.Component {
  render() {
    return (
      <div className="application-page standart-page">
        <h1>Страница в разработке</h1>
        <div className="application-div">
          <div className="row mx-0">
            <div className="col-12 d-block d-md-flex  align-items-end justify-content-center">
              <div className="row-3">
                <div>Извините,</div>
                <div>&nbsp;но</div>
                <div>&nbsp;страница</div>
              </div>
              <img src={appsImg} alt="" />
              <div className="row-2">
                <div>в</div>
                <div>&nbsp; разработке</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Application;
