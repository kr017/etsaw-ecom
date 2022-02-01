import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";
import { userReducer } from "./user.slice";
const reducer = {
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer,
});

export default store;
