import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Warning } from "../img/warning.svg";
import Button from "../Elements/Button";
class TariffStatus extends React.Component {
  state = { showTariffPop: false };
  showTariffPop = () => {
    this.setState({ showTariffPop: true });
    document.addEventListener("click", this.hideTariffPop);
  };
  hideTariffPop = () => {
    this.setState({ showTariffPop: false });
    document.removeEventListener("click", this.hideTariffPop);
  };
  diffDates(day_one, day_two) {
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
  }
  render() {
    if (this.props.isBan) {
      return (
        <div
          style={{ cursor: "pointer", width: "75px", marginRight: "5px" }}
          className="header-profile tariff-pop text-center f-12"
        >
          <span className="notTariff">
            <Warning /> Профиль заблокирован
          </span>
        </div>
      );
    } else {
      let tariff;
      if (this.props.expiriesAt && this.props.tariff)
        tariff = this.props.tariff;
      if (this.props.expiriesAt && !this.props.tariff)
        tariff = {
          name: "Тариф Возврат",
          isDemo: true,
        };
      if (!this.props.expiriesAt && !this.props.tariff) tariff = false;
      return (
        <div
          style={{ cursor: "pointer", width: "75px", marginRight: "5px" }}
          className="header-profile tariff-pop text-center f-12"
          onClick={() => {
            this.showTariffPop();
          }}
        >
          {!this.props.expiriesAt && !tariff && (
            <>
              <span className="notTariff">
                <Warning /> Профиль скрыт
              </span>
              {this.state.showTariffPop && (
                <div className="pop-block">
                  <p>
                    Ваш профиль и предложения скрыты.{" "}
                    <b>Вы не можете брать заказы.</b>
                  </p>
                  <p>
                    Оплатите тариф PRO или включите тариф ДЕМО для активации
                    профиля.
                  </p>
                  <Link to="/mytarif">
                    <Button type="fill" className="mt-2">
                      Продлить
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {tariff &&
            this.diffDates(new Date(this.props.expiriesAt), new Date()) <=
              3 && (
              <>
                <span>
                  {tariff.name} {tariff.isDemo ? "активен" : "оплачен"} до{" "}
                  {new Date(this.props.expiriesAt).toDateR()}
                </span>
                {this.state.showTariffPop && (
                  <div className="pop-block">
                    <p>
                      До окончания тарифа осталось{" "}
                      {Math.ceil(
                        this.diffDates(
                          new Date(this.props.expiriesAt),
                          new Date()
                        )
                      )}{" "}
                      {Math.ceil(
                        this.diffDates(
                          new Date(this.props.expiriesAt),
                          new Date()
                        )
                      ) === 1 && "день."}
                      {Math.ceil(
                        this.diffDates(
                          new Date(this.props.expiriesAt),
                          new Date()
                        )
                      ) > 1 && "дня."}
                    </p>
                    <p>
                      Если его не продлить - ваш профиль и предлжения будут
                      скрыты для других пользователей.
                      <b>Вы не сможете брать заказы.</b>
                    </p>
                    <Link to="/mytarif">
                      <Button type="fill" className="mt-2">
                        Продлить
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          {tariff &&
            this.diffDates(new Date(this.props.expiriesAt), new Date()) > 3 && (
              <Link to="/mytarif">
                <span>
                  {tariff.name} {tariff.isDemo ? "активен" : "оплачен"} до{" "}
                  {new Date(this.props.expiriesAt).toDateR()}
                </span>
              </Link>
            )}
        </div>
      );
    }
  }
}
export default TariffStatus;
