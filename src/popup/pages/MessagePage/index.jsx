import React from "react";
import { LeftArrowButton } from "../../components/Buttons";
import { SearchInput } from "../../components/Forms";
import MessageList from "../../components/MainPage/MessageList";

const MessagePage = () => {
  return (
    <div className="pt-[15px] flex flex-col gap-5">
      <div className="px-6">
        <LeftArrowButton caption={"New Message"} />
      </div>
      <SearchInput />
      <MessageList />
    </div>
  );
}

export default MessagePage;