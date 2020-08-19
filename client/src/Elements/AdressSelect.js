// App
import React, { useRef } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import configApi from "../config/api";

class AdressSelect extends React.Component {
  componentDidUpdate() {
    this.ref.setInputValue(this.props.value);
  }
  render() {
    return (
      <>
        <AddressSuggestions
          ref={(ref) => (this.ref = ref)}
          token={configApi.daDataToken}
          inputProps={{
            onKeyDown: this.props.onInput,
            onClick: (e) => {
              let el = e.target;
              el.selectionStart = el.selectionEnd = el.value.length;
              el.scrollLeft = el.scrollWidth;
            },
            className: "input-text w-100 address-input",
          }}
          count={10}
          className={`${this.props.className}`}
          placeholder={this.props.placeholder}
          defaultQuery={this.props.value}
          onChange={this.props.onChange}
          filterFromBound={this.props.filterFromBound}
          filterToBound={this.props.filterToBound}
        />
      </>
    );
  }
}

export default AdressSelect;
