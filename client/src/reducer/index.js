import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  blog: blogReducer,
  // Add other reducers here
});

export default rootReducer;
