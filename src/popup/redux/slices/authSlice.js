import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCaller } from "../../utils/fetcher";

const initialState = {
  publicKey: "",
  pageStages: 0,
  profile: {},
  authFlag: false,
  nonce: null,
  walletType: ""
};

export const connectWallet = createAsyncThunk(
  "auth/login",
  async ({ publicKey, walletType }, { dispatch }) => {
    let response = false;
    dispatch(setPublicKey(publicKey));
    // dispatch(startLoadingApp());
    try {
      // Get nonce from Backend
      const {
        data: { nonce },
      } = await apiCaller.post("/auth/login", {
        requestNonce: true,
        walletType,
        publicKey,
      });

      // Get signature from content's background
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          command: 'login-get-signature-action',
          nonce,
          walletType,
          publicKey,
        });
      });
    } catch (err) { }
    // dispatch(stopLoadingApp());
    return response;
  }
);

export const setUserInfo = createAsyncThunk(
  "profile/init",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }, { dispatch }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/initProfile", data);
      successFunction();
      dispatch(setProfile(profile));
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ publicKey, walletType, signature }, { dispatch }) => {
    let response = false;
    // dispatch(startLoadingApp());
    try {
      // Get profile data from Backend
      const {
        data: { profile },
      } = await apiCaller.post("/auth/login", {
        publicKey,
        walletType,
        requestNonce: false,
        signature,
      });
      dispatch(setProfile(profile));
      response = true;

    } catch (err) { }
    // dispatch(stopLoadingApp());
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setPageStages: (state, action) => {
      state.pageStages = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      if (state.profile != {}) {
        state.authFlag = true;
      } else {
        state.authFlag = false;
      }
    },
    setAuthFlag: (state, action) => {
      state.authFlag = action.payload;
    },
    setWalletType: (state, action) => {
      state.walletType = action.payload;
    }
  },
});

export const { setPageStages, setPublicKey, setProfile, setAuthFlag, setWalletType } = authSlice.actions;

export default authSlice.reducer;
