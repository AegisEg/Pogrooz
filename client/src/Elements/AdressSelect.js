// App
import React, { useRef } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import configApi from "../config/api";
import { ReactComponent as CloseSVG } from "../img/close.svg";
class AdressSelect extends React.Component {
  componentDidUpdate() {
    this.ref.setInputValue(this.props.value);
  }
  render() {
    console.log(this.props);
    return (
      <div className="adress-select">
        <AddressSuggestions
          ref={(ref) => (this.ref = ref)}
          token={configApi.daDataToken}
          inputProps={{
            onKeyDown: this.props.onInput,
            placeholder: this.props.placeholder,
            onClick: (e) => {
              let el = e.target;
              el.selectionStart = el.selectionEnd = el.value.length;
              el.scrollLeft = el.scrollWidth;
            },
            className: "input-text w-100 address-input",
          }}
          count={10}
          className={`${this.props.className}`}
          defaultQuery={this.props.defaultCity}
          onChange={this.props.onChange}
          filterFromBound={this.props.filterFromBound}
          filterToBound={this.props.filterToBound}
        />
        <CloseSVG
          onClick={() => {
            this.props.onChange(false);
          }}
        />
      </div>
    );
  }
}

export default AdressSelect;
