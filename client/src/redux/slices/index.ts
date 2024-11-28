import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./admin";
import authReducer from "./auth";
import cartReducer from "./cart";
import orderReducer from "./order";
import userReducer from "./user";

// Export reducers for store configuration
export { default as adminReducer } from "./admin";
export { default as authReducer } from "./auth";
export { default as cartReducer } from "./cart";
export { default as orderReducer } from "./order";
export { default as userReducer } from "./user";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
