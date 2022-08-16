import React from "react";
import { FRIENDS } from "../../../data";
import { AvatarItem, TitleItem } from "../../Items";

const FriendList = () => {
  return (
    <div className="p-6 pt-5 border-b border-b-semiSplitter">
      <TitleItem title="Friends" comment="55" />
      <div className="flex gap-[10px] rounded-xl bg-lightDark hover:border-transparent p-[14px] hover:shadow hover:shadow-primary">
        {FRIENDS.map((friend, index) => (
          <AvatarItem {...friend} key={index} />
        ))}
        <div className="w-[52px] h-[52px] border border-primary rounded-2xl cursor-pointer">
          <h4 className="text-base text-center text-white pt-3">10+</h4>
        </div>
      </div>
      <div className="text-white text-base font-normal pt-2">
        2 friends in 2 games
      </div>
    </div>
  );
}

export default FriendList;