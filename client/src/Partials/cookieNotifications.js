import React from "react";
import Button from "../Elements/Button";
import { CSSTransitionGroup } from "react-transition-group";
class CookieNotifications extends React.Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionName="cookie-animation-item"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        style={{
          display: "contents",
        }}
      >
        {this.props.isVisible && (
          <div className="cookie-notification">
            <span className="py-2">Передача файлов куки!</span>
            <Button
              lineHeight={"14px"}
              type="fill"
              paddingVertical={"8px"}
              paddingHorizontal={"15px"}
              onClick={this.props.close}
            >
              Я согласен
            </Button>
          </div>
        )}
      </CSSTransitionGroup>
    );
  }
}
export default CookieNotifications;
