// App
import React from "react";

// Router
import Button from "../../Elements/Button";
import Tarifs from "../../Partials/Tarrifs";
class TarifPage extends React.Component {
  render() {
    return (
      <div className="tarrifs-page standart-page container-fluid">
        <h1 className="px-0">Тарифы</h1>
        <div className="row">
          <div className="px-3">
            <Button type="empty" className="text-decode text-left bg-gray f-14">
              Для Грузовладельцев размещение заказов и заявок на предложения
              перевозчиков БЕСПЛАТНО.
            </Button>
          </div>
        </div>
        <p
          className="f-18"
          style={{
            marginBottom: "15px",
          }}
        >
          Тариф для подключения перевозчиков к порталу PoGrooz
        </p>
        <p
          className="f-14"
          style={{
            marginBottom: "46px",
          }}
        >
          Перевозчику для того, чтобы его предложения были активны и для того,
          чтобы он имел возможность брать заказы нужно оплатить Тариф PRO в
          размере 140 руб в неделю. Тариф рассчитывается понедельно. При
          регистрации перевозчика он может активировать Тариф ДЕМО режим на 1
          неделю. Далее необходимо продлить тариф. Историю и данные по текущему
          тарифу Вы можете посмотреть на странице Тарифы. У вас есть возможность
          купить тариф (на 1 неделю, месяц, 3 месяца, полгода и год). При оплате
          Тарифа PRO от 3 до 12 месяцев дается скидка от 10 до 20%.
        </p>
        <div className="row mt-2">
          <div className="row px-0 mx-0 col-12 col-lg-6">
            <div className="px-3 d-flex mt-3 fixed760">
              <span className="w-85px f-16">Стоимость:</span>
              <div className="pl-3">
                <span className="yellow-text">от 16</span>
                <p className="m-0 f-16">руб в день*</p>
              </div>
            </div>
            <div className="mt-3 px-3 d-flex d-md-none justify-content-end">
              <span className="f-16">Демо режим:</span>
              <div className="pl-3">
                <span className="yellow-text">7 дней</span>
                <p className="m-0 f-16">после регистрации</p>
              </div>
            </div>
            <div className="col-xl col-lg col-md col-sm-12 col-12 d-flex mt-3">
              <div className="f-12">
                <b>Понедельная тарификация.</b> После оплаты тарифа профиль и
                предложения перевозчика становятся доступны всем пользователям.                
              </div>
            </div>
          </div>
          <div className="row mx-0 col-12 col-lg-6">
            <div className="fixed760 ml-md-0 ml-lg-auto pr-lg-0 d-none d-md-flex pr-xl-3 mt-3 justify-content-end">
              <span className="f-16">Демо режим:</span>
              <div className="pl-3">
                <span className="yellow-text">7 дней</span>
                <p className="m-0 f-16">после регистрации</p>
              </div>
            </div>
            <div className="px-2 pl-custom text-md-left text-xl-right mt-3">
              <Button
                type="fill"
                margin={"0 0 0 auto"}
                paddingHorizontal={"25px"}
                paddingVertical={"15px"}
                className="f-17"
              >
                Попробовать
                <br />
                БЕСПЛАТНО
              </Button>
            </div>
          </div>
        </div>
        <p
          className="f-16"
          style={{
            marginBottom: "25px",
          }}
        >
          Пакеты для оплаты
        </p>
        <Tarifs />
        <p className="f-12" style={{
            marginTop:"20px"
        }}>
          *Расчет стоимости дня произведен из расчета 30 дней а месяц,
          указывается в ознакомительных целях.
        </p>
      </div>
    );
  }
}

export default TarifPage;
