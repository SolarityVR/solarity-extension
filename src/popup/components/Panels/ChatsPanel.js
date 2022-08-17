import React from "react";
import { useDispatch } from "react-redux";
import { CHATS } from "../../data";
import { setPageStages } from "../../redux/slices/authSlice";
import PrimaryBorderButton from "../Buttons/PrimaryBorderButton";
import { RoundPlus } from "../Icons";
import { TitleItem } from "../Items";
import ItemTemplate from "./ItemTemplate";

const ChatsPanel = () => {
  const dispatch = useDispatch();
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
      <div className="flex gap-4">
        {['Messages', 'Requests'].map((menuItem, index) => (
          <div className={(menuItem == 'Messages' ? `text-primary`: 'text-[#929298]') + ` text-base cursor-pointer hover:text-primary` } key={index}>
            {menuItem}
          </div>
        )) }
      </div>
      {/* Menu Content */}
      <div className="menuContent grid gap-y-2">
          {CHATS.map((chat, index) => (
            <ItemTemplate {...chat} key={index}/>
          ))}
      </div>
      <div className="py-6 flex justify-center">
        <PrimaryBorderButton caption="See all" styles="py-1" />
      </div>
    </div>
  );
}

export default ChatsPanel;