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
        <h2 className="title mb-0">Отслеживание</h2>
      </div>
    );
  }
}

export default AutoPay;
