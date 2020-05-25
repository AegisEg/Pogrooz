// App
import React from "react";
import configApi from "../../config/api";
import { toast } from "react-toastify";

// Elements
import Articles from "../../Catalog/Articles";

class Profile extends React.Component {
  state = {};

  render() {
    //Ставлю статус(0 - открытый, 1 - в работе, 2 - закрытый) и Тип(Заказ
    //или Предложение) для отображения
    return (
      <div className="lk-order-page">
        <h2 class="title">{this.props.title}</h2>        
        <Articles articleStatus={this.props.articleStatus} articleType={this.props.articleType} />
      </div>
    );
  }
}

export default Profile;
