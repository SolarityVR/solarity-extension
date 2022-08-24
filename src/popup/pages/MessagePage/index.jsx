import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LeftArrowButton } from "../../components/Buttons";
import { SearchInput } from "../../components/Forms";
import MessageList from "../../components/MainPage/MessageList";
import { setPageStages } from "../../redux/slices/authSlice";

const MessagePage = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const dispatch = useDispatch();

  const selectedFriendBadge = () => {

  }

  return (
    <div className="pt-[15px] grid gap-5">
      <div className="px-6">
        <div onClick={() => dispatch(setPageStages(5))}>
          <LeftArrowButton caption={"New Message"} />
        </div>
      </div>
      {selectedFriend ?
        <div className="px-6 h-[54px]"><span className="text-[14px] text-primary border-[1px] border-[#29B080] px-[15px] py-[10px] rounded-[40px] bg-[#162724]">{selectedFriend.name}</span></div>
        : <SearchInput />}
      <MessageList selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
    </div>
  );
}

export default MessagePage;