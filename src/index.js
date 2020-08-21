import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlODFiNzFkOC01Y2VkLTQzMzUtYjFkYi0yOTRhNDkyNDg5MzkiLCJpZCI6MzEwODEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ4MDY5Njl9.eM9Y6E3wuMjFcUoCxhnAbDH5ATjSHQIOIykE95HFeII";

ReactDOM.render(
  <App />,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
