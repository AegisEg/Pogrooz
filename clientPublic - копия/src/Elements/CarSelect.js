import React from "react";
import Select from "./Select";
import api from "../config/api";

class CarSelect extends React.Component {
  loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      fetch(`${api.urlApi}/api/car/getLikeCars`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.apiToken}`,
        },
        body: JSON.stringify({
          stringLikes: inputValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          callback(
            data.cars.map((item) => ({ value: item.name, label: item.name }))
          );
        });
    }, 1000);
  };
  handleBlur = (event) => {
    const inputValue = this.props.value;
    if (!inputValue) {
      event.preventDefault();
    }
  };
  render() {
    return (
      <Select
        async={true}
        className="carSelect"
        placeholder="Марка, модель"
        loadOptions={this.loadOptions}
        value={
          this.props.value
            ? { value: this.props.value, label: this.props.value }
            : false
        }
        onChange={this.props.onChange}
        inputValue={this.props.value}
        onBlur={this.handleBlur}
        onInputChange={(val, { action }) => {
          if (action === "input-change")
            this.props.onChange({ value: val, label: val });
        }}
      />
    );
  }
}
export default CarSelect;
