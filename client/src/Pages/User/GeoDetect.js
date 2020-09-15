// App
import React from "react";
import { Map, Placemark } from "react-yandex-maps";
// Router

class AutoPay extends React.Component {
  state = {
    coords: false,
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          coords: [position.coords.latitude, position.coords.longitude],
        });
      });
    }
  }
  render() {
    return (
      <div className="standart-page">
        <div className="container-fluid">
          <h2 className="title mb-0">Отслеживание</h2>
          {this.state.coords && (
            <>{this.state.coords[0] + " : " + this.state.coords[1]}</>
          )}
          <Map
            defaultState={{
              center:
                this.state.coords &&
                this.state.coords[0] &&
                this.state.coords[1]
                  ? [this.state.coords[0], this.state.coords[1]]
                  : [55.684758, 37.738521],
              zoom: 10,
            }}
            style={{
              marginTop: "21px",
              height: "500px",
              width: "100%",
            }}
          >
            {this.state.coords &&
              this.state.coords[0] &&
              this.state.coords[1] && (
                <Placemark
                  geometry={[this.state.coords[0], this.state.coords[1]]}
                />
              )}
          </Map>
        </div>
      </div>
    );
  }
}

export default AutoPay;
