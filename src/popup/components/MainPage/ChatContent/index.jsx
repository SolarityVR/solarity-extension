import React from "react";
import { ChattingBoxData } from "../../../data";
import ChattingThread from "./ChattingThread";

const ChatContent = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll overflow-x-visible gap-[24px] relative pb-[30px]" id="chatting_thread_box_1">
      {ChattingBoxData.map((i) => {
        return (
          <ChattingThread
            imgUrl={i.imgUrl}
            uName={i.uName}
            text={i.text}
            before={i.before}
          />
        );
      })}
    </div>
  );
}

export default ChatContent;