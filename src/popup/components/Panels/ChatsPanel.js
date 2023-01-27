import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHATS } from "../../data";
import { apiCaller } from "../../utils/fetcher";
import PrimaryBorderButton from "../Buttons/PrimaryBorderButton";
import { RoundPlus } from "../Icons";
import { TitleItem } from "../Items";
import ItemTemplate from "./ItemTemplate";
import defaultAvatar from '../../../assets/img/placeholder/avatar.png';
import { time_ago } from "../../utils";

import { setPageStages } from "../../redux/slices/authSlice";
import { setChatType, setMembers } from "../../redux/slices/chatSlice";

const ChatsPanel = () => {
  const [serverChats, setServerChats] = useState([]);
  
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => ({
    profile: state.auth.profile,
  }));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await apiCaller.get("/chats/fetchChats");
        var tmpChats = [];
        for(var i = 0; i < data.chats.length; i ++) {
          const person = data.chats[i].users[0].username == profile.username ? data.chats[i].users[1]: data.chats[i].users[0];
          tmpChats.push({
            _id: data.chats[i]._id,
            users: data.chats[i].users,
            image: <img className="rounded-xl" style={{height: "52px"}} src={person.profileImage ? person.profileImage.link: defaultAvatar} width={52} height={52}/>,
            title: person.username,
            detail: data.chats[i].lastMsg.content,
            time: time_ago(data.chats[i].lastMsg.createdAt),
            gap: 3,
            badge: data.chats[i].unreadCount
          });
        }
        setServerChats(tmpChats);
      } catch (error) {
        console.error('Something went wrong.')
      }
    }
    fetchChats();
  }, [])

  const gotoChatPanel = (chat) => {
    var members = [];
    for(var i = 0; i < chat.users.length; i ++) {
      if(chat.users[i].username != profile.username) {
        members.push(chat.users[i]._id);
      }
    }
    dispatch(setMembers([profile._id].concat(members)));
    dispatch(setChatType(2));
    dispatch(setPageStages(9));
  }

  return (
    <div>
      <TitleItem 
        title="Chats" 
        comment="1 unread" 
        button={
          <div className=" cursor-pointer bg-darkGreen text-primary p-[8px] rounded-md" onClick={() => dispatch(setPageStages(10))}>
            <RoundPlus />
          </div>
        } 
      />
      <div className="flex gap-4 pb-4">
        {['Messages', 'Requests'].map((menuItem, index) => (
          <div className={(menuItem == 'Messages' ? `text-primary`: 'text-[#929298]') + ` text-base cursor-pointer hover:text-primary` } key={index}>
            {menuItem}
          </div>
        )) }
      </div>
      {/* Menu Content */}
      <div className="menuContent grid gap-y-2">
          {serverChats.map((chat, index) => (
            <div className="cursor-pointer" onClick={() => gotoChatPanel(chat)} key={index}>
              <ItemTemplate {...chat}/>
            </div>
          ))}
      </div>
      {/* <div className="py-6 flex justify-center">
        <PrimaryBorderButton caption="See all" styles="py-1" />
      </div> */}
    </div>
  );
}

export default ChatsPanel;