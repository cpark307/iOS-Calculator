import Calculator from "./Calculator";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import * as ReactDOMClient from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

library.add(fas);

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <Calculator />
  </Provider>
);
