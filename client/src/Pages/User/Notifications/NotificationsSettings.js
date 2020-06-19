// App
import React from "react";
import SettingsFiled from "../../../Elements/SettingsFiled";
import Button from "../../../Elements/Button";
// Redux
import { connect } from "react-redux";
var settingsField = [
  {
    label: "Новая заявка",
    role: "carrier",
    keyField: "offer_new_request",
    type: "offer",
  },
  {
    label: "Вашу заявку подтвердили",
    role: "cargo",
    keyField: "order_you_executor",
    type: "offer",
  },
  {
    label: "Смена статуса предложения",
    role: "all",
    keyField: "offer_status",
    type: "offer",
  },
  {
    label: "Новый отзыв",
    role: "all",
    keyField: "offer_new_review",
    type: "offer",
  },
  {
    label: "Сообщение по предложению",
    role: "all",
    keyField: "offer_new_message",
    type: "offer",
  },
  {
    label: "Заказ в пути(отслеживание)",
    role: "cargo",
    keyField: "order_tracking",
    type: "offer",
  },
  {
    label: "Новая заявка",
    role: "cargo",
    keyField: "order_new_request",
    type: "order",
  },
  {
    label: "Вас выбрали исполнителем",
    role: "carrier",
    keyField: "order_you_executor",
    type: "order",
  },
  {
    label: "Смена статуса заказа",
    role: "all",
    keyField: "order_status",
    type: "order",
  },
  {
    label: "Новый отзыв",
    role: "all",
    keyField: "order_new_review",
    type: "order",
  },
  {
    label: "Сообщение по заказу",
    role: "all",
    keyField: "order_new_message",
    type: "order",
  },
  {
    label: "Заказ в пути(отслеживание)",
    role: "cargo",
    keyField: "order_tracking",
    type: "order",
  },
  {
    label: "Новые сообщение пользователей",
    role: "all",
    keyField: "user_new_message",
    type: "common",
  },
  {
    label: "Моджерация заказов",
    role: "cargo",
    keyField: "order_moderation",
    type: "common",
  },
  {
    label: "Моджерация предложений",
    role: "carrier",
    keyField: "offer_moderation",
    type: "common",
  },
  {
    label: "Системные уведомления",
    role: "all",
    keyField: "system",
    type: "common",
  },
  {
    label: "Оповещения о остатке тарифа",
    role: "carrier",
    keyField: "tarif_ends",
    type: "common2",
  },
  {
    label: "Зачисление оплаты",
    role: "carrier",
    keyField: "tarif_payed",
    type: "common2",
  },
];
class NotificationsSettings extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h2 className="title">Настроить уведомления</h2>
        <div className="settings-notification">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6">
              <p className="setting-title">По предложениям</p>
              {settingsField.map((item, i) => {
                if (
                  item.type === "offer" &&
                  (this.props.user.type === item.role || item.role === "all")
                ) {
                  return (
                    <SettingsFiled
                      key={i}
                      label={item.label}
                      keyField={item.keyField}
                    />
                  );
                } else return <></>;
              })}
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <p className="setting-title">По заказам</p>
              {settingsField.map((item, i) => {
                if (
                  item.type === "order" &&
                  (this.props.user.type === item.role || item.role === "all")
                ) {
                  return (
                    <SettingsFiled
                      key={i}
                      label={item.label}
                      keyField={item.keyField}
                    />
                  );
                } else return <></>;
              })}
            </div>
          </div>
          <div className="row common-settings">
            <div className="col-12 col-sm-12 col-md-6">
              <p className="setting-title">Общие</p>
              {settingsField.map((item, i) => {
                if (
                  item.type === "common" &&
                  (this.props.user.type === item.role || item.role === "all")
                ) {
                  return (
                    <SettingsFiled
                      key={i}
                      label={item.label}
                      keyField={item.keyField}
                    />
                  );
                } else return <></>;
              })}
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <p className="setting-title"></p>
              {settingsField.map((item, i) => {
                if (
                  item.type === "common2" &&
                  (this.props.user.type === item.role || item.role === "all")
                ) {
                  return (
                    <SettingsFiled
                      key={i}
                      label={item.label}
                      keyField={item.keyField}
                    />
                  );
                } else return <></>;
              })}
            </div>
          </div>
        </div>
        <Button
          onClick={() => {}}
          type="fill"
          className="float-right"
          paddingVertical={"8px"}
          fontSize={"17px"}
          paddingHorizontal={"35px"}
        >
          Сохранить все
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NotificationsSettings);
