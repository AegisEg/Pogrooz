// App
import React from "react";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import "./css/grid.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { YMaps } from "react-yandex-maps";
// Router
import AppRouter from "./Router";
import { BrowserRouter as Router } from "react-router-dom";

// Partials
import Modal from "react-modal";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

Modal.setAppElement("#root");

class App extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <YMaps>
            <Router>
              <ToastContainer />              
              <AppRouter />
            </Router>
          </YMaps>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default App;
