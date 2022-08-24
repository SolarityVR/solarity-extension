import React from "react";
import PrimaryBorderButton from "../Buttons/PrimaryBorderButton";
import { Play, Schedule } from "../Icons";

const EventItemTemplate = (props) => {
  return (
    <div className={`p-[14px] text-lightGrey bg-lightDark rounded-[15px] cursor-pointer border hover:border-[#29B080] ` + (props.isActive ? "border-[#29B080]" : "border-transparent")}>
      <div className="flex mb-2">
        {props.image}
        <div className={`pl-${props.gap} relative w-full`}>
          {props.title && (
            <div className="text-[#F3F3F3] text-base font-bold leading-tight mb-2">
              {props.title}
            </div>
          )}
          {props.detail && (
            <div className="text-[#B3B3B7] text-sm font-normal leading-tight items-center mb-2">
              {props.detail}
            </div>
          )}
          {props.creator && (
            <div className="text-[#B3B3B7] text-sm font-normal leading-tight flex items-center mb-2">
              <img src={props.creator.img} width="16" height="16" className="rounded-full" />&nbsp;&nbsp;
              <span className="text-[#BFCE61]">{props.creator.name}</span>
            </div>
          )}
          <div className="flex justify-between">
            {props.onlineUsers && (
              <div className="flex ml-[5px]">
                {props.onlineUsers.map((user, index) => {
                  if (index < props.showUsers) {
                    return (
                      <div className="w-[16px] h-[16px] -ml-[5px] rounded-md" key={index}>
                        <img src={user.img} key={index} width={16} height={16} />
                      </div>
                    );
                  }
                })}
                {props.onlineUsers && props.onlineUsers.length > props.showUsers && (
                  <div className="w-[19px] h-[18px] -ml-[5px] pt-0.3 rounded-md text-white text-[10px] bg-[#1F1F20] text-center items-center">
                    {props.onlineUsers.length - props.showUsers + "+"}
                  </div>
                )}
              </div>
            )}
            {props.time && (
              <div className="flex text-primary text-sm items-center">
                <Schedule size="14px" />&nbsp;
                {props.time}
              </div>
            )}
          </div>
        </div>
      </div>
      {props.button && (
        <PrimaryBorderButton
          caption={props.button}
          styles="w-full"
        />
      )}
    </div>
  );
}

export default EventItemTemplate;