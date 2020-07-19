// App
import React from "react";
import { components } from "react-select";
import SelectX from "react-select/async";
//SVG
import svgIcon from "../img/icon_angle.svg";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={svgIcon} className="mr-2" alt="svgIcon" />
    </components.DropdownIndicator>
  );
};
const colourStyles = {
  placeholder: (base) => ({
    color: "#909090",
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    transform: state.selectProps.menuIsOpen ? "scale(1,-1)" : "",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "2px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    overflow: "hidden",
    top: "83%",
    border: "1px solid #B9B9B9",
    borderTop: "none",
    boxShadow: "none",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
  }),
  menuList: (base) => ({
    paddingBottom: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    height: 42,
    padding: "5px 15px",
  }),
  container: (base, state) => ({
    ...base,
    maxHeight: 42,
    flexGrow: 1,
  }),
  control: (base, state) => ({
    ...base,
    borderColor: "#B9B9B9",
    borderBottomLeftRadius: state.menuIsOpen ? "0" : "",
    borderBottomColor: state.menuIsOpen ? "transparent" : "",
    borderBottomRightRadius: state.menuIsOpen ? "0" : "",
    boxShadow: "0 0 0 0px #B9B9B9",
    transition: "none",
    "&:hover": {
      borderColor: "#B9B9B9",
      borderBottomColor: state.menuIsOpen ? "transparent" : "",
    },
    "&::after": state.menuIsOpen
      ? {
          content: "''",
          position: "absolute",
          right: "0",
          left: "0",
          bottom: "0",
          margin: "auto",
          width: "90%",
          height: "1px",
          backgroundColor: "#B9B9B9",
        }
      : "",
  }),
  option: (base, state) => ({
    padding: "5px 15px",
    cursor: "pointer",
    color: state.isSelected ? "#A038E3" : "",
    "&:hover": {
      backgroundColor: state.isSelected ? "" : "#EEEEEE",
    },
  }),
};
class AdressSelect extends React.Component {
  apiHelper(query) {
    let url = "https://cleaner.dadata.ru/api/v1/clean/address";
    let token = "785593333b42c2580ed331bce76f43452287efe4";
    let secret = "d2b478b051d3292c4cf43a3b647f75cf1d0997b6";

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
        "X-Secret": secret,
      },
      body: JSON.stringify([query]),
    };

    fetch(url, options).then((response) => {
      console.log(response.data.suggestions);
    });
  }
  render() {
    return (
      <>
        <SelectX
          theme={{ borderRadius: 20 }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          className={`select ${this.props.className}`}
          onChange={this.props.onChange}
          placeholder="Введите адрес"
          ref={(ref) => {
            if (this.props.getRef) {
              this.select = ref;
              this.props.getRef(ref);
            }
          }}
          noOptionsMessage={
            this.props.noOptionsMessage
              ? this.props.noOptionsMessage
              : () => "Нет адреса по запросу"
          }
          loadOptions={this.apiHelper}
          styles={colourStyles}
          options={this.props.options}
        />
      </>
    );
  }
}

export default AdressSelect;
