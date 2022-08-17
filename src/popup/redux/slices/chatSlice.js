import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCaller } from "../../utils/fetcher";
import Avatar1 from '../../../assets/img/library/avatars/1.png';

const initialState = {
  chatLogs: []
};

export const chatSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setGroupMsg: (state, action) => {
      state.chatLogs.push({
        imgUrl : Avatar1,
        uName : action.payload.members,
        before : "Today",
        text : action.payload.content
      });
    }
  },
});

export const { setGroupMsg } = chatSlice.actions;

export default chatSlice.reducer;
