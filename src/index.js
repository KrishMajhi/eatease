import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./src/App.jsx";
import foodStore from "./src/store/Store.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={foodStore}>
    <App />
  </Provider>
);
