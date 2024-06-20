import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { cartReducer } from "../slices/cartSlice";
import { userReducer } from "../slices/userSlice";
import { blogReducer } from "../slices/blogSlice";

// Persist configuration for cart reducer
const persistCartConfig = {
  key: "mb-cart",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);

// Persist configuration for blog reducer
const persistBlogConfig = {
  key: "mb-blog",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedBlogReducer = persistReducer(persistBlogConfig, blogReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    users: userReducer,
    blogs: persistedBlogReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  ],
  devTools: true, 
});
export const persistor = persistStore(store);
