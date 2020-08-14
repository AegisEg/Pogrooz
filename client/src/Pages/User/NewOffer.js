// App
import React from "react";
import { connect } from "react-redux";
import HeaderCreate from "./CreatePart/HeaderCreate";
import OfferCreate1 from "./CreatePart/Offer1";
import OfferCreate2 from "./CreatePart/Offer2";
import OfferCreate3 from "./CreatePart/Offer3";
import OfferCreate4 from "./CreatePart/Offer&Order4";
let defaultArticle = JSON.parse(
  '{"type":"offer","car":{"additionally":[],"contractParam":[],"info":[],"property":"","paymentInfo":[],"typesCar":[2],"name":"ваваав","photo":{"file":{},"path":"blob:http://localhost:3000/81b48907-2730-4a52-be17-b68e5481c1f0"}},"comment":"","budget":false,"startDate":{"timeFrom":"2020-08-10T14:07:57.733Z","timeTo":"2020-08-10T14:08:01.907Z","date":"2020-08-10T14:07:12.079Z"},"from":{"value":"Московская обл, г Балашиха, Балашихинское шоссе, д 1","unrestricted_value":"143902, Московская обл, г Балашиха, Балашихинское шоссе, д 1","data":{"postal_code":"143902","country":"Россия","country_iso_code":"RU","federal_district":null,"region_fias_id":"29251dcf-00a1-4e34-98d4-5c47484a36d4","region_kladr_id":"5000000000000","region_iso_code":"RU-MOS","region_with_type":"Московская обл","region_type":"обл","region_type_full":"область","region":"Московская","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"27c5bc66-61bf-4a17-b0cd-ca0eb64192d6","city_kladr_id":"5000003600000","city_with_type":"г Балашиха","city_type":"г","city_type_full":"город","city":"Балашиха","city_area":null,"city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":null,"city_district_type":null,"city_district_type_full":null,"city_district":null,"settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"0dd2735b-c9e0-4a0e-85a4-0de783a9bc12","street_kladr_id":"50000036000002100","street_with_type":"Балашихинское шоссе","street_type":"ш","street_type_full":"шоссе","street":"Балашихинское","house_fias_id":"2fdf07db-766a-4415-859c-054d7c9d5091","house_kladr_id":"5000003600000210008","house_type":"д","house_type_full":"дом","house":"1","block_type":null,"block_type_full":null,"block":null,"flat_type":null,"flat_type_full":null,"flat":null,"flat_area":null,"square_meter_price":null,"flat_price":null,"postal_box":null,"fias_id":"2fdf07db-766a-4415-859c-054d7c9d5091","fias_code":"50000036000000000210008","fias_level":"8","fias_actuality_state":"0","kladr_id":"5000003600000210008","geoname_id":"579464","capital_marker":"0","okato":"46404000000","oktmo":"46704000001","tax_office":"5001","tax_office_legal":"5001","timezone":null,"geo_lat":"55.823105","geo_lon":"37.925775","beltway_hit":null,"beltway_distance":null,"metro":null,"qc_geo":"2","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":null,"qc":null}},"to":{"value":"Московская обл, г Балашиха, Балашихинское шоссе, д 14","unrestricted_value":"143913, Московская обл, г Балашиха, Балашихинское шоссе, д 14","data":{"postal_code":"143913","country":"Россия","country_iso_code":"RU","federal_district":null,"region_fias_id":"29251dcf-00a1-4e34-98d4-5c47484a36d4","region_kladr_id":"5000000000000","region_iso_code":"RU-MOS","region_with_type":"Московская обл","region_type":"обл","region_type_full":"область","region":"Московская","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"27c5bc66-61bf-4a17-b0cd-ca0eb64192d6","city_kladr_id":"5000003600000","city_with_type":"г Балашиха","city_type":"г","city_type_full":"город","city":"Балашиха","city_area":null,"city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":null,"city_district_type":null,"city_district_type_full":null,"city_district":null,"settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"0dd2735b-c9e0-4a0e-85a4-0de783a9bc12","street_kladr_id":"50000036000002100","street_with_type":"Балашихинское шоссе","street_type":"ш","street_type_full":"шоссе","street":"Балашихинское","house_fias_id":"1eb020a9-26b9-4d0c-8759-ac841e6c8bf4","house_kladr_id":"5000003600000210010","house_type":"д","house_type_full":"дом","house":"14","block_type":null,"block_type_full":null,"block":null,"flat_type":null,"flat_type_full":null,"flat":null,"flat_area":null,"square_meter_price":null,"flat_price":null,"postal_box":null,"fias_id":"1eb020a9-26b9-4d0c-8759-ac841e6c8bf4","fias_code":"50000036000000000210010","fias_level":"8","fias_actuality_state":"0","kladr_id":"5000003600000210010","geoname_id":"579464","capital_marker":"0","okato":"46404000000","oktmo":"46704000001","tax_office":"5001","tax_office_legal":"5001","timezone":null,"geo_lat":"55.82321","geo_lon":"37.9314","beltway_hit":null,"beltway_distance":null,"metro":null,"qc_geo":"0","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":null,"qc":null}},"cargoTypes":[2,3,5,16,1,4],"cargoData":[],"cargoStandartData":{}}'
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
    console.log(JSON.stringify(article));
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
