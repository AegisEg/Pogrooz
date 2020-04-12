// App
import React from "react";
import SelectX, { components } from "react-select";
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
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    top: "83%",
    border: "1px solid #B9B9B9",
    borderTop: "none",
    boxShadow: "none",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
  }),
  valueContainer: (base, state) => ({
    ...base,
  }),
  control: (base, state) => ({
    ...base,
    borderColor: "#B9B9B9",
    borderBottomLeftRadius: state.menuIsOpen ? "0" : "",
    borderBottom: state.menuIsOpen ? "none" : "",
    borderBottomRightRadius: state.menuIsOpen ? "0" : "",
    boxShadow: "0 0 0 0px #B9B9B9",
    transition: "none",
    "&:hover": {
      borderColor: "#B9B9B9",
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
    padding: "5px 0",
    cursor: "pointer",
    color: state.isSelected ? "#A038E3" : "",
    fontWeight: state.isSelected ? "bold" : "",
    "&:hover": {
      textDecoration: "underline",
    },
  }),
};
class Select extends React.Component {
  render() {
    return (
      <>
        <SelectX
          theme={{ borderRadius: 20 }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          className="select"
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          ref={(ref) => {
            this.select = ref;
            this.props.getRef(ref);
          }}
          styles={colourStyles}
          options={this.props.options}
        />
      </>
    );
  }
}

export default Select;
