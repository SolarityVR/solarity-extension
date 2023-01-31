import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCaller } from "../../utils/fetcher";
import Avatar1 from '../../../assets/img/library/avatars/1.png';

const initialState = {
  chatLogs: [],
  friends: [],
  chatType: 2,
  members: [],
  newMsg: {
    reply: {
      replying: false,
      replyId: "",
      replyToWhom: "",
      hisMsg: "",
    },
    myMsg: "",
    attachments: {
      fileExists: false,
      files: []
    },
  },
  typingState: false,
  typingMembers: [],
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
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setOnline: (state, action) => {
      const newUser = action.payload;
      state.friends.map((friend, index) => {
        if(friend.name == newUser.name) {
          state.friends[index]['onlineFlag'] = true;
          alert('new friend joined!');
        }
      })
    },
    setChatType: (state, action) => {
      state.chatType = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setUserMsg: (state, action) => {
      state.chatLogs.push(action.payload);
      window.socket.emit(ACTIONS.CHANGE_READ_STATE, {msgId: action.payload.msgId});
    },
    setNewMsg: (state, action) => {
      state.newMsg = action.payload;
    },
    setReply: (state, action) => {
      state.newMsg.reply = {
        replying: true,
        replyToWhom: action.payload.replyToWhom,
        hisMsg: action.payload.hisMsg,
        replyId: action.payload.replyId,
      };
    },
    setTypingState: (state, action) => {
      if(action.payload.state == "false") {
        const memberIndex = state.typingMembers.findIndex(s => s == action.payload.name);
        console.log(memberIndex);
        if(memberIndex != -1) {
          state.typingMembers.splice(memberIndex, 1);
          if(state.typingMembers.length == 0) {
            state.typingState = false;
          }
        }
      } else {
        state.typingState = true;
        const memberIndex = state.typingMembers.findIndex(s => s == action.payload.name);
        if(memberIndex == -1) {
          state.typingMembers.push(action.payload.name);
        }
      }
    }
  },
});

export const { setGroupMsg, setFriends, setOnline, setChatType, setMembers, setUserMsg, setNewMsg, setReply, setTypingState } = chatSlice.actions;

export default chatSlice.reducer;
