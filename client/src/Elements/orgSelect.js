// App
import React, { useRef } from "react";
import { PartySuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import configApi from "../config/api";

class orgSelect extends React.Component {
  componentDidUpdate() {
    this.ref.setInputValue(this.props.value);
  }
  render() {
    return (
      <>
        <PartySuggestions
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
          className={`${this.props.className}`}
          placeholder={this.props.placeholder}
          defaultQuery={this.props.value}
          onChange={this.props.onChange}
        />
      </>
    );
  }
}

export default orgSelect;
