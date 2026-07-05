import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import foodStore from "./store/Store.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={foodStore}>
    <App />
  </Provider>
);
