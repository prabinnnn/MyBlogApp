// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// Persist configuration for entire Redux store
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Custom middleware example (optional)
const logger = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  return next(action);
};

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger), // Add your custom middleware here
  devTools: process.env.NODE_ENV !== "production", // Enable devtools in development
});

const persistor = persistStore(store);

export { store, persistor };


