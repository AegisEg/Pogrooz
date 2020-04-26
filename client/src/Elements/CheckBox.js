// App
import React from "react";

class CheckBox extends React.Component {
  render() {
    return (
      <>
        <input
          type="checkbox"
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          className={`input-${this.props.type}`}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.id} style={{ display: "inline-block", verticalAlign: "sub" }}></label>
        <span
          className="ml-3"          
        >
          <label htmlFor={this.props.id} className="f-12" style={{ display: "inline-block" }}>
            {this.props.text}
          </label>
        </span>
      </>
    );
  }
}

export default CheckBox;
