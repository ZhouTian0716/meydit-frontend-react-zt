import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/index.scss";

// Redux Setup
import { store } from "./redux/store";
import { Provider } from "react-redux";

// React-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer style={{ width: "400px" }} />
      <App />
    </Provider>
  </React.StrictMode>
);
