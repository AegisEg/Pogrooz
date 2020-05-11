// App
import React from "react";
import yellowAngle from "../img/yellowAngle.png";
class Notification extends React.Component {
  render() {
    var text;
    switch (this.props.notification.code) {
      case "system":
        text = "Системное сообщение";
        break;
      //Уведомления по предложениям
      case "offer_new_request":
        //Новая заявка
        text=`Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem`;
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
      <div
        className={`notification-item ${
          this.props.notification.readble ? "" : "unreadble"
        } row mx-0`}
      >
        <div className="border-top"></div>
        <div className>
          <div className="date">{this.props.notification.date}</div>
          <div className="time">{this.props.notification.time}</div>
        </div>
        <div className="col text-notification">{text}</div>
        <div className="readble_col">
          {this.props.notification.readble ? (
            <span className="readble">
              <img src={yellowAngle} className="mr-3" /> Просмотрено
            </span>
          ) : (
            <span
              className="action-read"
              onClick={() => {
                alert("read");
              }}
            >
              Отметить как просмотрено
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Notification;
