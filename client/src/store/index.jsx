import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { cartReducer } from "../slices/cartSlice";
import userSlice from "../slices/userSlice"; // Assuming userSlice is correctly exported with reducer and actions

const persistCartConfig = {
  key: "mb-cart", // Unique key for the cart slice in storage
  storage, // Storage engine to use (localStorage in this case)
  stateReconciler: autoMergeLevel2, // How to reconcile state when merging
};

const persistCart = persistReducer(persistCartConfig, cartReducer);

const rootReducer = {
  cart: persistCart,
  users: userSlice, // Assuming userSlice correctly exports the reducer
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE], // Ignore non-serializable actions
      },
    }),
  devTools: true, // Enable Redux DevTools Extension
});

export const persistor = persistStore(store); // Persist the store

export default { store, persistor }; // Exporting an object with store and persistor
export { store as newStore }; // Exporting store as newStore

