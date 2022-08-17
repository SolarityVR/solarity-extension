import React from "react";
import { useDispatch } from "react-redux";
import { SUGGESTED_FRIENDS } from "../../../data";
import { setPageStages } from "../../../redux/slices/authSlice";
import { PrimaryButton } from "../../Buttons";
import PrimaryBorderButton from "../../Buttons/PrimaryBorderButton";
import { Link } from "../../Icons";
import { TitleItem } from "../../Items";
import MessageListItem from "../../Panels/MessageListItem";

const MessageList = (props) => {
  const { selectedFriend, setSelectedFriend } = props;

  const dispatch = useDispatch();

  return (
    <div className="px-6 pb-6">
      <TitleItem title="Suggested" comment="" />
      <div className="grid gap-y-3">
        {SUGGESTED_FRIENDS.map((friend, index) => (
          <MessageListItem
            title={friend.name}
            image={<img
              src={friend.img}
              width={52}
              height={52} />
            }
            status={friend.status}
            selected={friend === selectedFriend}
            gap={3}
            key={index}
            onSelect={() => setSelectedFriend(friend)}
          />
        ))}
      </div>
      <div className="py-6 grid gap-5">
        <PrimaryButton disabled={selectedFriend ? false : true} caption="Create a chat" styles="py-3 w-full rounded-[15px]" onClick={() => dispatch(setPageStages(9))} />
        <PrimaryBorderButton icon={<Link />} caption="Copy invitation link" styles="py-[18px] w-full rounded-[15px]" />
      </div>
    </div>
  );
}

export default MessageList;