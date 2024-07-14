// reducers.js

import { combineReducers } from 'redux';
import cartReducer from '../slices/cartSlice';  // Adjust the path accordingly
import userReducer from '../slices/userSlice';  // Adjust the path accordingly
import blogReducer from '../slices/blogSlice';  // Adjust the path accordingly

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  blog: blogReducer,
});

export default rootReducer;
