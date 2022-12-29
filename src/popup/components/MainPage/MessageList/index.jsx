import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SUGGESTED_FRIENDS } from "../../../data";
import { setPageStages } from "../../../redux/slices/authSlice";
import { PrimaryButton } from "../../Buttons";
import PrimaryBorderButton from "../../Buttons/PrimaryBorderButton";
import { Link } from "../../Icons";
import { TitleItem } from "../../Items";
import MessageListItem from "../../Panels/MessageListItem";
import defaultAvatar from '../../../../assets/img/placeholder/avatar.png';
import { setChatType, setMembers } from "../../../redux/slices/chatSlice";

const MessageList = (props) => {
  const { selectedFriend, setSelectedFriend, suggestedFriends } = props;
  const { profileData } = useSelector((state) => ({
    profileData: state.auth.profile,
  }));

  const dispatch = useDispatch();
  const startChat = () => {
    dispatch(setChatType(2));
    dispatch(setMembers([profileData._id, selectedFriend._id]));
    dispatch(setPageStages(9));
  }


  return (
    <div className="px-6 pb-6">
      <TitleItem title="Suggested" comment="" />
      <div className="grid gap-y-3">
        {!!suggestedFriends && suggestedFriends.map((friend, index) => (
          <MessageListItem
            title={friend.username}
            image={<img
              src={friend.profileImage ? friend.profileImage : defaultAvatar}
              width={52}
              height={52} />
            }
            status={friend.onlineFlag}
            selected={friend === selectedFriend}
            gap={3}
            key={index}
            onSelect={() => setSelectedFriend(friend)}
          />
        ))}
      </div>
      <div className="py-6 grid gap-5">
        <PrimaryButton disabled={selectedFriend ? false : true} caption="Create a chat" styles="py-3 w-full rounded-[15px]" onClick={startChat} />
      </div>
    </div>
  );
}

export default MessageList;