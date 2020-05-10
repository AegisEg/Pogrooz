// App
import React from "react";
import yellowAngle from "../img/yellowAngle.png";
class Notification extends React.Component {
  render() {
    var text;
    switch (this.props.notification.type) {
      case "system":
        text = "Системное сообщение";
        break;
      //Уведомления по предложениям
      case "offer_new_request":
        //Новая заявка
        break;
      case "offer_status":
        //Смена статуса
        break;
      case "offer_new_review":
        //Новый отзыв
        break;
      case "offer_new_message":
        //Новое сообщение
        break;
      case "offer_you_executor":
        //Выбрали исполнителем
        break;
      case "offer_succsess_moderation":
        //Выбрали исполнителем
        break;
      //Уведомления по предложениям
      //Уведомления по заказам
      case "order_you_executor":
        //Выбрали исполнителем
        break;
      case "order_status":
        //Смена статуса
        break;
      case "order_new_review":
        //Смена статуса
        break;
      case "order_new_message":
        //Новое сообщение
        break;
      //Уведомления по заказам
      //Уведомления по тарифам
      case "tarif_ends":
        //Выбрали исполнителем
        break;
      case "tarif_payed":
        //Смена статуса
        break;
      //Уведомления по заказам
    }
    return (
      <div className="row notification-item"> 
        <span className="border-top"></span>   
        <div className="col-2">{this.props.notification.date}</div>
        <div className="col-8">{text}</div>
        <div className="col-2">
          {this.props.notification.readble ? (
            <span><img src={yellowAngle} className="mr-3"/> Просмотрено</span>
          ) : (
            <span>Отметить как просмотрено</span>
          )}
        </div>
      </div>
    );
  }
}

export default Notification;
