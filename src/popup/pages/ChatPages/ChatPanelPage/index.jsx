import React from "react";
import { LeftArrowButton } from "../../../components/Buttons";
import ChatContent from '../../../components/MainPage/ChatContent';

const ChatPanelPage = () => {
  return (
    <div className="">
      <div className="fixed top-5 bg-[#141414] z-10 w-[375px] pb-4 px-6" onClick={() => dispatch(setPageStages(5))}>
        <LeftArrowButton caption="Chat group" />
      </div>
      <div className="pt-[60px] px-6">
        <ChatContent />
      </div>
    </div>
  );
}

export default ChatPanelPage;