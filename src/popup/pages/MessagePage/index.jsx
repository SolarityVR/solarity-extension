import React from "react";
import { useState } from "react";
import { LeftArrowButton } from "../../components/Buttons";
import { SearchInput } from "../../components/Forms";
import MessageList from "../../components/MainPage/MessageList";

const MessagePage = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const selectedFriendBadge = () => {

  }

  return (
    <div className="pt-[15px] grid gap-5">
      <div className="px-6">
        <LeftArrowButton caption={"New Message"} />
      </div>
      {selectedFriend ? 
        <div className="px-6 h-[54px]"><span className="text-[14px] text-primary border-[1px] border-primary px-[15px] py-[10px] rounded-[40px] bg-[#162724]">{selectedFriend.name}</span></div>
      : <SearchInput />}
      <MessageList selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
    </div>
  );
}

export default MessagePage;