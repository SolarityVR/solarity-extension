import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      chat: chatReducer,
    },
  });
}
const store = makeStore();

export default store;
