// App
import React from "react";
// Elements

import { connect } from "react-redux";
import HeaderCreate from "./CreatePart/HeaderCreate";
import OrderCreate1 from "./CreatePart/Order1";
import OrderCreate2 from "./CreatePart/Order2";
import OrderCreate3 from "./CreatePart/Order3";
import OrderCreate4 from "./CreatePart/Offer&Order4";

let defaultArticle = JSON.parse(
  '{"type":"offer","cargoTypes":[1],"cargoData":[],"cargoStandartData":{"unit":2,"weight":"2","length":"2","width":"2","height":"2","count":"3"},"cargoPhoto":[],"comment":"","startDate":false,"from":{"value":"Ханты-Мансийский Автономный округ - Югра, г Сургут, пр-кт Ленина, д 1","unrestricted_value":"628408, Ханты-Мансийский Автономный округ - Югра, г Сургут, пр-кт Ленина, д 1","data":{"postal_code":"628408","country":"Россия","country_iso_code":"RU","federal_district":null,"region_fias_id":"d66e5325-3a25-4d29-ba86-4ca351d9704b","region_kladr_id":"8600000000000","region_iso_code":"RU-KHM","region_with_type":"Ханты-Мансийский Автономный округ - Югра","region_type":"АО","region_type_full":"автономный округ","region":"Ханты-Мансийский Автономный округ - Югра","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"f1eb1809-47d4-4f0b-9a74-fa416e9d3df2","city_kladr_id":"8600001000000","city_with_type":"г Сургут","city_type":"г","city_type_full":"город","city":"Сургут","city_area":null,"city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":null,"city_district_type":null,"city_district_type_full":null,"city_district":null,"settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"fa1c3012-8ffd-4992-93fd-66962eebb669","street_kladr_id":"86000010000004900","street_with_type":"пр-кт Ленина","street_type":"пр-кт","street_type_full":"проспект","street":"Ленина","house_fias_id":"b9acd273-6d38-4440-a4b3-73e5a81823ea","house_kladr_id":"8600001000000490001","house_type":"д","house_type_full":"дом","house":"1","block_type":null,"block_type_full":null,"block":null,"flat_type":null,"flat_type_full":null,"flat":null,"flat_area":null,"square_meter_price":null,"flat_price":null,"postal_box":null,"fias_id":"b9acd273-6d38-4440-a4b3-73e5a81823ea","fias_code":"86000010000000000490001","fias_level":"8","fias_actuality_state":"0","kladr_id":"8600001000000490001","geoname_id":"1490624","capital_marker":"0","okato":"71136000000","oktmo":"71876000","tax_office":"8602","tax_office_legal":"8602","timezone":null,"geo_lat":"61.239822","geo_lon":"73.410882","beltway_hit":null,"beltway_distance":null,"metro":null,"qc_geo":"0","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":null,"qc":null}},"to":{"value":"Ханты-Мансийский Автономный округ - Югра, г Сургут, пр-кт Ленина, д 1","unrestricted_value":"628408, Ханты-Мансийский Автономный округ - Югра, г Сургут, пр-кт Ленина, д 1","data":{"postal_code":"628408","country":"Россия","country_iso_code":"RU","federal_district":null,"region_fias_id":"d66e5325-3a25-4d29-ba86-4ca351d9704b","region_kladr_id":"8600000000000","region_iso_code":"RU-KHM","region_with_type":"Ханты-Мансийский Автономный округ - Югра","region_type":"АО","region_type_full":"автономный округ","region":"Ханты-Мансийский Автономный округ - Югра","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"f1eb1809-47d4-4f0b-9a74-fa416e9d3df2","city_kladr_id":"8600001000000","city_with_type":"г Сургут","city_type":"г","city_type_full":"город","city":"Сургут","city_area":null,"city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":null,"city_district_type":null,"city_district_type_full":null,"city_district":null,"settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"fa1c3012-8ffd-4992-93fd-66962eebb669","street_kladr_id":"86000010000004900","street_with_type":"пр-кт Ленина","street_type":"пр-кт","street_type_full":"проспект","street":"Ленина","house_fias_id":"b9acd273-6d38-4440-a4b3-73e5a81823ea","house_kladr_id":"8600001000000490001","house_type":"д","house_type_full":"дом","house":"1","block_type":null,"block_type_full":null,"block":null,"flat_type":null,"flat_type_full":null,"flat":null,"flat_area":null,"square_meter_price":null,"flat_price":null,"postal_box":null,"fias_id":"b9acd273-6d38-4440-a4b3-73e5a81823ea","fias_code":"86000010000000000490001","fias_level":"8","fias_actuality_state":"0","kladr_id":"8600001000000490001","geoname_id":"1490624","capital_marker":"0","okato":"71136000000","oktmo":"71876000","tax_office":"8602","tax_office_legal":"8602","timezone":null,"geo_lat":"61.239822","geo_lon":"73.410882","beltway_hit":null,"beltway_distance":null,"metro":null,"qc_geo":"0","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":null,"qc":null}},"car":{"additionally":[{"id":1}],"contractParam":[{"id":1}],"paymentInfo":[{"id":1}],"typesCar":[12]},"budget":"22"}'
);
class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    if (defaultArticle) {
      this.article = defaultArticle;
      this.state.cargoTypes = this.article.cargoTypes;
      this.state.cargoData = this.article.cargoData;
    } else {
      this.article = {};
    }

    if (!this.state.cargoTypes) {
      this.state.cargoType = [];
    }
    if (!this.state.cargoData) {
      this.state.cargoData = [];
    }
  }
  state = {
    currentTab: 3,
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
      console.log(JSON.stringify(article));
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
        if (article.cargoTypes) {
          state = { ...state, cargoTypes: article.cargoTypes };
        }
        if (article.cargoData) {
          state = { ...state, cargoData: article.cargoData };
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
                "Описание груза",
                "Мартшрут",
                "Пожелания к перевозчику",
                "Публикация товара",
              ]}
            />
          </div>
          <div className="steps-create">
            <OrderCreate1
              ref={(ref) => (this.step1 = ref)}
              className={`${this.state.currentTab === 1 ? "active" : ""} 
              ${this.state.currentTab > 1 ? "deactive" : ""}`}
              next={() => {
                this.nexTab(2);
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
              cargoTypes={this.article.cargoTypes}
              cargoData={this.article.cargoData}
              cargoStandartData={this.article.cargoStandartData}
              comment={this.article.comment}
            />
            <OrderCreate2
              ref={(ref) => (this.step2 = ref)}
              className={`${this.state.currentTab === 2 ? "active" : ""} ${
                this.state.currentTab > 2 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(3);
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
              addressFrom={this.article.from}
              addressTo={this.article.to}
              startDate={this.article.startDate}
            />
            <OrderCreate3
              ref={(ref) => (this.step3 = ref)}
              className={`${this.state.currentTab === 3 ? "active" : ""} ${
                this.state.currentTab > 3 ? "deactive" : ""
              }`}
              next={() => {
                this.nexTab(4);
              }}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
              }}
              cargoTypes={this.state.cargoTypes}
              cargoData={this.state.cargoData}
              car={this.article.car}
              budget={this.article.budget}
            />
            <OrderCreate4
              className={`${this.state.currentTab === 4 ? "active" : ""}`}
              prev={() => {
                if (this.state.currentTab > 1) {
                  this.setState({ currentTab: this.state.currentTab - 1 });
                }
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

export default connect(mapStateToProps)(OrderCreate);
