import React from "react";
import { useDispatch } from "react-redux";
import { LeftArrowButton } from "../../components/Buttons";
import { SearchInput } from "../../components/Forms";
import { AvatarItem, TitleItem } from "../../components/Items";
import ItemTemplate from "../../components/Panels/ItemTemplate";
import { FRIEND_LIST_DATA } from "../../data";
import { setPageStages } from "../../redux/slices/authSlice";
import SocialPanel from "./SocialPanel";

const FriendDetailPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="pt-[15px]" >
      <div className="px-6 pb-6">
        <div onClick={() => dispatch(setPageStages(4))}>
          <LeftArrowButton caption="Find friends" />
        </div>
      </div>
      <div className="grid gap-y-4">
        <SearchInput />
      </div>
      <div className="px-6 pt-6 pb-8">
        <SocialPanel />
      </div>
      <div className="px-6 pb-6">
        <TitleItem title="Friends" comment="55" />
        <div className="text-lg text-white -mt-4">Online</div>
        <div className="grid gap-y-2">
          {FRIEND_LIST_DATA.map((friend, index) => {
            if (friend.isActive == true) {
              return (
                <ItemTemplate
                  title={friend.title}
                  detail={friend.detail}
                  time={friend.time}
                  image={<AvatarItem img={friend.img} isActive={true} />
                  }
                  gap={3}
                  key={index}
                />
              );
            }
          })}
        </div>
        <div className="text-lg text-white pt-5">Offline</div>
        <div className="grid gap-y-2">
          {FRIEND_LIST_DATA.map((friend, index) => {
            if (friend.isActive == false) {
              return (
                <ItemTemplate
                  title={friend.title}
                  detail={friend.detail}
                  time={friend.time}
                  image={<AvatarItem img={friend.img} isActive={false} />
                  }
                  gap={3}
                  key={index}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default FriendDetailPage;