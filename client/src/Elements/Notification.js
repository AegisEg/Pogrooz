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
        text = `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem`;
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
      case "offer_new_message":
        //Новое сообщение
        break;
      //Уведомления по предложениям
      //Уведомления по заказам
      case "order_new_request":
        //Новая заявка
        break;
      case "order_you_executor":
        //Выбрали исполнителем
        break;
      case "order_status":
        //Смена статуса
        break;
      case "order_new_review":
        //Новый отзыв
        break;
      case "order_new_message":
        //Новое сообщение
        break;
      case "order_tracking":
        //Уведомления отслеживания
        break;
      //Уведомления по заказам
      //Уведомления по тарифам
      case "tarif_ends":
        //Остаток тарифа
        break;
      case "tarif_payed":
        //Зачисление оплаты
        break;
      //Уведомления по тарифам
      //Уведомления общие
      case "user_new_message":
        //Новое сообщение
        break;
      case "order_moderation":
        //Моджерация заказов
        break;
      case "offer_moderation":
        //Моджерация заказов
        break;
      //Уведомления общие
    }
    return (
      <div
        className={`notification-item ${
          this.props.notification.readble ? "" : "unreadble"
        } row d-block d-sm-flex mx-0`}
      >
        <div className="border-top"></div>
        <div className="">
          <div className="date">{this.props.notification.date}</div>
          <div className="time">{this.props.notification.time}</div>
        </div>
        <div className="col px-0 px-sm-3 text-notification">{text}</div>
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
