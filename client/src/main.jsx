import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import App from "./App";
import { BlogContextProvider } from "./contexts/BlogContext"; // Import BlogContextProvider

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BlogContextProvider> {/* Wrap around Provider and PersistGate */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlogContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
