// App
import React from "react";
import SettingsFiled from "../../../Elements/SettingsFiled";
import Button from "../../../Elements/Button";
import Loading from "../../../Elements/Loading";
import LoadingFixed from "../../../Elements/LoadingFixed";
import { CSSTransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";
import api from "../../../config/api";
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
    keyField: "offer_you_executor",
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
    disable: true,
    type: "offer",
  },
  // {
  //   label: "Заказ в пути(отслеживание)",
  //   role: "cargo",
  //   keyField: "order_tracking",
  //   type: "offer",
  // },
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
    disable: true,
    type: "order",
  },
  // {
  //   label: "Заказ в пути(отслеживание)",
  //   role: "cargo",
  //   keyField: "order_tracking",
  //   type: "order",
  // },
  {
    label: "Новые сообщение пользователей",
    role: "all",
    keyField: "user_new_message",
    disable: true,
    type: "common",
  },
  {
    label: "Модерация заказов",
    role: "cargo",
    keyField: "order_moderation",
    type: "common",
  },
  {
    label: "Модерация предложений",
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
  state = {
    settings: {},
    isFetching: true,
    isFetchingSave: false,
  };
  componentDidMount() {
    fetch(`${api.urlApi}/api/user/getSettings`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.user.apiToken}`,
      },
    })
      .then((response) => response.json())
      .then(({ settings }) => {
        this.setState({ settings, isFetching: false });
      });
  }
  saveSettings = () => {
    this.setState({ isFetchingSave: true }, () => {
      fetch(`${api.urlApi}/api/user/save-settings`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
        body: JSON.stringify({
          settings: this.state.settings,
        }),
      })
        .then((response) => response.json())
        .then(({ settings }) => {
          toast.success("Настройки сохранены");
          this.setState({ isFetchingSave: false });
        });
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <h2 className="title">Настроики уведомлений</h2>
        <Loading isLoading={this.state.isFetching}></Loading>
        <LoadingFixed isLoading={this.state.isFetchingSave}></LoadingFixed>
        <CSSTransitionGroup
          transitionName="erase-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {!this.state.isFetching && (
            <div className="settings-notification">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6">
                  <p className="setting-title">По предложениям</p>
                  {settingsField.map((item, i) => {
                    if (
                      item.type === "offer" &&
                      (this.props.user.type === item.role ||
                        item.role === "all")
                    ) {
                      return (
                        <SettingsFiled
                          key={i}
                          label={item.label}
                          onChange={(type, val) => {
                            let settings = this.state.settings;
                            if (!settings[item.keyField])
                              settings[item.keyField] = {};
                            settings[item.keyField][type] = val;
                            this.setState({ settings });
                          }}
                          disablePush={item.disable}
                          valueMail={
                            this.state.settings[item.keyField] &&
                            this.state.settings[item.keyField].mail
                          }
                          valuePush={
                            item.disable
                              ? false
                              : this.state.settings[item.keyField] &&
                                this.state.settings[item.keyField].push
                          }
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
                      (this.props.user.type === item.role ||
                        item.role === "all")
                    ) {
                      return (
                        <SettingsFiled
                          key={i}
                          label={item.label}
                          onChange={(type, val) => {
                            let settings = this.state.settings;
                            if (!settings[item.keyField])
                              settings[item.keyField] = {};
                            settings[item.keyField][type] = val;
                            this.setState({ settings });
                          }}
                          disablePush={item.disable}
                          valueMail={
                            this.state.settings[item.keyField] &&
                            this.state.settings[item.keyField].mail
                          }
                          valuePush={
                            item.disable
                              ? false
                              : this.state.settings[item.keyField] &&
                                this.state.settings[item.keyField].push
                          }
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
                      (this.props.user.type === item.role ||
                        item.role === "all")
                    ) {
                      return (
                        <SettingsFiled
                          key={i}
                          label={item.label}
                          onChange={(type, val) => {
                            let settings = this.state.settings;
                            if (!settings[item.keyField])
                              settings[item.keyField] = {};
                            settings[item.keyField][type] = val;
                            this.setState({ settings });
                          }}
                          valueMail={
                            this.state.settings[item.keyField] &&
                            this.state.settings[item.keyField].mail
                          }
                          disablePush={item.disable}
                          valuePush={
                            item.disable
                              ? false
                              : this.state.settings[item.keyField] &&
                                this.state.settings[item.keyField].push
                          }
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
                      (this.props.user.type === item.role ||
                        item.role === "all")
                    ) {
                      return (
                        <SettingsFiled
                          key={i}
                          label={item.label}
                          onChange={(type, val) => {
                            let settings = this.state.settings;
                            if (!settings[item.keyField])
                              settings[item.keyField] = {};
                            settings[item.keyField][type] = val;
                            this.setState({ settings });
                          }}
                          valueMail={
                            this.state.settings[item.keyField] &&
                            this.state.settings[item.keyField].mail
                          }
                          valuePush={
                            this.state.settings[item.keyField] &&
                            this.state.settings[item.keyField].push
                          }
                          keyField={item.keyField}
                        />
                      );
                    } else return <></>;
                  })}
                </div>
              </div>
              <div className="text-right">
                <Button
                  onClick={this.saveSettings}
                  type="fill"
                  className="mb-4"
                  paddingVertical={"8px"}
                  fontSize={"17px"}
                  paddingHorizontal={"35px"}
                >
                  Сохранить все
                </Button>
              </div>
            </div>
          )}
        </CSSTransitionGroup>
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
