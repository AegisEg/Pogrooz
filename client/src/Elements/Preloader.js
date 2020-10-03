import React from "react";
import Loading from "../Elements/Loading";
class Preloader extends React.Component {
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <div>
        <Loading isLoading={true}></Loading>
      </div>
    );
  }
}

export default Preloader;
