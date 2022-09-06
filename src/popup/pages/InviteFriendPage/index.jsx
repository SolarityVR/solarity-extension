import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LeftArrowButton } from "../../components/Buttons";
import { SearchInput } from "../../components/Forms";
import { AvatarItem, TitleItem } from "../../components/Items";
import ItemTemplate from "../../components/Panels/ItemTemplate";
import { FRIEND_LIST_DATA } from "../../data";
import { setPageStages } from "../../redux/slices/authSlice";
import { apiCaller } from "../../utils/fetcher";
import defaultAvatar from '../../../assets/img/placeholder/avatar.png';

const FriendDetailPage = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState("");

  useEffect(() => {
    async function fetchUsersToInvite() {
      try {
        const { data } = await apiCaller.post("/users/fetchUsersToInvite", {
          searchName: userSearchInput,
        });
        setUsers(data.users)
      } catch (error) {
        console.error('Something went wrong.')
      }
    }
    fetchUsersToInvite();
  }, [userSearchInput])

  useEffect(() => {
    var tmpOn = [], tmpOff = [];
    for (var user of users) {
      if (user.onlineFlag) {
        tmpOn.push(user);
      } else {
        tmpOff.push(user);
      }
    }
    setOnlineUsers(tmpOn);
    setOfflineUsers(tmpOff);
  }, [users])

  const inviteToFriend = (userId) => {
    window.socket.emit('invite-to-friend', { userId });
  }

  return (
    <div className="pt-[15px]" >
      <div className="px-6 pb-6">
        <div onClick={() => dispatch(setPageStages(8))}>
          <LeftArrowButton caption="Find friends" />
        </div>
      </div>
      <div className="grid gap-y-4">
        <SearchInput value={userSearchInput} setValue={setUserSearchInput} />
      </div>
      <div className="px-6 pb-6">
        <TitleItem title="Users" />
        {onlineUsers.length != 0 && (
          <div>
            <div className="text-lg text-white -mt-4">Online</div>
            <div className="grid gap-y-2 pb-5">
              {onlineUsers.map((user, index) => {
                if (user.onlineFlag == true) {
                  return (
                    <ItemTemplate
                      title={user.username}
                      detail={user.bio}
                      time={<div className="text-grey hover:text-primary" onClick={() => inviteToFriend(user._id)}>invite</div>}
                      image={<AvatarItem img={!!user.profileImage ? user.profileImage : defaultAvatar} isActive={true} />
                      }
                      gap={3}
                      key={index}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        {offlineUsers.length != 0 && (
          <div>
            <div className="text-lg text-white">Offline</div>
            <div className="grid gap-y-2">
              {offlineUsers.map((user, index) => {
                if (user.onlineFlag == false) {
                  return (
                    <ItemTemplate
                      title={user.username}
                      detail={user.bio}
                      time={<div className="text-grey hover:text-primary cursor-pointer" onClick={() => inviteToFriend(user._id)}>invite</div>}
                      image={<AvatarItem img={!!user.profileImage ? user.profileImage : defaultAvatar} />
                      }
                      gap={3}
                      key={index}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendDetailPage;