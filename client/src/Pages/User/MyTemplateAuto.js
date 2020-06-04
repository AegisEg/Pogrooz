// App
import React from "react";

// Elements
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import Select from "../../Elements/Select";

import { connect } from "react-redux";
//IMGS
import nextQuestEnable from "../../img/nextQuestEnable.png";

class OfferCreate extends React.Component {
  render() {
    return (
      <>
        <div className="myauto-page">
          <h2
            className="title"
            style={{
              padding: "0 28px 15px 28px",
              marginRight: "-28px",
              marginLeft: "-28px",
              borderBottom: "1px solid #DDDDDD",
            }}
          >
            Мои шаблоны авто
          </h2>
          <div className="row w-100">
            <Button paddingVertical="11px" className="f-14 " type="fill">
              Добавить шаблон авто
            </Button>
            <div className="row">
              <div className="px-3">Мерседес Вито для перевозки </div>
              <Button type="fill" paddingVertical="" className="f-12 ">
                Редактивровать
              </Button>
              <Button type="fill" className="bg-gray f-12 ">
                Удалить
              </Button>
            </div>
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

export default connect(mapStateToProps)(OfferCreate);
