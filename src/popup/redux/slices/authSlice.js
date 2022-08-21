import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCaller } from "../../utils/fetcher";
import socket from '../../utils/socket-client'
import { startLoadingApp, stopLoadingApp } from "./commonSlice";

const initialState = {
  pageStages: 0,
  publicKey: "",
  walletType: "",
  authFlag: false,
  nonce: null,
  registration: {
    domain: "",
    bio: "",
    profileImage: {},
  },
  profile: {},
};

export const userExist = createAsyncThunk(
  "auth/userExist",
  async ({ publicKey, walletType }, { dispatch }) => {
    let response = false;
    const {
      data: { exist },
    } = await apiCaller.post("/auth/userExist", {
      publicKey,
      walletType
    });

    dispatch(setPublicKey(publicKey));
    dispatch(setWalletType(walletType));

    if (exist) {
      dispatch(connectWallet({ publicKey, walletType }));
    } else {
      dispatch(setPageStages(1));
    }
  }
)

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ profileImage, publicKey, walletType, domain, bio }, { dispatch }) => {
    try {
      let response = false;
      await apiCaller.post("/auth/register", {
        publicKey,
        walletType,
        username: domain,
        bio,
        daos: {},
        profileImage
      });
      dispatch(connectWallet({ publicKey, walletType }));
    } catch (error) {
      console.error(error.message);
    }
  }
)

export const connectWallet = createAsyncThunk(
  "auth/login",
  async ({ publicKey, walletType }, { dispatch }) => {
    let response = false;
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

export const setUploadPic = createAsyncThunk(
  "profile/setUploadPic",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }) => {

    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/uploadPic", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    let response = false;
    dispatch(startLoadingApp());
    try {
      if (!("socket" in window)) {
        window.socket = socket();
      }
      const { data } = await apiCaller.get("/auth/check");
      dispatch(setProfile(data.profile));
      dispatch(setPageStages(3));
      response = true;
    } catch {}
    dispatch(stopLoadingApp());
    return response;
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
      dispatch(setPageStages(3));
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
    setDomainState: (state, action) => {
      state.registration.domain = action.payload;
    },
    setBioState: (state, action) => {
      state.registration.bio = action.payload;
    },
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

export const { setDomainState, setBioState, setPageStages, setPublicKey, setProfile, setAuthFlag, setWalletType } = authSlice.actions;

export default authSlice.reducer;
