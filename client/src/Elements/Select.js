// App
import React from "react";
import SelectX, { components } from "react-select";
import SelectAsync from "react-select/async";
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
  valueContainer: (base, state) => ({
    ...base,
    height: state.isMulti ? "auto" : 42,
    minHeight: state.isMulti ? 42 : "",
    padding: "5px 15px",
    paddingRight: "30px",
  }),
  container: (base, state) => ({
    ...base,
    maxHeight: state.isMulti ? "auto" : 42,
    flexGrow: 1,
  }),
  singleValue: (base, state) => ({
    ...base,
    maxWidth: "calc(100% - 45px)",
  }),
  control: (base, state) => {
    let isError = state.selectProps.className.indexOf("errRequired") !== -1;
    return {
      ...base,
      borderColor: "#B9B9B9",
      borderBottomLeftRadius: state.menuIsOpen ? "0" : "",
      borderBottomColor: state.menuIsOpen ? "transparent" : "",
      borderBottomRightRadius: state.menuIsOpen ? "0" : "",
      boxShadow: !isError
        ? "0 0 0 0px #B9B9B9"
        : "0px 0px 5px 1px rgba(221, 30, 30)",
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
    };
  },
  option: (base, state) => ({
    padding: "5px 15px",
    cursor: "pointer",
    color: state.isSelected ? "#A038E3" : "",
    "&:hover": {
      backgroundColor: state.isSelected ? "" : "#EEEEEE",
    },
  }),
};
class Select extends React.Component {
  render() {
    if (this.props.async)
      return (
        <>
          <SelectAsync
            theme={{ borderRadius: 20 }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
            cacheOptions
            defaultOptions
            loadOptions={this.props.loadOptions}
            className={`select ${this.props.className}`}
            onChange={this.props.onChange}
            isSearchable={this.props.isSearchable}
            placeholder={this.props.placeholder}
            value={this.props.value}
            ref={(ref) => {
              if (this.props.getRef) {
                this.select = ref;
                this.props.getRef(ref);
              }
            }}
            noOptionsMessage={
              this.props.noOptionsMessage
                ? this.props.noOptionsMessage
                : () =>
                    this.props.notFoundText
                      ? this.props.notFoundText
                      : "Нет элементов"
            }
            styles={colourStyles}
          />
        </>
      );
    else
      return (
        <>
          <SelectX
            theme={{ borderRadius: 20 }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
            isMulti={this.props.isMulti}
            className={`select ${this.props.className}`}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            ref={(ref) => {
              if (this.props.getRef) {
                this.select = ref;
                this.props.getRef(ref);
              }
            }}
            value={this.props.value}
            isSearchable={this.props.isSearchable}
            noOptionsMessage={
              this.props.noOptionsMessage
                ? this.props.noOptionsMessage
                : () =>
                    this.props.notFoundText
                      ? this.props.notFoundText
                      : "Нет элементов"
            }
            styles={colourStyles}
            options={this.props.options}
          />
        </>
      );
  }
}

export default Select;
