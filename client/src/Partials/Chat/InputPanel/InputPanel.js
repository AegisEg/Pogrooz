// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import PanelRecord from "./PanelRecord";
import PanelStandart from "./PanelStandart";

class InputPanel extends React.Component {
  state = {
    text: "",
    isRecord: false,
  };
  render() {
    return (
      <div className="message-panel">
        
          {!this.state.isRecord && (
            <PanelStandart
              recordStart={() => {
                this.setState({ isRecord: true });
              }}
            />
          )}
          {this.state.isRecord && (
            <PanelRecord
              recordReset={() => {
                this.setState({ isRecord: false });
              }}
            />
          )}
      </div>
    );
  }
}

export default InputPanel;
