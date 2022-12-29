import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

import { LeftArrowButton } from "../../../components/Buttons";
import MsgInput from './MsgInput';
import ChatContent from '../../../components/MainPage/ChatContent';
import ACTIONS from '../../../../config/action';
import { setPageStages } from "../../../redux/slices/authSlice";
import { setChatType, setMembers } from "../../../redux/slices/chatSlice";
import ChattingThreadBox from "../../../components/MainPage/ChatContent/ChattingThreadBox";
import UploadDropZoneImg from "./UploadDropZoneImg";

const ChatPanelPage = () => {
  const [focusState, setFocusState] = useState(false);
  const [toggleDropZone, setToggleDropZone] = useState("none");
  const [showEmoji, setShowEmoji] = useState(false);
  const [newMsgSendingState, setNewMsgSendingState] = useState(false);
  const [newMsgDataState, setNewMsgDataState] = useState({
    reply: {
      replying: false,
      replyToWhom: "",
      hisMsg: "",
    },
    myMsg: "",
    files: {
      fileExists: false,
      fileNames: [],
      fileUrls: [],
    },
  });
  const dispatch = useDispatch();

  const { profile, members, chatType } = useSelector((state) => ({
    members: state.chat.members,
    chatType: state.chat.chatType,
    profile: state.auth.profile,
  }));

  const getReadyEmoji = () => {
    setShowEmoji(!showEmoji);
    document.getElementById("chatting_input").focus();
  };

  const enterKeyCapture = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value === "") {
        return;
      }
      window.socket.emit(ACTIONS.SEND_MSG_EXTENSION, {
        groupType: chatType,
        daoId: null,
        members: members,
        date: Date(),
        content: e.target.value,
        attachment: '',
        filename: '',
        filetype: '',
        replyId: '',
        editState: false,
        deleteState: false,
      })
      e.target.value = "";
    }
  }

  const backChatPage = () => {
    dispatch(setPageStages(5));
    dispatch(setChatType(2));
    dispatch(setMembers([]));
  }

  return (
    <div className="w-full h-full">
      <div className="fixed top-[18px] bg-[#141414] z-10 w-[375px] pb-4 px-6">
        <div onClick={() => dispatch(setPageStages(5))}>
          <LeftArrowButton caption="Chat group" onClick={backChatPage} />
        </div>
      </div>
      <ChattingThreadBox
        newMsgDataState={newMsgDataState}
        setNewMsgDataState={setNewMsgDataState}
        newMsgSendingState={newMsgSendingState}
        setNewMsgSendingState={setNewMsgSendingState}
      />
      <MsgInput
        focusState={focusState}
        setFocusState={setFocusState}
        newMsgDataState={newMsgDataState}
        setNewMsgDataState={setNewMsgDataState}
        newMsgSendingState={newMsgSendingState}
        setNewMsgSendingState={setNewMsgSendingState}
      />

      <UploadDropZoneImg toggleDropZone={toggleDropZone} />
      {/* Following is a tranparent layer for drag and drop operation - with this flickering issue can be avoid */}
      <div
        className={`absolute top-[-3px] bottom-[-3px] left-[-3px] right-[-3px] bg-transparent
                            rounded-[24px] ${toggleDropZone === "none"
            ? "hidden"
            : "flex flex-col"
          }`}
        id="chatting_box"
        onDragLeave={() => setToggleDropZone("none")}
        onDrop={() => setToggleDropZone("none")}
      ></div>
    </div>
  );
}

export default ChatPanelPage;