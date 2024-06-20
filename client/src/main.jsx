import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { BlogContextProvider } from "./contexts/BlogContext";
import { Provider } from "react-redux";
import { newStore, store } from "./store";
import BlogDetail from "./pages/BlogDetail.jsx";
import BlogAdd from "./pages/admin/blogs/Add.jsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={newStore}>
        <BrowserRouter>
          <BlogContextProvider>
            <App />
            <BlogDetail/>
            <BlogAdd />
          </BlogContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);