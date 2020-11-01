// App
import React from "react";
import Input from "../../../Elements/Input";
import Select from "../../../Elements/Select";
import cargoUnit from "../../../config/baseInfo/unitCargo";

class StandartParams extends React.Component {
  render() {
    let unut = cargoUnit;
    if (!this.props.needCube) unut = unut.slice(0, 2);
    return (
      <div className="standartParams">
        <div
          className="col"
          style={{
            maxWidth: "217px",
            minWidth: "217px",
          }}
        >
          <Select
            type="text"
            placeholder="Ед. измерения"
            options={unut}
            value={
              this.props.cargoStandartData &&
                this.props.cargoStandartData["unit"]
                ? {
                  value: this.props.cargoStandartData["unit"],
                  label: unut.find(
                    (itemX) =>
                      itemX.value === this.props.cargoStandartData["unit"]
                  ).label,
                }
                : ""
            }
            onChange={(val) => {
              this.props.onChangeCargoStandartData("unit", val.value);
            }}
          />
        </div>
        {this.props.cargoStandartData.unit === 1 && (
          <>
            <div
              className="col"
              style={{
                maxWidth: "177px",
              }}
            >
              <Input
                type="number"
                style={{ width: "147px" }}
                placeholder="Вес"
                value={this.props.cargoStandartData["weight"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "weight",
                    Number(e.target.value)
                  );
                }}
              />
            </div>
            <div
              className="row colspan-input px-3"
              style={{
                marginLeft: "0",
                alignItems: "center",
              }}
            >
              <Input
                type="number"
                placeholder="Длина"
                className="text-center"
                style={{ margin: "0 0 0 0" }}
                value={this.props.cargoStandartData["length"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "length",
                    Number(e.target.value)
                  );
                }}
              />
              <Input
                type="number"
                placeholder="Ширина"
                className="text-center"
                value={this.props.cargoStandartData["width"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "width",
                    Number(e.target.value)
                  );
                }}
                style={{ margin: "0 0 0 0" }}
              />
              <Input
                type="number"
                className="text-center"
                value={this.props.cargoStandartData["height"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "height",
                    Number(e.target.value)
                  );
                }}
                placeholder="Высота"
              />
            </div>
            <div
              className="row col mx-0"
              style={{
                marginLeft: "0",
                marginRight: "0",
                maxWidth: "159px",
                minWidth: "159px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Кол-во<br></br>мест
              </span>
              <Input
                type="number"
                min="1"
                style={{
                  width: "79px",
                }}
                defaultValue={1}
                placeholder="0"
                value={this.props.cargoStandartData["count"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "count",
                    Number(e.target.value)
                  );
                }}
              />
            </div>
            <div
              className="row col mx-0"
              style={{
                maxWidth: "175px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Общий<br></br>вес
              </span>
              <span className="position-relative">

                <span className="d-inline-block ml-4 short-value">
                  =&nbsp;
                <div
                    className="valumeCalculate"
                    style={{
                      maxWidth: "40px",
                    }}
                  >
                    {this.props.cargoStandartData["weight"] *
                      (this.props.cargoStandartData["count"] || 1) || 0}
                  </div>
                кг
              </span>
                <div className="full-value">
                  {this.props.cargoStandartData["weight"] *
                    (this.props.cargoStandartData["count"] || 1) || 0}кг
                </div>
              </span>
            </div>
            <div
              className="row col mx-0"
              style={{
                minWidth: "180px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Общий<br></br>объем
              </span>
              <span className="position-relative">
                <span className="d-inline-block ml-4 short-value">
                  =&nbsp;
                <div
                    className="valumeCalculate"
                    style={{
                      maxWidth: "40px",
                    }}
                  >
                    {this.props.cargoStandartData["length"] *
                      this.props.cargoStandartData["width"] *
                      this.props.cargoStandartData["height"] *
                      (this.props.cargoStandartData["count"] || 1) || 0}
                  </div>
                м<sup>3</sup>
                </span>
                <div className="full-value">
                  {this.props.cargoStandartData["length"] *
                    this.props.cargoStandartData["width"] *
                    this.props.cargoStandartData["height"] *
                    (this.props.cargoStandartData["count"] || 1) || 0}
                  м<sup>3</sup>
                </div>
              </span>
            </div>
          </>
        )}
        {this.props.cargoStandartData.unit === 2 && (
          <>
            <div
              className="col"
              style={{
                maxWidth: "177px",
              }}
            >
              <Input
                type="number"
                style={{ width: "147px" }}
                placeholder="Вес"
                value={this.props.cargoStandartData["weight"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "weight",
                    e.target.value
                  );
                }}
              />
            </div>
            <div
              className="row colspan-input px-3"
              style={{
                marginLeft: "0",
                alignItems: "center",
              }}
            >
              <Input
                type="number"
                placeholder="Длина"
                className="text-center"
                style={{ margin: "0 0 0 0" }}
                value={this.props.cargoStandartData["length"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "length",
                    e.target.value
                  );
                }}
              />
              <Input
                type="number"
                placeholder="Ширина"
                className="text-center"
                value={this.props.cargoStandartData["width"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData("width", e.target.value);
                }}
                style={{ margin: "0 0 0 0" }}
              />
              <Input
                type="number"
                className="text-center"
                value={this.props.cargoStandartData["height"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "height",
                    e.target.value
                  );
                }}
                placeholder="Высота"
              />
            </div>
            <div
              className="row col mx-0"
              style={{
                marginLeft: "0",
                marginRight: "0",
                maxWidth: "159px",
                minWidth: "159px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Кол-во<br></br>мест
              </span>
              <Input
                type="number"
                min="0"
                style={{
                  width: "79px",
                }}
                placeholder="0"
                value={this.props.cargoStandartData["count"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData("count", e.target.value);
                }}
              />
            </div>
            <div
              className="row col mx-0"
              style={{
                maxWidth: "175px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title position-relative">
                Общий<br></br>вес
              </span>
              <span className="position-relative">
                <span className="d-inline-block ml-4 short-value">
                  =&nbsp;
                <div
                    className="valumeCalculate"
                    style={{
                      maxWidth: "40px",
                    }}
                  >
                    {this.props.cargoStandartData["weight"] *
                      (this.props.cargoStandartData["count"] || 1) || 0}
                  </div>
                т
              </span>
                <div className="full-value">
                  {this.props.cargoStandartData["weight"] *
                    (this.props.cargoStandartData["count"] || 1) || 0}
                </div>
              </span>
            </div>
            <div
              className="row col mx-0"
              style={{
                minWidth: "180px",
                alignItems: "center",
              }}
            >
              <span className="filter-input-title">
                Общий<br></br>объем
              </span>
              <span className="position-relative">
                <span className="d-inline-block ml-4 short-value">
                  =&nbsp;
                <div
                    className="valumeCalculate"
                    style={{
                      maxWidth: "40px",
                    }}
                  >
                    {this.props.cargoStandartData["length"] *
                      this.props.cargoStandartData["width"] *
                      this.props.cargoStandartData["height"] *
                      (this.props.cargoStandartData["count"] || 1) || 0}
                  </div>
                м<sup>3</sup>
                </span>
                <div className="full-value">
                  {this.props.cargoStandartData["length"] *
                    this.props.cargoStandartData["width"] *
                    this.props.cargoStandartData["height"] *
                    (this.props.cargoStandartData["count"] || 1) || 0} м<sup>3</sup></div>
              </span>
            </div>
          </>
        )}
        {this.props.cargoStandartData.unit === 3 && (
          <>
            <div
              className="col"
              style={{
                maxWidth: "177px",
              }}
            >
              <Input
                type="number"
                style={{ width: "147px" }}
                placeholder="Объем в м&sup3;"
                value={this.props.cargoStandartData["volume"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "volume",
                    e.target.value
                  );
                }}
              />
            </div>
            <div
              className="col"
              style={{
                maxWidth: "177px",
              }}
            >
              <Input
                type="number"
                style={{ width: "147px" }}
                placeholder="Вес в тоннах"
                value={this.props.cargoStandartData["weight"] || ""}
                onChange={(e) => {
                  this.props.onChangeCargoStandartData(
                    "weight",
                    e.target.value
                  );
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
export default StandartParams;
