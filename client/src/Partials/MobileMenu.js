// App
import React from "react";
import { slide as Menu } from "react-burger-menu";

import burger from "../img/burger.png";
// Router
import { Link } from "react-router-dom";

var styles = {
  bmBurgerButton: {},
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    top: 0,
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "20px 10px",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    padding: "0.8em",
  },
  bmItem: {
    display: "block",
    color: "#fff",
    textAlign: "center",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: "0",
    right: "0",
  },
};
class MobileMenu extends React.Component {
  render() {
    return (
      <>
        <Menu styles={styles} customBurgerIcon={<img src={burger} />} right>
          {this.props.children}
        </Menu>
      </>
    );
  }
}

export default MobileMenu;
