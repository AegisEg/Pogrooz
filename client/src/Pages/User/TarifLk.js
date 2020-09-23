// App
import React from "react";
import { ReactComponent as Warning } from "../../img/warning.svg";
// Router
import { Link } from "react-router-dom";
import Button from "../../Elements/Button";
import { connect } from "react-redux";
import Tariffs from "../../Partials/Tariffs";
import PayHistoryTable from "../../Partials/PayHistoryTable";

class Support extends React.Component {
  state = {};
  diffDates(day_one, day_two) {
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
  }
  render() {
    let tariff;
    if (this.props.user.expiriesTariffAt && this.props.user.tariff)
      tariff = this.props.user.tariff;
    if (this.props.user.expiriesTariffAt && !this.props.user.tariff)
      tariff = {
        name: "Тариф Возврат",
        isDemo: true,
      };
    if (!this.props.user.expiriesTariffAt && !this.props.user.tariff)
      tariff = false;
    return (
      <div className="standart-page">
        <div className="container-fluid">
          <h2 className="title">Мои тариф</h2>
          <div className="row align-items-center">
            <p className="f-14 mt-2 d-inline-block px-3">
              {!this.props.user.expiriesTariffAt && !tariff && (
                <>
                  <Warning /> Профиль скрыт
                </>
              )}

              {tariff &&
                this.diffDates(
                  new Date(this.props.user.expiriesTariffAt),
                  new Date()
                ) <= 3 && (
                  <>
                    <span>
                      {tariff.name} {tariff.isDemo ? "активен" : "оплачен"} до{" "}
                      {new Date(this.props.user.expiriesTariffAt).toDateR()}
                    </span>
                  </>
                )}
              {tariff &&
                this.diffDates(
                  new Date(this.props.user.expiriesTariffAt),
                  new Date()
                ) > 3 && (
                  <>
                    <span>
                      {tariff.name} {tariff.isDemo ? "активен" : "оплачен"} до{" "}
                      {new Date(this.props.user.expiriesTariffAt).toDateR()}
                    </span>
                  </>
                )}
            </p>
            <div className="col mt-2">
              <Button type="fill" className="f-12" paddingVertical="6px">
                Пополнить
              </Button>
            </div>
          </div>

          <PayHistoryTable user={this.props.user} />
          <h3 className="f-16 font-weight-normal mt-4">Продлить тариф</h3>
          <Tariffs />
          <span className="f-14">Тарификация понедельная.</span>
          <p className="f-12 mt-0">
            *Расчет стоимости дня произведен из расчета 30 дней в месяц,
            указывается в ознакомительных целях.
          </p>
          <span className="mb-4 mt-2 d-block">
            <Link
              to="/autopay"
              className="f-14 href-hover"
              style={{
                color: "#000",
              }}
            >
              Настройка автоплатежа
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Support);
