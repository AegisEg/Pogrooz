// App
import React from "react";
import ConfigSettings from "../../config/settings";
// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import Select from "../../Elements/Select";
import { Link } from "react-router-dom";
import CheckBoxSwitcher from "../../Elements/CheckBoxSwitcher";
import CheckBox from "../../Elements/CheckBox";
import ArticleShow from "../../Catalog/ArticleShow";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
//IMGS
import nextQuestEnable from "../../img/nextQuestEnable.png";

import articlestest from "../../config/articlestest.js";

class OfferCreate1 extends React.Component {
  state = {
    extraOptions: false,
    doContract: false,
    paymentMethods: false,
  };
  render() {
    return (
      <div className={`step-create ${this.props.className}`}>
        <div className="row">
          <div className=" col-12 col-md-8 row carType">
            <h4
              className="f-16 col-12 mb-1"
              style={{
                fontWeight: "normal",
              }}
            >
              Тип авто
            </h4>

            <div className="mt-3">
              <Select
                options={[{ value: 4, label: "Машина" }]}
                placeholder="Тип  машины"
                onChange={(val) => {
                  if (val) this.setState({ carType: val.value });
                }}
              />
            </div>
            <div className=" mt-3">
              <Select
                options={[{ value: 4, label: "Машина" }]}
                placeholder="Тип  машины"
                onChange={(val) => {
                  if (val) this.setState({ carType: val.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Select
                options={[{ value: 4, label: "Машина" }]}
                placeholder="Тип  машины"
                onChange={(val) => {
                  if (val) this.setState({ carType: val.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Select
                options={[{ value: 4, label: "Машина" }]}
                placeholder="Тип  машины"
                onChange={(val) => {
                  if (val) this.setState({ carType: val.value });
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 row  align-items-center">
            <h4
              className="f-16 col-12"
              style={{
                marginBottom: "20px",
                fontWeight: "normal",
              }}
            >
              Добавьте фото машины
            </h4>
            <div className="col-12 d-inline-block align-self-center text-center">
              <div className="d-inline-block px-4 mt-2">
                <Button type="fill" paddingHorizontal="30px">
                  Загрузить
                </Button>
              </div>
              <img
                src={ConfigSettings.defaultCar}
                style={{
                  verticalAlign: "top",
                  marginTop: "10px",
                }}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="row order-swicher-wrapper">
          <div className="col-sm-6 col-lg-4">
            <div className="CheckBoxSwitcher-wrapper">
              <CheckBoxSwitcher
                lableClassname="f-16"
                val={this.state.extraOptions}
                onChange={() => {
                  this.setState({
                    extraOptions: !this.state.extraOptions,
                  });
                }}
                lable="Дополнительные параметры"
              />
            </div>
            <CSSTransitionGroup
              transitionName="height-animation-item"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              style={{
                display: "contents",
              }}
            >
              {this.state.extraOptions && (
                <div className="pt-2 cheked-list">
                  <div className="mt-2">
                    <CheckBox id="cargo" text="Попутный груз" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo2" text="Страхование груза водителем" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo3" text="Пломбирование" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo4" text="Мед. книжка" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo5" text="Нужны поддоны" />
                  </div>
                  <div className="mt-2 d-sm-flex">
                    <CheckBox id="cargo6" text="Сопровождение" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo7" text="Услуги грузчика" />
                  </div>
                </div>
              )}
            </CSSTransitionGroup>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="CheckBoxSwitcher-wrapper">
              <CheckBoxSwitcher
                val={this.state.doContract}
                onChange={() => {
                  this.setState({ doContract: !this.state.doContract });
                }}
                lable="Заключение договора"
              />
            </div>
            <CSSTransitionGroup
              transitionName="height-animation-item"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              style={{
                display: "contents",
              }}
            >
              {this.state.doContract && (
                <div className="pt-2 cheked-list">
                  <div className="mt-2">
                    <CheckBox id="cargo8" text="Физ лицо" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo9" text="ООО" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo10" text="ИП" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo11" text="Самозанятый" />
                  </div>
                </div>
              )}
            </CSSTransitionGroup>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="CheckBoxSwitcher-wrapper">
              <CheckBoxSwitcher
                val={this.state.paymentMethods}
                onChange={() => {
                  this.setState({
                    paymentMethods: !this.state.paymentMethods,
                  });
                }}
                lable="Способы оплаты водителю"
              />
            </div>
            <CSSTransitionGroup
              transitionName="height-animation-item"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              style={{
                display: "contents",
              }}
            >
              {this.state.paymentMethods && (
                <div className="pt-2 cheked-list">
                  <div className="mt-2">
                    <CheckBox id="cargo12" text="Наличные" />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo13" text="На банковскую карту" />
                  </div>
                  <div className="mt-2">
                    <CheckBox
                      id="cargo14"
                      text="Блиц-перевод (перевод через систему мгновенных денежных переводов)"
                    />
                  </div>
                  <div className="mt-2">
                    <CheckBox id="cargo15" text="Безналичный расчет" />
                    <div className="mt-2 pl-4">
                      <Select
                        className="select175px "
                        options={[
                          { value: 0, label: "не выбрано" },
                          { value: 1, label: "с ндс" },
                          { value: 2, label: "без ндс" },
                        ]}
                        placeholder="не выбрано"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CSSTransitionGroup>
          </div>
        </div>

        <div className="row justify-content-end">
          <Button
            type="fill"
            className="mt-2 mx-3 input-action"
            paddingHorizontal="40px"
            onClick={this.props.next}
          >
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}
class CreateTemplateAuto extends React.Component {
  render() {
    return (
      <>
        <div className="create-page create-order-page">
          <div className="container-fluid">
            <h2 className="title">Новый шаблон авто</h2>
            <Input
              type="text"
              placeholder="Название шаблона"
              className="mb-4"
              style={{
                maxWidth: "725px",
              }}
            />
            <OfferCreate1 />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CreateTemplateAuto);
