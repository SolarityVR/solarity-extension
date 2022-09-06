import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LeftArrowButton } from "../../components/Buttons";
import { SearchInput } from "../../components/Forms";
import MessageList from "../../components/MainPage/MessageList";
import { setPageStages } from "../../redux/slices/authSlice";
import { apiCaller } from "../../utils/fetcher";

const MessagePage = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      try {
        const { data } = await apiCaller.post("/users/fetchSuggestedFriends", {
          searchName: userSearchInput,
        });
        setSuggestedFriends(data.users)
      } catch (error) {
        console.error('Something went wrong.')
      }
    }
    fetchSuggestedFriends();
  }, [userSearchInput]);

  const selectedFriendBadge = () => {

  }

  return (
    <div className="pt-[15px] grid gap-5">
      <div className="px-6">
        <div onClick={() => dispatch(setPageStages(5))}>
          <LeftArrowButton caption={"New Message"} />
        </div>
      </div>
      {selectedFriend ? (
        <div className="px-6 h-[54px]">
          <span className="text-[14px] text-primary border-[1px] border-[#29B080] px-[15px] py-[10px] rounded-[40px] bg-[#162724]">
            {selectedFriend.username}
          </span>
        </div>
      ) : (
        <SearchInput value={userSearchInput} setValue={setUserSearchInput} />
      )}
      <MessageList
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
        suggestedFriends={suggestedFriends}
      />
    </div>
  );
}

export default MessagePage;