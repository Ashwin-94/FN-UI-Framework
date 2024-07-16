import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
import "./i18n";
import store, {persistor} from "./store/store";
import { Provider } from "react-redux";
import ToastContainer from "./services/Toaster/ToastContainer";
import ToastService from "./services/Toaster/ToasterService";
import { PersistGate } from "redux-persist/integration/react";
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />

      <ToastService />
      <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
