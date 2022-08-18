import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import commonReducer from "./slices/commonSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      chat: chatReducer,
      common: commonReducer,
    },
  });
}
const store = makeStore();

export default store;
