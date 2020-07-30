// App
import React from "react";

// Router

class AutoPay extends React.Component {
  state = {
    enableAutoPay: false,
    formShow: true,
  };
  render() {
    return (
      <div className="standart-page">
        <div className="container-fluid">
          <h2 className="title mb-0">Отслеживание</h2>
        </div>
      </div>
    );
  }
}

export default AutoPay;
