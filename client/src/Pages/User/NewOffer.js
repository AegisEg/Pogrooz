// App
import React from "react";
import { connect } from "react-redux";
import HeaderCreate from "./CreatePart/HeaderCreate";
import OfferCreate1 from "./CreatePart/Offer1";
import OfferCreate2 from "./CreatePart/Offer2";
import OfferCreate3 from "./CreatePart/Offer3";
import OfferCreate4 from "./CreatePart/Offer&Order4";
let defaultArticle = JSON.parse(
  '{"type":"offer","car":{"additionally":[],"contractParam":[],"info":[{"carId":1,"property":"Манипулятор"}],"paymentInfo":[],"typesCar":[1],"name":"вапвап","photo":{"file":{},"path":"blob:http://localhost:3000/8be5cc42-265c-423f-8ae4-8a676c8b904a"}},"comment":"","budget":false,"startDate":false,"from":{"value":"Ханты-Мансийский Автономный округ - Югра, г Сургут, Комсомольский пр-кт, д 10/2","unrestricted_value":"628405, Ханты-Мансийский Автономный округ - Югра, г Сургут, Комсомольский пр-кт, д 10/2","data":{"postal_code":"628405","country":"Россия","country_iso_code":"RU","federal_district":null,"region_fias_id":"d66e5325-3a25-4d29-ba86-4ca351d9704b","region_kladr_id":"8600000000000","region_iso_code":"RU-KHM","region_with_type":"Ханты-Мансийский Автономный округ - Югра","region_type":"АО","region_type_full":"автономный округ","region":"Ханты-Мансийский Автономный округ - Югра","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"f1eb1809-47d4-4f0b-9a74-fa416e9d3df2","city_kladr_id":"8600001000000","city_with_type":"г Сургут","city_type":"г","city_type_full":"город","city":"Сургут","city_area":null,"city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":null,"city_district_type":null,"city_district_type_full":null,"city_district":null,"settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"ed954a61-bcfc-4099-8e69-f4b0ff87679a","street_kladr_id":"86000010000004300","street_with_type":"Комсомольский пр-кт","street_type":"пр-кт","street_type_full":"проспект","street":"Комсомольский","house_fias_id":"90b0530e-cff7-4fa3-b6fa-5e9941bf7437","house_kladr_id":"8600001000000430002","house_type":"д","house_type_full":"дом","house":"10/2","block_type":null,"block_type_full":null,"block":null,"flat_type":null,"flat_type_full":null,"flat":null,"flat_area":null,"square_meter_price":null,"flat_price":null,"postal_box":null,"fias_id":"90b0530e-cff7-4fa3-b6fa-5e9941bf7437","fias_code":"86000010000000000430002","fias_level":"8","fias_actuality_state":"0","kladr_id":"8600001000000430002","geoname_id":"1490624","capital_marker":"0","okato":"71136000000","oktmo":"71876000","tax_office":"8602","tax_office_legal":"8602","timezone":null,"geo_lat":"61.241142","geo_lon":"73.45149","beltway_hit":null,"beltway_distance":null,"metro":null,"qc_geo":"1","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":null,"qc":null}},"to":{"value":"Ханты-Мансийский Автономный округ - Югра, г Сургут, Комсомольский пр-кт, д 10/2","unrestricted_value":"628405, Ханты-Мансийский Автономный округ - Югра, г Сургут, Комсомольский пр-кт, д 10/2","data":{"postal_code":"628405","country":"Россия","country_iso_code":"RU","federal_district":null,"region_fias_id":"d66e5325-3a25-4d29-ba86-4ca351d9704b","region_kladr_id":"8600000000000","region_iso_code":"RU-KHM","region_with_type":"Ханты-Мансийский Автономный округ - Югра","region_type":"АО","region_type_full":"автономный округ","region":"Ханты-Мансийский Автономный округ - Югра","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"f1eb1809-47d4-4f0b-9a74-fa416e9d3df2","city_kladr_id":"8600001000000","city_with_type":"г Сургут","city_type":"г","city_type_full":"город","city":"Сургут","city_area":null,"city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":null,"city_district_type":null,"city_district_type_full":null,"city_district":null,"settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"ed954a61-bcfc-4099-8e69-f4b0ff87679a","street_kladr_id":"86000010000004300","street_with_type":"Комсомольский пр-кт","street_type":"пр-кт","street_type_full":"проспект","street":"Комсомольский","house_fias_id":"90b0530e-cff7-4fa3-b6fa-5e9941bf7437","house_kladr_id":"8600001000000430002","house_type":"д","house_type_full":"дом","house":"10/2","block_type":null,"block_type_full":null,"block":null,"flat_type":null,"flat_type_full":null,"flat":null,"flat_area":null,"square_meter_price":null,"flat_price":null,"postal_box":null,"fias_id":"90b0530e-cff7-4fa3-b6fa-5e9941bf7437","fias_code":"86000010000000000430002","fias_level":"8","fias_actuality_state":"0","kladr_id":"8600001000000430002","geoname_id":"1490624","capital_marker":"0","okato":"71136000000","oktmo":"71876000","tax_office":"8602","tax_office_legal":"8602","timezone":null,"geo_lat":"61.241142","geo_lon":"73.45149","beltway_hit":null,"beltway_distance":null,"metro":null,"qc_geo":"1","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":null,"qc":null}},"cargoTypes":[6],"cargoData":[],"cargoStandartData":{}}'
);
class OfferCreate extends React.Component {
  constructor(props) {
    super(props);
    if (defaultArticle) {
      this.article = defaultArticle;
      this.state.typesCar = this.article.car.typesCar;
    } else {
      this.article = {};
    }

    if (!this.state.typesCar) this.state.typesCar = [];
  }
  state = {
    currentTab: 1,
    article: false,
  };
  getRef(number) {
    switch (number) {
      case 1:
        return this.step1;
      case 2:
        return this.step2;
      case 3:
        return this.step3;
    }
  }
  nexTab(number) {
    let error = false;
    let data;
    let article = { type: "offer" };
    Array.from(Array(number - 1), (_, i) => i + 1).map((item) => {
      if ((data = this.getRef(item).getArticlesInfo()))
        article = {
          ...article,
          ...data,
        };
      else error = true;
    });
    if (!error) {
      if (number === 4) {
        this.setState(
          { article: { ...article, autor: this.props.user } },
          () => {
            this.setState({ currentTab: number });
          }
        );
      } else {
        let state = { currentTab: number };
        if (article.car && article.car.typesCar) {
          state = { ...state, typesCar: article.car.typesCar };
        }
        this.setState({ ...state });
      }
    }
  }
  render() {
    return (
      <>
        <div className="create-page create-order-page">
          <div className="container-fluid">
            <h2 className="title">{this.props.title}</h2>
            <HeaderCreate
              changeTub={(setTub) => {
                this.nexTab(setTub);
              }}
              currentTab={this.state.currentTab}
              tabs={[
                "Описание авто",
                "Мартшрут",
                "Описание груза",
                "Публикация товара",
              ]}
            />
          </div>
          <div className="steps-create">
            <OfferCreate1
              ref={(ref) => (this.step1 = ref)}
              className={`${this.state.currentTab === 1 ? "active" : ""} 
              ${this.state.currentTab > 1 ? "deactive" : ""}`}
              car={this.article.car}
              next={() => {
                this.nexTab(2);
              }}
              comment={this.article.comment}
              budget={this.article.budget}
            />
            <OfferCreate2
              ref={(ref) => (this.step2 = ref)}
              className={`${this.state.currentTab === 2 ? "active" : ""} ${
                this.state.currentTab > 2 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(3);
              }}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              addressFrom={this.article.from}
              addressTo={this.article.to}
              startDate={this.article.startDate}
            />
            <OfferCreate3
              ref={(ref) => (this.step3 = ref)}
              className={`${this.state.currentTab === 3 ? "active" : ""} ${
                this.state.currentTab > 3 ? "deactive" : ""
              }`}
              typesCar={this.state.typesCar}
              next={() => {
                this.nexTab(4);
              }}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              cargoTypes={this.article.cargoTypes}
              cargoData={this.article.cargoData}
              cargoStandartData={this.article.cargoStandartData}
            />

            <OfferCreate4
              key="OfferCreate4"
              className={`${this.state.currentTab === 4 ? "active" : ""}`}
              prev={() => {
                this.setState({ currentTab: this.state.currentTab - 1 });
              }}
              article={this.state.article}
            />
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
