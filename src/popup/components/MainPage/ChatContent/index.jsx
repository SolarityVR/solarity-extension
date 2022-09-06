import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChattingBoxData } from "../../../data";
import ChattingThread from "./ChattingThread";
import defaultAvatar from '../../../../assets/img/placeholder/avatar.png';

const ChatContent = () => {
  const { chatLogs } = useSelector((state) => ({
    chatLogs: state.chat.chatLogs,
  }));

  useEffect(() => {
    if (!!document.querySelector(".ui-chat"))
      document.querySelector(".ui-chat").scrollTop =
        document.querySelector(".ui-chat").scrollHeight;
  }, [chatLogs])
  return (
    <div className="flex flex-col w-full overflow-y-scroll overflow-x-visible gap-[24px] relative pb-16" id="chatting_thread_box_1">
      {chatLogs.map((i, index) => {
        return (
          <ChattingThread
            imgUrl={!!i.sender.profileImage ? i.sender.profileImage : defaultAvatar}
            uName={i.sender.name}
            text={i.content}
            msgId={i.msgId}
            before={i.before}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default ChatContent;