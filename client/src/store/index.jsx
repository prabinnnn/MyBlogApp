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
import { userReducer } from "../slices/userSlice";
import { adminReducer } from "../slices/adminSlice";

// Persist configuration for cart
const persistCartConfig = {
  key: "mb-cart",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistCart = persistReducer(persistCartConfig, cartReducer);

// Persist configuration for admin
const persistAdminConfig = {
  key: "mb-admin",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistAdmin = persistReducer(persistAdminConfig, adminReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: persistCart,
    users: userReducer,
    admin: persistAdmin,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  devTools: true,
});

export const newStore = persistStore(store);
